import { useState, useCallback, useRef, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Box,
  Icon,
  Tooltip,
  styled,
  alpha,
  useTheme
} from "@mui/material";
import Scrollbar from "react-perfect-scrollbar";

import useSettings from "app/hooks/useSettings";
import navigations from "app/navigations";
import { topBarHeight } from "app/utils/constant";

// ─── DIMENSIONS ─────────────────────────────────────────────────────────────
const RAIL_W = 90;
const PANEL_EXPANDED = 232;
const PANEL_COLLAPSED = 44;

// ─── RAIL ────────────────────────────────────────────────────────────────────
const RailRoot = styled("div")(({ theme }) => ({
  position: "fixed",
  top: topBarHeight,
  left: 0,
  width: RAIL_W,
  height: `calc(100vh - ${topBarHeight}px)`,
  background: alpha(theme.palette.primary.dark || theme.palette.primary.main, 0.97),
  borderRight: `1px solid ${alpha("#fff", 0.06)}`,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  zIndex: 1200,
  overflowX: "hidden",
  boxShadow: "2px 0 8px rgba(0,0,0,0.18)"
}));

const RailScroll = styled("div")({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  overflowY: "auto",
  overflowX: "hidden",
  width: "100%",
  paddingTop: 8,
  paddingBottom: 8,
  "&::-webkit-scrollbar": { display: "none" }
});

const RailItem = styled("div", {
  shouldForwardProp: (p) => p !== "active"
})(({ theme, active }) => ({
  position: "relative",
  width: 75,
  height: 100,
  borderRadius: 10,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  marginBottom: 2,
  flexShrink: 0,
  transition: "all 180ms ease",
  color: active ? "#fff" : alpha("#fff", 0.45),
  background: active ? alpha("#fff", 0.14) : "transparent",
  "&:hover": {
    background: alpha("#fff", 0.1),
    color: alpha("#fff", 0.85)
  },
  // Active left accent bar
  ...(active && {
    "&::before": {
      content: '""',
      position: "absolute",
      left: -8,
      top: 8,
      bottom: 8,
      width: 3,
      borderRadius: "0 3px 3px 0",
      background: theme.palette.secondary?.main || "#ff9e43",
      boxShadow: `0 0 8px ${alpha(theme.palette.secondary?.main || "#ff9e43", 0.5)}`
    }
  })
}));

const RailLabel = styled("span")({
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: "0.3px",
  lineHeight: 1,
  textTransform: "uppercase",
  marginTop: 2,
  opacity: 0.85,
  textAlign: "center",
});

const RailDivider = styled("div")({
  width: 24,
  height: 1,
  background: alpha("#fff", 0.1),
  margin: "4px 0",
  flexShrink: 0
});

// ─── PANEL ────────────────────────────────────────────────────────────────────
const PanelRoot = styled("div", {
  shouldForwardProp: (p) => p !== "pinned" && p !== "peeking"
})(({ theme, pinned, peeking }) => {
  const isOpen = pinned || peeking;
  return {
    position: "fixed",
    top: topBarHeight,
    left: RAIL_W,
    height: `calc(100vh - ${topBarHeight}px)`,
    width: isOpen ? PANEL_EXPANDED : PANEL_COLLAPSED,
    background: alpha(theme.palette.primary.main, 0.93),
    borderRight: `1px solid ${alpha("#fff", 0.07)}`,
    display: "flex",
    flexDirection: "column",
    zIndex: 1199,
    overflow: "hidden",
    transition: `width 240ms cubic-bezier(0.4,0,0.2,1), box-shadow 240ms ease`,
    boxShadow: peeking && !pinned ? "4px 0 20px rgba(0,0,0,0.35)" : "none"
  };
});

// ─── PANEL HEADER ─────────────────────────────────────────────────────────────
const PanelHeader = styled("div")(({ theme }) => ({
  height: 52,
  display: "flex",
  alignItems: "center",
  padding: "0 10px 0 10px",
  borderBottom: `1px solid ${alpha("#fff", 0.07)}`,
  gap: 6,
  flexShrink: 0,
  minWidth: PANEL_EXPANDED
}));

