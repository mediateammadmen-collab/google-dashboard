import Link from "next/link";
import styles from "../legal.module.css";

export const metadata = {
  title: "Privacy Policy — Gnext Ads Dashboard",
};

export default function PrivacyPolicy() {
  return (
    <main className={styles.page}>
      <Link href="/" className={styles.back}>
        &larr; Back to dashboard
      </Link>

      <h1 className={styles.title}>Privacy Policy</h1>
      <p className={styles.updated}>Last updated: September 21, 2026</p>

      <div className={styles.section}>
        <h2 className={styles.heading}>Overview</h2>
        <p className={styles.body}>
          This Privacy Policy explains how the Gnext Google Ads Dashboard
          (&quot;the Dashboard&quot;, &quot;we&quot;, &quot;us&quot;) accesses
          and uses data when connecting to the Google Ads API. The Dashboard
          is an internal reporting tool used by Gnext to review the
          performance of its own Google Ads advertising campaigns.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.heading}>Information We Access</h2>
        <p className={styles.body}>
          Using the Google Ads API, the Dashboard reads the following data
          from the connected Google Ads account, limited to campaigns owned
          by Gnext:
        </p>
        <ul className={styles.list}>
          <li>Campaign, ad group, ad, and keyword performance metrics (e.g. impressions, clicks, cost, conversions, video views)</li>
          <li>Ad creative content (headlines, descriptions, images, and videos) and its approval status</li>
          <li>Geographic targeting data (country-level)</li>
        </ul>
        <p className={styles.body}>
          We do not access, request, or store personal information about end
          customers who view or click on Gnext&apos;s ads. We do not access
          billing, payment, or account-management data beyond what is
          required to read campaign performance.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.heading}>How We Use Information</h2>
        <p className={styles.body}>
          Data retrieved from the Google Ads API is used solely to display
          performance dashboards, charts, and reports to authorized Gnext
          staff, for the purpose of evaluating and improving advertising
          performance. Data is not used for any other purpose.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.heading}>Data Storage &amp; Retention</h2>
        <p className={styles.body}>
          The Dashboard does not maintain its own database of Google Ads
          data. Each time a report is viewed, data is fetched live from the
          Google Ads API and rendered directly to the page; it is not
          persisted beyond the request needed to render that view.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.heading}>Data Sharing</h2>
        <p className={styles.body}>
          We do not sell, rent, or share data obtained from the Google Ads
          API with any third party. Access to the Dashboard is restricted to
          authorized Gnext personnel.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.heading}>Compliance with Google API Services User Data Policy</h2>
        <p className={styles.body}>
          The Dashboard&apos;s use and transfer of information received from
          Google APIs adheres to the{" "}
          <a
            href="https://developers.google.com/terms/api-services-user-data-policy"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "underline" }}
          >
            Google API Services User Data Policy
          </a>
          , including the Limited Use requirements.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.heading}>Security</h2>
        <p className={styles.body}>
          Access to the Google Ads account is authorized via OAuth 2.0.
          Credentials and tokens used to connect to the Google Ads API are
          kept private and are never exposed to the browser or to any party
          outside of Gnext.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.heading}>Changes to This Policy</h2>
        <p className={styles.body}>
          We may update this Privacy Policy from time to time. Changes will
          be posted on this page with an updated revision date.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.heading}>Contact Us</h2>
        <p className={styles.body}>
          If you have any questions about this Privacy Policy, contact us at{" "}
          <a href="mailto:mediateammadmen@gmail.com" style={{ textDecoration: "underline" }}>
            mediateammadmen@gmail.com
          </a>
          .
        </p>
      </div>
    </main>
  );
}
