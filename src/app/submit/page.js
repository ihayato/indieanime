import styles from './page.module.css';

export const metadata = {
    title: '作品を投稿する | indieanime.jp',
    description: 'あなたのインディーアニメ作品をindieanime.jpに投稿しましょう。YouTubeに公開済みの作品をフォームから投稿するだけで、審査後に掲載されます。',
};

export default function SubmitPage() {
    return (
        <>
            <div className="page-header">
                <div className="container">
                    <h1 className="page-header__title gradient-text">作品を投稿する</h1>
                    <p className="page-header__description">
                        あなたのインディーアニメ作品を世界に届けましょう
                    </p>
                </div>
            </div>

            <section className="section" style={{ paddingTop: 0 }}>
                <div className="container container--narrow">
                    {/* Guidelines */}
                    <div className={styles.guidelines}>
                        <h2 className={styles.guidelinesTitle}>📋 投稿ガイドライン</h2>
                        <div className={styles.guidelinesList}>
                            <div className={styles.guidelineItem}>
                                <div className={styles.guidelineIcon}>1</div>
                                <div>
                                    <h3>YouTubeに作品を公開する</h3>
                                    <p>投稿する作品をYouTubeにアップロードし、公開状態にしてください。限定公開でもOKです。</p>
                                </div>
                            </div>
                            <div className={styles.guidelineItem}>
                                <div className={styles.guidelineIcon}>2</div>
                                <div>
                                    <h3>フォームから投稿する</h3>
                                    <p>以下のフォームから、作品タイトル、YouTubeリンク、説明文などを入力してください。</p>
                                </div>
                            </div>
                            <div className={styles.guidelineItem}>
                                <div className={styles.guidelineIcon}>3</div>
                                <div>
                                    <h3>審査後に掲載</h3>
                                    <p>運営チームが内容を確認した後、サイトに掲載されます。通常1〜3営業日以内に完了します。</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Conditions */}
                    <div className={styles.conditions}>
                        <h3 className={styles.conditionsTitle}>投稿条件</h3>
                        <ul className={styles.conditionsList}>
                            <li>個人またはインディーチームが制作したオリジナルアニメーション作品であること</li>
                            <li>YouTubeに公開済みの作品であること</li>
                            <li>他者の著作権を侵害していないこと</li>
                            <li>公序良俗に反する内容でないこと</li>
                        </ul>
                    </div>

                    {/* Google Form Embed */}
                    <div className={styles.formSection}>
                        <h2 className={styles.formTitle}>投稿フォーム</h2>
                        <div className={styles.formEmbed}>
                            <iframe
                                src="https://docs.google.com/forms/d/e/1FAIpQLSfbyTscah8Thz12l4kloCF2nbqytiX84GQCcePyJL6ZR1f9tg/viewform?embedded=true"
                                width="100%"
                                height="900"
                                frameBorder="0"
                                marginHeight="0"
                                marginWidth="0"
                                title="作品投稿フォーム"
                            >
                                読み込んでいます…
                            </iframe>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
