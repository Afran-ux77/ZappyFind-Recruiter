import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  InputAdornment,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import WorkOutlineRoundedIcon from "@mui/icons-material/WorkOutlineRounded";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { useState } from "react";

export const SHELL_INK = "#17120E";
export const SHELL_MUTED = "#6B635C";
export const SHELL_PRIMARY = "#F8723A";
export const SHELL_PAGE_BG = "#F9F7F2";
export const SHELL_SIDEBAR_W = 252;

/** Compact app chrome (aligned with create-job flow scale). */
const shell = {
  brandWordmark: { fontSize: "0.875rem", fontWeight: 700, letterSpacing: "-0.02em", color: SHELL_INK, lineHeight: 1.25 },
  brandTag: { fontSize: "0.6875rem", color: SHELL_MUTED, fontWeight: 600, letterSpacing: "0.02em", lineHeight: 1.3 },
  navLabel: { fontSize: "0.8125rem", fontWeight: 600 },
  navLabelActive: { fontSize: "0.8125rem", fontWeight: 700 },
  profileName: { fontSize: "0.8125rem", fontWeight: 700, color: SHELL_INK, lineHeight: 1.25 },
  profileMeta: { fontSize: "0.6875rem", color: SHELL_MUTED, fontWeight: 500 },
};

const navItems = [
  { id: "home", label: "Home", Icon: HomeOutlinedIcon },
  { id: "jobs", label: "My Jobs", Icon: WorkOutlineRoundedIcon },
  { id: "team", label: "Team", Icon: GroupsOutlinedIcon },
  { id: "settings", label: "Settings", Icon: SettingsOutlinedIcon },
];

const profileData = {
  name: "Alex",
  jobTitle: "Hiring lead",
  email: "alex@zappyfind.com",
  phone: "+1 (347) 555-2874",
};

function SidebarNav({ activeNav, onNav, onLogoClick }) {
  return (
    <Stack
      sx={{
        height: "100%",
        pt: 2.5,
        pb: 1.75,
        px: 1.75,
      }}
    >
      <Box
        sx={{ mb: 2.5, cursor: onLogoClick ? "pointer" : "default" }}
        onClick={onLogoClick}
      >
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.25 }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: "9px",
              bgcolor: SHELL_PRIMARY,
              display: "grid",
              placeItems: "center",
              color: "#fff",
              fontWeight: 800,
              fontSize: "0.8125rem",
              flexShrink: 0,
            }}
          >
            Z
          </Box>
          <Box sx={{ minWidth: 0 }}>
            <Typography sx={shell.brandWordmark}>ZappyFind</Typography>
            <Typography sx={shell.brandTag}>For recruiters</Typography>
          </Box>
        </Stack>
      </Box>

      <List disablePadding sx={{ flex: 1 }}>
        {navItems.map(({ id, label, Icon }) => {
          const active = activeNav === id;
          return (
            <ListItemButton
              key={id}
              onClick={() => onNav(id)}
              sx={{
                borderRadius: "10px",
                mb: 0.25,
                py: 0.85,
                px: 1,
                bgcolor: active ? "rgba(248, 114, 58, 0.14)" : "transparent",
                color: active ? SHELL_PRIMARY : SHELL_MUTED,
                "&:hover": {
                  bgcolor: active ? "rgba(248, 114, 58, 0.18)" : "rgba(0,0,0,0.04)",
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 34, color: "inherit" }}>
                <Icon sx={{ fontSize: 20 }} />
              </ListItemIcon>
              <ListItemText
                primary={label}
                primaryTypographyProps={active ? shell.navLabelActive : shell.navLabel}
              />
            </ListItemButton>
          );
        })}
      </List>

    </Stack>
  );
}

/**
 * Shared recruiter workspace chrome: sidebar, mobile drawer, top bar, scrollable main region.
 */
