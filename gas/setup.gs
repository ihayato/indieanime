/**
 * ============================================================
 * indieanime.jp - ワンクリックセットアップスクリプト
 * ============================================================
 * 
 * このスクリプトを実行すると、以下が自動的に作成されます:
 * 
 *   1. Google Form（作品投稿フォーム）
 *   2. Google Sheet（回答の保存先 + 管理用列の追加）
 *   3. JSON API（doGet で承認済み作品を返す Web App）
 * 
 * ============================================================
 * 
 * 【使い方】
 * 
 *   1. https://script.google.com を開く
 *   2. 「新しいプロジェクト」を作成
 *   3. プロジェクト名を「indieanime」に変更
 *   4. デフォルトの Code.gs の中身をすべて削除し、このスクリプトを貼り付け
 *   5. メニューから setup 関数を選択して ▶ 実行
 *      （初回は権限の承認を求められます → 「許可」を選択）
 *   6. 実行ログに表示される URL をメモ
 *      - Google Form URL → submit ページに埋め込み
 *      - Google Sheet URL → 管理用
 *   7. このスクリプトを「デプロイ > ウェブアプリ」で公開:
 *      - 実行するユーザー: 自分
 *      - アクセスできるユーザー: 全員
 *   8. デプロイされた Web App URL を Next.js の .env.local に設定:
 *      NEXT_PUBLIC_GAS_API_URL=<Web App の URL>
 * 
 * ============================================================
 */

/**
 * メインセットアップ関数 — これを実行してください
 */
function setup() {
  // ① Google Form を作成
  const form = createSubmissionForm_();
  
  // ② フォームの回答先 Sheet を作成・設定
  const sheet = setupResponseSheet_(form);
  
  // ③ 完了メッセージを表示
  const formUrl = form.getPublishedUrl();
  const formEditUrl = form.getEditUrl();
  const sheetUrl = sheet.getParent().getUrl();
  
  Logger.log('============================================================');
  Logger.log('✅ セットアップが完了しました！');
  Logger.log('============================================================');
  Logger.log('');
  Logger.log('📝 投稿フォーム（公開用）:');
  Logger.log('   ' + formUrl);
  Logger.log('');
  Logger.log('📝 投稿フォーム（編集用）:');
  Logger.log('   ' + formEditUrl);
  Logger.log('');
  Logger.log('📊 Google Sheet（管理用）:');
  Logger.log('   ' + sheetUrl);
  Logger.log('');
  Logger.log('============================================================');
  Logger.log('');
  Logger.log('【次のステップ】');
  Logger.log('');
  Logger.log('1. このスクリプトを「デプロイ > ウェブアプリ」で公開してください');
  Logger.log('   - 実行するユーザー: 自分');
  Logger.log('   - アクセスできるユーザー: 全員');
  Logger.log('');
  Logger.log('2. デプロイされた URL を .env.local に設定:');
  Logger.log('   NEXT_PUBLIC_GAS_API_URL=<Web App の URL>');
  Logger.log('');
  Logger.log('3. submit/page.js の Google Form iframe を有効化:');
  Logger.log('   フォーム埋め込み URL: ' + formUrl + '?embedded=true');
  Logger.log('');
  Logger.log('============================================================');
}


// ====================================================================
// 内部関数
// ====================================================================

/**
 * 投稿フォームを作成
 */
function createSubmissionForm_() {
  const form = FormApp.create('indieanime.jp 作品投稿フォーム');
  
  // フォームの設定
  form.setDescription(
    'インディーアニメ作品を indieanime.jp に投稿するためのフォームです。\n' +
    '投稿された作品は運営チームが確認の上、サイトに掲載いたします（通常1〜3営業日）。\n\n' +
    '【投稿条件】\n' +
    '・個人またはインディーチームが制作したオリジナルアニメーション作品であること\n' +
    '・YouTubeに公開済みの作品であること\n' +
    '・他者の著作権を侵害していないこと'
  );
  form.setConfirmationMessage(
    '投稿ありがとうございます！\n' +
    '運営チームが内容を確認の上、サイトに掲載いたします。\n' +
    '通常1〜3営業日以内に完了します。'
  );
  form.setAllowResponseEdits(false);
  form.setLimitOneResponsePerUser(false);
  form.setProgressBar(false);
  
  // ------ フォームの質問を追加 ------
  
  // 作品タイトル（必須）
  form.addTextItem()
    .setTitle('作品タイトル')
    .setHelpText('作品の正式なタイトルを入力してください')
    .setRequired(true);
  
  // YouTube URL（必須）
  form.addTextItem()
    .setTitle('YouTube URL')
    .setHelpText('YouTubeの動画ページのURL（例: https://www.youtube.com/watch?v=xxxxx）')
    .setRequired(true)
    .setValidation(
      FormApp.createTextValidation()
        .requireTextMatchesPattern('https?://(www\\.)?(youtube\\.com|youtu\\.be)/.+')
        .setHelpText('有効なYouTube URLを入力してください')
        .build()
    );
  
  // 作品の説明文（必須）
  form.addParagraphTextItem()
    .setTitle('作品の説明文・あらすじ')
    .setHelpText('作品の内容を200文字程度で紹介してください')
    .setRequired(true);
  
  // 制作者名（必須）
  form.addTextItem()
    .setTitle('制作者名 / チーム名')
    .setHelpText('サイトに表示される名前です')
    .setRequired(true);
  
  // 制作者のリンク（任意）
  form.addTextItem()
    .setTitle('制作者のプロフィールURL')
    .setHelpText('X (Twitter)、YouTube チャンネル、ポートフォリオサイトなど（任意）')
    .setRequired(false);
  
  // 連絡先メール（任意）
  form.addTextItem()
    .setTitle('連絡先メールアドレス')
    .setHelpText('掲載に関する連絡用（公開されません・任意）')
    .setRequired(false);
  
  Logger.log('✅ Google Form を作成しました');
  return form;
}


