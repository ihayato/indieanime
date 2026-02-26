import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  metadataBase: new URL('https://indieanime.jp'),
  title: 'indieanime.jp [β] - インディーアニメの世界を、もっと広く。',
  description: 'インディーアニメ作品を発見・投稿できるプラットフォーム。個人・小規模チームが制作したアニメーション作品を紹介し、インディーアニメ文化を盛り上げます。',
  keywords: ['インディーアニメ', 'アニメーション', '自主制作アニメ', 'indie anime', 'animation'],
  openGraph: {
    title: 'indieanime.jp [β] - インディーアニメの世界を、もっと広く。',
    description: 'インディーアニメ作品を発見・投稿できるプラットフォーム。',
    url: 'https://indieanime.jp',
    siteName: 'indieanime.jp [β]',
    locale: 'ja_JP',
    type: 'website',
    images: [
      {
        url: '/ogp.jpg',
        width: 1200,
        height: 630,
        alt: 'indieanime.jp [β] - あなたのアニメを、世界に届けよう。',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'indieanime.jp [β]',
    description: 'インディーアニメ作品を発見・投稿できるプラットフォーム。',
    images: ['/ogp.jpg'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>
        <Header />
        <main style={{ paddingTop: 'var(--header-height)' }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
