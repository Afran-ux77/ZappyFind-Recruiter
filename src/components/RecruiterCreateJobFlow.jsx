import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Collapse,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Fade,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  Chip,
  Snackbar,
  Stack,
  TextField,
  Tooltip,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import SwitchTransition from "react-transition-group/SwitchTransition";
import { useFormControl } from "@mui/material/FormControl";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import AutoFixHighOutlinedIcon from "@mui/icons-material/AutoFixHighOutlined";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import ContentPasteOutlinedIcon from "@mui/icons-material/ContentPasteOutlined";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import WorkOutlineRoundedIcon from "@mui/icons-material/WorkOutlineRounded";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import LinkRoundedIcon from "@mui/icons-material/LinkRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import IosShareRoundedIcon from "@mui/icons-material/IosShareRounded";
import RocketLaunchRoundedIcon from "@mui/icons-material/RocketLaunchRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";
import SpeedRoundedIcon from "@mui/icons-material/SpeedRounded";
import LinkRoundedIcon2 from "@mui/icons-material/InsertLinkRounded";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import PersonSearchOutlinedIcon from "@mui/icons-material/PersonSearchOutlined";
import PersonSearchRoundedIcon from "@mui/icons-material/PersonSearchRounded";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import Diversity3OutlinedIcon from "@mui/icons-material/Diversity3Outlined";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import HubOutlinedIcon from "@mui/icons-material/HubOutlined";
import AdjustOutlinedIcon from "@mui/icons-material/AdjustOutlined";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import RecruiterAppShell, {
  SHELL_INK,
  SHELL_MUTED,
  SHELL_PRIMARY,
} from "./RecruiterAppShell";

const EXPERIENCE_OPTIONS = ["0–2 years", "3–5 years", "6–10 years", "10+ years", "Leadership"];

const DEPARTMENT_OPTIONS = [
  "Engineering",
  "Product",
  "Design",
  "Data",
  "Marketing",
  "Sales",
  "Customer Success",
  "HR / People",
  "Finance",
  "Legal",
  "Operations",
  "Executive",
];

const DOMAIN_OPTIONS = [
  "Software & IT",
  "Internet & Digital Media",
  "Financial Services",
  "Insurance",
  "Healthcare & Life Sciences",
  "Pharmaceuticals & Biotech",
  "Retail & Consumer Goods",
  "E-commerce & Marketplaces",
  "Manufacturing & Industrial",
  "B2B SaaS",
  "Consumer tech",
  "Fintech",
  "Enterprise software",
  "AI / ML",
  "Cybersecurity",
  "Gaming",
  "EdTech",
  "Climate / Energy",
  "Hardware",
];

const SKILLS_MASTER_LIST = [
  "JavaScript", "TypeScript", "React", "Angular", "Vue.js", "Node.js", "Python", "Java", "Go", "Rust",
  "SQL", "GraphQL", "REST APIs", "AWS", "GCP", "Azure", "Docker", "Kubernetes", "CI/CD", "Git",
  "Figma", "Sketch", "Adobe Creative Suite", "UI Design", "UX Research", "Design Systems",
  "Data Analysis", "Machine Learning", "Deep Learning", "NLP", "Computer Vision",
  "Product Management", "Agile / Scrum", "User Story Mapping", "A/B Testing", "Roadmapping",
  "Project Management", "Stakeholder Management", "Technical Writing", "Communication",
  "Sales Strategy", "CRM (Salesforce)", "Lead Generation", "Negotiation", "Account Management",
  "Digital Marketing", "SEO / SEM", "Content Strategy", "Social Media", "Analytics",
  "Financial Modeling", "Budgeting", "Compliance", "Risk Management",
  "Systems Thinking", "Leadership", "Cross-functional Collaboration", "Mentoring",
];

/** Scratch Position: matches reference (Basic / Intermediate / Advanced). */
const SCRATCH_EXPERTISE_LEVELS = ["Basic", "Intermediate", "Advanced"];

const EDUCATION_OPTIONS = [
  "No requirement",
  "High school diploma",
  "Associate degree",
  "Bachelor\u2019s degree",
  "Master\u2019s degree",
  "Doctorate (PhD)",
  "Professional certification",
];

const EMPLOYMENT_OPTIONS = ["Full-time", "Part-time", "Contract", "Internship"];

const SALARY_CURRENCY_OPTIONS = [
  { code: "USD", label: "USD ($)" },
  { code: "EUR", label: "EUR (€)" },
  { code: "GBP", label: "GBP (£)" },
  { code: "INR", label: "INR (₹)" },
  { code: "CAD", label: "CAD" },
  { code: "AUD", label: "AUD" },
  { code: "CHF", label: "CHF" },
  { code: "SGD", label: "SGD" },
];

const type = {
  flowTitle: {
    fontSize: "0.8125rem",
    fontWeight: 600,
    letterSpacing: "-0.01em",
    color: SHELL_INK,
    lineHeight: 1.35,
  },
  pageH1: {
    fontSize: "1.125rem",
    fontWeight: 700,
    letterSpacing: "-0.02em",
    color: SHELL_INK,
    lineHeight: 1.3,
  },
  lead: {
    fontSize: "0.875rem",
    fontWeight: 400,
    lineHeight: 1.5,
    color: SHELL_MUTED,
  },
  cardTitle: {
    fontSize: "1rem",
    fontWeight: 700,
    lineHeight: 1.35,
    color: SHELL_INK,
  },
  cardBody: {
    fontSize: "0.8125rem",
    fontWeight: 400,
    lineHeight: 1.5,
    color: SHELL_MUTED,
  },
  cardCta: {
    fontSize: "0.8125rem",
    fontWeight: 600,
    color: SHELL_PRIMARY,
  },
  sectionLabel: {
    fontSize: "0.65rem",
    fontWeight: 800,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: SHELL_MUTED,
    mb: 2,
  },
  accordionHeading: {
    fontSize: "0.875rem",
    fontWeight: 600,
    letterSpacing: "-0.02em",
    textTransform: "none",
    color: SHELL_INK,
    lineHeight: 1.35,
  },
};

const fieldSx = {
  "& .MuiOutlinedInput-root": { borderRadius: "12px" },
  "& .MuiInputLabel-root": { fontSize: "14px" },
};

/** Outlined Selects: label font size matches theme so the notch width stays correct; 1px border reads as one closed stroke. */
const positionSelectFieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    "& .MuiOutlinedInput-notchedOutline": {
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "#E7DED3",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#D6CABE",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderWidth: 1,
      borderColor: SHELL_PRIMARY,
    },
    "&.Mui-error .MuiOutlinedInput-notchedOutline": {
      borderColor: "error.main",
    },
  },
  "& .MuiInputLabel-root": {
    fontSize: "1rem",
    fontWeight: 600,
  },
};

/** Tracks open menu so the outline stays notched while the list is open (focus may move to the popover). */
const POSITION_SELECT_MENU_INITIAL = {
  department: false,
  domain: false,
  skillsPick: false,
};

/**
 * Outlined Select: when empty and blurred, `notched={false}` draws a full rectangle like the reference.
 * Notch appears when there is a value, the field is focused, or the menu is open.
 */
function ScratchPositionSelect({ value, onChange, label, labelId, menuOpen, onMenuOpen, onMenuClose, MenuProps, children, renderValue }) {
  const formControl = useFormControl();
  const notched =
    Boolean(String(value ?? "").trim()) || menuOpen || Boolean(formControl?.focused);
  return (
    <Select
      labelId={labelId}
      label={label}
      value={value}
      onChange={onChange}
      displayEmpty
      notched={notched}
      onOpen={onMenuOpen}
      onClose={onMenuClose}
      MenuProps={MenuProps}
      renderValue={renderValue}
    >
      {children}
    </Select>
  );
}

/** Matches onboarding Select menus: above app shell (z-index 1500), styled list. */
const POSITION_SELECT_MENU_PROPS = {
  disableScrollLock: true,
  disableAutoFocus: true,
  PaperProps: {
    sx: {
      zIndex: 2000,
      maxHeight: 360,
      borderRadius: "12px",
      border: "1px solid rgba(220, 212, 202, 0.65)",
      boxShadow: "0 12px 40px rgba(18, 10, 4, 0.1)",
      py: 0.5,
      "& .MuiMenuItem-root": {
        py: 1.125,
        minHeight: 44,
        fontSize: "0.875rem",
      },
    },
  },
  sx: { zIndex: 2000 },
  slotProps: {
    backdrop: {
      invisible: true,
      sx: { pointerEvents: "none" },
    },
  },
};

/** Expertise-only selects: compact trigger can be narrow; menu gets a comfortable min-width and padding. */
const EXPERTISE_SELECT_MENU_PROPS = {
  disableScrollLock: true,
  disableAutoFocus: true,
  anchorOrigin: { vertical: "bottom", horizontal: "left" },
  transformOrigin: { vertical: "top", horizontal: "left" },
  MenuListProps: {
    sx: {
      paddingTop: "2px",
      paddingBottom: "2px",
    },
  },
  PaperProps: {
    // Inline style wins over sx; Select sets paper style minWidth to anchor width unless overridden here.
    style: { minWidth: 168 },
    sx: {
      zIndex: 2000,
      maxHeight: 360,
      minWidth: 168,
      borderRadius: "12px",
      border: "1px solid rgba(220, 212, 202, 0.65)",
      boxShadow: "0 12px 40px rgba(18, 10, 4, 0.1)",
      py: 0.5,
      "& .MuiMenuItem-root": {
        py: 1,
        minHeight: 40,
        px: 1.75,
        fontSize: "0.875rem",
      },
    },
  },
  sx: { zIndex: 2000 },
  slotProps: {
    backdrop: {
      invisible: true,
      sx: { pointerEvents: "none" },
    },
  },
};

/** If imported or extracted text is not in the predefined list, append it so Select can display it. */
function mergeOptionList(predefined, current) {
  const v = String(current ?? "").trim();
  if (!v) return predefined;
  return predefined.includes(v) ? predefined : [...predefined, v];
}

const SCRATCH_EXPANDED_DEFAULT = {
  description: true,
  position: false,
  offer: false,
};

const scratchAccordionSx = {
  borderRadius: "16px",
  border: "1px solid rgba(220, 212, 202, 0.38)",
  bgcolor: "#fff",
  boxShadow: "0 1px 0 rgba(255,255,255,0.95) inset, 0 10px 36px rgba(18, 10, 4, 0.05)",
  "&:before": { display: "none" },
  overflow: "hidden",
  "&.Mui-disabled": {
    bgcolor: "rgba(250, 248, 245, 0.85)",
  },
};

const scratchAccordionSummarySx = {
  px: { xs: 1.5, md: 2 },
  py: 1,
  minHeight: 44,
  "& .MuiAccordionSummary-content": { margin: "8px 0", alignItems: "center" },
  "& .MuiAccordionSummary-expandIconWrapper .MuiSvgIcon-root": { fontSize: 20 },
};

const scratchAccordionDetailsSx = {
  px: { xs: 1.5, md: 2 },
  pb: { xs: 1.5, md: 2 },
  pt: 0,
};

/** Scratch Position / Offer accordions: grouped panels read faster than one flat stack. */
const scratchGroupedMicroHeadingSx = {
  fontSize: "0.7rem",
  fontWeight: 800,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: SHELL_INK,
  opacity: 0.72,
  mb: { xs: 2.5, sm: 3 },
  pl: 1.35,
  borderLeft: "2px solid rgba(248, 114, 58, 0.38)",
  lineHeight: 1.35,
};

const scratchGroupedPanelSx = {
  borderRadius: "14px",
  border: "1px solid rgba(220, 212, 202, 0.36)",
  bgcolor: "rgba(255, 253, 249, 0.92)",
  px: { xs: 1.75, sm: 2.25 },
  pt: { xs: 1.75, sm: 2 },
  pb: { xs: 1.9, sm: 2.15 },
  boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.55)",
};

/** Slightly slower enter so the next section opens in a calm, visible motion without closing the current one. */
const scratchAccordionSlotProps = {
  transition: {
    timeout: { enter: 480, exit: 280 },
    unmountOnExit: false,
  },
};

const scratchAccordionIconWrap = {
  width: 34,
  height: 34,
  borderRadius: "9px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  bgcolor: "rgba(107, 99, 92, 0.06)",
  color: "#7a726b",
  flexShrink: 0,
};

function ScratchAccordionHeading({ icon: Icon, label, meta }) {
  return (
    <Stack direction="row" alignItems="center" spacing={1.25} sx={{ width: "100%", pr: 0.5 }}>
      <Box sx={scratchAccordionIconWrap}>
        <Icon sx={{ fontSize: 19 }} />
      </Box>
      <Box>
        <Typography component="h2" sx={{ ...type.accordionHeading, mb: 0 }}>
          {label}
        </Typography>
        {meta ? (
          <Typography sx={{ fontSize: "0.69rem", color: SHELL_MUTED, lineHeight: 1.25, mt: "2px" }}>
            {meta}
          </Typography>
        ) : null}
      </Box>
    </Stack>
  );
}

const toggleSx = {
  flexWrap: "wrap",
  gap: 1.25,
  "& .MuiToggleButton-root": {
    textTransform: "none",
    fontWeight: 600,
    fontSize: "0.9375rem",
    lineHeight: 1.35,
    borderRadius: "12px !important",
    px: 2,
    py: 1.125,
    minHeight: 46,
    border: `1px solid rgba(220, 212, 202, 0.55) !important`,
    color: SHELL_MUTED,
    "&.Mui-selected": {
      color: SHELL_PRIMARY,
      bgcolor: "rgba(248, 114, 58, 0.1)",
      borderColor: `${SHELL_PRIMARY} !important`,
    },
  },
};

/** Sliding white pill over a neutral track; thumb position animates between segments. */
function ScratchExpertiseSlidingControl({ value, onChange, ariaLabel = "Expertise level" }) {
  const idx = Math.max(0, SCRATCH_EXPERTISE_LEVELS.indexOf(value));
  /** Track uses p:1 + gap:1 (8px); thumb geometry must match segment grid. */
  const thumbGap = "8px";
  const thumbPad = "8px";
  const segW = `calc((100% - 32px) / 3)`;
  const thumbLeft = `calc(${thumbPad} + ${idx} * (${segW} + ${thumbGap}))`;
  return (
    <Stack
      direction="row"
      role="radiogroup"
      aria-label={ariaLabel}
      sx={{
        position: "relative",
        alignItems: "stretch",
        gap: 1,
        p: 1,
        borderRadius: "999px",
        bgcolor: "rgba(107, 99, 92, 0.09)",
        width: { xs: "100%", md: "min(100%, 380px)" },
        minWidth: { xs: "100%", md: 320 },
        maxWidth: "100%",
        minHeight: 52,
      }}
    >
      <Box
        aria-hidden
        sx={(theme) => ({
          position: "absolute",
          top: 8,
          bottom: 8,
          width: segW,
          left: thumbLeft,
          borderRadius: "999px",
          bgcolor: "#fff",
          boxShadow: "0 1px 5px rgba(18, 10, 4, 0.14)",
          zIndex: 0,
          transition: theme.transitions.create("left", {
            duration: 320,
            easing: theme.transitions.easing.easeOut,
          }),
          "@media (prefers-reduced-motion: reduce)": {
            transition: "none",
          },
        })}
      />
      {SCRATCH_EXPERTISE_LEVELS.map((lvl) => {
        const selected = value === lvl;
        return (
          <Button
            key={lvl}
            type="button"
            role="radio"
            aria-checked={selected}
            disableRipple
            onClick={() => onChange(lvl)}
            sx={{
              position: "relative",
              zIndex: 1,
              flex: "1 1 0",
              minWidth: { xs: 0, sm: 100 },
              px: { xs: 1.25, sm: 1.75 },
              py: 1,
              minHeight: 44,
              borderRadius: "999px !important",
              textTransform: "none",
              fontWeight: 600,
              fontSize: "0.875rem",
              lineHeight: 1.4,
              color: selected ? SHELL_INK : SHELL_MUTED,
              bgcolor: "transparent",
              border: "none",
              boxShadow: "none",
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.22)",
              },
            }}
          >
            {lvl}
          </Button>
        );
      })}
    </Stack>
  );
}

/**
 * Best-effort parsing from pasted or uploaded job text. Fills structured fields for review.
 */