const PanelSectionName = styled("span")({
  fontSize: 15,
  fontWeight: 900,
  color: alpha("#fff", 0.92),
  flex: 1,
  whiteSpace: "nowrap",
  letterSpacing: "-0.2px",
  transition: "opacity 180ms ease"
});

const PanelCount = styled("span")({
  fontSize: 10,
  fontWeight: 600,
  color: alpha("#fff", 0.4),
  background: alpha("#fff", 0.08),
  padding: "2px 7px",
  borderRadius: 20,
  whiteSpace: "nowrap",
  transition: "opacity 180ms ease"
});

// Toggle button
const ToggleBtn = styled("div")(({ theme }) => ({
  width: 22,
  height: 22,
  borderRadius: 6,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  flexShrink: 0,
  background: alpha("#fff", 0.07),
  border: `1px solid ${alpha("#fff", 0.1)}`,
  color: alpha("#fff", 0.45),
  transition: "all 180ms ease",
  "&:hover": {
    background: alpha(theme.palette.secondary?.main || "#ff9e43", 0.2),
    color: theme.palette.secondary?.main || "#ff9e43",
    borderColor: alpha(theme.palette.secondary?.main || "#ff9e43", 0.4)
  }
}));

// Search
const PanelSearch = styled("div")({
  padding: "8px 10px",
  borderBottom: `1px solid ${alpha("#fff", 0.06)}`,
  flexShrink: 0,
  position: "relative",
  minWidth: PANEL_EXPANDED
});

const SearchInput = styled("input")(({ theme }) => ({
  width: "100%",
  background: alpha("#fff", 0.06),
  border: `1px solid ${alpha("#fff", 0.1)}`,
  borderRadius: 7,
  padding: "5px 8px 5px 28px",
  fontSize: 11.5,
  color: "#fff",
  fontFamily: "inherit",
  outline: "none",
  transition: "all 200ms ease",
  "&::placeholder": { color: alpha("#fff", 0.35) },
  "&:focus": {
    borderColor: alpha(theme.palette.secondary?.main || "#ff9e43", 0.5),
    background: alpha(theme.palette.secondary?.main || "#ff9e43", 0.07)
  }
}));

const SearchIcon = styled(Icon)({
  position: "absolute",
  left: 19,
  top: "50%",
  transform: "translateY(-50%)",
  fontSize: "14px !important",
  color: alpha("#fff", 0.35),
  pointerEvents: "none"
});

// ─── MODULE + PAGES ──────────────────────────────────────────────────────────
const ModuleHeader = styled("div", {
  shouldForwardProp: (p) => p !== "open"
})(({ open }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "6px 10px 6px 10px",
  cursor: "pointer",
  gap: 8,
  userSelect: "none",
  minWidth: PANEL_EXPANDED,
  transition: "background 180ms ease",
  background: open ? alpha("#fff", 0.04) : "transparent",
  "&:hover": { background: alpha("#fff", 0.05) }
}));

const ModuleIconWrap = styled("div")({
  width: 24,
  height: 24,
  borderRadius: 6,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  background: alpha("#fff", 0.1),
  "& .MuiIcon-root": { fontSize: "14px !important" }
});

const ModuleName = styled("span", {
  shouldForwardProp: (p) => p !== "open"
})(({ open }) => ({
  fontSize: 12.5,
  fontWeight: 550,
  color: open ? alpha("#fff", 0.92) : alpha("#fff", 0.6),
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  textTransform: "uppercase",
  flex: 1,
  transition: "color 180ms ease"
}));

const ModuleRight = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: 5,
  flexShrink: 0
});

const ModuleCount = styled("span", {
  shouldForwardProp: (p) => p !== "open"
})(({ open, theme }) => ({
  fontSize: "9.5px",
  fontWeight: 600,
  color: open ? (theme.palette.secondary?.main || "#ff9e43") : alpha("#fff", 0.35),
  background: open ? alpha(theme.palette.secondary?.main || "#ff9e43", 0.15) : alpha("#fff", 0.07),
  padding: "1px 5px",
  borderRadius: 20,
  transition: "all 180ms ease"
}));

