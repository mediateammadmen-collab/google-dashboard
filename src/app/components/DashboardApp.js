"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Filters from "./Filters";
import DashboardTabs from "./DashboardTabs";
import fieldStyles from "./Filters.module.css";
import styles from "./DashboardApp.module.css";

// Only Gnext currently runs in more than one country - Jac and MGI are
// single-market clients, so the country filter has nothing to do for them.
const COUNTRY_FILTER_BRAND = "Gnext";

export default function DashboardApp({ tabs, dateRange, country }) {
  const [selectedBrand, setSelectedBrand] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  function navigate({ range, start, end, country: nextCountry }) {
    const params = new URLSearchParams();

    const effectiveRange = range ?? dateRange.key;
    params.set("range", effectiveRange);
    if (effectiveRange === "custom") {
      params.set("start", start ?? dateRange.start);
      params.set("end", end ?? dateRange.end);
    }

    const effectiveCountry = nextCountry !== undefined ? nextCountry : country;
    if (effectiveCountry) params.set("country", effectiveCountry);

    router.push(`${pathname}?${params.toString()}`);
  }

  function handleBrandChange(nextBrand) {
    setSelectedBrand(nextBrand);
    // Leaving Gnext (or deselecting) hides the country filter - clear any
    // country already set so it doesn't keep silently filtering the brand
    // that's now showing.
    if (nextBrand !== COUNTRY_FILTER_BRAND && country) {
      navigate({ country: null });
    }
  }

  const noBrandSelected = !selectedBrand;
  const isGnext = selectedBrand === COUNTRY_FILTER_BRAND;

  return (
    <div>
      <div className={styles.filterBar}>
        <div className={fieldStyles.field}>
          <label htmlFor="brand-select" className={fieldStyles.label}>
            Brand
          </label>
          <select
            id="brand-select"
            className={fieldStyles.select}
            value={selectedBrand}
            onChange={(e) => handleBrandChange(e.target.value)}
          >
            <option value="">Select a brand</option>
            {tabs.map((tab) => (
              <option key={tab.key} value={tab.key}>
                {tab.label}
              </option>
            ))}
          </select>
        </div>

        <Filters
          dateRange={dateRange}
          country={country}
          showCountry={noBrandSelected || isGnext}
          countryDisabled={noBrandSelected}
          onChange={navigate}
        />
      </div>

      <DashboardTabs tabs={tabs} selectedKey={selectedBrand} />
    </div>
  );
}