export default function RecruiterAppShell({ activeNav, onNav, onSignOut, onLogoClick, children, mainScrollPt = 3.5 }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const isMdUp = useMediaQuery("(min-width:900px)");
  const profileMenuOpen = Boolean(profileAnchorEl);

  const topBar = (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={1.25}
      alignItems={{ xs: "stretch", sm: "center" }}
      sx={{
        gap: 1.25,
        py: { xs: 1.15, md: 1.35 },
        px: { xs: 1.75, md: 2.5 },
        borderBottom: "1px solid rgba(220, 212, 202, 0.55)",
        bgcolor: "rgba(255, 255, 255, 0.92)",
        backdropFilter: "blur(12px)",
      }}
    >
      {!isMdUp ? (
        <Stack direction="row" alignItems="center" spacing={0.75} sx={{ display: { md: "none" } }}>
          <IconButton aria-label="Open menu" size="small" onClick={() => setMobileOpen(true)} sx={{ color: SHELL_INK }}>
            <MenuRoundedIcon sx={{ fontSize: 22 }} />
          </IconButton>
          <Box
            sx={{
              width: 28,
              height: 28,
              borderRadius: "8px",
              bgcolor: SHELL_PRIMARY,
              display: "grid",
              placeItems: "center",
              color: "#fff",
              fontWeight: 800,
              fontSize: "0.75rem",
            }}
          >
            Z
          </Box>
        </Stack>
      ) : null}

      <TextField
        placeholder="Search roles, companies, skills..."
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchRoundedIcon sx={{ color: SHELL_MUTED, fontSize: 18 }} />
            </InputAdornment>
          ),
          sx: {
            borderRadius: "10px",
            bgcolor: SHELL_PAGE_BG,
            fontSize: "0.8125rem",
            "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(220, 212, 202, 0.85)" },
            "& .MuiOutlinedInput-input": { py: 0.9, fontSize: "0.8125rem" },
          },
        }}
        sx={{
          flex: 1,
          minWidth: 0,
          maxWidth: { md: 560, lg: 640 },
          "& .MuiOutlinedInput-root": { minHeight: 38 },
        }}
      />

      <Stack direction="row" spacing={0.5} alignItems="center">
        <IconButton aria-label="Notifications" size="small" sx={{ color: SHELL_INK, p: 0.75 }}>
          <NotificationsNoneRoundedIcon sx={{ fontSize: 22 }} />
        </IconButton>
      </Stack>
      <Stack
        direction="row"
        spacing={0.5}
        alignItems="center"
        justifyContent={{ xs: "flex-end", sm: "flex-start" }}
        sx={{ ml: "auto" }}
      >
        <Button
          onClick={(event) => setProfileAnchorEl(event.currentTarget)}
          sx={{
            minWidth: 0,
            textTransform: "none",
            borderRadius: "12px",
            px: 0.5,
            py: 0.5,
            color: SHELL_INK,
            border: "1px solid rgba(220, 212, 202, 0.6)",
            bgcolor: "rgba(255, 255, 255, 0.78)",
            "&:hover": { bgcolor: "rgba(255,255,255,0.95)" },
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <Box
              sx={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                bgcolor: "rgba(248, 114, 58, 0.16)",
                color: "#C4511A",
                display: "grid",
                placeItems: "center",
                fontWeight: 600,
                fontSize: "0.6875rem",
                flexShrink: 0,
              }}
            >
              A
            </Box>
            <Box sx={{ display: { xs: "none", sm: "block" }, textAlign: "left" }}>
              <Typography sx={shell.profileName}>{profileData.name}</Typography>
              <Typography sx={shell.profileMeta}>{profileData.jobTitle}</Typography>
            </Box>
            <KeyboardArrowDownRoundedIcon
              sx={{
                fontSize: 18,
                color: SHELL_MUTED,
                ml: 0.2,
                transform: profileMenuOpen ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 180ms ease",
              }}
            />
          </Stack>
        </Button>
      </Stack>
      <Menu
        anchorEl={profileAnchorEl}
        open={profileMenuOpen}
        onClose={() => setProfileAnchorEl(null)}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        sx={{ zIndex: 1700 }}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 296,
            borderRadius: "16px",
            border: "1px solid rgba(220, 212, 202, 0.62)",
            boxShadow: "0 16px 34px rgba(23, 18, 14, 0.1)",
            p: 0.75,
            overflow: "hidden",
            zIndex: 1700,
            bgcolor: "#fff",
          },
        }}
      >
        <Box
          sx={{
            px: 1.25,
            py: 1.15,
            borderRadius: "12px",
            backgroundColor: "#FAF8F4",
            border: "1px solid rgba(220, 212, 202, 0.55)",
          }}
        >
          <Stack direction="row" spacing={1.1} alignItems="center" sx={{ mb: 1 }}>
            <Box
              sx={{
                width: 34,
                height: 34,
                borderRadius: "50%",
                bgcolor: "rgba(248, 114, 58, 0.14)",
                color: "#C4511A",
                display: "grid",
                placeItems: "center",
                fontWeight: 700,
                fontSize: "0.75rem",
                flexShrink: 0,
              }}
            >
              A
            </Box>
            <Box sx={{ minWidth: 0 }}>
              <Typography sx={{ fontSize: "0.9rem", fontWeight: 700, color: SHELL_INK, lineHeight: 1.25 }}>
                {profileData.name}
              </Typography>
              <Typography sx={{ fontSize: "0.75rem", color: SHELL_MUTED, mt: 0.2 }}>
                {profileData.jobTitle}
              </Typography>
            </Box>
          </Stack>
          <Box sx={{ mt: 0.2 }}>
            <Typography sx={{ fontSize: "0.6875rem", color: SHELL_MUTED, letterSpacing: "0.04em", textTransform: "uppercase" }}>
              Email
            </Typography>
            <Typography sx={{ fontSize: "0.8125rem", color: SHELL_INK, fontWeight: 600, mt: 0.2 }}>
              {profileData.email}
            </Typography>
          </Box>
          <Box sx={{ mt: 0.9 }}>
            <Typography sx={{ fontSize: "0.6875rem", color: SHELL_MUTED, letterSpacing: "0.04em", textTransform: "uppercase" }}>
              Phone
            </Typography>
            <Typography sx={{ fontSize: "0.8125rem", color: SHELL_INK, fontWeight: 600, mt: 0.2 }}>
              {profileData.phone}
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ borderColor: "rgba(220, 212, 202, 0.62)", my: 0.75 }} />
        <MenuItem
          onClick={() => {
            setProfileAnchorEl(null);
            onSignOut();
          }}
          sx={{
            borderRadius: "11px",
            mx: 0.5,
            mb: 0.25,
            fontSize: "0.8125rem",
            fontWeight: 700,
            color: SHELL_INK,
            bgcolor: "transparent",
            "&:hover": { bgcolor: "rgba(0,0,0,0.04)" },
          }}
        >
          Log out
        </MenuItem>
      </Menu>
    </Stack>
  );

  const closeDrawer = () => setMobileOpen(false);

  return (
    <Box
      role="main"
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 1500,
        bgcolor: SHELL_PAGE_BG,
        overflow: "hidden",
        display: "flex",
      }}
    >
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          width: SHELL_SIDEBAR_W,
          flexShrink: 0,
          borderRight: "1px solid rgba(220, 212, 202, 0.55)",
          bgcolor: "rgba(255, 255, 255, 0.96)",
          flexDirection: "column",
        }}
      >
        <SidebarNav activeNav={activeNav} onNav={onNav} onLogoClick={onLogoClick} />
      </Box>

      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={closeDrawer}
        PaperProps={{
          sx: { width: SHELL_SIDEBAR_W, bgcolor: "rgba(255, 255, 255, 0.98)" },
        }}
      >
        <SidebarNav
          activeNav={activeNav}
          onLogoClick={() => { if (onLogoClick) { onLogoClick(); closeDrawer(); } }}
          onNav={(id) => {
            onNav(id);
            closeDrawer();
          }}
        />
      </Drawer>

      <Box sx={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {topBar}
        <Box
          sx={{
            flex: 1,
            overflow: "auto",
            px: { xs: 1.75, md: 2.5 },
            pt: mainScrollPt,
            pb: { xs: 3.25, md: 3.5 },
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
