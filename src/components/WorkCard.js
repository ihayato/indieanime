import Link from 'next/link';
import { getYouTubeThumbnail } from '@/lib/youtube';
import { formatViewCount, CATEGORIES } from '@/lib/mockData';
import styles from './WorkCard.module.css';

export default function WorkCard({ work }) {
    const thumbnail = getYouTubeThumbnail(work.youtubeId, 'hqdefault');

    return (
        <Link href={`/works/${work.id}`} className={`card ${styles.card}`}>
            <div className={styles.thumbnailWrap}>
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
                {work.viewCount && (
                    <span className={styles.viewCount}>▶ {formatViewCount(work.viewCount)}回</span>
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
