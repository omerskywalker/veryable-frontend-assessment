"use client";
import { Box, Button, Chip, Paper, Stack, Typography } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { Operator } from "@/types";
import { useOperatorCheckState } from "@/hooks/useOperatorCheckState";
import ReliabilityBadge from "./ReliabilityBadge";

type OperatorCardProps = {
  opKey: string | number;
  operator: Operator;
};

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
      sx={{
        p: 2,
        borderBottom: "1px solid",
        borderColor: "divider",
        "&:last-child": { borderBottom: "none" },
      }}
    >
      {/* header: name + reliability */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          mb: 1.5,
        }}
      >
        <Box>
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
      {operator.endorsements && operator.endorsements.length > 0 && (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 2 }}>
          {operator.endorsements.map((endorsement, index) => (
            <Chip
              key={index}
              label={endorsement}
              size="small"
              sx={{
                height: 22,
                fontSize: "0.7rem",
                fontWeight: 500,
                bgcolor: "rgba(0, 0, 0, 0.06)",
                color: "text.secondary",
              }}
            />
          ))}
        </Box>
      )}

      {/* check in/out action */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="caption" color="text.secondary">
          {!hydrated
            ? "Loading status…"
            : timestamp
              ? `${isCheckedIn ? "Checked in" : "Checked out"}: ${new Date(
                  timestamp,
                ).toLocaleTimeString([], {
                  hour: "numeric",
                  minute: "2-digit",
                })}`
              : "—"}
        </Typography>
        <Button
          onClick={toggle}
          size="small"
          variant={isCheckedIn ? "contained" : "outlined"}
          startIcon={<Icon />}
          disabled={!hydrated}
          sx={{ textTransform: "none" }}
        >
          {label}
        </Button>
      </Box>
    </Paper>
  );
}