/**
 * 回答先 Sheet を設定し、管理用の列を追加
 */
function setupResponseSheet_(form) {
  // スプレッドシートを作成
  const ss = SpreadsheetApp.create('indieanime.jp - 作品データ');
  
  // フォームの回答先をこのスプレッドシートに設定
  form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());
  
  // フォーム回答シートのヘッダーが生成されるまで少し待つ
  SpreadsheetApp.flush();
  Utilities.sleep(2000);
  
  // スプレッドシートを再読み込み
  const refreshedSs = SpreadsheetApp.openById(ss.getId());
  const responseSheet = refreshedSs.getSheets()[0];
  responseSheet.setName('作品データ');
  
  // 管理用の列を追加（フォーム回答の右側に）
  const lastCol = responseSheet.getLastColumn();
  
  // 管理列のヘッダーを追加
  const managementHeaders = ['id', 'approved', 'view_count'];
  managementHeaders.forEach((header, i) => {
    responseSheet.getRange(1, lastCol + 1 + i).setValue(header);
  });
  
  // id 列に自動採番の数式を設定（2行目以降）
  // フォームの回答が入った行に対して自動的にIDを振る
  const idCol = lastCol + 1;
  const approvedCol = lastCol + 2;
  const viewCountCol = lastCol + 3;
  
  // 100行分のデフォルト値を設定
  for (let row = 2; row <= 101; row++) {
    responseSheet.getRange(row, idCol).setFormula(`=IF(A${row}<>"", ROW()-1, "")`);
    responseSheet.getRange(row, approvedCol).setValue(false);
    responseSheet.getRange(row, viewCountCol).setValue(0);
  }
  
  // 列幅を調整
  responseSheet.setColumnWidth(1, 160); // タイムスタンプ
  
  // ヘッダー行のスタイリング
  const headerRange = responseSheet.getRange(1, 1, 1, lastCol + managementHeaders.length);
  headerRange.setBackground('#4A148C')
    .setFontColor('#FFFFFF')
    .setFontWeight('bold')
    .setHorizontalAlignment('center');
  
  // approved 列のデータ検証（ドロップダウン）
  const approvedRange = responseSheet.getRange(2, approvedCol, 100, 1);
  const approvedRule = SpreadsheetApp.newDataValidation()
    .requireCheckbox()
    .build();
  approvedRange.setDataValidation(approvedRule);
  
  // シートの固定行
  responseSheet.setFrozenRows(1);
  
  // 「使い方」シートを追加
  const helpSheet = refreshedSs.insertSheet('使い方');
  helpSheet.getRange('A1').setValue('indieanime.jp 作品データ管理');
  helpSheet.getRange('A1').setFontSize(16).setFontWeight('bold');
  helpSheet.getRange('A3').setValue('【作品を承認する方法】');
  helpSheet.getRange('A3').setFontWeight('bold');
  helpSheet.getRange('A4').setValue('1. 「作品データ」シートを開く');
  helpSheet.getRange('A5').setValue('2. 新しい回答が入ったら approved 列のチェックボックスをONにする');
  helpSheet.getRange('A6').setValue('3. サイトが自動的に更新されます（最大5分後）');
  helpSheet.getRange('A8').setValue('【列の説明】');
  helpSheet.getRange('A8').setFontWeight('bold');
  helpSheet.getRange('A9').setValue('タイムスタンプ: フォーム送信日時');
  helpSheet.getRange('A10').setValue('作品タイトル: 作品名');
  helpSheet.getRange('A11').setValue('YouTube URL: 動画のURL');
  helpSheet.getRange('A12').setValue('作品の説明文・あらすじ: 作品の説明');
  helpSheet.getRange('A13').setValue('制作者名 / チーム名: 制作者の表示名');
  helpSheet.getRange('A14').setValue('制作者のプロフィールURL: SNS等のリンク');
  helpSheet.getRange('A15').setValue('連絡先メールアドレス: 非公開の連絡先');
  helpSheet.getRange('A16').setValue('id: 自動採番（編集不要）');
  helpSheet.getRange('A17').setValue('approved: ✓ を付けるとサイトに公開されます');
  helpSheet.getRange('A18').setValue('view_count: YouTube再生回数（自動更新可能）');
  helpSheet.setColumnWidth(1, 500);
  
  Logger.log('✅ Google Sheet を設定しました');
  return responseSheet;
}


