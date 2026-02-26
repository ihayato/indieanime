'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import WorkCard from '@/components/WorkCard';
import SortToggle from '@/components/SortToggle';
import { CATEGORIES } from '@/lib/mockData';
import styles from './page.module.css';

export default function WorksListClient({ works }) {
    const searchParams = useSearchParams();
    const initialCategory = searchParams.get('category') || 'all';

    const [sort, setSort] = useState('newest');
    const [category, setCategory] = useState(initialCategory);

    const filteredAndSorted = useMemo(() => {
        let list = [...works];

        // Category filter
        if (category !== 'all') {
            list = list.filter((w) => w.category === category);
        }

        // Sort
        if (sort === 'newest') {
            return list.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
        }
        return list.sort((a, b) => b.viewCount - a.viewCount);
    }, [sort, category, works]);

    return (
        <>
            <div className="page-header">
                <div className="container">
                    <h1 className="page-header__title gradient-text">作品一覧</h1>
                    <p className="page-header__description">
                        クリエイターたちが制作したインディーアニメ作品を一覧でご覧いただけます
                    </p>
                </div>
            </div>

            <section className="section" style={{ paddingTop: 0 }}>
                <div className="container">
                    <div className={styles.toolbar}>
                        <div className={styles.filters}>
                            <div className={styles.categoryFilter}>
                                <button
                                    className={`${styles.categoryBtn} ${category === 'all' ? styles.categoryBtnActive : ''}`}
                                    onClick={() => setCategory('all')}
                                >
                                    すべて
                                </button>
                                {Object.values(CATEGORIES).map((cat) => (
                                    <button
                                        key={cat.id}
                                        className={`${styles.categoryBtn} ${category === cat.id ? styles.categoryBtnActive : ''}`}
                                        onClick={() => setCategory(cat.id)}
                                    >
                                        {cat.emoji} {cat.short}
                                    </button>
                                ))}
                            </div>
                            <p className={styles.count}>全 {filteredAndSorted.length} 作品</p>
                        </div>
                        <SortToggle current={sort} onChange={setSort} />
                    </div>

                    <div className="grid grid--3">
                        {filteredAndSorted.map((work) => (
                            <WorkCard key={work.id} work={work} />
                        ))}
                    </div>

                    {filteredAndSorted.length === 0 && (
                        <div className={styles.empty}>
                            <p>該当する作品がありません</p>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
