import Link from 'next/link';
import styles from './Footer.module.css';

const footerLinks = [
    {
        title: 'コンテンツ',
        links: [
            { href: '/works', label: '作品一覧' },
            { href: '/submit', label: '作品を投稿' },
        ],
    },
    {
        title: 'サイト情報',
        links: [
            { href: '/about', label: 'About' },
            { href: '/contact', label: 'お問い合わせ' },
        ],
    },
    {
        title: '法的情報',
        links: [
            { href: '/privacy', label: 'プライバシーポリシー' },
            { href: '/terms', label: '利用規約' },
        ],
    },
];

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.inner}`}>
                <div className={styles.top}>
                    <div className={styles.brand}>
                        <span className="logo-text">indieanime.jp</span>
                        <p className={styles.tagline}>
                            インディーアニメの世界を、もっと広く。
                        </p>
                    </div>

                    <div className={styles.linksGrid}>
                        {footerLinks.map((group) => (
                            <div key={group.title} className={styles.linkGroup}>
                                <h4 className={styles.linkGroupTitle}>{group.title}</h4>
                                <ul className={styles.linkList}>
                                    {group.links.map((link) => (
                                        <li key={link.href}>
                                            <Link href={link.href} className={styles.link}>
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.bottom}>
                    <p className={styles.copyright}>
                        © 2026 indieanime.jp All rights reserved.
                    </p>
                </div>
            </div>

            {/* Rainbow gradient line */}
            <div className={styles.rainbowLine}></div>
        </footer>
    );
}