const ChevronIcon = styled(Icon, {
  shouldForwardProp: (p) => p !== "open"
})(({ open }) => ({
  fontSize: "14px !important",
  color: open ? alpha("#fff", 0.6) : alpha("#fff", 0.3),
  transition: "transform 220ms ease, color 180ms ease",
  transform: open ? "rotate(90deg)" : "rotate(0deg)",
  flexShrink: 0
}));

// Pages
const PagesContainer = styled("div")({
  overflow: "hidden",
  transition: "max-height 460ms cubic-bezier(0.4,0,0.2,1)"
});

const PageItem = styled(NavLink, {
  shouldForwardProp: (p) => p !== "isActive2"
})(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: 7,
  padding: "5px 10px 5px 42px",
  cursor: "pointer",
  position: "relative",
  textDecoration: "none",
  minWidth: PANEL_EXPANDED,
  transition: "all 180ms ease",
  userSelect: "none",
  color: alpha("#fff", 0.58),
  "&::before": {
    content: '""',
    position: "absolute",
    left: 30,
    top: "50%",
    transform: "translateY(-50%)",
    width: 3.5,
    height: 3.5,
    borderRadius: "50%",
    background: alpha("#fff", 0.2),
    transition: "all 180ms ease"
  },
  "&:hover": {
    background: alpha("#fff", 0.05),
    color: alpha("#fff", 0.9),
    "&::before": { background: alpha("#fff", 0.5) }
  },
  "&.active": {
    background: alpha(theme.palette.secondary?.main || "#ff9e43", 0.15),
    color: theme.palette.secondary?.light || "#ffd08a",
    "&::before": {
      background: theme.palette.secondary?.main || "#ff9e43",
      boxShadow: `0 0 5px ${alpha(theme.palette.secondary?.main || "#ff9e43", 0.6)}`
    },
    "&::after": {
      content: '""',
      position: "absolute",
      left: 0,
      top: 4,
      bottom: 4,
      width: 2,
      borderRadius: "0 2px 2px 0",
      background: theme.palette.secondary?.main || "#ff9e43",
      boxShadow: `0 0 7px ${alpha(theme.palette.secondary?.main || "#ff9e43", 0.5)}`
    }
  }
}));

const PageName = styled("span")({
  fontSize: 12.5,
  fontWeight: 500,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  flex: 1,
  lineHeight: 1
});

const PageBadge = styled("span", {
  shouldForwardProp: (p) => p !== "variant"
})(({ variant }) => ({
  fontSize: "8.5px",
  fontWeight: 700,
  padding: "1px 5px",
  borderRadius: 20,
  letterSpacing: "0.4px",
  flexShrink: 0,
  ...(variant === "new" && {
    background: "rgba(16,185,129,0.18)",
    color: "#6ee7b7"
  }),
  ...(variant === "beta" && {
    background: "rgba(245,158,11,0.18)",
    color: "#fcd34d"
  })
}));

