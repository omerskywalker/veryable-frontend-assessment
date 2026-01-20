import { Box, Typography } from "@mui/material";

type ReliabilityBadgeProps = {
  reliability: number;
};

const getReliabilityColors = (pct: number) => {
  if (pct >= 90) return { bg: "#dcfce7", text: "#166534", dot: "#22c55e" };
  if (pct >= 70) return { bg: "#fef3c7", text: "#92400e", dot: "#f59e0b" };
  return { bg: "#fee2e2", text: "#991b1b", dot: "#ef4444" };
};

export default function ReliabilityBadge({
  reliability,
}: ReliabilityBadgeProps) {
  const pct = Math.round(reliability * 100);
  const colors = getReliabilityColors(pct);

  return (
    <Box
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
        }}
      />
      <Typography
        sx={{ fontSize: "0.875rem", fontWeight: 500, color: colors.text }}
      >
        {pct}%
      </Typography>
    </Box>
  );
}
