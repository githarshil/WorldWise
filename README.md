# WorldWise

A travel-tracking app where you drop a pin on a world map for every city you've visited, complete with the date and your own notes. Built to practice React's Context API, custom hooks, and nested routing at a level a simple todo app can't teach you.

**Tech stack:** React (Vite) · React Router · React Leaflet · Context API · JSON Server

## What I Built

- **An interactive map** (React Leaflet) that centers on your current location or a clicked point, and drops markers for every city you've logged.
- **Two separate contexts** — `CitiesContext` for the actual app data (cities, loading state) and `FakeAuthContext` for a simulated login flow — kept intentionally separate rather than shoving everything into one global context.
- **Custom hooks** — `useGeolocation` (wraps the browser Geolocation API) and `useUrlPosition` (reads lat/lng straight out of the URL so the map state is shareable/bookmarkable).
- **Protected routes** — the main app section behind `ProtectedRoute.jsx`, only reachable once you're "logged in" via the fake auth context.
- **Nested routing with React Router** — `AppLayout` renders a shared sidebar/nav while `CityList`, `CountriesList`, and `City` swap in the outlet.
- **CSS Modules throughout** — every component ships with its own scoped `.module.css` file instead of one global stylesheet.
- **A fake backend** via `json-server` serving `data/cities.json`, so the frontend behaves like it's talking to a real API.

## What I Learned

- **When Context API is the right tool and when it isn't** — splitting auth state from cities data into two contexts made the difference between "clean separation of concerns" and "one giant context object nobody wants to touch" very concrete.
- **Building custom hooks that wrap browser APIs** — `useGeolocation` taught me how much boilerplate (loading/error/position state) a raw browser API needs before it's actually pleasant to use in a component.
- **Deriving state from the URL** instead of component state, so a shared link actually reproduces the same map view for someone else.
- **Nested routes and layout routes** in React Router, instead of one flat list of top-level routes.
- **CSS Modules** as an alternative to a CSS-in-JS library or one big stylesheet, and the naming/collision problems they actually solve.

## Getting Started

```bash
npm install
npm run server   # fake API on port 9000
npm run dev      # app
```
