"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import styles from "./RefreshButton.module.css";

export default function RefreshButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <button type="button" className={styles.button} onClick={handleClick} disabled={isPending}>
      <span className={`${styles.icon} ${isPending ? styles.spinning : ""}`} aria-hidden="true">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
          <path d="M17.65 6.35A7.96 7.96 0 0012 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
        </svg>
      </span>
      {isPending ? "Refreshing…" : "Refresh"}
    </button>
  );
}
