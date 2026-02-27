'use client';

import { useState, useEffect } from 'react';
import styles from './YouTubeEngagement.module.css';

function formatCount(count) {
    if (count >= 10000) {
        return `${(count / 10000).toFixed(1)}万`;
    }
    if (count >= 1000) {
        return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toLocaleString();
}

function timeAgo(dateStr) {
    const now = new Date();
    const date = new Date(dateStr);
    const diff = Math.floor((now - date) / 1000);

    if (diff < 60) return 'たった今';
    if (diff < 3600) return `${Math.floor(diff / 60)}分前`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}時間前`;
    if (diff < 2592000) return `${Math.floor(diff / 86400)}日前`;
    if (diff < 31536000) return `${Math.floor(diff / 2592000)}ヶ月前`;
    return `${Math.floor(diff / 31536000)}年前`;
}

export default function YouTubeEngagement({ videoId }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!videoId) {
            setLoading(false);
            return;
        }

        fetch(`/api/youtube/${videoId}`)
            .then((res) => {
                if (!res.ok) throw new Error('Failed');
                return res.json();
            })
            .then((json) => {
                setData(json);
                setLoading(false);
            })
            .catch(() => {
                setError(true);
                setLoading(false);
            });
    }, [videoId]);

    // Don't render anything if error or no data
    if (error) return null;
    if (!loading && (!data || (data.likeCount === 0 && data.comments.length === 0))) return null;

    return (
        <div className={styles.engagement}>
            {/* Stats Badges */}
            {loading ? (
                <div className={styles.statsRow}>
                    <div className={`${styles.statBadge} ${styles.skeleton}`} />
                    <div className={`${styles.statBadge} ${styles.skeleton}`} />
                </div>
            ) : (
                <div className={styles.statsRow}>
                    {data.likeCount > 0 && (
                        <div className={styles.statBadge}>
                            <span className={styles.statIcon}>👍</span>
                            <span className={styles.statValue}>{formatCount(data.likeCount)}</span>
                            <span className={styles.statLabel}>高評価</span>
                        </div>
                    )}
                    {data.commentCount > 0 && (
                        <div className={styles.statBadge}>
                            <span className={styles.statIcon}>💬</span>
                            <span className={styles.statValue}>{formatCount(data.commentCount)}</span>
                            <span className={styles.statLabel}>コメント</span>
                        </div>
                    )}
                </div>
            )}

            {/* Comments Section */}
            {loading ? (
                <div className={styles.commentsSection}>
                    <h3 className={styles.commentsTitle}>💬 最新コメント</h3>
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className={`${styles.commentCard} ${styles.skeletonComment}`}>
                            <div className={`${styles.skeletonAvatar}`} />
                            <div className={styles.skeletonLines}>
                                <div className={styles.skeletonLine} style={{ width: '30%' }} />
                                <div className={styles.skeletonLine} style={{ width: '90%' }} />
                                <div className={styles.skeletonLine} style={{ width: '60%' }} />
                            </div>
                        </div>
                    ))}
                </div>
            ) : data.comments.length > 0 ? (
                <div className={styles.commentsSection}>
                    <h3 className={styles.commentsTitle}>💬 最新コメント</h3>
                    <div className={styles.commentsList}>
                        {data.comments.map((comment, index) => (
                            <div
                                key={index}
                                className={styles.commentCard}
                                style={{ animationDelay: `${index * 80}ms` }}
                            >
                                <div className={styles.commentAvatar}>
                                    {comment.authorProfileImageUrl ? (
                                        <img
                                            src={comment.authorProfileImageUrl}
                                            alt={comment.author}
                                            className={styles.commentAvatarImg}
                                        />
                                    ) : (
                                        <span className={styles.commentAvatarFallback}>
                                            {comment.author.charAt(0)}
                                        </span>
                                    )}
                                </div>
                                <div className={styles.commentBody}>
                                    <div className={styles.commentHeader}>
                                        <span className={styles.commentAuthor}>{comment.author}</span>
                                        <span className={styles.commentTime}>
                                            {timeAgo(comment.publishedAt)}
                                        </span>
                                    </div>
                                    <p className={styles.commentText}>{comment.text}</p>
                                    {comment.likeCount > 0 && (
                                        <span className={styles.commentLikes}>
                                            👍 {comment.likeCount}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : null}
        </div>
    );
}
