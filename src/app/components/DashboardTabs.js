import StatTile from "./StatTile";
import TrendChart from "./TrendChart";
import CampaignCards from "./CampaignCards";
import { channelTypeLabel } from "@/lib/campaignGrouping";
import { formatMoney, formatCompact } from "@/lib/format";
import styles from "./DashboardTabs.module.css";

export default function DashboardTabs({ tabs, selectedKey }) {
  if (tabs.length === 0) {
    return <p className={styles.empty}>No campaigns match the current filters.</p>;
  }

  if (!selectedKey) {
    return <p className={styles.empty}>Select a brand above to view its campaigns.</p>;
  }

  const active = tabs.find((t) => t.key === selectedKey);

  if (!active) {
    return <p className={styles.empty}>Select a brand above to view its campaigns.</p>;
  }

  return (
    <div className={styles.panel}>
      <section className={styles.stats}>
        <StatTile label="Spend" value={formatMoney(active.totals.cost)} />
        <StatTile label="Impressions" value={formatCompact(active.totals.impressions)} />
        <StatTile label="Clicks" value={formatCompact(active.totals.clicks)} />
        {active.totals.conversions > 0 && (
          <StatTile label="Conversions" value={formatCompact(active.totals.conversions)} />
        )}
      </section>

      <section className={styles.charts}>
        <TrendChart title="Spend" data={active.trend} metric="cost" format="currency" />
        <TrendChart title="Clicks" data={active.trend} metric="clicks" format="number" />
      </section>

      {active.channelGroups.map(({ channelType, campaigns }) => (
        <section className={styles.tableSection} key={channelType}>
          <h2 className={styles.sectionTitle}>{channelTypeLabel(channelType)} campaigns</h2>
          <CampaignCards
            campaigns={campaigns}
            variant={channelType === "VIDEO" ? "video" : "standard"}
          />
        </section>
      ))}
    </div>
  );
}
