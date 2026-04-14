import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip as RechartsTooltip, BarChart, Bar, Legend,
} from "recharts";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Chip,
  Collapse,
  Divider,
  IconButton,
  InputAdornment,
  InputBase,
  Menu,
  MenuItem,
  Select,
  Slider,
  Stack,
  Tab,
  Tabs,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined";
import BrushOutlinedIcon from "@mui/icons-material/BrushOutlined";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import RocketLaunchOutlinedIcon from "@mui/icons-material/RocketLaunchOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import SwapVertRoundedIcon from "@mui/icons-material/SwapVertRounded";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import LockOpenRoundedIcon from "@mui/icons-material/LockOpenRounded";
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import GraphicEqRoundedIcon from "@mui/icons-material/GraphicEqRounded";
import GraphicEqOutlinedIcon from "@mui/icons-material/GraphicEqOutlined";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import WorkHistoryOutlinedIcon from "@mui/icons-material/WorkHistoryOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import RecruiterAppShell, {
  SHELL_INK,
  SHELL_MUTED,
  SHELL_PRIMARY,
} from "./RecruiterAppShell";
import RecruiterSettingsPanel from "./RecruiterSettingsPanel";

/** Star for quick reference (not a pipeline stage): orange outline, yellow when active. */
const SHORTLIST_STAR_ACTIVE = "#EAB308";

const DOMAIN_THEMES = {
  Engineering: { Icon: CodeOutlinedIcon, bg: "#EFF6FF", accent: "#3B82F6", border: "#BFDBFE" },
  Design: { Icon: BrushOutlinedIcon, bg: "#FDF2F8", accent: "#EC4899", border: "#FBCFE8" },
  Marketing: { Icon: CampaignOutlinedIcon, bg: "#ECFDF5", accent: "#10B981", border: "#A7F3D0" },
  Product: { Icon: StorefrontOutlinedIcon, bg: "#FFF7ED", accent: "#F97316", border: "#FED7AA" },
  Analytics: { Icon: BarChartOutlinedIcon, bg: "#F5F3FF", accent: "#8B5CF6", border: "#DDD6FE" },
  "Customer Success": { Icon: SupportAgentOutlinedIcon, bg: "#F0FDFA", accent: "#14B8A6", border: "#99F6E4" },
  "HR / People": { Icon: ManageAccountsOutlinedIcon, bg: "#FEF9C3", accent: "#CA8A04", border: "#FDE68A" },
  Finance: { Icon: AccountBalanceOutlinedIcon, bg: "#F1F5F9", accent: "#64748B", border: "#CBD5E1" },
  Sales: { Icon: TrendingUpOutlinedIcon, bg: "#FFF1F2", accent: "#F43F5E", border: "#FECDD3" },
  Operations: { Icon: SettingsOutlinedIcon, bg: "#F0F9FF", accent: "#0EA5E9", border: "#BAE6FD" },
};
const DEFAULT_THEME = { Icon: WorkOutlineOutlinedIcon, bg: "#F8F6F3", accent: SHELL_PRIMARY, border: "#E8E0D8" };

/** Inline label inside compact job stat pills (single row, no extra row height). */
const JOB_STAT_PILL_LABEL_SX = {
  fontSize: "0.625rem",
  fontWeight: 700,
  color: SHELL_MUTED,
  letterSpacing: "0.02em",
  lineHeight: 1,
};

const JOB_STAT_PILL_ROW_SX = {
  display: "inline-flex",
  alignItems: "center",
  flexWrap: "nowrap",
  gap: 0.4,
  borderRadius: "99px",
  border: "1px solid",
  boxSizing: "border-box",
  whiteSpace: "nowrap",
};

/** Desktop `job-row-data` pills: same min height and padding as peers. */
const JOB_ROW_STAT_PILL_FRAME_SX = {
  px: "12px",
  py: "5px",
  minHeight: 36,
};

/** Compact job card stat pills: match job-row pill height and padding. */
const JOB_CARD_STAT_PILL_FRAME_SX = {
  px: "12px",
  py: "5px",
  minHeight: 36,
};

function aiMatchesBadgeAriaLabel(job) {
  const total = job.matches ?? 0;
  const fresh = job.newMatches24h ?? 0;
  if (fresh > 0) {
    return `Total ${total} AI matches; ${fresh} new in the last 24 hours`;
  }
  return `Total ${total} AI matches recommended by ZappyFind`;
}

function aiMatchesBadgeTooltipTitle(job) {
  const total = job.matches ?? 0;
  const fresh = job.newMatches24h ?? 0;
  if (fresh > 0) {
    return `${total} AI-ranked matches, including ${fresh} new in the last 24 hours`;
  }
  return "Total number of matching candidates recommended by ZappyFind";
}

/** Visible copy only. Aria and tooltips still describe the rolling 24 hour window. */
function aiMatchesNewRelativeLabel(fresh) {
  const n = fresh ?? 0;
  if (n <= 0) return "";
  return `+${n} since yesterday`;
}

function getDomainTheme(dept) {
  return DOMAIN_THEMES[dept] || DEFAULT_THEME;
}

const SAMPLE_JOBS = [
  { id: 1, title: "Senior Product Manager", dept: "Product", location: "San Francisco, CA", status: "active", matches: 42, newMatches24h: 5, unlocked: 8, applied: 14, posted: "5 days ago", appliedToday: 3, appliedThisWeek: 9, newMatchesThisWeek: 12, responseRate: 68, avgDaysToHire: 22, pipelineHealth: "strong", topSource: "Referral", contacted: 18, interviewing: 4, shortlisted: 6 },
  { id: 2, title: "UX Designer", dept: "Design", location: "Remote", status: "active", matches: 67, newMatches24h: 12, unlocked: 15, applied: 23, posted: "2 weeks ago", appliedToday: 5, appliedThisWeek: 14, newMatchesThisWeek: 28, responseRate: 72, avgDaysToHire: 18, pipelineHealth: "strong", topSource: "LinkedIn", contacted: 30, interviewing: 7, shortlisted: 10 },
  { id: 3, title: "Backend Engineer", dept: "Engineering", location: "New York, NY", status: "active", matches: 89, newMatches24h: 3, unlocked: 22, applied: 41, posted: "1 month ago", appliedToday: 1, appliedThisWeek: 6, newMatchesThisWeek: 8, responseRate: 54, avgDaysToHire: 31, pipelineHealth: "moderate", topSource: "Job Board", contacted: 35, interviewing: 9, shortlisted: 14 },
  { id: 4, title: "Growth Marketing Lead", dept: "Marketing", location: "Austin, TX", status: "active", matches: 31, newMatches24h: 8, unlocked: 4, applied: 9, posted: "3 days ago", appliedToday: 4, appliedThisWeek: 9, newMatchesThisWeek: 18, responseRate: 82, avgDaysToHire: 14, pipelineHealth: "strong", topSource: "Referral", contacted: 12, interviewing: 2, shortlisted: 3 },
  {
    id: 5,
    title: "Data Analyst",
    dept: "Analytics",
    location: "Chicago, IL",
    status: "closed",
    matches: 56,
    newMatches24h: 0,
    unlocked: 18,
    applied: 32,
    posted: "1 week ago",
    closedAt: "2 days ago",
    closedBy: "Priya Sharma",
    closedOn: "8 Apr 2026, 14:34",
    appliedToday: 0, appliedThisWeek: 0, newMatchesThisWeek: 0, responseRate: 61, avgDaysToHire: 26, pipelineHealth: "closed", topSource: "Job Board", contacted: 28, interviewing: 6, shortlisted: 8,
  },
  { id: 6, title: "Marketing Manager", dept: "Marketing", location: "Austin, TX", status: "draft", matches: 0, newMatches24h: 0, unlocked: 0, applied: 0, posted: "" },
  { id: 7, title: "Customer Success Lead", dept: "Customer Success", location: "Remote", status: "active", matches: 24, newMatches24h: 6, unlocked: 3, applied: 7, posted: "1 week ago", appliedToday: 2, appliedThisWeek: 5, newMatchesThisWeek: 14, responseRate: 76, avgDaysToHire: 19, pipelineHealth: "moderate", topSource: "LinkedIn", contacted: 10, interviewing: 3, shortlisted: 4 },
  { id: 8, title: "Frontend Engineer", dept: "Engineering", location: "Remote", status: "draft", matches: 0, newMatches24h: 0, unlocked: 0, applied: 0, posted: "" },
  {
    id: 9,
    title: "Sales Director",
    dept: "Sales",
    location: "New York, NY",
    status: "closed",
    matches: 38,
    newMatches24h: 0,
    unlocked: 12,
    applied: 19,
    posted: "2 months ago",
    closedAt: "1 week ago",
    closedBy: "Alex Chen",
    closedOn: "29th Mar 2026",
    appliedToday: 0, appliedThisWeek: 0, newMatchesThisWeek: 0, responseRate: 58, avgDaysToHire: 34, pipelineHealth: "closed", topSource: "Referral", contacted: 22, interviewing: 5, shortlisted: 7,
  },
  { id: 10, title: "Senior Data Engineer", dept: "Engineering", location: "Remote", status: "draft", matches: 0, posted: "" },
  { id: 11, title: "Technical Recruiter", dept: "HR / People", location: "San Francisco, CA", status: "draft", matches: 0, posted: "" },
  { id: 12, title: "Product Designer II", dept: "Design", location: "New York, NY", status: "draft", matches: 0, posted: "" },
  { id: 13, title: "Demand Generation Manager", dept: "Marketing", location: "Chicago, IL", status: "draft", matches: 0, posted: "" },
  { id: 14, title: "RevOps Analyst", dept: "Operations", location: "Austin, TX", status: "draft", matches: 0, posted: "" },
  { id: 15, title: "Account Executive", dept: "Sales", location: "Remote", status: "draft", matches: 0, posted: "" },
  { id: 16, title: "Finance Manager", dept: "Finance", location: "Boston, MA", status: "draft", matches: 0, posted: "" },
  { id: 17, title: "Machine Learning Engineer", dept: "Engineering", location: "Seattle, WA", status: "draft", matches: 0, posted: "" },
  { id: 18, title: "Content Strategist", dept: "Marketing", location: "Remote", status: "draft", matches: 0, posted: "" },
  { id: 19, title: "Product Operations Manager", dept: "Product", location: "Denver, CO", status: "draft", matches: 0, posted: "" },
  { id: 20, title: "UI Designer", dept: "Design", location: "Los Angeles, CA", status: "draft", matches: 0, posted: "" },
  { id: 21, title: "Customer Success Manager", dept: "Customer Success", location: "Remote", status: "draft", matches: 0, posted: "" },
  { id: 22, title: "People Operations Specialist", dept: "HR / People", location: "Atlanta, GA", status: "draft", matches: 0, posted: "" },
  { id: 23, title: "Growth Product Manager", dept: "Product", location: "Austin, TX", status: "draft", matches: 0, posted: "" },
  { id: 24, title: "Security Engineer", dept: "Engineering", location: "Remote", status: "draft", matches: 0, posted: "" },
  { id: 25, title: "Business Analyst", dept: "Analytics", location: "Chicago, IL", status: "draft", matches: 0, posted: "" },
  { id: 26, title: "Partnerships Manager", dept: "Sales", location: "New York, NY", status: "draft", matches: 0, posted: "" },
  { id: 27, title: "Lifecycle Marketing Manager", dept: "Marketing", location: "Remote", status: "draft", matches: 0, posted: "" },
  { id: 28, title: "QA Automation Engineer", dept: "Engineering", location: "Toronto, ON", status: "draft", matches: 0, posted: "" },
  { id: 29, title: "Office Operations Lead", dept: "Operations", location: "San Diego, CA", status: "draft", matches: 0, posted: "" },
];

const TABS = [
  { key: "active", label: "Active" },
  { key: "draft", label: "Drafts" },
  { key: "closed", label: "Closed" },
];

const STATUS_CHIP = {
  active: { label: "Active", bg: "rgba(22,163,74,0.08)", color: "#16a34a", border: "rgba(22,163,74,0.2)" },
  draft: { label: "Draft", bg: "rgba(202,138,4,0.08)", color: "#b45309", border: "rgba(202,138,4,0.22)" },
  closed: { label: "Closed", bg: "rgba(100,116,139,0.08)", color: "#64748b", border: "rgba(100,116,139,0.2)" },
};

function JobClosedDetailsTooltip({ job }) {
  return (
    <Stack spacing={0.5} sx={{ py: 0.15 }}>
      <Typography sx={{ fontSize: "0.75rem", fontWeight: 700, lineHeight: 1.35 }}>Closure details</Typography>
      <Typography sx={{ fontSize: "0.6875rem", lineHeight: 1.45, fontWeight: 500 }}>
        Closed by{" "}
        <Box component="span" sx={{ fontWeight: 700 }}>
          {job.closedBy ?? "—"}
        </Box>
      </Typography>
      <Typography sx={{ fontSize: "0.6875rem", lineHeight: 1.45, opacity: 0.92 }}>
        {job.closedOn ?? job.closedAt ?? "—"}
      </Typography>
    </Stack>
  );
}

const AVATAR_COLORS = ["#F8723A", "#3B82F6", "#10B981", "#8B5CF6", "#EC4899", "#14B8A6", "#F97316", "#6366F1", "#0EA5E9", "#F43F5E"];
function getAvatarColor(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}
function getMatchColor(score) {
  if (score >= 85) return "#16a34a";
  if (score >= 78) return "#b45309";
  if (score >= 70) return "#475569";
  return "#6B635C";
}
function getMatchLabel(score) {
  if (score >= 85) return "Strong Match";
  if (score >= 78) return "Good Match";
  if (score >= 70) return "Moderate Match";
  return "Potential";
}

/** Matches IcpInsightBlock: explicit icpGroup overrides tier level for must-have. */
function isIcpMustHaveComp(c) {
  if (c?.icpGroup === "must-have") return true;
  if (c?.icpGroup === "nice-to-have") return false;
  return c?.level === "High";
}

const JOB_DETAILS = {
  1: {
    experienceRange: "5–8 years",
    workMode: "Hybrid",
    competencies: [{ name: "Ownership", level: "High" }, { name: "Problem Solving", level: "High" }, { name: "Execution", level: "High" }, { name: "Communication", level: "Low" }, { name: "Collaboration", level: "Low" }, { name: "Adaptability", level: "Low" }],
    description:
      "We are looking for a senior product leader who can own outcomes end to end in a fast-moving environment. You will partner with design and engineering to set direction, prioritize ruthlessly, and ship measurable impact for customers.\n\nYou should be comfortable operating with incomplete information, aligning stakeholders, and turning strategy into concrete roadmaps. Experience with B2B SaaS and cross-functional leadership is strongly preferred.",
  },
  2: {
    experienceRange: "3–6 years",
    workMode: "Remote",
    competencies: [{ name: "Visual Design", level: "High" }, { name: "User Research", level: "High" }, { name: "Prototyping", level: "High" }, { name: "Collaboration", level: "Low" }, { name: "Systems Thinking", level: "Low" }, { name: "Communication", level: "Low" }],
    description:
      "Join our design org to craft thoughtful, accessible experiences used by teams every day. You will own flows from discovery through delivery, partnering closely with product and research.\n\nWe value systems-minded designers who can prototype quickly, validate with users, and evolve our design language over time. A portfolio that shows end-to-end product work is essential.",
  },
  3: {
    experienceRange: "4–8 years",
    workMode: "Hybrid",
    competencies: [{ name: "Technical Depth", level: "High" }, { name: "System Design", level: "High" }, { name: "Code Quality", level: "High" }, { name: "Problem Solving", level: "Low" }, { name: "Collaboration", level: "Low" }, { name: "Execution", level: "Low" }],
    description:
      "Build and scale the services that power our core product. You will design APIs, improve reliability, and mentor others on best practices for testing and observability.\n\nWe need someone who enjoys deep technical work but also communicates clearly with partners outside engineering. Experience with high-traffic distributed systems is a plus.",
  },
  4: {
    experienceRange: "5–7 years",
    workMode: "On-site",
    competencies: [
      { name: "Strategy", level: "High" },
      { name: "Analytics", level: "High" },
      { name: "Experimentation Design", level: "High" },
      { name: "Channel Performance", level: "High" },
      { name: "Growth Forecasting", level: "High" },
      { name: "Creativity", level: "Low" },
      { name: "Execution", level: "Low" },
      { name: "Communication", level: "Low" },
      { name: "Adaptability", level: "Low" },
    ],
    description:
      "Lead our growth marketing efforts across acquisition and lifecycle. You will own experimentation, channel strategy, and reporting to leadership on what moves the needle.\n\nThe ideal candidate blends analytical rigor with creative instinct, and knows how to work with sales and product to align on goals. Hands-on experience with modern marketing stacks is expected.",
  },
  7: {
    experienceRange: "3–6 years",
    workMode: "Remote",
    competencies: [
      { name: "Empathy", level: "High" },
      { name: "Communication", level: "High" },
      { name: "Stakeholder Management", level: "Low", icpGroup: "must-have" },
      { name: "Executive Presence", level: "Low", icpGroup: "must-have" },
      { name: "Product Knowledge", level: "Low" },
      { name: "Relationship Building", level: "Low" },
      { name: "Problem Solving", level: "Low" },
      { name: "Execution", level: "Low" },
    ],
    description:
      "We are seeking a Customer Success Lead to own a portfolio of strategic accounts and drive measurable customer outcomes across onboarding, adoption, expansion readiness, and long-term retention.\n\nIn this role, you will serve as the primary strategic partner for your accounts. You will run success planning sessions, align executive stakeholders on business goals, and build clear milestone-based action plans that connect product usage to customer value. You will proactively identify risk signals, orchestrate mitigation plans, and partner with Support, Product, and Solutions teams when escalations require cross-functional coordination.\n\nYou will also lead high-impact moments in the customer lifecycle: implementation handoffs, adoption workshops, quarterly business reviews, renewal readiness, and expansion discovery. Strong candidates know how to influence without authority, create clarity in ambiguous situations, and communicate confidently with both practitioners and senior leaders.\n\nWhat success looks like in the first 90 days:\n- Build trusted relationships with key stakeholders across your assigned accounts.\n- Establish account success plans with clear success metrics and owners.\n- Improve product adoption health and reduce preventable support friction.\n- Create a consistent QBR cadence that drives strategic alignment.\n\nRequirements:\n- 3-6 years in Customer Success, Account Management, or a similar customer-facing SaaS role.\n- Experience managing mid-market or enterprise customer portfolios.\n- Strong written and verbal communication with excellent meeting facilitation.\n- Ability to interpret product usage data and translate it into action.\n- Proven collaboration with Product, Support, and Sales teams.\n\nNice to have:\n- Experience in high-velocity B2B SaaS environments.\n- Exposure to renewal and expansion motions.\n- Familiarity with CS tooling (Gainsight, HubSpot, Salesforce, or similar).\n\nIf you enjoy being close to customers, solving high-stakes problems, and turning feedback into strategic action, this role offers strong ownership and visible impact.",
  },
  5: {
    experienceRange: "2–5 years",
    workMode: "Hybrid",
    competencies: [{ name: "Statistical Analysis", level: "High" }, { name: "Data Modeling", level: "High" }, { name: "Communication", level: "Low" }, { name: "Problem Solving", level: "Low" }, { name: "Tools Proficiency", level: "Low" }, { name: "Business Acumen", level: "Low" }],
    description:
      "Turn complex data into decisions the business can trust. You will own recurring reporting, ad hoc analyses, and collaboration with stakeholders to define metrics that matter.\n\nStrong SQL, experimentation basics, and the ability to explain uncertainty without jargon are key. Experience partnering with product or finance teams is a plus.",
  },
  9: {
    experienceRange: "8–12 years",
    workMode: "On-site",
    competencies: [{ name: "Negotiation", level: "High" }, { name: "Relationship Building", level: "High" }, { name: "Strategy", level: "High" }, { name: "Communication", level: "Low" }, { name: "Execution", level: "Low" }, { name: "Resilience", level: "Low" }],
    description:
      "Lead enterprise sales in a competitive market. You will own territory strategy, executive relationships, and forecast accuracy while coaching others on the team.\n\nWe need a proven closer who still invests in process and who can navigate long cycles with patience. Experience selling into complex buying committees is required.",
  },
};

function formatRoleContextLine(job, details) {
  const dept = job.dept;
  const exp = details.experienceRange;
  const loc = (job.location || "").trim();
  const wm = (details.workMode || "").trim();
  const locLower = loc.toLowerCase();
  const wmLower = wm.toLowerCase();
  let place = "";
  if (locLower === "remote" && wmLower === "remote") place = "Fully remote";
  else if (locLower === "remote") place = wm;
  else if (wmLower === "remote") place = `${loc} · Remote`;
  else place = `${loc} · ${wm}`;
  const posted = job.posted ? ` · Posted ${job.posted}` : "";
  return `${dept} · ${place} · ${exp}${posted}`;
}


const MOCK_CANDIDATES = {
  1: [
    { id: 101, firstName: "James", lastName: "Chen", locked: false, source: "applied", role: "Senior Product Manager", company: "TechCorp", yearsExp: 7, location: "San Francisco, CA", matchScore: 92, email: "james.chen@email.com", phone: "(415) 555-0123", aiReason: "7 years leading cross-functional product teams with a strong ownership track record. His 0-to-1 launches at TechCorp directly align with your execution and problem-solving bar.", competencies: [{ name: "Problem Solving", score: 88 }, { name: "Ownership", score: 94 }, { name: "Execution", score: 91 }, { name: "Communication", score: 85 }, { name: "Collaboration", score: 87 }] },
    { id: 102, firstName: "Sarah", lastName: "Robinson", locked: true, source: "recommended", role: "Product Lead", company: "InnovateCo", yearsExp: 8, location: "Remote", matchScore: 88, email: "sarah.r@email.com", phone: "(628) 555-0456", aiReason: "Scaled product org from 5 to 20 at a Series B startup, demonstrating the ownership and collaboration this role demands. Her user-centric decision framework scores high on problem solving.", competencies: [{ name: "Problem Solving", score: 89 }, { name: "Ownership", score: 91 }, { name: "Execution", score: 85 }, { name: "Communication", score: 88 }, { name: "Collaboration", score: 90 }] },
    { id: 103, firstName: "Michael", lastName: "Torres", locked: true, source: "recommended", role: "Group Product Manager", company: "ScaleAI", yearsExp: 9, location: "San Francisco, CA", matchScore: 86, email: "m.torres@email.com", phone: "(510) 555-0789", aiReason: "Managed a $12M product P&L with 3 direct PM reports. His execution velocity and data-informed approach are a strong fit for your high-ownership culture.", competencies: [{ name: "Problem Solving", score: 84 }, { name: "Ownership", score: 90 }, { name: "Execution", score: 88 }, { name: "Communication", score: 80 }, { name: "Collaboration", score: 82 }] },
    { id: 104, firstName: "Priya", lastName: "Sharma", locked: true, source: "applied", role: "Senior PM", company: "Dropbox", yearsExp: 6, location: "San Francisco, CA", matchScore: 84, email: "priya.s@email.com", phone: "(408) 555-0321", aiReason: "Led the enterprise collaboration suite used by 50K+ teams. Her communication scores are exceptional, and she brings strong cross-functional execution experience.", competencies: [{ name: "Problem Solving", score: 82 }, { name: "Ownership", score: 85 }, { name: "Execution", score: 83 }, { name: "Communication", score: 92 }, { name: "Collaboration", score: 86 }] },
    { id: 105, firstName: "David", lastName: "Kim", locked: true, source: "recommended", role: "Product Manager", company: "Stripe", yearsExp: 5, location: "New York, NY", matchScore: 81, email: "d.kim@email.com", phone: "(212) 555-0654", aiReason: "Built Stripe's merchant analytics dashboard from scratch. Strong technical depth combined with clear stakeholder communication makes him a well-rounded PM candidate.", competencies: [{ name: "Problem Solving", score: 86 }, { name: "Ownership", score: 79 }, { name: "Execution", score: 82 }, { name: "Communication", score: 81 }, { name: "Collaboration", score: 78 }] },
    { id: 106, firstName: "Emily", lastName: "Watson", locked: true, source: "applied", role: "Senior Product Manager", company: "Figma", yearsExp: 6, location: "Remote", matchScore: 79, email: "e.watson@email.com", phone: "(415) 555-0987", aiReason: "Deep expertise in design-tool workflows. Her collaborative approach to product discovery and strong execution on FigJam positioned it as a standalone product line.", competencies: [{ name: "Problem Solving", score: 80 }, { name: "Ownership", score: 78 }, { name: "Execution", score: 81 }, { name: "Communication", score: 84 }, { name: "Collaboration", score: 82 }] },
  ],
  2: [
    { id: 201, firstName: "Zoe", lastName: "Park", locked: false, source: "recommended", role: "Senior UX Designer", company: "Airbnb", yearsExp: 5, location: "San Francisco, CA", matchScore: 94, email: "zoe.park@email.com", phone: "(415) 555-1001", aiReason: "Led Airbnb's checkout redesign that improved conversion by 18%. Her research-driven design process and systems thinking are exactly what this role needs.", competencies: [{ name: "Visual Design", score: 92 }, { name: "User Research", score: 95 }, { name: "Prototyping", score: 90 }, { name: "Systems Thinking", score: 88 }, { name: "Accessibility", score: 91 }] },
    { id: 202, firstName: "Marcus", lastName: "Johnson", locked: true, source: "applied", role: "Product Designer", company: "Spotify", yearsExp: 4, location: "Remote", matchScore: 89, email: "marcus.j@email.com", phone: "(720) 555-1002", aiReason: "Redesigned Spotify's playlist creation flow serving 400M+ users. His visual craft and ability to translate research into high-fidelity prototypes is a standout.", competencies: [{ name: "Visual Design", score: 94 }, { name: "User Research", score: 86 }, { name: "Prototyping", score: 91 }, { name: "Systems Thinking", score: 82 }, { name: "Accessibility", score: 84 }] },
    { id: 203, firstName: "Aisha", lastName: "Patel", locked: true, source: "recommended", role: "UX Designer", company: "Notion", yearsExp: 3, location: "New York, NY", matchScore: 85, email: "aisha.p@email.com", phone: "(646) 555-1003", aiReason: "Built Notion's design system from the ground up, demonstrating systems thinking beyond her years. Strong prototyping skills with a user-research-first mindset.", competencies: [{ name: "Visual Design", score: 86 }, { name: "User Research", score: 88 }, { name: "Prototyping", score: 87 }, { name: "Systems Thinking", score: 90 }, { name: "Accessibility", score: 83 }] },
    { id: 204, firstName: "Leo", lastName: "Andersen", locked: true, source: "applied", role: "Senior Designer", company: "Linear", yearsExp: 6, location: "Remote", matchScore: 82, email: "leo.a@email.com", phone: "(503) 555-1004", aiReason: "Crafted Linear's minimalist design language that's become an industry benchmark. His strong visual instincts and rapid prototyping workflow would accelerate your design velocity.", competencies: [{ name: "Visual Design", score: 95 }, { name: "User Research", score: 78 }, { name: "Prototyping", score: 88 }, { name: "Systems Thinking", score: 84 }, { name: "Accessibility", score: 79 }] },
    { id: 205, firstName: "Nina", lastName: "Kowalski", locked: true, source: "recommended", role: "UX/UI Designer", company: "Canva", yearsExp: 4, location: "Remote", matchScore: 78, email: "nina.k@email.com", phone: "(312) 555-1005", aiReason: "Designed Canva's collaborative whiteboard feature end-to-end. Her user research chops and ability to ship polished prototypes quickly make her a strong contender.", competencies: [{ name: "Visual Design", score: 84 }, { name: "User Research", score: 82 }, { name: "Prototyping", score: 80 }, { name: "Systems Thinking", score: 76 }, { name: "Accessibility", score: 77 }] },
  ],
  3: [
    { id: 301, firstName: "Alex", lastName: "Petrov", locked: false, source: "recommended", role: "Staff Engineer", company: "Vercel", yearsExp: 8, location: "Remote", matchScore: 95, email: "alex.p@email.com", phone: "(347) 555-2001", aiReason: "Core contributor to Next.js with deep expertise in distributed systems. His code review standards and architectural decisions at Vercel demonstrate the technical depth and system design mastery you require.", competencies: [{ name: "Technical Depth", score: 96 }, { name: "System Design", score: 93 }, { name: "Code Quality", score: 94 }, { name: "Problem Solving", score: 90 }, { name: "Mentorship", score: 88 }] },
    { id: 302, firstName: "Rachel", lastName: "Liu", locked: true, source: "applied", role: "Senior Backend Engineer", company: "Datadog", yearsExp: 6, location: "New York, NY", matchScore: 91, email: "rachel.l@email.com", phone: "(212) 555-2002", aiReason: "Built Datadog's real-time metrics pipeline processing 10B+ events daily. Her system design instincts and commitment to code quality align perfectly with your engineering standards.", competencies: [{ name: "Technical Depth", score: 90 }, { name: "System Design", score: 92 }, { name: "Code Quality", score: 91 }, { name: "Problem Solving", score: 88 }, { name: "Mentorship", score: 85 }] },
    { id: 303, firstName: "Omar", lastName: "Hassan", locked: true, source: "applied", role: "Backend Engineer", company: "Cloudflare", yearsExp: 5, location: "Austin, TX", matchScore: 87, email: "omar.h@email.com", phone: "(512) 555-2003", aiReason: "Designed Cloudflare's edge caching layer that reduced latency by 40%. Strong problem-solving skills with a focus on reliability and clean, maintainable code.", competencies: [{ name: "Technical Depth", score: 88 }, { name: "System Design", score: 86 }, { name: "Code Quality", score: 89 }, { name: "Problem Solving", score: 85 }, { name: "Mentorship", score: 79 }] },
    { id: 304, firstName: "Tanya", lastName: "Müller", locked: true, source: "recommended", role: "Senior Software Engineer", company: "Shopify", yearsExp: 7, location: "Remote", matchScore: 84, email: "tanya.m@email.com", phone: "(604) 555-2004", aiReason: "Led Shopify's checkout performance team, reducing p99 latency from 2.1s to 800ms. Her pragmatic approach to system design balances technical excellence with shipping velocity.", competencies: [{ name: "Technical Depth", score: 85 }, { name: "System Design", score: 87 }, { name: "Code Quality", score: 83 }, { name: "Problem Solving", score: 86 }, { name: "Mentorship", score: 82 }] },
    { id: 305, firstName: "Ben", lastName: "Nakamura", locked: true, source: "recommended", role: "Backend Developer", company: "Plaid", yearsExp: 4, location: "San Francisco, CA", matchScore: 80, email: "ben.n@email.com", phone: "(415) 555-2005", aiReason: "Architected Plaid's transaction categorization service handling millions of API calls. Solid fundamentals in distributed systems with a bias toward well-tested, documented code.", competencies: [{ name: "Technical Depth", score: 82 }, { name: "System Design", score: 80 }, { name: "Code Quality", score: 84 }, { name: "Problem Solving", score: 81 }, { name: "Mentorship", score: 75 }] },
  ],
  4: [
    { id: 401, firstName: "Jordan", lastName: "Blake", locked: false, source: "applied", role: "Growth Marketing Manager", company: "HubSpot", yearsExp: 6, location: "Austin, TX", matchScore: 90, email: "jordan.b@email.com", phone: "(512) 555-3001", aiReason: "Grew HubSpot's SMB pipeline by 35% through data-driven experimentation. His strategic thinking and analytical rigor are a natural fit for your growth-stage needs.", competencies: [{ name: "Strategy", score: 91 }, { name: "Analytics", score: 89 }, { name: "Creativity", score: 86 }, { name: "Execution", score: 88 }, { name: "Storytelling", score: 84 }] },
    { id: 402, firstName: "Camille", lastName: "Dubois", locked: true, source: "recommended", role: "Senior Growth Lead", company: "Notion", yearsExp: 7, location: "San Francisco, CA", matchScore: 86, email: "camille.d@email.com", phone: "(415) 555-3002", aiReason: "Spearheaded Notion's PLG motion that drove 2M organic signups in 12 months. Her creative campaign instincts paired with deep analytics skills are rare to find together.", competencies: [{ name: "Strategy", score: 88 }, { name: "Analytics", score: 85 }, { name: "Creativity", score: 90 }, { name: "Execution", score: 84 }, { name: "Storytelling", score: 87 }] },
    { id: 403, firstName: "Ryan", lastName: "Okafor", locked: true, source: "applied", role: "Marketing Manager", company: "Lattice", yearsExp: 5, location: "Remote", matchScore: 82, email: "ryan.o@email.com", phone: "(213) 555-3003", aiReason: "Built Lattice's demand gen engine from scratch, achieving 4x pipeline growth in 18 months. Strong execution paired with a strategic, metrics-first approach to campaigns.", competencies: [{ name: "Strategy", score: 84 }, { name: "Analytics", score: 82 }, { name: "Creativity", score: 80 }, { name: "Execution", score: 86 }, { name: "Storytelling", score: 81 }] },
    { id: 404, firstName: "Sophie", lastName: "Lin", locked: true, source: "recommended", role: "Growth Marketer", company: "Canva", yearsExp: 5, location: "Austin, TX", matchScore: 78, email: "sophie.l@email.com", phone: "(737) 555-3004", aiReason: "Managed Canva's international expansion campaigns across 6 markets. Her adaptability and creative problem-solving complement solid analytical foundations.", competencies: [{ name: "Strategy", score: 80 }, { name: "Analytics", score: 78 }, { name: "Creativity", score: 83 }, { name: "Execution", score: 79 }, { name: "Storytelling", score: 76 }] },
  ],
  7: [
    { id: 701, firstName: "Mia", lastName: "Chen", locked: false, source: "recommended", role: "Senior CS Manager", company: "Zendesk", yearsExp: 5, location: "Remote", matchScore: 91, email: "mia.chen@email.com", phone: "(628) 555-4001", aiReason: "Managed a $8M book of business with 97% retention rate. Her empathetic communication style and deep product knowledge make her a natural fit for your customer-first culture.", competencies: [{ name: "Empathy", score: 94 }, { name: "Communication", score: 92 }, { name: "Problem Solving", score: 88 }, { name: "Product Knowledge", score: 90 }, { name: "Adaptability", score: 91 }] },
    { id: 702, firstName: "Tyler", lastName: "Brooks", locked: true, source: "applied", role: "Customer Success Lead", company: "Intercom", yearsExp: 4, location: "Remote", matchScore: 81, email: "tyler.b@email.com", phone: "(503) 555-4002", aiReason: "Reduced churn by 22% through proactive health scoring and strategic outreach. His relationship-building skills and product expertise drive measurable retention outcomes.", competencies: [{ name: "Empathy", score: 88 }, { name: "Communication", score: 90 }, { name: "Problem Solving", score: 84 }, { name: "Product Knowledge", score: 86 }, { name: "Adaptability", score: 83 }] },
    { id: 703, firstName: "Ananya", lastName: "Gupta", locked: false, source: "recommended", role: "CS Manager", company: "Freshworks", yearsExp: 3, location: "Chicago, IL", matchScore: 74, email: "ananya.g@email.com", phone: "(312) 555-4003", aiReason: "Onboarded 120+ enterprise accounts with a 95% time-to-value improvement. Her structured problem-solving and empathetic approach consistently earn top NPS scores.", competencies: [{ name: "Empathy", score: 90 }, { name: "Communication", score: 85 }, { name: "Problem Solving", score: 86 }, { name: "Product Knowledge", score: 82 }, { name: "Adaptability", score: 84 }] },
  ],
  5: [
    { id: 501, firstName: "Kai", lastName: "Yamamoto", locked: false, source: "applied", role: "Senior Data Analyst", company: "Tableau", yearsExp: 4, location: "Seattle, WA", matchScore: 89, email: "kai.y@email.com", phone: "(206) 555-5001", aiReason: "Built self-service analytics dashboards used by 200+ internal stakeholders. His statistical rigor and ability to translate data into actionable business insights stand out.", competencies: [{ name: "Statistical Analysis", score: 91 }, { name: "Data Modeling", score: 88 }, { name: "Communication", score: 85 }, { name: "Problem Solving", score: 87 }, { name: "SQL Fluency", score: 93 }] },
    { id: 502, firstName: "Lena", lastName: "Vogt", locked: true, source: "recommended", role: "Data Analyst", company: "Amplitude", yearsExp: 3, location: "Remote", matchScore: 84, email: "lena.v@email.com", phone: "(720) 555-5002", aiReason: "Designed Amplitude's internal product health framework tracking 50+ metrics. Strong data modeling skills with a knack for clear, executive-level communication.", competencies: [{ name: "Statistical Analysis", score: 86 }, { name: "Data Modeling", score: 85 }, { name: "Communication", score: 82 }, { name: "Problem Solving", score: 84 }, { name: "SQL Fluency", score: 89 }] },
    { id: 503, firstName: "Ravi", lastName: "Kapoor", locked: true, source: "applied", role: "Analytics Lead", company: "Mixpanel", yearsExp: 5, location: "Chicago, IL", matchScore: 81, email: "ravi.k@email.com", phone: "(312) 555-5003", aiReason: "Led a team of 4 analysts delivering weekly business reviews to C-suite. His business acumen and statistical depth make complex data accessible to non-technical stakeholders.", competencies: [{ name: "Statistical Analysis", score: 84 }, { name: "Data Modeling", score: 82 }, { name: "Communication", score: 80 }, { name: "Problem Solving", score: 83 }, { name: "SQL Fluency", score: 86 }] },
  ],
  9: [
    { id: 901, firstName: "Victoria", lastName: "Osei", locked: false, source: "recommended", role: "VP of Sales", company: "Gong", yearsExp: 11, location: "New York, NY", matchScore: 93, email: "v.osei@email.com", phone: "(212) 555-6001", aiReason: "Grew Gong's East Coast revenue from $8M to $42M in 3 years. Her negotiation instincts and strategic account planning are exactly the executive caliber this director role demands.", competencies: [{ name: "Negotiation", score: 95 }, { name: "Relationship Building", score: 92 }, { name: "Strategy", score: 91 }, { name: "Communication", score: 88 }, { name: "Leadership", score: 93 }] },
    { id: 902, firstName: "Marcus", lastName: "Reed", locked: true, source: "applied", role: "Sales Director", company: "Outreach", yearsExp: 9, location: "San Francisco, CA", matchScore: 88, email: "m.reed@email.com", phone: "(415) 555-6002", aiReason: "Built and led a 25-person sales team that consistently exceeded quota by 120%. His ability to build deep relationships while maintaining strategic focus is a key differentiator.", competencies: [{ name: "Negotiation", score: 89 }, { name: "Relationship Building", score: 90 }, { name: "Strategy", score: 86 }, { name: "Communication", score: 85 }, { name: "Leadership", score: 87 }] },
    { id: 903, firstName: "Elena", lastName: "Petrov", locked: true, source: "applied", role: "Regional Sales Director", company: "Salesloft", yearsExp: 10, location: "Chicago, IL", matchScore: 85, email: "elena.p@email.com", phone: "(312) 555-6003", aiReason: "Closed $15M+ in enterprise deals annually with a 40% win rate. Her resilience in complex sales cycles and strategic deal structuring are well-suited to your enterprise motion.", competencies: [{ name: "Negotiation", score: 87 }, { name: "Relationship Building", score: 86 }, { name: "Strategy", score: 88 }, { name: "Communication", score: 83 }, { name: "Leadership", score: 84 }] },
  ],
};

