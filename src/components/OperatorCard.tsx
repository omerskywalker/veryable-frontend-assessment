"use client";

import { Box, Button, Chip, Paper, Typography } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

import { Operator } from "@/types";
import { useOperatorCheckState } from "@/hooks/useOperatorCheckState";
import ReliabilityBadge from "./ReliabilityBadge";
import { formatTime } from "@/utils/formatTime";

type OperatorCardProps = {
  opKey: string | number;
  operator: Operator;
};

{
  /* mobile view: operator card component */
}
export default function OperatorCard({ opKey, operator }: OperatorCardProps) {
  const { state, isCheckedIn, toggle, hydrated } = useOperatorCheckState(
    opKey,
    operator.id,
  );

  const label = isCheckedIn ? "Check out" : "Check in";
  const Icon = isCheckedIn ? LogoutIcon : LoginIcon;
  const timestamp = isCheckedIn ? state.checkedInAt : state.checkedOutAt;

  return (
    <Paper
      elevation={0}
      sx={(theme) => ({
        p: 2,
        borderBottom: `1px solid ${theme.palette.divider}`,
        "&:last-of-type": { borderBottom: "none" },
      })}
    >
      {/* header: name + reliability */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          mb: 1.5,
          gap: 2,
        }}
      >
        <Box sx={{ minWidth: 0 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            {operator.firstName} {operator.lastName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {operator.opsCompleted} ops completed
          </Typography>
        </Box>

        <ReliabilityBadge reliability={operator.reliability} />
      </Box>

      {/* endorsements */}
      {operator.endorsements?.length ? (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75, mb: 2 }}>
          {operator.endorsements.map((endorsement, index) => (
            <Chip
              key={`${operator.id}-${endorsement}-${index}`}
              label={endorsement}
              size="small"
              variant="outlined"
              sx={(theme) => ({
                fontSize: theme.typography.pxToRem(12),
                fontWeight: 500,
                bgcolor: theme.palette.action.hover,
                color: theme.palette.text.secondary,
                borderColor: theme.palette.divider,
              })}
            />
          ))}
        </Box>
      ) : null}

      {/* check in/out action */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography variant="caption" color="text.secondary">
          {!hydrated
            ? "Loading status…"
            : timestamp
              ? `${isCheckedIn ? "Checked in" : "Checked out"}: ${formatTime(timestamp)}`
              : "—"}
        </Typography>

        <Button
          onClick={toggle}
          size="small"
          variant={isCheckedIn ? "contained" : "outlined"}
          startIcon={<Icon fontSize="small" />}
          disabled={!hydrated}
          sx={{ textTransform: "none", flexShrink: 0 }}
        >
          {label}
        </Button>
      </Box>
    </Paper>
  );
}
