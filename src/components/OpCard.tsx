import { Op } from "@/types";
import Card from "@mui/material/Card";
import { Box, CardContent, Typography } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import { styled } from "@mui/material/styles";
import OperatorRow from "./OperatorRow";

interface OpCardProps {
  op: Op;
}

const formatDate = (dateString: string) => {
  if (!dateString) return "";
  const d = new Date(dateString);
  return d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
};

const StyledCard = styled(Card)({
  backgroundColor: "#2081C3",
  color: "white",
});

export default function OpCard({ op }: OpCardProps) {
  return (
    <StyledCard sx={{ marginBottom: "1.5%" }} variant="outlined">
      <CardHeader
        sx={{
          pb: 0,
          "& .MuiCardHeader-title": {
            padding: "20px 0 0 0",
            textShadow: "2px 2px 1px black",
            textAlign: "center",
            fontSize: "1.5rem",
          },
        }}
        title={"OP: " + op.opTitle}
      ></CardHeader>

      <CardContent
        sx={{
          display: "flex",
          justifyContent: "space-between",
          paddingTop: "0",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Typography>Operators Needed: {op.operatorsNeeded}</Typography>
          <Typography>Public ID: {op.publicId}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <Typography>Start Time: {formatDate(op.startTime)}</Typography>
          <Typography>End Time: {formatDate(op.endTime)}</Typography>
        </Box>
      </CardContent>

      <OperatorRow opKey={op.opId} operators={op.operators} />
    </StyledCard>
  );
}