const CANDIDATE_PROFILE = {
  101: {
    noticePeriod: "30 days", qualification: "MBA", expectedSalary: "$180K-$210K",
    experience: [
      { title: "Senior Product Manager", company: "TechCorp", from: "Jan 2021", to: "Present", duration: "4 yrs", location: "San Francisco, CA", mode: "Hybrid" },
      { title: "Product Manager", company: "Atlassian", from: "Mar 2018", to: "Dec 2020", duration: "2 yrs 10mos", location: "San Francisco, CA", mode: "On-site" },
      { title: "Associate Product Manager", company: "LinkedIn", from: "Jun 2016", to: "Feb 2018", duration: "1 yr 9mos", location: "Sunnyvale, CA", mode: "Hybrid" },
    ],
    education: [{ degree: "MBA", institution: "Stanford GSB", year: "2018" }],
  },
  201: {
    noticePeriod: "15 days", qualification: "BDes", expectedSalary: "$145K-$170K",
    experience: [
      { title: "Senior UX Designer", company: "Airbnb", from: "Jun 2022", to: "Present", duration: "2 yrs", location: "San Francisco, CA", mode: "Hybrid" },
      { title: "UX Designer", company: "Figma", from: "Aug 2019", to: "May 2022", duration: "2 yrs 10mos", location: "San Francisco, CA", mode: "Remote" },
      { title: "Product Design Intern", company: "IDEO", from: "Jun 2018", to: "Aug 2018", duration: "3 mos", location: "San Francisco, CA", mode: "On-site" },
    ],
    education: [{ degree: "BDes in Interaction Design", institution: "CCA", year: "2019" }],
  },
  301: {
    noticePeriod: "60 days", qualification: "MS CS", expectedSalary: "$220K-$260K",
    experience: [
      { title: "Staff Engineer", company: "Vercel", from: "Apr 2020", to: "Present", duration: "4 yrs", location: "Remote", mode: "Remote" },
      { title: "Senior Engineer", company: "Stripe", from: "Jan 2017", to: "Mar 2020", duration: "3 yrs 3mos", location: "San Francisco, CA", mode: "On-site" },
      { title: "Software Engineer", company: "Google", from: "Jul 2014", to: "Dec 2016", duration: "2 yrs 6mos", location: "Mountain View, CA", mode: "On-site" },
    ],
    education: [{ degree: "MS in Computer Science", institution: "Carnegie Mellon", year: "2016" }],
  },
  401: {
    noticePeriod: "30 days", qualification: "BA Marketing", expectedSalary: "$140K-$165K",
    experience: [
      { title: "Growth Marketing Manager", company: "HubSpot", from: "Sep 2021", to: "Present", duration: "2 yrs 7mos", location: "Austin, TX", mode: "On-site" },
      { title: "Marketing Specialist", company: "Drift", from: "Feb 2019", to: "Aug 2021", duration: "2 yrs 7mos", location: "Boston, MA", mode: "Hybrid" },
      { title: "Marketing Coordinator", company: "Mailchimp", from: "Aug 2017", to: "Jan 2019", duration: "1 yr 6mos", location: "Atlanta, GA", mode: "Hybrid" },
    ],
    education: [{ degree: "BA in Marketing", institution: "UT Austin", year: "2018" }],
  },
  701: {
    noticePeriod: "30 days", qualification: "BA Communications", expectedSalary: "$130K-$155K",
    experience: [
      { title: "Senior CS Manager", company: "Zendesk", from: "Mar 2022", to: "Present", duration: "2 yrs", location: "Remote", mode: "Remote" },
      { title: "Customer Success Manager", company: "Gainsight", from: "Jun 2019", to: "Feb 2022", duration: "2 yrs 9mos", location: "San Francisco, CA", mode: "Hybrid" },
      { title: "Customer Support Lead", company: "Salesforce", from: "Jan 2017", to: "May 2019", duration: "2 yrs 5mos", location: "San Francisco, CA", mode: "On-site" },
    ],
    education: [{ degree: "BA in Communications", institution: "UC Berkeley", year: "2019" }],
  },
  703: {
    noticePeriod: "45 days", qualification: "BBA", expectedSalary: "$95K-$115K",
    experience: [
      { title: "CS Manager", company: "Freshworks", from: "Jan 2023", to: "Present", duration: "1 yr 3mos", location: "Chicago, IL", mode: "Hybrid" },
      { title: "Customer Success Associate", company: "Chargebee", from: "Jul 2021", to: "Dec 2022", duration: "1 yr 6mos", location: "Remote", mode: "Remote" },
      { title: "Support Specialist", company: "Zendesk", from: "Aug 2019", to: "Jun 2021", duration: "1 yr 11mos", location: "Chicago, IL", mode: "Hybrid" },
    ],
    education: [{ degree: "BBA", institution: "Loyola University Chicago", year: "2021" }],
  },
  501: {
    noticePeriod: "30 days", qualification: "MS Statistics", expectedSalary: "$135K-$160K",
    experience: [
      { title: "Senior Data Analyst", company: "Tableau", from: "May 2022", to: "Present", duration: "2 yrs", location: "Seattle, WA", mode: "Hybrid" },
      { title: "Data Analyst", company: "Zillow", from: "Aug 2020", to: "Apr 2022", duration: "1 yr 9mos", location: "Seattle, WA", mode: "Remote" },
      { title: "Research Assistant", company: "UW Medicine", from: "Sep 2018", to: "Jul 2020", duration: "1 yr 11mos", location: "Seattle, WA", mode: "On-site" },
    ],
    education: [{ degree: "MS in Statistics", institution: "University of Washington", year: "2020" }],
  },
  901: {
    noticePeriod: "90 days", qualification: "MBA", expectedSalary: "$280K-$340K",
    experience: [
      { title: "VP of Sales", company: "Gong", from: "Feb 2021", to: "Present", duration: "3 yrs", location: "New York, NY", mode: "On-site" },
      { title: "Sales Director", company: "Salesforce", from: "Jun 2016", to: "Jan 2021", duration: "4 yrs 8mos", location: "New York, NY", mode: "Hybrid" },
      { title: "Enterprise Account Executive", company: "Oracle", from: "Jul 2012", to: "May 2016", duration: "3 yrs 11mos", location: "New York, NY", mode: "On-site" },
    ],
    education: [{ degree: "MBA", institution: "Wharton", year: "2015" }],
  },
};

const DEFAULT_VOICE_INTERVIEW_QA = [
  {
    id: "vf-1",
    question: "Tell me about a moment you had to reset expectations with a senior stakeholder under pressure.",
    transcript:
      "I scheduled a short pre-read, brought usage and risk data, and reframed the conversation around outcomes instead of timelines. We aligned on a phased plan the same day and avoided a churn escalation.",
    score: 89,
  },
  {
    id: "vf-2",
    question: "How do you decide what to prioritize when multiple accounts need you at once?",
    transcript:
      "I score accounts by revenue at risk, adoption health, and strategic upside. I time-box deep work, delegate orchestration to a pod partner when needed, and communicate trade-offs clearly so no one is surprised.",
    score: 86,
  },
  {
    id: "vf-3",
    question: "Describe how you would run a renewal conversation when usage has dipped for two quarters.",
    transcript:
      "I would open with shared goals, walk through leading indicators, and co-build a 30-60-90 recovery plan with owners on both sides. I would also surface product gaps early so we fix root causes, not symptoms.",
    score: 84,
  },
  {
    id: "vf-4",
    question: "What signals tell you a customer is quietly at risk before they say it outright?",
    transcript:
      "Shrinking active seats, slower support sentiment, fewer execs joining QBRs, and champion turnover. I pair those signals with outreach that is curious, not accusatory, and I document everything in the CRM.",
    score: 90,
  },
];

const CANDIDATE_VOICE_INTERVIEW = {
  701: [
    {
      id: "mia-1",
      question: "Walk me through how you defended a renewal when the champion left mid-cycle.",
      transcript:
        "I mapped the new buying committee within a week, ran a focused discovery with the new VP, and rebuilt the success plan around their KPIs. We reframed the renewal as an expansion pilot and closed on time at 102% of target ARR.",
      score: 93,
    },
    {
      id: "mia-2",
      question: "How do you coach a CSM who is strong on relationships but weak on commercial rigor?",
      transcript:
        "I pair them with me on live calls, use a simple deal-scorecard after every QBR, and review pipeline hygiene weekly. Small reps beat big lectures, and we celebrate the first clean forecast they own end to end.",
      score: 87,
    },
    {
      id: "mia-3",
      question: "What is your framework for translating product usage data into an exec-ready story?",
      transcript:
        "I anchor on leading indicators tied to value moments, show trend lines with cohort context, and always end with a decision slide: renew, expand, or intervene. Executives want clarity, not more charts.",
      score: 91,
    },
    {
      id: "mia-4",
      question: "Tell me about a time you said no to a customer request and kept the relationship intact.",
      transcript:
        "They wanted a custom SLA we could not support. I explained the constraint, offered two compliant alternatives, and brought Product into a working session. They chose the hybrid path and later referred another logo.",
      score: 88,
    },
  ],
};

function getVoiceInterviewForCandidate(candidateId) {
  return CANDIDATE_VOICE_INTERVIEW[candidateId] || DEFAULT_VOICE_INTERVIEW_QA;
}

/** Rubric chip: green above 80, yellow above 60 (and not green), muted otherwise. */
function getVoiceInterviewScoreChipSx(score) {
  if (score > 80) {
    return {
      bgcolor: "rgba(22,163,74,0.12)",
      color: "#15803d",
      border: "1px solid rgba(22,163,74,0.28)",
    };
  }
  if (score > 60) {
    return {
      bgcolor: "rgba(234,179,8,0.16)",
      color: "#a16207",
      border: "1px solid rgba(202,138,4,0.32)",
    };
  }
  return {
    bgcolor: "rgba(107,99,92,0.1)",
    color: "#57534e",
    border: "1px solid rgba(120,113,108,0.22)",
  };
}

function JobCard({ job, onCreateJob }) {
  const theme = getDomainTheme(job.dept);
  const DeptIcon = theme.Icon;
  const chip = STATUS_CHIP[job.status];
  const isDraft = job.status === "draft";
  const isClosed = job.status === "closed";
  const [jobCardActionsAnchor, setJobCardActionsAnchor] = useState(null);
  const [jobCardBulkDownloadSelected, setJobCardBulkDownloadSelected] = useState(false);

  return (
    <Box
      sx={{
        position: "relative",
        borderRadius: "14px",
        border: "1px solid rgba(220,212,202,0.48)",
        bgcolor: "#fff",
        p: 0,
        overflow: "hidden",
        transition: "border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease",
        boxShadow: "0 1px 4px rgba(18,10,4,0.03)",
        opacity: 1,
        "&:hover": {
          borderColor: `${theme.accent}44`,
          boxShadow: `0 8px 28px rgba(18,10,4,0.06), 0 0 0 1px ${theme.accent}18`,
          transform: "translateY(-2px)",
        },
      }}
    >
      {/* Color accent bar */}
      <Box sx={{ height: 3, bgcolor: theme.accent, opacity: isDraft ? 0.35 : 0.65 }} />

      <Box sx={{ p: { xs: 1.75, md: 2 } }}>
        <Stack direction="row" spacing={1.5} alignItems="flex-start">
          {/* Domain icon badge */}
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "99px",
              bgcolor: theme.bg,
              border: `1px solid ${theme.border}`,
              display: "grid",
              placeItems: "center",
              flexShrink: 0,
            }}
          >
            <DeptIcon sx={{ fontSize: 20, color: theme.accent }} />
          </Box>

          {/* Content */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.35 }}>
              <Typography
                sx={{
                  fontSize: "0.9375rem",
                  fontWeight: 700,
                  color: SHELL_INK,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.25,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  flex: 1,
                  minWidth: 0,
                }}
              >
                {job.title}
              </Typography>
              <Box
                sx={{
                  flexShrink: 0,
                  px: 0.85,
                  py: 0.2,
                  borderRadius: "99px",
                  bgcolor: chip.bg,
                  border: `1px solid ${chip.border}`,
                  fontSize: "0.6rem",
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  color: chip.color,
                  textTransform: "uppercase",
                  lineHeight: 1.4,
                }}
              >
                {chip.label}
              </Box>
            </Stack>

            {/* Meta row */}
            <Stack direction="row" spacing={0.5} alignItems="center" flexWrap="wrap" useFlexGap sx={{ mb: 1 }}>
              <Chip
                label={job.dept}
                size="small"
                sx={{
                  height: 22,
                  fontSize: "0.6875rem",
                  fontWeight: 600,
                  borderRadius: "99px",
                  bgcolor: `${theme.accent}0C`,
                  color: theme.accent,
                  border: "none",
                  "& .MuiChip-label": { px: 0.85 },
                }}
              />
              <Typography sx={{ fontSize: "0.75rem", color: SHELL_MUTED, fontWeight: 500 }}>
                {job.location}
              </Typography>
            </Stack>

            {/* Stats row */}
            {!isDraft && (
              <Stack direction="row" spacing={1.65} alignItems="center" flexWrap="wrap" useFlexGap sx={{ mb: 0.75 }}>
                <Tooltip title={aiMatchesBadgeTooltipTitle(job)} arrow placement="top" enterDelay={300}>
                  <Box
                    aria-label={aiMatchesBadgeAriaLabel(job)}
                    sx={{
                      ...JOB_STAT_PILL_ROW_SX,
                      ...JOB_CARD_STAT_PILL_FRAME_SX,
                      borderColor: "rgba(248, 114, 58, 0.24)",
                      bgcolor: "rgba(255, 252, 248, 0.92)",
                      backgroundImage: "linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255, 242, 232, 0.45) 100%)",
                    }}
                  >
                    <AutoAwesomeOutlinedIcon sx={{ fontSize: 13, color: SHELL_PRIMARY, opacity: 0.9, flexShrink: 0 }} />
                    {(job.newMatches24h ?? 0) > 0 ? (
                      <Stack
                        direction="row"
                        alignItems="center"
                        spacing={0.35}
                        useFlexGap
                        component="span"
                        sx={{ minWidth: 0, lineHeight: 1 }}
                      >
                        <Typography component="span" sx={JOB_STAT_PILL_LABEL_SX}>
                          AI matches
                        </Typography>
                        <Typography component="span" sx={{ fontSize: "0.75rem", fontWeight: 800, color: SHELL_INK, lineHeight: 1 }}>
                          {job.matches}
                        </Typography>
                        <Typography
                          component="span"
                          sx={{ fontSize: "0.5rem", fontWeight: 700, color: SHELL_MUTED, lineHeight: 1 }}
                          aria-hidden
                        >
                          ·
                        </Typography>
                        <Typography
                          component="span"
                          sx={{
                            fontSize: "0.5625rem",
                            fontWeight: 700,
                            color: SHELL_PRIMARY,
                            letterSpacing: "0.02em",
                            lineHeight: 1,
                            whiteSpace: "nowrap",
                          }}
                        >
                          {aiMatchesNewRelativeLabel(job.newMatches24h)}
                        </Typography>
                      </Stack>
                    ) : (
                      <>
                        <Typography component="span" sx={JOB_STAT_PILL_LABEL_SX}>
                          AI matches
                        </Typography>
                        <Typography component="span" sx={{ fontSize: "0.75rem", fontWeight: 800, color: SHELL_INK, lineHeight: 1 }}>
                          {job.matches}
                        </Typography>
                      </>
                    )}
                  </Box>
                </Tooltip>
                <Tooltip title="Candidates who applied" arrow placement="top" enterDelay={300}>
                  <Box
                    sx={{
                      ...JOB_STAT_PILL_ROW_SX,
                      ...JOB_CARD_STAT_PILL_FRAME_SX,
                      borderColor: "rgba(37, 99, 235, 0.22)",
                      bgcolor: "rgba(248, 250, 255, 0.95)",
                      backgroundImage: "linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(237, 242, 254, 0.55) 100%)",
                    }}
                  >
                    <PersonAddAlt1OutlinedIcon sx={{ fontSize: 13, color: "#2563eb", opacity: 0.88 }} />
                    <Typography component="span" sx={JOB_STAT_PILL_LABEL_SX}>
                      Applied
                    </Typography>
                    <Typography component="span" sx={{ fontSize: "0.75rem", fontWeight: 800, color: SHELL_INK, lineHeight: 1 }}>
                      {job.applied ?? 0}
                    </Typography>
                  </Box>
                </Tooltip>
                <Tooltip title="Candidates unlocked" arrow placement="top" enterDelay={300}>
                  <Box
                    sx={{
                      ...JOB_STAT_PILL_ROW_SX,
                      ...JOB_CARD_STAT_PILL_FRAME_SX,
                      borderColor: "rgba(124, 58, 237, 0.22)",
                      bgcolor: "rgba(252, 250, 255, 0.95)",
                      backgroundImage: "linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(245, 243, 255, 0.6) 100%)",
                    }}
                  >
                    <LockOpenRoundedIcon sx={{ fontSize: 13, color: "#7c3aed", opacity: 0.88 }} />
                    <Typography component="span" sx={JOB_STAT_PILL_LABEL_SX}>
                      Unlocked
                    </Typography>
                    <Typography component="span" sx={{ fontSize: "0.75rem", fontWeight: 800, color: SHELL_INK, lineHeight: 1 }}>
                      {job.unlocked ?? 0}
                    </Typography>
                  </Box>
                </Tooltip>
              </Stack>
            )}

            {/* Actions row */}
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Stack direction="row" spacing={2} alignItems="center">
                {job.posted &&
                  (isClosed ? (
                    <Tooltip
                      title={<JobClosedDetailsTooltip job={job} />}
                      arrow
                      placement="top"
                      enterDelay={200}
                      slotProps={{ tooltip: { sx: { maxWidth: 280 } } }}
                    >
                      <Typography
                        component="span"
                        sx={{
                          fontSize: "0.6875rem",
                          fontWeight: 500,
                          color: SHELL_MUTED,
                          cursor: "help",
                          borderBottom: "1px dotted rgba(107,99,92,0.35)",
                        }}
                      >
                        Closed {job.closedAt}
                      </Typography>
                    </Tooltip>
                  ) : (
                    <Typography sx={{ fontSize: "0.6875rem", fontWeight: 500, color: SHELL_MUTED }}>
                      Posted {job.posted}
                    </Typography>
                  ))}
                {isDraft && (
                  <Typography sx={{ fontSize: "0.6875rem", fontWeight: 500, color: SHELL_MUTED, fontStyle: "italic" }}>
                    Not yet published
                  </Typography>
                )}
              </Stack>

              <Stack direction="row" spacing={0.25}>
                {isDraft ? (
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<RocketLaunchOutlinedIcon sx={{ fontSize: "14px !important" }} />}
                    onClick={onCreateJob}
                    sx={{
                      textTransform: "none",
                      fontWeight: 700,
                      fontSize: "0.75rem",
                      borderRadius: "8px",
                      px: 1.5,
                      py: 0.45,
                      minHeight: 0,
                      color: SHELL_PRIMARY,
                      borderColor: `${SHELL_PRIMARY}66`,
                      bgcolor: "transparent",
                      boxShadow: "none",
                      "&:hover": {
                        borderColor: SHELL_PRIMARY,
                        bgcolor: "rgba(248,114,58,0.06)",
                      },
                    }}
                  >
                    Continue
                  </Button>
                ) : (
                  <>
                    <Tooltip title="View candidates" arrow>
                      <IconButton size="small" sx={{ color: SHELL_MUTED, "&:hover": { color: theme.accent, bgcolor: `${theme.accent}0C` } }}>
                        <VisibilityOutlinedIcon sx={{ fontSize: 17 }} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="More options" arrow>
                      <IconButton
                        size="small"
                        aria-label="More options"
                        aria-haspopup="true"
                        aria-expanded={Boolean(jobCardActionsAnchor)}
                        onMouseDown={(e) => e.stopPropagation()}
                        onClick={(e) => {
                          e.stopPropagation();
                          setJobCardActionsAnchor(e.currentTarget);
                        }}
                        sx={{ color: SHELL_MUTED, "&:hover": { color: SHELL_INK, bgcolor: "rgba(0,0,0,0.04)" } }}
                      >
                        <MoreHorizOutlinedIcon sx={{ fontSize: 17 }} />
                      </IconButton>
                    </Tooltip>
                    <Menu
                      anchorEl={jobCardActionsAnchor}
                      open={Boolean(jobCardActionsAnchor)}
                      onClose={() => setJobCardActionsAnchor(null)}
                      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                      transformOrigin={{ vertical: "top", horizontal: "right" }}
                      slotProps={{
                        paper: {
                          sx: {
                            mt: 0.5,
                            minWidth: 230,
                            borderRadius: "12px",
                            border: "1px solid rgba(200,188,174,0.55)",
                            boxShadow: "0 10px 40px rgba(29,26,23,0.12)",
                          },
                        },
                      }}
                    >
                      <MenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          setJobCardBulkDownloadSelected((prev) => !prev);
                          setJobCardActionsAnchor(null);
                        }}
                        sx={{ fontSize: "0.875rem", fontWeight: 600 }}
                      >
                        {jobCardBulkDownloadSelected ? "✓ Bulk download candidates" : "Bulk download candidates"}
                      </MenuItem>
                    </Menu>
                  </>
                )}
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}

function JobRowCard({ job, onCreateJob, onViewCandidates }) {
  const theme = getDomainTheme(job.dept);
  const DeptIcon = theme.Icon;
  const isDraft = job.status === "draft";
  const isClosed = job.status === "closed";
  const hasMatches = job.matches > 0;
  const [rowActionsAnchor, setRowActionsAnchor] = useState(null);
  const [rowBulkDownloadSelected, setRowBulkDownloadSelected] = useState(false);

  const handleCardClick = (e) => {
    if (e.target.closest(".job-row-actions")) return;
    if (hasMatches && onViewCandidates) onViewCandidates(job);
  };

  return (
    <Box
      onClick={handleCardClick}
      sx={{
        position: "relative",
        borderRadius: "16px",
        border: `1px solid rgba(220,212,202,0.48)`,
        bgcolor: "#fff",
        px: { xs: 1.75, md: 2.5 },
        py: { xs: 1.5, md: 1.75 },
        opacity: 1,
        transition: "all 0.22s cubic-bezier(.4,0,.2,1)",
        cursor: hasMatches ? "pointer" : "default",
        "&:hover": {
          borderColor: "rgba(220,212,202,0.7)",
          boxShadow: "0 6px 24px rgba(18,10,4,0.06), 0 1.5px 4px rgba(18,10,4,0.03)",
          transform: hasMatches ? "translateY(-1px)" : "none",
        },
      }}
    >
      <Stack direction="row" alignItems="center" spacing={{ xs: 1.25, md: 1.5 }}>
        {/* Left accent line + icon */}
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: "99px",
            bgcolor: theme.bg,
            border: `1px solid ${theme.border}`,
            display: "grid",
            placeItems: "center",
            flexShrink: 0,
          }}
        >
          <DeptIcon sx={{ fontSize: 19, color: theme.accent }} />
        </Box>

        {/* Title + quick metrics */}
        <Box sx={{ minWidth: 0, flex: "1 1 0%" }}>
          <Stack spacing={0.45} sx={{ minWidth: 0 }}>
            <Stack direction="row" spacing={0.75} alignItems="center" flexWrap="wrap" useFlexGap sx={{ minWidth: 0 }}>
              <Typography
                sx={{
                  fontSize: "0.9375rem",
                  fontWeight: 700,
                  color: SHELL_INK,
                  letterSpacing: "-0.015em",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  minWidth: 0,
                }}
              >
                {job.title}
              </Typography>
              <Typography
                sx={{
                  flexShrink: 0,
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  letterSpacing: "0.03em",
                  textTransform: "uppercase",
                  color: "rgba(23,18,14,0.46)",
                  lineHeight: 1.2,
                }}
              >
                {`ZF-${String(job.id).padStart(3, "0")}`}
              </Typography>
            </Stack>
            {!isDraft && (
              <Stack
                className="job-row-data"
                direction="row"
                spacing={0.45}
                alignItems="center"
                flexWrap="wrap"
                useFlexGap
                sx={{ pl: 0 }}
              >
                {[
                  {
                    key: "matches",
                    tooltip: aiMatchesBadgeTooltipTitle(job),
                    ariaLabel: aiMatchesBadgeAriaLabel(job),
                    value: job.matches ?? 0,
                    label: "AI matches",
                    valueColor: "#A85A36",
                    borderColor: "rgba(168, 90, 54, 0.18)",
                    bgColor: "rgba(251, 247, 242, 0.98)",
                  },
                  {
                    key: "applied",
                    tooltip: "Candidates who applied",
                    ariaLabel: `Applied candidates ${job.applied ?? 0}`,
                    value: job.applied ?? 0,
                    label: "Applied",
                    valueColor: "#4B6278",
                    borderColor: "rgba(75, 98, 120, 0.18)",
                    bgColor: "rgba(246, 249, 252, 0.98)",
                  },
                  {
                    key: "unlocked",
                    tooltip: "Candidates unlocked",
                    ariaLabel: `Unlocked candidates ${job.unlocked ?? 0}`,
                    value: job.unlocked ?? 0,
                    label: "Unlocked",
                    valueColor: "#6E5A85",
                    borderColor: "rgba(110, 90, 133, 0.18)",
                    bgColor: "rgba(249, 247, 252, 0.98)",
                  },
                ].map((metric) => (
                  <Tooltip key={metric.key} title={metric.tooltip} arrow placement="top" enterDelay={250}>
                    <Box
                      aria-label={metric.ariaLabel}
                      sx={{
                        ...JOB_STAT_PILL_ROW_SX,
                        borderColor: metric.borderColor,
                        bgcolor: metric.bgColor,
                        backgroundImage: "none",
                        px: 0.72,
                        py: 0.3,
                        minHeight: 0,
                        gap: 0.38,
                      }}
                    >
                      <Typography
                        component="span"
                        sx={{
                          minWidth: 14,
                          textAlign: "center",
                          fontSize: "0.76rem",
                          fontWeight: 800,
                          color: metric.valueColor,
                          lineHeight: 1,
                        }}
                      >
                        {metric.value}
                      </Typography>
                      <Typography component="span" sx={{ ...JOB_STAT_PILL_LABEL_SX, fontSize: "0.64rem", letterSpacing: "0.015em" }}>
                        {metric.label}
                      </Typography>
                    </Box>
                  </Tooltip>
                ))}
              </Stack>
            )}
          </Stack>
        </Box>

        {/* Dept/location/posted moved to right side */}
        <Stack
          direction="row"
          spacing={0.8}
          alignItems="center"
          justifyContent="flex-end"
          flexWrap="wrap"
          useFlexGap
          sx={{ ml: "auto", mr: "12px", flexShrink: 0, minWidth: 300, maxWidth: 430, display: { xs: "none", md: "flex" } }}
        >
          <Stack direction="row" spacing={0.5} alignItems="center">
            <DeptIcon sx={{ fontSize: 15, color: theme.accent }} />
            <Typography sx={{ fontSize: "13px", color: SHELL_MUTED, fontWeight: 700, whiteSpace: "nowrap", lineHeight: 1.2 }}>
              {job.dept}
            </Typography>
          </Stack>
          <Box component="span" aria-hidden sx={{ width: 3, height: 3, borderRadius: "50%", bgcolor: "rgba(107,99,92,0.32)", flexShrink: 0 }} />
          <Stack direction="row" spacing={0.5} alignItems="center">
            <LocationOnOutlinedIcon sx={{ fontSize: 15, color: "rgba(23,18,14,0.5)" }} />
            <Typography sx={{ fontSize: "13px", color: SHELL_MUTED, fontWeight: 600, whiteSpace: "nowrap", lineHeight: 1.2 }}>
              {job.location}
            </Typography>
          </Stack>
          {isClosed && (
            <>
              <Box component="span" aria-hidden sx={{ width: 3, height: 3, borderRadius: "50%", bgcolor: "rgba(107,99,92,0.32)", flexShrink: 0 }} />
              <Tooltip
                title={<JobClosedDetailsTooltip job={job} />}
                arrow
                placement="top"
                enterDelay={200}
                slotProps={{ tooltip: { sx: { maxWidth: 280 } } }}
              >
                <Stack direction="row" spacing={0.45} alignItems="center" sx={{ cursor: "help" }}>
                  <TaskAltRoundedIcon sx={{ fontSize: 14, color: "#64748b" }} />
                  <Typography sx={{ fontSize: "13px", color: SHELL_MUTED, fontWeight: 500, whiteSpace: "nowrap", lineHeight: 1.2 }}>
                    {`Closed on ${job.closedOn ?? "29th Mar 2026"}`}
                  </Typography>
                </Stack>
              </Tooltip>
            </>
          )}
        </Stack>

        {/* Actions */}
        <Stack
          className="job-row-actions"
          direction="row"
          spacing={0.5}
          alignItems="center"
          sx={{
            flexShrink: 0,
            opacity: 1,
            transition: "opacity 0.18s ease",
            pointerEvents: "auto",
          }}
        >
          {isDraft ? (
            <Button
              size="small"
              variant="outlined"
              startIcon={<RocketLaunchOutlinedIcon sx={{ fontSize: "14px !important" }} />}
              onClick={onCreateJob}
              sx={{
                textTransform: "none",
                fontWeight: 700,
                fontSize: "0.75rem",
                borderRadius: "9px",
                px: 1.5,
                py: 0.5,
                minHeight: 0,
                color: SHELL_PRIMARY,
                borderColor: `${SHELL_PRIMARY}66`,
                bgcolor: "transparent",
                "&:hover": {
                  borderColor: SHELL_PRIMARY,
                  bgcolor: "rgba(248,114,58,0.06)",
                },
              }}
            >
              Continue
            </Button>
          ) : (
            <>
              <Button
                size="small"
                variant="outlined"
                onClick={(e) => {
                  e.stopPropagation();
                  if (onViewCandidates) onViewCandidates(job);
                }}
                sx={{
                  textTransform: "none",
                  borderRadius: "9px",
                  px: 1.5,
                  py: 0.45,
                  minHeight: 0,
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: SHELL_PRIMARY,
                  borderColor: `${SHELL_PRIMARY}55`,
                  bgcolor: "#fff",
                  "&:hover": {
                    borderColor: SHELL_PRIMARY,
                    bgcolor: `${SHELL_PRIMARY}0A`,
                  },
                }}
              >
                View Candidates
              </Button>
              <IconButton
                size="small"
                aria-label="More options"
                aria-haspopup="true"
                aria-controls={rowActionsAnchor ? `job-row-menu-${job.id}` : undefined}
                aria-expanded={Boolean(rowActionsAnchor)}
                onClick={(e) => {
                  e.stopPropagation();
                  // Open in the next tick to avoid click-away race with row-level handlers.
                  window.setTimeout(() => {
                    setRowActionsAnchor(e.currentTarget);
                  }, 0);
                }}
                sx={{ color: SHELL_MUTED, "&:hover": { color: SHELL_INK, bgcolor: "rgba(0,0,0,0.04)" } }}
              >
                <MoreHorizOutlinedIcon sx={{ fontSize: 16 }} />
              </IconButton>
              <Menu
                id={`job-row-menu-${job.id}`}
                anchorEl={rowActionsAnchor}
                open={Boolean(rowActionsAnchor)}
                onClose={() => setRowActionsAnchor(null)}
                keepMounted
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                slotProps={{
                  root: {
                    sx: {
                      zIndex: 1800,
                    },
                  },
                  paper: {
                    sx: {
                      mt: 0.5,
                      minWidth: 210,
                      borderRadius: "12px",
                      border: "1px solid rgba(200,188,174,0.55)",
                      boxShadow: "0 10px 40px rgba(29,26,23,0.12)",
                      zIndex: 1801,
                    },
                  },
                }}
              >
                <MenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    setRowBulkDownloadSelected((prev) => !prev);
                    setRowActionsAnchor(null);
                  }}
                  sx={{ fontSize: "0.875rem", fontWeight: 600 }}
                >
                  {rowBulkDownloadSelected ? "✓ Download bulk candidates" : "Download bulk candidates"}
                </MenuItem>
                <MenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    setRowActionsAnchor(null);
                  }}
                  sx={{ fontSize: "0.875rem", fontWeight: 600 }}
                >
                  Unpublish job
                </MenuItem>
                <MenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    setRowActionsAnchor(null);
                  }}
                  sx={{ fontSize: "0.875rem", fontWeight: 700, color: "#dc2626" }}
                >
                  Close job
                </MenuItem>
              </Menu>
            </>
          )}
        </Stack>
      </Stack>
    </Box>
  );
}

const COMPANY_DOMAIN = {
  TechCorp: "Enterprise SaaS",
  InnovateCo: "B2B SaaS",
  ScaleAI: "AI / ML",
  Dropbox: "Cloud Storage",
  Stripe: "Fintech",
  Figma: "Design Tools",
  Airbnb: "Travel Tech",
  Spotify: "Media Tech",
  Notion: "Productivity SaaS",
  Linear: "Dev Tools",
  Canva: "Design Tech",
  Vercel: "Dev Infrastructure",
  Datadog: "Observability",
  Cloudflare: "Cloud Infrastructure",
  Shopify: "E-commerce",
  Plaid: "Fintech",
  HubSpot: "Marketing Tech",
  Lattice: "HR Tech",
  Zendesk: "Customer Platform",
  Intercom: "Customer Platform",
  Freshworks: "Customer Platform",
  Tableau: "Data Analytics",
  Amplitude: "Product Analytics",
  Mixpanel: "Product Analytics",
  Gong: "Revenue Intelligence",
  Outreach: "Sales Tech",
  Salesloft: "Sales Tech",
};

function maskName(first, last) {
  const mask = (s) => {
    if (s.length <= 2) return `${s[0]}*`;
    return `${s[0]}${"*".repeat(s.length - 2)}${s[s.length - 1]}`;
  };
  return `${mask(first)} ${mask(last)}`;
}

/** Four-digit candidate reference shown next to names (derived from candidate record id). */
function formatCandidatePublicId(id) {
  const n = Number(id);
  if (!Number.isFinite(n) || n < 0) return "0000";
  return String(Math.floor(n) % 10000).padStart(4, "0");
}

