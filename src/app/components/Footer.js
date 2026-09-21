import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <span className={styles.copyright}>&copy; {year} Gnext</span>
        <nav className={styles.links}>
          <Link href="/privacy" className={styles.link}>
            Privacy Policy
          </Link>
          <Link href="/terms" className={styles.link}>
            Terms of Service
          </Link>
        </nav>
      </div>
    </footer>
  );
}
