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
  Container,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import OpCard from "@/components/OpCard";
import { useOpsQuery } from "@/hooks/useOpsQuery";
import { filterOpsByQuery } from "@/utils/filterOps";

export default function Home() {
  const [query, setQuery] = useState("");
  const { data, isLoading, error } = useOpsQuery();
  const loading = isLoading;
  const errorMsg = error ? String(error?.message ?? error) : null;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const filteredOps = useMemo(() => filterOpsByQuery(data ?? [], query), [data, query]);

  // shared layout wrapper
  const renderLayout = (content: React.ReactNode) => (
    <Container
      component="main"
      maxWidth={false}
      sx={{
        width: {
          xs: "100%",
          md: "85%",
          lg: "90%",
        },
        py: { xs: 2, sm: 3 },
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
          my: { xs: 2, sm: 3 },
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: {
              xs: theme.typography.pxToRem(24),
              sm: theme.typography.pxToRem(32),
            },
            fontWeight: 800,
            textAlign: { xs: "center", sm: "left" },
            color: "primary.main",
          }}
        >
          Veryable Ops Dashboard
        </Typography>

        <TextField
          aria-label="Search operations"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={"Search by Operator Name, Op Title, or Public ID"}
          size="small"
          disabled={loading}
          fullWidth={isMobile}
          sx={{
            minWidth: { xs: "100%", sm: 320 },
            maxWidth: {
              xs: "100%",
              sm: 480,
            },
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              sx: {
                fontSize: "0.7rem",
              },
            },
          }}
        />
      </Box>

      {/* content area */}
      {content}
    </Container>
  );

  // loading state - skeleton cards
  if (loading) {
    return renderLayout(
      <Stack spacing={3}>
        {Array.from({ length: 3 }).map((_, i) => (
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
  if (errorMsg) {
    return renderLayout(
      <Typography
        role="alert"
        sx={{
          color: "error.main",
          fontSize: theme.typography.pxToRem(18),
          fontWeight: 700,
          textAlign: "center",
          mt: 4,
        }}
      >
        Error: {errorMsg}
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
