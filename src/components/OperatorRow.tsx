"use client";

import { useMemo } from "react";
import {
  Box,
  Button,
  Chip,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

import { Operator } from "@/types";
import { useOperatorCheckState } from "@/hooks/useOperatorCheckState";
import OperatorCard from "./OperatorCard";
import ReliabilityBadge from "./ReliabilityBadge";
import { formatTime } from "@/utils/formatTime";

type OperatorRowProps = {
  opKey: string | number;
  operators: Operator[];
};

function CheckInOutCell({
  opKey,
  operatorId,
}: {
  opKey: string | number;
  operatorId: string | number;
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
        startIcon={<Icon fontSize="small" />}
        disabled={!hydrated}
        sx={{ textTransform: "none" }}
      >
        {label}
      </Button>

      <Typography variant="caption" sx={{ textAlign: "center" }}>
        {!hydrated
          ? "Loading status…"
          : timestamp
            ? `${isCheckedIn ? "Checked in" : "Checked out"}: ${formatTime(timestamp)}`
            : "—"}
      </Typography>
    </Stack>
  );
}

const dataGridSx = {
  "& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within": {
    outline: "none",
  },
  "& .MuiDataGrid-cell": {
    display: "flex",
    alignItems: "center",
    py: 1.5,
  },
  "& .MuiDataGrid-selectedRowCount": { display: "none" },
};

export default function OperatorRow({ opKey, operators }: OperatorRowProps) {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const columns = useMemo<GridColDef<Operator>[]>(() => {
    return [
      { field: "firstName", headerName: "First name", minWidth: 120, flex: 1 },
      { field: "lastName", headerName: "Last name", minWidth: 120, flex: 1 },
      {
        field: "opsCompleted",
        headerName: "Ops Completed",
        type: "number",
        minWidth: 140,
        flex: 0.8,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "reliability",
        headerName: "Reliability",
        type: "number",
        minWidth: 140,
        flex: 0.8,
        headerAlign: "center",
        align: "center",
        renderCell: (params) => <ReliabilityBadge reliability={params.value} />,
      },
      {
        field: "endorsements",
        headerName: "Endorsements",
        minWidth: 220,
        flex: 1.2,
        sortable: false,
        renderCell: (
          params: GridRenderCellParams<Operator, string[] | undefined>,
        ) => {
          const endorsements = params.value ?? [];

          if (endorsements.length === 0) {
            return (
              <Typography variant="body2" sx={{ opacity: 0.6 }}>
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
                gap: 0.75,
                py: 0.5,
                height: "100%",
              }}
            >
              {endorsements.map((endorsement, index) => (
                <Chip
                  key={`${params.row.id}-${endorsement}-${index}`}
                  label={endorsement}
                  size="small"
                  variant="outlined"
                  sx={(theme) => ({
                    fontSize: theme.typography.pxToRem(12),
                    fontWeight: 500,
                    bgcolor: theme.palette.action.hover,
                    color: theme.palette.text.secondary,
                    borderColor: theme.palette.divider,
                    "& .MuiChip-label": { px: 1 },
                  })}
                />
              ))}
            </Box>
          );
        },
      },
      {
        field: "checkInOut",
        headerName: "Check In/Check Out",
        minWidth: 200,
        flex: 1,
        sortable: false,
        filterable: false,
        headerAlign: "center",
        align: "center",
        renderCell: (params: GridRenderCellParams<Operator>) => (
          <CheckInOutCell opKey={opKey} operatorId={params.row.id} />
        ),
      },
    ];
  }, [opKey]);

  // mobile: card layout
  if (isMobile) {
    return (
      <Box sx={{ bgcolor: "background.paper" }}>
        {operators.map((operator) => (
          <OperatorCard key={operator.id} opKey={opKey} operator={operator} />
        ))}
      </Box>
    );
  }

  // desktop: DataGrid layout
  return (
    <Box sx={{ width: "100%" }}>
      <DataGrid
        sx={dataGridSx}
        getRowHeight={() => "auto"}
        rows={operators}
        columns={columns}
        getRowId={(row) => row.id}
        density="compact"
        disableRowSelectionOnClick
        initialState={{
          pagination: { paginationModel: { pageSize: 5 } },
          sorting: { sortModel: [{ field: "reliability", sort: "desc" }] },
        }}
        pageSizeOptions={[5]}
        hideFooter={operators.length <= 5}
      />
    </Box>
  );
}
