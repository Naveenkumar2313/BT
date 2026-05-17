import { memo } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import styled from "@mui/material/styles/styled";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";
import Home from "@mui/icons-material/Home";
import Menu from "@mui/icons-material/Menu";
import Person from "@mui/icons-material/Person";
import Settings from "@mui/icons-material/Settings";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Tooltip from "@mui/material/Tooltip";
import PowerSettingsNew from "@mui/icons-material/PowerSettingsNew";

import useSettings from "app/hooks/useSettings";
import { NotificationProvider } from "app/contexts/NotificationContext";
import Brand from "app/components/Brand";
import { Span } from "app/components/Typography";
import { ParcMenu, ParcSearchBox } from "app/components";
import { NotificationBar } from "app/components/NotificationBar";
import { themeShadows } from "app/components/ParcTheme/themeColors";
import { topBarHeight } from "app/utils/constant";

// ─── SIDEBAR DIMS (mirror HierarchicalSidenav) ────────────────────────────
const RAIL_W = 0;
const PANEL_EXPANDED = 0;
const PANEL_COLLAPSED = 0;

// ─── STYLED ────────────────────────────────────────────────────────────────
const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.primary
}));

const ThemeToggleButton = styled(IconButton)(({ theme }) => ({
  borderRadius: "12px",
  padding: 10,
  width: 48,
  height: 48,
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  "& .MuiSvgIcon-root": { fontSize: "22px" },
  "&:hover": {
    background:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,0.08)"
        : "rgba(0,0,0,0.04)"
  }
}));

const TopbarRoot = styled("div", {
  shouldForwardProp: (p) => p !== "leftOffset"
})(({ leftOffset }) => ({
  position: "fixed",
  top: 0,
  left: leftOffset,
  right: 0,
  zIndex: 1198,           // below sidenav (1199/1200) but above content
  height: topBarHeight,
  transition: "left 240ms cubic-bezier(0.4,0,0.2,1)"
}));

const TopbarContainer = styled("div")(({ theme }) => ({
  padding: "8px",
  paddingLeft: 18,
  paddingRight: 20,
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  background:
    theme.palette.mode === "dark" ? "#1e293b" : "#ffffff",
  borderBottom: `1px solid ${
    theme.palette.mode === "dark"
      ? "rgba(255,255,255,0.1)"
      : "rgba(0,0,0,0.1)"
  }`,
  boxShadow: themeShadows[8],
  [theme.breakpoints.down("sm")]: { paddingLeft: 12, paddingRight: 12 }
}));

const UserMenu = styled("div")({
  padding: 4,
  display: "flex",
  borderRadius: 24,
  cursor: "pointer",
  alignItems: "center",
  "& span": { margin: "0 8px" }
});

const StyledItem = styled(MenuItem)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  minWidth: 185,
  "& a": {
    width: "100%",
    display: "flex",
    alignItems: "center",
    textDecoration: "none"
  },
  "& span": { marginRight: "10px", color: theme.palette.text.primary }
}));

// ─── COMPONENT ────────────────────────────────────────────────────────────
const Layout1Topbar = () => {
  const theme = useTheme();
  const { settings, updateSettings } = useSettings();
  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));

  // Compute left offset based on sidebar state
  const sidenavMode = settings.layout1Settings?.leftSidebar?.mode || "full";
  const showSidenav = settings.layout1Settings?.leftSidebar?.show !== false;
  const isPinned = sidenavMode !== "compact" && sidenavMode !== "close";
  const leftOffset =
    showSidenav && sidenavMode !== "close"
      ? RAIL_W + (isPinned ? PANEL_EXPANDED : PANEL_COLLAPSED)
      : 0;

  const isDarkMode =
    settings.activeTheme?.includes("Dark") ||
    settings.activeTheme === "slateDark1" ||
    settings.activeTheme === "slateDark2";

  const toggleTheme = () => {
    const isDark =
      settings.activeTheme?.includes("Dark") ||
      settings.activeTheme === "slateDark1" ||
      settings.activeTheme === "slateDark2";
    updateSettings({ activeTheme: isDark ? "blue" : "blueDark" });
  };

  const handleSidebarToggle = () => {
    const currentMode = settings.layout1Settings.leftSidebar.mode;
    const newMode =
      currentMode === "full" ? "compact" : "full";
    updateSettings({ layout1Settings: { leftSidebar: { mode: newMode } } });
  };

  const user = { name: "User", avatar: "" };
  const logout = () => {};

  return (
    <TopbarRoot leftOffset={leftOffset}>
      <TopbarContainer>
        <Box display="flex" alignItems="center" gap={1}>
          <StyledIconButton onClick={handleSidebarToggle} size="small">
            <Menu />
          </StyledIconButton>
          <Brand />
        </Box>

        <Box display="flex" alignItems="center">
          <ParcSearchBox />

          <Tooltip
            title={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
          >
            <ThemeToggleButton onClick={toggleTheme} color="inherit">
              {isDarkMode ? <Brightness4Icon /> : <Brightness7Icon />}
            </ThemeToggleButton>
          </Tooltip>

          <NotificationProvider>
            <NotificationBar />
          </NotificationProvider>

          <ParcMenu
            menuButton={
              <UserMenu>
                <Span>
                  Hi <strong>{user.name}</strong>
                </Span>
                <Avatar src={user.avatar} sx={{ cursor: "pointer" }} />
              </UserMenu>
            }
          >
            <StyledItem>
              <Link to="/">
                <Home />
                <Span sx={{ marginInlineStart: 1 }}>Home</Span>
              </Link>
            </StyledItem>
            <StyledItem>
              <Person />
              <Span sx={{ marginInlineStart: 1 }}>Profile</Span>
            </StyledItem>
            <StyledItem>
              <Settings />
              <Span sx={{ marginInlineStart: 1 }}>Settings</Span>
            </StyledItem>
            <StyledItem onClick={logout}>
              <PowerSettingsNew />
              <Span sx={{ marginInlineStart: 1 }}>Logout</Span>
            </StyledItem>
          </ParcMenu>
        </Box>
      </TopbarContainer>
    </TopbarRoot>
  );
};

export default memo(Layout1Topbar);