function ScoreGauge({ score, size = 62, showTierLabel = true }) {
  const rid = useId().replace(/:/g, "");
  const matchColor = getMatchColor(score);
  const tierWord =
    score >= 85 ? "Strong" : score >= 78 ? "Good" : score >= 70 ? "Moderate" : "Potential";
  const strokeWidth = Math.max(3.5, size * 0.09);
  const cx = size / 2;
  /** Lower value moves arc and score upward inside the viewBox (was 0.56, sat low in the chip). */
  const cy = size * 0.485;
  const radius = (size - strokeWidth * 2) / 2;
  const startAngle = 220;
  const totalSweep = 260;
  const toRad = (deg) => (deg * Math.PI) / 180;

  const arcPath = (start, sweep) => {
    const s = toRad(start);
    const e = toRad(start - sweep);
    const x1 = cx + radius * Math.cos(s);
    const y1 = cy - radius * Math.sin(s);
    const x2 = cx + radius * Math.cos(e);
    const y2 = cy - radius * Math.sin(e);
    const large = sweep > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${radius} ${radius} 0 ${large} 1 ${x2} ${y2}`;
  };

  const filledSweep = (score / 100) * totalSweep;
  const centerFontPx = Math.round(size * 0.29);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minWidth: showTierLabel ? Math.max(88, size + 8) : size + 6,
        flexShrink: 0,
        textAlign: "center",
        gap: showTierLabel ? 0.35 : 0,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          lineHeight: 0,
          pb: showTierLabel ? 1.5 : 0,
        }}
      >
        <svg
          width={size}
          height={size * 0.68}
          viewBox={`0 0 ${size} ${size * 0.68}`}
          style={{ display: "block", overflow: "visible" }}
          aria-hidden={!showTierLabel}
        >
        <defs>
          <linearGradient id={`gauge-bg-${rid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(220,212,202,0.25)" />
            <stop offset="100%" stopColor="rgba(220,212,202,0.12)" />
          </linearGradient>
          <linearGradient id={`gauge-fill-${rid}`} x1="0" y1="0" x2="1" y2="0.8">
            <stop offset="0%" stopColor={matchColor} stopOpacity="0.9" />
            <stop offset="100%" stopColor={matchColor} stopOpacity="1" />
          </linearGradient>
          <filter id={`gauge-shadow-${rid}`}>
            <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor={matchColor} floodOpacity="0.3" />
          </filter>
        </defs>
        <path
          d={arcPath(startAngle, totalSweep)}
          fill="none"
          stroke={`url(#gauge-bg-${rid})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        <path
          d={arcPath(startAngle, filledSweep)}
          fill="none"
          stroke={`url(#gauge-fill-${rid})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          filter={`url(#gauge-shadow-${rid})`}
          style={{ transition: "d 0.6s ease" }}
        />
        <text
          x={cx}
          y={cy - 0.5}
          textAnchor="middle"
          dominantBaseline="middle"
          style={{
            fontSize: `${centerFontPx}px`,
            fontWeight: 800,
            fill: matchColor,
            letterSpacing: "-0.03em",
            fontFamily: "inherit",
          }}
        >
          {score}
        </text>
        </svg>
      </Box>
      {showTierLabel && (
        <Typography
          component="span"
          sx={{
            display: "block",
            m: 0,
            width: "100%",
            whiteSpace: "nowrap",
            fontSize: tierWord.length >= 9 ? "0.5rem" : "0.5625rem",
            fontWeight: 700,
            color: matchColor,
            lineHeight: 1.25,
            letterSpacing: tierWord.length >= 9 ? "0.02em" : "0.04em",
            textTransform: "none",
            opacity: 0.85,
          }}
        >
          {tierWord}
        </Typography>
      )}
    </Box>
  );
}

/** Same “Why this is a … match” panel as on candidate cards, reused in the detail dialog. */
function AiMatchInsightPanel({ matchLabel, aiReason, competencies = [], wrapperSx = {}, showTopStrengths = true }) {
  const topComps = showTopStrengths
    ? [...competencies].sort((a, b) => b.score - a.score).slice(0, 4)
    : [];

  return (
    <Box
      sx={{
        position: "relative",
        borderRadius: "14px",
        overflow: "hidden",
        background: "linear-gradient(145deg, rgba(248,114,58,0.11) 0%, rgba(255,218,195,0.35) 38%, rgba(255,252,248,0.98) 72%, #ffffff 100%)",
        boxShadow: "0 10px 28px rgba(248,114,58,0.07), 0 2px 8px rgba(23,18,14,0.04), inset 0 1px 0 rgba(255,255,255,0.85)",
        border: "1px solid rgba(248,114,58,0.2)",
        ...wrapperSx,
      }}
    >
      <Box sx={{ p: { xs: 2, sm: 2.25 } }}>
        <Stack direction="row" alignItems="center" spacing={0.85} sx={{ mb: 1 }}>
          <AutoAwesomeIcon sx={{ fontSize: 16, color: SHELL_PRIMARY, flexShrink: 0 }} aria-hidden />
          <Typography
            component="span"
            sx={{
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: SHELL_PRIMARY,
              lineHeight: 1.3,
            }}
          >
            Why this is a {matchLabel.toLowerCase()}
          </Typography>
        </Stack>
        <Typography
          sx={{
            fontSize: "0.9375rem",
            color: "rgba(23,18,14,0.82)",
            lineHeight: 1.65,
            fontWeight: 400,
            letterSpacing: "-0.01em",
          }}
        >
          {aiReason}
        </Typography>

        {showTopStrengths && (
          <Stack direction="row" flexWrap="wrap" useFlexGap alignItems="center" sx={{ mt: 1.5, gap: "6px" }}>
            <Typography
              component="span"
              sx={{
                fontSize: "0.625rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "rgba(23,18,14,0.42)",
                mr: 0.25,
                alignSelf: "center",
              }}
            >
              Top matched ICP competencies
            </Typography>
            {topComps.map((comp, ci) => {
              const isFirst = ci === 0;
              return (
                <Box
                  key={comp.name}
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 0.5,
                    py: 0.4,
                    px: 1,
                    borderRadius: "8px",
                    bgcolor: isFirst ? "rgba(22,163,74,0.08)" : "rgba(255,255,255,0.7)",
                    border: isFirst ? "1px solid rgba(22,163,74,0.2)" : "1px solid rgba(248,114,58,0.14)",
                  }}
                >
                  {isFirst && (
                    <Box
                      sx={{
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        bgcolor: "#16a34a",
                        flexShrink: 0,
                      }}
                    />
                  )}
                  <Typography
                    component="span"
                    sx={{
                      fontSize: "0.6875rem",
                      fontWeight: 600,
                      color: isFirst ? "#15803d" : "rgba(23,18,14,0.65)",
                      lineHeight: 1,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {comp.name}
                  </Typography>
                </Box>
              );
            })}
            {competencies.length > topComps.length && (
              <Typography
                component="span"
                sx={{
                  fontSize: "0.625rem",
                  fontWeight: 600,
                  color: "rgba(107,99,92,0.45)",
                  alignSelf: "center",
                  letterSpacing: "0.02em",
                }}
              >
                +{competencies.length - topComps.length} more
              </Typography>
            )}
          </Stack>
        )}
      </Box>
    </Box>
  );
}

function CandidateCard({ candidate, isUnlocked, onUnlock, onViewDetails, index, starred = false, onToggleStar }) {
  const locked = candidate.locked && !isUnlocked;
  const matchColor = getMatchColor(candidate.matchScore);
  const matchLabel = getMatchLabel(candidate.matchScore);
  const [copiedContactField, setCopiedContactField] = useState(null);
  const appliedAtLabel = candidate.appliedAt || "Apr 11, 2026, 10:30 AM";
  const sourceTooltipText = candidate.source === "applied"
    ? `Applied candidate. Applied on ${appliedAtLabel}.`
    : "Recommended by ZappyFind based on role fit and profile match.";

  const displayName = locked
    ? maskName(candidate.firstName, candidate.lastName)
    : `${candidate.firstName} ${candidate.lastName}`;
  const candidatePublicId = formatCandidatePublicId(candidate.id);

  const roleLabel = locked
    ? `${candidate.role} at a ${COMPANY_DOMAIN[candidate.company] || "Technology"} company`
    : `${candidate.role} at ${candidate.company}`;
  const starNameRef = `${displayName}, candidate ${candidatePublicId}`;

  const handleCopyContact = (text, field) => {
    if (!text) return;
    void navigator.clipboard.writeText(text).then(
      () => {
        setCopiedContactField(field);
        window.setTimeout(() => setCopiedContactField((current) => (current === field ? null : current)), 2000);
      },
      () => {}
    );
  };

  return (
    <Box
      sx={{
        borderRadius: "16px",
        border: "1px solid rgba(220,212,202,0.48)",
        bgcolor: "#fff",
        p: { xs: 2, md: 2.5 },
        transition: "all 0.22s cubic-bezier(.4,0,.2,1)",
        animation: `fadeSlideIn 0.35s ease ${index * 0.06}s both`,
        "@keyframes fadeSlideIn": {
          from: { opacity: 0, transform: "translateY(12px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        "&:hover": {
          borderColor: "rgba(220,212,202,0.7)",
          boxShadow: "0 6px 24px rgba(18,10,4,0.06), 0 1.5px 4px rgba(18,10,4,0.03)",
        },
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        flexWrap="wrap"
        useFlexGap
        sx={{ columnGap: 2, rowGap: 1.5 }}
      >
        <Tooltip
          title={`${candidate.matchScore}% - ${matchLabel}`}
          arrow
          placement="top"
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <ScoreGauge score={candidate.matchScore} />
          </Box>
        </Tooltip>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.2, flexWrap: "wrap", rowGap: 0.25 }} useFlexGap>
            <Stack direction="row" alignItems="baseline" spacing={0.75} sx={{ minWidth: 0, flexWrap: "wrap" }} useFlexGap>
              <Typography
                sx={{
                  fontSize: "0.9375rem",
                  fontWeight: 700,
                  color: locked ? SHELL_MUTED : SHELL_INK,
                  letterSpacing: locked ? "0.03em" : "-0.01em",
                }}
              >
                {displayName}
              </Typography>
              <Typography
                component="span"
                sx={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: "rgba(107,99,92,0.72)",
                  letterSpacing: "0.05em",
                  fontVariantNumeric: "tabular-nums",
                  lineHeight: 1.2,
                }}
              >
                {candidatePublicId}
              </Typography>
            </Stack>
            {locked && (
              <Tooltip
                title="Unlock this candidate to access full insights and contact details."
                arrow
                placement="top"
              >
                <Box
                  component="span"
                  aria-label="Profile locked. Unlock to access full insights and contact details."
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 28,
                    height: 28,
                    borderRadius: "8px",
                    background: "linear-gradient(160deg, rgba(51,65,85,0.14) 0%, rgba(71,85,105,0.1) 100%)",
                    border: "1px solid rgba(51,65,85,0.28)",
                    boxShadow: "0 1px 3px rgba(15,23,42,0.08), inset 0 1px 0 rgba(255,255,255,0.55)",
                    cursor: "default",
                  }}
                >
                  <LockOutlinedIcon sx={{ fontSize: 16, color: "#334155" }} aria-hidden />
                </Box>
              </Tooltip>
            )}
            <Tooltip title={sourceTooltipText} arrow placement="top">
              {candidate.source === "applied" ? (
                <Box
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 0.5,
                    px: 0.85,
                    py: 0.2,
                    borderRadius: "6px",
                    bgcolor: "rgba(59,130,246,0.08)",
                    border: "1px solid rgba(59,130,246,0.2)",
                    flexShrink: 0,
                  }}
                >
                  <HowToRegOutlinedIcon sx={{ fontSize: 13, color: "#3B82F6" }} />
                  <Typography component="span" sx={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.04em", color: "#3B82F6", textTransform: "uppercase", lineHeight: 1.4 }}>
                    Applied
                  </Typography>
                </Box>
              ) : (
                <Box
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 0.5,
                    px: 0.85,
                    py: 0.2,
                    borderRadius: "6px",
                    bgcolor: "rgba(248,114,58,0.08)",
                    border: "1px solid rgba(248,114,58,0.2)",
                    flexShrink: 0,
                  }}
                >
                  <AutoAwesomeOutlinedIcon sx={{ fontSize: 13, color: SHELL_PRIMARY }} />
                  <Typography component="span" sx={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.04em", color: SHELL_PRIMARY, textTransform: "uppercase", lineHeight: 1.4 }}>
                    ZappyFind
                  </Typography>
                </Box>
              )}
            </Tooltip>
          </Stack>
          <Typography sx={{ fontSize: "0.8125rem", fontWeight: 500, color: SHELL_MUTED, mb: 0.15 }}>
            {roleLabel}
          </Typography>
          <Stack
            direction="row"
            flexWrap="wrap"
            alignItems="center"
            columnGap={1}
            rowGap={0.65}
          >
            <Typography sx={{ fontSize: "0.75rem", color: "rgba(107,99,92,0.75)", fontWeight: 500 }}>
              {candidate.yearsExp} years exp &middot; {candidate.location}
            </Typography>
          </Stack>

        </Box>

        {/* Right side: contact (copy per field) + CTAs */}
        <Stack
          direction="row"
          spacing={1.25}
          alignItems="center"
          flexWrap="wrap"
          useFlexGap
          sx={{
            flex: { xs: "1 1 100%", md: "0 0 auto" },
            mt: 0.5,
            rowGap: 1,
            columnGap: 1.25,
            justifyContent: { xs: "flex-start", md: "flex-end" },
            maxWidth: { xs: "100%", md: 640 },
          }}
        >
          {locked ? (
            <Stack direction="row" alignItems="center" spacing={0.75} flexWrap="wrap" useFlexGap sx={{ rowGap: 0.75 }}>
              {onToggleStar && (
                <Tooltip title={starred ? "Remove star" : "Star for quick reference"} arrow>
                  <IconButton
                    size="small"
                    aria-label={starred ? `Remove star from ${starNameRef}` : `Star ${starNameRef} for quick reference`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleStar(candidate.id);
                    }}
                    sx={{
                      width: 36,
                      height: 36,
                      color: starred ? SHORTLIST_STAR_ACTIVE : SHELL_PRIMARY,
                      borderRadius: "10px",
                      "&:hover": {
                        color: starred ? SHORTLIST_STAR_ACTIVE : SHELL_PRIMARY,
                        bgcolor: starred ? "rgba(234, 179, 8, 0.18)" : "rgba(248, 114, 58, 0.12)",
                      },
                    }}
                  >
                    {starred ? <StarRoundedIcon sx={{ fontSize: 22 }} /> : <StarOutlineRoundedIcon sx={{ fontSize: 22 }} />}
                  </IconButton>
                </Tooltip>
              )}
              <Button
                size="small"
                variant="outlined"
                startIcon={<LockOpenOutlinedIcon sx={{ fontSize: "14px !important" }} />}
                onClick={() => onUnlock(candidate.id)}
                sx={{
                  textTransform: "none",
                  borderRadius: "10px",
                  px: 2,
                  py: 0,
                  minHeight: 36,
                  height: 36,
                  fontSize: "0.8125rem",
                  fontWeight: 600,
                  color: SHELL_PRIMARY,
                  borderColor: `${SHELL_PRIMARY}44`,
                  "&:hover": { borderColor: SHELL_PRIMARY, bgcolor: `${SHELL_PRIMARY}08` },
                }}
              >
                Unlock Profile
              </Button>
            </Stack>
          ) : (
            <>
              <Tooltip
                title={copiedContactField === "email" ? "Copied" : "Click to copy email"}
                arrow
              >
                <Box
                  component="button"
                  type="button"
                  aria-label={`Copy email ${candidate.email}`}
                  onClick={() => handleCopyContact(candidate.email, "email")}
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 0.75,
                    maxWidth: { xs: "100%", sm: 220 },
                    minHeight: 36,
                    height: 36,
                    px: 1.5,
                    py: 0,
                    borderRadius: "10px",
                    border: "none",
                    bgcolor: "transparent",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    fontSize: "0.8125rem",
                    fontWeight: 600,
                    color: SHELL_INK,
                    textAlign: "left",
                    boxSizing: "border-box",
                    "&:hover": { bgcolor: `${SHELL_PRIMARY}1A` },
                    "&:focus-visible": { outline: `2px solid ${SHELL_PRIMARY}`, outlineOffset: 2 },
                  }}
                >
                  <EmailOutlinedIcon sx={{ fontSize: "16px !important", flexShrink: 0, color: SHELL_PRIMARY }} />
                  <Box
                    component="span"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      minWidth: 0,
                    }}
                  >
                    {candidate.email}
                  </Box>
                </Box>
              </Tooltip>
              <Tooltip
                title={copiedContactField === "phone" ? "Copied" : "Click to copy phone"}
                arrow
              >
                <Box
                  component="button"
                  type="button"
                  aria-label={`Copy phone ${candidate.phone}`}
                  onClick={() => handleCopyContact(candidate.phone, "phone")}
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 0.75,
                    minHeight: 36,
                    height: 36,
                    px: 1.5,
                    py: 0,
                    borderRadius: "10px",
                    border: "none",
                    bgcolor: "transparent",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    fontSize: "0.8125rem",
                    fontWeight: 600,
                    color: SHELL_INK,
                    whiteSpace: "nowrap",
                    boxSizing: "border-box",
                    "&:hover": { bgcolor: `${SHELL_PRIMARY}1A` },
                    "&:focus-visible": { outline: `2px solid ${SHELL_PRIMARY}`, outlineOffset: 2 },
                  }}
                >
                  <PhoneOutlinedIcon sx={{ fontSize: "16px !important", flexShrink: 0, color: SHELL_PRIMARY }} />
                  {candidate.phone}
                </Box>
              </Tooltip>
              <Tooltip title="View resume" arrow>
                <IconButton
                  size="small"
                  aria-label="View resume"
                  sx={{
                    width: 36,
                    height: 36,
                    color: SHELL_PRIMARY,
                    border: "none",
                    borderRadius: "10px",
                    "&:hover": { bgcolor: `${SHELL_PRIMARY}1A` },
                  }}
                >
                  <DescriptionOutlinedIcon sx={{ fontSize: 17 }} />
                </IconButton>
              </Tooltip>
              {onToggleStar && (
                <Tooltip title={starred ? "Remove star" : "Star for quick reference"} arrow>
                  <IconButton
                    size="small"
                    aria-label={starred ? `Remove star from ${starNameRef}` : `Star ${starNameRef} for quick reference`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleStar(candidate.id);
                    }}
                    sx={{
                      width: 36,
                      height: 36,
                      color: starred ? SHORTLIST_STAR_ACTIVE : SHELL_PRIMARY,
                      borderRadius: "10px",
                      "&:hover": {
                        color: starred ? SHORTLIST_STAR_ACTIVE : SHELL_PRIMARY,
                        bgcolor: starred ? "rgba(234, 179, 8, 0.18)" : "rgba(248, 114, 58, 0.12)",
                      },
                    }}
                  >
                    {starred ? <StarRoundedIcon sx={{ fontSize: 22 }} /> : <StarOutlineRoundedIcon sx={{ fontSize: 22 }} />}
                  </IconButton>
                </Tooltip>
              )}
              <Button
                size="small"
                variant="outlined"
                startIcon={<VisibilityOutlinedIcon sx={{ fontSize: "15px !important" }} />}
                onClick={() => onViewDetails?.(candidate)}
                sx={{
                  textTransform: "none",
                  borderRadius: "10px",
                  px: 2,
                  py: 0,
                  minHeight: 36,
                  height: 36,
                  fontSize: "0.8125rem",
                  fontWeight: 700,
                  color: SHELL_PRIMARY,
                  borderColor: `${SHELL_PRIMARY}44`,
                  "&:hover": {
                    borderColor: SHELL_PRIMARY,
                    bgcolor: "rgba(248, 114, 58, 0.045)",
                  },
                }}
              >
                View Details
              </Button>
            </>
          )}
        </Stack>
      </Stack>

      <AiMatchInsightPanel
        matchLabel={matchLabel}
        aiReason={candidate.aiReason}
        competencies={candidate.competencies}
        wrapperSx={{ mt: 2 }}
      />

    </Box>
  );
}

const ICP_INSIGHTS = {
  7: {
    type: "success",
    headline: "The Ideal Candidate Profile you aligned on with your hiring manager is working well",
    body: "Top matches are strong in Empathy and Communication, with a 76% outreach reply rate. Your current candidate profile is working well.",
  },
  4: {
    type: "warning",
    headline: "Two competencies are filtering out strong candidates",
    body: "Strategy and Growth Forecasting are your tightest gates. Strong candidates often clear Analytics, Experimentation Design, and Channel Performance, then stall on these two. Easing them could add roughly 40% more qualified matches without dropping your other must-haves.",
    removeSuggestions: ["Strategy", "Growth Forecasting"],
    ctaLabel: "Refine Candidate Profile",
  },
  3: {
    type: "refine",
    headline: "Collaboration and Execution are limiting match strength",
    body: "Most candidates score well on Technical Depth, System Design, and Code Quality but fall short on Collaboration and Execution. Removing these from required competencies could move several 80-84% candidates into the 90%+ range.",
    removeSuggestions: ["Collaboration", "Execution"],
  },
};

function IcpInsightBlock({ job, competencies = [] }) {
  const insight = ICP_INSIGHTS[job.id];
  const [showComps, setShowComps] = useState(false);

  if (!insight) return null;

  const isSuccess = insight.type === "success";
  const isWarning = insight.type === "warning";
  const hasComps = competencies.length > 0;
  const hasActionItems = Boolean(insight.removeSuggestions?.length) || Boolean(insight.ctaLabel);
  const hasExpandable = hasComps || hasActionItems;

  const accentColor = isSuccess ? "#16a34a" : isWarning ? "#b45309" : "#6366f1";
  const bgLuxury = isSuccess
    ? "linear-gradient(90deg, rgba(22,163,74,0.09) 0%, rgba(232,245,236,0.55) 8%, rgba(250,244,232,0.65) 24%, rgba(255,253,248,0.97) 52%, rgba(255,255,255,0.88) 78%, rgba(248,250,247,0.95) 100%)"
    : isWarning
      ? "linear-gradient(90deg, rgba(180,83,9,0.07) 0%, rgba(255,248,240,0.52) 8%, rgba(255,251,245,0.68) 24%, rgba(255,253,248,0.97) 52%, rgba(255,255,255,0.88) 78%, rgba(248,250,247,0.95) 100%)"
      : "linear-gradient(90deg, rgba(99,102,241,0.09) 0%, rgba(238,242,255,0.6) 10%, rgba(255,253,252,0.95) 50%, rgba(255,255,255,0.85) 74%, rgba(248,248,252,0.96) 100%)";
  const borderColor = isSuccess ? "rgba(22,163,74,0.16)" : isWarning ? "rgba(180,83,9,0.14)" : "rgba(99,102,241,0.16)";

  const tierMeta = (level) => {
    if (level === "High") {
      return {
        label: "Must-have",
        tierLabelColor: "#166534",
        bg: "rgba(248,114,58,0.07)",
        border: "rgba(248,114,58,0.22)",
        dotColor: SHELL_PRIMARY,
      };
    }
    return {
      label: "Nice-to-have",
      tierLabelColor: SHELL_MUTED,
      bg: "rgba(23,18,14,0.035)",
      border: "rgba(23,18,14,0.10)",
      dotColor: "#94a3b8",
    };
  };

  const mustHaveComps = competencies.filter(isIcpMustHaveComp);
  const niceToHaveComps = competencies.filter((c) => !isIcpMustHaveComp(c));
  const hasCompetencyLists = mustHaveComps.length > 0 || niceToHaveComps.length > 0;

  const competencyChip = (comp) => {
    const tier = tierMeta(comp.level);
    return (
      <Box
        key={comp.name}
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: 0.75,
          bgcolor: tier.bg,
          border: `1px solid ${tier.border}`,
          borderRadius: "10px",
          px: 1.25,
          py: 0.6,
        }}
      >
        <Box
          sx={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            bgcolor: tier.dotColor,
            flexShrink: 0,
          }}
        />
        <Typography
          component="span"
          sx={{
            fontSize: "0.75rem",
            fontWeight: 600,
            color: SHELL_INK,
            lineHeight: 1,
            letterSpacing: "-0.01em",
          }}
        >
          {comp.name}
        </Typography>
        <Typography
          component="span"
          sx={{
            fontSize: "0.6875rem",
            fontWeight: 600,
            color: tier.tierLabelColor,
            lineHeight: 1,
            letterSpacing: "0.01em",
          }}
        >
          {tier.label}
        </Typography>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        mt: 2.5,
        borderRadius: "14px",
        border: `1px solid ${borderColor}`,
        background: bgLuxury,
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.85), 0 1px 2px rgba(23,18,14,0.04)",
        px: { xs: 2, sm: 2.5 },
        py: { xs: 1.75, sm: 2 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Stack direction="row" spacing={1.5} alignItems="flex-start">
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: "10px",
            background: isSuccess
              ? "linear-gradient(145deg, rgba(22,163,74,0.18) 0%, rgba(22,163,74,0.08) 100%)"
              : isWarning
                ? "linear-gradient(145deg, rgba(180,83,9,0.12) 0%, rgba(180,83,9,0.05) 100%)"
                : "linear-gradient(145deg, rgba(99,102,241,0.18) 0%, rgba(99,102,241,0.08) 100%)",
            display: "grid",
            placeItems: "center",
            flexShrink: 0,
            mt: 0.1,
          }}
        >
          <AutoAwesomeIcon sx={{ fontSize: 17, color: accentColor }} />
        </Box>
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Stack direction="row" alignItems="flex-start" justifyContent="space-between" spacing={1}>
            <Typography sx={{ fontSize: "0.875rem", fontWeight: 700, color: SHELL_INK, lineHeight: 1.35, mb: 0.65 }}>
              {insight.headline}
            </Typography>
            {hasExpandable && (
              <Button
                disableRipple
                size="small"
                onClick={() => setShowComps((v) => !v)}
                endIcon={
                  <KeyboardArrowDownRoundedIcon
                    sx={{
                      fontSize: "16px !important",
                      transition: "transform 250ms ease",
                      transform: showComps ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  />
                }
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "0.75rem",
                  color: SHELL_PRIMARY,
                  px: 1,
                  py: 0.25,
                  borderRadius: "8px",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                  "&:hover": {
                    bgcolor: "rgba(248, 114, 58, 0.1)",
                    color: SHELL_PRIMARY,
                  },
                }}
              >
                {!hasComps ? (showComps ? "Hide details" : "Show details") : showComps ? "Hide competencies" : "Show competencies"}
              </Button>
            )}
          </Stack>
          <Typography sx={{ fontSize: "0.8125rem", color: "rgba(23,18,14,0.68)", lineHeight: 1.65, fontWeight: 400 }}>
            {insight.body}
          </Typography>

          {hasExpandable && (
            <Collapse in={showComps} timeout={320}>
              <Box
                sx={{
                  mt: 2,
                  pt: 1.75,
                  borderTop: `1px solid ${borderColor}`,
                }}
              >
                {hasCompetencyLists && (
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={0}
                    sx={{
                      alignItems: "flex-start",
                      gap: 0,
                    }}
                  >
                    {mustHaveComps.length > 0 && (
                      <Box
                        sx={{
                          flex: { sm: "1 1 0" },
                          minWidth: 0,
                          width: { xs: "100%", sm: "auto" },
                          pr: { sm: niceToHaveComps.length > 0 ? 2.5 : 0 },
                        }}
                      >
                        <Typography
                          component="h3"
                          sx={{
                            fontSize: "0.6875rem",
                            fontWeight: 800,
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            color: "rgba(23,18,14,0.55)",
                            lineHeight: 1.2,
                            mb: 1,
                          }}
                        >
                          Must-have for this role
                        </Typography>
                        <Stack direction="row" flexWrap="wrap" useFlexGap sx={{ gap: "6px" }}>
                          {mustHaveComps.map(competencyChip)}
                        </Stack>
                      </Box>
                    )}
                    {niceToHaveComps.length > 0 && (
                      <Box
                        sx={{
                          flex: { sm: "1 1 0" },
                          minWidth: 0,
                          width: { xs: "100%", sm: "auto" },
                          borderTop:
                            mustHaveComps.length > 0
                              ? { xs: `1px solid ${borderColor}`, sm: "none" }
                              : "none",
                          pt: mustHaveComps.length > 0 ? { xs: 2, sm: 0 } : 0,
                          borderLeft: mustHaveComps.length > 0 ? { sm: `1px solid ${borderColor}` } : "none",
                          pl: mustHaveComps.length > 0 ? { sm: 2.5 } : 0,
                        }}
                      >
                        <Typography
                          component="h3"
                          sx={{
                            fontSize: "0.6875rem",
                            fontWeight: 800,
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            color: "rgba(23,18,14,0.45)",
                            lineHeight: 1.2,
                            mb: 1,
                          }}
                        >
                          Nice-to-have
                        </Typography>
                        <Stack direction="row" flexWrap="wrap" useFlexGap sx={{ gap: "6px" }}>
                          {niceToHaveComps.map(competencyChip)}
                        </Stack>
                      </Box>
                    )}
                  </Stack>
                )}

                {hasActionItems && (
                  <Box
                    sx={{
                      mt: hasCompetencyLists ? 2 : 0,
                      pt: hasCompetencyLists ? 2 : 0,
                      borderTop: hasCompetencyLists ? `1px solid ${borderColor}` : "none",
                    }}
                  >
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      flexWrap="wrap"
                      useFlexGap
                      sx={{ columnGap: 1.5, rowGap: 1 }}
                    >
                      {insight.removeSuggestions && insight.removeSuggestions.length > 0 ? (
                        <Stack
                          direction="row"
                          spacing={0.65}
                          alignItems="center"
                          sx={{
                            flexWrap: "wrap",
                            gap: 0.65,
                            flex: "1 1 auto",
                            minWidth: 0,
                          }}
                        >
                          <Typography sx={{ fontSize: "0.75rem", fontWeight: 600, color: SHELL_MUTED }}>
                            Consider removing:
                          </Typography>
                          {insight.removeSuggestions.map((name) => (
                            <Chip
                              key={name}
                              label={name}
                              size="small"
                              sx={{
                                height: 26,
                                borderRadius: "8px",
                                fontSize: "0.75rem",
                                fontWeight: 600,
                                bgcolor: isWarning ? "rgba(180,83,9,0.08)" : "rgba(99,102,241,0.08)",
                                color: isWarning ? "#92400e" : "#4338ca",
                                border: `1px solid ${isWarning ? "rgba(180,83,9,0.18)" : "rgba(99,102,241,0.18)"}`,
                                "& .MuiChip-label": { px: 1 },
                              }}
                            />
                          ))}
                        </Stack>
                      ) : (
                        <Box sx={{ flex: "1 1 auto", minWidth: 0 }} />
                      )}
                      {insight.ctaLabel && (
                        <Button
                          size="small"
                          variant="outlined"
                          startIcon={<TuneRoundedIcon sx={{ fontSize: "15px !important" }} />}
                          sx={{
                            flexShrink: 0,
                            alignSelf: { xs: "flex-start", sm: "center" },
                            textTransform: "none",
                            fontWeight: 700,
                            fontSize: "0.8125rem",
                            borderRadius: "10px",
                            px: 2,
                            py: 0.7,
                            borderColor: accentColor,
                            color: accentColor,
                            "&:hover": {
                              bgcolor: isWarning ? "rgba(180,83,9,0.06)" : "rgba(99,102,241,0.06)",
                              borderColor: accentColor,
                            },
                          }}
                        >
                          {insight.ctaLabel}
                        </Button>
                      )}
                    </Stack>
                  </Box>
                )}
              </Box>
            </Collapse>
          )}
        </Box>
      </Stack>
    </Box>
  );
}

/** ~165 wpm, used only to drive the scrub timeline for speech synthesis (no real media clock). */
const VOICE_INTERVIEW_WPS = 2.75;

function estimateVoiceInterviewChunkMs(chunk) {
  const words = chunk.trim().split(/\s+/).filter(Boolean).length || 1;
  return Math.max(650, (words / VOICE_INTERVIEW_WPS) * 1000);
}

function splitInterviewTranscriptForPlayback(text) {
  const trimmed = (text || "").trim();
  if (!trimmed) return [""];
  const parts = trimmed.split(/(?<=[.!?])\s+/).filter(Boolean);
  return parts.length ? parts : [trimmed];
}

function estimateVoiceInterviewTotalMs(chunks) {
  if (!chunks.length) return 0;
  return chunks.reduce((sum, c) => sum + estimateVoiceInterviewChunkMs(c), 0);
}

/** Start index in full text so TTS does not begin mid clause after a scrub. */
function rewindVoiceAnswerToClauseStart(text, charPos) {
  const n = text.length;
  const i = Math.max(0, Math.min(charPos | 0, n));
  if (i <= 1) return 0;
  const head = text.slice(0, i);
  const re = /[.!?]\s+/g;
  let last = 0;
  let m = re.exec(head);
  while (m !== null) {
    last = m.index + m[0].length;
    m = re.exec(head);
  }
  return last;
}

