// leftSidebar.mode:
//   "full"    → panel pinned expanded (220px wide)
//   "compact" → panel collapsed to icon-bar (44px), hover to peek
//   "close"   → entire sidenav hidden (mobile)
const Layout1Settings = {
  leftSidebar: {
    show: true,
    mode: "full",           // "full" | "compact" | "close"
    theme: "slateDark1",    // applied to SidenavTheme wrapper
    bgImgURL: "/assets/images/sidebar/sidebar-bg-dark.jpg"
  },
  topbar: {
    show: true,
    fixed: true,
    theme: "whiteBlue"
  }
};

export default Layout1Settings;
