"use client";

import { useMemo, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Stack,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import OpCard from "@/components/OpCard";
import { pxrem } from "@/utils/pxrem";
import { veryableBlue } from "@/theme/globalStyles";
import { useFetchOps } from "@/hooks/useFetchOps";
import { filterOpsByQuery } from "@/utils/filterOps";

export default function Home() {
  const [query, setQuery] = useState("");
  const { ops, loading, error } = useFetchOps();

  const filteredOps = useMemo(() => filterOpsByQuery(ops, query), [ops, query]);

  if (loading) {
    return (
      <Box
        component="main"
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: 2,
        }}
      >
        <Typography
          variant="h1"
          sx={{
            color: veryableBlue,
            fontSize: pxrem(40),
            textShadow: "1px 1px 1px grey",
            fontWeight: 800,
            mb: 2,
            mt: pxrem(32),
            pt: pxrem(16),
            textAlign: "center",
          }}
        >
          Veryable Ops Dashboard
        </Typography>

        <CircularProgress />

        <Typography>Loading Ops...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        component="main"
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
        }}
      >
        <Typography
          sx={{
            color: "error.main",
            fontSize: "2rem",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Error: {error}
        </Typography>
      </Box>
    );
  }

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
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
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