function formatVoiceInterviewClock(totalSeconds) {
  const s = Math.max(0, Math.floor(totalSeconds));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${r.toString().padStart(2, "0")}`;
}

function CandidateDetailDialog({
  candidate,
  jobCompetencies,
  open,
  onClose,
  starred,
  onToggleStar,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
  unlockedIds,
  onUnlockCandidate,
}) {
  const [detailTab, setDetailTab] = useState(0);
  const [playingInterviewId, setPlayingInterviewId] = useState(null);
  const [voiceInterviewTransport, setVoiceInterviewTransport] = useState(null);
  const [voiceInterviewScrub, setVoiceInterviewScrub] = useState(null);
  const voiceSessionRef = useRef({
    rowId: null,
    chunks: [],
    chunkIndex: 0,
    chunkStartedAt: 0,
    cancelled: false,
    seekAnchorPercent: 0,
    totalMs: 0,
    fullText: "",
  });
  const voiceTickerRef = useRef(null);
  const isInterviewScrubbingRef = useRef(false);
  const voiceSliderSeekValueRef = useRef(0);
  const voiceSeekDedupeRef = useRef(0);

  const stopVoiceInterviewTicker = useCallback(() => {
    if (voiceTickerRef.current != null) {
      window.clearInterval(voiceTickerRef.current);
      voiceTickerRef.current = null;
    }
  }, []);

  const stopVoiceInterviewPlayback = useCallback(() => {
    voiceSessionRef.current.cancelled = true;
    if (typeof window !== "undefined" && window.speechSynthesis) window.speechSynthesis.cancel();
    stopVoiceInterviewTicker();
    voiceSessionRef.current = {
      rowId: null,
      chunks: [],
      chunkIndex: 0,
      chunkStartedAt: 0,
      cancelled: false,
      seekAnchorPercent: 0,
      totalMs: 0,
      fullText: "",
    };
    setPlayingInterviewId(null);
    setVoiceInterviewTransport(null);
    setVoiceInterviewScrub(null);
    isInterviewScrubbingRef.current = false;
  }, [stopVoiceInterviewTicker]);

  const startVoiceInterviewTicker = useCallback(() => {
    stopVoiceInterviewTicker();
    voiceTickerRef.current = window.setInterval(() => {
      if (isInterviewScrubbingRef.current) return;
      const s = voiceSessionRef.current;
      if (s.cancelled || !s.rowId || !s.chunks.length || s.chunkIndex >= s.chunks.length) return;
      const chunk = s.chunks[s.chunkIndex];
      const est = estimateVoiceInterviewChunkMs(chunk);
      const elapsed = s.chunkStartedAt ? Date.now() - s.chunkStartedAt : 0;
      const frac = Math.min(1, Math.max(0, elapsed / est));
      const pActive = s.chunks.length ? (100 * (s.chunkIndex + frac)) / s.chunks.length : 100;
      const anchor = typeof s.seekAnchorPercent === "number" ? s.seekAnchorPercent : 0;
      const displayValue = Math.min(100, anchor + (pActive / 100) * (100 - anchor));
      setVoiceInterviewTransport((prev) => {
        if (!prev || prev.rowId !== s.rowId) return prev;
        return { ...prev, value: displayValue };
      });
    }, 120);
  }, [stopVoiceInterviewTicker]);

  const speakVoiceInterviewFromChunk = useCallback(
    (rowId, chunks, startIndex, meta = {}) => {
      if (typeof window === "undefined" || !window.speechSynthesis) return;
      const { seekAnchorPercent = null, totalMs = null, fullText = null } = meta;
      stopVoiceInterviewTicker();
      window.speechSynthesis.cancel();
      queueMicrotask(() => {
        const sess = voiceSessionRef.current;
        sess.cancelled = false;
        sess.rowId = rowId;
        sess.chunks = chunks;
        sess.chunkIndex = startIndex;
        sess.chunkStartedAt = Date.now();
        if (seekAnchorPercent != null) sess.seekAnchorPercent = seekAnchorPercent;
        if (totalMs != null && totalMs > 0) sess.totalMs = totalMs;
        if (fullText != null) sess.fullText = fullText;

        const speakOne = (idx) => {
          const cur = voiceSessionRef.current;
          if (cur.cancelled || cur.rowId !== rowId) return;
          if (idx >= chunks.length) {
            stopVoiceInterviewPlayback();
            return;
          }
          cur.chunkIndex = idx;
          cur.chunkStartedAt = Date.now();
          const u = new SpeechSynthesisUtterance(chunks[idx]);
          u.rate = 1;
          u.onend = () => {
            if (voiceSessionRef.current.cancelled || voiceSessionRef.current.rowId !== rowId) return;
            speakOne(idx + 1);
          };
          u.onerror = () => {
            if (voiceSessionRef.current.cancelled) return;
            stopVoiceInterviewPlayback();
          };
          window.speechSynthesis.speak(u);
        };
        speakOne(startIndex);
      });
      startVoiceInterviewTicker();
    },
    [startVoiceInterviewTicker, stopVoiceInterviewPlayback, stopVoiceInterviewTicker],
  );

  const scrubVoiceInterviewToPercent = useCallback(
    (rowId, value, fullTranscript) => {
      if (typeof window === "undefined" || !window.speechSynthesis) return;
      const sess = voiceSessionRef.current;
      if (sess.rowId !== rowId) return;
      const text = (fullTranscript || sess.fullText || "").trim();
      if (!text) return;
      const fullChunks = splitInterviewTranscriptForPlayback(text);
      const totalMs = sess.totalMs > 0 ? sess.totalMs : estimateVoiceInterviewTotalMs(fullChunks);
      const totalChars = Math.max(1, text.length);
      const cp = Math.floor((Number(value) / 100) * totalChars);
      const start = rewindVoiceAnswerToClauseStart(text, cp);
      let suffix = text.slice(start).trim();
      if (!suffix) suffix = text;
      const newChunks = splitInterviewTranscriptForPlayback(suffix);
      const anchorPercent = (start / totalChars) * 100;
      setVoiceInterviewTransport({
        rowId,
        chunks: newChunks,
        value: anchorPercent,
        fullText: text,
        totalMs,
      });
      speakVoiceInterviewFromChunk(rowId, newChunks, 0, {
        seekAnchorPercent: anchorPercent,
        totalMs,
        fullText: text,
      });
    },
    [speakVoiceInterviewFromChunk],
  );

  const applyVoiceInterviewSeek = useCallback(
    (rowId, rawValue, transcript) => {
      const now = Date.now();
      if (now - voiceSeekDedupeRef.current < 95) return;
      voiceSeekDedupeRef.current = now;
      isInterviewScrubbingRef.current = false;
      setVoiceInterviewScrub(null);
      scrubVoiceInterviewToPercent(rowId, rawValue, transcript);
    },
    [scrubVoiceInterviewToPercent],
  );

  const toggleInterviewPlayback = useCallback(
    (rowId, transcript) => {
      if (typeof window === "undefined" || !window.speechSynthesis) return;
      if (playingInterviewId === rowId) {
        stopVoiceInterviewPlayback();
        return;
      }
      const chunks = splitInterviewTranscriptForPlayback(transcript);
      const totalMs = estimateVoiceInterviewTotalMs(chunks);
      const fullText = (transcript || "").trim();
      stopVoiceInterviewPlayback();
      voiceSliderSeekValueRef.current = 0;
      setPlayingInterviewId(rowId);
      setVoiceInterviewTransport({ rowId, chunks, value: 0, fullText, totalMs });
      speakVoiceInterviewFromChunk(rowId, chunks, 0, {
        seekAnchorPercent: 0,
        totalMs,
        fullText,
      });
    },
    [playingInterviewId, speakVoiceInterviewFromChunk, stopVoiceInterviewPlayback],
  );

  const [slideDir, setSlideDir] = useState(null);
  const [displayedCandidate, setDisplayedCandidate] = useState(candidate);
  const [workExpExpanded, setWorkExpExpanded] = useState(false);
  const [copiedField, setCopiedField] = useState(null);
  const copiedTimerRef = useRef(null);
  const prevCandidateIdRef = useRef(candidate.id);

  const copyContact = (text, field) => {
    if (copiedTimerRef.current) window.clearTimeout(copiedTimerRef.current);
    const run = async () => {
      try {
        await navigator.clipboard.writeText(text);
        setCopiedField(field);
        copiedTimerRef.current = window.setTimeout(() => setCopiedField(null), 2000);
      } catch {
        setCopiedField(null);
      }
    };
    run();
  };

  useEffect(() => {
    if (candidate.id !== prevCandidateIdRef.current) {
      const dir = slideDir || "left";
      setSlideDir(dir);
      setDisplayedCandidate(candidate);
      setDetailTab(0);
      stopVoiceInterviewPlayback();
      const t = setTimeout(() => {
        setSlideDir(null);
      }, 180);
      prevCandidateIdRef.current = candidate.id;
      return () => clearTimeout(t);
    }
  }, [candidate, slideDir, stopVoiceInterviewPlayback]);

  useEffect(() => {
    setWorkExpExpanded(false);
    setDetailTab(0);
    stopVoiceInterviewPlayback();
  }, [displayedCandidate.id, stopVoiceInterviewPlayback]);

  useEffect(() => {
    setCopiedField(null);
    if (copiedTimerRef.current) {
      window.clearTimeout(copiedTimerRef.current);
      copiedTimerRef.current = null;
    }
  }, [displayedCandidate.id]);

  useEffect(
    () => () => {
      if (copiedTimerRef.current) window.clearTimeout(copiedTimerRef.current);
      stopVoiceInterviewPlayback();
    },
    [stopVoiceInterviewPlayback],
  );

  useEffect(() => {
    if (detailTab !== 1) {
      stopVoiceInterviewPlayback();
    }
  }, [detailTab, stopVoiceInterviewPlayback]);

  const matchColor = getMatchColor(displayedCandidate.matchScore);
  const matchLabel = getMatchLabel(displayedCandidate.matchScore);
  const fullName = `${displayedCandidate.firstName} ${displayedCandidate.lastName}`;
  const candidatePublicId = formatCandidatePublicId(displayedCandidate.id);
  const isDisplayedLocked = Boolean(displayedCandidate.locked) && !unlockedIds?.has(displayedCandidate.id);
  const nameDisplay = isDisplayedLocked ? maskName(displayedCandidate.firstName, displayedCandidate.lastName) : fullName;
  const emailDisplay = isDisplayedLocked ? "locked.contact@candidate.com" : displayedCandidate.email;
  const phoneDisplay = isDisplayedLocked ? "(*** ) ***-****" : displayedCandidate.phone;

  const candidateCompMap = {};
  displayedCandidate.competencies.forEach((c) => { candidateCompMap[c.name] = c.score; });

  const icpComps = jobCompetencies.map((jc) => {
    const score = candidateCompMap[jc.name] ?? null;
    return { ...jc, candidateScore: score, match: score !== null };
  });

  const matchedComps = icpComps.filter((c) => c.match);
  const missingMustHaveComps = icpComps.filter((c) => !c.match && isIcpMustHaveComp(c));
  const idealProfileGaps = icpComps.filter(
    (c) => isIcpMustHaveComp(c) && c.match && c.candidateScore !== null && c.candidateScore < 72,
  );

  const sortedCompsForCopy = [...displayedCandidate.competencies].sort((a, b) => b.score - a.score);
  const weakestComps = [...displayedCandidate.competencies].sort((a, b) => a.score - b.score).slice(0, 3);
  const strengthBullets = [
    "Lean on the spikes below as quick proof prompts. One focused thread each beats rereading the full scorecard.",
    ...sortedCompsForCopy.slice(0, 2).map((c) => `${c.name} is where the rubric lines up strongest for this slate.`),
  ].slice(0, 3);
  const weaknessBullets = (
    weakestComps.length > 0
      ? weakestComps.map((w) => `${w.name} is worth one sharp customer story before you treat it as a concern.`)
      : [
          "Nothing reads cold on paper. Still, try one renewal rehearsal with a tough room. Composure there often tells the real story.",
        ]
  ).slice(0, 3);

  const voiceInterviewRows = getVoiceInterviewForCandidate(displayedCandidate.id);

  if (!open) return null;

  const dialogProfile = CANDIDATE_PROFILE[displayedCandidate.id];
  const workExperienceAll = dialogProfile?.experience ?? [];
  const WORK_EXP_PREVIEW = 2;
  const workExperienceVisible = workExpExpanded ? workExperienceAll : workExperienceAll.slice(0, WORK_EXP_PREVIEW);
  const workExperienceHasMore = workExperienceAll.length > WORK_EXP_PREVIEW;

  const levelLabels = { High: "Must-have", Low: "Nice-to-have" };
  const levelColors = { High: "#16a34a", Low: "#64748b" };
  const levelRank = { High: 0, Low: 1 };

  const icpRoleLabel = (c) => {
    if (c.icpGroup === "must-have") return "Must-have";
    if (c.icpGroup === "nice-to-have") return "Nice-to-have";
    return levelLabels[c.level] || c.level;
  };
  const icpRoleColor = (c) => {
    if (c.icpGroup === "must-have" || c.level === "High") return "#16a34a";
    if (c.icpGroup === "nice-to-have") return "#64748b";
    return levelColors[c.level] || "#64748b";
  };

  return (
    <>
      <Box
        role="presentation"
        onClick={onClose}
        sx={{ position: "fixed", inset: 0, bgcolor: "rgba(18,10,4,0.32)", zIndex: 1298 }}
      />
      <Box
        role="dialog"
        aria-label={`Candidate ${candidatePublicId}, ${fullName}, details`}
        sx={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "96vw", sm: 780, md: 920 },
          maxWidth: 920,
          height: "90vh",
          maxHeight: "90vh",
          minHeight: 0,
          bgcolor: "#fff",
          borderRadius: "18px",
          zIndex: 1299,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 32px 80px rgba(23,18,14,0.18), 0 8px 24px rgba(23,18,14,0.06)",
          animation: "cdDialogIn 200ms ease-out",
          "@keyframes cdDialogIn": {
            from: { opacity: 0, transform: "translate(-50%, -48%) scale(0.97)" },
            to: { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
          },
        }}
      >
        {/* Header */}
        <Box sx={{ px: 3, pt: 2.5, pb: 2, flexShrink: 0 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Stack direction="row" alignItems="center" spacing={1.5} sx={{ flex: 1, minWidth: 0 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  minWidth: 56,
                  alignSelf: "center",
                }}
              >
                <Tooltip title={`${displayedCandidate.matchScore}% match, ${matchLabel}`} arrow placement="top">
                  <Box
                    component="span"
                    aria-label={`Match score ${displayedCandidate.matchScore} percent, ${matchLabel}`}
                    sx={{
                      display: "inline-flex",
                      lineHeight: 0,
                      verticalAlign: "middle",
                    }}
                  >
                    <ScoreGauge score={displayedCandidate.matchScore} size={56} showTierLabel={false} />
                  </Box>
                </Tooltip>
              </Box>
              <Box sx={{ minWidth: 0, flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <Stack direction="row" alignItems="baseline" spacing={1} flexWrap="wrap" useFlexGap sx={{ columnGap: 1, rowGap: 0.25 }}>
                  <Typography sx={{ fontSize: "1.125rem", fontWeight: 800, color: SHELL_INK, letterSpacing: "-0.025em", lineHeight: 1.2 }}>
                    {nameDisplay}
                  </Typography>
                  <Typography
                    component="span"
                    sx={{
                      fontSize: "0.8125rem",
                      fontWeight: 600,
                      color: "rgba(107,99,92,0.75)",
                      letterSpacing: "0.06em",
                      fontVariantNumeric: "tabular-nums",
                      lineHeight: 1.25,
                    }}
                  >
                    {candidatePublicId}
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  alignItems="center"
                  flexWrap="wrap"
                  useFlexGap
                  sx={{ gap: 0.75, rowGap: 0.35, mt: 0.5, width: "100%" }}
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={0.65}
                    sx={{
                      minWidth: 0,
                      maxWidth: "100%",
                      flex: { xs: "1 1 100%", sm: "0 1 auto" },
                      filter: isDisplayedLocked ? "blur(2.8px)" : "none",
                      opacity: isDisplayedLocked ? 0.82 : 1,
                      "&:hover .cd-copy-email": { opacity: 1, pointerEvents: "auto" },
                    }}
                  >
                    <EmailOutlinedIcon sx={{ fontSize: 15, color: SHELL_MUTED, flexShrink: 0 }} aria-hidden />
                    <Typography
                      component="span"
                      sx={{
                        fontSize: "0.78rem",
                        fontWeight: 500,
                        color: SHELL_INK,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        minWidth: 0,
                        maxWidth: { xs: "min(100%, 220px)", sm: "min(100%, 240px)" },
                      }}
                    >
                      {emailDisplay}
                    </Typography>
                    {!isDisplayedLocked && (
                      <Tooltip title={copiedField === "email" ? "Copied" : "Copy email"} arrow disableInteractive>
                        <IconButton
                          type="button"
                          className="cd-copy-email"
                          size="small"
                          aria-label="Copy email"
                          onClick={(e) => {
                            e.stopPropagation();
                            copyContact(displayedCandidate.email, "email");
                          }}
                          sx={{
                            flexShrink: 0,
                            opacity: 0,
                            pointerEvents: "none",
                            transition: "opacity 140ms ease",
                            p: 0.35,
                            color: SHELL_MUTED,
                            "&:hover": { color: SHELL_INK, bgcolor: "rgba(23,18,14,0.06)" },
                          }}
                        >
                          <ContentCopyOutlinedIcon sx={{ fontSize: 16 }} />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Stack>
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={0.65}
                    sx={{
                      flexShrink: 0,
                      filter: isDisplayedLocked ? "blur(2.8px)" : "none",
                      opacity: isDisplayedLocked ? 0.82 : 1,
                      "&:hover .cd-copy-phone": { opacity: 1, pointerEvents: "auto" },
                    }}
                  >
                    <PhoneOutlinedIcon sx={{ fontSize: 15, color: SHELL_MUTED, flexShrink: 0 }} aria-hidden />
                    <Typography component="span" sx={{ fontSize: "0.78rem", fontWeight: 500, color: SHELL_INK }}>
                      {phoneDisplay}
                    </Typography>
                    {!isDisplayedLocked && (
                      <Tooltip title={copiedField === "phone" ? "Copied" : "Copy phone"} arrow disableInteractive>
                        <IconButton
                          type="button"
                          className="cd-copy-phone"
                          size="small"
                          aria-label="Copy phone number"
                          onClick={(e) => {
                            e.stopPropagation();
                            copyContact(displayedCandidate.phone, "phone");
                          }}
                          sx={{
                            flexShrink: 0,
                            opacity: 0,
                            pointerEvents: "none",
                            transition: "opacity 140ms ease",
                            p: 0.35,
                            color: SHELL_MUTED,
                            "&:hover": { color: SHELL_INK, bgcolor: "rgba(23,18,14,0.06)" },
                          }}
                        >
                          <ContentCopyOutlinedIcon sx={{ fontSize: 16 }} />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Stack>
                </Stack>
              </Box>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <Tooltip title={starred ? "Remove star" : "Star for quick reference"} arrow>
                <IconButton
                  size="small"
                  aria-label={starred ? `Remove star from ${fullName}, candidate ${candidatePublicId}` : `Star ${fullName}, candidate ${candidatePublicId}, for quick reference`}
                  onClick={() => onToggleStar(displayedCandidate.id)}
                  sx={{
                    color: starred ? SHORTLIST_STAR_ACTIVE : SHELL_MUTED,
                    "&:hover": starred
                      ? { color: SHORTLIST_STAR_ACTIVE, bgcolor: "rgba(234, 179, 8, 0.18)" }
                      : { color: SHELL_INK },
                  }}
                >
                  {starred ? <StarRoundedIcon sx={{ fontSize: 22 }} /> : <StarOutlineRoundedIcon sx={{ fontSize: 22 }} />}
                </IconButton>
              </Tooltip>
              <IconButton size="small" onClick={onClose} sx={{ color: SHELL_MUTED, "&:hover": { color: SHELL_INK } }}>
                <CloseOutlinedIcon sx={{ fontSize: 20 }} />
              </IconButton>
            </Stack>
          </Stack>
        </Box>

        <Box
          sx={{
            flexShrink: 0,
            px: { xs: 1.5, sm: 2.5 },
            pt: 0.75,
            pb: 0,
            bgcolor: "#ffffff",
            borderBottom: "1px solid rgba(220,212,202,0.45)",
          }}
        >
          <Tabs
            value={detailTab}
            onChange={(_, v) => setDetailTab(v)}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={{
              minHeight: 48,
              "& .MuiTab-root": {
                textTransform: "none",
                fontWeight: 700,
                fontSize: "0.8125rem",
                minHeight: 48,
                px: 1.5,
                py: 0.5,
                gap: 0.75,
                color: "rgba(107,99,92,0.75)",
                transition: "color 0.18s ease",
              },
              "& .MuiTab-iconWrapper": { marginBottom: 0 },
              "& .MuiTab-root.Mui-selected": { color: SHELL_INK },
              "& .MuiTabs-indicator": { height: 3, borderRadius: "3px 3px 0 0", bgcolor: SHELL_PRIMARY },
            }}
          >
            <Tab
              disableRipple
              iconPosition="start"
              icon={
                detailTab === 0 ? (
                  <AutoAwesomeIcon sx={{ fontSize: 20, color: SHELL_PRIMARY }} aria-hidden />
                ) : (
                  <AutoAwesomeOutlinedIcon sx={{ fontSize: 20, color: SHELL_MUTED }} aria-hidden />
                )
              }
              label="AI Insights"
            />
            <Tooltip
              title="Unlock candidate to view these details"
              arrow
              placement="top"
              disableHoverListener={!isDisplayedLocked}
            >
              <span>
                <Tab
                  disableRipple
                  disabled={isDisplayedLocked}
                  iconPosition="start"
                  icon={
                    detailTab === 1 ? (
                      <GraphicEqRoundedIcon sx={{ fontSize: 20, color: SHELL_PRIMARY }} aria-hidden />
                    ) : (
                      <GraphicEqOutlinedIcon sx={{ fontSize: 20, color: SHELL_MUTED }} aria-hidden />
                    )
                  }
                  label="ZappyFind interview"
                />
              </span>
            </Tooltip>
            <Tooltip
              title="Unlock candidate to view these details"
              arrow
              placement="top"
              disableHoverListener={!isDisplayedLocked}
            >
              <span>
                <Tab
                  disableRipple
                  disabled={isDisplayedLocked}
                  iconPosition="start"
                  icon={
                    detailTab === 2 ? (
                      <PersonRoundedIcon sx={{ fontSize: 20, color: SHELL_PRIMARY }} aria-hidden />
                    ) : (
                      <PersonOutlineRoundedIcon sx={{ fontSize: 20, color: SHELL_MUTED }} aria-hidden />
                    )
                  }
                  label="Profile"
                />
              </span>
            </Tooltip>
          </Tabs>
        </Box>

        <Box
          sx={{
            flex: 1,
            minHeight: 0,
            overflowY: "auto",
            overflowX: "hidden",
            px: 3,
            py: 2.5,
            position: "relative",
            WebkitOverflowScrolling: "touch",
            overscrollBehavior: "contain",
          }}
        >
          <Box
            key={displayedCandidate.id}
            component={motion.div}
            initial={{
              opacity: 0,
              x: slideDir ? (slideDir === "left" ? 26 : -26) : 0,
              filter: "blur(2px)",
            }}
            animate={{
              opacity: 1,
              x: 0,
              filter: "blur(0px)",
            }}
            transition={{
              duration: 0.24,
              ease: [0.22, 1, 0.36, 1],
            }}
            sx={{
              width: "100%",
              boxSizing: "border-box",
              pb: 1,
              willChange: "transform, opacity, filter",
            }}
          >
            {detailTab === 0 && (
              <Box sx={{ position: "relative" }}>
                <Box
                  sx={{
                    transition: "opacity 0.2s ease",
                  }}
                >
                  <AiMatchInsightPanel
                    matchLabel={matchLabel}
                    aiReason={displayedCandidate.aiReason}
                    wrapperSx={{ mt: 0, mb: 2.5 }}
                    showTopStrengths={false}
                  />

                  <Box sx={{ mb: 2.5, position: "relative" }}>
                    <Box
                      sx={{
                        filter: isDisplayedLocked ? "blur(6px)" : "none",
                        opacity: isDisplayedLocked ? 0.6 : 1,
                        pointerEvents: isDisplayedLocked ? "none" : "auto",
                        userSelect: isDisplayedLocked ? "none" : "auto",
                        transition: "filter 0.2s ease, opacity 0.2s ease",
                      }}
                    >
                    <Stack direction={{ xs: "column", md: "row" }} spacing={2.25} sx={{ alignItems: "stretch" }}>
                    <Box
                      sx={{
                        flex: 1,
                        minWidth: 0,
                        borderRadius: "16px",
                        overflow: "hidden",
                        background: "linear-gradient(180deg, rgba(236,253,245,0.88) 0%, rgba(255,255,255,0.96) 38%, #ffffff 100%)",
                        boxShadow: "0 4px 16px rgba(22,163,74,0.045), 0 1px 4px rgba(23,18,14,0.04)",
                        p: { xs: 2, sm: 2.25 },
                        transition: "box-shadow 0.28s ease, transform 0.28s ease",
                        "&:hover": {
                          boxShadow: "0 8px 24px rgba(22,163,74,0.065), 0 2px 8px rgba(23,18,14,0.045)",
                          transform: "translateY(-1px)",
                        },
                      }}
                    >
                      <Stack direction="row" alignItems="center" spacing={1.25} sx={{ mb: 2 }}>
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: "12px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            bgcolor: "rgba(22,163,74,0.14)",
                          }}
                        >
                          <CheckCircleOutlineRoundedIcon sx={{ fontSize: 22, color: "#16a34a" }} aria-hidden />
                        </Box>
                        <Typography
                          sx={{
                            fontSize: "0.8125rem",
                            fontWeight: 600,
                            letterSpacing: "-0.02em",
                            color: SHELL_INK,
                            lineHeight: 1.35,
                          }}
                        >
                          Strengths to lean on
                        </Typography>
                      </Stack>
                      <Box component="ul" sx={{ m: 0, p: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 1.15 }}>
                        {strengthBullets.map((line, idx) => (
                          <Box
                            component="li"
                            key={`st-${idx}`}
                            sx={{
                              display: "flex",
                              gap: 1.15,
                              alignItems: "flex-start",
                            }}
                          >
                            <Box
                              sx={{
                                width: 7,
                                height: 7,
                                borderRadius: "50%",
                                bgcolor: "rgba(22,163,74,0.42)",
                                mt: "0.4rem",
                                flexShrink: 0,
                              }}
                            />
                            <Typography
                              sx={{
                                fontSize: "0.8125rem",
                                color: "rgba(23,18,14,0.78)",
                                lineHeight: 1.58,
                                fontWeight: 500,
                                letterSpacing: "-0.01em",
                              }}
                            >
                              {line}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        flex: 1,
                        minWidth: 0,
                        borderRadius: "16px",
                        overflow: "hidden",
                        background: "linear-gradient(180deg, rgba(255,248,225,0.82) 0%, rgba(255,255,255,0.96) 38%, #ffffff 100%)",
                        boxShadow: "0 4px 16px rgba(245,158,11,0.05), 0 1px 4px rgba(23,18,14,0.04)",
                        p: { xs: 2, sm: 2.25 },
                        transition: "box-shadow 0.28s ease, transform 0.28s ease",
                        "&:hover": {
                          boxShadow: "0 8px 24px rgba(245,158,11,0.075), 0 2px 8px rgba(23,18,14,0.045)",
                          transform: "translateY(-1px)",
                        },
                      }}
                    >
                      <Stack direction="row" alignItems="center" spacing={1.25} sx={{ mb: 2 }}>
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: "12px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            bgcolor: "rgba(245,158,11,0.16)",
                          }}
                        >
                          <WarningAmberRoundedIcon sx={{ fontSize: 22, color: "#d97706" }} aria-hidden />
                        </Box>
                        <Typography
                          sx={{
                            fontSize: "0.8125rem",
                            fontWeight: 600,
                            letterSpacing: "-0.02em",
                            color: SHELL_INK,
                            lineHeight: 1.35,
                          }}
                        >
                          Where to probe deeper
                        </Typography>
                      </Stack>
                      <Box component="ul" sx={{ m: 0, p: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 1.15 }}>
                        {weaknessBullets.map((line, idx) => (
                          <Box
                            component="li"
                            key={`wk-${idx}`}
                            sx={{
                              display: "flex",
                              gap: 1.15,
                              alignItems: "flex-start",
                            }}
                          >
                            <Box
                              sx={{
                                width: 7,
                                height: 7,
                                borderRadius: "50%",
                                bgcolor: "rgba(217,119,6,0.48)",
                                mt: "0.4rem",
                                flexShrink: 0,
                              }}
                            />
                            <Typography
                              sx={{
                                fontSize: "0.8125rem",
                                color: "rgba(23,18,14,0.78)",
                                lineHeight: 1.58,
                                fontWeight: 500,
                                letterSpacing: "-0.01em",
                              }}
                            >
                              {line}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                    </Stack>
                  </Box>

                  <Box
                    sx={{
                      mb: 2.5,
                      borderRadius: "16px",
                      border: "1px solid rgba(23,18,14,0.07)",
                      bgcolor: "#ffffff",
                      boxShadow: "0 4px 22px rgba(23,18,14,0.045)",
                      overflow: "hidden",
                      filter: isDisplayedLocked ? "blur(10px)" : "none",
                      opacity: isDisplayedLocked ? 0.45 : 1,
                      transition: "filter 0.2s ease, opacity 0.2s ease",
                    }}
                  >
                  <Box sx={{ px: 2.25, pt: 2.25, pb: 1.75 }}>
                    <Typography sx={{ fontSize: "13px", fontWeight: 600, letterSpacing: "-0.03em", color: SHELL_INK, lineHeight: 1.2 }}>
                      Competency fit analysis
                    </Typography>
                    <Typography sx={{ mt: 0.7, fontSize: "0.75rem", fontWeight: 500, color: "rgba(23,18,14,0.56)", lineHeight: 1.45 }}>
                      Evaluated against this role&apos;s configured Ideal Candidate Profile.
                    </Typography>
                  </Box>

                  <Box sx={{ px: 2, pb: 2, pt: 2, bgcolor: "rgba(248,246,243,0.55)", borderTop: "1px solid rgba(220,212,202,0.42)" }}>
                    <Stack direction="row" spacing={1.25} alignItems="center" justifyContent="flex-start" sx={{ mb: 2 }}>
                      <Box
                        sx={{
                          width: 30,
                          height: 30,
                          borderRadius: "10px",
                          flexShrink: 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "0.8125rem",
                          fontWeight: 800,
                          color: "#15803d",
                          bgcolor: "rgba(22,163,74,0.12)",
                          border: "1px solid rgba(22,163,74,0.2)",
                        }}
                      >
                        {matchedComps.length}
                      </Box>
                      <Box sx={{ minWidth: 0 }}>
                        <Typography
                          component="h3"
                          sx={{
                            fontSize: "13px",
                            fontWeight: 600,
                            letterSpacing: "-0.02em",
                            color: SHELL_INK,
                            lineHeight: 1.3,
                          }}
                        >
                          Matching competencies
                        </Typography>
                      </Box>
                    </Stack>

                    {matchedComps.length === 0 ? (
                      <Typography sx={{ fontSize: "0.8125rem", fontWeight: 500, color: "rgba(107,99,92,0.82)", py: 0.25 }}>
                        No named overlap with your published competency list on this record. Screen manually if adjacent skills can count.
                      </Typography>
                    ) : (
                      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 1.1, width: "100%" }}>
                        {matchedComps
                          .slice()
                          .sort((a, b) => {
                            const ra = levelRank[a.level] ?? 9;
                            const rb = levelRank[b.level] ?? 9;
                            if (ra !== rb) return ra - rb;
                            return a.name.localeCompare(b.name);
                          })
                          .map((comp) => (
                            <Box
                              key={`mt-${comp.name}`}
                              sx={{
                                minWidth: 0,
                                width: "100%",
                                boxSizing: "border-box",
                                borderRadius: "12px",
                                p: 1.1,
                                border: "1px solid rgba(220,212,202,0.5)",
                                bgcolor: "#ffffff",
                                transition: "border-color 140ms ease",
                                "&:hover": { borderColor: `${levelColors[comp.level]}55` },
                              }}
                            >
                              <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={0.75} sx={{ width: "100%" }}>
                                <Stack direction="row" alignItems="center" spacing={0.65} sx={{ minWidth: 0, flex: 1 }}>
                                  <Box
                                    sx={{
                                      width: 26,
                                      height: 26,
                                      borderRadius: "8px",
                                      flexShrink: 0,
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      bgcolor: `${levelColors[comp.level]}0c`,
                                      border: `1px solid ${levelColors[comp.level]}20`,
                                    }}
                                  >
                                    <CheckCircleOutlineRoundedIcon sx={{ fontSize: 15, color: levelColors[comp.level], opacity: 0.72 }} />
                                  </Box>
                                  <Typography sx={{ fontSize: "0.8125rem", fontWeight: 500, color: SHELL_INK, letterSpacing: "-0.02em", lineHeight: 1.25 }}>
                                    {comp.name}
                                  </Typography>
                                </Stack>
                                <Chip
                                  label={icpRoleLabel(comp)}
                                  size="small"
                                  sx={{
                                    height: 22,
                                    flexShrink: 0,
                                    fontSize: "0.55rem",
                                    fontWeight: 800,
                                    letterSpacing: "0.04em",
                                    ...(isIcpMustHaveComp(comp)
                                      ? {
                                          bgcolor: "rgba(22,163,74,0.12)",
                                          color: "#15803d",
                                          border: "1px solid rgba(22,163,74,0.22)",
                                        }
                                      : {
                                          bgcolor: "rgba(100,116,139,0.1)",
                                          color: "#64748b",
                                          border: "1px solid rgba(100,116,139,0.22)",
                                        }),
                                  }}
                                />
                              </Stack>
                            </Box>
                          ))}
                      </Box>
                    )}
                  </Box>

                  <Box
                    sx={{
                      px: 2.25,
                      py: 2.25,
                      borderTop: "1px solid rgba(220,212,202,0.42)",
                      bgcolor: missingMustHaveComps.length > 0 ? "rgba(254,242,242,0.42)" : "rgba(255,255,255,0.98)",
                    }}
                  >
                    <Stack direction="row" spacing={1.25} alignItems="flex-start" sx={{ mb: missingMustHaveComps.length > 0 ? 1.35 : 0.5 }}>
                      <Box
                        sx={{
                          width: 30,
                          height: 30,
                          borderRadius: "10px",
                          flexShrink: 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "0.8125rem",
                          fontWeight: 800,
                          color: "rgba(185,28,28,0.88)",
                          bgcolor: "rgba(185,28,28,0.1)",
                          border: "1px solid rgba(185,28,28,0.2)",
                        }}
                      >
                        2
                      </Box>
                      <Box sx={{ minWidth: 0, flex: 1 }}>
                        <Typography
                          component="h3"
                          sx={{
                            fontSize: "13px",
                            fontWeight: 600,
                            letterSpacing: "-0.02em",
                            color: SHELL_INK,
                            lineHeight: 1.3,
                          }}
                        >
                          Missing must-have competencies
                        </Typography>
                        <Typography sx={{ fontSize: "0.75rem", fontWeight: 400, color: SHELL_MUTED, lineHeight: 1.5, mt: 0, maxWidth: 520 }}>
                          Required by your ideal candidate profile but absent from this profile.
                        </Typography>
                      </Box>
                    </Stack>
                    {missingMustHaveComps.length > 0 ? (
                      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 1.1, width: "100%" }}>
                        {missingMustHaveComps.map((comp) => (
                          <Box
                            key={comp.name}
                            sx={{
                              minWidth: 0,
                              width: "100%",
                              boxSizing: "border-box",
                              borderRadius: "12px",
                              p: 1.1,
                              border: "1px solid rgba(252,165,165,0.45)",
                              bgcolor: "#ffffff",
                              transition: "border-color 140ms ease",
                              "&:hover": { borderColor: "rgba(220,38,38,0.28)" },
                            }}
                          >
                            <Stack direction="row" alignItems="center" spacing={0.65} sx={{ width: "100%", minWidth: 0 }}>
                              <Box
                                sx={{
                                  width: 26,
                                  height: 26,
                                  borderRadius: "8px",
                                  flexShrink: 0,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  bgcolor: "rgba(185,28,28,0.06)",
                                  border: "1px solid rgba(185,28,28,0.14)",
                                }}
                              >
                                <ErrorOutlineRoundedIcon sx={{ fontSize: 15, color: "rgba(185,28,28,0.58)" }} aria-hidden />
                              </Box>
                              <Typography
                                sx={{
                                  fontSize: "0.8125rem",
                                  fontWeight: 500,
                                  color: SHELL_INK,
                                  letterSpacing: "-0.02em",
                                  lineHeight: 1.25,
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  display: "-webkit-box",
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: "vertical",
                                  minWidth: 0,
                                  flex: 1,
                                }}
                              >
                                {comp.name}
                              </Typography>
                            </Stack>
                          </Box>
                        ))}
                      </Box>
                    ) : (
                      <Typography sx={{ fontSize: "0.8125rem", fontWeight: 500, color: "rgba(107,99,92,0.82)", lineHeight: 1.5 }}>
                        None. Every must-have on your ideal profile appears on this candidate record. Keep validating depth in interview.
                      </Typography>
                    )}
                  </Box>

                    {idealProfileGaps.length > 0 && (
                      <Box sx={{ px: 2.25, py: 2.25, borderTop: "1px solid rgba(220,212,202,0.42)", bgcolor: "rgba(255,251,235,0.55)" }}>
                      <Stack direction="row" spacing={1.25} alignItems="flex-start" sx={{ mb: 1.25 }}>
                        <Box
                          sx={{
                            width: 30,
                            height: 30,
                            borderRadius: "10px",
                            flexShrink: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "0.8125rem",
                            fontWeight: 800,
                            color: "#b45309",
                            bgcolor: "rgba(245,158,11,0.14)",
                            border: "1px solid rgba(245,158,11,0.28)",
                          }}
                        >
                          3
                        </Box>
                        <Box sx={{ minWidth: 0 }}>
                          <Typography sx={{ fontSize: "0.9375rem", fontWeight: 700, letterSpacing: "-0.02em", color: SHELL_INK }}>
                            Rubric depth to watch
                            <Typography component="span" sx={{ fontWeight: 700, color: "rgba(107,99,92,0.72)", ml: 0.5, fontSize: "0.875rem" }}>
                              ({idealProfileGaps.length})
                            </Typography>
                          </Typography>
                          <Typography sx={{ fontSize: "0.75rem", fontWeight: 500, color: SHELL_MUTED, lineHeight: 1.5, mt: 0.35 }}>
                            On file, but under a 72 signal for a must-have. Worth a focused interview thread.
                          </Typography>
                        </Box>
                      </Stack>
                      <Stack spacing={0.75}>
                        {idealProfileGaps.map((comp) => (
                          <Stack
                            key={`gap-${comp.name}`}
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            spacing={1}
                            sx={{
                              py: 0.75,
                              px: 1.1,
                              borderRadius: "12px",
                              bgcolor: "#ffffff",
                              border: "1px solid rgba(220,212,202,0.48)",
                            }}
                          >
                            <Typography sx={{ fontSize: "0.8125rem", fontWeight: 700, color: SHELL_INK, minWidth: 0, flex: 1 }}>
                              {comp.name}
                            </Typography>
                            <Chip
                              label={icpRoleLabel(comp)}
                              size="small"
                              sx={{
                                height: 22,
                                fontSize: "0.55rem",
                                fontWeight: 800,
                                bgcolor: "rgba(22,163,74,0.1)",
                                color: "#15803d",
                                border: "1px solid rgba(22,163,74,0.22)",
                              }}
                            />
                            <Typography sx={{ fontSize: "0.75rem", fontWeight: 700, color: "#b45309", flexShrink: 0, fontVariantNumeric: "tabular-nums" }}>
                              {comp.candidateScore}
                            </Typography>
                          </Stack>
                        ))}
                      </Stack>
                      </Box>
                    )}
                    </Box>
                    {isDisplayedLocked && (
                      <Box
                        sx={{
                          position: "absolute",
                          inset: 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          px: 2,
                          zIndex: 2,
                        }}
                      >
                        <Box
                          sx={{
                            maxWidth: 440,
                            width: "100%",
                            textAlign: "center",
                            borderRadius: "18px",
                            border: "1px solid rgba(248,114,58,0.2)",
                            background: "linear-gradient(168deg, rgba(255,255,255,0.97) 0%, rgba(255,250,246,0.96) 45%, rgba(255,255,255,0.98) 100%)",
                            boxShadow: "0 18px 44px rgba(23,18,14,0.1), inset 0 1px 0 rgba(255,255,255,0.9)",
                            px: 2.5,
                            py: 2.25,
                            position: "relative",
                            overflow: "hidden",
                            "&::before": {
                              content: '""',
                              position: "absolute",
                              top: 0,
                              left: "18%",
                              right: "18%",
                              height: 2,
                              borderRadius: "0 0 12px 12px",
                              background: "linear-gradient(90deg, rgba(248,114,58,0) 0%, rgba(248,114,58,0.42) 50%, rgba(248,114,58,0) 100%)",
                            },
                          }}
                        >
                          <Stack direction="row" justifyContent="center" alignItems="center" spacing={1} sx={{ mb: 1.2 }}>
                            <Box
                              sx={{
                                width: 44,
                                height: 44,
                                borderRadius: "14px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                background: "linear-gradient(150deg, rgba(248,114,58,0.2) 0%, rgba(248,114,58,0.06) 100%)",
                                border: "1px solid rgba(248,114,58,0.24)",
                              }}
                            >
                              <LockOutlinedIcon sx={{ fontSize: 22, color: SHELL_PRIMARY }} />
                            </Box>
                          </Stack>
                          <Typography sx={{ fontSize: "0.96rem", fontWeight: 700, color: SHELL_INK, letterSpacing: "-0.02em", mb: 0.55 }}>
                            Unlock to view candidate details
                          </Typography>
                          <Typography sx={{ fontSize: "0.8rem", fontWeight: 500, color: SHELL_MUTED, lineHeight: 1.55, mb: 1.5, maxWidth: 360, mx: "auto" }}>
                            Contact details, strengths, competency fit analysis, and missing must-have gaps are available after unlocking this candidate.
                          </Typography>
                          <Button
                            variant="contained"
                            onClick={() => onUnlockCandidate(displayedCandidate.id)}
                            sx={{
                              textTransform: "none",
                              fontWeight: 700,
                              borderRadius: "11px",
                              px: 2.15,
                              py: 0.72,
                              bgcolor: SHELL_PRIMARY,
                              boxShadow: "0 8px 20px rgba(248,114,58,0.22)",
                              "&:hover": { bgcolor: "#e66a33", boxShadow: "0 10px 24px rgba(248,114,58,0.28)" },
                            }}
                          >
                            Unlock Candidate
                          </Button>
                        </Box>
                      </Box>
                    )}
                  </Box>
                </Box>
              </Box>
            )}

            {detailTab === 1 && (
              <Box sx={{ mb: 1 }}>
                <Stack direction="row" spacing={1.5} alignItems="flex-start" sx={{ mb: 2, pb: 1 }}>
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: "12px",
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: `linear-gradient(145deg, ${SHELL_PRIMARY}18 0%, ${matchColor}12 100%)`,
                      border: "1px solid rgba(248,114,58,0.2)",
                      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.8)",
                    }}
                  >
                    <GraphicEqRoundedIcon sx={{ fontSize: 22, color: SHELL_PRIMARY, opacity: 0.85 }} aria-hidden />
                  </Box>
                  <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography sx={{ fontSize: "1rem", fontWeight: 700, color: SHELL_INK, letterSpacing: "-0.02em", lineHeight: 1.25, mb: 0.5 }}>
                      ZappyFind AI voice interview
                    </Typography>
                    <Typography sx={{ fontSize: "0.8125rem", fontWeight: 500, color: "rgba(107,99,92,0.88)", lineHeight: 1.55 }}>
                      ZappyFind&apos;s AI leads a structured, roughly ten minute voice interview to validate key resume claims and probe how the candidate thinks. Each answer is rubric scored on its own. Expand a question for transcript, playback, and score.
                    </Typography>
                  </Box>
                </Stack>

                <Stack spacing={1.25}>
                  {voiceInterviewRows.map((row) => (
                    <Accordion
                      key={row.id}
                      defaultExpanded={false}
                      disableGutters
                      elevation={0}
                      sx={{
                        borderRadius: "14px !important",
                        border: "1px solid rgba(220,212,202,0.5)",
                        overflow: "hidden",
                        bgcolor: "rgba(255,255,255,0.96)",
                        transition: "border-color 0.22s ease, box-shadow 0.22s ease, transform 0.18s ease",
                        "&:before": { display: "none" },
                        "&.Mui-expanded": {
                          borderColor: "rgba(248,114,58,0.35)",
                          boxShadow: "0 14px 40px rgba(248,114,58,0.08)",
                        },
                      }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreRoundedIcon sx={{ color: SHELL_MUTED }} />}
                        sx={{
                          px: 1.75,
                          py: 1.25,
                          minHeight: 56,
                          "& .MuiAccordionSummary-content": { my: 1, alignItems: "center", gap: 1.25 },
                          transition: "background-color 0.18s ease",
                          "&:hover": { bgcolor: "rgba(248,114,58,0.04)" },
                        }}
                      >
                        <Chip
                          label={`${row.score}`}
                          size="small"
                          sx={{
                            height: 26,
                            minWidth: 44,
                            fontWeight: 800,
                            fontSize: "0.75rem",
                            ...getVoiceInterviewScoreChipSx(row.score),
                          }}
                        />
                        <Typography sx={{ fontSize: "0.875rem", fontWeight: 600, color: SHELL_INK, lineHeight: 1.35, flex: 1, minWidth: 0 }}>
                          {row.question}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails sx={{ px: 1.75, pt: "16px", pb: 2, borderTop: "1px solid rgba(240,232,224,0.9)" }}>
                        <Typography sx={{ fontSize: "11px", fontWeight: 600, color: "rgba(23, 18, 14, 0.6)", letterSpacing: "-0.01em", lineHeight: 1.3, mb: 1 }}>
                          Candidate&apos;s transcript
                        </Typography>
                        <Typography sx={{ fontSize: "0.875rem", fontWeight: 500, fontStyle: "italic", color: "rgba(23,18,14,0.78)", lineHeight: 1.65, mb: 1.75 }}>
                          {row.transcript}
                        </Typography>
                        <Stack
                          direction={{ xs: "column", sm: "row" }}
                          alignItems={{ xs: "stretch", sm: "center" }}
                          flexWrap="wrap"
                          useFlexGap
                          sx={{ gap: 1.5, width: "100%" }}
                        >
                          <Button
                            size="small"
                            variant="outlined"
                            startIcon={playingInterviewId === row.id ? <PauseRoundedIcon sx={{ fontSize: 18 }} /> : <GraphicEqRoundedIcon sx={{ fontSize: 18 }} />}
                            onClick={() => toggleInterviewPlayback(row.id, row.transcript)}
                            sx={{
                              alignSelf: { xs: "flex-start", sm: "center" },
                              flexShrink: 0,
                              minHeight: 48,
                              boxSizing: "border-box",
                              textTransform: "none",
                              fontWeight: 700,
                              borderRadius: "10px",
                              borderColor: "rgba(248,114,58,0.35)",
                              color: SHELL_PRIMARY,
                              "&:hover": { borderColor: SHELL_PRIMARY, bgcolor: "rgba(248,114,58,0.06)" },
                            }}
                          >
                            {playingInterviewId === row.id ? "Stop" : "Listen to the conversation"}
                          </Button>
                          {playingInterviewId === row.id && voiceInterviewTransport?.rowId === row.id && (() => {
                            const vt = voiceInterviewTransport;
                            const scrubPct = voiceInterviewScrub?.rowId === row.id ? voiceInterviewScrub.value : vt.value;
                            const totalSec = Math.max(0, (vt.totalMs ?? 0) / 1000);
                            const curSec = (scrubPct / 100) * totalSec;
                            const totalLabel = formatVoiceInterviewClock(totalSec);
                            const curLabel = formatVoiceInterviewClock(curSec);
                            return (
                              <Box
                                sx={{
                                  flex: "1 1 200px",
                                  minWidth: 0,
                                  width: { xs: "100%", sm: "auto" },
                                  height: 48,
                                  minHeight: 48,
                                  maxHeight: 48,
                                  alignSelf: "center",
                                  boxSizing: "border-box",
                                }}
                              >
                                <Box
                                  sx={{
                                    height: "100%",
                                    boxSizing: "border-box",
                                    borderRadius: "10px",
                                    px: 1.25,
                                    py: 0,
                                    border: "1px solid rgba(220,212,202,0.65)",
                                    bgcolor: "#ffffff",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                  }}
                                  onPointerUpCapture={() => {
                                    if (voiceInterviewTransport?.rowId !== row.id) return;
                                    applyVoiceInterviewSeek(row.id, voiceSliderSeekValueRef.current, row.transcript);
                                  }}
                                >
                                  <Typography
                                    component="span"
                                    sx={{
                                      fontSize: "0.75rem",
                                      fontWeight: 800,
                                      fontVariantNumeric: "tabular-nums",
                                      letterSpacing: "-0.02em",
                                      color: SHELL_INK,
                                      minWidth: 38,
                                      flexShrink: 0,
                                      lineHeight: 1,
                                    }}
                                  >
                                    {curLabel}
                                  </Typography>
                                  <Slider
                                    id={`voice-scrub-${row.id}`}
                                    size="small"
                                    value={scrubPct}
                                    aria-label="Playback position in this answer"
                                    onChange={(_, v) => {
                                      voiceSliderSeekValueRef.current = v;
                                      isInterviewScrubbingRef.current = true;
                                      setVoiceInterviewScrub({ rowId: row.id, value: v });
                                    }}
                                    onChangeCommitted={(_, v) => {
                                      voiceSliderSeekValueRef.current = v;
                                      applyVoiceInterviewSeek(row.id, v, row.transcript);
                                    }}
                                    valueLabelDisplay="off"
                                    min={0}
                                    max={100}
                                    step={0.25}
                                    getAriaValueText={(x) => `${formatVoiceInterviewClock((x / 100) * totalSec)} of ${totalLabel}`}
                                    sx={{
                                      flex: 1,
                                      minWidth: 48,
                                      mx: 0,
                                      my: 0,
                                      height: 6,
                                      py: 0,
                                      color: SHELL_PRIMARY,
                                      "& .MuiSlider-rail": {
                                        height: 6,
                                        opacity: 1,
                                        borderRadius: "99px",
                                        bgcolor: "rgba(23,18,14,0.06)",
                                        border: "1px solid rgba(23,18,14,0.06)",
                                      },
                                      "& .MuiSlider-track": {
                                        height: 6,
                                        borderRadius: "99px",
                                        border: "none",
                                        bgcolor: SHELL_PRIMARY,
                                      },
                                      "& .MuiSlider-thumb": {
                                        width: 14,
                                        height: 14,
                                        backgroundColor: "#fff",
                                        border: `2px solid ${SHELL_PRIMARY}`,
                                        boxShadow: "0 1px 4px rgba(23,18,14,0.12)",
                                        "&:hover, &.Mui-focusVisible": {
                                          boxShadow: "0 2px 8px rgba(248,114,58,0.25)",
                                        },
                                      },
                                    }}
                                  />
                                  <Typography
                                    component="span"
                                    sx={{
                                      fontSize: "0.75rem",
                                      fontWeight: 700,
                                      fontVariantNumeric: "tabular-nums",
                                      letterSpacing: "-0.02em",
                                      color: "rgba(107,99,92,0.82)",
                                      minWidth: 38,
                                      flexShrink: 0,
                                      textAlign: "right",
                                      lineHeight: 1,
                                    }}
                                  >
                                    {totalLabel}
                                  </Typography>
                                </Box>
                              </Box>
                            );
                          })()}
                        </Stack>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </Stack>
              </Box>
            )}

            {detailTab === 2 && (
              <>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "repeat(3, minmax(0, 1fr))" },
                    gap: 1.25,
                    width: "100%",
                    mb: 1.5,
                  }}
                >
                      <Box
                        sx={{
                          borderRadius: "14px",
                          p: 1.35,
                          border: "1px solid rgba(220,212,202,0.45)",
                          bgcolor: "rgba(255,255,255,0.92)",
                          display: "flex",
                          flexDirection: "column",
                          gap: 0.85,
                          minWidth: 0,
                          transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                          "&:hover": { borderColor: "rgba(248,114,58,0.28)", boxShadow: "0 6px 20px rgba(23,18,14,0.05)" },
                        }}
                      >
                        <Box
                          sx={{
                            width: 36,
                            height: 36,
                            borderRadius: "11px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            bgcolor: "rgba(248,114,58,0.1)",
                            border: "1px solid rgba(248,114,58,0.26)",
                            flexShrink: 0,
                          }}
                        >
                          <WorkOutlineOutlinedIcon sx={{ fontSize: 18, color: SHELL_PRIMARY }} aria-hidden />
                        </Box>
                        <Typography sx={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(23,18,14,0.42)" }}>
                          Current company
                        </Typography>
                        <Typography sx={{ fontSize: "0.95rem", fontWeight: 700, color: SHELL_INK, letterSpacing: "-0.02em", lineHeight: 1.25 }}>
                          {displayedCandidate.company}
                        </Typography>
                      </Box>
                      {dialogProfile && (
                        <>
                          <Tooltip title="Notice period before they can start from their current role." arrow placement="top">
                            <Box
                              sx={{
                                borderRadius: "14px",
                                p: 1.35,
                                border: "1px solid rgba(220,212,202,0.45)",
                                bgcolor: "rgba(255,255,255,0.92)",
                                display: "flex",
                                flexDirection: "column",
                                gap: 0.85,
                                minWidth: 0,
                                cursor: "default",
                                transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                                "&:hover": { borderColor: "rgba(59,130,246,0.25)", boxShadow: "0 6px 20px rgba(23,18,14,0.05)" },
                              }}
                            >
                              <Box
                                sx={{
                                  width: 36,
                                  height: 36,
                                  borderRadius: "11px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  bgcolor: "rgba(59,130,246,0.08)",
                                  border: "1px solid rgba(59,130,246,0.2)",
                                  flexShrink: 0,
                                }}
                              >
                                <AccessTimeOutlinedIcon sx={{ fontSize: 18, color: "#2563eb" }} aria-hidden />
                              </Box>
                              <Typography sx={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(23,18,14,0.42)" }}>
                                Availability
                              </Typography>
                              <Typography sx={{ fontSize: "0.95rem", fontWeight: 700, color: SHELL_INK, letterSpacing: "-0.02em", lineHeight: 1.25 }}>
                                {dialogProfile.noticePeriod} notice
                              </Typography>
                            </Box>
                          </Tooltip>
                          <Tooltip title="Expected salary range they shared for this opportunity." arrow placement="top">
                            <Box
                              sx={{
                                borderRadius: "14px",
                                p: 1.35,
                                border: "1px solid rgba(220,212,202,0.45)",
                                bgcolor: "rgba(255,255,255,0.92)",
                                display: "flex",
                                flexDirection: "column",
                                gap: 0.85,
                                minWidth: 0,
                                cursor: "default",
                                transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                                "&:hover": { borderColor: "rgba(22,163,74,0.28)", boxShadow: "0 6px 20px rgba(23,18,14,0.05)" },
                              }}
                            >
                              <Box
                                sx={{
                                  width: 36,
                                  height: 36,
                                  borderRadius: "11px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  bgcolor: "rgba(22,163,74,0.1)",
                                  border: "1px solid rgba(22,163,74,0.22)",
                                  flexShrink: 0,
                                }}
                              >
                                <AttachMoneyOutlinedIcon sx={{ fontSize: 18, color: "#15803d" }} aria-hidden />
                              </Box>
                              <Typography sx={{ fontSize: "0.62rem", fontWeight: 600, letterSpacing: "-0.01em", textTransform: "none", color: "rgba(23,18,14,0.45)" }}>
                                Expected compensation
                              </Typography>
                              <Typography sx={{ fontSize: "0.95rem", fontWeight: 700, color: SHELL_INK, letterSpacing: "-0.02em", lineHeight: 1.25 }}>
                                {dialogProfile.expectedSalary}
                              </Typography>
                            </Box>
                          </Tooltip>
                        </>
                      )}
                </Box>

                <Box
                  sx={{
                    width: "100%",
                    mb: 2.75,
                    borderRadius: "20px",
                    p: "1px",
                    background: [
                      "linear-gradient(180deg, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0) 14%)",
                      "linear-gradient(125deg, rgba(248,114,58,0.07) 0%, rgba(218,212,204,0.4) 34%, rgba(224,230,236,0.36) 66%, rgba(14,165,233,0.06) 100%)",
                    ].join(", "),
                    boxShadow: "0 2px 12px rgba(23,18,14,0.024), 0 1px 1px rgba(23,18,14,0.02)",
                  }}
                >
                  <Box
                    sx={{
                      borderRadius: "19px",
                      overflow: "hidden",
                      background: "linear-gradient(198deg, #ffffff 0%, #ffffff 32%, rgba(252,251,249,0.99) 72%, rgba(250,248,244,0.97) 100%)",
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row" },
                      alignItems: { sm: "stretch" },
                      border: "1px solid rgba(228,220,212,0.38)",
                      boxShadow: "inset 0 1px 0 rgba(255,255,255,1), inset 0 20px 32px -22px rgba(255,255,255,0.72)",
                    }}
                  >
                    <Box
                      sx={{
                        flex: 1,
                        minWidth: 0,
                        px: { xs: 1.75, sm: 2.25 },
                        py: 1.65,
                        position: "relative",
                        borderBottom: { xs: "1px solid rgba(232,224,216,0.45)", sm: "none" },
                        borderRight: { xs: "none", sm: "1px solid rgba(232,224,216,0.4)" },
                        transition: "background-color 0.22s ease",
                        "&:hover": { bgcolor: "rgba(255,252,248,0.85)" },
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          top: 0,
                          left: "6%",
                          right: "6%",
                          height: 2,
                          borderRadius: "0 0 14px 14px",
                          background: `linear-gradient(90deg, 
                            rgba(248,114,58,0) 0%, 
                            rgba(248,114,58,0.1) 28%, 
                            rgba(248,114,58,0.32) 50%, 
                            rgba(248,114,58,0.1) 72%, 
                            rgba(248,114,58,0) 100%)`,
                          filter: "blur(0.35px)",
                        },
                      }}
                    >
                      <Box sx={{ position: "relative", zIndex: 1, minWidth: 0, pt: 0.1 }}>
                        <Typography sx={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(23,18,14,0.42)" }}>
                          Headline role
                        </Typography>
                        <Typography sx={{ fontSize: "0.9375rem", fontWeight: 700, color: SHELL_INK, letterSpacing: "-0.03em", lineHeight: 1.3, mt: 0.4 }}>
                          {displayedCandidate.role}
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        flex: 1,
                        minWidth: 0,
                        px: { xs: 1.75, sm: 2.25 },
                        py: 1.65,
                        position: "relative",
                        borderBottom: { xs: "1px solid rgba(232,224,216,0.45)", sm: "none" },
                        borderRight: { xs: "none", sm: "1px solid rgba(232,224,216,0.4)" },
                        transition: "background-color 0.22s ease",
                        "&:hover": { bgcolor: "rgba(255,252,248,0.88)" },
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          top: 0,
                          left: "6%",
                          right: "6%",
                          height: 2,
                          borderRadius: "0 0 14px 14px",
                          background: `linear-gradient(90deg, 
                            rgba(248,114,58,0) 0%, 
                            rgba(248,114,58,0.1) 28%, 
                            rgba(248,114,58,0.32) 50%, 
                            rgba(248,114,58,0.1) 72%, 
                            rgba(248,114,58,0) 100%)`,
                          filter: "blur(0.35px)",
                        },
                      }}
                    >
                      <Box sx={{ position: "relative", zIndex: 1, minWidth: 0, pt: 0.1 }}>
                        <Typography sx={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(23,18,14,0.42)" }}>
                          Experience
                        </Typography>
                        <Typography sx={{ fontSize: "0.875rem", fontWeight: 700, color: "rgba(23,18,14,0.82)", letterSpacing: "-0.02em", lineHeight: 1.3, mt: 0.4 }}>
                          {displayedCandidate.yearsExp}+ years
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        flex: 1,
                        minWidth: 0,
                        px: { xs: 1.75, sm: 2.25 },
                        py: 1.65,
                        position: "relative",
                        transition: "background-color 0.22s ease",
                        "&:hover": { bgcolor: "rgba(240,249,255,0.75)" },
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          top: 0,
                          left: "6%",
                          right: "6%",
                          height: 2,
                          borderRadius: "0 0 14px 14px",
                          background: `linear-gradient(90deg, 
                            rgba(14,165,233,0) 0%, 
                            rgba(14,165,233,0.1) 28%, 
                            rgba(14,165,233,0.3) 50%, 
                            rgba(14,165,233,0.1) 72%, 
                            rgba(14,165,233,0) 100%)`,
                          filter: "blur(0.35px)",
                        },
                      }}
                    >
                      <Box sx={{ position: "relative", zIndex: 1, minWidth: 0, pt: 0.1 }}>
                        <Typography sx={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(23,18,14,0.42)" }}>
                          Source
                        </Typography>
                        <Typography sx={{ fontSize: "0.875rem", fontWeight: 700, color: "rgba(23,18,14,0.82)", letterSpacing: "-0.02em", lineHeight: 1.3, mt: 0.4 }}>
                          {displayedCandidate.source === "applied" ? "Applied to this job" : "ZappyFind recommendation"}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>

                {(workExperienceAll.length > 0 || (dialogProfile && dialogProfile.education?.length > 0)) && (
                  <Stack direction={{ xs: "column", md: "row" }} spacing={2.25} alignItems="stretch" sx={{ width: "100%", mb: 0.5 }}>
                    {workExperienceAll.length > 0 && (
                      <Box
                        sx={{
                          flex: 1,
                          minWidth: 0,
                          borderRadius: "18px",
                          border: "1px solid rgba(220,212,202,0.55)",
                          bgcolor: "#ffffff",
                          overflow: "hidden",
                          display: "flex",
                          flexDirection: "column",
                          boxShadow: "0 8px 28px rgba(23,18,14,0.055)",
                          maxHeight: { md: 420 },
                        }}
                      >
                        <Box
                          sx={{
                            px: 2,
                            py: 1.25,
                            borderBottom: "1px solid rgba(226,232,240,0.85)",
                            background: "linear-gradient(180deg, rgba(240,249,255,0.45) 0%, rgba(255,255,255,0.98) 100%)",
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          <Box
                            sx={{
                              width: 34,
                              height: 34,
                              borderRadius: "10px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              bgcolor: "rgba(14,165,233,0.1)",
                              border: "1px solid rgba(14,165,233,0.2)",
                            }}
                          >
                            <WorkHistoryOutlinedIcon sx={{ fontSize: 18, color: "#0284c7" }} aria-hidden />
                          </Box>
                          <Box sx={{ minWidth: 0 }}>
                            <Typography sx={{ fontSize: "0.68rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(23,18,14,0.48)" }}>
                              Work experience
                            </Typography>
                            <Typography sx={{ fontSize: "0.72rem", fontWeight: 500, color: "rgba(107,99,92,0.78)", letterSpacing: "-0.01em" }}>
                              {workExperienceAll.length} role{workExperienceAll.length === 1 ? "" : "s"} on file
                            </Typography>
                          </Box>
                        </Box>
                        <Box sx={{ p: 2, pt: 1.75, flex: 1, minHeight: 0, overflowY: "auto" }}>
                          {workExperienceVisible.map((exp, idx) => {
                            const isLast = idx === workExperienceVisible.length - 1;
                            return (
                              <Stack key={`${exp.title}-${exp.company}-${idx}`} direction="row" spacing={1.5} sx={{ position: "relative", pb: isLast ? 0 : 2.5 }}>
                                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, width: 14 }}>
                                  <Box
                                    sx={{
                                      width: 10,
                                      height: 10,
                                      borderRadius: "50%",
                                      bgcolor: idx === 0 ? SHELL_PRIMARY : "rgba(200,192,184,0.95)",
                                      border: idx === 0 ? "2px solid rgba(248,114,58,0.35)" : "2px solid rgba(180,172,164,0.75)",
                                      flexShrink: 0,
                                      mt: 0.4,
                                    }}
                                  />
                                  {!isLast && (
                                    <Box
                                      sx={{
                                        flex: 1,
                                        width: 2,
                                        bgcolor: "rgba(188,180,172,0.85)",
                                        borderRadius: 1,
                                        mt: 0.5,
                                      }}
                                    />
                                  )}
                                </Box>
                                <Box sx={{ minWidth: 0, flex: 1, pb: 0 }}>
                                  <Typography sx={{ fontSize: "0.875rem", fontWeight: 700, color: SHELL_INK, lineHeight: 1.3, letterSpacing: "-0.02em" }}>
                                    {exp.title}
                                  </Typography>
                                  <Typography sx={{ fontSize: "0.8125rem", fontWeight: 600, color: "rgba(23,18,14,0.72)", lineHeight: 1.45, mt: 0.2 }}>
                                    {exp.company}
                                  </Typography>
                                  <Typography sx={{ fontSize: "0.75rem", fontWeight: 500, color: "rgba(23,18,14,0.62)", lineHeight: 1.45, mt: 0.15 }}>
                                    {exp.from} - {exp.to} &middot; {exp.duration}
                                  </Typography>
                                  <Typography sx={{ fontSize: "0.75rem", fontWeight: 500, color: "rgba(23,18,14,0.52)", lineHeight: 1.45 }}>
                                    {exp.location} &middot; {exp.mode}
                                  </Typography>
                                </Box>
                              </Stack>
                            );
                          })}
                          {workExperienceHasMore && (
                            <Box sx={{ mt: 0.5, pl: 3.5 }}>
                              <Button
                                size="small"
                                onClick={() => setWorkExpExpanded((v) => !v)}
                                sx={{
                                  textTransform: "none",
                                  fontWeight: 600,
                                  fontSize: "0.78rem",
                                  color: SHELL_PRIMARY,
                                  px: 0.75,
                                  py: 0.25,
                                  minWidth: 0,
                                  "&:hover": { bgcolor: "rgba(248,114,58,0.08)" },
                                }}
                              >
                                {workExpExpanded ? "Show less" : `Show all (${workExperienceAll.length - WORK_EXP_PREVIEW} more)`}
                              </Button>
                            </Box>
                          )}
                        </Box>
                      </Box>
                    )}

                    {dialogProfile && dialogProfile.education?.length > 0 && (
                      <Box
                        sx={{
                          flex: 1,
                          minWidth: 0,
                          borderRadius: "18px",
                          border: "1px solid rgba(220,212,202,0.55)",
                          bgcolor: "#ffffff",
                          overflow: "hidden",
                          display: "flex",
                          flexDirection: "column",
                          boxShadow: "0 8px 28px rgba(23,18,14,0.055)",
                          maxHeight: { md: 420 },
                        }}
                      >
                        <Box
                          sx={{
                            px: 2,
                            py: 1.25,
                            borderBottom: "1px solid rgba(226,232,240,0.85)",
                            background: "linear-gradient(180deg, rgba(238,242,255,0.42) 0%, rgba(255,255,255,0.98) 100%)",
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          <Box
                            sx={{
                              width: 34,
                              height: 34,
                              borderRadius: "10px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              bgcolor: "rgba(99,102,241,0.1)",
                              border: "1px solid rgba(79,70,229,0.2)",
                            }}
                          >
                            <SchoolOutlinedIcon sx={{ fontSize: 18, color: "#4f46e5" }} aria-hidden />
                          </Box>
                          <Box sx={{ minWidth: 0 }}>
                            <Typography sx={{ fontSize: "0.68rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(23,18,14,0.48)" }}>
                              Education
                            </Typography>
                            <Typography sx={{ fontSize: "0.72rem", fontWeight: 500, color: "rgba(107,99,92,0.78)", letterSpacing: "-0.01em" }}>
                              {dialogProfile.education.length} credential{dialogProfile.education.length === 1 ? "" : "s"}
                            </Typography>
                          </Box>
                        </Box>
                        <Box sx={{ p: 2, pt: 1.75, flex: 1, minHeight: 0, overflowY: "auto" }}>
                          <Stack spacing={1.35}>
                            {dialogProfile.education.map((edu, idx) => (
                              <Box
                                key={idx}
                                sx={{
                                  borderRadius: "12px",
                                  p: 1.25,
                                  border: "1px solid rgba(226,232,240,0.95)",
                                  bgcolor: idx === 0 ? "rgba(99,102,241,0.04)" : "rgba(248,250,252,0.85)",
                                  transition: "border-color 0.18s ease, background-color 0.18s ease",
                                  "&:hover": { borderColor: "rgba(99,102,241,0.28)", bgcolor: "rgba(99,102,241,0.06)" },
                                }}
                              >
                                <Stack direction="row" alignItems="flex-start" spacing={1.15}>
                                  <Box
                                    sx={{
                                      width: 10,
                                      height: 10,
                                      borderRadius: "50%",
                                      bgcolor: idx === 0 ? SHELL_PRIMARY : "rgba(200,192,184,0.95)",
                                      border: idx === 0 ? "2px solid rgba(248,114,58,0.35)" : "2px solid rgba(180,172,164,0.75)",
                                      flexShrink: 0,
                                      mt: 0.55,
                                    }}
                                  />
                                  <Box sx={{ minWidth: 0, flex: 1 }}>
                                    <Typography sx={{ fontSize: "0.875rem", fontWeight: 700, color: SHELL_INK, lineHeight: 1.3, letterSpacing: "-0.02em" }}>
                                      {edu.degree}
                                    </Typography>
                                    <Typography sx={{ fontSize: "0.8125rem", fontWeight: 600, color: "rgba(23,18,14,0.68)", lineHeight: 1.45, mt: 0.2 }}>
                                      {edu.institution}
                                    </Typography>
                                    <Typography sx={{ fontSize: "0.72rem", fontWeight: 600, color: "rgba(107,99,92,0.75)", letterSpacing: "0.04em", textTransform: "uppercase", mt: 0.35 }}>
                                      Class of {edu.year}
                                    </Typography>
                                  </Box>
                                </Stack>
                              </Box>
                            ))}
                          </Stack>
                        </Box>
                      </Box>
                    )}
                  </Stack>
                )}
              </>
            )}
          </Box>
        </Box>

        {/* Footer */}
        <Divider sx={{ borderColor: "rgba(220,212,202,0.4)", flexShrink: 0 }} />
        <Box sx={{ px: 3, py: 1.5, flexShrink: 0 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Stack direction="row" alignItems="center" spacing={0.75}>
              <IconButton
                size="small"
                disabled={!hasPrev}
                onClick={() => { setSlideDir("right"); onPrev(); }}
                sx={{ color: SHELL_MUTED, "&:hover": { color: SHELL_INK, bgcolor: "rgba(23,18,14,0.05)" }, "&.Mui-disabled": { opacity: 0.3 } }}
              >
                <ArrowBackIosRoundedIcon sx={{ fontSize: 16 }} />
              </IconButton>
              <IconButton
                size="small"
                disabled={!hasNext}
                onClick={() => { setSlideDir("left"); onNext(); }}
                sx={{ color: SHELL_MUTED, "&:hover": { color: SHELL_INK, bgcolor: "rgba(23,18,14,0.05)" }, "&.Mui-disabled": { opacity: 0.3 } }}
              >
                <ArrowForwardIosRoundedIcon sx={{ fontSize: 16 }} />
              </IconButton>
              <Typography sx={{ fontSize: "0.7rem", fontWeight: 500, color: SHELL_MUTED }}>
                Switch candidate
              </Typography>
            </Stack>
            <Button
              onClick={onClose}
              sx={{ textTransform: "none", fontWeight: 600, fontSize: "0.8125rem", color: SHELL_MUTED, "&:hover": { color: SHELL_INK, bgcolor: "rgba(23,18,14,0.04)" } }}
            >
              Close
            </Button>
          </Stack>
        </Box>
      </Box>
    </>
  );
}

function CandidateMatchView({ job, onBack }) {
  const [unlockedIds, setUnlockedIds] = useState(new Set());
  const [jdDialogOpen, setJdDialogOpen] = useState(false);
  const [jobActionsMenuAnchor, setJobActionsMenuAnchor] = useState(null);
  const [detailCandidate, setDetailCandidate] = useState(null);
  const [starredIds, setStarredIds] = useState(new Set());
  const details = JOB_DETAILS[job.id] || {
    experienceRange: "Not specified",
    workMode: "Not specified",
    competencies: [],
    description: "",
  };
  const allCandidates = MOCK_CANDIDATES[job.id] || [];
  const [sourceFilter, setSourceFilter] = useState("all");
  const [bulkDownloadSelected, setBulkDownloadSelected] = useState(false);
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const filterButtonRef = useRef(null);
  const filterPanelRef = useRef(null);
  const [candidateSort, setCandidateSort] = useState("score_desc");
  const chip = STATUS_CHIP[job.status];
  const contextLine = formatRoleContextLine(job, details);
  const descText = details.description || "";
  const hasJobDescription = Boolean(descText.trim());
  const isClosed = job.status === "closed";
  const unlockRate = job.matches > 0 ? Math.round(((job.unlocked || 0) / job.matches) * 100) : 0;

  const candidates = useMemo(() => {
    const filtered =
      sourceFilter === "all"
        ? allCandidates
        : sourceFilter === "starred"
          ? allCandidates.filter((c) => starredIds.has(c.id))
          : allCandidates.filter((c) => c.source === sourceFilter);
    return [...filtered].sort((a, b) => {
      if (candidateSort === "score_desc") return b.matchScore - a.matchScore;
      if (candidateSort === "score_asc") return a.matchScore - b.matchScore;
      return 0;
    });
  }, [allCandidates, sourceFilter, candidateSort, starredIds]);

  const appliedCount = allCandidates.filter((c) => c.source === "applied").length;
  const recommendedCount = allCandidates.filter((c) => c.source === "recommended").length;
  const starredCount = allCandidates.filter((c) => starredIds.has(c.id)).length;
  const handleUnlock = (id) => {
    setUnlockedIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  const detailCandidates = useMemo(() => candidates, [candidates]);
  const detailIndex = detailCandidate ? detailCandidates.findIndex((c) => c.id === detailCandidate.id) : -1;
  const hasPrevCandidate = detailIndex > 0;
  const hasNextCandidate = detailIndex >= 0 && detailIndex < detailCandidates.length - 1;

  const handlePrevCandidate = () => {
    if (hasPrevCandidate) setDetailCandidate(detailCandidates[detailIndex - 1]);
  };
  const handleNextCandidate = () => {
    if (hasNextCandidate) setDetailCandidate(detailCandidates[detailIndex + 1]);
  };

  const handleToggleStar = (id) => {
    setStarredIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  useEffect(() => {
    if (!filterMenuOpen) return;
    const handleOutsideClick = (event) => {
      const target = event.target;
      if (filterButtonRef.current?.contains(target)) return;
      if (filterPanelRef.current?.contains(target)) return;
      setFilterMenuOpen(false);
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [filterMenuOpen]);

  return (
    <Box sx={{ pt: 0 }}>
      {/* Job detail panel: full-width white band (single container, no extra wrapper) */}
      <Box
        sx={(theme) => ({
          bgcolor: "#fff",
          borderRadius: 0,
          borderTop: "1px solid rgba(220,212,202,0.45)",
          borderBottom: "1px solid rgba(220,212,202,0.45)",
          boxShadow: "none",
          mx: { xs: theme.spacing(-1.75), md: theme.spacing(-2.5) },
          width: { xs: `calc(100% + ${theme.spacing(3.5)})`, md: `calc(100% + ${theme.spacing(5)})` },
          maxWidth: "none",
          px: { xs: theme.spacing(1.75), md: theme.spacing(2.5) },
          pt: { xs: 1.75, sm: 2 },
          pb: { xs: 2, sm: 2.25 },
          mb: 3,
        })}
      >
        <Button
          onClick={onBack}
          startIcon={<ArrowBackIosNewOutlinedIcon sx={{ fontSize: "13px !important" }} />}
          disableRipple
          sx={{
            textTransform: "none",
            color: SHELL_MUTED,
            fontWeight: 500,
            fontSize: "0.8125rem",
            px: 0.5,
            mb: 2,
            ml: -0.5,
            letterSpacing: "0.01em",
            "&:hover": { bgcolor: "rgba(23,18,14,0.03)", color: SHELL_INK },
          }}
        >
          Back to My Jobs
        </Button>

      {/* Job summary */}
      <Box sx={{ position: "relative", mb: 0 }}>
        {/* Row 1: Title + meta + actions */}
        <Box sx={{ pb: 0 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1.25 }}>
            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Stack direction="row" alignItems="center" spacing={1.25} sx={{ mb: 0.5 }}>
                <Typography
                  sx={{
                    fontSize: { xs: "1.1rem", md: "1.25rem" },
                    fontWeight: 700,
                    color: SHELL_INK,
                    letterSpacing: "-0.025em",
                    lineHeight: 1.2,
                  }}
                >
                  {job.title}
                </Typography>
                <Box
                  sx={{
                    px: 0.75,
                    py: 0.15,
                    borderRadius: "6px",
                    bgcolor: chip.color === "#16a34a" ? "rgba(22,163,74,0.1)" : chip.color === "#64748b" ? "rgba(100,116,139,0.08)" : "rgba(202,138,4,0.08)",
                    fontSize: "0.6rem",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    color: chip.color,
                    textTransform: "uppercase",
                    lineHeight: 1.5,
                    flexShrink: 0,
                  }}
                >
                  {chip.label}
                </Box>
              </Stack>
              <Typography sx={{ fontSize: "0.8125rem", color: "rgba(107,99,92,0.82)", fontWeight: 400, letterSpacing: "0.01em" }}>
                {contextLine}
              </Typography>
            </Box>
            <Stack direction="row" alignItems="center" spacing={0.25} sx={{ flexShrink: 0, ml: 1 }}>
              {hasJobDescription && (
                <Tooltip title="View Job Description" arrow placement="bottom">
                  <IconButton
                    size="small"
                    aria-label="View Job Description"
                    onClick={() => setJdDialogOpen(true)}
                    sx={{ color: SHELL_MUTED, "&:hover": { color: SHELL_INK, bgcolor: "rgba(23,18,14,0.04)" } }}
                  >
                    <DescriptionOutlinedIcon sx={{ fontSize: 20 }} />
                  </IconButton>
                </Tooltip>
              )}
              <Tooltip title="More options" arrow placement="bottom">
                <IconButton
                  size="small"
                  aria-label="Job actions menu"
                  aria-haspopup="true"
                  aria-expanded={Boolean(jobActionsMenuAnchor)}
                  id="job-detail-actions-menu-button"
                  onClick={(e) => setJobActionsMenuAnchor(e.currentTarget)}
                  sx={{ color: SHELL_MUTED, "&:hover": { color: SHELL_INK, bgcolor: "rgba(23,18,14,0.04)" } }}
                >
                  <MoreVertOutlinedIcon sx={{ fontSize: 20 }} />
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={jobActionsMenuAnchor}
                open={Boolean(jobActionsMenuAnchor)}
                onClose={() => setJobActionsMenuAnchor(null)}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                slotProps={{
                  paper: {
                    sx: {
                      mt: 0.5,
                      minWidth: 200,
                      borderRadius: "12px",
                      border: "1px solid rgba(200,188,174,0.55)",
                      boxShadow: "0 10px 40px rgba(29,26,23,0.12)",
                    },
                  },
                }}
                MenuListProps={{ "aria-labelledby": "job-detail-actions-menu-button" }}
              >
                <MenuItem
                  onClick={() => {
                    setJobActionsMenuAnchor(null);
                  }}
                  sx={{ fontSize: "0.875rem", fontWeight: 600 }}
                >
                  Edit job
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setJobActionsMenuAnchor(null);
                  }}
                  sx={{ fontSize: "0.875rem", fontWeight: 600 }}
                >
                  Share job link
                </MenuItem>
                {!isClosed ? (
                  <MenuItem
                    onClick={() => {
                      setJobActionsMenuAnchor(null);
                    }}
                    sx={{ fontSize: "0.875rem", fontWeight: 600, color: "error.main" }}
                  >
                    Close job
                  </MenuItem>
                ) : null}
              </Menu>
            </Stack>
          </Stack>

          {/* Activity metric cards */}
          {(() => {
            const metrics = [
              {
                label: "Recommendations",
                value: job.matches || 0,
                sub: !isClosed && (job.newMatches24h || 0) > 0 ? aiMatchesNewRelativeLabel(job.newMatches24h) : null,
                subColor: "#15803d",
                Icon: AutoAwesomeOutlinedIcon,
                iconBg: "rgba(248,114,58,0.1)",
                iconColor: SHELL_PRIMARY,
              },
              {
                label: "Applied",
                value: job.applied || 0,
                sub: !isClosed && (job.appliedThisWeek || 0) > 0 ? `${job.appliedThisWeek} this week` : null,
                subColor: "#2563eb",
                Icon: PersonAddAlt1OutlinedIcon,
                iconBg: "rgba(37,99,235,0.1)",
                iconColor: "#2563eb",
              },
              {
                label: "Unlocked",
                value: job.unlocked || 0,
                sub: `${unlockRate}% of pool`,
                subColor: SHELL_MUTED,
                Icon: LockOpenRoundedIcon,
                iconBg: "rgba(124,58,237,0.1)",
                iconColor: "#7c3aed",
              },
            ];
            return (
              <Stack
                direction="row"
                spacing={1.5}
                sx={{
                  mt: 2,
                  flexWrap: { xs: "wrap", sm: "nowrap" },
                  gap: { xs: 1.5, sm: 0 },
                }}
              >
                {metrics.map((m) => (
                  <Box
                    key={m.label}
                    sx={{
                      flex: { xs: "1 1 calc(50% - 6px)", sm: "1 1 0" },
                      minWidth: { xs: "calc(50% - 6px)", sm: 0 },
                      maxWidth: { sm: "none" },
                      borderRadius: "14px",
                      border: "1px solid rgba(200,188,174,0.58)",
                      bgcolor: "rgba(255,255,255,0.65)",
                      px: 2,
                      py: 2,
                      position: "relative",
                      overflow: "hidden",
                      boxShadow: "0 1px 0 rgba(255,255,255,0.9) inset",
                    }}
                  >
                    <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1.5}>
                      <Stack direction="row" alignItems="flex-start" spacing={1} sx={{ minWidth: 0, flex: 1 }}>
                        <Box
                          sx={{
                            width: 28,
                            height: 28,
                            borderRadius: "9px",
                            bgcolor: m.iconBg,
                            display: "grid",
                            placeItems: "center",
                            flexShrink: 0,
                            mt: 0.1,
                          }}
                        >
                          <m.Icon sx={{ fontSize: 15, color: m.iconColor }} aria-hidden />
                        </Box>
                        <Box sx={{ minWidth: 0, pt: 0.15 }}>
                          <Typography sx={{ fontSize: "0.6875rem", fontWeight: 700, color: SHELL_MUTED, letterSpacing: "0.03em", textTransform: "uppercase", lineHeight: 1.25 }}>
                            {m.label}
                          </Typography>
                          {m.sub ? (
                            <Typography sx={{ fontSize: "0.75rem", fontWeight: 600, color: m.subColor, lineHeight: 1.35, mt: 0.45 }}>
                              {m.sub}
                            </Typography>
                          ) : null}
                        </Box>
                      </Stack>
                      <Typography
                        sx={{
                          fontSize: { xs: "1.5rem", sm: "1.625rem" },
                          fontWeight: 800,
                          color: SHELL_INK,
                          lineHeight: 1,
                          letterSpacing: "-0.04em",
                          textAlign: "right",
                          flexShrink: 0,
                        }}
                      >
                        {m.value}
                      </Typography>
                    </Stack>
                  </Box>
                ))}
              </Stack>
            );
          })()}
        </Box>

        <IcpInsightBlock job={job} competencies={details.competencies || []} />
      </Box>
      </Box>

      {/* Candidates section (on page canvas, below white job panel) */}
      <Box sx={{ pt: "4px", mb: 2 }}>
        <Stack direction="row" alignItems="flex-end" justifyContent="space-between" flexWrap="wrap" useFlexGap sx={{ rowGap: 1, columnGap: 2, mb: 1.5 }}>
          <Box>
            <Typography sx={{ fontSize: "1rem", fontWeight: 800, color: SHELL_INK, letterSpacing: "-0.01em", mb: 0 }}>
              Matched Candidates
            </Typography>
            <Typography sx={{ fontSize: "0.8125rem", color: "rgba(107,99,92,0.65)", fontWeight: 400, mb: 0 }}>
              Ranked for fit against this role
            </Typography>
          </Box>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Button
              type="button"
              variant="outlined"
              onClick={() => setCandidateSort((prev) => (prev === "score_desc" ? "score_asc" : "score_desc"))}
              startIcon={<SwapVertRoundedIcon sx={{ fontSize: "16px !important" }} />}
              sx={{
                height: 36,
                minHeight: 36,
                textTransform: "none",
                borderRadius: "10px",
                px: 1.5,
                py: 0,
                fontSize: "0.8125rem",
                fontWeight: 600,
                color: SHELL_INK,
                borderColor: "rgba(220,212,202,0.65)",
                bgcolor: "#fff",
                "&:hover": { borderColor: "rgba(220,212,202,0.9)", bgcolor: "rgba(107,99,92,0.04)" },
              }}
            >
              {candidateSort === "score_desc" ? "Score: High to Low" : "Score: Low to High"}
            </Button>
            <Box sx={{ position: "relative" }}>
              <Button
                ref={filterButtonRef}
                type="button"
                variant="outlined"
                onClick={() => setFilterMenuOpen((prev) => !prev)}
                endIcon={<KeyboardArrowDownRoundedIcon sx={{ fontSize: "16px !important" }} />}
                sx={{
                  height: 36,
                  minHeight: 36,
                  textTransform: "none",
                  borderRadius: "10px",
                  px: 1.25,
                  py: 0,
                  fontSize: "0.8125rem",
                  fontWeight: 600,
                  color: SHELL_INK,
                  borderColor: "rgba(220,212,202,0.65)",
                  bgcolor: "#fff",
                  "&:hover": { borderColor: "rgba(220,212,202,0.9)", bgcolor: "rgba(107,99,92,0.04)" },
                }}
              >
                {sourceFilter === "all"
                  ? "Filter: All"
                  : sourceFilter === "applied"
                    ? "Filter: Applied"
                    : sourceFilter === "recommended"
                      ? "Filter: Recommended"
                      : "Filter: Starred"}
              </Button>
              {filterMenuOpen && (
                <Box
                  ref={filterPanelRef}
                  sx={{
                    position: "absolute",
                    top: "calc(100% + 8px)",
                    right: 0,
                    zIndex: 30,
                    minWidth: 230,
                    borderRadius: "10px",
                    border: "1px solid rgba(220,212,202,0.55)",
                    boxShadow: "0 8px 24px rgba(23,18,14,0.08)",
                    bgcolor: "#fff",
                    py: 0.5,
                  }}
                >
                  {[
                    { key: "all", label: `All candidates (${allCandidates.length})` },
                    { key: "applied", label: `Applied only (${appliedCount})` },
                    { key: "recommended", label: `Recommended only (${recommendedCount})` },
                    { key: "starred", label: `Starred (${starredCount})` },
                  ].map((option) => {
                    const active = sourceFilter === option.key;
                    return (
                      <Box
                        key={option.key}
                        component="button"
                        type="button"
                        onClick={() => {
                          setSourceFilter(option.key);
                          setFilterMenuOpen(false);
                        }}
                        sx={{
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          gap: 0.75,
                          px: 1.2,
                          py: 0.8,
                          border: "none",
                          bgcolor: active ? "rgba(248,114,58,0.08)" : "transparent",
                          color: SHELL_INK,
                          fontFamily: "inherit",
                          fontSize: "0.8125rem",
                          fontWeight: active ? 600 : 500,
                          textAlign: "left",
                          cursor: "pointer",
                          "&:hover": { bgcolor: active ? "rgba(248,114,58,0.12)" : "rgba(107,99,92,0.06)" },
                        }}
                      >
                        <Box component="span" sx={{ width: 16, color: active ? SHELL_PRIMARY : "transparent", fontWeight: 800 }}>✓</Box>
                        {option.label}
                      </Box>
                    );
                  })}
                  <Box
                    component="button"
                    type="button"
                    onClick={() => {
                      setBulkDownloadSelected((prev) => !prev);
                      setFilterMenuOpen(false);
                    }}
                    sx={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: 0.75,
                      px: 1.2,
                      py: 0.8,
                      border: "none",
                      bgcolor: bulkDownloadSelected ? "rgba(248,114,58,0.08)" : "transparent",
                      color: SHELL_INK,
                      fontFamily: "inherit",
                      fontSize: "0.8125rem",
                      fontWeight: bulkDownloadSelected ? 600 : 500,
                      textAlign: "left",
                      cursor: "pointer",
                      "&:hover": { bgcolor: bulkDownloadSelected ? "rgba(248,114,58,0.12)" : "rgba(107,99,92,0.06)" },
                    }}
                  >
                    <Box component="span" sx={{ width: 16, color: bulkDownloadSelected ? SHELL_PRIMARY : "transparent", fontWeight: 800 }}>✓</Box>
                    Bulk download candidates
                  </Box>
                </Box>
              )}
            </Box>
          </Stack>
        </Stack>
      </Box>

      {candidates.length > 0 ? (
        <Stack sx={{ gap: "16px" }}>
          {candidates.map((candidate, i) => (
            <CandidateCard
              key={candidate.id}
              candidate={candidate}
              isUnlocked={unlockedIds.has(candidate.id)}
              onUnlock={handleUnlock}
              onViewDetails={setDetailCandidate}
              index={i}
              starred={starredIds.has(candidate.id)}
              onToggleStar={handleToggleStar}
            />
          ))}
        </Stack>
      ) : (
        <Box
          sx={{
            borderRadius: "16px",
            border: "1px dashed rgba(220,212,202,0.65)",
            bgcolor: "rgba(255,255,255,0.5)",
            py: 6,
            textAlign: "center",
          }}
        >
          <Typography sx={{ fontSize: "0.9375rem", fontWeight: 600, color: SHELL_MUTED }}>
            {sourceFilter === "starred"
              ? "No starred candidates for this job yet. Use the star on a card or in a profile to mark people for quick reference later."
              : "No matched candidates yet"}
          </Typography>
        </Box>
      )}

      {jdDialogOpen && (
        <>
          <Box
            role="presentation"
            onClick={() => setJdDialogOpen(false)}
            sx={{
              position: "fixed",
              inset: 0,
              bgcolor: "rgba(18,10,4,0.28)",
              zIndex: 1298,
            }}
          />
          <Box
            role="dialog"
            aria-label="Job details drawer"
            sx={{
              position: "fixed",
              top: 0,
              right: 0,
              height: "100vh",
              width: { xs: "100%", sm: 480 },
              maxWidth: "100vw",
              bgcolor: "#fff",
              zIndex: 1299,
              borderTopLeftRadius: { sm: "16px" },
              borderBottomLeftRadius: { sm: "16px" },
              boxShadow: "-12px 0 48px rgba(23,18,14,0.18)",
              display: "flex",
              flexDirection: "column",
              animation: "jdDrawerIn 180ms ease-out",
              "@keyframes jdDrawerIn": {
                from: { transform: "translateX(100%)", opacity: 0.98 },
                to: { transform: "translateX(0)", opacity: 1 },
              },
            }}
          >
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
          {/* Drawer header */}
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 2.5, pt: 2.5, pb: 1.5 }}>
            <Typography sx={{ fontSize: "1.125rem", fontWeight: 800, color: SHELL_INK, letterSpacing: "-0.02em", lineHeight: 1.25 }}>
              Job Details
            </Typography>
            <IconButton size="small" onClick={() => setJdDialogOpen(false)} aria-label="Close drawer" sx={{ color: SHELL_MUTED, "&:hover": { color: SHELL_INK } }}>
              <CloseOutlinedIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Stack>

          <Divider sx={{ borderColor: "rgba(220,212,202,0.45)" }} />

          {/* Scrollable content */}
          <Box sx={{ flex: 1, overflowY: "auto", px: 2.5, py: 2.5 }}>
            {/* Title + status */}
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
              <Typography sx={{ fontSize: "1.05rem", fontWeight: 700, color: SHELL_INK, letterSpacing: "-0.02em", lineHeight: 1.3 }}>
                {job.title}
              </Typography>
              <Box
                sx={{
                  px: 0.75,
                  py: 0.15,
                  borderRadius: "6px",
                  bgcolor: chip.color === "#16a34a" ? "rgba(22,163,74,0.1)" : chip.color === "#64748b" ? "rgba(100,116,139,0.08)" : "rgba(202,138,4,0.08)",
                  fontSize: "0.6rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  color: chip.color,
                  textTransform: "uppercase",
                  lineHeight: 1.5,
                  flexShrink: 0,
                }}
              >
                {chip.label}
              </Box>
            </Stack>

            {/* Meta line */}
            <Typography sx={{ fontSize: "0.8125rem", color: SHELL_MUTED, fontWeight: 400, mb: 2.5, lineHeight: 1.5 }}>
              {contextLine}
            </Typography>

            {/* Pipeline stats */}
            {job.status !== "draft" && (
              <Box sx={{ mb: 2.5 }}>
                <Typography sx={{ fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(107,99,92,0.5)", mb: 1 }}>
                  Pipeline snapshot
                </Typography>
                <Stack direction="row" flexWrap="nowrap" useFlexGap sx={{ gap: 1, alignItems: "stretch" }}>
                    {[
                    { label: "Matched", value: job.matches || 0, color: "#9A6B4A", bg: "linear-gradient(145deg, #FFF8F2 0%, #FFF2E7 48%, #FFFDF9 100%)", border: "rgba(154,107,74,0.16)" },
                    { label: "Applied", value: job.applied || 0, color: "#4A7C7E", bg: "linear-gradient(145deg, #F6FCFB 0%, #EAF6F4 50%, #FCFFFE 100%)", border: "rgba(74,124,126,0.16)" },
                    { label: "Unlocked", value: job.unlocked || 0, color: "#5C6B8A", bg: "linear-gradient(145deg, #F7F9FF 0%, #EEF2FB 50%, #FDFEFF 100%)", border: "rgba(92,107,138,0.16)" },
                  ].map((stat) => (
                    <Box
                      key={stat.label}
                      sx={{
                        flex: "1 1 0",
                        minWidth: 0,
                        px: 1.25,
                        py: 1,
                        borderRadius: "10px",
                        bgcolor: stat.bg,
                        border: `1px solid ${stat.border}`,
                        boxShadow: "none",
                      }}
                    >
                      <Typography sx={{ fontSize: "1.125rem", fontWeight: 800, color: stat.color, lineHeight: 1, letterSpacing: "-0.02em" }}>
                        {stat.value}
                      </Typography>
                      <Typography sx={{ fontSize: "0.6875rem", fontWeight: 600, color: SHELL_MUTED, mt: 0.25 }}>
                        {stat.label}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Box>
            )}

            {job.status !== "draft" && <Divider sx={{ borderColor: "rgba(220,212,202,0.35)", mb: 2.5 }} />}

            {/* Full job description */}
            {hasJobDescription && (
              <Box sx={{ mb: 1 }}>
                <Typography sx={{ fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(107,99,92,0.5)", mb: 1 }}>
                  Job description
                </Typography>
                <Typography sx={{ fontSize: "0.9375rem", color: "rgba(23,18,14,0.82)", lineHeight: 1.75, whiteSpace: "pre-line" }}>
                  {descText}
                </Typography>
              </Box>
            )}
          </Box>

          {/* Drawer footer */}
          <Divider sx={{ borderColor: "rgba(220,212,202,0.45)" }} />
          <Stack direction="row" justifyContent="flex-end" sx={{ px: 2.5, py: 1.5 }}>
            <Button
              onClick={() => setJdDialogOpen(false)}
              sx={{
                textTransform: "none",
                fontWeight: 600,
                fontSize: "0.8125rem",
                color: SHELL_MUTED,
                "&:hover": { color: SHELL_INK, bgcolor: "rgba(23,18,14,0.04)" },
              }}
            >
              Close
            </Button>
          </Stack>
        </Box>
          </Box>
        </>
      )}

      {detailCandidate && (
        <CandidateDetailDialog
          candidate={detailCandidate}
          jobCompetencies={details.competencies || []}
          open={Boolean(detailCandidate)}
          onClose={() => setDetailCandidate(null)}
          starred={starredIds.has(detailCandidate.id)}
          onToggleStar={handleToggleStar}
          onPrev={handlePrevCandidate}
          onNext={handleNextCandidate}
          hasPrev={hasPrevCandidate}
          hasNext={hasNextCandidate}
          unlockedIds={unlockedIds}
          onUnlockCandidate={handleUnlock}
        />
      )}
    </Box>
  );
}

function JobsTabContent({ onCreateJob, selectedJob, onSelectedJobChange }) {
  const [activeTab, setActiveTab] = useState("active");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const searchInputRef = useRef(null);

  const activeJobs = SAMPLE_JOBS.filter((j) => j.status === "active");
  const draftJobs = SAMPLE_JOBS.filter((j) => j.status === "draft").slice(0, 8);
  const closedJobs = SAMPLE_JOBS.filter((j) => j.status === "closed");

  const tabCounts = { active: activeJobs.length, draft: draftJobs.length, closed: closedJobs.length };
  const tabJobs =
    activeTab === "active" ? activeJobs : activeTab === "draft" ? draftJobs : closedJobs;
  const departmentOptions = useMemo(
    () => ["all", ...Array.from(new Set(tabJobs.map((job) => job.dept)))],
    [tabJobs]
  );
  const locationOptions = useMemo(
    () => ["all", ...Array.from(new Set(tabJobs.map((job) => job.location)))],
    [tabJobs]
  );
  const visibleJobs = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    return [...tabJobs]
      .filter((job) => (departmentFilter === "all" ? true : job.dept === departmentFilter))
      .filter((job) => (locationFilter === "all" ? true : job.location === locationFilter))
      .filter((job) => (normalizedQuery ? job.title.toLowerCase().includes(normalizedQuery) : true))
      .sort((a, b) => (sortOrder === "newest" ? b.id - a.id : a.id - b.id));
  }, [tabJobs, departmentFilter, locationFilter, searchQuery, sortOrder]);
  const viewSummary =
    activeTab === "active"
      ? `${activeJobs.length} active jobs, 284 matched candidates`
      : activeTab === "draft"
        ? `${draftJobs.length} drafts in progress, 12 unlocks remaining`
        : `${closedJobs.length} closed jobs, 3 closed this month`;

  useEffect(() => {
    if (searchOpen) {
      searchInputRef.current?.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    if (departmentFilter !== "all" && !departmentOptions.includes(departmentFilter)) {
      setDepartmentFilter("all");
    }
  }, [departmentFilter, departmentOptions]);

  useEffect(() => {
    if (locationFilter !== "all" && !locationOptions.includes(locationFilter)) {
      setLocationFilter("all");
    }
  }, [locationFilter, locationOptions]);

  if (selectedJob) {
    return <CandidateMatchView job={selectedJob} onBack={() => onSelectedJobChange(null)} />;
  }

  return (
    <Box>
      {/* Header row: title + create button */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <Box>
          <Typography component="h2" sx={{ fontSize: { xs: "1.125rem", md: "1.2rem" }, fontWeight: 800, color: SHELL_INK, letterSpacing: "-0.02em", lineHeight: 1.25 }}>
            My Jobs
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddOutlinedIcon />}
          onClick={onCreateJob}
          sx={{
            borderRadius: "10px",
            textTransform: "none",
            fontWeight: 700,
            fontSize: "0.875rem",
            px: 2,
            py: 0.85,
            boxShadow: "0 6px 18px rgba(248,114,58,0.22)",
          }}
        >
          Create Job
        </Button>
      </Stack>

      {/* Tab switcher */}
      <Stack direction="row" spacing={0.5} sx={{ mb: 2.5 }}>
        {TABS.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <Button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              disableRipple
              sx={{
                textTransform: "none",
                fontWeight: isActive ? 700 : 600,
                fontSize: "0.8125rem",
                color: isActive ? SHELL_INK : SHELL_MUTED,
                bgcolor: isActive ? "#fff" : "transparent",
                border: isActive ? "1px solid rgba(220,212,202,0.55)" : "1px solid transparent",
                borderRadius: "10px",
                px: 1.75,
                py: 0.65,
                minWidth: 0,
                boxShadow: isActive ? "0 2px 8px rgba(18,10,4,0.04)" : "none",
                transition: "all 0.18s ease",
                "&:hover": {
                  bgcolor: isActive ? "#fff" : "rgba(0,0,0,0.03)",
                },
              }}
            >
              {tab.label}
              <Box
                component="span"
                sx={{
                  ml: 0.75,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minWidth: 20,
                  height: 20,
                  borderRadius: "999px",
                  bgcolor: isActive ? "rgba(248,114,58,0.1)" : "rgba(107,99,92,0.08)",
                  color: isActive ? SHELL_PRIMARY : SHELL_MUTED,
                  fontSize: "0.6875rem",
                  fontWeight: 700,
                  px: 0.5,
                }}
              >
                {tabCounts[tab.key]}
              </Box>
            </Button>
          );
        })}
      </Stack>

      <Stack
        direction={{ xs: "column", md: "row" }}
        alignItems={{ xs: "stretch", md: "center" }}
        justifyContent="space-between"
        spacing={1}
        sx={{
          mb: 2,
          px: 0.25,
        }}
      >
        <Typography sx={{ fontSize: "0.7875rem", color: SHELL_MUTED, fontWeight: 500 }}>
          {viewSummary}
        </Typography>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ width: { xs: "100%", md: "auto" } }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              height: 36,
              width: searchOpen ? { xs: "100%", sm: 220 } : 36,
              borderRadius: "999px",
              border: searchOpen ? "1px solid rgba(220,212,202,0.75)" : "1px solid transparent",
              bgcolor: searchOpen ? "#fff" : "transparent",
              boxShadow: searchOpen ? "0 4px 14px rgba(18,10,4,0.06)" : "none",
              transition: "width 220ms ease, box-shadow 220ms ease",
              overflow: "hidden",
              flexShrink: 0,
              "&:hover": {
                bgcolor: searchOpen ? "#fff" : "transparent",
              },
            }}
          >
            <IconButton
              size="small"
              onClick={() => setSearchOpen(true)}
              sx={{
                ml: 0.15,
                color: searchOpen ? SHELL_PRIMARY : SHELL_MUTED,
                "&:hover": { bgcolor: "transparent" },
              }}
            >
              <SearchOutlinedIcon sx={{ fontSize: 17 }} />
            </IconButton>
            <InputBase
              inputRef={searchInputRef}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search jobs"
              sx={{
                ml: 0.25,
                flex: 1,
                fontSize: "0.75rem",
                color: SHELL_INK,
                opacity: searchOpen ? 1 : 0,
                transition: "opacity 160ms ease",
              }}
              inputProps={{ "aria-label": "Search jobs" }}
            />
            {searchOpen && (
              <IconButton
                size="small"
                onClick={() => {
                  setSearchQuery("");
                  setSearchOpen(false);
                }}
                sx={{ mr: 0.2, color: SHELL_MUTED, "&:hover": { bgcolor: "transparent" } }}
              >
                <CloseOutlinedIcon sx={{ fontSize: 15 }} />
              </IconButton>
            )}
          </Box>
          <Button
            variant="outlined"
            size="small"
            onClick={() => setSortOrder((prev) => (prev === "newest" ? "oldest" : "newest"))}
            startIcon={<SwapVertRoundedIcon sx={{ fontSize: 16 }} />}
            sx={{
              minWidth: 145,
              height: 36,
              borderRadius: "10px",
              bgcolor: "transparent",
              borderColor: "transparent",
              color: SHELL_INK,
              textTransform: "none",
              fontSize: "14px",
              fontWeight: 500,
              px: 1.2,
              "&:hover": {
                borderColor: "transparent",
                bgcolor: "rgba(18,10,4,0.04)",
              },
            }}
          >
            {sortOrder === "newest" ? "Newest to oldest" : "Oldest to newest"}
          </Button>
          <Select
            size="small"
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            sx={{
              minWidth: 148,
              height: 36,
              overflow: "hidden",
              borderRadius: "10px",
              bgcolor: "transparent",
              "&.MuiInputBase-root": {
                height: "36px",
                overflow: "hidden",
              },
              "& .MuiOutlinedInput-notchedOutline": { border: "none" },
              "&:hover .MuiOutlinedInput-notchedOutline": { border: "none" },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": { border: "none" },
              "&:hover": { bgcolor: "rgba(18,10,4,0.04)" },
              "& .MuiSelect-icon": { color: SHELL_INK },
              "&.Mui-focused .MuiSelect-icon": { color: SHELL_INK },
              "& .MuiSelect-select": {
                fontSize: "14px",
                color: SHELL_INK,
                minHeight: "unset",
                display: "flex",
                alignItems: "center",
                height: "36px",
                boxSizing: "border-box",
                paddingTop: 0,
                paddingBottom: 0,
                paddingLeft: "12px",
                paddingRight: "32px",
              },
            }}
          >
            <MenuItem value="all">All departments</MenuItem>
            {departmentOptions
              .filter((dept) => dept !== "all")
              .map((dept) => (
                <MenuItem key={dept} value={dept}>
                  {dept}
                </MenuItem>
              ))}
          </Select>
          <Select
            size="small"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            sx={{
              minWidth: 130,
              height: 36,
              borderRadius: "10px",
              bgcolor: "transparent",
              "& .MuiOutlinedInput-notchedOutline": { border: "none" },
              "&:hover .MuiOutlinedInput-notchedOutline": { border: "none" },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": { border: "none" },
              "&:hover": { bgcolor: "rgba(18,10,4,0.04)" },
              "& .MuiSelect-icon": { color: SHELL_INK },
              "&.Mui-focused .MuiSelect-icon": { color: SHELL_INK },
              "& .MuiSelect-select": {
                fontSize: "14px",
                color: SHELL_INK,
                minHeight: "unset",
                display: "flex",
                alignItems: "center",
                height: "36px",
                boxSizing: "border-box",
                paddingTop: 0,
                paddingBottom: 0,
                paddingLeft: "12px",
                paddingRight: "32px",
              },
            }}
          >
            <MenuItem value="all">All locations</MenuItem>
            {locationOptions
              .filter((location) => location !== "all")
              .map((location) => (
                <MenuItem key={location} value={location}>
                  {location}
                </MenuItem>
              ))}
          </Select>
        </Stack>
      </Stack>

      {/* Job cards */}
      {visibleJobs.length > 0 ? (
        <Stack spacing={1}>
          {visibleJobs.map((job) => (
            <JobRowCard key={`row-${job.id}`} job={job} onCreateJob={onCreateJob} onViewCandidates={onSelectedJobChange} />
          ))}
        </Stack>
      ) : (
        <Box
          sx={{
            borderRadius: "16px",
            border: "1px dashed rgba(220,212,202,0.65)",
            bgcolor: "rgba(255,255,255,0.5)",
            py: 6,
            textAlign: "center",
          }}
        >
          <Typography sx={{ fontSize: "0.9375rem", fontWeight: 600, color: SHELL_MUTED, mb: 1 }}>
            No {activeTab} jobs yet
          </Typography>
          {activeTab === "draft" && (
            <Button
              variant="outlined"
              size="small"
              startIcon={<AddOutlinedIcon />}
              onClick={onCreateJob}
              sx={{ textTransform: "none", fontWeight: 600, borderRadius: "10px", borderColor: "rgba(220,212,202,0.65)", color: SHELL_MUTED }}
            >
              Start a new job
            </Button>
          )}
        </Box>
      )}
    </Box>
  );
}

const MotionBox = motion.create(Box);
const DASH_STAGGER = { hidden: {}, visible: { transition: { staggerChildren: 0.07 } } };
const DASH_FADE_UP = { hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } };
const DASH_FADE_LEFT = { hidden: { opacity: 0, x: -18 }, visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } } };

function useCountUp(target, duration = 1200) {
  const [value, setValue] = useState(0);
  const raf = useRef(null);
  useEffect(() => {
    const start = performance.now();
    const step = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(ease * target));
      if (t < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [target, duration]);
  return value;
}

function KpiCard({ label, value, icon, gradient, accent }) {
  const display = useCountUp(value, 1100);
  const tintGradient =
    gradient.length >= 3
      ? `linear-gradient(152deg, ${gradient[0]} 0%, ${gradient[1]} 48%, ${gradient[2]} 100%)`
      : `linear-gradient(152deg, ${gradient[0]} 0%, ${gradient[1]} 100%)`;
  return (
    <MotionBox
      variants={DASH_FADE_UP}
      sx={{
        flex: "1 1 0",
        minWidth: 140,
        p: 2.25,
        borderRadius: "18px",
        background: [
          "linear-gradient(185deg, rgba(255,255,255,0.72) 0%, rgba(255,255,255,0) 42%)",
          "linear-gradient(125deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 55%)",
          tintGradient,
        ].join(", "),
        border: "1px solid rgba(230,222,212,0.72)",
        boxShadow: "0 1px 0 rgba(255,255,255,0.9) inset, 0 6px 20px rgba(23,18,14,0.04)",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          transform: "translateY(-1px)",
          boxShadow: `0 1px 0 rgba(255,255,255,0.95) inset, 0 8px 26px rgba(23,18,14,0.055), 0 0 0 1px ${accent}14`,
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          opacity: 1,
          background: `radial-gradient(120% 80% at 100% 0%, ${accent}0F 0%, transparent 55%)`,
        }}
      />
      <Box sx={{ position: "absolute", top: 14, right: 14, opacity: 0.14, color: accent }}>
        {icon}
      </Box>
      <Typography
        sx={{
          position: "relative",
          fontSize: "2rem",
          fontWeight: 800,
          color: `color-mix(in srgb, ${accent} 76%, ${SHELL_MUTED})`,
          letterSpacing: "-0.04em",
          lineHeight: 1.1,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {display.toLocaleString()}
      </Typography>
      <Typography
        sx={{
          position: "relative",
          fontSize: "0.78rem",
          fontWeight: 600,
          color: "rgba(55,48,40,0.55)",
          mt: 0.75,
          letterSpacing: "0.02em",
        }}
      >
        {label}
      </Typography>
    </MotionBox>
  );
}

const MATCHES_TREND_RANGES = [
  { id: "7d", label: "7 days", shortLabel: "7d", days: 7 },
  { id: "14d", label: "14 days", shortLabel: "14d", days: 14 },
  { id: "1m", label: "1 month", shortLabel: "1 mo", days: 30 },
  { id: "2m", label: "2 months", shortLabel: "2 mo", days: 60 },
  { id: "3m", label: "3 months", shortLabel: "3 mo", days: 90 },
];

/** Deterministic demo series for the matches trend area chart (one point per day). */
function buildMatchesTrendData(totalDays) {
  const out = [];
  const end = new Date();
  end.setHours(12, 0, 0, 0);
  for (let i = 0; i < totalDays; i += 1) {
    const d = new Date(end);
    d.setDate(d.getDate() - (totalDays - 1 - i));
    const t = totalDays > 1 ? i / (totalDays - 1) : 0;
    const wave = Math.sin(t * Math.PI * 2.15) * 10 + Math.sin(t * Math.PI * 5.5) * 2.5;
    const drift = i * 0.11;
    const matches = Math.round(Math.min(52, Math.max(10, 23 + wave + drift + ((i * 7) % 4) - 1.5)));

    let day;
    if (totalDays <= 7) {
      day = d.toLocaleDateString("en-US", { weekday: "short" });
    } else {
      day = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    }
    out.push({ day, matches });
  }
  return out;
}

/** Home Job Performance table: ICP column reflects profile completeness and review state. */
function getPerfRowIcpStatus(jobId, details) {
  const n = details?.competencies?.length ?? 0;
  if (n === 0) return "not_setup";
  const insight = ICP_INSIGHTS[jobId];
  if (insight && (insight.type === "warning" || insight.type === "refine")) return "awaiting";
  return "approved";
}

function HomeTabContent({ onCreateJob, onOpenJobs, onOpenTeamInvite }) {
  const activeJobs = useMemo(() => SAMPLE_JOBS.filter((j) => j.status === "active"), []);
  const draftJobs = useMemo(() => SAMPLE_JOBS.filter((j) => j.status === "draft"), []);

  const totalMatches = useMemo(() => activeJobs.reduce((s, j) => s + (j.matches ?? 0), 0), [activeJobs]);
  const newMatches24 = useMemo(() => activeJobs.reduce((s, j) => s + (j.newMatches24h ?? 0), 0), [activeJobs]);
  const totalUnlocked = useMemo(() => activeJobs.reduce((s, j) => s + (j.unlocked ?? 0), 0), [activeJobs]);
  const totalStarred = 89;
  const totalApplied = useMemo(() => activeJobs.reduce((s, j) => s + (j.applied ?? 0), 0), [activeJobs]);

  const icpJobCount = useMemo(() => Object.keys(ICP_INSIGHTS).filter((k) => activeJobs.some((j) => j.id === Number(k))).length, [activeJobs]);

  const deptData = useMemo(() => {
    const map = {};
    activeJobs.forEach((j) => {
      if (!map[j.dept]) map[j.dept] = { dept: j.dept, matches: 0, applied: 0, unlocked: 0 };
      map[j.dept].matches += j.matches ?? 0;
      map[j.dept].applied += j.applied ?? 0;
      map[j.dept].unlocked += j.unlocked ?? 0;
    });
    return Object.values(map).sort((a, b) => b.matches - a.matches);
  }, [activeJobs]);

  const perfJobs = useMemo(() => {
    return activeJobs
      .filter((j) => (j.matches ?? 0) > 0)
      .sort((a, b) => (b.matches ?? 0) - (a.matches ?? 0))
      .slice(0, 6)
      .map((j) => {
        const d = JOB_DETAILS[j.id];
        return {
          ...j,
          quality: j.pipelineHealth === "strong" ? "High" : j.pipelineHealth === "moderate" ? "Medium" : "Low",
          icpStatus: getPerfRowIcpStatus(j.id, d),
        };
      });
  }, [activeJobs]);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  const actionItems = useMemo(() => {
    const items = [];
    if (newMatches24 > 0) {
      items.push({
        text: `${newMatches24} new candidates matched in last 24 hours`,
        hint: "Prioritize who to review first while intent is fresh.",
        cta: "View Candidates",
        icon: <GroupsOutlinedIcon sx={{ fontSize: 20 }} />,
        accent: "#3B82F6",
        handler: "jobs",
      });
    }
    if (icpJobCount > 0) {
      items.push({
        text: `${icpJobCount} jobs need ICP review`,
        hint: "Approving ICP tightens match quality for those roles.",
        cta: "Edit ICP",
        icon: <TuneRoundedIcon sx={{ fontSize: 20 }} />,
        accent: "#8B5CF6",
        handler: "jobs",
      });
    }
    if (draftJobs.length > 0) {
      items.push({
        text: `${draftJobs.length} jobs saved as draft`,
        hint: "Publishing unlocks matching for that role.",
        cta: "Continue Job Creation",
        icon: <DescriptionOutlinedIcon sx={{ fontSize: 20 }} />,
        accent: "#F59E0B",
        handler: "jobs",
      });
    }
    return items;
  }, [newMatches24, icpJobCount, draftJobs]);

  const matchGradId = useId().replace(/:/g, "");
  const [matchesTrendRange, setMatchesTrendRange] = useState("7d");
  const matchesTrendDays = MATCHES_TREND_RANGES.find((r) => r.id === matchesTrendRange)?.days ?? 7;
  const matchesTrendData = useMemo(() => buildMatchesTrendData(matchesTrendDays), [matchesTrendDays]);
  const matchesTrendXInterval =
    matchesTrendData.length > 20 ? Math.max(0, Math.floor(matchesTrendData.length / 10) - 1) : 0;
  const matchesTrendShowDots = matchesTrendData.length <= 18;
  const matchesTrendYDomainMax = useMemo(() => {
    const maxVal = matchesTrendData.reduce((m, d) => Math.max(m, Number(d.matches) || 0), 0);
    return Math.max(36, Math.ceil((maxVal + 6) / 9) * 9);
  }, [matchesTrendData]);

  const neutralRule = "1px solid rgba(230,222,212,0.95)";
  /** Unlock column: simple left-to-right orange fill (matches shell primary). */
  const unlockBarPremium = `linear-gradient(90deg, #FDC9A0 0%, ${SHELL_PRIMARY} 100%)`;

  const runJobsAction = () => {
    if (typeof onOpenJobs === "function") onOpenJobs();
  };

  const runTeamInviteAction = () => {
    if (typeof onOpenTeamInvite === "function") onOpenTeamInvite();
  };

  return (
    <MotionBox initial="hidden" animate="visible" variants={DASH_STAGGER}>
      {/* Landing hero: headline + live stats */}
      <MotionBox
        variants={DASH_FADE_UP}
        sx={{
          position: "relative",
          mb: 3.5,
          borderRadius: "24px",
          p: { xs: 2.5, sm: 3, md: 3.5 },
          overflow: "hidden",
          isolation: "isolate",
          border: "1px solid rgba(230,222,212,0.38)",
          background: [
            "linear-gradient(155deg, #FFFDFB 0%, #FDF9F5 42%, #FAF6F0 100%)",
            "linear-gradient(115deg, rgba(248,114,58,0.05) 0%, transparent 40%, rgba(14,165,233,0.04) 75%, transparent 100%)",
          ].join(", "),
          boxShadow: [
            "0 1px 0 rgba(255,255,255,0.95) inset",
            "0 1px 4px rgba(23,18,14,0.04)",
            "0 12px 36px rgba(23,18,14,0.05)",
          ].join(", "),
          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
            pointerEvents: "none",
            zIndex: 0,
            background:
              "radial-gradient(60% 120% at 100% 100%, rgba(248,114,58,0.06) 0%, transparent 70%), radial-gradient(50% 100% at 0% 0%, rgba(14,165,233,0.05) 0%, transparent 60%)",
          },
          "&::after": {
            content: '""',
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
            pointerEvents: "none",
            zIndex: 0,
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.55)",
          },
        }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 3, md: 0 }}
          alignItems={{ md: "center" }}
          justifyContent="space-between"
          sx={{ position: "relative", zIndex: 1 }}
        >
          {/* Left: greeting + CTAs */}
          <Box sx={{ flex: "1 1 auto", minWidth: 0 }}>
            <Typography
              component="h1"
              sx={{
                fontFamily: '"DM Serif Display", Georgia, "Times New Roman", serif',
                fontSize: { xs: "26px", sm: "28px" },
                fontWeight: 400,
                letterSpacing: "-0.03em",
                color: SHELL_INK,
                lineHeight: 1.1,
                mb: 1,
              }}
            >
              {greeting}, Sarah 👋🏻
            </Typography>
            <Typography sx={{ color: SHELL_MUTED, fontSize: { xs: "0.88rem", sm: "0.93rem" }, lineHeight: 1.6, mb: 2.5 }}>
              Your live pipeline and AI matches in one place. Publish, review roles, or invite your team when ready.
            </Typography>

            <Stack direction="row" spacing={1.25} flexWrap="wrap" useFlexGap>
              <Button
                variant="contained"
                size="large"
                disableElevation
                startIcon={<AddOutlinedIcon />}
                onClick={onCreateJob}
                sx={{
                  py: 1.15,
                  px: 2.5,
                  borderRadius: "12px",
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  textTransform: "none",
                  bgcolor: SHELL_PRIMARY,
                  color: "#fff",
                  "&:hover": { bgcolor: "#E5622E" },
                }}
              >
                Create a job posting
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<VisibilityOutlinedIcon />}
                onClick={runJobsAction}
                sx={{
                  py: 1.15,
                  px: 2.5,
                  borderRadius: "12px",
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  textTransform: "none",
                  borderColor: "rgba(220,212,202,0.7)",
                  color: SHELL_INK,
                  "&:hover": { borderColor: SHELL_PRIMARY, color: SHELL_PRIMARY, bgcolor: "rgba(248,114,58,0.05)" },
                }}
              >
                Open My Jobs
              </Button>
              <Button
                variant="text"
                size="large"
                startIcon={<PersonAddAlt1OutlinedIcon sx={{ fontSize: 16 }} />}
                onClick={runTeamInviteAction}
                sx={{
                  py: 1.15,
                  px: 2,
                  borderRadius: "12px",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  textTransform: "none",
                  color: SHELL_INK,
                  "&:hover": { color: SHELL_PRIMARY, bgcolor: "rgba(248,114,58,0.05)" },
                }}
              >
                Add team member
              </Button>
            </Stack>
          </Box>

          {/* Right: decorative graphic */}
          <Box
            sx={{
              display: { xs: "none", md: "block" },
              flexShrink: 0,
              position: "relative",
              width: 260,
              height: 140,
              ml: 3,
            }}
          >
            <svg width="260" height="140" viewBox="0 0 260 140" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
              <defs>
                <linearGradient id="heroBar1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={SHELL_PRIMARY} stopOpacity="0.28" />
                  <stop offset="100%" stopColor={SHELL_PRIMARY} stopOpacity="0.06" />
                </linearGradient>
                <linearGradient id="heroBar2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4F6EF5" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="#4F6EF5" stopOpacity="0.05" />
                </linearGradient>
                <linearGradient id="heroBar3" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0F9A7A" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="#0F9A7A" stopOpacity="0.05" />
                </linearGradient>
                <linearGradient id="heroLine" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor={SHELL_PRIMARY} stopOpacity="0" />
                  <stop offset="30%" stopColor={SHELL_PRIMARY} stopOpacity="0.35" />
                  <stop offset="100%" stopColor={SHELL_PRIMARY} stopOpacity="0.08" />
                </linearGradient>
              </defs>
              {/* Abstract rising bars */}
              <rect x="20" y="60" width="28" height="70" rx="6" fill="url(#heroBar2)" />
              <rect x="58" y="38" width="28" height="92" rx="6" fill="url(#heroBar1)" />
              <rect x="96" y="50" width="28" height="80" rx="6" fill="url(#heroBar3)" />
              <rect x="134" y="22" width="28" height="108" rx="6" fill="url(#heroBar1)" />
              <rect x="172" y="42" width="28" height="88" rx="6" fill="url(#heroBar2)" />
              <rect x="210" y="14" width="28" height="116" rx="6" fill="url(#heroBar3)" />
              {/* Trend line */}
              <path d="M34 58 L72 36 L110 48 L148 20 L186 40 L224 12" stroke="url(#heroLine)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              {/* Dots on trend line */}
              <circle cx="72" cy="36" r="3" fill={SHELL_PRIMARY} fillOpacity="0.3" />
              <circle cx="148" cy="20" r="3" fill={SHELL_PRIMARY} fillOpacity="0.3" />
              <circle cx="224" cy="12" r="3.5" fill={SHELL_PRIMARY} fillOpacity="0.45" />
            </svg>
          </Box>
        </Stack>
      </MotionBox>

      {/* KPI strip: dashboard depth */}
      <Typography sx={{ fontSize: "0.68rem", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(23,18,14,0.45)", mb: 1.5 }}>
        Pipeline metrics
      </Typography>
      <MotionBox variants={DASH_STAGGER} sx={{ display: "flex", gap: 1.75, mb: 3.5, flexWrap: "wrap" }}>
        <KpiCard label="Active Jobs" value={activeJobs.length} gradient={["#FBFCFF", "#F0F4FF", "#E4EBFA"]} accent="#4F6EF5" icon={<WorkOutlineOutlinedIcon sx={{ fontSize: 34 }} />} />
        <KpiCard label="Total Matches" value={totalMatches} gradient={["#FAFDFB", "#F0FAF6", "#E3F2EA"]} accent="#0F9A7A" icon={<AutoAwesomeOutlinedIcon sx={{ fontSize: 34 }} />} />
        <KpiCard label="New Matches (24h)" value={newMatches24} gradient={["#FFFCF8", "#FFF6EB", "#FFEDD5"]} accent="#C27A12" icon={<TrendingUpOutlinedIcon sx={{ fontSize: 34 }} />} />
        <KpiCard label="Unlocked" value={totalUnlocked} gradient={["#FCFBFF", "#F6F2FF", "#EDE6FB"]} accent="#7C6AE6" icon={<LockOpenOutlinedIcon sx={{ fontSize: 34 }} />} />
        <KpiCard label="Starred" value={totalStarred} gradient={["#FFFBFC", "#FFF1F3", "#FFE4E9"]} accent="#E04D6A" icon={<StarRoundedIcon sx={{ fontSize: 34 }} />} />
      </MotionBox>

      {/* Charts Row */}
      <Stack direction={{ xs: "column", md: "row" }} spacing={2.5} alignItems="stretch" sx={{ mb: 3.5 }}>
        {/* Recommended next steps (vertical; replaces pipeline donut) */}
        <MotionBox variants={DASH_FADE_UP} sx={{ flex: 1, minWidth: 0, bgcolor: "#fff", borderRadius: "18px", border: "1px solid rgba(220,212,202,0.45)", p: 2.5 }}>
          <Typography sx={{ fontSize: "0.7rem", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(23,18,14,0.45)", mb: 1.5 }}>
            Recommended next steps
          </Typography>
          <Stack spacing={1.5} sx={{ width: "100%" }}>
            {actionItems.length === 0 ? (
              <Box
                sx={{
                  p: 2.5,
                  borderRadius: "20px",
                  bgcolor: "#fff",
                  border: "1px dashed rgba(220,212,202,0.65)",
                  boxShadow: "0 1px 0 rgba(255,255,255,0.95) inset, 0 1px 2px rgba(23,18,14,0.04)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "stretch",
                }}
              >
                <Typography sx={{ fontSize: "0.875rem", fontWeight: 500, color: SHELL_MUTED, lineHeight: 1.55 }}>
                  You are all caught up. Open jobs to review candidates or publish a new role.
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%", mt: 2 }}>
                  <Button
                    variant="outlined"
                    disableElevation
                    onClick={runJobsAction}
                    endIcon={<ArrowForwardIosRoundedIcon sx={{ fontSize: 11 }} />}
                    sx={{
                      textTransform: "none",
                      fontWeight: 700,
                      borderRadius: "12px",
                      py: 0.85,
                      px: 2.25,
                      borderWidth: 1.25,
                      borderColor: SHELL_PRIMARY,
                      color: SHELL_PRIMARY,
                      bgcolor: "transparent",
                      boxShadow: "none",
                      "&:hover": {
                        borderColor: SHELL_PRIMARY,
                        color: SHELL_PRIMARY,
                        bgcolor: "rgba(248, 114, 58, 0.06)",
                        boxShadow: "none",
                      },
                    }}
                  >
                    Go to My Jobs
                  </Button>
                </Box>
              </Box>
            ) : (
              actionItems.map((item, i) => (
                <MotionBox
                  key={i}
                  variants={DASH_FADE_LEFT}
                  sx={{
                    borderRadius: "20px",
                    border: "1px solid rgba(220,212,202,0.5)",
                    bgcolor: "#fff",
                    p: 1.75,
                    position: "relative",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "stretch",
                    gap: 1.1,
                    boxShadow: "0 1px 0 rgba(255,255,255,0.92) inset, 0 1px 2px rgba(23,18,14,0.05), 0 3px 10px rgba(23,18,14,0.035)",
                    transition: "border-color 0.2s ease, box-shadow 0.22s ease, transform 0.22s ease",
                    "&:hover": {
                      borderColor: "rgba(248,114,58,0.32)",
                      boxShadow:
                        "0 1px 0 rgba(255,255,255,0.95) inset, 0 1px 3px rgba(23,18,14,0.06), 0 4px 12px rgba(23,18,14,0.04), 0 0 0 1px rgba(248,114,58,0.08)",
                      transform: "translateY(-1px)",
                    },
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      inset: 0,
                      pointerEvents: "none",
                      borderRadius: "inherit",
                      background: `radial-gradient(120% 70% at 100% -20%, ${item.accent}10 0%, transparent 52%)`,
                    },
                  }}
                >
                  <Stack direction="row" alignItems="flex-start" spacing={1.25} sx={{ position: "relative", zIndex: 1 }}>
                    <Box
                      sx={{
                        width: 44,
                        height: 44,
                        flexShrink: 0,
                        borderRadius: "12px",
                        display: "grid",
                        placeItems: "center",
                        color: item.accent,
                        bgcolor: `${item.accent}12`,
                        border: `1px solid ${item.accent}22`,
                      }}
                    >
                      {item.icon}
                    </Box>
                    <Stack spacing={0.4} sx={{ flex: 1, minWidth: 0, pt: 0.15 }}>
                      <Typography sx={{ fontSize: "0.875rem", fontWeight: 600, color: SHELL_INK, lineHeight: 1.38, letterSpacing: "-0.01em" }}>
                        {item.text}
                      </Typography>
                      <Typography sx={{ fontSize: "0.72rem", fontWeight: 500, color: "rgba(55,48,40,0.48)", lineHeight: 1.38 }}>
                        {item.hint}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%", position: "relative", zIndex: 1 }}>
                    <Button
                      variant="outlined"
                      disableElevation
                      onClick={() => (item.handler === "create" ? onCreateJob() : runJobsAction())}
                      endIcon={<ArrowForwardIosRoundedIcon sx={{ fontSize: 11, opacity: 0.95 }} />}
                      sx={{
                        textTransform: "none",
                        fontWeight: 700,
                        fontSize: "0.8125rem",
                        borderRadius: "12px",
                        py: 0.75,
                        px: 2,
                        borderWidth: 1.25,
                        borderColor: SHELL_PRIMARY,
                        color: SHELL_PRIMARY,
                        bgcolor: "transparent",
                        boxShadow: "none",
                        ...((item.cta === "Edit ICP" || item.cta === "View Candidates") ? { width: "202px" } : {}),
                        "&:hover": {
                          borderColor: SHELL_PRIMARY,
                          color: SHELL_PRIMARY,
                          bgcolor: "rgba(248, 114, 58, 0.06)",
                          boxShadow: "none",
                        },
                      }}
                    >
                      {item.cta}
                    </Button>
                  </Box>
                </MotionBox>
              ))
            )}
          </Stack>
        </MotionBox>

        {/* Trend Chart */}
        <MotionBox
          variants={DASH_FADE_UP}
          sx={{
            flex: 1,
            minWidth: 0,
            minHeight: 0,
            display: "flex",
            flexDirection: "column",
            bgcolor: "#fff",
            borderRadius: "18px",
            border: "1px solid rgba(220,212,202,0.45)",
            p: 2.5,
          }}
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems={{ xs: "stretch", sm: "center" }}
            justifyContent="space-between"
            spacing={1.25}
            sx={{ mb: 2, gap: 1.25, flexShrink: 0 }}
          >
            <Typography sx={{ fontSize: "0.7rem", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(23,18,14,0.45)" }}>
              Matches trend
            </Typography>
            <ToggleButtonGroup
              exclusive
              value={matchesTrendRange}
              onChange={(_, next) => {
                if (next !== null) setMatchesTrendRange(next);
              }}
              size="small"
              aria-label="Matches trend date range"
              sx={{
                alignSelf: { xs: "stretch", sm: "center" },
                flexShrink: 0,
                bgcolor: "rgba(248,246,242,0.98)",
                borderRadius: "10px",
                p: 0.35,
                border: "1px solid rgba(220,212,202,0.5)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.85)",
                "& .MuiToggleButtonGroup-grouped": { border: 0, mx: 0.125 },
                "& .MuiToggleButton-root": {
                  borderRadius: "8px",
                  px: { xs: 0.85, sm: 1 },
                  py: 0.4,
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  textTransform: "none",
                  color: SHELL_MUTED,
                  minWidth: 0,
                  "&.Mui-selected": {
                    bgcolor: "#fff",
                    color: SHELL_INK,
                    boxShadow: "0 1px 4px rgba(23,18,14,0.09)",
                    "&:hover": { bgcolor: "#fff" },
                  },
                },
              }}
            >
              {MATCHES_TREND_RANGES.map((r) => (
                <ToggleButton key={r.id} value={r.id} aria-label={r.label}>
                  {r.shortLabel}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Stack>
          <Box
            sx={{
              width: "100%",
              flex: 1,
              minHeight: { xs: 280, md: 260 },
              display: "flex",
              flexDirection: "column",
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={matchesTrendData}
                margin={{
                  top: 14,
                  right: 12,
                  left: 2,
                  bottom: matchesTrendData.length > 30 ? 8 : 2,
                }}
              >
                <defs>
                  <linearGradient id={matchGradId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={SHELL_PRIMARY} stopOpacity={0.35} />
                    <stop offset="95%" stopColor={SHELL_PRIMARY} stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(23,18,14,0.06)" vertical={false} />
                <XAxis
                  dataKey="day"
                  interval={matchesTrendXInterval}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: matchesTrendData.length > 40 ? 9 : 11, fontWeight: 600, fill: "#9e958d" }}
                  angle={matchesTrendData.length > 35 ? -32 : 0}
                  textAnchor={matchesTrendData.length > 35 ? "end" : "middle"}
                  height={matchesTrendData.length > 35 ? 52 : undefined}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  width={46}
                  domain={[0, matchesTrendYDomainMax]}
                  tick={{ fontSize: 11, fontWeight: 600, fill: "#9e958d" }}
                  allowDecimals={false}
                />
                <RechartsTooltip
                  cursor={{ stroke: "rgba(23,18,14,0.1)", strokeWidth: 1 }}
                  contentStyle={{ borderRadius: 12, border: "1px solid rgba(220,212,202,0.5)", boxShadow: "0 4px 16px rgba(0,0,0,0.06)", fontSize: "0.8125rem" }}
                />
                <Area
                  type="monotone"
                  dataKey="matches"
                  stroke={SHELL_PRIMARY}
                  strokeWidth={2.5}
                  fill={`url(#${matchGradId})`}
                  isAnimationActive
                  animationDuration={1000}
                  animationEasing="ease-in-out"
                  dot={
                    matchesTrendShowDots
                      ? { r: 4, fill: "#fff", stroke: SHELL_PRIMARY, strokeWidth: 2 }
                      : false
                  }
                  activeDot={{ r: 6, fill: SHELL_PRIMARY, stroke: "#fff", strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Box>
        </MotionBox>
      </Stack>

      {/* Main work area: full-width job performance table */}
      <Stack direction="column" spacing={2.5} sx={{ mb: 3.5, alignItems: "stretch", width: "100%" }}>
        {/* Job Performance */}
        <MotionBox variants={DASH_FADE_UP} sx={{ width: "100%", minWidth: 0 }}>
          <Typography sx={{ fontSize: "0.7rem", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(23,18,14,0.45)", mb: 1.5 }}>
            Job Performance
          </Typography>
          <Box
            sx={{
              borderRadius: "18px",
              border: neutralRule,
              overflow: "hidden",
              bgcolor: "#fff",
              boxShadow: "0 18px 44px rgba(23,18,14,0.055), 0 1px 0 rgba(255,255,255,0.9) inset",
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              sx={{
                px: 2.25,
                py: 1.35,
                borderBottom: neutralRule,
                background: "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(248,246,242,0.92) 100%)",
              }}
            >
              <Typography sx={{ flex: "2 1 0", fontSize: "0.65rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(23,18,14,0.4)" }}>
                Role
              </Typography>
              <Typography sx={{ flex: "0.72 1 0", fontSize: "0.65rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(23,18,14,0.4)", textAlign: "left" }}>
                Status
              </Typography>
              <Tooltip
                title="Number of candidates newly matched to this job in the last rolling 24 hours."
                arrow
                placement="top"
                enterDelay={400}
              >
                <Typography
                  sx={{
                    flex: "0.9 1 0",
                    minWidth: 0,
                    textAlign: "left",
                    fontSize: "0.58rem",
                    fontWeight: 800,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "rgba(23,18,14,0.4)",
                    lineHeight: 1.25,
                    whiteSpace: "nowrap",
                  }}
                >
                  New matches (last 24h)
                </Typography>
              </Tooltip>
              <Typography sx={{ flex: "1.45 1 0", fontSize: "0.58rem", fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(23,18,14,0.4)", lineHeight: 1.25 }}>
                Unlocked / matches
              </Typography>
              <Typography
                sx={{
                  flex: "1.83 1 0",
                  fontSize: "0.65rem",
                  fontWeight: 800,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "rgba(23,18,14,0.4)",
                  textAlign: "left",
                  pl: "26px",
                  whiteSpace: "nowrap",
                  wordBreak: "keep-all",
                }}
              >
                Ideal Candidate Profile
              </Typography>
            </Stack>
            {perfJobs.map((j, i) => {
              const chipCfg = STATUS_CHIP[j.status] || STATUS_CHIP.active;
              const pct = j.matches > 0 ? Math.round(((j.unlocked ?? 0) / j.matches) * 100) : 0;
              const deptTheme = getDomainTheme(j.dept);
              const DeptIcon = deptTheme.Icon;
              const fresh = j.newMatches24h ?? 0;
              const icpLabel =
                j.icpStatus === "approved"
                  ? "Approved"
                  : j.icpStatus === "awaiting"
                    ? "Awaiting Approval"
                    : "Not configured";
              const IcpStatusIcon =
                j.icpStatus === "approved"
                  ? CheckCircleOutlineRoundedIcon
                  : j.icpStatus === "awaiting"
                    ? ScheduleOutlinedIcon
                    : CircleOutlinedIcon;
              return (
                <Stack
                  key={j.id}
                  direction="row"
                  alignItems="center"
                  sx={{
                    px: 2.25,
                    py: 1.65,
                    borderBottom: i < perfJobs.length - 1 ? neutralRule : "none",
                    bgcolor: "#fff",
                  }}
                >
                  <Stack direction="row" alignItems="center" spacing={1.35} sx={{ flex: "2 1 0", minWidth: 0 }}>
                    <Box
                      sx={{
                        width: 44,
                        height: 44,
                        borderRadius: "14px",
                        flexShrink: 0,
                        display: "grid",
                        placeItems: "center",
                        bgcolor: deptTheme.bg,
                        border: neutralRule,
                        color: deptTheme.accent,
                        boxShadow: "0 4px 14px rgba(23,18,14,0.05)",
                      }}
                    >
                      <DeptIcon sx={{ fontSize: 22 }} />
                    </Box>
                    <Stack spacing={0.15} sx={{ minWidth: 0 }}>
                      <Typography sx={{ fontSize: "0.9rem", fontWeight: 600, color: SHELL_INK, letterSpacing: "-0.025em", lineHeight: 1.2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {j.title}
                      </Typography>
                      <Typography sx={{ fontSize: "0.7rem", fontWeight: 600, color: SHELL_MUTED, letterSpacing: "0.01em", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {j.dept} · {j.location}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Box sx={{ flex: "0.72 1 0", display: "flex", justifyContent: "flex-start" }}>
                    <Chip
                      label={chipCfg.label}
                      size="small"
                      sx={{
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        height: 26,
                        bgcolor: chipCfg.bg,
                        color: chipCfg.color,
                        border: neutralRule,
                        boxShadow: "0 1px 2px rgba(23,18,14,0.04)",
                      }}
                    />
                  </Box>
                  <Box sx={{ flex: "0.9 1 0", display: "flex", justifyContent: "flex-start" }}>
                    {fresh > 0 ? (
                      <Tooltip
                        title="Candidates newly matched to this job in the last rolling 24 hours."
                        arrow
                        placement="top"
                      >
                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={0.45}
                          sx={{
                            px: 0.85,
                            py: 0.35,
                            borderRadius: "999px",
                            bgcolor: "rgba(255,251,235,0.95)",
                            border: neutralRule,
                          }}
                        >
                          <AutoAwesomeOutlinedIcon sx={{ fontSize: 14, color: SHELL_MUTED }} />
                          <Typography sx={{ fontSize: "0.8125rem", fontWeight: 800, color: SHELL_INK, fontVariantNumeric: "tabular-nums", lineHeight: 1 }}>
                            {fresh}
                          </Typography>
                        </Stack>
                      </Tooltip>
                    ) : (
                      <Tooltip
                        title="Candidates newly matched to this job in the last rolling 24 hours."
                        arrow
                        placement="top"
                      >
                        <Typography sx={{ fontSize: "0.8125rem", fontWeight: 700, color: SHELL_MUTED, textAlign: "left", fontVariantNumeric: "tabular-nums" }}>
                          {fresh}
                        </Typography>
                      </Tooltip>
                    )}
                  </Box>
                  <Box sx={{ flex: "1.45 1 0", display: "flex", alignItems: "center", gap: 1.1, minWidth: 0 }}>
                    <Box
                      sx={{
                        flex: "0 1 auto",
                        width: "100%",
                        maxWidth: 200,
                        height: 11,
                        borderRadius: "18px",
                        bgcolor: "rgba(250,248,245,0.98)",
                        overflow: "hidden",
                        position: "relative",
                        boxShadow: "inset 0 1px 2px rgba(23,18,14,0.05), inset 0 -1px 0 rgba(255,255,255,0.65)",
                        border: "1px solid rgba(230,222,212,0.75)",
                      }}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.9, delay: 0.25 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                        style={{
                          height: "100%",
                          borderRadius: "18px",
                          background: unlockBarPremium,
                          boxShadow: "0 1px 3px rgba(248, 114, 58, 0.22)",
                        }}
                      />
                    </Box>
                    <Box
                      sx={{
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        color: SHELL_MUTED,
                        minWidth: 82,
                        fontVariantNumeric: "tabular-nums",
                        letterSpacing: "-0.02em",
                        lineHeight: 1.2,
                        borderRadius: "18px",
                      }}
                    >
                      <Box component="span" sx={{ color: SHELL_INK, fontWeight: 800 }}>
                        {j.unlocked}
                      </Box>
                      <Box component="span" sx={{ color: "rgba(23,18,14,0.28)", mx: 0.25 }}>
                        /
                      </Box>
                      {j.matches}
                    </Box>
                  </Box>
                  <Box sx={{ flex: "1.83 1 0", display: "flex", justifyContent: "flex-start", width: "100%", minWidth: 0 }}>
                    <Stack direction="row" alignItems="center" spacing={0.5} sx={{ minWidth: 0, width: "100%", justifyContent: "flex-start" }}>
                      <Box sx={{ width: 22, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
                        <IcpStatusIcon sx={{ fontSize: 18, color: SHELL_MUTED }} />
                      </Box>
                      <Typography sx={{ fontSize: "0.7rem", fontWeight: 700, color: SHELL_INK, lineHeight: 1.25, textAlign: "left" }}>
                        {icpLabel}
                      </Typography>
                    </Stack>
                  </Box>
                </Stack>
              );
            })}
          </Box>
        </MotionBox>
      </Stack>

      {/* Department Breakdown */}
      <MotionBox variants={DASH_FADE_UP} sx={{ bgcolor: "#fff", borderRadius: "18px", border: "1px solid rgba(220,212,202,0.45)", p: 2.5, mb: 3.5 }}>
        <Typography sx={{ fontSize: "0.7rem", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(23,18,14,0.45)", mb: 2 }}>
          Department Breakdown
        </Typography>
        <Box sx={{ width: "100%", height: 260 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={deptData} margin={{ top: 4, right: 12, left: -8, bottom: 0 }} barCategoryGap="24%">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(23,18,14,0.06)" vertical={false} />
              <XAxis dataKey="dept" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 600, fill: "#9e958d" }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 600, fill: "#9e958d" }} />
              <RechartsTooltip
                cursor={{ fill: "rgba(23,18,14,0.04)", stroke: "none" }}
                contentStyle={{ borderRadius: 12, border: "1px solid rgba(220,212,202,0.5)", boxShadow: "0 4px 16px rgba(0,0,0,0.06)", fontSize: "0.8125rem" }}
              />
              <Legend iconType="circle" iconSize={10} wrapperStyle={{ fontSize: "0.75rem", fontWeight: 600, paddingTop: 8 }} />
              <Bar dataKey="matches" name="Matches" fill="#3B82F6" radius={[6, 6, 0, 0]} isAnimationActive animationDuration={550} animationEasing="ease-out" />
              <Bar dataKey="applied" name="Applied" fill="#14B8A6" radius={[6, 6, 0, 0]} isAnimationActive animationDuration={550} animationBegin={80} animationEasing="ease-out" />
              <Bar dataKey="unlocked" name="Unlocked" fill="#8B5CF6" radius={[6, 6, 0, 0]} isAnimationActive animationDuration={550} animationBegin={160} animationEasing="ease-out" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </MotionBox>
    </MotionBox>
  );
}

const TEAM_MEMBER_SEED = [
  { id: "tm-1", name: "Nora Hayes", email: "nora.hayes@talentflow.io", role: "Admin", lastLogin: "19 Dec 2025", invitedOn: "-", invitedByName: "-", invitedByEmail: "-" },
  { id: "tm-2", name: "Imran Sheikh", email: "imran.sheikh@talentflow.io", role: "Admin", lastLogin: "02 Apr 2026", invitedOn: "08 Oct 2024", invitedByName: "Nora Hayes", invitedByEmail: "nora.hayes@talentflow.io" },
  { id: "tm-3", name: "Maya Robinson", email: "maya.robinson@talentflow.io", role: "Admin", lastLogin: "No login yet", invitedOn: "03 Jan 2025", invitedByName: "Nora Hayes", invitedByEmail: "nora.hayes@talentflow.io" },
  { id: "tm-4", name: "Arjun Patel", email: "arjun.patel@talentflow.io", role: "Admin", lastLogin: "14 Jul 2025", invitedOn: "05 Feb 2025", invitedByName: "Imran Sheikh", invitedByEmail: "imran.sheikh@talentflow.io" },
  { id: "tm-5", name: "Leah Gomez", email: "leah.gomez@talentflow.io", role: "Admin", lastLogin: "No login yet", invitedOn: "28 Feb 2025", invitedByName: "Nora Hayes", invitedByEmail: "nora.hayes@talentflow.io" },
  { id: "tm-6", name: "Rohan Dutta", email: "rohan.dutta@talentflow.io", role: "Admin", lastLogin: "No login yet", invitedOn: "08 Mar 2025", invitedByName: "Nora Hayes", invitedByEmail: "nora.hayes@talentflow.io" },
  { id: "tm-7", name: "Elena Brooks", email: "elena.brooks@talentflow.io", role: "Recruiter", lastLogin: "09 Jul 2025", invitedOn: "26 Jun 2025", invitedByName: "Nora Hayes", invitedByEmail: "nora.hayes@talentflow.io" },
  { id: "tm-8", name: "Victor Lin", email: "victor.lin@talentflow.io", role: "Collaborator", lastLogin: "09 Jul 2025", invitedOn: "26 Jun 2025", invitedByName: "Nora Hayes", invitedByEmail: "nora.hayes@talentflow.io" },
  { id: "tm-9", name: "Camila Roy", email: "camila.roy@talentflow.io", role: "Recruiter", lastLogin: "01 Jul 2025", invitedOn: "01 Jul 2025", invitedByName: "Imran Sheikh", invitedByEmail: "imran.sheikh@talentflow.io" },
];

const ALLOWED_TEAM_ROLES = ["Recruiter", "Admin", "Interview Admin", "Collaborator"];
const INVITE_ROLE_OPTIONS = [
  {
    value: "Admin",
    label: "Admin",
    description: "Manages user permissions, credits and overall system operations",
    disabled: false,
  },
  {
    value: "Interview Admin",
    label: "Interview Admin",
    description: "Organizes and oversees interview scheduling and coordinations",
    disabled: false,
  },
  {
    value: "Collaborator",
    label: "Collaborator",
    description: "Assists with interviews, contributing to team efforts",
    disabled: false,
  },
];

function TeamTabContent({ autoOpenInvite = false, onAutoOpenInviteHandled }) {
  const [members, setMembers] = useState(TEAM_MEMBER_SEED);
  const [query, setQuery] = useState("");
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [actionAnchor, setActionAnchor] = useState(null);
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const [newMember, setNewMember] = useState({ name: "", email: "", role: "" });
  const [inviteErrors, setInviteErrors] = useState({ name: "", email: "", role: "" });

  const filteredMembers = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return members;
    return members.filter((m) => [m.name, m.email, m.role, m.invitedByName].some((v) => (v || "").toLowerCase().includes(q)));
  }, [members, query]);

  const openRowMenu = (event, memberId) => {
    setActionAnchor(event.currentTarget);
    setSelectedMemberId(memberId);
  };

  const closeRowMenu = () => {
    setActionAnchor(null);
    setSelectedMemberId(null);
  };

  const openInviteDialog = () => {
    // Defer opening to avoid click-away race with the originating click event.
    window.setTimeout(() => {
      setAddDialogOpen(true);
    }, 0);
  };

  const closeInviteDialog = () => {
    setAddDialogOpen(false);
    setNewMember({ name: "", email: "", role: "" });
    setInviteErrors({ name: "", email: "", role: "" });
  };

  useEffect(() => {
    if (!autoOpenInvite) return;
    openInviteDialog();
    if (typeof onAutoOpenInviteHandled === "function") {
      onAutoOpenInviteHandled();
    }
  }, [autoOpenInvite, onAutoOpenInviteHandled]);

  const validateInviteForm = () => {
    const name = newMember.name.trim();
    const email = newMember.email.trim();
    const role = newMember.role;
    const nextErrors = { name: "", email: "", role: "" };

    if (!name) nextErrors.name = "Full name is required.";
    if (!email) {
      nextErrors.email = "Work email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Enter a valid work email.";
    }
    if (!role) nextErrors.role = "Please select a role.";

    setInviteErrors(nextErrors);
    return !nextErrors.name && !nextErrors.email && !nextErrors.role;
  };

  const handleAddMember = () => {
    if (!validateInviteForm()) return;
    const name = newMember.name.trim();
    const email = newMember.email.trim();
    const now = new Date();
    const invitedOn = now.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
    setMembers((prev) => ([
      {
        id: `tm-${Date.now()}`,
        name,
        email,
        role: newMember.role,
        lastLogin: "No login yet",
        invitedOn,
        invitedByName: "Afram",
        invitedByEmail: "afram@zappyhire.com",
      },
      ...prev,
    ]));
    closeInviteDialog();
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" flexWrap="wrap" useFlexGap sx={{ gap: 1.25, mb: 2 }}>
        <Box>
          <Typography sx={{ fontSize: "1.2rem", fontWeight: 800, color: SHELL_INK, letterSpacing: "-0.02em" }}>
            Team
          </Typography>
          <Typography sx={{ fontSize: "0.8125rem", color: SHELL_MUTED, fontWeight: 500 }}>
            Create and manage team members
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddOutlinedIcon sx={{ fontSize: 16 }} />}
          onClick={openInviteDialog}
          sx={{
            textTransform: "none",
            fontWeight: 700,
            borderRadius: "10px",
            px: 1.75,
            py: 0.8,
            bgcolor: SHELL_PRIMARY,
            boxShadow: "none",
            "&:hover": { bgcolor: "#e66a33", boxShadow: "none" },
          }}
        >
          Add Member
        </Button>
      </Stack>

      <Box
        sx={{
          borderRadius: "16px",
          bgcolor: "#fff",
          border: "1px solid rgba(220,212,202,0.5)",
          boxShadow: "0 4px 18px rgba(23,18,14,0.04)",
          overflow: "hidden",
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 2, py: 1.25, borderBottom: "1px solid rgba(220,212,202,0.4)" }}>
          <Typography sx={{ fontSize: "0.9375rem", fontWeight: 700, color: SHELL_INK }}>
            List of members
          </Typography>
          <TextField
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, email"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchOutlinedIcon sx={{ fontSize: 17, color: SHELL_MUTED }} />
                </InputAdornment>
              ),
              sx: {
                bgcolor: "#fff",
                borderRadius: "10px",
                fontSize: "0.8125rem",
                "&.MuiInputBase-root": { height: "44px" },
                "& .MuiOutlinedInput-input": {
                  py: 0.9,
                  px: "4px",
                  fontSize: "14px",
                },
              },
            }}
            sx={{
              width: { xs: "100%", sm: 290 },
              "& .MuiInputBase-root": { height: "44px", minHeight: "44px" },
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(220,212,202,0.72)" },
            }}
          />
        </Stack>

        <Box sx={{ overflowX: "auto" }}>
          <Box sx={{ minWidth: 900 }}>
            <Stack direction="row" alignItems="center" sx={{ px: 2, py: 1.05, bgcolor: "rgba(248,246,243,0.45)", borderBottom: "1px solid rgba(220,212,202,0.45)" }}>
              <Box sx={{ flex: "1.8 1 0", minWidth: 210 }}><Typography sx={{ fontSize: "0.72rem", fontWeight: 700, color: "rgba(107,99,92,0.9)" }}>Member Name</Typography></Box>
              <Box sx={{ flex: "1 1 0", minWidth: 130 }}><Typography sx={{ fontSize: "0.72rem", fontWeight: 600, color: "rgba(107,99,92,0.9)" }}>Role</Typography></Box>
              <Box sx={{ flex: "1 1 0", minWidth: 120 }}><Typography sx={{ fontSize: "0.72rem", fontWeight: 700, color: "rgba(107,99,92,0.9)" }}>Last Login</Typography></Box>
              <Box sx={{ flex: "1 1 0", minWidth: 120 }}><Typography sx={{ fontSize: "0.72rem", fontWeight: 700, color: "rgba(107,99,92,0.9)" }}>Invited On</Typography></Box>
              <Box sx={{ flex: "1.5 1 0", minWidth: 180 }}><Typography sx={{ fontSize: "0.72rem", fontWeight: 700, color: "rgba(107,99,92,0.9)" }}>Invited by</Typography></Box>
              <Box sx={{ width: 34, flexShrink: 0 }} />
            </Stack>

            {filteredMembers.map((member) => (
              <Stack key={member.id} direction="row" alignItems="center" sx={{ px: 2, py: 1.2, borderBottom: "1px solid rgba(240,234,228,0.85)" }}>
                <Box sx={{ flex: "1.8 1 0", minWidth: 210, pr: 1 }}>
                  <Typography sx={{ fontSize: "0.875rem", fontWeight: 600, color: SHELL_INK, lineHeight: 1.35 }}>
                    {member.name}
                  </Typography>
                  <Typography sx={{ fontSize: "0.75rem", color: "rgba(107,99,92,0.88)", lineHeight: 1.3 }}>
                    {member.email}
                  </Typography>
                </Box>
                <Box sx={{ flex: "1 1 0", minWidth: 130 }}>
                  <Typography sx={{ fontSize: "0.875rem", fontWeight: 600, color: SHELL_INK }}>
                    {ALLOWED_TEAM_ROLES.includes(member.role) ? member.role : "Collaborator"}
                  </Typography>
                </Box>
                <Box sx={{ flex: "1 1 0", minWidth: 120 }}>
                  <Typography sx={{ fontSize: "0.875rem", fontWeight: 600, color: member.lastLogin === "No login yet" ? SHELL_MUTED : SHELL_INK, fontStyle: member.lastLogin === "No login yet" ? "italic" : "normal" }}>
                    {member.lastLogin}
                  </Typography>
                </Box>
                <Box sx={{ flex: "1 1 0", minWidth: 120 }}>
                  <Typography sx={{ fontSize: "0.875rem", fontWeight: 600, color: SHELL_INK }}>
                    {member.invitedOn}
                  </Typography>
                </Box>
                <Box sx={{ flex: "1.5 1 0", minWidth: 180, pr: 1 }}>
                  {member.invitedByName === "-" ? (
                    <Typography sx={{ fontSize: "0.875rem", fontWeight: 600, color: SHELL_MUTED }}>-</Typography>
                  ) : (
                    <>
                      <Typography sx={{ fontSize: "0.875rem", fontWeight: 600, color: SHELL_INK, lineHeight: 1.35 }}>
                        {member.invitedByName}
                      </Typography>
                      <Typography sx={{ fontSize: "0.75rem", color: "rgba(107,99,92,0.88)", lineHeight: 1.3 }}>
                        {member.invitedByEmail}
                      </Typography>
                    </>
                  )}
                </Box>
                <Box sx={{ width: 34, flexShrink: 0, display: "flex", justifyContent: "center" }}>
                  <IconButton
                    size="small"
                    aria-label={`Member actions for ${member.name}`}
                    onClick={(e) => openRowMenu(e, member.id)}
                    sx={{ color: SHELL_MUTED }}
                  >
                    <MoreVertOutlinedIcon sx={{ fontSize: 18 }} />
                  </IconButton>
                </Box>
              </Stack>
            ))}

            {filteredMembers.length === 0 && (
              <Box sx={{ px: 2, py: 4, textAlign: "center" }}>
                <Typography sx={{ fontSize: "0.875rem", fontWeight: 600, color: SHELL_MUTED }}>
                  No members found for this search.
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Box>

      <Menu
        anchorEl={actionAnchor}
        open={Boolean(actionAnchor)}
        onClose={closeRowMenu}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={closeRowMenu} sx={{ fontSize: "0.8125rem", fontWeight: 600 }}>Edit role</MenuItem>
        <MenuItem onClick={closeRowMenu} sx={{ fontSize: "0.8125rem", fontWeight: 600 }}>Resend invite</MenuItem>
        <MenuItem
          onClick={() => {
            setMembers((prev) => prev.filter((m) => m.id !== selectedMemberId));
            closeRowMenu();
          }}
          sx={{ fontSize: "0.8125rem", fontWeight: 600, color: "#b91c1c" }}
        >
          Remove member
        </MenuItem>
      </Menu>

      <AnimatePresence>
        {addDialogOpen && (
          <Box sx={{ position: "fixed", inset: 0, zIndex: 1400, display: "flex", alignItems: "center", justifyContent: "center", p: 1.5 }}>
            <MotionBox
              onClick={closeInviteDialog}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              sx={{ position: "absolute", inset: 0, bgcolor: "rgba(18,14,10,0.42)" }}
            />
            <MotionBox
            role="dialog"
            aria-modal="true"
            aria-label="Invite Members"
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.985 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            sx={{
              position: "relative",
              width: "min(640px, calc(100vw - 24px))",
              maxHeight: "calc(100vh - 32px)",
              overflow: "auto",
              bgcolor: "#fff",
              borderRadius: "14px",
              border: "1px solid rgba(220,212,202,0.5)",
              boxShadow: "0 20px 45px rgba(18,14,10,0.14)",
            }}
          >
            <Box sx={{ px: 2.25, pt: 1.8, pb: 1.2 }}>
              <Stack direction="row" alignItems="flex-start" justifyContent="space-between" spacing={1}>
                <Box>
                  <Typography sx={{ fontSize: "1rem", fontWeight: 700, color: SHELL_INK, lineHeight: 1.25 }}>
                    Add Member
                  </Typography>
                  <Typography sx={{ mt: 0.4, fontSize: "0.8125rem", color: "rgba(107,99,92,0.95)", fontWeight: 500 }}>
                    An invitation link will be sent to the specified email.
                  </Typography>
                </Box>
                <IconButton onClick={closeInviteDialog} aria-label="Close invite dialog" sx={{ color: SHELL_MUTED, mt: -0.25 }}>
                  <CloseOutlinedIcon sx={{ fontSize: 18 }} />
                </IconButton>
              </Stack>
            </Box>
            <Box sx={{ pt: "18px", pb: "18px", px: 2.25, borderTop: "1px solid rgba(233,227,220,0.8)", borderBottom: "1px solid rgba(233,227,220,0.8)" }}>
              <Stack
                spacing={1.55}
                sx={{
                  mt: 0.35,
                  pb: 1.4,
                  gap: "8px",
                  "& .MuiOutlinedInput-input": {
                    fontSize: "14px",
                  },
                }}
              >
            <TextField
              label="Full Name"
              required
              fullWidth
              size="small"
              value={newMember.name}
              onChange={(e) => {
                const value = e.target.value;
                setNewMember((prev) => ({ ...prev, name: value }));
                if (inviteErrors.name) setInviteErrors((prev) => ({ ...prev, name: "" }));
              }}
              error={Boolean(inviteErrors.name)}
              helperText={inviteErrors.name}
            />
            <TextField
              label="Work Email Address"
              required
              fullWidth
              size="small"
              type="email"
              value={newMember.email}
              onChange={(e) => {
                const value = e.target.value;
                setNewMember((prev) => ({ ...prev, email: value }));
                if (inviteErrors.email) setInviteErrors((prev) => ({ ...prev, email: "" }));
              }}
              error={Boolean(inviteErrors.email)}
              helperText={inviteErrors.email}
            />
            <TextField
              label="Role"
              required
              fullWidth
              size="small"
              select
              value={newMember.role}
              SelectProps={{
                MenuProps: {
                  disablePortal: false,
                  slotProps: {
                    root: {
                      sx: {
                        zIndex: 1600,
                      },
                    },
                  },
                  PaperProps: {
                    elevation: 0,
                    sx: {
                      zIndex: 1601,
                      mt: 0.55,
                      borderRadius: "12px",
                      border: "1px solid rgba(231,222,211,0.95)",
                      boxShadow: "0 14px 36px rgba(34,26,20,0.12)",
                      overflow: "hidden",
                    },
                  },
                  MenuListProps: {
                    sx: {
                      p: 0.65,
                    },
                  },
                },
              }}
              onChange={(e) => {
                const value = e.target.value;
                setNewMember((prev) => ({ ...prev, role: value }));
                if (inviteErrors.role) setInviteErrors((prev) => ({ ...prev, role: "" }));
              }}
              error={Boolean(inviteErrors.role)}
              helperText={inviteErrors.role}
            >
              {INVITE_ROLE_OPTIONS.map((role) => (
                <MenuItem
                  key={role.value}
                  value={role.value}
                  disabled={role.disabled}
                  sx={{
                    alignItems: "flex-start",
                    py: 1,
                    px: 1.2,
                    borderRadius: "10px",
                    mb: 0.45,
                    "&:last-of-type": { mb: 0 },
                    "&.Mui-selected": {
                      bgcolor: "rgba(242,238,233,0.85)",
                    },
                    "&.Mui-selected:hover": {
                      bgcolor: "rgba(236,231,224,0.95)",
                    },
                  }}
                >
                  <Box>
                    <Typography sx={{ fontSize: "0.875rem", fontWeight: 600, color: role.disabled ? "rgba(107,99,92,0.68)" : SHELL_INK, lineHeight: 1.25 }}>
                      {role.label}
                    </Typography>
                    <Typography sx={{ mt: 0.2, fontSize: "0.8125rem", color: role.disabled ? "rgba(107,99,92,0.62)" : "rgba(70,63,57,0.9)", lineHeight: 1.28, whiteSpace: "normal" }}>
                      {role.description}
                    </Typography>
                  </Box>
                </MenuItem>
              ))}
            </TextField>
          </Stack>
            </Box>
            <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={1} sx={{ px: 2.25, py: 1.55 }}>
              <Button
                onClick={closeInviteDialog}
                sx={{ textTransform: "none", fontWeight: 700, color: SHELL_MUTED, border: "1px solid rgba(220,212,202,0.82)", borderRadius: "8px", px: 2.6, py: 0.7 }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleAddMember}
                sx={{ textTransform: "none", fontWeight: 700, bgcolor: SHELL_PRIMARY, borderRadius: "8px", px: 2.6, py: 0.7, boxShadow: "none", "&:hover": { bgcolor: "#e66a33", boxShadow: "none" } }}
              >
                Add Member
              </Button>
            </Stack>
            </MotionBox>
          </Box>
        )}
      </AnimatePresence>
    </Box>
  );
}

/* ───── Empty-state home (fresh sign-up, no jobs yet) ───── */

const emptyOrbFloat = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
  },
};

const emptyOrbBreath = {
  animate: {
    scale: [1, 1.08, 1],
    opacity: [0.55, 0.8, 0.55],
    transition: { duration: 5, ease: "easeInOut", repeat: Infinity },
  },
};

const emptyFadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.22 + i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

const emptyScaleIn = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: 0.3 + i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
};

const EMPTY_ACTIONS = [
  {
    icon: AddOutlinedIcon,
    title: "Create your first job",
    desc: "Describe the role and let AI find the best-fit candidates for you.",
    accent: SHELL_PRIMARY,
    accentBg: "linear-gradient(135deg, rgba(248,114,58,0.18) 0%, rgba(248,114,58,0.06) 100%)",
    glowColor: "rgba(248, 114, 58, 0.12)",
    action: "create",
    primary: true,
  },
  {
    icon: GroupsOutlinedIcon,
    title: "Invite your team",
    desc: "Collaborate with your hiring team to review and shortlist candidates together.",
    accent: "#3B82F6",
    accentBg: "linear-gradient(135deg, rgba(59,130,246,0.15) 0%, rgba(59,130,246,0.04) 100%)",
    glowColor: "rgba(59, 130, 246, 0.1)",
    action: "team",
    primary: false,
  },
  {
    icon: SettingsOutlinedIcon,
    title: "Set up your company profile",
    desc: "Add your brand, industry, and preferences so job posts look polished.",
    accent: "#8B5CF6",
    accentBg: "linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(139,92,246,0.04) 100%)",
    glowColor: "rgba(139, 92, 246, 0.1)",
    action: "settings",
    primary: false,
  },
];

const CHECKLIST = [
  { label: "Create a job posting", num: "01" },
  { label: "Review AI-matched candidates", num: "02" },
  { label: "Invite a team member", num: "03" },
  { label: "Set up your company brand", num: "04" },
];

function EmptyHomeContent({ onCreateJob, onOpenTeamInvite, onOpenSettings }) {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  const runAction = (action) => {
    if (action === "create" && onCreateJob) onCreateJob();
    if (action === "team" && onOpenTeamInvite) onOpenTeamInvite();
    if (action === "settings" && onOpenSettings) onOpenSettings();
  };

  return (
    <MotionBox
      initial="hidden"
      animate="visible"
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } } }}
      sx={{ position: "relative", maxWidth: 820, mx: "auto", pt: { xs: 0.5, md: 1 } }}
    >
      {/* Layered animated background orbs */}
      <MotionBox
        variants={emptyOrbFloat}
        animate={emptyOrbBreath.animate}
        sx={{
          position: "absolute",
          top: "-4%",
          right: "-8%",
          width: 380,
          height: 380,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(248,114,58,0.1) 0%, rgba(248,114,58,0.02) 50%, transparent 72%)",
          filter: "blur(40px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <MotionBox
        variants={emptyOrbFloat}
        animate={{
          ...emptyOrbBreath.animate,
          transition: { ...emptyOrbBreath.animate.transition, delay: 1.5 },
        }}
        sx={{
          position: "absolute",
          top: "35%",
          left: "-12%",
          width: 280,
          height: 280,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 65%)",
          filter: "blur(35px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <MotionBox
        variants={emptyOrbFloat}
        animate={{
          ...emptyOrbBreath.animate,
          scale: [1, 1.12, 1],
          transition: { ...emptyOrbBreath.animate.transition, duration: 6, delay: 0.8 },
        }}
        sx={{
          position: "absolute",
          bottom: "8%",
          right: "4%",
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 65%)",
          filter: "blur(30px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Hero greeting card */}
      <MotionBox custom={0} variants={emptyFadeUp} sx={{ position: "relative", zIndex: 1, mb: 3.5 }}>
        <Box
          sx={{
            borderRadius: "26px",
            p: { xs: 3, sm: 3.5, md: 4 },
            background: [
              "linear-gradient(158deg, #FFFEFB 0%, #FEF9F4 32%, #FCF3EC 60%, #FDF6F0 100%)",
              "linear-gradient(118deg, rgba(248,114,58,0.07) 0%, transparent 42%, rgba(59,130,246,0.04) 78%, transparent 100%)",
            ].join(", "),
            border: "1px solid rgba(238,230,218,0.55)",
            boxShadow: [
              "0 1px 0 rgba(255,255,255,0.98) inset",
              "0 -1px 0 rgba(255,255,255,0.4) inset",
              "0 2px 6px rgba(23,18,14,0.03)",
              "0 16px 44px rgba(23,18,14,0.06)",
            ].join(", "),
            position: "relative",
            overflow: "hidden",
            isolation: "isolate",
            "&::before": {
              content: '""',
              position: "absolute",
              top: -60,
              right: -40,
              width: 260,
              height: 260,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(248,114,58,0.1) 0%, transparent 60%)",
              pointerEvents: "none",
              zIndex: 0,
            },
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: -30,
              left: "20%",
              width: 180,
              height: 180,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 65%)",
              pointerEvents: "none",
              zIndex: 0,
            },
          }}
        >
          <Stack direction={{ xs: "column", md: "row" }} alignItems={{ md: "center" }} justifyContent="space-between" spacing={3}>
            <Box sx={{ position: "relative", zIndex: 1, flex: 1, minWidth: 0 }}>
              <Typography
                component="h1"
                sx={{
                  fontFamily: '"DM Serif Display", Georgia, "Times New Roman", serif',
                  fontSize: { xs: "28px", sm: "32px", md: "36px" },
                  fontWeight: 400,
                  letterSpacing: "-0.03em",
                  color: SHELL_INK,
                  lineHeight: 1.12,
                  mb: 1.5,
                }}
              >
                {greeting}, Alex
              </Typography>
              <Typography
                sx={{
                  color: SHELL_MUTED,
                  fontSize: { xs: "0.9rem", sm: "0.95rem" },
                  lineHeight: 1.7,
                  maxWidth: 460,
                }}
              >
                Welcome to ZappyFind. Your hiring command center is ready.
                Create your first job post and let AI do the heavy lifting.
              </Typography>
              <Button
                variant="contained"
                disableElevation
                startIcon={<AddOutlinedIcon />}
                onClick={onCreateJob}
                sx={{
                  mt: 3,
                  py: 1.35,
                  px: 3,
                  borderRadius: "14px",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  textTransform: "none",
                  bgcolor: SHELL_PRIMARY,
                  color: "#fff",
                  boxShadow: "0 8px 24px rgba(248,114,58,0.3)",
                  "&:hover": { bgcolor: "#E5622E", boxShadow: "0 12px 32px rgba(248,114,58,0.38)" },
                  transition: "background-color 0.2s ease, box-shadow 0.25s ease",
                }}
              >
                Create your first job
              </Button>
            </Box>

            {/* Decorative people-network illustration */}
            <Box sx={{ display: { xs: "none", md: "block" }, flexShrink: 0, position: "relative", zIndex: 1, width: 220, height: 160 }}>
              <svg width="220" height="160" viewBox="0 0 220 160" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
                <defs>
                  <linearGradient id="eNodeOrange" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor={SHELL_PRIMARY} stopOpacity="0.28" />
                    <stop offset="100%" stopColor={SHELL_PRIMARY} stopOpacity="0.08" />
                  </linearGradient>
                  <linearGradient id="eNodeBlue" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.24" />
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.06" />
                  </linearGradient>
                  <linearGradient id="eNodeGreen" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#0F9A7A" stopOpacity="0.24" />
                    <stop offset="100%" stopColor="#0F9A7A" stopOpacity="0.06" />
                  </linearGradient>
                  <radialGradient id="eCenterGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor={SHELL_PRIMARY} stopOpacity="0.14" />
                    <stop offset="100%" stopColor={SHELL_PRIMARY} stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Center glow */}
                <circle cx="110" cy="80" r="60" fill="url(#eCenterGlow)">
                  <animate attributeName="r" values="55;65;55" dur="4s" repeatCount="indefinite" />
                </circle>

                {/* Connection lines (draw in) */}
                <line x1="110" y1="80" x2="46" y2="40" stroke={SHELL_PRIMARY} strokeOpacity="0.18" strokeWidth="1.5" strokeDasharray="100" strokeDashoffset="100">
                  <animate attributeName="stroke-dashoffset" values="100;0" dur="0.7s" fill="freeze" begin="0.5s" />
                </line>
                <line x1="110" y1="80" x2="174" y2="36" stroke="#3B82F6" strokeOpacity="0.16" strokeWidth="1.5" strokeDasharray="100" strokeDashoffset="100">
                  <animate attributeName="stroke-dashoffset" values="100;0" dur="0.7s" fill="freeze" begin="0.65s" />
                </line>
                <line x1="110" y1="80" x2="40" y2="118" stroke="#0F9A7A" strokeOpacity="0.16" strokeWidth="1.5" strokeDasharray="100" strokeDashoffset="100">
                  <animate attributeName="stroke-dashoffset" values="100;0" dur="0.7s" fill="freeze" begin="0.8s" />
                </line>
                <line x1="110" y1="80" x2="178" y2="124" stroke="#8B5CF6" strokeOpacity="0.16" strokeWidth="1.5" strokeDasharray="100" strokeDashoffset="100">
                  <animate attributeName="stroke-dashoffset" values="100;0" dur="0.7s" fill="freeze" begin="0.95s" />
                </line>

                {/* Center node (you) */}
                <circle cx="110" cy="80" r="22" fill="url(#eNodeOrange)" stroke={SHELL_PRIMARY} strokeOpacity="0.3" strokeWidth="1.5">
                  <animate attributeName="r" values="0;22" dur="0.5s" fill="freeze" begin="0.3s" calcMode="spline" keySplines="0.22 1 0.36 1" />
                </circle>
                <text x="110" y="76" textAnchor="middle" fill={SHELL_PRIMARY} fontWeight="700" fontSize="9" opacity="0">
                  YOU
                  <animate attributeName="opacity" values="0;0.7" dur="0.3s" fill="freeze" begin="0.7s" />
                </text>
                <text x="110" y="88" textAnchor="middle" fill={SHELL_PRIMARY} fontWeight="600" fontSize="7" opacity="0" letterSpacing="0.5">
                  HIRE
                  <animate attributeName="opacity" values="0;0.45" dur="0.3s" fill="freeze" begin="0.8s" />
                </text>

                {/* Candidate node: top-left */}
                <circle cx="46" cy="40" r="16" fill="url(#eNodeOrange)" opacity="0">
                  <animate attributeName="opacity" values="0;1" dur="0.4s" fill="freeze" begin="0.9s" />
                  <animate attributeName="r" values="8;16" dur="0.4s" fill="freeze" begin="0.9s" calcMode="spline" keySplines="0.22 1 0.36 1" />
                </circle>
                <circle cx="46" cy="36" r="5" fill={SHELL_PRIMARY} fillOpacity="0">
                  <animate attributeName="fill-opacity" values="0;0.25" dur="0.3s" fill="freeze" begin="1.1s" />
                </circle>
                <rect x="38" y="44" width="16" height="2" rx="1" fill={SHELL_PRIMARY} fillOpacity="0">
                  <animate attributeName="fill-opacity" values="0;0.2" dur="0.3s" fill="freeze" begin="1.15s" />
                </rect>
                {/* Match badge */}
                <rect x="56" y="28" width="22" height="12" rx="6" fill={SHELL_PRIMARY} fillOpacity="0">
                  <animate attributeName="fill-opacity" values="0;0.9" dur="0.25s" fill="freeze" begin="1.5s" />
                </rect>
                <text x="67" y="36.5" textAnchor="middle" fill="#fff" fontSize="7" fontWeight="700" opacity="0">
                  95%
                  <animate attributeName="opacity" values="0;1" dur="0.2s" fill="freeze" begin="1.55s" />
                </text>

                {/* Candidate node: top-right */}
                <circle cx="174" cy="36" r="16" fill="url(#eNodeBlue)" opacity="0">
                  <animate attributeName="opacity" values="0;1" dur="0.4s" fill="freeze" begin="1.05s" />
                  <animate attributeName="r" values="8;16" dur="0.4s" fill="freeze" begin="1.05s" calcMode="spline" keySplines="0.22 1 0.36 1" />
                </circle>
                <circle cx="174" cy="32" r="5" fill="#3B82F6" fillOpacity="0">
                  <animate attributeName="fill-opacity" values="0;0.25" dur="0.3s" fill="freeze" begin="1.25s" />
                </circle>
                <rect x="166" y="40" width="16" height="2" rx="1" fill="#3B82F6" fillOpacity="0">
                  <animate attributeName="fill-opacity" values="0;0.2" dur="0.3s" fill="freeze" begin="1.3s" />
                </rect>

                {/* Candidate node: bottom-left */}
                <circle cx="40" cy="118" r="14" fill="url(#eNodeGreen)" opacity="0">
                  <animate attributeName="opacity" values="0;1" dur="0.4s" fill="freeze" begin="1.2s" />
                  <animate attributeName="r" values="7;14" dur="0.4s" fill="freeze" begin="1.2s" calcMode="spline" keySplines="0.22 1 0.36 1" />
                </circle>
                <circle cx="40" cy="114" r="4.5" fill="#0F9A7A" fillOpacity="0">
                  <animate attributeName="fill-opacity" values="0;0.25" dur="0.3s" fill="freeze" begin="1.4s" />
                </circle>
                <rect x="33" y="122" width="14" height="2" rx="1" fill="#0F9A7A" fillOpacity="0">
                  <animate attributeName="fill-opacity" values="0;0.2" dur="0.3s" fill="freeze" begin="1.45s" />
                </rect>

                {/* Candidate node: bottom-right */}
                <circle cx="178" cy="124" r="14" fill="url(#eNodeBlue)" opacity="0">
                  <animate attributeName="opacity" values="0;1" dur="0.4s" fill="freeze" begin="1.35s" />
                  <animate attributeName="r" values="7;14" dur="0.4s" fill="freeze" begin="1.35s" calcMode="spline" keySplines="0.22 1 0.36 1" />
                </circle>
                <circle cx="178" cy="120" r="4.5" fill="#8B5CF6" fillOpacity="0">
                  <animate attributeName="fill-opacity" values="0;0.25" dur="0.3s" fill="freeze" begin="1.55s" />
                </circle>
                <rect x="171" y="128" width="14" height="2" rx="1" fill="#8B5CF6" fillOpacity="0">
                  <animate attributeName="fill-opacity" values="0;0.2" dur="0.3s" fill="freeze" begin="1.6s" />
                </rect>

                {/* Floating sparkle dots */}
                <circle cx="80" cy="26" r="2" fill={SHELL_PRIMARY} fillOpacity="0">
                  <animate attributeName="fill-opacity" values="0;0.35;0.15;0.35" dur="3s" repeatCount="indefinite" begin="1.8s" />
                </circle>
                <circle cx="154" cy="82" r="1.5" fill="#3B82F6" fillOpacity="0">
                  <animate attributeName="fill-opacity" values="0;0.3;0.1;0.3" dur="3.5s" repeatCount="indefinite" begin="2s" />
                </circle>
                <circle cx="84" cy="130" r="1.5" fill="#0F9A7A" fillOpacity="0">
                  <animate attributeName="fill-opacity" values="0;0.3;0.1;0.3" dur="4s" repeatCount="indefinite" begin="2.2s" />
                </circle>
              </svg>
            </Box>
          </Stack>
        </Box>
      </MotionBox>

      {/* Action cards row */}
      <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ position: "relative", zIndex: 1, mb: 3.5 }}>
        {EMPTY_ACTIONS.map((item, i) => {
          const Icon = item.icon;
          return (
            <MotionBox
              key={item.action}
              custom={i + 1}
              variants={emptyScaleIn}
              whileHover={{ y: -4, scale: 1.015, transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] } }}
              whileTap={{ scale: 0.98 }}
              onClick={() => runAction(item.action)}
              sx={{
                flex: 1,
                minWidth: 0,
                display: "flex",
                flexDirection: "column",
                gap: 1.5,
                p: { xs: 2, sm: 2.5 },
                borderRadius: "20px",
                bgcolor: "#fff",
                border: "1px solid rgba(220, 212, 202, 0.5)",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
                isolation: "isolate",
                boxShadow: "0 2px 8px rgba(23,18,14,0.03)",
                transition: "border-color 0.25s ease, box-shadow 0.3s ease",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 3,
                  background: `linear-gradient(90deg, ${item.accent}00, ${item.accent}, ${item.accent}00)`,
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                },
                "&:hover": {
                  borderColor: `${item.accent}44`,
                  boxShadow: `0 12px 32px ${item.glowColor}, 0 2px 8px rgba(23,18,14,0.04)`,
                  "&::before": { opacity: 1 },
                },
              }}
            >
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: "14px",
                  background: item.accentBg,
                  color: item.accent,
                  display: "grid",
                  placeItems: "center",
                  flexShrink: 0,
                }}
              >
                <Icon sx={{ fontSize: 24 }} />
              </Box>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    color: SHELL_INK,
                    mb: 0.5,
                    lineHeight: 1.3,
                  }}
                >
                  {item.title}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "0.8125rem",
                    color: SHELL_MUTED,
                    lineHeight: 1.55,
                  }}
                >
                  {item.desc}
                </Typography>
              </Box>
              <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mt: "auto", pt: 0.5 }}>
                <Typography sx={{ fontSize: "0.75rem", fontWeight: 700, color: SHELL_PRIMARY }}>
                  Get started
                </Typography>
                <ArrowForwardRoundedIcon sx={{ fontSize: 14, color: SHELL_PRIMARY }} />
              </Stack>
            </MotionBox>
          );
        })}
      </Stack>

      {/* Bottom row: checklist + tip side by side */}
      <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ position: "relative", zIndex: 1 }}>
        {/* Quick-start checklist */}
        <MotionBox custom={4} variants={emptyFadeUp} sx={{ flex: 1.2, minWidth: 0 }}>
          <Box
            sx={{
              borderRadius: "22px",
              p: { xs: 2.5, sm: 3 },
              height: "100%",
              bgcolor: "#fff",
              border: "1px solid rgba(220, 212, 202, 0.45)",
              boxShadow: "0 2px 8px rgba(23,18,14,0.03)",
            }}
          >
            <Typography
              sx={{
                fontSize: "0.68rem",
                fontWeight: 800,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(23,18,14,0.38)",
                mb: 2.25,
              }}
            >
              Quick-start checklist
            </Typography>
            <Stack spacing={2}>
              {CHECKLIST.map((step, idx) => (
                <MotionBox
                  key={step.label}
                  custom={idx + 5}
                  variants={emptyFadeUp}
                >
                  <Stack direction="row" spacing={1.75} alignItems="center">
                    <Box
                      sx={{
                        width: 30,
                        height: 30,
                        borderRadius: "10px",
                        border: "1.5px solid rgba(220, 212, 202, 0.7)",
                        display: "grid",
                        placeItems: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Typography sx={{ fontSize: "0.65rem", fontWeight: 800, color: "rgba(23,18,14,0.3)", letterSpacing: "0.04em" }}>
                        {step.num}
                      </Typography>
                    </Box>
                    <Typography
                      sx={{
                        fontSize: "0.875rem",
                        fontWeight: 500,
                        color: SHELL_INK,
                        lineHeight: 1.4,
                      }}
                    >
                      {step.label}
                    </Typography>
                  </Stack>
                </MotionBox>
              ))}
            </Stack>
          </Box>
        </MotionBox>

        {/* AI tip + ambient info */}
        <MotionBox custom={5} variants={emptyFadeUp} sx={{ flex: 0.8, minWidth: 0 }}>
          <Stack spacing={2} sx={{ height: "100%" }}>
            <Box
              sx={{
                borderRadius: "22px",
                p: { xs: 2.5, sm: 3 },
                flex: 1,
                background: "linear-gradient(155deg, rgba(248,114,58,0.08) 0%, rgba(248,114,58,0.02) 100%)",
                border: "1px solid rgba(248, 114, 58, 0.16)",
                display: "flex",
                flexDirection: "column",
                gap: 1.5,
              }}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "12px",
                  bgcolor: "rgba(248, 114, 58, 0.14)",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <AutoAwesomeOutlinedIcon sx={{ fontSize: 22, color: SHELL_PRIMARY }} />
              </Box>
              <Typography sx={{ fontSize: "0.8125rem", fontWeight: 700, color: SHELL_INK, lineHeight: 1.4 }}>
                AI-powered matching
              </Typography>
              <Typography sx={{ fontSize: "0.8125rem", color: SHELL_MUTED, lineHeight: 1.6 }}>
                Once you publish a role, our AI scans thousands of profiles and surfaces the top candidates within minutes.
              </Typography>
            </Box>

            <Box
              sx={{
                borderRadius: "22px",
                p: { xs: 2.5, sm: 3 },
                background: "linear-gradient(155deg, rgba(59,130,246,0.07) 0%, rgba(59,130,246,0.015) 100%)",
                border: "1px solid rgba(59, 130, 246, 0.14)",
                display: "flex",
                flexDirection: "column",
                gap: 1.5,
              }}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "12px",
                  bgcolor: "rgba(59, 130, 246, 0.12)",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <RocketLaunchOutlinedIcon sx={{ fontSize: 22, color: "#3B82F6" }} />
              </Box>
              <Typography sx={{ fontSize: "0.8125rem", fontWeight: 700, color: SHELL_INK, lineHeight: 1.4 }}>
                Built for speed
              </Typography>
              <Typography sx={{ fontSize: "0.8125rem", color: SHELL_MUTED, lineHeight: 1.6 }}>
                Most teams go from first job post to shortlisted candidates in under 10 minutes.
              </Typography>
            </Box>
          </Stack>
        </MotionBox>
      </Stack>
    </MotionBox>
  );
}

