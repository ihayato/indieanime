'use client';

import styles from './SortToggle.module.css';

export default function SortToggle({ current, onChange }) {
    return (
        <div className={styles.wrapper}>
            <button
                className={`${styles.btn} ${current === 'newest' ? styles.active : ''}`}
                onClick={() => onChange('newest')}
            >
                🕐 新着順
            </button>
            <button
                className={`${styles.btn} ${current === 'popular' ? styles.active : ''}`}
                onClick={() => onChange('popular')}
            >
                🔥 人気順
            </button>
        </div>
    );
}
