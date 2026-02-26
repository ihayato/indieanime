import styles from './page.module.css';

export const metadata = {
    title: 'お問い合わせ | indieanime.jp',
    description: 'indieanime.jpへのお問い合わせ。',
};

export default function ContactPage() {
    return (
        <>
            <div className="page-header">
                <div className="container">
                    <h1 className="page-header__title gradient-text">お問い合わせ</h1>
                    <p className="page-header__description">
                        ご質問・ご要望がありましたらお気軽にご連絡ください
                    </p>
                </div>
            </div>

            <section className="section" style={{ paddingTop: 0 }}>
                <div className="container container--narrow">
                    <div className={styles.content}>
                        <div className={styles.infoCard}>
                            <div className={styles.infoIcon}>✉️</div>
                            <h2 className={styles.infoTitle}>メールでのお問い合わせ</h2>
                            <p className={styles.infoDesc}>
                                以下のメールアドレスまでお気軽にご連絡ください。
                                <br />
                                通常2〜3営業日以内に返信いたします。
                            </p>
                            <a href="mailto:nubonba@gmail.com" className={styles.emailLink}>
                                nubonba@gmail.com
                            </a>
                        </div>

                        <div className={styles.faq}>
                            <h2 className={styles.faqTitle}>よくある質問</h2>
                            <div className={styles.faqList}>
                                <div className={styles.faqItem}>
                                    <h3>Q. 作品の掲載までどれくらいかかりますか？</h3>
                                    <p>A. 投稿後、通常1〜3営業日以内に審査を行い、掲載いたします。</p>
                                </div>
                                <div className={styles.faqItem}>
                                    <h3>Q. 掲載された作品を削除してほしい場合は？</h3>
                                    <p>A. メールにてご連絡ください。確認の上、速やかに対応いたします。</p>
                                </div>
                                <div className={styles.faqItem}>
                                    <h3>Q. 商業作品でも投稿できますか？</h3>
                                    <p>A. 当サイトはインディー（個人・小規模チーム制作）作品を対象としています。企業制作の作品は対象外となります。</p>
                                </div>
                                <div className={styles.faqItem}>
                                    <h3>Q. 海外の作品でも投稿できますか？</h3>
                                    <p>A. はい、国籍を問わずインディーアニメ作品であれば投稿いただけます。</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
