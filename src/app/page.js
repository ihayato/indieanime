import Link from 'next/link';
import WorkCard from '@/components/WorkCard';
import { fetchWorksByNewest, fetchFeaturedWorks, fetchWorksByCategoryPopular } from '@/lib/api';
import styles from './page.module.css';

export const revalidate = 300; // ISR: revalidate every 5 minutes

export default async function HomePage() {
  const featured = await fetchFeaturedWorks();
  const newest = (await fetchWorksByNewest()).slice(0, 6);
  const mvWorks = (await fetchWorksByCategoryPopular('mv')).slice(0, 6);
  const storyWorks = (await fetchWorksByCategoryPopular('story')).slice(0, 6);

  return (
    <>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <div className={styles.heroBgOrb1}></div>
          <div className={styles.heroBgOrb2}></div>
          <div className={styles.heroBgOrb3}></div>
        </div>
        <div className={`container ${styles.heroInner}`}>
          <span className={styles.heroBadge}>🎬 インディーアニメ投稿プラットフォーム</span>
          <h1 className={styles.heroTitle}>
            あなたのアニメを、
            <br />
            <span className="gradient-text">世界に届けよう。</span>
          </h1>
          <p className={styles.heroDesc}>
            個人・小規模チームが制作したアニメーション作品を紹介する場所。
            <br />
            インディーアニメの世界を、もっと広く。
          </p>
          <div className={styles.heroCta}>
            <Link href="/works" className="btn btn--primary">
              作品を探す →
            </Link>
            <Link href="/submit" className="btn btn--outline">
              作品を投稿する
            </Link>
          </div>
        </div>
      </section>

      {/* Newest Section */}
      {newest.length > 0 && (
        <section className={`section ${styles.newest}`}>
          <div className="container">
            <div className={styles.sectionHead}>
              <div>
                <h2 className="section__title">🆕 新着作品</h2>
                <p className="section__subtitle">最近投稿された作品たち</p>
              </div>
              <Link href="/works" className="btn btn--ghost">
                すべて見る →
              </Link>
            </div>
            <div className="grid grid--3">
              {newest.map((work) => (
                <WorkCard key={work.id} work={work} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Original Story Section */}
      {storyWorks.length > 0 && (
        <section className={`section ${styles.categorySection}`}>
          <div className="container">
            <div className={styles.sectionHead}>
              <div>
                <h2 className="section__title">🎬 オリジナルストーリー</h2>
                <p className="section__subtitle">クリエイターが紡ぐオリジナルの物語</p>
              </div>
              <Link href="/works?category=story" className="btn btn--ghost">
                すべて見る →
              </Link>
            </div>
            <div className="grid grid--3">
              {storyWorks.map((work) => (
                <WorkCard key={work.id} work={work} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* MV Section */}
      {mvWorks.length > 0 && (
        <section className={`section ${styles.categorySection}`}>
          <div className="container">
            <div className={styles.sectionHead}>
              <div>
                <h2 className="section__title">🎵 MV（ミュージックビデオ）</h2>
                <p className="section__subtitle">オリジナル楽曲に合わせたアニメーションMV</p>
              </div>
              <Link href="/works?category=mv" className="btn btn--ghost">
                すべて見る →
              </Link>
            </div>
            <div className="grid grid--3">
              {mvWorks.map((work) => (
                <WorkCard key={work.id} work={work} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured / Pickup Section */}
      {featured.length > 0 && (
        <section className={`section ${styles.featured}`}>
          <div className="container">
            <div className={styles.sectionHead}>
              <div>
                <h2 className="section__title">👑 再生数ランキング</h2>
                <p className="section__subtitle">YouTubeでよく見られている注目のアニメ</p>
              </div>
            </div>
            <div className="grid grid--3">
              {featured.map((work) => (
                <WorkCard key={work.id} work={work} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={`container ${styles.ctaInner}`}>
          <h2 className={styles.ctaTitle}>あなたのアニメ作品を掲載しませんか？</h2>
          <p className={styles.ctaDesc}>
            個人制作・チーム制作を問わず、インディーアニメ作品を募集中。
            <br />
            YouTubeに公開済みの作品をフォームから投稿するだけ。
          </p>
          <Link href="/submit" className="btn btn--primary">
            作品を投稿する →
          </Link>
        </div>
      </section>
    </>
  );
}
