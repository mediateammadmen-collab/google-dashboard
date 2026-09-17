import { formatMoney, formatNumber, formatPercent } from "@/lib/format";
import styles from "./ComparisonBar.module.css";

function formatValue(value, format) {
  if (format === "money") return formatMoney(value);
  if (format === "percent") return formatPercent(value);
  return formatNumber(value);
}

export default function ComparisonBar({ label, week1Value, week2Value, format }) {
  const max = Math.max(week1Value, week2Value, 0.0001);
  const width1 = week1Value > 0 ? Math.max((week1Value / max) * 100, 3) : 0;
  const width2 = week2Value > 0 ? Math.max((week2Value / max) * 100, 3) : 0;

  const change = week1Value === 0 ? (week2Value === 0 ? 0 : null) : ((week2Value - week1Value) / week1Value) * 100;
  const isUp = change !== null && change > 0.05;
  const isDown = change !== null && change < -0.05;

  return (
    <div className={styles.row}>
      <div className={styles.rowHeader}>
        <span className={styles.label}>{label}</span>
        <span
          className={`${styles.badge} ${isUp ? styles.badgeUp : ""} ${isDown ? styles.badgeDown : ""}`}
        >
          {change === null ? "New" : `${isUp ? "▲" : isDown ? "▼" : ""} ${Math.abs(change).toFixed(1)}%`}
        </span>
      </div>

      <div className={styles.barLine}>
        <span className={styles.value}>{formatValue(week1Value, format)}</span>
        <div className={styles.track}>
          <div className={styles.fillWeek1} style={{ width: `${width1}%` }} />
        </div>
      </div>
      <div className={styles.barLine}>
        <span className={styles.value}>{formatValue(week2Value, format)}</span>
        <div className={styles.track}>
          <div className={styles.fillWeek2} style={{ width: `${width2}%` }} />
        </div>
      </div>
    </div>
  );
}
