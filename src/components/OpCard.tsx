import { Op } from "@/types";
import OperatorRow from "./OperatorRow";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Chip from "@mui/material/Chip";
import { Box, Typography } from "@mui/material";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PeopleIcon from "@mui/icons-material/People";
import TagIcon from "@mui/icons-material/Tag";

import { calculateHours } from "@/utils/calculateHours";
import { formatTime } from "@/utils/formatTime";

interface OpCardProps {
  op: Op & { filteredOperators?: Op["operators"] };
}

export default function OpCard({ op }: OpCardProps) {
  const isFilled = op.operators.length >= op.operatorsNeeded;
  const shortage = Math.max(0, op.operatorsNeeded - op.operators.length);

  const operatorsToShow = op.filteredOperators ?? op.operators;

  return (
    <Card
      variant="outlined"
      sx={(theme) => ({
        mb: 2,
        bgcolor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        "& .MuiTypography-h4": { color: theme.palette.primary.contrastText },
      })}
    >
      <CardHeader
        sx={{
          pb: 2,
          "& .MuiCardHeader-content": { width: "100%" },
        }}
        title={
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            {/* title row */}
            <Typography variant="h4" sx={{ letterSpacing: "-0.01em" }}>
              {op.opTitle}
            </Typography>

            {/* metadata row */}
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 2,
              }}
            >
              {/* operators + status */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  flexWrap: "wrap",
                }}
              >
                {/* public id */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    opacity: 0.9,
                  }}
                >
                  <TagIcon fontSize="small" />
                  <Typography variant="body2" sx={{ fontFamily: "monospace" }}>
                    {op.publicId}
                  </Typography>
                </Box>

                {/* headcount + chip */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    flexWrap: "wrap",
                  }}
                >
                  <PeopleIcon fontSize="small" sx={{ opacity: 0.9 }} />
                  <Typography variant="body2">
                    {op.operators.length}/{op.operatorsNeeded} Operators
                  </Typography>

                  <Chip
                    size="small"
                    label={isFilled ? "Filled" : `Needs ${shortage}`}
                    sx={(theme) => {
                      const bg = isFilled
                        ? theme.palette.success.main
                        : theme.palette.warning.main;

                      return {
                        fontSize: theme.typography.pxToRem(12),
                        fontWeight: 600,
                        px: 0.75,
                        py: 0.25,
                        border: `1px solid ${theme.palette.common.white}`,
                        bgcolor: bg,
                        color: theme.palette.getContrastText(bg),
                      };
                    }}
                  />
                </Box>
              </Box>

              {/* time info */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: { xs: "flex-start", sm: "flex-end" },
                  gap: 0.25,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <AccessTimeIcon fontSize="small" />
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {formatTime(op.startTime)} — {formatTime(op.endTime)}
                  </Typography>
                </Box>

                <Typography variant="caption" sx={{ opacity: 0.7 }}>
                  {calculateHours(op.startTime, op.endTime)} hours estimated
                </Typography>
              </Box>
            </Box>
          </Box>
        }
      />

      <OperatorRow opKey={op.opId} operators={operatorsToShow} />
    </Card>
  );
}
