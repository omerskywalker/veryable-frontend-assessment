"use client";

import { useMemo, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Stack,
  Skeleton,
  useMediaQuery,
  useTheme,
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const filteredOps = useMemo(() => filterOpsByQuery(ops, query), [ops, query]);

  // shared layout wrapper
  const renderLayout = (content: React.ReactNode) => (
    <Box
      component="main"
      sx={{
        width: { xs: "100%", sm: "92%" },
        mx: "auto",
        p: { xs: 1, sm: 2 },
      }}
    >
      {/* header + search */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "stretch", sm: "center" },
          justifyContent: "space-between",
          gap: 2,
          mt: pxrem(24),
          mb: pxrem(24),
        }}
      >
        <Typography
          variant="h1"
          sx={{
            color: veryableBlue,
            fontSize: { xs: pxrem(24), sm: pxrem(32) },
            fontWeight: 800,
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          Veryable Ops Dashboard
        </Typography>
        <TextField
          aria-label="Search operations"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={
            isMobile
              ? "Search..."
              : "Search by Operator Name, Op Title, or Public ID"
          }
          size="small"
          disabled={loading}
          sx={{
            minWidth: { xs: "100%", sm: 320 },
            maxWidth: { xs: "100%", sm: 480 },
            "& .MuiInputBase-root": { fontSize: "0.8rem" },
          }}
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

      {/* content area */}
      {content}
    </Box>
  );

  // loading state - skeleton cards
  if (loading) {
    return renderLayout(
      <Stack spacing={3}>
        {[1, 2, 3].map((i) => (
          <Skeleton
            key={i}
            variant="rectangular"
            height={isMobile ? 200 : 280}
            sx={{ borderRadius: 2 }}
          />
        ))}
      </Stack>,
    );
  }

  // error state
  if (error) {
    return renderLayout(
      <Typography
        sx={{
          color: "error.main",
          fontSize: "1.5rem",
          fontWeight: "bold",
          textAlign: "center",
          mt: 4,
        }}
      >
        Error: {error}
      </Typography>,
    );
  }

  // loaded state
  return renderLayout(
    query.trim() && filteredOps.length === 0 ? (
      <Typography sx={{ textAlign: "center", mt: 4 }}>
        {`No results for "${query}"`}
      </Typography>
    ) : (
      <Stack spacing={3}>
        {filteredOps.map((op) => (
          <OpCard key={op.opId} op={op} />
        ))}
      </Stack>
    ),
  );
}
