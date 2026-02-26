'use client';

import { useState, useMemo } from 'react';
import WorkCard from '@/components/WorkCard';
import SortToggle from '@/components/SortToggle';
import styles from './page.module.css';

export default function WorksListClient({ works }) {
    const [sort, setSort] = useState('newest');

    const sortedWorks = useMemo(() => {
        const list = [...works];
        if (sort === 'newest') {
            return list.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
        }
        return list.sort((a, b) => b.viewCount - a.viewCount);
    }, [sort, works]);

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
                        <p className={styles.count}>全 {sortedWorks.length} 作品</p>
                        <SortToggle current={sort} onChange={setSort} />
                    </div>

                    <div className="grid grid--3">
                        {sortedWorks.map((work) => (
                            <WorkCard key={work.id} work={work} />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
