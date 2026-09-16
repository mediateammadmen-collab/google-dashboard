"use client";

import DateRangePicker from "./DateRangePicker";
import { COUNTRIES } from "@/lib/countries";
import styles from "./Filters.module.css";

export default function Filters({
  dateRange,
  country,
  showCountry = true,
  countryDisabled = false,
  onChange,
}) {
  return (
    <div className={styles.filters}>
      <DateRangePicker
        range={dateRange.key}
        start={dateRange.start}
        end={dateRange.end}
        onChange={(next) => onChange(next)}
      />

      {showCountry && (
        <div className={styles.field}>
          <label htmlFor="country-select" className={styles.label}>
            Country
          </label>
          <select
            id="country-select"
            className={styles.select}
            value={country ?? "all"}
            disabled={countryDisabled}
            title={countryDisabled ? "Select a brand first" : undefined}
            onChange={(e) => onChange({ country: e.target.value === "all" ? null : e.target.value })}
          >
            <option value="all">All countries</option>
            {COUNTRIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}
