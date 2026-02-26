export const metadata = {
    title: 'プライバシーポリシー | indieanime.jp [β]',
    description: 'indieanime.jpのプライバシーポリシーについて。',
};

export default function PrivacyPage() {
    return (
        <>
            <div className="page-header">
                <div className="container">
                    <h1 className="page-header__title">プライバシーポリシー</h1>
                </div>
            </div>

            <section className="section" style={{ paddingTop: 0 }}>
                <div className="container">
                    <div className="prose">
                        <p>
                            indieanime.jp（以下「当サイト」）は、ユーザーの個人情報の取扱いについて、
                            以下のとおりプライバシーポリシー（以下「本ポリシー」）を定めます。
                        </p>

                        <h2>1. 収集する情報</h2>
                        <p>当サイトでは、以下の情報を収集する場合があります。</p>
                        <ul>
                            <li>作品投稿フォームで入力された情報（制作者名、SNSアカウント等）</li>
                            <li>お問い合わせフォームで入力された情報</li>
                            <li>アクセス解析ツールにより収集される情報（Cookie、IPアドレス、閲覧ページ等）</li>
                        </ul>

                        <h2>2. 情報の利用目的</h2>
                        <p>収集した情報は、以下の目的で利用します。</p>
                        <ul>
                            <li>投稿された作品の掲載・管理</li>
                            <li>お問い合わせへの対応</li>
                            <li>サイトの改善・運営</li>
                        </ul>

                        <h2>3. 第三者への提供</h2>
                        <p>
                            収集した個人情報は、法令に基づく場合を除き、本人の同意なく第三者に提供することはありません。
                        </p>

                        <h2>4. Cookieについて</h2>
                        <p>
                            当サイトでは、アクセス解析のためにCookieを使用する場合があります。
                            ブラウザの設定によりCookieの受け入れを拒否することが可能ですが、
                            一部のサービスが正常に動作しない場合があります。
                        </p>

                        <h2>5. 外部サービス</h2>
                        <p>
                            当サイトでは、YouTube動画の埋め込みを行っています。
                            YouTube利用時のプライバシーについては、Google社のプライバシーポリシーをご確認ください。
                        </p>

                        <h2>6. お問い合わせ</h2>
                        <p>
                            本ポリシーに関するお問い合わせは、お問い合わせページよりご連絡ください。
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
