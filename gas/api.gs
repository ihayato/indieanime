/**
 * indieanime.jp - GAS Web App API
 * 
 * Google Sheets のデータを JSON API として公開するスクリプト。
 * 
 * セットアップ手順:
 * 1. Google Sheet を作成し、以下の列ヘッダーを設定:
 *    A: id | B: title | C: youtube_url | D: description | E: creator_name 
 *    F: creator_url | G: submitted_at | H: approved | I: view_count
 * 
 * 2. Google Form を作成し、回答をこの Sheet に連携
 *    (フォームの質問: 作品タイトル, YouTube URL, 説明文, 制作者名, 制作者URL)
 * 
 * 3. このスクリプトを Sheet の「拡張機能 > Apps Script」に貼り付け
 * 
 * 4. デプロイ > ウェブアプリ > 「次のユーザーとして実行: 自分」「アクセス: 全員」
 * 
 * 5. デプロイされた URL を Next.js の .env.local の NEXT_PUBLIC_GAS_API_URL に設定
 */

const SHEET_NAME = 'Sheet1'; // シート名（必要に応じて変更）

/**
 * GET リクエストハンドラ
 * 承認済み作品を JSON で返す
 */
function doGet(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    
    const works = [];
    
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      
      // 承認フラグが TRUE の行のみ
      const approved = row[headers.indexOf('approved')];
      if (approved !== true && approved !== 'TRUE' && approved !== 'true') {
        continue;
      }
      
      const youtubeUrl = row[headers.indexOf('youtube_url')] || '';
      const youtubeId = extractYouTubeId(youtubeUrl);
      
      works.push({
        id: String(row[headers.indexOf('id')] || i),
        title: row[headers.indexOf('title')] || '',
        youtubeUrl: youtubeUrl,
        youtubeId: youtubeId,
        description: row[headers.indexOf('description')] || '',
        creatorName: row[headers.indexOf('creator_name')] || '',
        creatorUrl: row[headers.indexOf('creator_url')] || '',
        submittedAt: formatDate(row[headers.indexOf('submitted_at')]),
        viewCount: Number(row[headers.indexOf('view_count')] || 0),
      });
    }
    
    return ContentService
      .createTextOutput(JSON.stringify(works))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * YouTube URL から動画 ID を抽出
 */
function extractYouTubeId(url) {
  if (!url) return '';
  
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  
  return '';
}

/**
 * 日付をフォーマット
 */
function formatDate(date) {
  if (!date) return '';
  if (date instanceof Date) {
    return Utilities.formatDate(date, 'Asia/Tokyo', 'yyyy-MM-dd');
  }
  return String(date);
}

/**
 * YouTube Data API で再生回数を取得・更新するタイマー関数
 * トリガーで定期実行（例: 毎日1回）を設定して使用
 * 
 * 注意: YouTube Data API を使うには:
 *   1. Google Cloud Console で YouTube Data API v3 を有効化
 *   2. Apps Script の「サービス」から YouTube Data API を追加
 */
function updateViewCounts() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  
  const urlCol = headers.indexOf('youtube_url');
  const viewCol = headers.indexOf('view_count');
  const approvedCol = headers.indexOf('approved');
  
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const approved = row[approvedCol];
    if (approved !== true && approved !== 'TRUE' && approved !== 'true') continue;
    
    const youtubeId = extractYouTubeId(row[urlCol]);
    if (!youtubeId) continue;
    
    try {
      const response = YouTube.Videos.list('statistics', { id: youtubeId });
      if (response.items && response.items.length > 0) {
        const viewCount = parseInt(response.items[0].statistics.viewCount, 10);
        sheet.getRange(i + 1, viewCol + 1).setValue(viewCount);
      }
    } catch (e) {
      Logger.log('Error fetching views for ' + youtubeId + ': ' + e.message);
    }
  }
}
