import Link from "next/link";
import styles from "../legal.module.css";

export const metadata = {
  title: "Terms of Service — Gnext Ads Dashboard",
};

export default function TermsOfService() {
  return (
    <main className={styles.page}>
      <Link href="/" className={styles.back}>
        &larr; Back to dashboard
      </Link>

      <h1 className={styles.title}>Terms of Service</h1>
      <p className={styles.updated}>Last updated: September 21, 2026</p>

      <div className={styles.section}>
        <h2 className={styles.heading}>Acceptance of Terms</h2>
        <p className={styles.body}>
          By accessing or using the Gnext Google Ads Dashboard
          (&quot;the Dashboard&quot;), you agree to be bound by these Terms
          of Service. If you do not agree, do not use the Dashboard.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.heading}>Description of Service</h2>
        <p className={styles.body}>
          The Dashboard is an internal reporting tool that connects to the
          Google Ads API to display performance data — such as spend,
          impressions, clicks, conversions, keywords, and ad creatives — for
          Gnext&apos;s own Google Ads campaigns.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.heading}>Authorized Use</h2>
        <p className={styles.body}>
          The Dashboard is intended solely for use by Gnext and its
          authorized staff to review advertising performance. You agree not
          to use the Dashboard to access, or attempt to access, any Google
          Ads account or data you are not authorized to view.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.heading}>Data Accuracy</h2>
        <p className={styles.body}>
          Data displayed on the Dashboard is retrieved directly from the
          Google Ads API and is provided for informational purposes only.
          While we aim to present this data accurately, we do not guarantee
          its completeness or accuracy, and it should not be treated as the
          sole basis for financial or business decisions without
          cross-checking against Google Ads directly.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.heading}>Third-Party Services</h2>
        <p className={styles.body}>
          The Dashboard relies on the Google Ads API to function, and links
          to a separate Meta Ads reporting dashboard. Use of those
          third-party services is subject to their own respective terms and
          policies.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.heading}>Limitation of Liability</h2>
        <p className={styles.body}>
          The Dashboard is provided &quot;as is&quot;, without warranties of
          any kind. Gnext shall not be liable for any damages arising from
          the use of, or inability to use, the Dashboard, including but not
          limited to inaccuracies in reported advertising data.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.heading}>Changes to These Terms</h2>
        <p className={styles.body}>
          We may revise these Terms of Service from time to time. Continued
          use of the Dashboard after changes are posted constitutes
          acceptance of the revised terms.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.heading}>Contact Us</h2>
        <p className={styles.body}>
          If you have any questions about these Terms of Service, contact us
          at{" "}
          <a href="mailto:mediateammadmen@gmail.com" style={{ textDecoration: "underline" }}>
            mediateammadmen@gmail.com
          </a>
          .
        </p>
      </div>
    </main>
  );
}