export default function RecruiterDashboardDummy({ onExit, onCreateJob }) {
  const [activeNav, setActiveNav] = useState("home");
  const [selectedJob, setSelectedJob] = useState(null);
  const [teamInviteAutoOpen, setTeamInviteAutoOpen] = useState(false);
  const [showEmptyHome, setShowEmptyHome] = useState(true);

  const handleNav = (id) => {
    setActiveNav(id);
    if (id !== "jobs") {
      setSelectedJob(null);
    }
  };

  const handleCreateJob = () => {
    if (typeof onCreateJob === "function") {
      onCreateJob();
    }
  };

  const handleLogoClick = () => {
    setActiveNav("home");
    setSelectedJob(null);
    setShowEmptyHome((prev) => !prev);
  };

  const jobDetailOpen = activeNav === "jobs" && Boolean(selectedJob);

  return (
    <RecruiterAppShell activeNav={activeNav} onNav={handleNav} onSignOut={onExit} onLogoClick={handleLogoClick} mainScrollPt={jobDetailOpen ? 0 : 3.5}>
      {activeNav === "jobs" ? (
        <JobsTabContent
          onCreateJob={handleCreateJob}
          selectedJob={selectedJob}
          onSelectedJobChange={setSelectedJob}
        />
      ) : activeNav === "team" ? (
        <TeamTabContent autoOpenInvite={teamInviteAutoOpen} onAutoOpenInviteHandled={() => setTeamInviteAutoOpen(false)} />
      ) : activeNav === "settings" ? (
        <RecruiterSettingsPanel />
      ) : showEmptyHome ? (
        <EmptyHomeContent
          onCreateJob={handleCreateJob}
          onOpenTeamInvite={() => {
            setActiveNav("team");
            setTeamInviteAutoOpen(true);
          }}
          onOpenSettings={() => setActiveNav("settings")}
        />
      ) : (
        <HomeTabContent
          onCreateJob={handleCreateJob}
          onOpenJobs={() => setActiveNav("jobs")}
          onOpenTeamInvite={() => {
            setActiveNav("team");
            setTeamInviteAutoOpen(true);
          }}
        />
      )}
    </RecruiterAppShell>
  );
}
