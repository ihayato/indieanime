export const metadata = {
    title: '利用規約 | indieanime.jp',
    description: 'indieanime.jpの利用規約について。',
};

export default function TermsPage() {
    return (
        <>
            <div className="page-header">
                <div className="container">
                    <h1 className="page-header__title">利用規約</h1>
                </div>
            </div>

            <section className="section" style={{ paddingTop: 0 }}>
                <div className="container">
                    <div className="prose">
                        <p>
                            この利用規約（以下「本規約」）は、indieanime.jp（以下「当サイト」）の利用条件を定めるものです。
                            当サイトを利用する全てのユーザーは本規約に同意したものとみなします。
                        </p>

                        <h2>1. サービス概要</h2>
                        <p>
                            当サイトは、インディーアニメ作品を紹介・発見するためのプラットフォームです。
                            ユーザーはYouTubeに公開済みのアニメーション作品を投稿することができ、
                            運営による審査後にサイトに掲載されます。
                        </p>

                        <h2>2. 投稿作品について</h2>
                        <ul>
                            <li>投稿する作品は、投稿者自身またはそのチームが制作したオリジナル作品に限ります。</li>
                            <li>他者の著作権、商標権、その他の権利を侵害する作品の投稿は禁止します。</li>
                            <li>公序良俗に反する内容の投稿は禁止します。</li>
                            <li>運営は、不適切と判断した作品を予告なく掲載停止する権利を有します。</li>
                        </ul>

                        <h2>3. 著作権</h2>
                        <p>
                            投稿された作品の著作権は、各制作者に帰属します。
                            当サイトは、作品の紹介・宣伝を目的として、投稿された情報（サムネイル画像、タイトル、説明文等）を
                            サイト上に表示する権利を有するものとします。
                        </p>

                        <h2>4. 免責事項</h2>
                        <ul>
                            <li>当サイトに掲載される情報の正確性、完全性について保証しません。</li>
                            <li>当サイトの利用により生じたいかなる損害についても責任を負いません。</li>
                            <li>YouTube動画の視聴に関しては、YouTube及びGoogle社の利用規約が適用されます。</li>
                            <li>当サイトは、予告なくサービスの変更・中断・終了を行う場合があります。</li>
                        </ul>

                        <h2>5. 規約の変更</h2>
                        <p>
                            運営は、必要に応じて本規約を変更できるものとします。
                            変更後の規約は、当サイトに掲載した時点で効力を生じるものとします。
                        </p>

                        <h2>6. 準拠法</h2>
                        <p>
                            本規約の解釈にあたっては、日本法を準拠法とします。
                        </p>

                        <p style={{ marginTop: '40px', fontSize: '0.85rem', color: 'var(--color-text-light)' }}>
                            制定日: 2026年2月26日
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}
