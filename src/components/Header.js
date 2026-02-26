'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

const navLinks = [
    { href: '/', label: 'ホーム' },
    { href: '/works', label: '作品一覧' },
    { href: '/submit', label: '作品を投稿' },
    { href: '/about', label: 'About' },
];

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className={styles.header}>
            <div className={`container ${styles.inner}`}>
                <Link href="/" className={styles.logo}>
                    <span className="logo-text">indieanime.jp</span>
                </Link>

                <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={styles.navLink}
                            onClick={() => setMenuOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <button
                    className={`${styles.menuBtn} ${menuOpen ? styles.menuBtnOpen : ''}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="メニュー"
                    aria-expanded={menuOpen}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </header>
    );
}
