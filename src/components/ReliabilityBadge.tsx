import { Box, Typography } from "@mui/material";

type ReliabilityBadgeProps = {
  reliability: number; // 0–1
};

type ReliabilityTone = "good" | "warning" | "bad";

const getTone = (pct: number): ReliabilityTone => {
  if (pct >= 90) return "good";
  if (pct >= 70) return "warning";
  return "bad";
};

const RELIABILITY_COLORS: Record<
  ReliabilityTone,
  { bg: string; text: string; dot: string }
> = {
  good: {
    bg: "#dcfce7",
    text: "#166534",
    dot: "#22c55e",
  },
  warning: {
    bg: "#fef3c7",
    text: "#92400e",
    dot: "#f59e0b",
  },
  bad: {
    bg: "#fee2e2",
    text: "#991b1b",
    dot: "#ef4444",
  },
};

export default function ReliabilityBadge({
  reliability,
}: ReliabilityBadgeProps) {
  const pct = Math.round(reliability * 100);
  const tone = getTone(pct);
  const colors = RELIABILITY_COLORS[tone];

  return (
    <Box
      role="status"
      aria-label={`Reliability ${pct} percent`}
      title={`Reliability: ${pct}%`}
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0.75,
        px: 1.5,
        py: 0.5,
        borderRadius: 1,
        bgcolor: colors.bg,
      }}
    >
      <Box
        sx={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          bgcolor: colors.dot,
          flexShrink: 0,
        }}
      />
      <Typography
        variant="body2"
        sx={{
          fontWeight: 600,
          color: colors.text,
          lineHeight: 1,
        }}
      >
        {pct}%
      </Typography>
    </Box>
  );
}
