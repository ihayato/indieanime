import { fetchWorks } from '@/lib/api';
import WorksListClient from './WorksListClient';

export const revalidate = 300; // ISR: revalidate every 5 minutes

export const metadata = {
    title: '作品一覧 | indieanime.jp [β]',
    description: 'インディーアニメ作品の一覧ページ。新着順・人気順で並び替えて、お気に入りの作品を見つけよう。',
};

import { Suspense } from 'react';

export default async function WorksPage() {
    const works = await fetchWorks();
    return (
        <Suspense fallback={<div style={{ padding: '60px', textAlign: 'center' }}>読み込み中...</div>}>
            <WorksListClient works={works} />
        </Suspense>
    );
}
