'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getYouTubeThumbnail } from '@/lib/youtube';
import { formatViewCount, CATEGORIES } from '@/lib/mockData';
import styles from './WorkCard.module.css';

export default function WorkCard({ work }) {
    const [isHovered, setIsHovered] = useState(false);
    const thumbnail = getYouTubeThumbnail(work.youtubeId, 'hqdefault');

    return (
        <Link
            href={`/works/${work.id}`}
            className={`card ${styles.card}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(true)}
        >
            <div className={styles.thumbnailWrap}>
                {isHovered ? (
                    <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${work.youtubeId}?autoplay=1&mute=1&controls=0&modestbranding=1&loop=1&playlist=${work.youtubeId}`}
                        title={work.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        className={styles.thumbnail}
                    ></iframe>
                ) : (
                    <>
                        <img
                            src={thumbnail}
                            alt={work.title}
                            className={styles.thumbnail}
                            loading="lazy"
                        />
                        <div className={styles.overlay}>
                            <svg className={styles.playIcon} viewBox="0 0 24 24" fill="currentColor">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </div>
                        {work.viewCount > 0 && (
                            <span className={styles.viewCount}>▶ {formatViewCount(work.viewCount)}回</span>
                        )}
                    </>
                )}
            </div>
            <div className={styles.info}>
                <div className={styles.infoTop}>
                    <h3 className={styles.title}>{work.title}</h3>
                    {work.category && CATEGORIES[work.category] && (
                        <span className={`${styles.categoryBadge} ${styles[`category_${work.category}`]}`}>
                            {CATEGORIES[work.category].emoji} {CATEGORIES[work.category].short}
                        </span>
                    )}
                </div>
                <p className={styles.creator}>{work.creatorName}</p>
            </div>
        </Link>
    );
}
