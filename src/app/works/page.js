import { fetchWorks } from '@/lib/api';
import WorksListClient from './WorksListClient';

export const revalidate = 300; // ISR: revalidate every 5 minutes

export const metadata = {
    title: '作品一覧 | indieanime.jp',
    description: 'インディーアニメ作品の一覧ページ。新着順・人気順で並び替えて、お気に入りの作品を見つけよう。',
};

export default async function WorksPage() {
    const works = await fetchWorks();
    return <WorksListClient works={works} />;
}
