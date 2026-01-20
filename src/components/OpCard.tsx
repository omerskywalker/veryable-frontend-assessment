import { Op } from "@/types";
import Card from "@mui/material/Card";
import { Box, Typography } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import { styled } from "@mui/material/styles";
import OperatorRow from "./OperatorRow";
import Chip from "@mui/material/Chip";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PeopleIcon from "@mui/icons-material/People";
import TagIcon from "@mui/icons-material/Tag";
import { calculateHours } from "@/utils/calculateHours";
import { formatDate } from "@/utils/formatDate";

interface OpCardProps {
  op: Op;
}

const StyledCard = styled(Card)({
  backgroundColor: "#2081C3",
  color: "white",
});

export default function OpCard({ op }: OpCardProps) {
  return (
    <StyledCard sx={{ marginBottom: "1.5%" }} variant="outlined">
      <CardHeader
        sx={{
          pb: 2,
          "& .MuiCardHeader-content": { width: "100%" },
          "& .MuiTypography-h6": {
            color: "white",
            fontWeight: "bold",
            fontSize: "1.25rem",
          },
        }}
        title={
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            {/* title row */}
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, letterSpacing: "-0.01em" }}
            >
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
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    opacity: 0.9,
                  }}
                >
                  <TagIcon sx={{ fontSize: 16 }} />
                  <Typography variant="body2" sx={{ fontFamily: "monospace" }}>
                    {op.publicId}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <PeopleIcon sx={{ fontSize: 16, opacity: 0.9 }} />
                  <Typography variant="body2">
                    {op.operators.length}/{op.operatorsNeeded} Operators
                  </Typography>
                  <Chip
                    size="small"
                    label={
                      op.operators.length >= op.operatorsNeeded
                        ? "Filled"
                        : `Needs ${op.operatorsNeeded - op.operators.length}`
                    }
                    sx={{
                      height: 22,
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      padding: "2px 6px",
                      border: "1px solid white",
                      bgcolor:
                        op.operators.length >= op.operatorsNeeded
                          ? "rgba(25, 135, 84, 1)"
                          : "#f59e0b",
                      color: "white",
                    }}
                  />
                </Box>
              </Box>
              {/* time info */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  gap: 0.25,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <AccessTimeIcon sx={{ fontSize: 16 }} />
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {formatDate(op.startTime)} — {formatDate(op.endTime)}
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

      <OperatorRow opKey={op.opId} operators={op.operators} />
    </StyledCard>
  );
}