// ====================================================================
// JSON API（Web App として公開後に使用）
// ====================================================================

// setup() で作成された Google Sheet の ID
const SPREADSHEET_ID = '1gSH3SofhZ_0jueWzw_u2nODgRsnAp-lZEnYDevXkhIY';

/**
 * GET リクエストハンドラ
 * 承認済み作品を JSON で返す
 */
function doGet(e) {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName('作品データ');
    
    if (!sheet) {
      return jsonResponse_({ error: 'Sheet not found' });
    }
    
    const data = sheet.getDataRange().getValues();
    if (data.length <= 1) {
      return jsonResponse_([]);
    }
    
    const headers = data[0];
    const works = [];
    
    // 列インデックスを取得
    const cols = {
      timestamp: 0,
      title: headers.indexOf('作品タイトル'),
      youtubeUrl: headers.indexOf('YouTube URL'),
      description: headers.indexOf('作品の説明文・あらすじ'),
      creatorName: headers.indexOf('制作者名 / チーム名'),
      creatorUrl: headers.indexOf('作者のプロフィールURL'),
      id: headers.indexOf('id'),
      approved: headers.indexOf('approved'),
      viewCount: headers.indexOf('view_count'),
    };
    
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      
      // 空行スキップ
      if (!row[cols.title]) continue;
      
      // 承認済みのみ
      if (row[cols.approved] !== true) continue;
      
      const youtubeUrl = row[cols.youtubeUrl] || '';
      const youtubeId = extractYouTubeId_(youtubeUrl);
      
      works.push({
        id: String(row[cols.id] || i),
        title: row[cols.title] || '',
        youtubeUrl: youtubeUrl,
        youtubeId: youtubeId,
        description: row[cols.description] || '',
        creatorName: row[cols.creatorName] || '',
        creatorUrl: row[cols.creatorUrl] || '',
        submittedAt: formatDate_(row[cols.timestamp]),
        viewCount: Number(row[cols.viewCount] || 0),
      });
    }
    
    return jsonResponse_(works);
    
  } catch (error) {
    return jsonResponse_({ error: error.message });
  }
}


// ====================================================================
// ユーティリティ関数
// ====================================================================

/**
 * JSON レスポンスを返す
 */
function jsonResponse_(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * YouTube URL から動画 ID を抽出
 */
function extractYouTubeId_(url) {
  if (!url) return '';
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return '';
}

/**
 * 日付をフォーマット
 */
function formatDate_(date) {
  if (!date) return '';
  if (date instanceof Date) {
    return Utilities.formatDate(date, 'Asia/Tokyo', 'yyyy-MM-dd');
  }
  return String(date);
}


// ====================================================================
// オプション: YouTube 再生回数の自動更新
// ====================================================================

/**
 * YouTube Data API で再生回数を取得・更新する
 * 
 * 【セットアップ】
 *   1. GAS エディタの左メニュー「サービス」→「+」→「YouTube Data API v3」を追加
 *   2. GAS エディタの左メニュー「トリガー」→「トリガーを追加」
 *      - 実行する関数: updateViewCounts
 *      - イベントのソース: 時間主導型
 *      - 時間ベースのトリガーのタイプ: 日タイマー
 *      - 時刻: 午前0時〜1時（好きな時間）
 */
function updateViewCounts() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName('作品データ');
  if (!sheet) return;
  
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  
  const urlCol = headers.indexOf('YouTube URL');
  const viewCol = headers.indexOf('view_count');
  const approvedCol = headers.indexOf('approved');
  
  if (urlCol === -1 || viewCol === -1) {
    Logger.log('必要な列が見つかりません');
    return;
  }
  
  let updated = 0;
  
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    if (!row[urlCol]) continue;
    
    // 承認済みのみ更新
    if (approvedCol !== -1 && row[approvedCol] !== true) continue;
    
    const videoId = extractYouTubeId_(row[urlCol]);
    if (!videoId) continue;
    
    try {
      const response = YouTube.Videos.list('statistics', { id: videoId });
      if (response.items && response.items.length > 0) {
        const viewCount = parseInt(response.items[0].statistics.viewCount, 10);
        sheet.getRange(i + 1, viewCol + 1).setValue(viewCount);
        updated++;
      }
    } catch (e) {
      Logger.log('再生回数取得エラー (' + videoId + '): ' + e.message);
    }
    
    // API レート制限対策
    Utilities.sleep(200);
  }
  
  Logger.log('✅ ' + updated + ' 件の再生回数を更新しました');
}
