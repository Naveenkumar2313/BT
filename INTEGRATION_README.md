# Hierarchical Sidenav – Integration Guide

## What changed

```
src/app/
├── navigations.js                                    ← REPLACE
├── components/
│   ├── HierarchicalSidenav/                          ← NEW FOLDER
│   │   ├── HierarchicalSidenav.jsx                   ← NEW
│   │   └── index.js                                  ← NEW
│   └── ParcLayout/
│       └── Layout1/
│           ├── Layout1.jsx                           ← REPLACE
│           ├── Layout1Topbar.jsx                     ← REPLACE
│           └── Layout1Settings.js                    ← REPLACE
```

--- 

## Architecture

```
┌───────────┬────────────────────────┬─────────────────────────────────┐
│ Icon Rail │    Module/Page Panel   │        Content Area             │
│  (56px)   │  (232px / 44px)        │  (fills remaining width)        │
│           │                        │                                 │
│  Section  │  [Section Name  ‹ ›]   │  Topbar (fixed, starts after   │
│  icons    │  [Search…         ]   │   rail + panel width)           │
│           │  ▸ Module 1  (4)       │                                 │
│           │    • Page A            │  <Outlet /> (routed content)   │
│           │    • Page B            │                                 │
│           │  ▸ Module 2  (3)       │                                 │
└───────────┴────────────────────────┴─────────────────────────────────┘
```

---

## Panel states (driven by `layout1Settings.leftSidebar.mode`)

| `mode`      | Panel width | Behaviour |
|-------------|-------------|-----------|
| `"full"`    | 232px       | Pinned expanded, always visible |
| `"compact"` | 44px        | Icon-only strip; **hover → auto-expands to 232px**, mouse-leave → collapses back |
| `"close"`   | 0 (hidden)  | Entire sidebar hidden (mobile) |

The **‹ / ›** toggle button inside the panel header switches between `full` ↔ `compact`.
The **hamburger (≡)** button in the topbar also toggles `full` ↔ `compact`.

---

## Navigations shape (`src/app/navigations.js`)

Two item types are supported:

### 1. Direct item (`type: "item"`)
```js
{ id: "dashboard", name: "Dashboard", icon: "dashboard", path: "/dashboard/default", type: "item" }
```
Renders in the icon rail as a `NavLink`. No sub-panel needed.

### 2. Section (`type: "section"`)
```js
{
  id: "payments",
  name: "Payments",
  icon: "payments",          // Material icon name for the rail
  type: "section",
  modules: [
    {
      id: "fee-collection",
      name: "Fee Collection",
      icon: "receipt_long",   // Material icon name for the panel row
      pages: [
        { name: "Collect Fee", path: "/payments/collect", iconText: "CF" },
        { name: "Bulk Upload", path: "/payments/bulk-upload", iconText: "BU", badge: "new" },
        // badge can be "new" | "beta"
      ]
    }
  ]
}
```

---

## z-index layering

| Element         | z-index |
|-----------------|---------|
| Icon rail       | 1200    |
| Module panel    | 1199    |
| Topbar          | 1198    |
| Content/Outlet  | auto    |

---

## Steps to integrate

1. **Copy** `src/app/navigations.js` → replace your existing file.
2. **Copy** `src/app/components/HierarchicalSidenav/` → place new folder.
3. **Copy** `src/app/components/ParcLayout/Layout1/Layout1.jsx` → replace.
4. **Copy** `src/app/components/ParcLayout/Layout1/Layout1Topbar.jsx` → replace.
5. **Copy** `src/app/components/ParcLayout/Layout1/Layout1Settings.js` → replace.
6. No other files need to change. The old `Layout1Sidenav.jsx`, `Sidenav.jsx`, and
   `ParcVerticalNav/` are no longer referenced from Layout1 (you can keep or delete them).

---

## Customising colours

The sidenav derives its colours from the active MUI theme (`theme.palette.primary`).
- Rail + panel background: `alpha(theme.palette.primary.dark, 0.97)` / `alpha(theme.palette.primary.main, 0.93)`
- Active accent + badges:  `theme.palette.secondary.main` (defaults to `#ff9e43`)

So switching theme in Settings will automatically re-skin the sidebar.
