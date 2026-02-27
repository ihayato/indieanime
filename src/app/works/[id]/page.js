import Link from 'next/link';
import { notFound } from 'next/navigation';
import YouTubeEmbed from '@/components/YouTubeEmbed';
import YouTubeEngagement from '@/components/YouTubeEngagement';
import WorkCard from '@/components/WorkCard';
import { fetchWorkById, fetchWorks, fetchWorksByNewest } from '@/lib/api';
import styles from './page.module.css';

export const revalidate = 300; // ISR: revalidate every 5 minutes

export async function generateStaticParams() {
    const works = await fetchWorks();
    return works.map((w) => ({ id: String(w.id) }));
}

export async function generateMetadata({ params }) {
    const { id } = await params;
    const work = await fetchWorkById(id);
    if (!work) return {};

    return {
        title: `${work.title} | indieanime.jp [β]`,
        description: work.description,
    };
}

export default async function WorkDetailPage({ params }) {
    const { id } = await params;
    const work = await fetchWorkById(id);

    if (!work) {
        notFound();
    }

    // Get related works (exclude current, take 3)
    const allNewest = await fetchWorksByNewest();
    const related = allNewest
        .filter((w) => w.id !== work.id)
        .slice(0, 3);

    return (
        <>
            <div className={styles.wrapper}>
                <div className="container">
                    {/* Breadcrumb */}
                    <nav className={styles.breadcrumb}>
                        <Link href="/">ホーム</Link>
                        <span className={styles.breadcrumbSep}>›</span>
                        <Link href="/works">作品一覧</Link>
                        <span className={styles.breadcrumbSep}>›</span>
                        <span className={styles.breadcrumbCurrent}>{work.title}</span>
                    </nav>

                    {/* Video Player */}
                    <div className={styles.player}>
                        <YouTubeEmbed videoId={work.youtubeId} title={work.title} />
                    </div>

                    {/* Work Info */}
                    <div className={styles.content}>
                        <div className={styles.main}>
                            <h1 className={styles.title}>{work.title}</h1>
                            <p className={styles.description}>{work.description}</p>
                            <YouTubeEngagement videoId={work.youtubeId} />
                        </div>

                        <aside className={styles.sidebar}>
                            <div className={styles.creatorCard}>
                                <h3 className={styles.creatorLabel}>制作者</h3>
                                <div className={styles.creatorInfo}>
                                    <div className={styles.creatorAvatar}>
                                        {work.creatorName.charAt(0)}
                                    </div>
                                    <div>
                                        <p className={styles.creatorName}>{work.creatorName}</p>
                                        {work.creatorUrl && (
                                            <a
                                                href={work.creatorUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={styles.creatorLink}
                                            >
                                                プロフィールを見る ↗
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className={styles.metaCard}>
                                <h3 className={styles.metaLabel}>作品情報</h3>
                                <dl className={styles.metaList}>
                                    <div className={styles.metaItem}>
                                        <dt>投稿日</dt>
                                        <dd>{new Date(work.submittedAt).toLocaleDateString('ja-JP')}</dd>
                                    </div>
                                </dl>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>

            {/* Related Works */}
            {related.length > 0 && (
                <section className={`section ${styles.related}`}>
                    <div className="container">
                        <h2 className="section__title">🎬 他の作品もチェック</h2>
                        <p className="section__subtitle">こちらの作品もおすすめです</p>
                        <div className="grid grid--3">
                            {related.map((w) => (
                                <WorkCard key={w.id} work={w} />
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}
