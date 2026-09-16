"use client";

import { useRef, useState } from "react";
import styles from "./TrendChart.module.css";

const WIDTH = 600;
const HEIGHT = 220;
const PAD_LEFT = 56;
const PAD_RIGHT = 12;
const PAD_TOP = 16;
const PAD_BOTTOM = 28;
const INNER_WIDTH = WIDTH - PAD_LEFT - PAD_RIGHT;
const INNER_HEIGHT = HEIGHT - PAD_TOP - PAD_BOTTOM;

function formatValue(value, format) {
  if (format === "currency") {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  }
  return new Intl.NumberFormat("en-US").format(Math.round(value));
}

function formatDate(dateStr) {
  return new Date(`${dateStr}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export default function TrendChart({ title, data, metric, format }) {
  const [hoverIndex, setHoverIndex] = useState(null);
  const svgRef = useRef(null);

  if (data.length === 0) {
    return (
      <div className={styles.card}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.empty}>No data for this period</p>
      </div>
    );
  }

  const maxValue = Math.max(...data.map((d) => d[metric]), 0);
  const yMax = maxValue === 0 ? 1 : maxValue * 1.15;

  const points = data.map((d, i) => ({
    x:
      PAD_LEFT +
      (data.length === 1 ? INNER_WIDTH / 2 : (i / (data.length - 1)) * INNER_WIDTH),
    y: PAD_TOP + INNER_HEIGHT - (d[metric] / yMax) * INNER_HEIGHT,
    ...d,
  }));

  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
    .join(" ");
  const areaPath = `${linePath} L ${points[points.length - 1].x.toFixed(2)} ${
    PAD_TOP + INNER_HEIGHT
  } L ${points[0].x.toFixed(2)} ${PAD_TOP + INNER_HEIGHT} Z`;

  const tickCount = 4;
  const tickValues = Array.from({ length: tickCount + 1 }, (_, i) => (yMax / tickCount) * i);

  function handlePointerMove(e) {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * WIDTH;
    let closest = 0;
    let closestDist = Infinity;
    points.forEach((p, i) => {
      const dist = Math.abs(p.x - x);
      if (dist < closestDist) {
        closestDist = dist;
        closest = i;
      }
    });
    setHoverIndex(closest);
  }

  const hovered = hoverIndex !== null ? points[hoverIndex] : null;

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.chartWrap}>
        <svg
          ref={svgRef}
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className={styles.svg}
          onPointerMove={handlePointerMove}
          onPointerLeave={() => setHoverIndex(null)}
        >
          {tickValues.map((v, i) => {
            const y = PAD_TOP + INNER_HEIGHT - (v / yMax) * INNER_HEIGHT;
            return (
              <g key={i}>
                <line
                  x1={PAD_LEFT}
                  x2={WIDTH - PAD_RIGHT}
                  y1={y}
                  y2={y}
                  className={styles.gridline}
                />
                <text x={PAD_LEFT - 8} y={y + 4} textAnchor="end" className={styles.axisLabel}>
                  {formatValue(v, format)}
                </text>
              </g>
            );
          })}

          <path d={areaPath} className={styles.area} />
          <path d={linePath} className={styles.line} />

          {hovered && (
            <>
              <line
                x1={hovered.x}
                x2={hovered.x}
                y1={PAD_TOP}
                y2={PAD_TOP + INNER_HEIGHT}
                className={styles.crosshair}
              />
              <circle cx={hovered.x} cy={hovered.y} r="5" className={styles.dot} />
            </>
          )}
        </svg>

        {hovered && (
          <div
            className={styles.tooltip}
            style={{
              left: `${(hovered.x / WIDTH) * 100}%`,
              top: `${(hovered.y / HEIGHT) * 100}%`,
            }}
          >
            <div className={styles.tooltipDate}>{formatDate(hovered.date)}</div>
            <div className={styles.tooltipValue}>{formatValue(hovered[metric], format)}</div>
          </div>
        )}
      </div>
    </div>
  );
}
