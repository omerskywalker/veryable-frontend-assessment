"use client";
import {
  Box,
  Button,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import Chip from "@mui/material/Chip";
import { useMemo } from "react";
import { Operator } from "@/types";
import { useOperatorCheckState } from "@/hooks/useOperatorCheckState";
import OperatorCard from "./OperatorCard";
import ReliabilityBadge from "./ReliabilityBadge";

type OperatorRowProps = {
  opKey: string | number;
  operators: Operator[];
};

function CheckInOutCell({
  opKey,
  operatorId,
}: {
  opKey: number | string;
  operatorId: number | string;
}) {
  const { state, isCheckedIn, toggle, hydrated } = useOperatorCheckState(
    opKey,
    operatorId,
  );
  const label = isCheckedIn ? "Check out" : "Check in";
  const Icon = isCheckedIn ? LogoutIcon : LoginIcon;
  const timestamp = isCheckedIn ? state.checkedInAt : state.checkedOutAt;
  return (
    <Stack spacing={0.5} sx={{ width: "100%", alignItems: "center" }}>
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
      <Typography variant="caption" sx={{ textAlign: "center" }}>
        {!hydrated
          ? "Loading status…"
          : timestamp
            ? `${isCheckedIn ? "Checked in" : "Checked out"}: ${new Date(
                timestamp,
              ).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}`
            : "—"}
      </Typography>
    </Stack>
  );
}

export default function OperatorRow({ opKey, operators }: OperatorRowProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const columns = useMemo<GridColDef<Operator>[]>(
    () => [
      { field: "firstName", headerName: "First name", minWidth: 100, flex: 1 },
      { field: "lastName", headerName: "Last name", minWidth: 100, flex: 1 },
      {
        field: "opsCompleted",
        headerName: "Ops Completed",
        type: "number",
        minWidth: 100,
        flex: 1,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "reliability",
        headerName: "Reliability",
        type: "number",
        minWidth: 120,
        flex: 0.8,
        headerAlign: "center",
        align: "center",
        renderCell: (params) => <ReliabilityBadge reliability={params.value} />,
      },
      {
        field: "endorsements",
        headerName: "Endorsements",
        minWidth: 200,
        flex: 1.2,
        sortable: false,
        renderCell: (params: GridRenderCellParams<Operator>) => {
          const endorsements = params.value as string[];
          if (!endorsements || endorsements.length === 0) {
            return (
              <Typography variant="body2" sx={{ opacity: 0.5 }}>
                —
              </Typography>
            );
          }
          return (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center",
                gap: 0.5,
                py: 0.5,
                height: "100%",
              }}
            >
              {endorsements.map((endorsement, index) => (
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
                    "& .MuiChip-label": {
                      px: 1,
                    },
                  }}
                />
              ))}
            </Box>
          );
        },
      },
      {
        field: "checkInOut",
        headerName: "Check In/Check Out",
        minWidth: 180,
        flex: 1,
        sortable: false,
        filterable: false,
        headerAlign: "center",
        align: "center",
        renderCell: (params: GridRenderCellParams<Operator>) => (
          <CheckInOutCell opKey={opKey} operatorId={params.row.id} />
        ),
      },
    ],
    [opKey],
  );

  // mobile view: switch to card layout
  if (isMobile) {
    return (
      <Box sx={{ bgcolor: "background.paper" }}>
        {operators.map((operator) => (
          <OperatorCard key={operator.id} opKey={opKey} operator={operator} />
        ))}
      </Box>
    );
  }

  // desktop view: switch to DataGrid
  return (
    <Box sx={{ width: "100%" }}>
      <DataGrid
        sx={{
          "& .MuiDataGrid-cell:focus": { outline: "none" },
          "& .MuiDataGrid-cell:focus-within": { outline: "none" },
          "& .MuiDataGrid-cell": {
            display: "flex",
            alignItems: "center",
            py: 1.5,
          },
          "& .MuiDataGrid-selectedRowCount": { display: "none" },
        }}
        getRowHeight={() => "auto"}
        rows={operators}
        columns={columns}
        getRowId={(row) => row.id}
        density="compact"
        initialState={{
          pagination: { paginationModel: { pageSize: 5 } },
          sorting: {
            sortModel: [{ field: "reliability", sort: "desc" }],
          },
        }}
        pageSizeOptions={[5]}
        hideFooter={operators.length <= 5}
      />
    </Box>
  );
}
