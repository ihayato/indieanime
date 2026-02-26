import Link from 'next/link';
import styles from './page.module.css';

export const metadata = {
    title: 'About | indieanime.jp',
    description: 'indieanime.jpについて。インディーアニメ文化を盛り上げるためのプラットフォームです。',
};

export default function AboutPage() {
    return (
        <>
            <div className="page-header">
                <div className="container">
                    <h1 className="page-header__title gradient-text">About</h1>
                    <p className="page-header__description">
                        indieanime.jp について
                    </p>
                </div>
            </div>

            <section className="section" style={{ paddingTop: 0 }}>
                <div className="container container--narrow">
                    <div className={styles.content}>
                        <div className={styles.mission}>
                            <h2 className={styles.sectionTitle}>🎯 ミッション</h2>
                            <p className={styles.lead}>
                                インディーアニメの世界を、もっと広く。
                            </p>
                            <p>
                                indieanime.jpは、個人クリエイターや小規模チームが制作したアニメーション作品を紹介するプラットフォームです。
                                まだ広く知られていない才能あるクリエイターたちの作品を、より多くの人に届けるために生まれました。
                            </p>
                        </div>

                        <div className={styles.section}>
                            <h2 className={styles.sectionTitle}>🌟 私たちが目指すこと</h2>
                            <div className={styles.valuesList}>
                                <div className={styles.valueItem}>
                                    <h3>クリエイターの発見</h3>
                                    <p>才能あるインディーアニメクリエイターと、それを求める視聴者をつなぐ場を作ります。</p>
                                </div>
                                <div className={styles.valueItem}>
                                    <h3>文化の発展</h3>
                                    <p>インディーアニメという文化を盛り上げ、クリエイターが制作を続けられる環境づくりに貢献します。</p>
                                </div>
                                <div className={styles.valueItem}>
                                    <h3>多様な表現</h3>
                                    <p>商業作品では見られない、個性的で実験的なアニメーション表現を応援します。</p>
                                </div>
                            </div>
                        </div>

                        <div className={styles.section}>
                            <h2 className={styles.sectionTitle}>📮 作品掲載について</h2>
                            <p>
                                YouTubeに公開済みのインディーアニメ作品であれば、どなたでも投稿いただけます。
                                投稿された作品は運営チームが確認の上、サイトに掲載いたします。
                            </p>
                            <div className={styles.ctaBox}>
                                <Link href="/submit" className="btn btn--primary">
                                    作品を投稿する →
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