function extractJobFieldsFromText(raw) {
  const text = raw.trim();
  if (!text) return {};

  const nonEmptyLines = text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);
  const lower = text.toLowerCase();
  const out = {};

  const titleLabeled = nonEmptyLines.find((l) =>
    /^(job title|position|role|title)\s*[:#–-]\s*.+/i.test(l),
  );
  if (titleLabeled) {
    out.jobTitle = titleLabeled.replace(/^(job title|position|role|title)\s*[:#–-]\s*/i, "").trim();
  } else if (nonEmptyLines[0] && nonEmptyLines[0].length < 120 && !/^\$/.test(nonEmptyLines[0])) {
    out.jobTitle = nonEmptyLines[0];
  }

  const salaryRangeParts = text.match(
    /\$?([\d,]+(?:\.?\d*)?(?:k|K)?)\s*[-–]\s*\$?([\d,]+(?:\.?\d*)?(?:k|K)?)(?:\s*(?:USD|EUR|GBP|usd|eur|gbp))?/,
  );
  if (salaryRangeParts) {
    out.salaryMin = salaryRangeParts[1].trim();
    out.salaryMax = salaryRangeParts[2].trim();
  } else {
    const salaryMatch = text.match(/\$[\d,]+(?:k|K)?(?:\s*(?:USD|usd))?/);
    if (salaryMatch) out.salaryMin = salaryMatch[0].replace(/\s+/g, " ").trim();
  }

  const locMatch = text.match(/(?:location|based in|office(?:\s+location)?)\s*[:#–-]\s*([^\n]+)/i);
  if (locMatch) {
    out.location = locMatch[1].trim().replace(/\s+/g, " ").slice(0, 140);
  }
  if (!out.location && /\bremote\s*(?:first|only|worldwide|globally)?\b/i.test(text)) {
    out.location = "Remote";
  }

  if (/\bhybrid\b/i.test(lower)) out.workMode = "hybrid";
  else if (/\bremote\b/i.test(lower)) out.workMode = "remote";
  else if (/\b(on-?site|in[- ]office|office[- ]based)\b/i.test(lower)) out.workMode = "office";

  if (/\b3\s*[-–]\s*5\s*years?\b/i.test(text)) out.experienceRange = "3–5 years";
  else if (/\b6\s*[-–]\s*10\s*years?\b/i.test(text)) out.experienceRange = "6–10 years";
  else if (/\b(10|11|12|15)\s*\+?\s*years?\b/i.test(text) || /\b10\+\s*years?\b/i.test(text)) {
    out.experienceRange = "10+ years";
  } else if (/\b(0|1|2)\s*[-–]\s*\d+\s*years?\b/i.test(text) || /\bentry[- ]level\b/i.test(lower)) {
    out.experienceRange = "0–2 years";
  } else if (/\b(director|vp|head of)\b/i.test(lower) && /\b(team|org)\b/i.test(lower)) {
    out.experienceRange = "Leadership";
  }

  const deptMatch = text.match(/(?:department|team)\s*[:#–-]\s*([^\n]+)/i);
  if (deptMatch) out.department = deptMatch[1].trim().slice(0, 100);

  const domMatch = text.match(/(?:industry|domain|sector)\s*[:#–-]\s*([^\n]+)/i);
  if (domMatch) out.domain = domMatch[1].trim().slice(0, 100);

  if (/\bpart[- ]time\b/i.test(lower)) out.employmentType = "Part-time";
  else if (/\bcontract\b/i.test(lower)) out.employmentType = "Contract";
  else if (/\bintern(ship)?\b/i.test(lower)) out.employmentType = "Internship";
  else if (/\bfull[- ]time\b/i.test(lower)) out.employmentType = "Full-time";

  return out;
}

/** Career import dialog: short list so each line stays on screen long enough to read. */
const IMPORT_EXTRACTION_STEPS = [
  "Fetching the job posting",
  "Reading and understanding the page",
  "Extracting role, pay, and location",
  "Preparing fields for your review",
];

/** Time each import step stays active before advancing (ms). */
const IMPORT_EXTRACTION_STEP_MS = 2200;

/** Number of progress ticks while analyzing (drives % bar timing). */
const ANALYSIS_STEP_COUNT = 5;

/** Time each step stays on screen before advancing (ms). */
const ANALYSIS_STEP_INTERVAL_MS = 1200;
/** Extra pause after the last step so users can read the full progress state before the profile loads (ms). */
const ANALYSIS_PHASE_EXIT_DELAY_MS = 1800;

const ANALYSIS_PHASE_LABELS = [
  { verb: "Parsing", noun: "role requirements", icon: ArticleOutlinedIcon },
  { verb: "Mapping", noun: "skill competencies", icon: AccountTreeOutlinedIcon },
  { verb: "Calibrating", noun: "experience benchmarks", icon: SpeedRoundedIcon },
  { verb: "Analyzing", noun: "market context", icon: TrendingUpRoundedIcon },
  { verb: "Synthesizing", noun: "candidate blueprint", icon: PsychologyOutlinedIcon },
];

const PROFILE_PARTICLES = [
  { size: 5, top: "8%", left: "88%", dur: 6.4, delay: 0.1, opacity: 0.078 },
  { size: 7, top: "21%", left: "6%", dur: 5.6, delay: 0.8, opacity: 0.065 },
  { size: 4, top: "39%", left: "92%", dur: 4.8, delay: 1.3, opacity: 0.085 },
  { size: 6, top: "58%", left: "4%", dur: 6.1, delay: 0.5, opacity: 0.07 },
  { size: 8, top: "77%", left: "90%", dur: 7.2, delay: 1.1, opacity: 0.06 },
  { size: 5, top: "89%", left: "14%", dur: 5.2, delay: 0.3, opacity: 0.072 },
];

function getSkillsForRole(title, dept) {
  const t = `${title} ${dept}`.toLowerCase();
  if (/design/.test(t)) {
    return {
      mandatory: [
        { name: "Figma", level: 95 }, { name: "Design Systems", level: 90 },
        { name: "UX Research", level: 85 }, { name: "Systems thinking", level: 88 },
        { name: "Prototyping", level: 82 }, { name: "Engineering fluency", level: 78 },
      ],
      niceToHave: [
        { name: "Motion Design", level: 65 }, { name: "Design Ops", level: 55 },
        { name: "Stakeholder storytelling", level: 60 },
      ],
    };
  }
  if (/engineer|developer|frontend|backend|full.?stack/.test(t)) {
    return {
      mandatory: [
        { name: "System Design", level: 92 }, { name: "Code Quality", level: 90 },
        { name: "API Design", level: 88 }, { name: "Automated Testing", level: 85 },
        { name: "Performance", level: 80 }, { name: "CI/CD Pipelines", level: 82 },
      ],
      niceToHave: [
        { name: "Cloud Architecture", level: 65 }, { name: "Observability", level: 55 },
        { name: "Security", level: 60 }, { name: "Technical Writing", level: 50 },
      ],
    };
  }
  return {
    mandatory: [
      { name: "Strategic Thinking", level: 90 }, { name: "Execution", level: 88 },
      { name: "Communication", level: 92 }, { name: "Stakeholder Management", level: 85 },
      { name: "Problem Solving", level: 87 }, { name: "Ownership", level: 83 },
    ],
    niceToHave: [
      { name: "Change Management", level: 60 }, { name: "Process Design", level: 55 },
      { name: "Data Fluency", level: 50 }, { name: "Coaching", level: 58 },
    ],
  };
}

function buildProfileData(title, dept, domain, expRange, location, workMode, empType) {
  const seniorityMap = {
    "0-2 years": { archetype: "Rising Specialist", stage: "Early career", seniority: 25 },
    "3-5 years": { archetype: "Core Contributor", stage: "Mid career", seniority: 50 },
    "6-10 years": { archetype: "Senior Expert", stage: "Senior", seniority: 75 },
    "10+ years": { archetype: "Domain Authority", stage: "Staff / Principal", seniority: 90 },
    "Leadership": { archetype: "Strategic Leader", stage: "Director+", seniority: 95 },
  };
  const norm = (expRange || "").replace(/\u2013/g, "-");
  const sen = seniorityMap[norm] || { archetype: "Versatile Professional", stage: "Mid career", seniority: 55 };

  return {
    archetype: sen.archetype,
    careerStage: sen.stage,
    seniorityLevel: sen.seniority,
    experience: {
      roleYears: expRange || "3-5 years",
      industry: domain || "Cross-industry",
      companyStage: "Scale-up to Enterprise",
      projectScale: "50-200 person org",
      teamLevel: "Led or contributed to teams of 4-12",
    },
    cultural: {
      workStyle: "Autonomous, structured",
      communication: "Clear, async-first, concise",
      problemSolving: "Data-informed, iterative",
      leadership: "Mentors peers, drives consensus",
      adaptability: "Thrives in ambiguity",
    },
    location: {
      geo: location || "Flexible",
      mode: workMode === "remote" ? "Remote-first" : workMode === "hybrid" ? "Hybrid (2-3 days)" : "In-office daily",
      timezone: "Within 3h overlap of core team",
    },
    education: {
      formal: `Bachelor's in ${dept || "relevant field"} or equivalent`,
      altPaths: "Bootcamp or self-taught with strong portfolio accepted",
      learning: "Active in conferences, open source, or writing",
    },
    success: {
      rolePattern: `${expRange || "3-5 years"} in progressively senior ${dept || "IC"} roles`,
      tenure: "2-4 year stints (not job-hopping, not stagnant)",
      trajectory: "IC to senior, or IC to lead transition",
      transitions: "Moved across 2-3 companies or teams successfully",
    },
    timeline: {
      noticePeriod: "2-4 weeks preferred",
      startFlexibility: "Can start within 30-45 days",
      availability: empType === "Full-time" ? "Full-time, immediate" : `${empType}, flexible`,
    },
  };
}

/** Per-card icon wells — tinted fill + visible stroke + inset highlight (classic look) */
const PROFILE_INSIGHT_ICON_THEMES = [
  {
    wrapBg: "linear-gradient(155deg, rgba(21,74,112,0.22) 0%, rgba(44,100,150,0.1) 100%)",
    wrapBorder: "1px solid rgba(21,74,112,0.34)",
    iconColor: "#0f4a78",
    shadow: "0 1px 0 rgba(255,255,255,0.9) inset, 0 8px 20px rgba(21,74,112,0.12)",
  },
  {
    wrapBg: "linear-gradient(155deg, rgba(92,45,130,0.22) 0%, rgba(120,70,160,0.1) 100%)",
    wrapBorder: "1px solid rgba(92,45,130,0.36)",
    iconColor: "#5c1d8a",
    shadow: "0 1px 0 rgba(255,255,255,0.9) inset, 0 8px 20px rgba(92,45,130,0.13)",
  },
  {
    wrapBg: "linear-gradient(155deg, rgba(22,110,82,0.22) 0%, rgba(40,130,98,0.1) 100%)",
    wrapBorder: "1px solid rgba(22,110,82,0.34)",
    iconColor: "#0d6b4f",
    shadow: "0 1px 0 rgba(255,255,255,0.9) inset, 0 8px 20px rgba(22,110,82,0.12)",
  },
  {
    wrapBg: "linear-gradient(155deg, rgba(130,88,36,0.24) 0%, rgba(160,118,56,0.12) 100%)",
    wrapBorder: "1px solid rgba(130,88,36,0.38)",
    iconColor: "#8a5c18",
    shadow: "0 1px 0 rgba(255,255,255,0.9) inset, 0 8px 20px rgba(130,88,36,0.13)",
  },
  {
    wrapBg: "linear-gradient(155deg, rgba(42,86,136,0.22) 0%, rgba(60,108,168,0.1) 100%)",
    wrapBorder: "1px solid rgba(42,86,136,0.34)",
    iconColor: "#1e5590",
    shadow: "0 1px 0 rgba(255,255,255,0.9) inset, 0 8px 20px rgba(42,86,136,0.12)",
  },
  {
    wrapBg: "linear-gradient(155deg, rgba(98,64,118,0.22) 0%, rgba(120,88,142,0.1) 100%)",
    wrapBorder: "1px solid rgba(98,64,118,0.34)",
    iconColor: "#6b3d82",
    shadow: "0 1px 0 rgba(255,255,255,0.9) inset, 0 8px 20px rgba(98,64,118,0.12)",
  },
];

function getProfileInsights(title, dept, domain) {
  const t = `${title} ${dept}`.toLowerCase();
  if (/design/.test(t)) {
    return [
      {
        icon: AccountTreeOutlinedIcon,
        signal: "Systems thinking",
        detail:
          "Designers who architect cohesive systems outperform those focused on visual polish alone. Weighted as a core signal.",
      },
      {
        icon: CodeOutlinedIcon,
        signal: "Engineering fluency",
        detail:
          "In B2B SaaS, designers who discuss technical trade-offs with engineers ship at 2\u00d7 the velocity.",
      },
      {
        icon: CampaignOutlinedIcon,
        signal: "Stakeholder storytelling",
        detail:
          "Selling design decisions to non-design stakeholders is the #1 predictor of senior-level impact.",
      },
    ];
  }
  if (/engineer|developer|frontend|backend|full.?stack/.test(t)) {
    return [
      {
        icon: Diversity3OutlinedIcon,
        signal: "Mentorship capacity",
        detail:
          "At this seniority, elevating the team's output matters as much as individual contribution.",
      },
      {
        icon: BoltOutlinedIcon,
        signal: "Ownership beyond code",
        detail:
          "Engineers who treat reliability and customer impact as their concern ship better outcomes.",
      },
      {
        icon: HubOutlinedIcon,
        signal: "Architectural intuition",
        detail:
          "Your org's scale requires pattern recognition across service boundaries, not just coding skill.",
      },
    ];
  }
  return [
    {
      icon: Diversity3OutlinedIcon,
      signal: "Cross-functional influence",
      detail:
        "Aligning teams without direct authority \u2014 the top predictor of success in this role.",
    },
    {
      icon: EmojiObjectsIcon,
      signal: "Ambiguity tolerance",
      detail:
        "The ideal candidate turns ambiguity into action rather than waiting for direction.",
    },
    {
      icon: AdjustOutlinedIcon,
      signal: "Strategic prioritisation",
      detail:
        "Saying no to good ideas to protect great ones \u2014 a skill that compounds over time.",
    },
  ];
}

const PROFILE_SKILL_MARKED_BY = "Alex Chen";

/** Levels align with skill tier chips when adding a custom skill */
const PROFILE_NEW_SKILL_LEVEL_OPTIONS = [
  { label: "Expert", level: 92 },
  { label: "Strong", level: 80 },
  { label: "Good", level: 60 },
];
const PROFILE_NEW_SKILL_LEVEL_DEFAULT = 60;

/** Single-row headers above skill columns: strong contrast vs body, ~same height as prior dot+label. */
const profileSkillsMustHeaderRowSx = {
  flexDirection: "row",
  alignItems: "center",
  flexWrap: "nowrap",
  gap: 0.65,
  mb: 1.25,
  pl: "10px",
  pr: 1,
  py: 0.35,
  borderRadius: "8px",
  minHeight: 20,
  maxHeight: 22,
  boxSizing: "border-box",
};

const profileSkillsNiceHeaderRowSx = {
  flexDirection: "row",
  alignItems: "center",
  flexWrap: "nowrap",
  gap: 0.65,
  mb: 1.25,
  pl: "10px",
  pr: 1,
  py: 0.35,
  borderRadius: "8px",
  minHeight: 20,
  maxHeight: 22,
  boxSizing: "border-box",
};

const profileSkillsColumnHeaderLabelSx = {
  fontSize: "0.625rem",
  fontWeight: 800,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: SHELL_INK,
  lineHeight: 1.15,
};

function newProfileSkillId() {
  return globalThis.crypto?.randomUUID?.() ?? `sk-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function ProfileSkillCard({
  name,
  level,
  variant,
  inapplicableMeta,
  onMarkInapplicable,
  onRestore,
  onChangeLevel,
  skillTierFromLevel,
}) {
  const tier = skillTierFromLevel(level);
  const isInapp = Boolean(inapplicableMeta);
  const mandatory = variant === "mandatory";

  const TIER_CYCLE = [
    { label: "Expert", level: 92, bg: "#eef6ee", text: "#1a7a2e", dot: "#22a539" },
    { label: "Strong", level: 80, bg: "#eef2fb", text: "#2c5ea9", dot: "#3b7ddd" },
    { label: "Good",   level: 60, bg: "#f5f3fa", text: "#6b5b8a", dot: "#8b7ab0" },
  ];
  const currentIdx = TIER_CYCLE.findIndex((t) => t.label === tier.label);
  const tc = TIER_CYCLE[currentIdx >= 0 ? currentIdx : 2];
  const inappTc = { bg: "rgba(240,238,235,0.7)", text: "rgba(140,134,126,0.75)", dot: "rgba(200,195,188,0.6)" };
  const c = isInapp ? inappTc : tc;

  const selectedTierLevel = TIER_CYCLE[currentIdx >= 0 ? currentIdx : 2].level;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: { xs: 0.75, sm: 1 },
        py: 0.85,
        px: 1.25,
        bgcolor: isInapp ? "rgba(248,246,243,0.55)" : "transparent",
        opacity: isInapp ? 0.65 : 1,
        transition: "background-color 0.18s ease, opacity 0.18s ease",
        "&:hover": isInapp ? {} : { bgcolor: "rgba(0,0,0,0.015)" },
        "&:hover .skill-remove-btn": { opacity: 1 },
      }}
    >
      <Typography
        sx={{
          flex: "1 1 0",
          minWidth: 0,
          fontSize: "0.8125rem",
          fontWeight: mandatory ? 600 : 500,
          color: isInapp ? "rgba(107,99,92,0.55)" : SHELL_INK,
          lineHeight: 1.35,
          textDecoration: isInapp ? "line-through" : "none",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {name}
      </Typography>

      {/* 3 dots */}
      <Stack direction="row" spacing={0.4} alignItems="center" sx={{ flexShrink: 0 }}>
        {[0, 1, 2].map((i) => (
          <Box
            key={i}
            sx={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              bgcolor: i < tier.filled ? c.dot : "rgba(220,212,202,0.42)",
              transition: "background-color 0.18s ease",
            }}
          />
        ))}
      </Stack>

      {/* Expertise as compact select — one chevron, full list in menu */}
      {isInapp ? (
        <Box
          sx={{
            flexShrink: 0,
            display: "inline-flex",
            alignItems: "center",
            px: 0.65,
            py: 0.35,
            borderRadius: "6px",
            bgcolor: c.bg,
            minWidth: 64,
          }}
        >
          <Typography sx={{ fontSize: "0.65rem", fontWeight: 700, color: c.text, lineHeight: 1, letterSpacing: "0.02em" }}>
            {tier.label}
          </Typography>
        </Box>
      ) : (
        <FormControl
          size="small"
          sx={{
            flexShrink: 0,
            minWidth: 0,
            "& .MuiInputBase-root": {
              bgcolor: c.bg,
              transition: "background-color 0.15s ease, box-shadow 0.15s ease",
              minHeight: 26,
              height: 26,
              boxSizing: "border-box",
            },
          }}
        >
          <Select
            variant="outlined"
            value={selectedTierLevel}
            onChange={(e) => onChangeLevel(Number(e.target.value))}
            onClick={(e) => e.stopPropagation()}
            IconComponent={KeyboardArrowDownRoundedIcon}
            MenuProps={EXPERTISE_SELECT_MENU_PROPS}
            inputProps={{
              "aria-label": `Expertise level for ${name} (currently ${tier.label})`,
            }}
            renderValue={() => tier.label}
            sx={{
              fontSize: "0.65rem",
              fontWeight: 700,
              color: c.text,
              borderRadius: "6px",
              minWidth: 84,
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "transparent" },
              "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: `${c.text}30` },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: `${c.dot}`, borderWidth: 1 },
              "& .MuiSelect-select": {
                fontSize: "12px",
                py: 0.2,
                pl: 0.65,
                pr: 2.125,
                display: "flex",
                alignItems: "center",
                minHeight: 0,
              },
              "& .MuiSelect-icon": {
                color: c.text,
                opacity: 0.75,
                fontSize: 18,
                right: 2,
              },
            }}
          >
            {TIER_CYCLE.map((t) => (
              <MenuItem key={t.level} value={t.level} sx={{ fontSize: "0.8125rem", minHeight: 40, py: 1, px: 1.75 }}>
                <Stack direction="row" alignItems="center" sx={{ gap: "10px" }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: t.dot, flexShrink: 0 }} />
                  {t.label}
                </Stack>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {/* Remove / Restore — subtle icon */}
      {!isInapp ? (
        <Tooltip title="Remove from profile" placement="top" arrow enterDelay={300}>
          <IconButton
            className="skill-remove-btn"
            size="small"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onMarkInapplicable();
            }}
            sx={{
              flexShrink: 0,
              opacity: 0.62,
              width: 24,
              height: 24,
              color: "rgba(95, 88, 80, 0.82)",
              transition: "opacity 0.15s ease, color 0.15s ease",
              "&:hover": { opacity: 1, color: "#c44", bgcolor: "rgba(220,60,60,0.08)" },
            }}
          >
            <CloseRoundedIcon sx={{ fontSize: 15 }} />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip
          title={
            <span>
              Removed &middot; {inapplicableMeta.by}
              <br />
              {inapplicableMeta.at}
            </span>
          }
          placement="top"
          arrow
          enterDelay={200}
        >
          <Button
            type="button"
            variant="text"
            size="small"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onRestore();
            }}
            sx={{
              flexShrink: 0,
              textTransform: "none",
              fontSize: "0.6rem",
              fontWeight: 600,
              minWidth: 0,
              px: 0.65,
              py: 0.15,
              lineHeight: 1.2,
              color: "#3b7ddd",
              borderRadius: "6px",
              "&:hover": { bgcolor: "rgba(59,125,221,0.06)" },
            }}
          >
            Undo
          </Button>
        </Tooltip>
      )}
    </Box>
  );
}

function simulateCareerPageExtraction() {
  return {
    jobTitle: "Senior Product Designer",
    department: "Product",
    domain: "B2B SaaS",
    experienceRange: "3\u20135 years",
    salaryMin: "140k",
    salaryMax: "180k",
    salaryCurrency: "USD",
    location: "San Francisco, CA (Hybrid)",
    employmentType: "Full-time",
    workMode: "hybrid",
    jobDescription:
      "We are looking for a Senior Product Designer to join our growing product team. You will own end-to-end design for key workflows, partner closely with engineering and product management, and help set the bar for design quality across the platform.\n\nResponsibilities:\n- Lead design for core product areas from concept to launch\n- Create wireframes, prototypes, and high-fidelity mockups\n- Conduct user research and usability testing\n- Collaborate with cross-functional teams to define requirements\n- Contribute to and evolve the design system\n\nRequirements:\n- 3+ years of product design experience in B2B SaaS\n- Strong portfolio demonstrating end-to-end product thinking\n- Proficiency in Figma and modern prototyping tools\n- Excellent communication and storytelling skills\n- Experience working in agile, cross-functional teams",
  };
}

export default function RecruiterCreateJobFlow({ onBack, onExit }) {
  const [phase, setPhase] = useState("choose");
  const [scratchExpanded, setScratchExpanded] = useState(() => ({ ...SCRATCH_EXPANDED_DEFAULT }));
  const [jobTitle, setJobTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [domain, setDomain] = useState("");
  const [experienceRange, setExperienceRange] = useState("");
  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");
  const [salaryCurrency, setSalaryCurrency] = useState("USD");
  const [location, setLocation] = useState("");
  const [employmentType, setEmploymentType] = useState("Full-time");
  const [workMode, setWorkMode] = useState("remote");
  const [scratchSkills, setScratchSkills] = useState([]);
  const [scratchPendingSkill, setScratchPendingSkill] = useState("");
  const [scratchPendingExpertise, setScratchPendingExpertise] = useState("Intermediate");
  const [minEducation, setMinEducation] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [scratchTouched, setScratchTouched] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });
  const [careerPageUrl, setCareerPageUrl] = useState("");
  const [careerTouched, setCareerTouched] = useState(false);
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [importExtracting, setImportExtracting] = useState(false);
  const [importStepIndex, setImportStepIndex] = useState(0);
  const [importSource, setImportSource] = useState("");
  const [jdInputMode, setJdInputMode] = useState("paste");
  const [jdFileName, setJdFileName] = useState("");
  const [jdDropHover, setJdDropHover] = useState(false);
  const [positionSelectMenuOpen, setPositionSelectMenuOpen] = useState(() => ({ ...POSITION_SELECT_MENU_INITIAL }));
  const [analysisStep, setAnalysisStep] = useState(0);
  const [collaboratorInput, setCollaboratorInput] = useState("");
  const [collaborators, setCollaborators] = useState([]);
  const [publishing, setPublishing] = useState(false);
  /** Profile phase: extra skills and inapplicable marks (demo: marked by current user) */
  const [profileAddedMandatory, setProfileAddedMandatory] = useState([]);
  const [profileAddedNice, setProfileAddedNice] = useState([]);
  const [profileInapplicable, setProfileInapplicable] = useState({});
  const [profileLevelOverrides, setProfileLevelOverrides] = useState({});
  const [profileNewMandatoryInput, setProfileNewMandatoryInput] = useState("");
  const [profileNewNiceInput, setProfileNewNiceInput] = useState("");
  const [profileNewMandatoryLevel, setProfileNewMandatoryLevel] = useState(PROFILE_NEW_SKILL_LEVEL_DEFAULT);
  const [profileNewNiceLevel, setProfileNewNiceLevel] = useState(PROFILE_NEW_SKILL_LEVEL_DEFAULT);
  const [profileMandatoryAddExpanded, setProfileMandatoryAddExpanded] = useState(false);
  const [profileNiceAddExpanded, setProfileNiceAddExpanded] = useState(false);
  const [hmSent, setHmSent] = useState(false);
  const [skipHmDialogOpen, setSkipHmDialogOpen] = useState(false);
  const [sendHmDialogOpen, setSendHmDialogOpen] = useState(false);
  /** True while send dialog exit runs so skip paper stays recessed until unstack can animate smoothly */
  const [sendHmLeavingStacked, setSendHmLeavingStacked] = useState(false);

  const skipHmRecessedBehindSend = skipHmDialogOpen && (sendHmDialogOpen || sendHmLeavingStacked);

  const closeSendHmDialog = useCallback(() => {
    if (skipHmDialogOpen && sendHmDialogOpen) {
      setSendHmLeavingStacked(true);
    }
    setSendHmDialogOpen(false);
  }, [skipHmDialogOpen, sendHmDialogOpen]);

  const handleSkipHmDialogClose = useCallback(() => {
    if (sendHmDialogOpen) {
      closeSendHmDialog();
      return;
    }
    setSkipHmDialogOpen(false);
  }, [sendHmDialogOpen, closeSendHmDialog]);

  useEffect(() => {
    if (!skipHmDialogOpen) {
      setSendHmLeavingStacked(false);
    }
  }, [skipHmDialogOpen]);

  const [hmEmails, setHmEmails] = useState([]);
  const [hmEmailInput, setHmEmailInput] = useState("");
  const [hmEmailError, setHmEmailError] = useState("");
  const [hmPreviewExpanded, setHmPreviewExpanded] = useState(false);
  const profileMandatorySkillInputRef = useRef(null);
  const profileNiceSkillInputRef = useRef(null);
  const jdFileInputRef = useRef(null);
  const importIntervalRef = useRef(null);
  const scratchAdvanceOnceRef = useRef({
    description: false,
    position: false,
  });

  const roleValid =
    jobTitle.trim().length > 0 && department.trim().length > 0 && domain.trim().length > 0;

  const resetScratchForm = () => {
    setJobTitle("");
    setDepartment("");
    setDomain("");
    setExperienceRange("");
    setSalaryMin("");
    setSalaryMax("");
    setSalaryCurrency("USD");
    setLocation("");
    setEmploymentType("Full-time");
    setWorkMode("remote");
    setScratchSkills([]);
    setScratchPendingSkill("");
    setScratchPendingExpertise("Intermediate");
    setMinEducation("");
    setJobDescription("");
    setScratchTouched(false);
    setScratchExpanded({ ...SCRATCH_EXPANDED_DEFAULT });
    setJdInputMode("paste");
    setJdFileName("");
    scratchAdvanceOnceRef.current = {
      description: false,
      position: false,
    };
    setPositionSelectMenuOpen({ ...POSITION_SELECT_MENU_INITIAL });
  };

  const scratchSkillPickOptions = useMemo(() => {
    const taken = new Set(scratchSkills.map((s) => s.name.toLowerCase()));
    return SKILLS_MASTER_LIST.filter((name) => !taken.has(name.toLowerCase()));
  }, [scratchSkills]);

  const addPendingScratchSkill = () => {
    const name = scratchPendingSkill.trim();
    if (!name || scratchSkills.length >= 10) return;
    if (scratchSkills.some((s) => s.name.toLowerCase() === name.toLowerCase())) return;
    setScratchSkills((prev) => [...prev, { name, level: scratchPendingExpertise }]);
    setScratchPendingSkill("");
  };

  const jdOpensNext = jobDescription.trim().length > 1;
  const experienceOpensNext = experienceRange.trim().length > 1;

  const showJobDescriptionField = jdInputMode === "paste" || Boolean(jdFileName) || Boolean(importSource);

  useEffect(() => {
    if (phase !== "scratch") return;
    const r = scratchAdvanceOnceRef.current;
    if (!jdOpensNext) r.description = false;
    if (!experienceOpensNext) r.position = false;
  }, [phase, jdOpensNext, experienceOpensNext]);

  useEffect(() => {
    if (phase !== "scratch") return;

    setScratchExpanded((prev) => {
      const r = scratchAdvanceOnceRef.current;
      const next = { ...prev };
      let changed = false;

      if (jdOpensNext && !r.description) {
        r.description = true;
        if (!prev.position) {
          next.position = true;
          changed = true;
        }
      }
      if (experienceOpensNext && !r.position) {
        r.position = true;
        if (!prev.offer) {
          next.offer = true;
          changed = true;
        }
      }

      return changed ? next : prev;
    });
  }, [phase, jdOpensNext, experienceOpensNext]);

  useEffect(() => {
    if (phase === "profile") return;
    setProfileMandatoryAddExpanded(false);
    setProfileNiceAddExpanded(false);
  }, [phase]);

  useEffect(
    () => () => {
      if (importIntervalRef.current) {
        clearInterval(importIntervalRef.current);
        importIntervalRef.current = null;
      }
    },
    [],
  );

  useEffect(() => {
    if (phase !== "analyzing") return;
    setAnalysisStep(0);
    let step = 0;
    const iv = setInterval(() => {
      step += 1;
      if (step < ANALYSIS_STEP_COUNT) {
        setAnalysisStep(step);
      } else {
        clearInterval(iv);
        setTimeout(() => setPhase("profile"), ANALYSIS_PHASE_EXIT_DELAY_MS);
      }
    }, ANALYSIS_STEP_INTERVAL_MS);
    return () => clearInterval(iv);
  }, [phase]);

  const handleNav = (id) => {
    if (id === "home") {
      onBack();
    }
  };

  const allScratchValid =
    roleValid &&
    experienceRange.length > 0 &&
    salaryMin.trim().length > 0 &&
    salaryMax.trim().length > 0 &&
    location.trim().length > 0 &&
    employmentType.length > 0 &&
    workMode.length > 0 &&
    jobDescription.trim().length >= 24;

  const handleSaveScratch = () => {
    setScratchTouched(true);
  if (!allScratchValid) {
    const missing = [];
    if (!jobDescription.trim() || jobDescription.trim().length < 24) missing.push("job description");
    if (!jobTitle.trim()) missing.push("job title");
    if (!department.trim()) missing.push("department");
    if (!domain.trim()) missing.push("domain");
    if (!experienceRange.length) missing.push("experience level");
    if (!salaryMin.trim()) missing.push("salary min");
    if (!salaryMax.trim()) missing.push("salary max");
    if (!location.trim()) missing.push("location");
    if (!employmentType.length) missing.push("employment type");
    if (!workMode.length) missing.push("work mode");

    setScratchExpanded({ description: true, position: true, offer: true });
    setSnackbar({
      open: true,
      message: `Please complete required fields before continuing: ${missing.slice(0, 3).join(", ")}${missing.length > 3 ? ", ..." : ""}.`,
    });
    return;
  }
  setPhase("analyzing");
  };

  const handleSaveScratchDraft = () => {
    setSnackbar({
      open: true,
      message: `\u201c${jobTitle.trim() || "Job"}\u201d saved as draft.`,
    });
  };

  const handleScratchBack = () => {
    resetScratchForm();
    setImportSource("");
    setCareerPageUrl("");
    setCareerTouched(false);
    setImportDialogOpen(false);
    clearImportInterval();
    setImportExtracting(false);
    setImportStepIndex(0);
    setPhase("choose");
  };

  const loadJdFromFile = (file) => {
    if (!file) return;
    const nameOk = /\.(txt|md|markdown)$/i.test(file.name);
    const typeOk = file.type === "text/plain" || file.type === "" || file.type === "text/markdown";
    if (!nameOk && !typeOk) {
      setSnackbar({ open: true, message: "Use a .txt or .md file, or paste from a doc instead." });
      return;
    }
    if (file.size > 400 * 1024) {
      setSnackbar({ open: true, message: "That file is too large. Try under 400 KB or paste an excerpt." });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setJobDescription(String(reader.result ?? ""));
      setJdFileName(file.name);
      setSnackbar({
        open: true,
        message: "File loaded. Run Extract details to fill Role, Pay, and other sections.",
      });
    };
    reader.onerror = () => {
      setSnackbar({ open: true, message: "We could not read that file. Try another file or paste the text." });
    };
    reader.readAsText(file);
  };

  const handleExtractFromJd = () => {
    const t = jobDescription.trim();
    if (t.length < 40) {
      setSnackbar({
        open: true,
        message: "Add a fuller job description so we can detect role, pay, and location.",
      });
      return;
    }
    const ex = extractJobFieldsFromText(t);
    const filled = [];
    if (ex.jobTitle) {
      setJobTitle(ex.jobTitle);
      filled.push("job title");
    }
    if (ex.department) {
      setDepartment(ex.department);
      filled.push("department");
    }
    if (ex.domain) {
      setDomain(ex.domain);
      filled.push("domain");
    }
    if (ex.experienceRange) {
      setExperienceRange(ex.experienceRange);
      filled.push("experience");
    }
    if (ex.salaryMin) setSalaryMin(ex.salaryMin);
    if (ex.salaryMax) setSalaryMax(ex.salaryMax);
    if (ex.salaryMin || ex.salaryMax) filled.push("salary");
    if (ex.location) {
      setLocation(ex.location);
      filled.push("location");
    }
    if (ex.employmentType) {
      setEmploymentType(ex.employmentType);
      filled.push("employment type");
    }
    if (ex.workMode) {
      setWorkMode(ex.workMode);
      filled.push("work mode");
    }
    if (filled.length) {
      setSnackbar({
        open: true,
        message: `Filled ${filled.length} area${filled.length === 1 ? "" : "s"} from your description: ${filled.join(", ")}. Review each section above.`,
      });
    } else {
      setSnackbar({
        open: true,
        message:
          "No structured fields found. Try lines like “Job title: …”, “Salary: …”, or “Location: …”, or a clearer posting.",
      });
    }
  };

  const isPlausibleUrl = (value) => {
    const v = value.trim();
    if (!v) return false;
    try {
      const u = new URL(v.startsWith("http") ? v : `https://${v}`);
      return u.protocol === "http:" || u.protocol === "https:";
    } catch {
      return false;
    }
  };

  const clearImportInterval = () => {
    if (importIntervalRef.current) {
      clearInterval(importIntervalRef.current);
      importIntervalRef.current = null;
    }
  };

  const closeImportDialog = () => {
    clearImportInterval();
    setImportExtracting(false);
    setImportStepIndex(0);
    setImportDialogOpen(false);
    setCareerTouched(false);
  };

  const handleContinueCareerImport = () => {
    setCareerTouched(true);
    if (!isPlausibleUrl(careerPageUrl)) return;

    setImportExtracting(true);
    setImportStepIndex(0);
    clearImportInterval();

    let step = 0;
    importIntervalRef.current = setInterval(() => {
      step += 1;
      if (step < IMPORT_EXTRACTION_STEPS.length) {
        setImportStepIndex(step);
      } else {
        clearImportInterval();
        const data = simulateCareerPageExtraction();
        setJobTitle(data.jobTitle);
        setDepartment(data.department);
        setDomain(data.domain);
        setExperienceRange(data.experienceRange);
        setSalaryMin(data.salaryMin);
        setSalaryMax(data.salaryMax);
        setSalaryCurrency(data.salaryCurrency);
        setLocation(data.location);
        setEmploymentType(data.employmentType);
        setWorkMode(data.workMode);
        setJobDescription(data.jobDescription);
        setImportSource(careerPageUrl.trim());
        setScratchExpanded({ description: true, position: true, offer: true });
        setImportExtracting(false);
        setImportStepIndex(0);
        setImportDialogOpen(false);
        setPhase("scratch");
        setSnackbar({
          open: true,
          message: "All fields imported. Review each section, then continue.",
        });
      }
    }, IMPORT_EXTRACTION_STEP_MS);
  };

  let body = null;

  if (phase === "choose") {
    const cardBase = {
      flex: 1,
      textAlign: "left",
      cursor: "pointer",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      p: { xs: 2, md: 2.5 },
      minHeight: { xs: "auto", md: 208 },
      borderRadius: "16px",
      border: "1px solid rgba(220, 212, 202, 0.38)",
      bgcolor: "#fff",
      boxShadow: "0 4px 24px rgba(18, 10, 4, 0.04)",
      transition: "border-color 0.22s ease, box-shadow 0.22s ease, transform 0.22s ease, background-color 0.22s ease",
      "&:hover": {
        borderColor: "rgba(248, 114, 58, 0.28)",
        boxShadow: "0 16px 48px rgba(248, 114, 58, 0.08)",
        transform: "translateY(-3px)",
        bgcolor: "rgba(255, 252, 249, 1)",
      },
      "&:focus-visible": {
        outline: `2px solid ${SHELL_PRIMARY}`,
        outlineOffset: 2,
      },
    };

    body = (
      <Box>
        <Stack direction="row" alignItems="center" spacing={0.25} sx={{ mb: 1.5 }}>
          <IconButton
            aria-label="Back to dashboard"
            onClick={onBack}
            size="small"
            sx={{
              color: SHELL_MUTED,
              ml: -1,
              "&:hover": { color: SHELL_INK, bgcolor: "rgba(0,0,0,0.04)" },
            }}
          >
            <ArrowBackRoundedIcon sx={{ fontSize: 20 }} />
          </IconButton>
          <Typography component="p" sx={type.flowTitle}>
            Create Job
          </Typography>
        </Stack>

        <Typography component="h1" sx={{ ...type.pageH1, mb: { xs: 2.25, md: 2.75 } }}>
          How would you like to start?
        </Typography>

        <Stack direction={{ xs: "column", md: "row" }} spacing={{ xs: 1.5, md: 2 }}>
          <Box
            component="button"
            type="button"
            onClick={() => {
              resetScratchForm();
              setPhase("scratch");
            }}
            sx={cardBase}
          >
            <Box>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "10px",
                  bgcolor: "rgba(248, 114, 58, 0.1)",
                  display: "grid",
                  placeItems: "center",
                  color: SHELL_PRIMARY,
                  mb: 1.5,
                }}
              >
                <EditNoteOutlinedIcon sx={{ fontSize: 22 }} />
              </Box>
              <Typography sx={{ ...type.cardTitle, mb: 0.5 }}>Start from scratch</Typography>
              <Typography sx={{ ...type.cardBody }}>
                Blank form, guided steps. Best for new roles.
              </Typography>
            </Box>
            <Typography
              component="span"
              sx={{
                mt: 2,
                display: "inline-flex",
                alignItems: "center",
                gap: 0.5,
                ...type.cardCta,
              }}
            >
              Start blank &rarr;
            </Typography>
          </Box>

          <Box
            component="button"
            type="button"
            onClick={() => {
              setCareerTouched(false);
              setImportDialogOpen(true);
            }}
            sx={cardBase}
          >
            <Box>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "10px",
                  bgcolor: "rgba(248, 114, 58, 0.1)",
                  display: "grid",
                  placeItems: "center",
                  color: SHELL_PRIMARY,
                  mb: 1.5,
                }}
              >
                <LinkRoundedIcon sx={{ fontSize: 22 }} />
              </Box>
              <Typography sx={{ ...type.cardTitle, mb: 0.5 }}>Import from career page</Typography>
              <Typography sx={{ ...type.cardBody }}>
                Paste a job link, we autofill the details. Just review and publish.
              </Typography>
            </Box>
            <Typography
              component="span"
              sx={{
                mt: 2,
                display: "inline-flex",
                alignItems: "center",
                gap: 0.5,
                ...type.cardCta,
              }}
            >
              Paste link &rarr;
            </Typography>
          </Box>
        </Stack>
      </Box>
    );
  } else if (phase === "scratch") {
    body = (
      <Box sx={{ width: "100%", maxWidth: "100%" }}>
        <Stack direction="row" alignItems="flex-start" spacing={0.5} sx={{ mb: 3 }}>
          <IconButton
            aria-label="Back to start options"
            onClick={handleScratchBack}
            size="small"
            sx={{
              color: SHELL_MUTED,
              ml: -1,
              mt: 0.125,
              flexShrink: 0,
              "&:hover": { color: SHELL_INK, bgcolor: "rgba(0,0,0,0.04)" },
            }}
          >
            <ArrowBackRoundedIcon sx={{ fontSize: 20 }} />
          </IconButton>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography component="h1" sx={{ ...type.pageH1, mb: 0.5 }}>
              {importSource ? "Review imported job" : "Start from scratch"}
            </Typography>
            <Typography sx={{ ...type.lead, mb: 0 }}>
              {importSource
                ? "All fields were pre-filled from the career page. Review and adjust anything before continuing."
                : "Upload or paste a job description to autofill, or fill each section manually."}
            </Typography>
          </Box>
        </Stack>

        {importSource ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              px: 1.5,
              py: 1,
              mb: 1.5,
              borderRadius: "10px",
              bgcolor: "rgba(248, 114, 58, 0.06)",
              border: "1px solid rgba(248, 114, 58, 0.18)",
            }}
          >
            <LinkRoundedIcon sx={{ fontSize: 16, color: SHELL_PRIMARY, flexShrink: 0 }} />
            <Typography
              sx={{
                fontSize: "0.75rem",
                fontWeight: 600,
                color: SHELL_MUTED,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              Imported from{" "}
              <Typography
                component="span"
                sx={{ fontWeight: 700, color: SHELL_INK, fontSize: "inherit" }}
              >
                {importSource}
              </Typography>
            </Typography>
          </Box>
        ) : null}

        <Stack spacing={1.5} sx={{ width: "100%" }}>
          {/* Description / Import at the top so users can upload first */}
          <Accordion
            expanded={scratchExpanded.description}
            onChange={(_, isExpanded) =>
              setScratchExpanded((prev) => ({ ...prev, description: isExpanded }))
            }
            sx={{
              ...scratchAccordionSx,
              border: `1.5px solid rgba(248, 114, 58, 0.22)`,
            }}
            slotProps={scratchAccordionSlotProps}
            disableGutters
          >
            <AccordionSummary
              expandIcon={<ExpandMoreRoundedIcon sx={{ color: SHELL_MUTED }} />}
              sx={scratchAccordionSummarySx}
              aria-controls="scratch-description-content"
              id="scratch-description-header"
            >
              <ScratchAccordionHeading icon={ArticleOutlinedIcon} label="Job description" />
            </AccordionSummary>
            <AccordionDetails sx={scratchAccordionDetailsSx}>
              <Box sx={{ width: "100%" }}>
                {!importSource ? (
                <ToggleButtonGroup
                  exclusive
                  value={jdInputMode}
                  onChange={(_, v) => v != null && setJdInputMode(v)}
                  aria-label="How to add job description text"
                  sx={{
                    mb: 2,
                    display: "inline-flex",
                    maxWidth: "100%",
                    width: { xs: "100%", sm: 300 },
                    p: "4px",
                    gap: 0,
                    borderRadius: "999px",
                    bgcolor: "rgba(107, 99, 92, 0.08)",
                    border: "1px solid rgba(220, 212, 202, 0.55)",
                    boxShadow: "inset 0 1px 2px rgba(255, 255, 255, 0.65)",
                    "& .MuiToggleButtonGroup-grouped": {
                      border: "0 !important",
                      borderRadius: "999px !important",
                    },
                    "& .MuiToggleButtonGroup-grouped.Mui-disabled": {
                      border: "0 !important",
                    },
                    "& .MuiToggleButton-root": {
                      flex: 1,
                      textTransform: "none",
                      fontWeight: 600,
                      fontSize: "0.8125rem",
                      letterSpacing: "-0.01em",
                      color: SHELL_MUTED,
                      bgcolor: "transparent",
                      py: 0.65,
                      px: 1.25,
                      transition: "background-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease",
                      "&.Mui-selected": {
                        color: SHELL_INK,
                        bgcolor: "#fff",
                        boxShadow: "0 1px 4px rgba(18, 10, 4, 0.08)",
                        "&:hover": { bgcolor: "#fff" },
                      },
                      "&:hover": {
                        bgcolor: "rgba(255, 255, 255, 0.45)",
                      },
                    },
                  }}
                >
                  <ToggleButton value="paste">
                    <Box
                      component="span"
                      sx={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 0.6 }}
                    >
                      <ContentPasteOutlinedIcon sx={{ fontSize: 17, opacity: 0.9 }} />
                      Paste
                    </Box>
                  </ToggleButton>
                  <ToggleButton value="upload">
                    <Box
                      component="span"
                      sx={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 0.6 }}
                    >
                      <CloudUploadOutlinedIcon sx={{ fontSize: 17, opacity: 0.9 }} />
                      Upload
                    </Box>
                  </ToggleButton>
                </ToggleButtonGroup>
                ) : null}

                {!importSource && jdInputMode === "upload" ? (
                  <Box
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        jdFileInputRef.current?.click();
                      }
                    }}
                    onDragEnter={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setJdDropHover(true);
                    }}
                    onDragLeave={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setJdDropHover(false);
                    }}
                    onDragOver={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setJdDropHover(false);
                      const f = e.dataTransfer.files?.[0];
                      loadJdFromFile(f);
                    }}
                    onClick={() => jdFileInputRef.current?.click()}
                    sx={{
                      border: `2px dashed ${jdDropHover ? SHELL_PRIMARY : "rgba(220, 212, 202, 0.95)"}`,
                      borderRadius: "14px",
                      p: { xs: 2.5, sm: 3 },
                      textAlign: "center",
                      cursor: "pointer",
                      bgcolor: jdDropHover ? "rgba(248, 114, 58, 0.05)" : "rgba(107, 99, 92, 0.04)",
                      transition: "border-color 0.2s ease, background-color 0.2s ease",
                      mb: 2,
                    }}
                  >
                    <input
                      ref={jdFileInputRef}
                      type="file"
                      accept=".txt,.md,.markdown,text/plain"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        loadJdFromFile(e.target.files?.[0]);
                        e.target.value = "";
                      }}
                    />
                    <CloudUploadOutlinedIcon sx={{ fontSize: 36, color: "#7a726b", mb: 1 }} />
                    <Typography sx={{ fontWeight: 700, fontSize: "0.9375rem", color: SHELL_INK, mb: 0.5 }}>
                      Drop a .txt or .md file here
                    </Typography>
                    <Typography sx={{ fontSize: "0.8125rem", color: SHELL_MUTED }}>
                      or click to browse
                    </Typography>
                    {jdFileName ? (
                      <Typography
                        sx={{ mt: 1.5, fontSize: "0.75rem", fontWeight: 700, color: SHELL_PRIMARY }}
                      >
                        Loaded: {jdFileName}
                      </Typography>
                    ) : null}
                  </Box>
                ) : null}

                {showJobDescriptionField ? (
                  <>
                    <Box
                      sx={{
                        position: "relative",
                        width: "100%",
                        borderRadius: "12px",
                      }}
                    >
                      <TextField
                        label={
                          importSource
                            ? "Imported description"
                            : jdInputMode === "upload"
                              ? "Review or edit"
                              : "Job description"
                        }
                        placeholder={
                          importSource
                            ? ""
                            : jdInputMode === "paste"
                              ? "Paste the full posting here."
                              : "Text from your file appears here."
                        }
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        error={scratchTouched && jobDescription.trim().length < 24}
                        multiline
                        minRows={jdInputMode === "upload" ? 3 : 4}
                        fullWidth
                        inputProps={{
                          "aria-describedby":
                            scratchTouched && jobDescription.trim().length < 24 ? "jd-desc-helper" : undefined,
                        }}
                        sx={{
                          ...fieldSx,
                          "& .MuiOutlinedInput-root": {
                            alignItems: "flex-start",
                            position: "relative",
                            height: "200px",
                            maxHeight: "200px",
                            padding: "4px 0 5px",
                            overflow: "visible",
                          },
                          "& .MuiOutlinedInput-input": {
                            padding: "16.5px 18px",
                            paddingBottom: "30px",
                            boxSizing: "border-box",
                            maxHeight: "calc(200px - 18px) !important",
                            overflow: "auto !important",
                            overflowX: "hidden",
                            resize: "none",
                            WebkitMaskImage:
                              "linear-gradient(to bottom, transparent 0%, #000 18px, #000 calc(100% - 18px), transparent 100%)",
                            maskImage:
                              "linear-gradient(to bottom, transparent 0%, #000 18px, #000 calc(100% - 18px), transparent 100%)",
                            WebkitMaskSize: "100% 100%",
                            maskSize: "100% 100%",
                            WebkitMaskRepeat: "no-repeat",
                            maskRepeat: "no-repeat",
                          },
                        }}
                      />
                      {jobDescription.trim().length > 0 ? (
                        <Typography
                          component="span"
                          aria-live="polite"
                          sx={{
                            position: "absolute",
                            right: 14,
                            bottom: 11,
                            fontSize: "0.6875rem",
                            fontWeight: 600,
                            letterSpacing: "0.02em",
                            color: SHELL_MUTED,
                            pointerEvents: "none",
                            lineHeight: 1,
                          }}
                        >
                          {jobDescription.trim().length} characters
                        </Typography>
                      ) : null}
                    </Box>
                    {scratchTouched && jobDescription.trim().length < 24 ? (
                      <FormHelperText id="jd-desc-helper" error sx={{ mx: 0, mt: 0.5 }}>
                        Add at least a short paragraph.
                      </FormHelperText>
                    ) : null}
                  </>
                ) : null}

                {!importSource ? (
                  <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
                    <Button
                      variant="contained"
                      size="medium"
                      startIcon={<AutoFixHighOutlinedIcon />}
                      onClick={handleExtractFromJd}
                      disabled={jobDescription.trim().length < 40}
                      sx={{
                        px: 2.5,
                        py: 1,
                        borderRadius: "10px",
                        fontWeight: 700,
                        fontSize: "0.875rem",
                        textTransform: "none",
                        boxShadow: "0 8px 20px rgba(248, 114, 58, 0.22)",
                      }}
                    >
                      Extract and fill all sections
                    </Button>
                  </Box>
                ) : null}
              </Box>
            </AccordionDetails>
          </Accordion>

          {!importSource ? (
            <Typography sx={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "-0.01em", color: SHELL_MUTED, mt: 1, px: 0.5 }}>
              Or fill manually
            </Typography>
          ) : null}

          {/* Position — who you are hiring */}
          <Accordion
            expanded={scratchExpanded.position}
            onChange={(_, isExpanded) =>
              setScratchExpanded((prev) => ({ ...prev, position: isExpanded }))
            }
            sx={scratchAccordionSx}
            slotProps={scratchAccordionSlotProps}
            disableGutters
          >
            <AccordionSummary
              expandIcon={<ExpandMoreRoundedIcon sx={{ color: SHELL_MUTED }} />}
              sx={scratchAccordionSummarySx}
              aria-controls="scratch-position-content"
              id="scratch-position-header"
            >
              <ScratchAccordionHeading
                icon={WorkOutlineRoundedIcon}
                label="Position"
                meta="Title, department, domain, experience, skills, education"
              />
            </AccordionSummary>
            <AccordionDetails sx={scratchAccordionDetailsSx}>
              <Box sx={{ width: "100%", maxWidth: "100%", minWidth: 0 }}>
                <Stack spacing={{ xs: 2.25, sm: 2.75 }}>
                  <Box sx={scratchGroupedPanelSx}>
                    <Typography component="h3" sx={scratchGroupedMicroHeadingSx}>
                      Role basics
                    </Typography>
                    <Grid container spacing={{ xs: 2, md: 2.5 }} sx={{ width: "100%" }}>
                      <Grid size={{ xs: 12, md: 4 }} sx={{ minWidth: 0 }}>
                        <TextField
                          fullWidth
                          label="Job title"
                          placeholder="e.g. Senior Product Designer"
                          value={jobTitle}
                          onChange={(e) => setJobTitle(e.target.value)}
                          error={scratchTouched && !jobTitle.trim()}
                          helperText={scratchTouched && !jobTitle.trim() ? "Required." : undefined}
                          sx={{ ...fieldSx, ...positionSelectFieldSx }}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, md: 4 }} sx={{ minWidth: 0 }}>
                        <FormControl fullWidth error={scratchTouched && !department.trim()} sx={positionSelectFieldSx}>
                          <InputLabel id="scratch-department-label">Department</InputLabel>
                          <ScratchPositionSelect
                            labelId="scratch-department-label"
                            label="Department"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            menuOpen={positionSelectMenuOpen.department}
                            onMenuOpen={() =>
                              setPositionSelectMenuOpen((prev) => ({ ...prev, department: true }))
                            }
                            onMenuClose={() =>
                              setPositionSelectMenuOpen((prev) => ({ ...prev, department: false }))
                            }
                            MenuProps={POSITION_SELECT_MENU_PROPS}
                          >
                            {mergeOptionList(DEPARTMENT_OPTIONS, department).map((opt) => (
                              <MenuItem key={opt} value={opt}>
                                {opt}
                              </MenuItem>
                            ))}
                          </ScratchPositionSelect>
                          {scratchTouched && !department.trim() ? <FormHelperText>Required.</FormHelperText> : null}
                        </FormControl>
                      </Grid>
                      <Grid size={{ xs: 12, md: 4 }} sx={{ minWidth: 0 }}>
                        <FormControl fullWidth error={scratchTouched && !domain.trim()} sx={positionSelectFieldSx}>
                          <InputLabel id="scratch-domain-label">Domain</InputLabel>
                          <ScratchPositionSelect
                            labelId="scratch-domain-label"
                            label="Domain"
                            value={domain}
                            onChange={(e) => setDomain(e.target.value)}
                            menuOpen={positionSelectMenuOpen.domain}
                            onMenuOpen={() =>
                              setPositionSelectMenuOpen((prev) => ({ ...prev, domain: true }))
                            }
                            onMenuClose={() =>
                              setPositionSelectMenuOpen((prev) => ({ ...prev, domain: false }))
                            }
                            MenuProps={POSITION_SELECT_MENU_PROPS}
                          >
                            {mergeOptionList(DOMAIN_OPTIONS, domain).map((opt) => (
                              <MenuItem key={opt} value={opt}>
                                {opt}
                              </MenuItem>
                            ))}
                          </ScratchPositionSelect>
                          {scratchTouched && !domain.trim() ? <FormHelperText>Required.</FormHelperText> : null}
                        </FormControl>
                      </Grid>
                    </Grid>

                    <Typography
                      component="h3"
                      sx={{
                        ...scratchGroupedMicroHeadingSx,
                        mt: { xs: 2.25, sm: 2.75 },
                      }}
                    >
                      Experience level
                    </Typography>
                    <ToggleButtonGroup
                      exclusive
                      value={experienceRange}
                      onChange={(_, v) => v != null && setExperienceRange(v)}
                      sx={{
                        ...toggleSx,
                        flexWrap: "wrap",
                        width: "100%",
                        justifyContent: "flex-start",
                        gap: 1,
                      }}
                      aria-label="Experience range"
                    >
                      {EXPERIENCE_OPTIONS.map((opt) => (
                        <ToggleButton key={opt} value={opt}>
                          {opt}
                        </ToggleButton>
                      ))}
                    </ToggleButtonGroup>
                    {scratchTouched && !experienceRange ? (
                      <Typography role="alert" sx={{ color: "error.main", fontSize: "0.75rem", mt: 1.5, fontWeight: 600 }}>
                        Select one.
                      </Typography>
                    ) : null}
                  </Box>

                  {/* ── Skills — design-system labels, sliding expertise, chips below row ── */}
                  <Box sx={scratchGroupedPanelSx}>
                    <Typography component="h3" sx={scratchGroupedMicroHeadingSx}>
                      {"Skills & expertise"}
                    </Typography>

                    <Grid container spacing={{ xs: 2, md: 2.5 }} sx={{ width: "100%" }}>
                      <Grid size={{ xs: 12, md: 4 }} sx={{ minWidth: 0 }}>
                        <FormControl fullWidth sx={positionSelectFieldSx}>
                          <InputLabel id="scratch-skill-pick-label">Skill</InputLabel>
                          <ScratchPositionSelect
                            labelId="scratch-skill-pick-label"
                            label="Skill"
                            value={scratchPendingSkill}
                            onChange={(e) => setScratchPendingSkill(e.target.value)}
                            menuOpen={positionSelectMenuOpen.skillsPick}
                            onMenuOpen={() =>
                              setPositionSelectMenuOpen((prev) => ({ ...prev, skillsPick: true }))
                            }
                            onMenuClose={() =>
                              setPositionSelectMenuOpen((prev) => ({ ...prev, skillsPick: false }))
                            }
                            MenuProps={POSITION_SELECT_MENU_PROPS}
                          >
                            {scratchSkillPickOptions.map((opt) => (
                              <MenuItem key={opt} value={opt}>
                                {opt}
                              </MenuItem>
                            ))}
                          </ScratchPositionSelect>
                        </FormControl>
                      </Grid>
                      <Grid size={{ xs: 12, md: 8 }} sx={{ minWidth: 0 }}>
                        <Stack
                          direction={{ xs: "column", md: "row" }}
                          spacing={{ xs: 2, md: 2.5 }}
                          alignItems={{ xs: "stretch", md: "flex-end" }}
                          sx={{ width: "100%" }}
                        >
                          <Box sx={{ flex: { md: "0 1 auto" }, minWidth: 0, width: { xs: "100%", md: "auto" } }}>
                            <ScratchExpertiseSlidingControl
                              value={scratchPendingExpertise}
                              onChange={setScratchPendingExpertise}
                            />
                          </Box>
                          <Box
                            sx={{
                              flex: { md: "0 0 auto" },
                              alignSelf: { xs: "stretch", md: "flex-end" },
                              borderRadius: "10px",
                            }}
                          >
                            <Button
                              variant="outlined"
                              size="medium"
                              startIcon={<AddRoundedIcon sx={{ fontSize: "18px !important" }} />}
                              onClick={addPendingScratchSkill}
                              disabled={!scratchPendingSkill || scratchSkills.length >= 10}
                              sx={{
                                minHeight: { xs: 44, md: 56 },
                                height: { xs: 44, md: 56 },
                                width: { xs: "100%", md: "auto" },
                                px: 2.25,
                                borderRadius: "10px",
                                textTransform: "none",
                                fontWeight: 600,
                                fontSize: "0.875rem",
                                borderColor: "rgba(220,212,202,0.6)",
                                color: SHELL_MUTED,
                                "&:hover": {
                                  borderColor: SHELL_INK,
                                  color: SHELL_INK,
                                  bgcolor: "rgba(0,0,0,0.02)",
                                },
                                "&.Mui-disabled": {
                                  borderColor: "rgba(220,212,202,0.45)",
                                  color: SHELL_MUTED,
                                },
                              }}
                            >
                              Add skill
                            </Button>
                          </Box>
                        </Stack>
                      </Grid>
                    </Grid>

                    {scratchSkills.length > 0 ? (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75, mt: 2 }}>
                        {scratchSkills.map((sk) => {
                          const mid = sk.level === "Intermediate";
                          const high = sk.level === "Advanced";
                          return (
                            <Chip
                              key={sk.name}
                              label={
                                <Box component="span" sx={{ display: "inline-flex", alignItems: "center", gap: 0.5 }}>
                                  {sk.name}
                                  <Box
                                    component="span"
                                    sx={{
                                      fontSize: "0.625rem",
                                      fontWeight: 700,
                                      color: high ? SHELL_PRIMARY : mid ? "#2563eb" : SHELL_MUTED,
                                      bgcolor: high ? "rgba(248,114,58,0.1)" : mid ? "rgba(37,99,235,0.08)" : "rgba(107,99,92,0.08)",
                                      px: 0.65,
                                      py: 0.1,
                                      borderRadius: "4px",
                                      lineHeight: 1.4,
                                    }}
                                  >
                                    {sk.level === "Beginner" ? "Basic" : sk.level}
                                  </Box>
                                </Box>
                              }
                              size="small"
                              onDelete={() => setScratchSkills((prev) => prev.filter((s) => s.name !== sk.name))}
                              sx={{
                                borderRadius: "8px",
                                fontWeight: 600,
                                fontSize: "0.8125rem",
                                bgcolor: "#fff",
                                border: "1px solid rgba(220,212,202,0.5)",
                                color: SHELL_INK,
                                "& .MuiChip-deleteIcon": { color: SHELL_MUTED, fontSize: 16, "&:hover": { color: SHELL_INK } },
                              }}
                            />
                          );
                        })}
                      </Box>
                    ) : null}
                    {scratchSkills.length >= 10 ? (
                      <Typography sx={{ color: SHELL_MUTED, fontSize: "0.75rem", mt: 1, fontWeight: 500 }}>
                        Maximum of 10 skills reached.
                      </Typography>
                    ) : null}
                  </Box>

                  {/* ── Education ── */}
                  <Box sx={scratchGroupedPanelSx}>
                    <Typography component="h3" sx={scratchGroupedMicroHeadingSx}>
                      Minimum education
                    </Typography>
                    <Grid container spacing={{ xs: 2, md: 2.5 }} sx={{ width: "100%" }}>
                      <Grid size={{ xs: 12, md: 4 }} sx={{ minWidth: 0 }}>
                        <FormControl fullWidth sx={positionSelectFieldSx}>
                          <InputLabel id="scratch-education-label">Select level</InputLabel>
                          <Select
                            labelId="scratch-education-label"
                            label="Select level"
                            value={minEducation}
                            onChange={(e) => setMinEducation(e.target.value)}
                            MenuProps={POSITION_SELECT_MENU_PROPS}
                          >
                            {EDUCATION_OPTIONS.map((opt) => (
                              <MenuItem key={opt} value={opt}>
                                {opt}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Box>
                </Stack>
              </Box>
            </AccordionDetails>
          </Accordion>

          {/* Offer — what you are providing */}
          <Accordion
            expanded={scratchExpanded.offer}
            onChange={(_, isExpanded) =>
              setScratchExpanded((prev) => ({ ...prev, offer: isExpanded }))
            }
            sx={scratchAccordionSx}
            slotProps={scratchAccordionSlotProps}
            disableGutters
          >
            <AccordionSummary
              expandIcon={<ExpandMoreRoundedIcon sx={{ color: SHELL_MUTED }} />}
              sx={scratchAccordionSummarySx}
              aria-controls="scratch-offer-content"
              id="scratch-offer-header"
            >
              <ScratchAccordionHeading
                icon={PaymentsOutlinedIcon}
                label="Offer"
                meta="Salary, location, employment type, work mode"
              />
            </AccordionSummary>
            <AccordionDetails sx={scratchAccordionDetailsSx}>
              <Box sx={{ width: "100%", maxWidth: "100%", minWidth: 0 }}>
                <Stack spacing={{ xs: 2.25, sm: 2.75 }}>
                  <Box sx={scratchGroupedPanelSx}>
                    <Typography component="h3" sx={scratchGroupedMicroHeadingSx}>
                      Compensation
                      <Box
                        component="span"
                        sx={{
                          display: "inline",
                          ml: 1.25,
                          fontSize: "0.65rem",
                          fontWeight: 600,
                          letterSpacing: "0.04em",
                          color: SHELL_MUTED,
                          textTransform: "none",
                        }}
                      >
                        · Yearly
                      </Box>
                    </Typography>
                    <Grid container spacing={{ xs: 2, md: 2.5 }} sx={{ width: "100%" }}>
                      <Grid size={{ xs: 12, sm: 2, md: 2 }} sx={{ minWidth: 0 }}>
                        <FormControl
                          fullWidth
                          size="small"
                          sx={{
                            "& .MuiInputLabel-root": {
                              fontSize: "0.75rem",
                              fontWeight: 600,
                              color: SHELL_MUTED,
                              letterSpacing: "0.02em",
                            },
                            "& .MuiOutlinedInput-root": {
                              borderRadius: "12px",
                              bgcolor: "#fff",
                              fontSize: "0.8125rem",
                              "& fieldset": { borderColor: "rgba(220, 212, 202, 0.65)" },
                              "&:hover fieldset": { borderColor: "rgba(220, 212, 202, 0.9)" },
                            },
                            "& .MuiSelect-select": { py: 1.1, color: SHELL_MUTED, fontWeight: 600 },
                          }}
                        >
                          <InputLabel id="salary-currency-label">Currency</InputLabel>
                          <Select
                            labelId="salary-currency-label"
                            label="Currency"
                            value={salaryCurrency}
                            onChange={(e) => setSalaryCurrency(e.target.value)}
                            MenuProps={{ PaperProps: { sx: { borderRadius: "12px" } } }}
                          >
                            {SALARY_CURRENCY_OPTIONS.map((opt) => (
                              <MenuItem key={opt.code} value={opt.code} sx={{ fontSize: "0.8125rem" }}>
                                {opt.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid size={{ xs: 12, sm: 5, md: 5 }} sx={{ minWidth: 0 }}>
                        <TextField
                          label="Minimum"
                          placeholder="120k"
                          value={salaryMin}
                          onChange={(e) => setSalaryMin(e.target.value)}
                          error={scratchTouched && !salaryMin.trim()}
                          helperText={scratchTouched && !salaryMin.trim() ? "Required." : ""}
                          fullWidth
                          sx={fieldSx}
                          inputProps={{ "aria-label": "Minimum salary" }}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 5, md: 5 }} sx={{ minWidth: 0 }}>
                        <TextField
                          label="Maximum"
                          placeholder="160k"
                          value={salaryMax}
                          onChange={(e) => setSalaryMax(e.target.value)}
                          error={scratchTouched && !salaryMax.trim()}
                          helperText={scratchTouched && !salaryMax.trim() ? "Required." : ""}
                          fullWidth
                          sx={fieldSx}
                          inputProps={{ "aria-label": "Maximum salary" }}
                        />
                      </Grid>
                    </Grid>
                  </Box>

                  <Box sx={scratchGroupedPanelSx}>
                    <Typography component="h3" sx={scratchGroupedMicroHeadingSx}>
                      Location and employment
                    </Typography>
                    <Grid container spacing={{ xs: 2, md: 2.5 }} sx={{ width: "100%" }}>
                      <Grid size={{ xs: 12, md: 6 }} sx={{ minWidth: 0 }}>
                        <FormControl fullWidth sx={fieldSx}>
                          <InputLabel id="emp-type-label">Employment type</InputLabel>
                          <Select
                            labelId="emp-type-label"
                            label="Employment type"
                            value={employmentType}
                            onChange={(e) => setEmploymentType(e.target.value)}
                          >
                            {EMPLOYMENT_OPTIONS.map((o) => (
                              <MenuItem key={o} value={o}>
                                {o}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid size={{ xs: 12, md: 6 }} sx={{ minWidth: 0 }}>
                        <TextField
                          label="Location"
                          placeholder="San Francisco · US, or Remote · EU"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          error={scratchTouched && !location.trim()}
                          helperText={scratchTouched && !location.trim() ? "Required." : ""}
                          fullWidth
                          sx={fieldSx}
                        />
                      </Grid>
                    </Grid>
                  </Box>

                  <Box sx={scratchGroupedPanelSx}>
                    <Typography component="h3" sx={scratchGroupedMicroHeadingSx}>
                      Work mode
                    </Typography>
                    <ToggleButtonGroup
                      exclusive
                      value={workMode}
                      onChange={(_, v) => v != null && setWorkMode(v)}
                      aria-label="Work mode"
                      sx={{ ...toggleSx, width: "fit-content", maxWidth: "100%" }}
                    >
                      <ToggleButton value="remote">Remote</ToggleButton>
                      <ToggleButton value="hybrid">Hybrid</ToggleButton>
                      <ToggleButton value="office">In-office</ToggleButton>
                    </ToggleButtonGroup>
                  </Box>
                </Stack>
              </Box>
            </AccordionDetails>
          </Accordion>
        </Stack>

        <Stack
          direction={{ xs: "column-reverse", sm: "row" }}
          spacing={1.25}
          alignItems={{ xs: "stretch", sm: "center" }}
          justifyContent="flex-end"
          sx={{ width: "100%", mt: 3, pt: 1 }}
        >
          <Button
            variant="outlined"
            startIcon={<SaveOutlinedIcon sx={{ fontSize: "18px !important" }} />}
            onClick={handleSaveScratchDraft}
            sx={{
              minHeight: 44,
              height: 44,
              px: 2.25,
              py: 0,
              borderRadius: "10px",
              textTransform: "none",
              fontWeight: 600,
              fontSize: "0.875rem",
              borderColor: "rgba(220,212,202,0.6)",
              color: SHELL_MUTED,
              "&:hover": { borderColor: SHELL_INK, color: SHELL_INK, bgcolor: "rgba(0,0,0,0.02)" },
            }}
          >
            Save as draft
          </Button>
          <Button
            variant="contained"
            onClick={handleSaveScratch}
            sx={{
              minWidth: { sm: 150 },
              minHeight: 44,
              height: 44,
              px: 2.75,
              py: 0,
              borderRadius: "10px",
              textTransform: "none",
              fontWeight: 700,
              fontSize: "0.875rem",
              boxShadow: "0 8px 20px rgba(248, 114, 58, 0.22)",
            }}
          >
            Continue
          </Button>
        </Stack>
      </Box>
    );
  } else if (phase === "analyzing") {
    const overallPct = Math.min(100, ((analysisStep + 1) / ANALYSIS_STEP_COUNT) * 100);
    const currentPhase = ANALYSIS_PHASE_LABELS[analysisStep];

    body = (
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          alignSelf: "stretch",
          width: { xs: "calc(100% + 28px)", md: "calc(100% + 40px)" },
          mx: { xs: -1.75, md: -2.5 },
          mt: { xs: -2.5, md: -3 },
          mb: { xs: -3.25, md: -3.5 },
          minHeight: { xs: "calc(100dvh - 168px)", md: "calc(100dvh - 148px)" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          px: { xs: 2, md: 3 },
          py: { xs: 2, md: 2.5 },
          bgcolor: "#fdfcfa",
          "@keyframes analyzeFadeUp": {
            from: { opacity: 0, transform: "translateY(16px)" },
            to: { opacity: 1, transform: "translateY(0)" },
          },
          "@keyframes analyzeIconPulse": {
            "0%, 100%": { transform: "scale(1)", boxShadow: "0 0 0 0 rgba(248,114,58,0.14)" },
            "50%": { transform: "scale(1.06)", boxShadow: "0 0 0 20px rgba(248,114,58,0)" },
          },
          "@keyframes analyzeRingSpin": {
            from: { transform: "rotate(0deg)" },
            to: { transform: "rotate(360deg)" },
          },
          "@keyframes analyzeRingSpinReverse": {
            from: { transform: "rotate(360deg)" },
            to: { transform: "rotate(0deg)" },
          },
          "@keyframes analyzeGlow": {
            "0%, 100%": { opacity: 0.5, transform: "scale(1)" },
            "50%": { opacity: 0.9, transform: "scale(1.06)" },
          },
          "@keyframes analyzePhaseIn": {
            from: { opacity: 0, transform: "translateY(8px)" },
            to: { opacity: 1, transform: "translateY(0)" },
          },
          "@keyframes analyzeBarPulse": {
            "0%, 100%": { opacity: 1 },
            "50%": { opacity: 0.55 },
          },
        }}
      >
        {/* Single soft blob for ambient warmth */}
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            zIndex: 0,
            top: "50%",
            left: "50%",
            width: { xs: 320, md: 440 },
            height: { xs: 320, md: 440 },
            transform: "translate(-50%, -50%)",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(248,114,58,0.08) 0%, rgba(248,155,105,0.03) 50%, transparent 72%)",
            filter: "blur(60px)",
            pointerEvents: "none",
          }}
        />

        {/* Centered content */}
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            maxWidth: 400,
            mx: "auto",
            animation: "analyzeFadeUp 0.5s ease-out both",
          }}
        >
          {/* Icon stage: outer rotating rings + crossfading icons */}
          <Box
            sx={{
              width: 130,
              height: 130,
              mb: 4,
              position: "relative",
              display: "grid",
              placeItems: "center",
            }}
          >
            {/* Soft glow behind rings */}
            <Box
              aria-hidden
              sx={{
                position: "absolute",
                inset: 8,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(248,114,58,0.14) 0%, rgba(248,114,58,0.04) 55%, transparent 70%)",
                animation: "analyzeGlow 3.2s ease-in-out infinite",
                pointerEvents: "none",
                "@media (prefers-reduced-motion: reduce)": { animation: "none" },
              }}
            />
            {/* Outer dashed ring (clearly visible, full 130) */}
            <Box
              aria-hidden
              sx={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                border: "2px dashed rgba(248,114,58,0.22)",
                animation: "analyzeRingSpin 14s linear infinite",
                pointerEvents: "none",
                "@media (prefers-reduced-motion: reduce)": { animation: "none" },
              }}
            />
            {/* Inner dotted ring, counter-rotates for fluid depth */}
            <Box
              aria-hidden
              sx={{
                position: "absolute",
                inset: 10,
                borderRadius: "50%",
                border: "1.5px dotted rgba(248,114,58,0.16)",
                animation: "analyzeRingSpinReverse 22s linear infinite",
                pointerEvents: "none",
                "@media (prefers-reduced-motion: reduce)": { animation: "none" },
              }}
            />
            <Box
              sx={{
                width: 76,
                height: 76,
                borderRadius: "20px",
                bgcolor: "rgba(248,114,58,0.08)",
                border: "1.5px solid rgba(248,114,58,0.2)",
                position: "relative",
                display: "grid",
                placeItems: "center",
                animation: "analyzeIconPulse 2.8s ease-in-out infinite",
                "@media (prefers-reduced-motion: reduce)": { animation: "none" },
              }}
            >
              {ANALYSIS_PHASE_LABELS.map((phase, idx) => {
                const StepIcon = phase.icon;
                const active = idx === analysisStep;
                return (
                  <Box
                    key={phase.verb}
                    aria-hidden={!active}
                    sx={{
                      position: "absolute",
                      inset: 0,
                      display: "grid",
                      placeItems: "center",
                      opacity: active ? 1 : 0,
                      transform: active ? "scale(1) rotate(0deg)" : "scale(0.82) rotate(-6deg)",
                      transition:
                        "opacity 0.55s cubic-bezier(0.22, 1, 0.36, 1), transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)",
                      pointerEvents: "none",
                      "@media (prefers-reduced-motion: reduce)": {
                        transition: "opacity 0.2s ease",
                        transform: active ? "scale(1)" : "scale(1)",
                      },
                    }}
                  >
                    <StepIcon
                      sx={{
                        color: SHELL_PRIMARY,
                        fontSize: 32,
                        filter: active ? "drop-shadow(0 2px 8px rgba(248,114,58,0.2))" : "none",
                        transition: "filter 0.45s ease",
                      }}
                    />
                  </Box>
                );
              })}
            </Box>
          </Box>

          {/* Headline */}
          <Typography
            sx={{
              fontSize: { xs: "1.25rem", md: "1.4rem" },
              fontWeight: 700,
              letterSpacing: "-0.025em",
              color: SHELL_INK,
              lineHeight: 1.3,
              mb: 1,
            }}
          >
            {jobTitle ? `Building the ${jobTitle} profile` : "Crafting your candidate profile"}
          </Typography>

          {/* Current phase label */}
          <Typography
            key={analysisStep}
            sx={{
              fontSize: "0.9375rem",
              fontWeight: 500,
              color: SHELL_MUTED,
              mb: { xs: 5, md: 6 },
              animation: "analyzePhaseIn 0.35s ease-out both",
              "@media (prefers-reduced-motion: reduce)": { animation: "none" },
            }}
          >
            {currentPhase?.verb}{" "}
            <Box component="span" sx={{ color: SHELL_INK, fontWeight: 600 }}>
              {currentPhase?.noun}
            </Box>
            ...
          </Typography>

          {/* Minimal progress bar */}
          <Box
            sx={{
              width: "100%",
              maxWidth: 280,
              mx: "auto",
            }}
          >
            <Box
              sx={{
                height: 3,
                borderRadius: 1.5,
                bgcolor: "rgba(220,212,202,0.3)",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  height: "100%",
                  borderRadius: 1.5,
                  bgcolor: SHELL_PRIMARY,
                  width: `${overallPct}%`,
                  transition: "width 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                  animation: "analyzeBarPulse 1.5s ease-in-out infinite",
                  "@media (prefers-reduced-motion: reduce)": { animation: "none" },
                }}
              />
            </Box>
            <Typography
              sx={{
                mt: 1.5,
                fontSize: "0.75rem",
                fontWeight: 600,
                color: SHELL_MUTED,
                letterSpacing: "0.04em",
              }}
            >
              {Math.round(overallPct)}%
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  } else if (phase === "profile") {
    const skills = getSkillsForRole(jobTitle, department);
    const prof = buildProfileData(jobTitle, department, domain, experienceRange, location, workMode, employmentType);
    const initials = (jobTitle || "IC")
      .split(/\s+/)
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
    const salaryCurrencyLabel =
      SALARY_CURRENCY_OPTIONS.find((o) => o.code === salaryCurrency)?.label ?? salaryCurrency;
    const workModeLabel =
      workMode === "remote" ? "Remote" : workMode === "hybrid" ? "Hybrid" : "In-office";
    const aiConfidence = 94;
    const compensationShort =
      salaryMin && salaryMax
        ? `${salaryMin}–${salaryMax} ${salaryCurrencyLabel}`
        : null;

    const skillTierFromLevel = (level) => {
      if (level >= 85) return { label: "Expert", filled: 3 };
      if (level >= 65) return { label: "Strong", filled: 2 };
      return { label: "Good", filled: 1 };
    };

    const applyOverride = (s) => ({
      ...s,
      level: profileLevelOverrides[s._k] !== undefined ? profileLevelOverrides[s._k] : s.level,
    });
    const mandatorySkillList = [
      ...skills.mandatory.map((s) => ({ ...s, _k: `mb:${s.name}` })),
      ...profileAddedMandatory.map((s) => ({ ...s, _k: `ma:${s.id}` })),
    ].map(applyOverride);
    const niceSkillList = [
      ...skills.niceToHave.map((s) => ({ ...s, _k: `nb:${s.name}` })),
      ...profileAddedNice.map((s) => ({ ...s, _k: `na:${s.id}` })),
    ].map(applyOverride);

    const markSkillInapplicable = (key) => {
      setProfileInapplicable((prev) => ({
        ...prev,
        [key]: {
          at: new Date().toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" }),
          by: PROFILE_SKILL_MARKED_BY,
        },
      }));
    };

    const restoreProfileSkill = (key) => {
      setProfileInapplicable((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    };

    const changeSkillLevel = (key, newLevel) => {
      setProfileLevelOverrides((prev) => ({ ...prev, [key]: newLevel }));
    };

    const addProfileMandatorySkill = () => {
      const t = profileNewMandatoryInput.trim();
      if (!t) return;
      setProfileAddedMandatory((prev) => [
        ...prev,
        { id: newProfileSkillId(), name: t, level: profileNewMandatoryLevel },
      ]);
      setProfileNewMandatoryInput("");
      setProfileNewMandatoryLevel(PROFILE_NEW_SKILL_LEVEL_DEFAULT);
      setProfileMandatoryAddExpanded(false);
    };

    const addProfileNiceSkill = () => {
      const t = profileNewNiceInput.trim();
      if (!t) return;
      setProfileAddedNice((prev) => [...prev, { id: newProfileSkillId(), name: t, level: profileNewNiceLevel }]);
      setProfileNewNiceInput("");
      setProfileNewNiceLevel(PROFILE_NEW_SKILL_LEVEL_DEFAULT);
      setProfileNiceAddExpanded(false);
    };

    const cancelProfileMandatoryAdd = () => {
      setProfileMandatoryAddExpanded(false);
      setProfileNewMandatoryInput("");
      setProfileNewMandatoryLevel(PROFILE_NEW_SKILL_LEVEL_DEFAULT);
    };

    const cancelProfileNiceAdd = () => {
      setProfileNiceAddExpanded(false);
      setProfileNewNiceInput("");
      setProfileNewNiceLevel(PROFILE_NEW_SKILL_LEVEL_DEFAULT);
    };

    const profileInsights = getProfileInsights(jobTitle, department, domain);

    const PREDICTED_METRICS = [
      { icon: SpeedRoundedIcon, label: "Time to Hire", value: "~18 days", note: "42% faster than avg.", color: "#16a34a" },
      { icon: VerifiedRoundedIcon, label: "Quality of Hire", value: "High", note: "Based on skill depth match", color: SHELL_PRIMARY },
      { icon: HandshakeOutlinedIcon, label: "Alignment Score", value: `${aiConfidence}%`, note: "Recruiter-HM agreement", color: "#2563eb" },
      { icon: TrendingUpRoundedIcon, label: "Interview Efficiency", value: "3:1", note: "Predicted interview-to-offer", color: "#7c3aed" },
    ];

    body = (
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          mx: { xs: -1.75, md: -2.5 },
          mt: { xs: -2, md: -2.5 },
          mb: { xs: -2, md: -2.5 },
          width: { xs: "calc(100% + 28px)", md: "calc(100% + 40px)" },
          bgcolor: "#faf9f8",
          "@keyframes profFadeUp": {
            from: { opacity: 0, transform: "translateY(14px)" },
            to: { opacity: 1, transform: "translateY(0)" },
          },
          "@keyframes profHeroIn": {
            from: { opacity: 0, transform: "translateY(22px) scale(0.985)" },
            to: { opacity: 1, transform: "translateY(0) scale(1)" },
          },
          "@keyframes profHeroLine": {
            from: { transform: "scaleX(0)" },
            to: { transform: "scaleX(1)" },
          },
          "@keyframes profMedallionIn": {
            "0%": { opacity: 0, transform: "scale(0.88)" },
            "55%": { transform: "scale(1.04)" },
            "100%": { opacity: 1, transform: "scale(1)" },
          },
          "@keyframes profRingPulse": {
            "0%, 100%": { transform: "scale(1)", opacity: 0.35 },
            "50%": { transform: "scale(1.12)", opacity: 0.12 },
          },
          "@keyframes profMeshDriftA": {
            "0%, 100%": { transform: "translate(-6%, -3%) scale(1)" },
            "50%": { transform: "translate(5%, 9%) scale(1.07)" },
          },
          "@keyframes profMeshDriftB": {
            "0%, 100%": { transform: "translate(4%, 6%) scale(1.02)" },
            "50%": { transform: "translate(-7%, -4%) scale(1.09)" },
          },
          "@keyframes profAuroraRotate": {
            from: { transform: "rotate(0deg)" },
            to: { transform: "rotate(360deg)" },
          },
          "@keyframes profGridDrift": {
            from: { transform: "translateY(0)" },
            to: { transform: "translateY(24px)" },
          },
        }}
      >
        {/* ── Benchmark screen: ambient background (unique to this phase) ── */}
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            pointerEvents: "none",
            background: "linear-gradient(180deg, #ffffff 0%, rgba(255,252,250,0.97) 22%, rgba(250,246,242,0.92) 55%, rgba(245,238,232,0.88) 100%)",
          }}
        />
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            zIndex: 0,
            left: "50%",
            top: "-42%",
            width: "min(140%, 920px)",
            height: "72%",
            transform: "translateX(-50%)",
            pointerEvents: "none",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              opacity: 0.9,
              background: `conic-gradient(from 210deg at 50% 50%, rgba(248,114,58,0.14) 0deg, rgba(255,190,150,0.1) 95deg, rgba(255,255,255,0) 200deg, rgba(248,114,58,0.06) 285deg, rgba(248,114,58,0.12) 360deg)`,
              filter: "blur(56px)",
              animation: "profAuroraRotate 48s linear infinite",
              "@media (prefers-reduced-motion: reduce)": { animation: "none" },
            }}
          />
        </Box>
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            zIndex: 0,
            bottom: "-18%",
            right: "-20%",
            width: "min(95%, 640px)",
            aspectRatio: "1.15",
            borderRadius: "50%",
            background: "radial-gradient(circle at 42% 44%, rgba(248,114,58,0.2) 0%, rgba(255,175,130,0.08) 45%, transparent 68%)",
            filter: "blur(52px)",
            pointerEvents: "none",
            willChange: "transform",
            animation: "profMeshDriftA 22s ease-in-out infinite",
            "@media (prefers-reduced-motion: reduce)": { animation: "none", willChange: "auto" },
          }}
        />
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            zIndex: 0,
            top: "8%",
            left: "-24%",
            width: "min(85%, 520px)",
            aspectRatio: "1.2",
            borderRadius: "50%",
            background: "radial-gradient(circle at 55% 50%, rgba(255,200,170,0.16) 0%, rgba(255,230,210,0.06) 48%, transparent 72%)",
            filter: "blur(60px)",
            pointerEvents: "none",
            willChange: "transform",
            animation: "profMeshDriftB 28s ease-in-out infinite",
            "@media (prefers-reduced-motion: reduce)": { animation: "none", willChange: "auto" },
          }}
        />
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            opacity: 0.45,
            pointerEvents: "none",
            backgroundImage: `linear-gradient(rgba(107,99,92,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(107,99,92,0.04) 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
            backgroundPosition: "center top",
            maskImage: "linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.12) 38%, transparent 72%)",
            WebkitMaskImage: "linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.12) 38%, transparent 72%)",
            animation: "profGridDrift 32s linear infinite",
            "@media (prefers-reduced-motion: reduce)": { animation: "none" },
          }}
        />

        {/* ====== HEADER ====== */}
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            pt: { xs: 2, md: 2.5 },
            pb: { xs: 3.5, md: 4 },
            px: { xs: 2, md: 3 },
          }}
        >
          <IconButton
            aria-label="Back to job form"
            onClick={() => setPhase("scratch")}
            size="small"
            sx={{
              color: SHELL_MUTED,
              ml: -1,
              mb: 1.25,
              opacity: 0,
              animation: "profHeroIn 0.55s cubic-bezier(0.23, 1, 0.32, 1) 0.05s forwards",
              "@media (prefers-reduced-motion: reduce)": { opacity: 1, animation: "none" },
              "&:hover": { color: SHELL_INK, bgcolor: "rgba(0,0,0,0.04)" },
            }}
          >
            <ArrowBackRoundedIcon sx={{ fontSize: 20 }} />
          </IconButton>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={{ xs: 2, sm: 2.5 }} alignItems={{ xs: "flex-start", sm: "flex-start" }}>
            <Box sx={{ position: "relative", width: 56, height: 56, flexShrink: 0, mt: { xs: 0, sm: 0.25 } }}>
              <Box
                aria-hidden
                sx={{
                  position: "absolute",
                  inset: -6,
                  borderRadius: "50%",
                  border: `2px solid ${SHELL_PRIMARY}`,
                  animation: "profRingPulse 2.8s ease-in-out 1s infinite",
                  "@media (prefers-reduced-motion: reduce)": { animation: "none", opacity: 0.22, transform: "scale(1)", inset: -4 },
                }}
              />
              <Box
                sx={{
                  position: "relative",
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  display: "grid",
                  placeItems: "center",
                  bgcolor: "#fff",
                  border: "1px solid rgba(248,114,58,0.28)",
                  boxShadow: `
                    0 0 0 1px rgba(255,255,255,0.9) inset,
                    0 12px 32px rgba(248,114,58,0.12),
                    0 4px 12px rgba(18,10,4,0.06)
                  `,
                  opacity: 0,
                  animation: "profMedallionIn 0.75s cubic-bezier(0.23, 1, 0.32, 1) 0.12s forwards",
                  "@media (prefers-reduced-motion: reduce)": { opacity: 1, animation: "none" },
                }}
              >
                <VerifiedRoundedIcon sx={{ fontSize: 30, color: SHELL_PRIMARY }} />
              </Box>
            </Box>

            <Box sx={{ minWidth: 0, flex: 1, pb: 0.15 }}>
              <Typography
                component="h1"
                sx={{
                  fontSize: { xs: "1.3rem", sm: "1.45rem", md: "1.55rem" },
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  color: SHELL_INK,
                  lineHeight: 1.25,
                  mb: 1,
                  maxWidth: 820,
                  whiteSpace: { xs: "normal", md: "nowrap" },
                  opacity: 0,
                  animation: "profHeroIn 0.75s cubic-bezier(0.23, 1, 0.32, 1) 0.18s forwards",
                  "@media (prefers-reduced-motion: reduce)": { opacity: 1, animation: "none" },
                }}
              >
                {`Before you publish, align on what \u201cgreat\u201d looks like`}
              </Typography>
              <Box
                aria-hidden
                sx={{
                  height: 3,
                  maxWidth: { xs: 200, sm: 280 },
                  borderRadius: "999px",
                  mb: 1.25,
                  background: `linear-gradient(90deg, ${SHELL_PRIMARY} 0%, rgba(248,114,58,0.35) 55%, transparent 100%)`,
                  transformOrigin: "left center",
                  transform: "scaleX(0)",
                  animation: "profHeroLine 1s cubic-bezier(0.23, 1, 0.32, 1) 0.45s forwards",
                  "@media (prefers-reduced-motion: reduce)": { transform: "scaleX(1)", animation: "none" },
                }}
              />
              <Typography
                sx={{
                  fontSize: { xs: "0.8125rem", md: "0.875rem" },
                  color: SHELL_MUTED,
                  lineHeight: 1.6,
                  fontWeight: 400,
                  maxWidth: { xs: "100%", sm: 560 },
                  opacity: 0,
                  animation: "profHeroIn 0.8s cubic-bezier(0.23, 1, 0.32, 1) 0.32s forwards",
                  "@media (prefers-reduced-motion: reduce)": { opacity: 1, animation: "none" },
                }}
              >
                This benchmark was generated from what you entered. Review it, then share it with your hiring manager so you both agree on the bar before anyone is sourced.
              </Typography>
            </Box>
          </Stack>
        </Box>

        {/* ====== CONTENT AREA ====== */}
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            px: { xs: 2, md: 3 },
            pt: { xs: 2.5, md: 3 },
            pb: { xs: "calc(20px + env(safe-area-inset-bottom, 0px))", md: "calc(24px + env(safe-area-inset-bottom, 0px))" },
          }}
        >
          {/* ── Beyond-your-JD insights ── */}
          <Box sx={{ mb: { xs: 3.5, md: 4 }, animation: "profFadeUp 0.4s ease-out both" }}>
            <Stack direction="row" spacing={1.25} alignItems="center" sx={{ mb: { xs: 2.25, md: 2.5 } }}>
              <AutoFixHighOutlinedIcon sx={{ fontSize: 20, color: SHELL_PRIMARY, flexShrink: 0 }} />
              <Typography
                sx={{
                  fontSize: { xs: "0.8125rem", sm: "0.875rem" },
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  color: SHELL_INK,
                  lineHeight: 1.25,
                }}
              >
                {String(jobTitle ?? "").trim() ? (
                  <>
                    What we identified beyond your JD for{" "}
                    <Box component="span" sx={{ fontStyle: "italic" }}>
                      {String(jobTitle).trim()}
                    </Box>
                  </>
                ) : (
                  "What we identified beyond your JD"
                )}
              </Typography>
            </Stack>
            <Grid container spacing={{ xs: 2, md: 2.5 }}>
              {profileInsights.map((ins, idx) => {
                const theme = PROFILE_INSIGHT_ICON_THEMES[idx % PROFILE_INSIGHT_ICON_THEMES.length];
                return (
                <Grid key={ins.signal} size={{ xs: 12, sm: 4 }}>
                  <Box
                    sx={{
                      borderRadius: "16px",
                      border: "1px solid rgba(220,212,202,0.45)",
                      bgcolor: "#fff",
                      p: { xs: 2.25, md: 2.5 },
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      animation: `profFadeUp 0.35s ease-out ${0.06 * (idx + 1)}s both`,
                    }}
                  >
                    <Box
                      sx={{
                        width: 42,
                        height: 42,
                        borderRadius: "12px",
                        background: theme.wrapBg,
                        border: theme.wrapBorder,
                        boxShadow: theme.shadow,
                        display: "grid",
                        placeItems: "center",
                        mb: { xs: 1.5, md: 1.75 },
                      }}
                    >
                      <ins.icon sx={{ fontSize: 22, color: theme.iconColor }} />
                    </Box>
                    <Typography sx={{ fontSize: "0.8125rem", fontWeight: 700, color: SHELL_INK, mb: 0.65, letterSpacing: "-0.01em", lineHeight: 1.35 }}>
                      {ins.signal}
                    </Typography>
                    <Typography sx={{ fontSize: "0.75rem", fontWeight: 400, color: SHELL_MUTED, lineHeight: 1.6 }}>
                      {ins.detail}
                    </Typography>
                  </Box>
                </Grid>
                );
              })}
            </Grid>
          </Box>

          {/* ── Unified profile card — identity + competencies + alignment CTA ── */}
          <Box
            sx={{
              borderRadius: "16px",
              border: "1px solid rgba(220,212,202,0.45)",
              bgcolor: "#fff",
              p: { xs: 2, md: 2.5 },
              mb: 2.5,
              boxShadow: "0 1px 0 #fff inset, 0 4px 20px rgba(18,10,4,0.025)",
              animation: "profFadeUp 0.45s ease-out 0.08s both",
              overflow: "visible",
            }}
          >
            {/* ── Identity row ── */}
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.75} alignItems={{ xs: "flex-start", sm: "center" }} sx={{ mb: 2.25 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  flexShrink: 0,
                  display: "grid",
                  placeItems: "center",
                  bgcolor: "rgba(37, 99, 235, 0.08)",
                  border: "1px solid rgba(37, 99, 235, 0.18)",
                }}
              >
                <PersonSearchOutlinedIcon sx={{ fontSize: 22, color: "#2563eb" }} />
              </Box>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  sx={{
                    fontSize: { xs: "0.9375rem", md: "1rem" },
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                    color: SHELL_INK,
                    lineHeight: 1.25,
                    mb: 0.2,
                  }}
                >
                  Ideal {jobTitle || "Candidate"}
                </Typography>
                <Typography sx={{ fontSize: "0.78rem", fontWeight: 450, color: SHELL_MUTED, lineHeight: 1.4 }}>
                  {[department, domain, experienceRange].filter(Boolean).join(" \u00b7 ")}
                </Typography>
              </Box>
              <Stack direction="row" spacing={2.5} sx={{ flexShrink: 0, pt: { xs: 0.5, sm: 0 } }}>
                {[
                  { icon: LanguageRoundedIcon, val: location?.trim() || "Not set" },
                  { icon: PaymentsOutlinedIcon, val: compensationShort || "Not specified" },
                  { icon: WorkOutlineRoundedIcon, val: [employmentType, workModeLabel].filter(Boolean).join(" \u00b7 ") || "Not set" },
                ].map((f) => (
                  <Stack key={f.val} direction="row" spacing={0.5} alignItems="center">
                    <f.icon sx={{ fontSize: 14, color: SHELL_MUTED, opacity: 0.7 }} />
                    <Typography sx={{ fontSize: "0.75rem", fontWeight: 550, color: SHELL_INK, lineHeight: 1.25 }}>
                      {f.val}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Stack>

            <Box sx={{ height: "1px", bgcolor: "rgba(220,212,202,0.38)", mb: 2.25 }} />
            <Grid container spacing={2.5} sx={{ overflow: "visible" }}>
              <Grid size={{ xs: 12, md: 6 }} sx={{ overflow: "visible", minWidth: 0 }}>
                <Stack
                  direction="row"
                  role="group"
                  aria-label="Required competencies for this role"
                  sx={profileSkillsMustHeaderRowSx}
                >
                  <VerifiedRoundedIcon sx={{ fontSize: 14, color: SHELL_PRIMARY, flexShrink: 0 }} aria-hidden />
                  <Typography sx={profileSkillsColumnHeaderLabelSx}>Must-have</Typography>
                </Stack>
                <Box sx={{ borderRadius: "10px", border: "1px solid rgba(220,212,202,0.35)", overflow: "hidden" }}>
                  {mandatorySkillList.map((s, idx) => (
                    <Box key={s._k} sx={{ borderTop: idx > 0 ? "1px solid rgba(220,212,202,0.25)" : "none" }}>
                      <ProfileSkillCard
                        name={s.name}
                        level={s.level}
                        variant="mandatory"
                        inapplicableMeta={profileInapplicable[s._k]}
                        onMarkInapplicable={() => markSkillInapplicable(s._k)}
                        onRestore={() => restoreProfileSkill(s._k)}
                        onChangeLevel={(newLvl) => changeSkillLevel(s._k, newLvl)}
                        skillTierFromLevel={skillTierFromLevel}
                      />
                    </Box>
                  ))}
                  <Box
                    sx={{
                      borderTop: "1px solid rgba(220,212,202,0.35)",
                      bgcolor: "rgba(248,246,243,0.55)",
                      overflow: "visible",
                    }}
                  >
                    <Collapse
                      in={profileMandatoryAddExpanded}
                      collapsedSize={36}
                      timeout={280}
                      onEntered={() => {
                        profileMandatorySkillInputRef.current?.focus();
                      }}
                    >
                      {profileMandatoryAddExpanded ? (
                        <Stack direction="row" spacing={0.75} alignItems="center" sx={{ flexWrap: "wrap", p: 0.75, bgcolor: "#fff", gap: 0.75 }}>
                          <TextField
                            inputRef={profileMandatorySkillInputRef}
                            size="small"
                            placeholder="Competency name"
                            value={profileNewMandatoryInput}
                            onChange={(e) => setProfileNewMandatoryInput(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                addProfileMandatorySkill();
                              }
                              if (e.key === "Escape") {
                                e.preventDefault();
                                cancelProfileMandatoryAdd();
                              }
                            }}
                            sx={{
                              flex: "1 1 140px",
                              minWidth: 0,
                              "& .MuiInputBase-input": { fontSize: "0.75rem", py: 0.65 },
                              "& .MuiInputBase-root": { minHeight: 34 },
                            }}
                          />
                          <FormControl
                            size="small"
                            sx={{
                              flex: "0 0 auto",
                              minWidth: 116,
                              maxWidth: 140,
                              "& .MuiInputBase-root": {
                                minHeight: 34,
                                height: 34,
                                boxSizing: "border-box",
                              },
                            }}
                          >
                            <Select
                              value={profileNewMandatoryLevel}
                              onChange={(e) => setProfileNewMandatoryLevel(Number(e.target.value))}
                              aria-label="Expertise level for new must-have skill"
                              IconComponent={KeyboardArrowDownRoundedIcon}
                              MenuProps={EXPERTISE_SELECT_MENU_PROPS}
                              sx={{
                                fontSize: "0.75rem",
                                bgcolor: "#fff",
                                borderRadius: "8px",
                                "& .MuiSelect-select": {
                                  py: 0,
                                  minHeight: 0,
                                  display: "flex",
                                  alignItems: "center",
                                },
                                "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(220,212,202,0.55)" },
                              }}
                            >
                              {PROFILE_NEW_SKILL_LEVEL_OPTIONS.map((o) => (
                                <MenuItem key={o.level} value={o.level} sx={{ fontSize: "0.8125rem", minHeight: 40, py: 1, px: 1.75 }}>
                                  {o.label}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                          <Button
                            type="button"
                            variant="outlined"
                            size="small"
                            onClick={addProfileMandatorySkill}
                            disabled={!profileNewMandatoryInput.trim()}
                            sx={{ textTransform: "none", fontWeight: 600, flexShrink: 0, px: 1.25, py: 0.35, minHeight: 34, fontSize: "0.75rem" }}
                          >
                            Add
                          </Button>
                          <IconButton
                            type="button"
                            aria-label="Close add must-have skill"
                            onClick={cancelProfileMandatoryAdd}
                            size="small"
                            sx={{
                              color: SHELL_MUTED,
                              flexShrink: 0,
                              width: 30,
                              height: 30,
                              "&:hover": { bgcolor: "rgba(0,0,0,0.05)", color: SHELL_INK },
                            }}
                          >
                            <CloseRoundedIcon sx={{ fontSize: 18 }} />
                          </IconButton>
                        </Stack>
                      ) : (
                        <Button
                          type="button"
                          fullWidth
                          disableElevation
                          variant="text"
                          aria-label="Add a must-have competency and set its expertise level"
                          startIcon={<AddRoundedIcon sx={{ fontSize: "16px !important", color: SHELL_MUTED, opacity: 0.85 }} />}
                          onClick={() => setProfileMandatoryAddExpanded(true)}
                          sx={{
                            justifyContent: "flex-start",
                            textAlign: "left",
                            textTransform: "none",
                            fontWeight: 500,
                            fontSize: "0.6875rem",
                            color: SHELL_MUTED,
                            py: 0.65,
                            px: 1,
                            minHeight: 36,
                            borderRadius: 0,
                            bgcolor: "#fff",
                            "&:hover": { bgcolor: "rgba(0,0,0,0.04)", color: SHELL_INK },
                          }}
                        >
                          <Box component="span" sx={{ display: "block", textAlign: "left" }}>
                            <Typography component="span" sx={{ display: "block", fontSize: "0.6875rem", fontWeight: 600, color: SHELL_MUTED, lineHeight: 1.3 }}>
                              Add competency
                            </Typography>
                          </Box>
                        </Button>
                      )}
                    </Collapse>
                  </Box>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }} sx={{ overflow: "visible", minWidth: 0 }}>
                <Stack
                  direction="row"
                  role="group"
                  aria-label="Optional competencies — bonus signals, not required"
                  sx={profileSkillsNiceHeaderRowSx}
                >
                  <EmojiObjectsIcon sx={{ fontSize: 14, color: "rgba(2, 136, 209, 0.88)", flexShrink: 0 }} aria-hidden />
                  <Typography sx={profileSkillsColumnHeaderLabelSx}>Nice-to-have</Typography>
                </Stack>
                <Box sx={{ borderRadius: "10px", border: "1px solid rgba(220,212,202,0.35)", overflow: "hidden" }}>
                  {niceSkillList.map((s, idx) => (
                    <Box key={s._k} sx={{ borderTop: idx > 0 ? "1px solid rgba(220,212,202,0.25)" : "none" }}>
                      <ProfileSkillCard
                        name={s.name}
                        level={s.level}
                        variant="nice"
                        inapplicableMeta={profileInapplicable[s._k]}
                        onMarkInapplicable={() => markSkillInapplicable(s._k)}
                        onRestore={() => restoreProfileSkill(s._k)}
                        onChangeLevel={(newLvl) => changeSkillLevel(s._k, newLvl)}
                        skillTierFromLevel={skillTierFromLevel}
                      />
                    </Box>
                  ))}
                  <Box
                    sx={{
                      borderTop: "1px solid rgba(220,212,202,0.35)",
                      bgcolor: "rgba(248,246,243,0.55)",
                      overflow: "visible",
                    }}
                  >
                    <Collapse
                      in={profileNiceAddExpanded}
                      collapsedSize={36}
                      timeout={280}
                      onEntered={() => {
                        profileNiceSkillInputRef.current?.focus();
                      }}
                    >
                      {profileNiceAddExpanded ? (
                        <Stack direction="row" spacing={0.75} alignItems="center" sx={{ flexWrap: "wrap", p: 0.75, bgcolor: "#fff", gap: 0.75 }}>
                          <TextField
                            inputRef={profileNiceSkillInputRef}
                            size="small"
                            placeholder="Competency name"
                            value={profileNewNiceInput}
                            onChange={(e) => setProfileNewNiceInput(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                addProfileNiceSkill();
                              }
                              if (e.key === "Escape") {
                                e.preventDefault();
                                cancelProfileNiceAdd();
                              }
                            }}
                            sx={{
                              flex: "1 1 140px",
                              minWidth: 0,
                              "& .MuiInputBase-input": { fontSize: "0.75rem", py: 0.65 },
                              "& .MuiInputBase-root": { minHeight: 34 },
                            }}
                          />
                          <FormControl
                            size="small"
                            sx={{
                              flex: "0 0 auto",
                              minWidth: 116,
                              maxWidth: 140,
                              "& .MuiInputBase-root": {
                                minHeight: 34,
                                height: 34,
                                boxSizing: "border-box",
                              },
                            }}
                          >
                            <Select
                              value={profileNewNiceLevel}
                              onChange={(e) => setProfileNewNiceLevel(Number(e.target.value))}
                              aria-label="Expertise level for new nice-to-have skill"
                              IconComponent={KeyboardArrowDownRoundedIcon}
                              MenuProps={EXPERTISE_SELECT_MENU_PROPS}
                              sx={{
                                fontSize: "0.75rem",
                                bgcolor: "#fff",
                                borderRadius: "8px",
                                "& .MuiSelect-select": {
                                  py: 0,
                                  minHeight: 0,
                                  display: "flex",
                                  alignItems: "center",
                                },
                                "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(220,212,202,0.55)" },
                              }}
                            >
                              {PROFILE_NEW_SKILL_LEVEL_OPTIONS.map((o) => (
                                <MenuItem key={o.level} value={o.level} sx={{ fontSize: "0.8125rem", minHeight: 40, py: 1, px: 1.75 }}>
                                  {o.label}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                          <Button
                            type="button"
                            variant="outlined"
                            size="small"
                            onClick={addProfileNiceSkill}
                            disabled={!profileNewNiceInput.trim()}
                            sx={{ textTransform: "none", fontWeight: 600, flexShrink: 0, px: 1.25, py: 0.35, minHeight: 34, fontSize: "0.75rem" }}
                          >
                            Add
                          </Button>
                          <IconButton
                            type="button"
                            aria-label="Close add nice-to-have skill"
                            onClick={cancelProfileNiceAdd}
                            size="small"
                            sx={{
                              color: SHELL_MUTED,
                              flexShrink: 0,
                              width: 30,
                              height: 30,
                              "&:hover": { bgcolor: "rgba(0,0,0,0.05)", color: SHELL_INK },
                            }}
                          >
                            <CloseRoundedIcon sx={{ fontSize: 18 }} />
                          </IconButton>
                        </Stack>
                      ) : (
                        <Button
                          type="button"
                          fullWidth
                          disableElevation
                          variant="text"
                          aria-label="Add a nice-to-have competency and set its expertise level"
                          startIcon={<AddRoundedIcon sx={{ fontSize: "16px !important", color: SHELL_MUTED, opacity: 0.85 }} />}
                          onClick={() => setProfileNiceAddExpanded(true)}
                          sx={{
                            justifyContent: "flex-start",
                            textAlign: "left",
                            textTransform: "none",
                            fontWeight: 500,
                            fontSize: "0.6875rem",
                            color: SHELL_MUTED,
                            py: 0.65,
                            px: 1,
                            minHeight: 36,
                            borderRadius: 0,
                            bgcolor: "#fff",
                            "&:hover": { bgcolor: "rgba(0,0,0,0.04)", color: SHELL_INK },
                          }}
                        >
                          <Box component="span" sx={{ display: "block", textAlign: "left" }}>
                            <Typography component="span" sx={{ display: "block", fontSize: "0.6875rem", fontWeight: 600, color: SHELL_MUTED, lineHeight: 1.3 }}>
                              Add competency
                            </Typography>
                          </Box>
                        </Button>
                      )}
                    </Collapse>
                  </Box>
                </Box>
              </Grid>
            </Grid>

            {/* ── Alignment CTA — premium glass card + sweeping shine ── */}
            <Box
              sx={{
                mt: 3,
                mx: { xs: -0.5, md: 0 },
                borderRadius: "16px",
                border: "1px solid rgba(248,114,58,0.26)",
                background: `
                  radial-gradient(ellipse 85% 70% at 8% 12%, rgba(248,114,58,0.11) 0%, transparent 58%),
                  radial-gradient(ellipse 70% 55% at 92% 88%, rgba(255,255,255,0.9) 0%, transparent 52%),
                  linear-gradient(168deg, rgba(255,253,251,0.99) 0%, rgba(255,248,244,0.94) 38%, rgba(252,240,232,0.9) 100%)
                `,
                backdropFilter: "blur(16px) saturate(1.06)",
                overflow: "hidden",
                position: "relative",
                isolation: "isolate",
                "@keyframes alignCtaCardGlow": {
                  "0%, 100%": {
                    boxShadow: `
                      0 1px 0 rgba(255,255,255,0.98) inset,
                      0 0 0 1px rgba(255,255,255,0.5) inset,
                      0 8px 36px rgba(248,114,58,0.07),
                      0 2px 12px rgba(18,10,4,0.035)
                    `,
                  },
                  "50%": {
                    boxShadow: `
                      0 1px 0 rgba(255,255,255,1) inset,
                      0 0 0 1px rgba(255,255,255,0.62) inset,
                      0 12px 44px rgba(248,114,58,0.12),
                      0 4px 20px rgba(18,10,4,0.045)
                    `,
                  },
                },
                "@keyframes alignCtaShine": {
                  "0%": { transform: "translateX(-150%) skewX(-11deg)" },
                  "100%": { transform: "translateX(340%) skewX(-11deg)" },
                },
                boxShadow: `
                  0 1px 0 rgba(255,255,255,0.98) inset,
                  0 0 0 1px rgba(255,255,255,0.5) inset,
                  0 8px 36px rgba(248,114,58,0.07),
                  0 2px 12px rgba(18,10,4,0.035)
                `,
                animation: "alignCtaCardGlow 5.5s ease-in-out infinite",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  inset: 0,
                  borderRadius: "inherit",
                  pointerEvents: "none",
                  zIndex: 0,
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.62) 0%, transparent 26%, transparent 74%, rgba(248,114,58,0.045) 100%)",
                  opacity: 0.92,
                },
                "&::after": {
                  content: '""',
                  position: "absolute",
                  top: "-18%",
                  left: 0,
                  width: "58%",
                  height: "136%",
                  pointerEvents: "none",
                  zIndex: 1,
                  background:
                    "linear-gradient(102deg, transparent 0%, rgba(255,255,255,0) 32%, rgba(255,255,255,0.42) 44%, rgba(255,255,255,0.88) 49.5%, rgba(255,252,248,0.95) 50%, rgba(255,255,255,0.72) 50.5%, rgba(255,255,255,0.38) 58%, transparent 72%, transparent 100%)",
                  filter: "blur(0.5px)",
                  animation: "alignCtaShine 4.25s linear infinite",
                },
                "@media (prefers-reduced-motion: reduce)": {
                  animation: "none",
                  "&::after": { animation: "none", opacity: 0 },
                },
              }}
            >
              <Box sx={{ p: { xs: 2, md: 2.5 }, position: "relative", zIndex: 2 }}>
                {/* Header row */}
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  alignItems={{ xs: "flex-start", sm: "flex-start" }}
                  justifyContent="space-between"
                  spacing={1.5}
                  sx={{ mb: 2 }}
                >
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Stack direction="row" spacing={0.75} alignItems="center" sx={{ mb: 0.65 }}>
                      <Box sx={{ width: 28, height: 28, borderRadius: "8px", background: "linear-gradient(135deg, rgba(248,114,58,0.12) 0%, rgba(248,114,58,0.06) 100%)", display: "grid", placeItems: "center", flexShrink: 0 }}>
                        <GroupAddOutlinedIcon sx={{ fontSize: 16, color: SHELL_PRIMARY }} />
                      </Box>
                      <Typography
                        component="h2"
                        sx={{ fontSize: "0.9375rem", fontWeight: 700, color: SHELL_INK, letterSpacing: "-0.02em", lineHeight: 1.25, m: 0 }}
                      >
                        Get your hiring manager{"\u2019"}s sign-off
                      </Typography>
                    </Stack>
                    <Typography sx={{ fontSize: "0.78rem", color: SHELL_MUTED, lineHeight: 1.55, maxWidth: "100%" }}>
                      Share this profile with your hiring manager to review competency priorities and approve the bar. Once aligned, expect fewer mismatched candidates and faster path to offer.
                    </Typography>
                  </Box>
                  <Button
                    variant="text"
                    startIcon={<IosShareRoundedIcon sx={{ fontSize: "16px !important", color: SHELL_PRIMARY }} />}
                    onClick={() => {
                      setSendHmLeavingStacked(false);
                      setSendHmDialogOpen(true);
                    }}
                    sx={{
                      flexShrink: 0,
                      borderRadius: "10px",
                      textTransform: "none",
                      fontWeight: 700,
                      fontSize: "0.8125rem",
                      px: 2.25,
                      py: 0.95,
                      color: SHELL_PRIMARY,
                      bgcolor: "rgba(248,114,58,0.08)",
                      border: "none",
                      boxShadow: "none",
                      whiteSpace: "nowrap",
                      "&:hover": {
                        bgcolor: "rgba(248,114,58,0.14)",
                        border: "none",
                        boxShadow: "none",
                      },
                    }}
                  >
                    Send to hiring manager
                  </Button>
                </Stack>

                <Typography
                  component="h3"
                  sx={{
                    m: 0,
                    pt: 2,
                    mb: 1.5,
                    borderTop: "1px solid rgba(220, 212, 202, 0.42)",
                    fontSize: "0.875rem",
                    fontWeight: 700,
                    color: SHELL_INK,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.3,
                  }}
                >
                  Potential improvements after hiring manager sign-off
                </Typography>

                {/* Predicted impact metrics */}
                <Grid container spacing={1.5}>
                  {PREDICTED_METRICS.map((m) => (
                    <Grid key={m.label} size={{ xs: 6, sm: 3 }}>
                      <Box
                        sx={{
                          borderRadius: "11px",
                          border: "1px solid rgba(220,212,202,0.25)",
                          bgcolor: "rgba(255,255,255,0.7)",
                          backdropFilter: "blur(6px)",
                          p: { xs: 1.5, md: 1.75 },
                          display: "flex",
                          flexDirection: "column",
                          gap: 0.35,
                          transition: "box-shadow 0.18s ease, border-color 0.18s ease",
                          "&:hover": {
                            boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
                            borderColor: "rgba(220,212,202,0.45)",
                          },
                        }}
                      >
                        <Stack direction="row" spacing={0.5} alignItems="center">
                          <m.icon sx={{ fontSize: 14, color: m.color, opacity: 0.75 }} />
                          <Typography sx={{ fontSize: "0.575rem", fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: SHELL_MUTED }}>
                            {m.label}
                          </Typography>
                        </Stack>
                        <Typography sx={{ fontSize: "1.1rem", fontWeight: 800, color: SHELL_INK, letterSpacing: "-0.02em", lineHeight: 1.2, mt: 0.25 }}>
                          {m.value}
                        </Typography>
                        <Typography sx={{ fontSize: "0.65rem", fontWeight: 500, color: m.color, lineHeight: 1.35 }}>
                          {m.note}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Box>
          </Box>

          {/* Next step */}
          <Stack
            direction={{ xs: "column-reverse", sm: "row" }}
            spacing={1.25}
            alignItems={{ xs: "stretch", sm: "center" }}
            justifyContent="space-between"
            sx={{
              mt: 1.75,
              mb: 0,
              px: { xs: 0.25, sm: 0 },
              pt: { xs: 1.5, sm: 1.75 },
              borderTop: "1px solid rgba(220,212,202,0.38)",
            }}
          >
            <Button
              variant="text"
              size="medium"
              startIcon={<ArrowBackRoundedIcon sx={{ fontSize: "18px !important" }} />}
              onClick={() => setPhase("scratch")}
              sx={{
                alignSelf: { xs: "flex-start", sm: "center" },
                textTransform: "none",
                fontWeight: 600,
                fontSize: "0.875rem",
                color: SHELL_MUTED,
                px: 0.75,
                "&:hover": { color: SHELL_INK, bgcolor: "rgba(0,0,0,0.04)" },
              }}
            >
              Back
            </Button>
            <Button
              variant="contained"
              size="medium"
              onClick={() => hmSent ? setPhase("review") : setSkipHmDialogOpen(true)}
              sx={{
                borderRadius: "10px",
                textTransform: "none",
                fontWeight: 700,
                fontSize: "0.875rem",
                px: 2.75,
                py: 1,
                boxShadow: "0 8px 20px rgba(248,114,58,0.22)",
                "&:hover": { boxShadow: "0 10px 24px rgba(248,114,58,0.28)" },
              }}
            >
              Review and Publish
            </Button>
          </Stack>

          {/* ── Skip-HM confirmation dialog ── */}
          <Dialog
            open={skipHmDialogOpen}
            onClose={handleSkipHmDialogClose}
            maxWidth="sm"
            fullWidth
            sx={{ zIndex: 1600 }}
            PaperProps={{
              sx: {
                borderRadius: "20px",
                overflow: skipHmRecessedBehindSend ? "visible" : "hidden",
                boxShadow: "0 24px 80px rgba(18,10,4,0.18), 0 6px 24px rgba(248,114,58,0.08)",
                "@keyframes skipDlgPulse": {
                  "0%, 100%": { opacity: 0.55, transform: "scale(1)" },
                  "50%": { opacity: 0.3, transform: "scale(1.1)" },
                },
                transition:
                  "transform 0.48s cubic-bezier(0.22, 1, 0.36, 1), filter 0.48s ease, box-shadow 0.48s ease, overflow 0s linear 0.48s",
                ...(skipHmRecessedBehindSend
                  ? {
                      /* Narrower + anchored from top so only header peeks above the send dialog (reference stack) */
                      transform: "translateY(8px) scale(0.8, 0.9)",
                      transformOrigin: "50% 0%",
                      filter: "brightness(0.96)",
                      pointerEvents: "none",
                      boxShadow: "0 18px 48px rgba(18,10,4,0.12), 0 4px 16px rgba(18,10,4,0.06)",
                    }
                  : {
                      transform: "translateY(0) scale(1)",
                      transformOrigin: "50% 0%",
                      filter: "brightness(1)",
                    }),
              },
            }}
          >
            <Box sx={{ position: "relative", overflow: "hidden" }}>
              {/* Ambient glow */}
              <Box
                aria-hidden
                sx={{
                  position: "absolute",
                  top: "-50%",
                  left: "50%",
                  width: "130%",
                  height: "110%",
                  transform: "translateX(-50%)",
                  pointerEvents: "none",
                  background: "conic-gradient(from 200deg at 50% 60%, rgba(248,114,58,0.09) 0deg, rgba(255,190,150,0.06) 120deg, transparent 220deg, rgba(248,114,58,0.05) 360deg)",
                  filter: "blur(44px)",
                  animation: "skipDlgPulse 6s ease-in-out infinite",
                  "@media (prefers-reduced-motion: reduce)": { animation: "none" },
                }}
              />

              <Box sx={{ position: "relative", zIndex: 1, p: { xs: 2.5, sm: 3.5 } }}>
                {/* Header */}
                <Stack direction="row" spacing={0} justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2.5 }}>
                  <Box
                    sx={{
                      flex: 1,
                      minWidth: 0,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                      gap: "20px",
                    }}
                  >
                    <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
                      <Box
                        sx={{
                          width: 32,
                          height: 32,
                          borderRadius: "10px",
                          background: "linear-gradient(135deg, rgba(248,114,58,0.14) 0%, rgba(248,114,58,0.06) 100%)",
                          display: "grid",
                          placeItems: "center",
                          flexShrink: 0,
                        }}
                      >
                        <GroupAddOutlinedIcon sx={{ fontSize: 18, color: SHELL_PRIMARY }} />
                      </Box>
                      <Typography component="h2" sx={{ fontSize: "20px", fontWeight: 700, color: SHELL_INK, letterSpacing: "-0.025em", lineHeight: 1.25, flex: 1, minWidth: 0 }}>
                        You{"\u2019"}re about to skip hiring manager alignment
                      </Typography>
                    </Stack>
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        textAlign: "left",
                        gap: 1.25,
                      }}
                    >
                      <Box
                        sx={{
                          borderRadius: "12px",
                          border: "1px solid rgba(220, 212, 202, 0.55)",
                          bgcolor: "rgba(255, 253, 250, 0.95)",
                          px: 1.75,
                          py: 1.5,
                          width: "100%",
                          alignSelf: "stretch",
                          textAlign: "left",
                        }}
                      >
                        <Typography
                          component="p"
                          sx={{
                            m: 0,
                            mb: 1.25,
                            fontSize: "14px",
                            fontWeight: 700,
                            letterSpacing: "-0.01em",
                            color: SHELL_INK,
                            lineHeight: 1.35,
                            textAlign: "left",
                            pb: "4px",
                          }}
                        >
                          Why share the ideal candidate profile with your hiring manager?
                        </Typography>
                        <Stack spacing={1.1} sx={{ alignItems: "flex-start", textAlign: "left", width: "100%" }}>
                          {[
                            "They hold the day-to-day context on what \u201csuccess\u201d looks like in this role.",
                            "One aligned ideal profile lets us rank candidates against the bar you both agree on.",
                            "That usually means stronger fits and a shorter path to offer.",
                            "They review the competencies for this role, adjust or add items as needed, and send their updates back to you.",
                          ].map((line) => (
                            <Stack key={line} direction="row" alignItems="flex-start" spacing={1.1}>
                              <Box
                                sx={{
                                  flexShrink: 0,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontSize: "0.78rem",
                                  lineHeight: 1.45,
                                  minHeight: "1.45em",
                                }}
                              >
                                <Box
                                  sx={{
                                    width: 6,
                                    height: 6,
                                    borderRadius: "50%",
                                    bgcolor: SHELL_PRIMARY,
                                    opacity: 0.85,
                                  }}
                                />
                              </Box>
                              <Typography sx={{ fontSize: "0.78rem", color: SHELL_INK, lineHeight: 1.45, fontWeight: 500, flex: 1, minWidth: 0 }}>
                                {line}
                              </Typography>
                            </Stack>
                          ))}
                        </Stack>
                      </Box>
                      <Typography sx={{ fontSize: "0.75rem", color: SHELL_MUTED, lineHeight: 1.45, fontWeight: 400 }}>
                        Skip sharing and you may leave this upside on the table:
                      </Typography>
                    </Box>
                  </Box>
                  <IconButton size="small" onClick={handleSkipHmDialogClose} sx={{ color: SHELL_MUTED, mt: -0.5, mr: -0.5 }}>
                    <CloseRoundedIcon sx={{ fontSize: 20 }} />
                  </IconButton>
                </Stack>

                {/* Benefit metric cards */}
                <Grid container spacing={1.5} sx={{ mb: 3 }}>
                  {PREDICTED_METRICS.map((m, idx) => (
                    <Grid key={m.label} size={{ xs: 6, sm: 6 }}>
                      <Box
                        sx={{
                          borderRadius: "14px",
                          border: "1px solid",
                          borderColor: `${m.color}18`,
                          bgcolor: `${m.color}06`,
                          p: 2,
                          display: "flex",
                          flexDirection: "column",
                          gap: 0.4,
                          animation: `skipDlgFadeUp 0.35s cubic-bezier(0.23, 1, 0.32, 1) ${0.08 * (idx + 1)}s both`,
                          "@media (prefers-reduced-motion: reduce)": { animation: `skipDlgFadeUp 0.35s ease ${0.08 * (idx + 1)}s both` },
                          transition: "box-shadow 0.2s ease",
                          "&:hover": {
                            boxShadow: `0 6px 20px ${m.color}14`,
                          },
                        }}
                      >
                        <Stack direction="row" spacing={0.5} alignItems="center">
                          <m.icon sx={{ fontSize: 16, color: m.color, opacity: 0.85 }} />
                          <Typography sx={{ fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: m.color }}>
                            {m.label}
                          </Typography>
                        </Stack>
                        <Typography sx={{ fontSize: "1.25rem", fontWeight: 800, color: SHELL_INK, letterSpacing: "-0.02em", lineHeight: 1.2, mt: 0.15 }}>
                          {m.value}
                        </Typography>
                        <Typography sx={{ fontSize: "0.7rem", fontWeight: 500, color: m.color, lineHeight: 1.35 }}>
                          {m.note}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>

                {/* Actions */}
                <Stack direction={{ xs: "column-reverse", sm: "row" }} spacing={1.25} justifyContent="flex-end">
                  <Button
                    variant="text"
                    onClick={() => { setSkipHmDialogOpen(false); setPhase("review"); }}
                    sx={{
                      textTransform: "none",
                      fontWeight: 600,
                      fontSize: "0.8125rem",
                      color: SHELL_MUTED,
                      px: 2,
                      "&:hover": { color: SHELL_INK, bgcolor: "rgba(0,0,0,0.04)" },
                    }}
                  >
                    Skip and continue to review
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<IosShareRoundedIcon sx={{ fontSize: "16px !important" }} />}
                    onClick={() => {
                      setSendHmLeavingStacked(false);
                      setSendHmDialogOpen(true);
                    }}
                    sx={{
                      borderRadius: "10px",
                      textTransform: "none",
                      fontWeight: 700,
                      fontSize: "0.875rem",
                      px: 2.5,
                      py: 1,
                      boxShadow: "0 8px 20px rgba(248,114,58,0.22)",
                      "&:hover": { boxShadow: "0 10px 24px rgba(248,114,58,0.28)" },
                    }}
                  >
                    Send to hiring manager
                  </Button>
                </Stack>
              </Box>
            </Box>
          </Dialog>

          {/* ── Send-to-HM preview dialog (stacks above skip dialog when both open) ── */}
          <Dialog
            open={sendHmDialogOpen}
            onClose={closeSendHmDialog}
            maxWidth="sm"
            fullWidth
            hideBackdrop={skipHmRecessedBehindSend}
            sx={{ zIndex: skipHmRecessedBehindSend ? 1700 : 1610 }}
            TransitionProps={{
              onExited: () => {
                setSendHmLeavingStacked(false);
              },
            }}
            PaperProps={{
              elevation: 24,
              sx: {
                position: "relative",
                overflow: "visible",
                maxWidth: 600,
                mx: "auto",
                width: "100%",
                borderRadius: "20px",
                backgroundColor: "transparent",
                boxShadow: "none",
                pt: 0,
                "@keyframes sendHmPaperIn": {
                  from: { opacity: 0, transform: "translateY(32px) scale(0.92)" },
                  to: { opacity: 1, transform: "translateY(0) scale(1)" },
                },
              },
            }}
            slotProps={skipHmRecessedBehindSend ? undefined : { backdrop: { sx: { backgroundColor: "rgba(29, 26, 23, 0.4)", backdropFilter: "blur(5px)" } } }}
          >
            <Box
              sx={{
                position: "relative",
                width: "100%",
                ...(skipHmRecessedBehindSend
                  ? {
                      transform: "translateY(20px)",
                      transition: "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
                    }
                  : {}),
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  zIndex: 1,
                  borderRadius: "20px",
                  overflow: "hidden",
                  bgcolor: "#fff",
                  boxShadow: "0 28px 90px rgba(18,10,4,0.2), 0 8px 28px rgba(248,114,58,0.1)",
                  animation: "sendHmPaperIn 0.45s cubic-bezier(0.22, 1, 0.36, 1) both",
                  "@media (prefers-reduced-motion: reduce)": {
                    animation: "sendHmPaperIn 0.25s ease both",
                  },
                  ...(skipHmRecessedBehindSend
                    ? {
                        /* Full-width foreground so scaled skip (narrower) hides fully behind sides */
                        maxWidth: 600,
                        width: "100%",
                        mx: 0,
                        mt: 0,
                      }
                    : {}),
                }}
              >
            <Box sx={{ position: "relative", overflow: "hidden" }}>
              <Box sx={{ position: "relative", zIndex: 1, p: { xs: 2.5, sm: 3 } }}>
                {/* Dialog header */}
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2.5 }}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: "10px",
                        background: "linear-gradient(135deg, rgba(248,114,58,0.14) 0%, rgba(248,114,58,0.06) 100%)",
                        display: "grid",
                        placeItems: "center",
                        flexShrink: 0,
                      }}
                    >
                      <IosShareRoundedIcon sx={{ fontSize: 17, color: SHELL_PRIMARY }} />
                    </Box>
                    <Typography component="h2" sx={{ fontSize: "1.125rem", fontWeight: 700, color: SHELL_INK, letterSpacing: "-0.025em", lineHeight: 1.25 }}>
                      Send to hiring manager
                    </Typography>
                  </Stack>
                  <IconButton size="small" onClick={closeSendHmDialog} sx={{ color: SHELL_MUTED, mt: -0.5, mr: -0.5 }}>
                    <CloseRoundedIcon sx={{ fontSize: 20 }} />
                  </IconButton>
                </Stack>

                <Stack spacing={3.5} sx={{ mb: 0 }}>
                {/* What HM will receive — summary card */}
                <Box
                  sx={{
                    borderRadius: "14px",
                    border: "1px solid rgba(220,212,202,0.5)",
                    bgcolor: "rgba(255,253,250,0.95)",
                    overflow: "hidden",
                  }}
                >
                  <Box sx={{ px: 2, py: 1.75 }}>
                    <Typography sx={{ fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: SHELL_MUTED, mb: 0.65 }}>
                      What they{"\u2019"}ll receive
                    </Typography>
                    {/* Job identity row */}
                    <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.25 }}>
                      <Box
                        sx={{
                          width: 34,
                          height: 34,
                          borderRadius: "50%",
                          flexShrink: 0,
                          display: "grid",
                          placeItems: "center",
                          bgcolor: "rgba(37, 99, 235, 0.08)",
                          border: "1px solid rgba(37, 99, 235, 0.18)",
                        }}
                      >
                        <PersonSearchOutlinedIcon sx={{ fontSize: 18, color: "#2563eb" }} />
                      </Box>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography sx={{ fontSize: "0.875rem", fontWeight: 700, color: SHELL_INK, lineHeight: 1.25, mb: 0.15 }}>
                          Ideal {jobTitle || "Candidate"}
                        </Typography>
                        <Typography sx={{ fontSize: "0.72rem", fontWeight: 450, color: SHELL_MUTED, lineHeight: 1.35 }}>
                          {[department, domain, experienceRange].filter(Boolean).join(" \u00b7 ")}
                        </Typography>
                      </Box>
                    </Stack>
                    {/* Key details chips */}
                    <Stack direction="row" spacing={1.5} sx={{ flexWrap: "wrap", gap: 0.75 }}>
                      {[
                        { icon: LanguageRoundedIcon, val: location?.trim() || "Not set" },
                        { icon: PaymentsOutlinedIcon, val: compensationShort || "Not specified" },
                        { icon: WorkOutlineRoundedIcon, val: [employmentType, workModeLabel].filter(Boolean).join(" \u00b7 ") || "Not set" },
                      ].map((f) => (
                        <Stack key={f.val} direction="row" spacing={0.5} alignItems="center">
                          <f.icon sx={{ fontSize: 13, color: SHELL_MUTED, opacity: 0.7 }} />
                          <Typography sx={{ fontSize: "0.72rem", fontWeight: 550, color: SHELL_INK, lineHeight: 1.25 }}>
                            {f.val}
                          </Typography>
                        </Stack>
                      ))}
                    </Stack>
                  </Box>

                  {/* Competencies — progressive disclosure */}
                  <Box
                    sx={{
                      borderTop: "1px solid rgba(220,212,202,0.38)",
                      px: 2,
                      py: 1.25,
                      cursor: "pointer",
                      transition: "background 0.15s ease",
                      "&:hover": { bgcolor: "rgba(248,246,243,0.5)" },
                    }}
                    onClick={() => setHmPreviewExpanded((v) => !v)}
                  >
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography sx={{ fontSize: "0.78rem", fontWeight: 600, color: SHELL_INK }}>
                        {mandatorySkillList.filter((s) => !profileInapplicable[s._k]).length} must-have
                        {" \u00b7 "}
                        {niceSkillList.filter((s) => !profileInapplicable[s._k]).length} nice-to-have competencies
                      </Typography>
                      <ExpandMoreRoundedIcon
                        sx={{
                          fontSize: 18,
                          color: SHELL_MUTED,
                          transition: "transform 0.2s ease",
                          transform: hmPreviewExpanded ? "rotate(180deg)" : "rotate(0deg)",
                        }}
                      />
                    </Stack>
                  </Box>
                  <Collapse in={hmPreviewExpanded}>
                    <Box sx={{ px: 2, pb: 1.75 }}>
                      <Grid container spacing={2}>
                        <Grid size={{ xs: 6 }}>
                          <Typography sx={{ fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", color: SHELL_PRIMARY, mb: 0.75 }}>
                            Must-have
                          </Typography>
                          <Stack spacing={0.5}>
                            {mandatorySkillList
                              .filter((s) => !profileInapplicable[s._k])
                              .map((s) => {
                                const tier = skillTierFromLevel(s.level);
                                return (
                                  <Stack key={s._k} direction="row" justifyContent="space-between" alignItems="center">
                                    <Typography sx={{ fontSize: "0.75rem", fontWeight: 500, color: SHELL_INK }}>{s.name}</Typography>
                                    <Typography sx={{ fontSize: "0.6875rem", fontWeight: 600, color: SHELL_MUTED }}>{tier.label}</Typography>
                                  </Stack>
                                );
                              })}
                          </Stack>
                        </Grid>
                        <Grid size={{ xs: 6 }}>
                          <Typography sx={{ fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", color: "#7B726A", mb: 0.75 }}>
                            Nice-to-have
                          </Typography>
                          <Stack spacing={0.5}>
                            {niceSkillList
                              .filter((s) => !profileInapplicable[s._k])
                              .map((s) => {
                                const tier = skillTierFromLevel(s.level);
                                return (
                                  <Stack key={s._k} direction="row" justifyContent="space-between" alignItems="center">
                                    <Typography sx={{ fontSize: "0.75rem", fontWeight: 500, color: SHELL_INK }}>{s.name}</Typography>
                                    <Typography sx={{ fontSize: "0.6875rem", fontWeight: 600, color: SHELL_MUTED }}>{tier.label}</Typography>
                                  </Stack>
                                );
                              })}
                          </Stack>
                        </Grid>
                      </Grid>
                    </Box>
                  </Collapse>
                </Box>

                {/* What the HM is expected to do */}
                <Box>
                  <Typography sx={{ fontSize: "0.8125rem", fontWeight: 700, letterSpacing: "-0.01em", color: SHELL_INK, mb: 0.65 }}>
                    What they can do
                  </Typography>
                  <Stack spacing={0.75}>
                    {[
                      "Review the competencies and adjust priorities or levels",
                      "Approve the ideal candidate profile or suggest changes",
                      "Send their updates back so ZappyFind can recommend accurately",
                    ].map((step, i) => (
                      <Stack key={i} direction="row" spacing={1} alignItems="flex-start">
                        <CheckCircleOutlineRoundedIcon sx={{ fontSize: 16, color: SHELL_PRIMARY, mt: "1px", flexShrink: 0, opacity: 0.85 }} />
                        <Typography sx={{ fontSize: "0.78rem", color: SHELL_INK, lineHeight: 1.45, fontWeight: 500 }}>
                          {step}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Box>

                {/* Email input */}
                <Box>
                  <Typography sx={{ fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: SHELL_MUTED, mb: 0.4 }}>
                    Hiring manager email
                  </Typography>
                  <Typography sx={{ fontSize: "0.72rem", color: SHELL_MUTED, lineHeight: 1.45, mb: 1 }}>
                    They{"\u2019"}ll receive an email with a link to review and approve the profile.
                  </Typography>

                  <TextField
                    size="small"
                    placeholder="name@company.com"
                    value={hmEmailInput}
                    onChange={(e) => {
                      setHmEmailInput(e.target.value);
                      setHmEmailError("");
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === ",") {
                        e.preventDefault();
                        const val = hmEmailInput.trim().replace(/,+$/, "");
                        if (!val) return;
                        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
                          setHmEmailError("Enter a valid email address");
                          return;
                        }
                        if (hmEmails.includes(val)) {
                          setHmEmailError("This email is already added");
                          return;
                        }
                        setHmEmails((prev) => [...prev, val]);
                        setHmEmailInput("");
                        setHmEmailError("");
                      }
                    }}
                    error={!!hmEmailError}
                    helperText={
                      hmEmailError ||
                      (hmEmails.length === 0 ? "Press Enter to add multiple emails" : undefined)
                    }
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailOutlinedIcon sx={{ fontSize: 18, color: SHELL_MUTED }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": { borderRadius: "10px", fontSize: "0.875rem" },
                      "& .MuiOutlinedInput-input": { fontSize: "14px" },
                      "& .MuiFormHelperText-root": { fontSize: "0.6875rem", mt: 0.5 },
                    }}
                  />

                  {/* Added emails — below the field once addresses are committed */}
                  {hmEmails.length > 0 && (
                    <Stack direction="row" sx={{ flexWrap: "wrap", gap: 0.75, mt: 1.25 }}>
                      {hmEmails.map((email) => (
                        <Chip
                          key={email}
                          label={email}
                          size="small"
                          onDelete={() => setHmEmails((prev) => prev.filter((e) => e !== email))}
                          sx={{
                            borderRadius: "8px",
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            bgcolor: "rgba(248,114,58,0.08)",
                            color: SHELL_INK,
                            "& .MuiChip-deleteIcon": { fontSize: 16, color: SHELL_MUTED, "&:hover": { color: SHELL_INK } },
                          }}
                        />
                      ))}
                    </Stack>
                  )}
                </Box>
                </Stack>

                {/* Actions */}
                <Stack direction="row" spacing={1.25} justifyContent="flex-end" sx={{ mt: 4 }}>
                  <Button
                    variant="text"
                    onClick={closeSendHmDialog}
                    sx={{
                      textTransform: "none",
                      fontWeight: 600,
                      fontSize: "0.875rem",
                      color: SHELL_MUTED,
                      px: 1.5,
                      "&:hover": { color: SHELL_INK, bgcolor: "rgba(0,0,0,0.04)" },
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    disabled={hmEmails.length === 0 && !hmEmailInput.trim()}
                    startIcon={<IosShareRoundedIcon sx={{ fontSize: "16px !important" }} />}
                    onClick={() => {
                      let finalEmails = [...hmEmails];
                      const pending = hmEmailInput.trim().replace(/,+$/, "");
                      if (pending) {
                        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(pending)) {
                          setHmEmailError("Enter a valid email address");
                          return;
                        }
                        if (!finalEmails.includes(pending)) finalEmails.push(pending);
                      }
                      if (finalEmails.length === 0) return;
                      setHmEmails(finalEmails);
                      setHmEmailInput("");
                      setHmEmailError("");
                      setHmSent(true);
                      setSendHmLeavingStacked(false);
                      setSendHmDialogOpen(false);
                      setSkipHmDialogOpen(false);
                      setSnackbar({ open: true, message: `Invite sent to ${finalEmails.length} hiring manager${finalEmails.length > 1 ? "s" : ""}.` });
                    }}
                    sx={{
                      borderRadius: "10px",
                      textTransform: "none",
                      fontWeight: 700,
                      fontSize: "0.875rem",
                      px: 2.5,
                      py: 1,
                      boxShadow: "0 8px 20px rgba(248,114,58,0.22)",
                      "&:hover": { boxShadow: "0 10px 24px rgba(248,114,58,0.28)" },
                    }}
                  >
                    Send invite{hmEmails.length > 1 ? "s" : ""}
                  </Button>
                </Stack>
              </Box>
            </Box>
              </Box>
            </Box>
          </Dialog>
        </Box>
      </Box>
    );
  }

  if (phase === "review") {
    const salaryCurrencyLabel =
      SALARY_CURRENCY_OPTIONS.find((o) => o.code === salaryCurrency)?.label ?? salaryCurrency;
    const workModeLabel =
      workMode === "remote" ? "Remote" : workMode === "hybrid" ? "Hybrid" : "In-office";

    body = (
      <Box
        sx={{
          position: "relative",
          mx: { xs: -1.75, md: -2.5 },
          mt: { xs: -2, md: -2.5 },
          mb: { xs: -2, md: -2.5 },
          width: { xs: "calc(100% + 28px)", md: "calc(100% + 40px)" },
          bgcolor: "#faf9f8",
          minHeight: "100vh",
          "@keyframes reviewFadeUp": {
            from: { opacity: 0, transform: "translateY(12px)" },
            to: { opacity: 1, transform: "translateY(0)" },
          },
        }}
      >
        {/* ====== HEADER ====== */}
        <Box
          sx={{
            pt: { xs: 2, md: 2.5 },
            pb: { xs: 2, md: 2.5 },
            px: { xs: 2, md: 3 },
            borderBottom: "1px solid rgba(220,212,202,0.35)",
            bgcolor: "#fff",
          }}
        >
          <IconButton
            aria-label="Back to benchmark"
            onClick={() => setPhase("profile")}
            size="small"
            sx={{ color: SHELL_MUTED, ml: -1, mb: 1.25, "&:hover": { color: SHELL_INK, bgcolor: "rgba(0,0,0,0.04)" } }}
          >
            <ArrowBackRoundedIcon sx={{ fontSize: 20 }} />
          </IconButton>

          <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "center" }} spacing={1.5}>
            <Box sx={{ minWidth: 0 }}>
              <Typography
                component="h1"
                sx={{
                  fontSize: { xs: "1.2rem", sm: "1.35rem", md: "1.45rem" },
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  color: SHELL_INK,
                  lineHeight: 1.25,
                  mb: 0.5,
                }}
              >
                Review &amp; publish
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: "0.8125rem", md: "0.875rem" },
                  color: SHELL_MUTED,
                  lineHeight: 1.55,
                  fontWeight: 400,
                }}
              >
                Check everything looks right, then publish or save as a draft.
              </Typography>
            </Box>
          </Stack>
        </Box>

        {/* ====== CONTENT ====== */}
        <Box
          sx={{
            px: { xs: 2, md: 3 },
            pt: { xs: 2.5, md: 3 },
            pb: { xs: "calc(20px + env(safe-area-inset-bottom, 0px))", md: "calc(24px + env(safe-area-inset-bottom, 0px))" },
          }}
        >
          {/* ── Role + Pay side by side ── */}
          <Grid container spacing={2} sx={{ mb: 2 }}>
            {/* Role overview */}
            <Grid size={{ xs: 12, md: 7 }}>
              <Box
                sx={{
                  borderRadius: "16px",
                  border: "1px solid rgba(220,212,202,0.42)",
                  bgcolor: "#fff",
                  p: { xs: 2, md: 2.5 },
                  height: "100%",
                  boxShadow: "0 1px 0 rgba(255,255,255,0.95) inset, 0 4px 20px rgba(18,10,4,0.025)",
                  animation: "reviewFadeUp 0.35s ease-out 0.04s both",
                }}
              >
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
                  <WorkOutlineRoundedIcon sx={{ fontSize: 18, color: SHELL_PRIMARY, opacity: 0.9 }} />
                  <Typography sx={{ fontSize: "0.7rem", fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: SHELL_MUTED }}>Role</Typography>
                  <Box sx={{ flex: 1 }} />
                  <Button
                    variant="text"
                    size="small"
                    onClick={() => setPhase("scratch")}
                    sx={{ textTransform: "none", fontWeight: 600, fontSize: "0.8125rem", color: SHELL_PRIMARY, px: 1, py: 0.35, minWidth: "auto", "&:hover": { bgcolor: "rgba(248,114,58,0.08)" } }}
                  >
                    Edit
                  </Button>
                </Stack>
                <Typography component="p" sx={{ fontSize: { xs: "1.0625rem", sm: "1.125rem" }, fontWeight: 700, color: SHELL_INK, letterSpacing: "-0.03em", lineHeight: 1.25, mb: 2 }}>
                  {jobTitle || "No title set"}
                </Typography>
                <Grid container spacing={2}>
                  {[
                    { label: "Department", val: department },
                    { label: "Domain", val: domain },
                    { label: "Experience", val: experienceRange },
                    { label: "Location", val: location },
                  ].map((f) => (
                    <Grid key={f.label} size={{ xs: 6, sm: 6 }}>
                      <Typography component="span" sx={{ fontSize: "0.6875rem", fontWeight: 500, color: SHELL_MUTED, textTransform: "uppercase", letterSpacing: "0.07em", display: "block", mb: 0.4 }}>
                        {f.label}
                      </Typography>
                      <Typography component="span" sx={{ fontSize: "0.9375rem", fontWeight: 600, color: SHELL_INK, letterSpacing: "-0.02em", lineHeight: 1.35, display: "block" }}>
                        {f.val || "\u2014"}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>

            {/* Pay & contract */}
            <Grid size={{ xs: 12, md: 5 }}>
              <Box
                sx={{
                  borderRadius: "16px",
                  border: "1px solid rgba(220,212,202,0.36)",
                  bgcolor: "#fff",
                  p: { xs: 2, md: 2.5 },
                  height: "100%",
                  animation: "reviewFadeUp 0.35s ease-out 0.08s both",
                }}
              >
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
                  <PaymentsOutlinedIcon sx={{ fontSize: 18, color: SHELL_PRIMARY, opacity: 0.9 }} />
                  <Typography sx={{ fontSize: "0.7rem", fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: SHELL_MUTED }}>Pay & contract</Typography>
                </Stack>
                <Stack spacing={2.5}>
                  <Box>
                    <Typography component="span" sx={{ fontSize: "0.6875rem", fontWeight: 500, color: SHELL_MUTED, textTransform: "uppercase", letterSpacing: "0.07em", display: "block", mb: 0.5 }}>
                      Compensation range
                    </Typography>
                    <Typography sx={{ fontSize: "1.0625rem", fontWeight: 700, color: SHELL_INK, letterSpacing: "-0.02em", mb: 0.25, display: "inline-flex", alignItems: "baseline", gap: 0.5, flexWrap: "wrap" }}>
                      {salaryMin && salaryMax ? (
                        <>
                          {salaryMin}
                          <Typography component="span" sx={{ color: SHELL_MUTED, fontWeight: 500, px: 0.75, fontSize: "inherit" }}>to</Typography>
                          {salaryMax}
                          <Typography component="span" sx={{ fontSize: "0.75rem", fontWeight: 600, color: SHELL_MUTED, ml: 0.5 }}>{salaryCurrencyLabel}</Typography>
                        </>
                      ) : ("\u2014")}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography component="span" sx={{ fontSize: "0.6875rem", fontWeight: 500, color: SHELL_MUTED, textTransform: "uppercase", letterSpacing: "0.07em", display: "block", mb: 0.5 }}>
                      Contract setup
                    </Typography>
                    <Stack direction="row" flexWrap="wrap" gap={0.75} alignItems="center">
                      <Box sx={{ px: 1.15, py: 0.45, borderRadius: "999px", bgcolor: "rgba(248,246,243,0.85)", border: "1px solid rgba(220,212,202,0.5)", fontSize: "0.75rem", fontWeight: 600, color: SHELL_INK, lineHeight: 1.3 }}>
                        {employmentType || "\u2014"}
                      </Box>
                      <Box sx={{ px: 1.15, py: 0.45, borderRadius: "999px", bgcolor: "rgba(248,246,243,0.85)", border: "1px solid rgba(220,212,202,0.5)", fontSize: "0.75rem", fontWeight: 600, color: SHELL_INK, lineHeight: 1.3 }}>
                        {workMode ? workModeLabel : "\u2014"}
                      </Box>
                    </Stack>
                  </Box>
                </Stack>
              </Box>
            </Grid>
          </Grid>

          {/* ── Job description (full width) ── */}
          <Box
            sx={{
              borderRadius: "16px",
              border: "1px solid rgba(220,212,202,0.4)",
              bgcolor: "#fff",
              overflow: "hidden",
              mb: 2,
              animation: "reviewFadeUp 0.35s ease-out 0.12s both",
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center" sx={{ px: 2.5, pt: 2, pb: 1 }}>
              <ArticleOutlinedIcon sx={{ fontSize: 18, color: SHELL_PRIMARY, opacity: 0.9 }} />
              <Typography sx={{ fontSize: "0.7rem", fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: SHELL_MUTED }}>Job description</Typography>
            </Stack>
            <Box sx={{ maxHeight: 260, overflow: "auto", px: 2.5, pb: 2, pt: 0.5 }}>
              <Box sx={{ p: 1.5, borderRadius: "12px", bgcolor: "rgba(107,99,92,0.035)", border: "1px solid rgba(220,212,202,0.4)" }}>
                <Typography component="div" sx={{ fontSize: "0.875rem", color: SHELL_INK, lineHeight: 1.7, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                  {jobDescription.trim() || "\u2014"}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* ── Collaborators + listing period notice ── */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid size={{ xs: 12, md: 7 }}>
              <Box
                sx={{
                  borderRadius: "16px",
                  border: "1px solid rgba(220,212,202,0.42)",
                  bgcolor: "#fff",
                  p: { xs: 2, md: 2.5 },
                  height: "100%",
                  animation: "reviewFadeUp 0.35s ease-out 0.16s both",
                }}
              >
                <Stack direction="row" spacing={0.75} alignItems="center" sx={{ mb: 1.25 }}>
                  <GroupAddOutlinedIcon sx={{ fontSize: 18, color: SHELL_MUTED, opacity: 0.8 }} />
                  <Typography sx={{ fontSize: "0.75rem", fontWeight: 700, color: SHELL_INK, letterSpacing: "-0.01em" }}>
                    Collaborators
                    <Typography component="span" sx={{ fontSize: "0.6875rem", fontWeight: 500, color: SHELL_MUTED, ml: 0.75 }}>
                      Optional
                    </Typography>
                  </Typography>
                </Stack>
                {collaborators.length > 0 ? (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75, mb: 1.25 }}>
                    {collaborators.map((email) => (
                      <Chip
                        key={email}
                        label={email}
                        size="small"
                        onDelete={() => setCollaborators((prev) => prev.filter((e) => e !== email))}
                        disabled={publishing}
                        sx={{
                          borderRadius: "8px",
                          fontWeight: 600,
                          fontSize: "0.75rem",
                          bgcolor: "rgba(248,114,58,0.08)",
                          color: SHELL_INK,
                          "& .MuiChip-deleteIcon": { color: SHELL_MUTED, fontSize: 16, "&:hover": { color: SHELL_INK } },
                        }}
                      />
                    ))}
                  </Box>
                ) : null}
                <TextField
                  placeholder="name@company.com"
                  value={collaboratorInput}
                  onChange={(e) => setCollaboratorInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === ",") {
                      e.preventDefault();
                      const val = collaboratorInput.trim().replace(/,$/, "");
                      if (val && val.includes("@") && !collaborators.includes(val)) {
                        setCollaborators((prev) => [...prev, val]);
                        setCollaboratorInput("");
                      }
                    }
                  }}
                  disabled={publishing}
                  fullWidth
                  size="small"
                  sx={fieldSx}
                />
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 5 }}>
              <Box
                sx={{
                  borderRadius: "16px",
                  border: "1px solid rgba(220,212,202,0.42)",
                  bgcolor: "rgba(248,246,243,0.65)",
                  p: { xs: 2, md: 2.5 },
                  height: "100%",
                  animation: "reviewFadeUp 0.35s ease-out 0.2s both",
                }}
              >
                <Stack direction="row" spacing={0.75} alignItems="flex-start" sx={{ mb: 1 }}>
                  <InfoOutlinedIcon sx={{ fontSize: 18, color: SHELL_PRIMARY, opacity: 0.85, mt: 0.15, flexShrink: 0 }} />
                  <Typography sx={{ fontSize: "0.75rem", fontWeight: 700, color: SHELL_INK, letterSpacing: "-0.01em", lineHeight: 1.35 }}>
                    Listing period
                  </Typography>
                </Stack>
                <Typography sx={{ fontSize: "0.8125rem", fontWeight: 500, color: SHELL_INK, lineHeight: 1.55, pl: { xs: 0, sm: 3.25 } }}>
                  This job stays live for{" "}
                  <Typography component="span" sx={{ fontWeight: 700, color: SHELL_INK }}>
                    30 days
                  </Typography>{" "}
                  from the date you publish it. After that, you will need to publish it again for candidates to see it.
                </Typography>
              </Box>
            </Grid>
          </Grid>

          {/* ── Actions ── */}
          <Stack
            direction={{ xs: "column-reverse", sm: "row" }}
            spacing={1.25}
            alignItems={{ xs: "stretch", sm: "center" }}
            justifyContent="space-between"
            sx={{
              pt: { xs: 1.5, sm: 1.75 },
              borderTop: "1px solid rgba(220,212,202,0.38)",
              animation: "reviewFadeUp 0.35s ease-out 0.24s both",
            }}
          >
            <Button
              variant="text"
              size="medium"
              startIcon={<ArrowBackRoundedIcon sx={{ fontSize: "18px !important" }} />}
              onClick={() => setPhase("profile")}
              sx={{
                alignSelf: { xs: "flex-start", sm: "center" },
                textTransform: "none",
                fontWeight: 600,
                fontSize: "0.875rem",
                color: SHELL_MUTED,
                px: 0.75,
                "&:hover": { color: SHELL_INK, bgcolor: "rgba(0,0,0,0.04)" },
              }}
            >
              Back
            </Button>
            <Stack direction="row" spacing={1.25}>
              <Button
                variant="outlined"
                size="medium"
                startIcon={<SaveOutlinedIcon sx={{ fontSize: "18px !important" }} />}
                disabled={publishing}
                onClick={() => {
                  setSnackbar({ open: true, message: `\u201c${jobTitle || "Job"}\u201d saved as draft.` });
                }}
                sx={{
                  borderRadius: "10px",
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  px: 2.25,
                  py: 1,
                  borderColor: "rgba(220,212,202,0.6)",
                  color: SHELL_MUTED,
                  "&:hover": { borderColor: SHELL_INK, color: SHELL_INK, bgcolor: "rgba(0,0,0,0.02)" },
                }}
              >
                Save as draft
              </Button>
              <Button
                variant="contained"
                size="medium"
                startIcon={
                  publishing ? (
                    <CircularProgress size={16} sx={{ color: "#fff" }} />
                  ) : (
                    <RocketLaunchRoundedIcon sx={{ fontSize: "18px !important" }} />
                  )
                }
                disabled={publishing}
                onClick={() => {
                  setPublishing(true);
                  setTimeout(() => {
                    setPublishing(false);
                    setSnackbar({
                      open: true,
                      message: `${jobTitle || "Job"} is now live!${collaborators.length ? ` Collaborators notified: ${collaborators.join(", ")}.` : ""}`,
                    });
                  }, 1800);
                }}
                sx={{
                  borderRadius: "10px",
                  textTransform: "none",
                  fontWeight: 700,
                  fontSize: "0.875rem",
                  px: 3,
                  py: 1,
                  minWidth: 160,
                  boxShadow: publishing ? "none" : "0 8px 20px rgba(248,114,58,0.22)",
                  "&:hover": { boxShadow: "0 10px 24px rgba(248,114,58,0.28)" },
                }}
              >
                {publishing ? "Publishing\u2026" : "Publish"}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Box>
    );
  }

  return (
    <>
      <RecruiterAppShell activeNav="jobs" onNav={handleNav} onSignOut={onExit}>
        {body}
      </RecruiterAppShell>

      <Dialog
        open={importDialogOpen}
        onClose={() => {
          if (importExtracting) return;
          closeImportDialog();
        }}
        disableEscapeKeyDown={importExtracting}
        maxWidth="md"
        fullWidth
        sx={{ zIndex: 1600 }}
        slotProps={{
          backdrop: {
            sx: {
              backgroundColor: "rgba(29, 26, 23, 0.35)",
              backdropFilter: "blur(6px)",
            },
          },
        }}
        PaperProps={{
          elevation: 0,
          sx: {
            maxWidth: "665px",
            width: "665px",
            borderRadius: "20px",
            border: "1px solid rgba(220, 212, 202, 0.55)",
            boxShadow: "0 24px 64px rgba(18, 10, 4, 0.12), 0 0 0 1px rgba(255,255,255,0.8) inset",
            overflow: "visible",
          },
        }}
      >
        <DialogTitle
          id="career-import-dialog-title"
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 1.5,
            pb: importExtracting ? { xs: 1.5, sm: 1.75 } : { xs: 2.5, sm: 3.25 },
            pt: importExtracting ? { xs: 2.25, sm: 2.5 } : { xs: 3, sm: 3.5 },
            px: { xs: 2.5, sm: 4 },
          }}
        >
          <Box sx={{ minWidth: 0, pr: 1 }}>
            <Typography
              component="span"
              sx={{
                ...type.pageH1,
                display: "block",
                mb: importExtracting ? 0 : 1,
              }}
            >
              Import from career page
            </Typography>
            {!importExtracting ? (
              <Typography sx={{ ...type.lead, fontSize: "0.8125rem", lineHeight: 1.55 }}>
                Paste a public job posting URL. We extract the description and structured fields for you to review.
              </Typography>
            ) : null}
          </Box>
          <IconButton
            aria-label="Close"
            onClick={() => {
              if (importExtracting) return;
              closeImportDialog();
            }}
            disabled={importExtracting}
            size="small"
            sx={{
              color: SHELL_MUTED,
              mt: -0.5,
              "&:hover": { bgcolor: "rgba(0,0,0,0.05)", color: SHELL_INK },
            }}
          >
            <CloseRoundedIcon sx={{ fontSize: 22 }} />
          </IconButton>
        </DialogTitle>
        <DialogContent
          sx={{
            px: { xs: 2.5, sm: 4 },
            pb: importExtracting ? { xs: 2.25, sm: 2.5 } : { xs: 3, sm: 3.5 },
            pt: importExtracting ? { xs: 1.5, sm: 1.75 } : { xs: 3.25, sm: 3.75 },
            overflow: "visible",
          }}
        >
          {!importExtracting ? (
            <Stack spacing={2.5}>
              <TextField
                label="Job posting URL"
                placeholder="https://careers.example.com/jobs/role-id"
                value={careerPageUrl}
                onChange={(e) => {
                  setCareerPageUrl(e.target.value);
                  setCareerTouched(false);
                }}
                error={careerTouched && !isPlausibleUrl(careerPageUrl)}
                helperText={
                  careerTouched && !isPlausibleUrl(careerPageUrl)
                    ? "Enter a valid URL (http:// or https://)."
                    : undefined
                }
                fullWidth
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <LanguageRoundedIcon sx={{ fontSize: 20, color: SHELL_MUTED }} />
                      </InputAdornment>
                    ),
                  },
                }}
                sx={fieldSx}
              />

              <Stack direction="row" justifyContent="flex-end">
                <Button
                  variant="contained"
                  onClick={handleContinueCareerImport}
                  disabled={!careerPageUrl.trim()}
                  sx={{
                    px: 3,
                    py: 1.15,
                    borderRadius: "10px",
                    fontWeight: 700,
                    fontSize: "0.875rem",
                    textTransform: "none",
                    boxShadow: "0 8px 20px rgba(248, 114, 58, 0.22)",
                    minWidth: 148,
                  }}
                >
                  Extract details
                </Button>
              </Stack>
            </Stack>
          ) : null}

          {importExtracting ? (
            <Box
              sx={{
                position: "relative",
                textAlign: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: "0.6875rem",
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  color: SHELL_MUTED,
                  mb: 0.75,
                }}
              >
                Step {importStepIndex + 1} of {IMPORT_EXTRACTION_STEPS.length}
              </Typography>
              <CircularProgress
                aria-hidden
                size={22}
                thickness={4}
                sx={{
                  display: "block",
                  mx: "auto",
                  mb: 1,
                  color: SHELL_PRIMARY,
                  animationDuration: "2.75s",
                  "& .MuiCircularProgress-circle": {
                    animationDuration: "2.75s",
                  },
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  minHeight: 44,
                  mb: 1.5,
                }}
              >
                <SwitchTransition mode="out-in">
                  <Fade key={importStepIndex} timeout={340} unmountOnExit>
                    <Typography
                      component="div"
                      aria-live="polite"
                      aria-atomic="true"
                      sx={{
                        fontSize: "0.9375rem",
                        lineHeight: 1.45,
                        fontWeight: 600,
                        color: SHELL_INK,
                        textAlign: "center",
                        maxWidth: "100%",
                      }}
                    >
                      {IMPORT_EXTRACTION_STEPS[importStepIndex]}
                    </Typography>
                  </Fade>
                </SwitchTransition>
              </Box>
              <LinearProgress
                variant="determinate"
                value={((importStepIndex + 1) / IMPORT_EXTRACTION_STEPS.length) * 100}
                sx={{
                  height: 5,
                  borderRadius: 4,
                  bgcolor: "rgba(248, 114, 58, 0.1)",
                  "& .MuiLinearProgress-bar": {
                    borderRadius: 4,
                    bgcolor: SHELL_PRIMARY,
                    transition: "transform 0.55s ease",
                  },
                }}
              />
            </Box>
          ) : null}
        </DialogContent>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={5200}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        sx={{ zIndex: 2000 }}
        message={snackbar.message}
      />
    </>
  );
}
