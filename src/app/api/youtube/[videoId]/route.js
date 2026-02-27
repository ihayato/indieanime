import { NextResponse } from 'next/server';

const API_KEY = process.env.YOUTUBE_DATA_API_KEY;
const CACHE_SECONDS = 300; // 5 minutes

/**
 * GET /api/youtube/[videoId]
 * Fetches video stats (likes, views, comments count) and latest comments from YouTube Data API.
 * Proxies the request server-side so the API key is never exposed to the client.
 */
export async function GET(request, { params }) {
    const { videoId } = await params;

    if (!API_KEY) {
        return NextResponse.json(
            { likeCount: 0, viewCount: 0, commentCount: 0, comments: [] },
            {
                headers: {
                    'Cache-Control': `public, s-maxage=${CACHE_SECONDS}, stale-while-revalidate=${CACHE_SECONDS * 2}`,
                },
            }
        );
    }

    try {
        // Fetch video statistics and comment threads in parallel
        const [statsRes, commentsRes] = await Promise.all([
            fetch(
                `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${API_KEY}`
            ),
            fetch(
                `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&maxResults=5&order=time&textFormat=plainText&key=${API_KEY}`
            ),
        ]);

        let likeCount = 0;
        let viewCount = 0;
        let commentCount = 0;

        if (statsRes.ok) {
            const statsData = await statsRes.json();
            if (statsData.items && statsData.items.length > 0) {
                const stats = statsData.items[0].statistics;
                likeCount = parseInt(stats.likeCount || '0', 10);
                viewCount = parseInt(stats.viewCount || '0', 10);
                commentCount = parseInt(stats.commentCount || '0', 10);
            }
        }

        let comments = [];
        if (commentsRes.ok) {
            const commentsData = await commentsRes.json();
            if (commentsData.items) {
                comments = commentsData.items.map((item) => {
                    const snippet = item.snippet.topLevelComment.snippet;
                    return {
                        author: snippet.authorDisplayName,
                        text: snippet.textDisplay,
                        likeCount: snippet.likeCount,
                        publishedAt: snippet.publishedAt,
                        authorProfileImageUrl: snippet.authorProfileImageUrl,
                    };
                });
            }
        }

        return NextResponse.json(
            { likeCount, viewCount, commentCount, comments },
            {
                headers: {
                    'Cache-Control': `public, s-maxage=${CACHE_SECONDS}, stale-while-revalidate=${CACHE_SECONDS * 2}`,
                },
            }
        );
    } catch (error) {
        console.error('YouTube API error:', error);
        return NextResponse.json(
            { likeCount: 0, viewCount: 0, commentCount: 0, comments: [] },
            { status: 200 }
        );
    }
}
