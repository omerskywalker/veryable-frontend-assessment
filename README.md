# Omer Siddiqui Frontend Assessment

This project implements a small Ops Dashboard using Next.js, React, TypeScript, and Material UI.

The goal was to keep the solution readable and well-structured without over-engineering a take-home assignment.

## Key Decisions

- **Client-side data fetching** via a small custom hook (`useFetchOps`) to keep the app simple and interactive
- **Separation of concerns**:
  - UI components (`OpCard`, `OperatorRow`, `OpsDashboardClient`)
  - Hooks for stateful logic
  - Pure utilities for filtering/search logic
- **Search logic** extracted into a pure function for clarity and testability
- **Custom hooks** used where state or side effects would otherwise clutter components

## Testing

A small set of unit tests is included to demonstrate testing intent around:

- Pure utility logic
- API boundary behavior

## Notes

This solution prioritizes clarity, maintainability, and reasonable tradeoffs appropriate for a take-home.  
Happy to walk through any decisions or alternatives if helpful.
