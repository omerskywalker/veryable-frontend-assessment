"use client";

import { useMemo, useState } from "react";
import type { Op } from "@/types";
import OpCard from "@/components/OpCard";
import { filterOpsByQuery } from "@/utils/filterOps";

import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Stack,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { pxrem } from "@/utils/pxrem";
import { veryableBlue } from "@/theme/globalStyles";

type Props = {
  initialOps: Op[];
};

export default function OpsDashboardClient({ initialOps }: Props) {
  const [query, setQuery] = useState("");

  const filteredOps = useMemo(
    () => filterOpsByQuery(initialOps, query),
    [initialOps, query],
  );

  return (
    <Box
      component="main"
      sx={{
        width: "92%",
        mx: "auto",
        p: 2,
      }}
    >
      <Typography
        variant="h1"
        sx={{
          color: veryableBlue,
          fontSize: pxrem(40),
          textShadow: "1px 1px 1px grey",
          fontWeight: 800,
          mt: pxrem(32),
          mb: pxrem(32),
          textAlign: "center",
        }}
      >
        Veryable Ops Dashboard
      </Typography>

      <Box sx={{ maxWidth: 720, mx: "auto", mb: 4 }}>
        <TextField
          fullWidth
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by Operator Name, Op Title, or Public ID"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>

      {query.trim() && filteredOps.length === 0 ? (
        <Typography sx={{ textAlign: "center", mt: 4 }}>
          No results for “{query}”
        </Typography>
      ) : (
        <Stack spacing={3}>
          {filteredOps.map((op) => (
            <OpCard key={op.opId} op={op} />
          ))}
        </Stack>
      )}
    </Box>
  );
}