// Collapsed icon-only module row
const CollapsedModuleRow = styled("div", {
  shouldForwardProp: (p) => p !== "hasActive"
})(({ hasActive, theme }) => ({
  width: PANEL_COLLAPSED,
  height: 45,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  transition: "background 180ms ease",
  flexShrink: 0,
  ...(hasActive && {
    "& .mod-icon": {
      outline: `2px solid ${alpha(theme.palette.secondary?.main || "#ff9e43", 0.55)}`,
      outlineOffset: 1,
      borderRadius: 6
    }
  }),
  "&:hover": { background: alpha("#fff", 0.07) }
}));

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function HierarchicalSidenav() {
  const theme = useTheme();
  const { settings, updateSettings } = useSettings();
  const location = useLocation();

  // Determine sidebar pinned state from settings
  const sidenavMode = settings.layout1Settings?.leftSidebar?.mode || "full";
  const isPinned = sidenavMode !== "compact";

  const [peeking, setPeeking] = useState(false);
  const peekTimeout = useRef(null);

  // Active section — auto-detect from current path
  const getActiveSectionId = useCallback(() => {
    const sections = navigations.filter(n => n.type === "section");
    for (const sec of sections) {
      for (const mod of sec.modules || []) {
        for (const page of mod.pages || []) {
          if (location.pathname === page.path) return sec.id;
        }
      }
    }
    return sections[0]?.id || "payments";
  }, [location.pathname]);

  const [activeSectionId, setActiveSectionId] = useState(getActiveSectionId);

  // Open modules — default open first module of active section
  const [openModules, setOpenModules] = useState(() => {
    const sec = navigations.find(n => n.id === getActiveSectionId());
    return new Set(sec?.modules?.[0]?.id ? [sec.modules[0].id] : []);
  });

  const [searchQuery, setSearchQuery] = useState("");

  // Update active section when route changes
  useEffect(() => {
    setActiveSectionId(getActiveSectionId());
  }, [getActiveSectionId]);

  const togglePin = () => {
    const newMode = isPinned ? "compact" : "full";
    updateSettings({ layout1Settings: { leftSidebar: { mode: newMode } } });
    setPeeking(false);
  };

  const switchSection = (sectionId) => {
    setActiveSectionId(sectionId);
    setSearchQuery("");
    const sec = navigations.find(n => n.id === sectionId);
    if (sec?.modules?.length) {
      setOpenModules(new Set([sec.modules[0].id]));
    }
  };

  const toggleModule = (moduleId) => {
    setOpenModules(prev => {
      const next = new Set(prev);
      if (next.has(moduleId)) next.delete(moduleId);
      else next.add(moduleId);
      return next;
    });
  };

  const handlePanelMouseEnter = () => {
    if (!isPinned) {
      clearTimeout(peekTimeout.current);
      setPeeking(true);
    }
  };

  const handlePanelMouseLeave = () => {
    if (!isPinned) {
      peekTimeout.current = setTimeout(() => setPeeking(false), 120);
    }
  };

  useEffect(() => () => clearTimeout(peekTimeout.current), []);

  const isOpen = isPinned || peeking;

  // Current section data
  const activeSection = navigations.find(n => n.id === activeSectionId);
  const modules = activeSection?.modules || [];

  // Filter by search
  const q = searchQuery.toLowerCase().trim();
  const filteredModules = q
    ? modules.map(mod => ({
        ...mod,
        pages: mod.pages.filter(p => p.name.toLowerCase().includes(q))
      })).filter(mod => mod.pages.length > 0)
    : modules;

  // Sections (icon strip items)
  const sections = navigations.filter(n => n.type === "section");
  const directItems = navigations.filter(n => n.type === "item");

  return (
    <>
      {/* ── ICON RAIL ── */}
      <RailRoot>
        <RailScroll>
          {/* Direct nav items first */}
          {directItems.map(item => (
            <Tooltip key={item.id} title={item.name} placement="right" arrow>
              <RailItem
                active={location.pathname === item.path ? 1 : 0}
                onClick={() => {}}
              >
                <NavLink
                  to={item.path}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", textDecoration: "none", color: "inherit" }}
                >
                  <Icon sx={{ fontSize: "18px !important" }}>{item.icon}</Icon>
                  <RailLabel>{item.name}</RailLabel>
                </NavLink>
              </RailItem>
            </Tooltip>
          ))}

          {directItems.length > 0 && <RailDivider />}

          {/* Section icons */}
          {sections.map((sec) => (
            <Tooltip key={sec.id} title={sec.name} placement="right" arrow>
              <RailItem
                active={activeSectionId === sec.id ? 1 : 0}
                onClick={() => switchSection(sec.id)}
              >
                <Icon sx={{ fontSize: "18px !important" }}>{sec.icon}</Icon>
                <RailLabel>{sec.name}</RailLabel>
              </RailItem>
            </Tooltip>
          ))}
        </RailScroll>
      </RailRoot>

      {/* ── MODULE / PAGE PANEL ── */}
      <PanelRoot
        pinned={isPinned ? 1 : 0}
        peeking={peeking ? 1 : 0}
        onMouseEnter={handlePanelMouseEnter}
        onMouseLeave={handlePanelMouseLeave}
      >
        {/* Header */}
        <PanelHeader>
          <Icon sx={{ fontSize: "18px !important", color: alpha("#fff", 0.7), flexShrink: 0 }}>
            {activeSection?.icon || "folder"}
          </Icon>
          <PanelSectionName
            sx={{ opacity: isOpen ? 1 : 0 }}
          >
            {activeSection?.name || ""}
          </PanelSectionName>
          <PanelCount sx={{ opacity: isOpen ? 1 : 0 }}>
            {modules.length} modules
          </PanelCount>

          {/* Toggle pin/unpin */}
          <Tooltip
            title={isPinned ? "Collapse panel" : "Pin panel expanded"}
            placement="right"
            arrow
          >
            <ToggleBtn onClick={togglePin}>
              <Icon sx={{ fontSize: "12px !important" }}>
                {isPinned ? "chevron_left" : "chevron_right"}
              </Icon>
            </ToggleBtn>
          </Tooltip>
        </PanelHeader>

        {/* Search — only visible when open */}
        {isOpen && (
          <PanelSearch>
            <SearchIcon>search</SearchIcon>
            <SearchInput
              type="text"
              placeholder="Search pages…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </PanelSearch>
        )}

        {/* Scrollable modules + pages */}
        <Scrollbar
          options={{ suppressScrollX: true }}
          style={{ flex: 1 }}
        >
          <Box pb={2} pt={1}>
            {isOpen
              ? /* EXPANDED: full module+pages list */
                filteredModules.map(mod => {
                  const isModOpen = openModules.has(mod.id) || (q && mod.pages.length > 0);
                  const hasActive = mod.pages.some(p => location.pathname === p.path);

                  return (
                    <Box key={mod.id}>
                      <ModuleHeader
                        open={isModOpen ? 1 : 0}
                        onClick={() => toggleModule(mod.id)}
                      >
                        <ModuleIconWrap className="mod-icon">
                          <Icon>{mod.icon}</Icon>
                        </ModuleIconWrap>
                        <ModuleName open={isModOpen ? 1 : 0}>{mod.name}</ModuleName>
                        <ModuleRight>
                          <ModuleCount open={isModOpen ? 1 : 0}>
                            {mod.pages.length}
                          </ModuleCount>
                          <ChevronIcon open={isModOpen ? 1 : 0}>chevron_right</ChevronIcon>
                        </ModuleRight>
                      </ModuleHeader>

                      <PagesContainer
                        style={{
                          maxHeight: isModOpen ? mod.pages.length * 36 + "px" : "0px"
                        }}
                      >
                        {mod.pages.map(page => (
                          <PageItem
                            key={page.path}
                            to={page.path}
                          >
                            <PageName>{page.name}</PageName>
                            {page.badge && (
                              <PageBadge variant={page.badge}>
                                {page.badge.toUpperCase()}
                              </PageBadge>
                            )}
                          </PageItem>
                        ))}
                      </PagesContainer>
                    </Box>
                  );
                })
              : /* COLLAPSED: icon-only rows */
                modules.map(mod => {
                  const hasActive = mod.pages.some(p => location.pathname === p.path);
                  return (
                    <Tooltip
                      key={mod.id}
                      title={mod.name}
                      placement="right"
                      arrow
                    >
                      <CollapsedModuleRow
                        hasActive={hasActive ? 1 : 0}
                        onClick={() => {
                          toggleModule(mod.id);
                          setPeeking(true);
                        }}
                      >
                        <ModuleIconWrap className="mod-icon">
                          <Icon>{mod.icon}</Icon>
                        </ModuleIconWrap>
                      </CollapsedModuleRow>
                    </Tooltip>
                  );
                })}
          </Box>
        </Scrollbar>
      </PanelRoot>
    </>
  );
}
