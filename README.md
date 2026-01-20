# Omer Siddiqui Frontend Assessment

This project implements a small Ops Dashboard using Next.js, React, TypeScript, and Material UI.

The goal was to keep the solution readable and well-structured without over-engineering a take-home assignment.

## Environment

This app expects the following environment variable to be set:

```bash
NEXT_PUBLIC_OPS_API_URL=https://frontend-challenge.veryableops.com/
```

For local development, create a `.env.local` file at the project root with the value above.

## Running the App

```bash
npm install
npm run dev
```

## Key Decisions

- **Client-side data fetching** via a small custom hook (`useFetchOps`) to centralize API concerns and reduce component coupling
- **Separation of concerns**:
  - UI components (`OpCard`, `OperatorRow`, `OperatorCard`, `ReliabilityBadge`)
  - Hooks for stateful logic
  - Pure utilities for filtering/search logic
- **Search logic** extracted into a pure function for clarity and testability
- **Custom hooks** used where state or side effects would otherwise clutter components
- **Reliability Badges**: Color-coded (green ≥90%, amber 70-89%, red <70%) for instant visual scanning
- **localStorage Persistence**: Check-in state survives page refresh without backend calls

## Mobile Responsiveness

The dashboard adapts to different screen sizes using MUI's `useMediaQuery` hook.

Key responsive features:

- **Conditional rendering**: Switches between `DataGrid` (desktop) and `OperatorCard` (mobile) components
- **Responsive header**: Title and search stack vertically on small screens
- **Adaptive search field**: Full-width with shorter placeholder text on mobile
- **Skeleton sizing**: Loading placeholders adjust height based on viewport

## Testing

A small set of unit tests is included to demonstrate testing intent around:

- Pure utility logic
- API boundary behavior

## Notes

This solution prioritizes clarity, maintainability, and reasonable tradeoffs appropriate for a take-home.

Happy to walk through any decisions or alternatives if helpful.
