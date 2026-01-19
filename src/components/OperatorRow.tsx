"use client";

import { Box, Button, Stack, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { useMemo } from "react";

import { Operator } from "@/types";
import { useOperatorCheckState } from "@/hooks/useOperatorCheckState";

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
    <Stack spacing={0.5} sx={{ width: "100%" }}>
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
  const columns = useMemo<GridColDef<Operator>[]>(
    () => [
      { field: "firstName", headerName: "First name", minWidth: 140, flex: 1 },
      { field: "lastName", headerName: "Last name", minWidth: 140, flex: 1 },
      {
        field: "opsCompleted",
        headerName: "Ops Completed",
        type: "number",
        minWidth: 150,
        flex: 1,
      },
      {
        field: "reliability",
        headerName: "Reliability",
        type: "number",
        minWidth: 120,
        flex: 0.8,
        valueFormatter: (params: number) =>
          params != null ? `${Math.round(Number(params) * 100)}%` : "-",
      },
      {
        field: "endorsements",
        headerName: "Endorsements",
        minWidth: 320,
        flex: 2.5,
        sortable: false,
        valueFormatter: (params: Operator["endorsements"]) =>
          Array.isArray(params) && params.length ? params.join(", ") : "—",
      },
      {
        field: "checkInOut",
        headerName: "Check In/Check Out",
        minWidth: 220,
        flex: 1.2,
        sortable: false,
        filterable: false,
        cellClassName: "checkin-cell",
        renderCell: (params: GridRenderCellParams<Operator>) => (
          <CheckInOutCell opKey={opKey} operatorId={params.row.id} />
        ),
      },
    ],
    [opKey],
  );

  return (
    <Box sx={{ height: 420, width: "100%" }}>
      <DataGrid
        sx={{
          "& .MuiDataGrid-cell:focus": { outline: "none" },
          "& .MuiDataGrid-cell:focus-within": { outline: "none" },
          "& .checkin-cell": {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        }}
        rowHeight={76}
        rows={operators}
        columns={columns}
        getRowId={(row) => row.id}
        initialState={{
          pagination: { paginationModel: { pageSize: 5 } },
        }}
        pageSizeOptions={[5]}
      />
    </Box>
  );
}
