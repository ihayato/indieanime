export const mockWorks = [
    {
        id: "1",
        title: "星屑のドリーマー",
        youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        youtubeId: "dQw4w9WgXcQ",
        description: "宇宙の片隅で暮らす少女が、壊れた宇宙船を修理しながら星々を旅する物語。手描きアニメーションとシンセウェーブBGMが織りなすノスタルジックSFアドベンチャー。",
        creatorName: "星野スタジオ",
        creatorUrl: "https://x.com/example",
        submittedAt: "2026-02-25",
        viewCount: 152000,
    },
    {
        id: "2",
        title: "猫と雨の日",
        youtubeUrl: "https://www.youtube.com/watch?v=jNQXAC9IVRw",
        youtubeId: "jNQXAC9IVRw",
        description: "雨の日に出会った不思議な猫との一日を描いた短編アニメーション。水彩画タッチの美しい背景と、温かいストーリーが魅力。",
        creatorName: "あめのこアニメーション",
        creatorUrl: "https://youtube.com/@example",
        submittedAt: "2026-02-23",
        viewCount: 89000,
    },
    {
        id: "3",
        title: "NEON BEAT",
        youtubeUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0",
        youtubeId: "9bZkp7q19f0",
        description: "ネオン輝く近未来の街で、ストリートダンサーたちがバトルを繰り広げる。3DCGと2Dアニメを融合させたハイブリッドな映像表現が新しい。",
        creatorName: "NeonLab",
        creatorUrl: "https://x.com/example",
        submittedAt: "2026-02-20",
        viewCount: 340000,
    },
    {
        id: "4",
        title: "おばあちゃんの魔法",
        youtubeUrl: "https://www.youtube.com/watch?v=kJQP7kiw5Fk",
        youtubeId: "kJQP7kiw5Fk",
        description: "田舎のおばあちゃんが実は魔法使いだった？孫と過ごすひと夏の不思議な体験。ほっこりファンタジー短編。",
        creatorName: "てのひらアニメ",
        creatorUrl: "https://x.com/example",
        submittedAt: "2026-02-18",
        viewCount: 45000,
    },
    {
        id: "5",
        title: "MECHANICAL HEART",
        youtubeUrl: "https://www.youtube.com/watch?v=RgKAFK5djSk",
        youtubeId: "RgKAFK5djSk",
        description: "心を持たないロボットが、感情を学んでいくSFドラマ。緻密なメカデザインと繊細な感情表現のコントラストが見どころ。",
        creatorName: "機械仕掛けプロダクション",
        creatorUrl: "https://youtube.com/@example",
        submittedAt: "2026-02-15",
        viewCount: 23000,
    },
    {
        id: "6",
        title: "桜の下で踊れ",
        youtubeUrl: "https://www.youtube.com/watch?v=fJ9rUzIMcZQ",
        youtubeId: "fJ9rUzIMcZQ",
        description: "音楽に情熱を燃やす高校生たちが、文化祭でのライブを目指す青春ストーリー。アップテンポな楽曲に乗せた躍動感あるアニメーション。",
        creatorName: "ブルースカイワークス",
        creatorUrl: "https://x.com/example",
        submittedAt: "2026-02-12",
        viewCount: 210000,
    },
    {
        id: "7",
        title: "深海のランデブー",
        youtubeUrl: "https://www.youtube.com/watch?v=OPf0YbXqDm0",
        youtubeId: "OPf0YbXqDm0",
        description: "深海に棲む少年と、陸から来た少女の出会い。幻想的な水中の世界を描くファンタジーアニメーション。",
        creatorName: "深青プロジェクト",
        creatorUrl: "https://x.com/example",
        submittedAt: "2026-02-10",
        viewCount: 67000,
    },
    {
        id: "8",
        title: "PIXEL QUEST",
        youtubeUrl: "https://www.youtube.com/watch?v=hT_nvWreIhg",
        youtubeId: "hT_nvWreIhg",
        description: "ゲームの世界に迷い込んだ少年が、ピクセルアートの世界を冒険する。レトロゲーム風のビジュアルと最新のアニメ技術の融合。",
        creatorName: "8bitアニメーション",
        creatorUrl: "https://youtube.com/@example",
        submittedAt: "2026-02-08",
        viewCount: 128000,
    },
];

/**
 * Format view count for display (e.g., 152000 → "15.2万")
 */
export function formatViewCount(count) {
    if (count >= 10000) {
        return `${(count / 10000).toFixed(1)}万`;
    }
    return count.toLocaleString();
}

/**
 * Get all works sorted by newest first
 */
export function getWorksByNewest() {
    return [...mockWorks].sort(
        (a, b) => new Date(b.submittedAt) - new Date(a.submittedAt)
    );
}

/**
 * Get all works sorted by view count (popular)
 */
export function getWorksByPopular() {
    return [...mockWorks].sort((a, b) => b.viewCount - a.viewCount);
}

/**
 * Get featured works (top 3 by view count)
 */
export function getFeaturedWorks() {
    return getWorksByPopular().slice(0, 3);
}

/**
 * Get a single work by ID
 */
export function getWorkById(id) {
    return mockWorks.find((w) => w.id === id) || null;
}

/**
 * Get all work IDs (for static generation)
 */
export function getAllWorkIds() {
    return mockWorks.map((w) => w.id);
}
