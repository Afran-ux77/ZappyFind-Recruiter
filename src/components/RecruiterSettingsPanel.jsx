import { useCallback, useMemo, useRef, useState } from "react";
import {
  Box,
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CorporateFareOutlinedIcon from "@mui/icons-material/CorporateFareOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";
import RocketLaunchOutlinedIcon from "@mui/icons-material/RocketLaunchOutlined";
import { keyframes } from "@mui/system";
import { SHELL_INK, SHELL_MUTED, SHELL_PRIMARY } from "./RecruiterAppShell";

/** Slow rotation behind the featured plan frame for a moving metallic border. */
const pricingLuxuryBorderSpin = keyframes`
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
`;

const BORDER = "rgba(220, 212, 202, 0.45)";
const PAGE_BG = "#FAF8F4";
/** Flat panels on PAGE_BG: separation from spacing and contrast, not shadow stacks. */
const sectionSurface = {
  borderRadius: "22px",
  p: { xs: 2.5, sm: 3, md: 3.25 },
  bgcolor: "#fff",
  mb: 3,
};

const SELECT_MENU = {
  disableScrollLock: true,
  PaperProps: { sx: { maxHeight: 320 } },
};

const INDUSTRIES = [
  "Software & IT",
  "Internet & Digital Media",
  "Financial Services",
  "Insurance",
  "Healthcare & Life Sciences",
  "Retail & Consumer Goods",
  "E-commerce & Marketplaces",
  "Manufacturing & Industrial",
  "Education & Training",
  "Professional Services & Consulting",
  "Other",
];

const COMPANY_SIZES = ["1-10", "11-50", "51-200", "201-500", "500+"];

const ORG_TYPES = [
  { id: "startup", label: "Startup", hint: "Early stage", Icon: RocketLaunchOutlinedIcon },
  { id: "sme", label: "SME", hint: "Small and medium", Icon: Groups2OutlinedIcon },
  { id: "enterprise", label: "Enterprise", hint: "Large organization", Icon: CorporateFareOutlinedIcon },
];

const PLANS = [
  {
    id: "basic",
    name: "Basic",
    description: "For small teams getting started with AI-powered hiring.",
    price: "$12",
    period: "mo",
    featuresLabel: "What is included:",
    features: [
      "Up to 5 active job posts",
      "AI candidate matching",
      "Basic analytics dashboard",
      "Email support",
      "Single workspace",
    ],
    emphasized: false,
  },
  {
    id: "business",
    name: "Business",
    badge: "Most popular",
    description: "For growing teams that need deeper insights and more capacity.",
    price: "$48",
    period: "mo",
    featuresLabel: "Everything in Basic, plus:",
    features: [
      "Unlimited job posts",
      "Advanced AI evaluations",
      "Custom screening criteria",
      "Priority support",
      "Up to 10 workspaces",
    ],
    emphasized: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For organizations that need security, scale, and control.",
    price: "$96",
    period: "mo",
    featuresLabel: "Everything in Business, plus:",
    features: [
      "Dedicated account manager",
      "SSO and advanced security",
      "Custom integrations",
      "Unlimited workspaces",
      "SLA and compliance tools",
    ],
    emphasized: false,
  },
];

const fieldSx = {
  "& .MuiOutlinedInput-root": { borderRadius: "12px" },
};

function NavItem({ icon: Icon, label, active, onClick }) {
  return (
    <Button
      fullWidth
      onClick={onClick}
      startIcon={<Icon sx={{ fontSize: 20 }} />}
      sx={{
        justifyContent: "flex-start",
        textTransform: "none",
        fontWeight: active ? 700 : 600,
        fontSize: "0.875rem",
        py: 1.35,
        px: 1.5,
        borderRadius: "12px",
        color: active ? SHELL_INK : SHELL_MUTED,
        bgcolor: active ? "rgba(23, 18, 14, 0.055)" : "transparent",
        boxShadow: "none",
        "&:hover": {
          bgcolor: active ? "rgba(23, 18, 14, 0.085)" : "rgba(0, 0, 0, 0.04)",
        },
      }}
    >
      {label}
    </Button>
  );
}

function SectionIntro({ kicker, title, subtitle }) {
  return (
    <Box sx={{ mb: 2.75 }}>
      {kicker ? (
        <Typography
          sx={{
            fontSize: "0.62rem",
            fontWeight: 800,
            letterSpacing: "0.14em",
            color: "rgba(107,99,92,0.75)",
            textTransform: "uppercase",
            mb: 1,
          }}
        >
          {kicker}
        </Typography>
      ) : null}
      <Typography
        component="h2"
        sx={{
          fontSize: { xs: "1.125rem", md: "1.2rem" },
          fontWeight: 800,
          color: SHELL_INK,
          letterSpacing: "-0.02em",
          lineHeight: 1.25,
          mb: subtitle ? "6px" : 0,
        }}
      >
        {title}
      </Typography>
      {subtitle ? (
        <Typography sx={{ fontSize: "0.9rem", color: SHELL_MUTED, lineHeight: 1.55, maxWidth: 640 }}>{subtitle}</Typography>
      ) : null}
    </Box>
  );
}

const COMPANY_PROFILE_FORM_INITIAL = {
  companyName: "ZEmpire",
  companyWebsite: "www.z.com",
  industry: "Software & IT",
  companySize: "201-500",
  orgType: "sme",
  city: "Bengaluru",
  stateRegion: "Karnataka",
  description:
    "We build hiring tools that help teams find great people faster. Job posts can show this story to candidates.",
  billingAddress: "42 Brigade Road, Bengaluru 560001",
  billingEmail: "billing@zempire.example",
  billingPhone: "+91 98765 43210",
  gstNumber: "29ABCDE1234F1Z5",
};

function CompanyProfileForm() {
  const fileInputRef = useRef(null);
  const savedBaseline = useRef({ ...COMPANY_PROFILE_FORM_INITIAL, logoPreview: null });
  const [companyName, setCompanyName] = useState(COMPANY_PROFILE_FORM_INITIAL.companyName);
  const [companyWebsite, setCompanyWebsite] = useState(COMPANY_PROFILE_FORM_INITIAL.companyWebsite);
  const [industry, setIndustry] = useState(COMPANY_PROFILE_FORM_INITIAL.industry);
  const [companySize, setCompanySize] = useState(COMPANY_PROFILE_FORM_INITIAL.companySize);
  const [orgType, setOrgType] = useState(COMPANY_PROFILE_FORM_INITIAL.orgType);
  const [city, setCity] = useState(COMPANY_PROFILE_FORM_INITIAL.city);
  const [stateRegion, setStateRegion] = useState(COMPANY_PROFILE_FORM_INITIAL.stateRegion);
  const [description, setDescription] = useState(COMPANY_PROFILE_FORM_INITIAL.description);
  const [logoPreview, setLogoPreview] = useState(null);
  const [billingAddress, setBillingAddress] = useState(COMPANY_PROFILE_FORM_INITIAL.billingAddress);
  const [billingEmail, setBillingEmail] = useState(COMPANY_PROFILE_FORM_INITIAL.billingEmail);
  const [billingPhone, setBillingPhone] = useState(COMPANY_PROFILE_FORM_INITIAL.billingPhone);
  const [gstNumber, setGstNumber] = useState(COMPANY_PROFILE_FORM_INITIAL.gstNumber);
  const [saveHint, setSaveHint] = useState("");

  const isDirty = useMemo(() => {
    const b = savedBaseline.current;
    return (
      companyName !== b.companyName ||
      companyWebsite !== b.companyWebsite ||
      industry !== b.industry ||
      companySize !== b.companySize ||
      orgType !== b.orgType ||
      city !== b.city ||
      stateRegion !== b.stateRegion ||
      description !== b.description ||
      billingAddress !== b.billingAddress ||
      billingEmail !== b.billingEmail ||
      billingPhone !== b.billingPhone ||
      gstNumber !== b.gstNumber ||
      (logoPreview ?? null) !== (b.logoPreview ?? null)
    );
  }, [
    companyName,
    companyWebsite,
    industry,
    companySize,
    orgType,
    city,
    stateRegion,
    description,
    billingAddress,
    billingEmail,
    billingPhone,
    gstNumber,
    logoPreview,
    saveHint,
  ]);

  const onLogoChange = useCallback((e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setLogoPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(f);
    });
  }, []);

  const handleSave = () => {
    if (!isDirty) return;
    savedBaseline.current = {
      companyName,
      companyWebsite,
      industry,
      companySize,
      orgType,
      city,
      stateRegion,
      description,
      billingAddress,
      billingEmail,
      billingPhone,
      gstNumber,
      logoPreview,
    };
    setSaveHint("Changes saved.");
    window.setTimeout(() => setSaveHint(""), 3200);
  };

  return (
    <Stack spacing={0}>
      <SectionIntro
        title="Company profile"
        subtitle="Company details, branding for job posts, and billing information. Edit anytime."
      />

      <Box sx={sectionSurface}>
        <Typography sx={{ fontSize: "0.62rem", fontWeight: 800, letterSpacing: "0.12em", color: SHELL_MUTED, textTransform: "uppercase", mb: 1.5 }}>
          Company details
        </Typography>
        <Stack spacing={3}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
            <TextField fullWidth label="Company name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} sx={{ ...fieldSx, flex: 1 }} />
            <TextField
              fullWidth
              label="Company website"
              value={companyWebsite}
              onChange={(e) => setCompanyWebsite(e.target.value)}
              placeholder="https://"
              sx={{ ...fieldSx, flex: 1 }}
            />
          </Stack>
          <FormControl fullWidth sx={fieldSx}>
            <InputLabel id="settings-industry">Industry / sector</InputLabel>
            <Select labelId="settings-industry" label="Industry / sector" value={industry} onChange={(e) => setIndustry(e.target.value)} MenuProps={SELECT_MENU}>
              {INDUSTRIES.map((opt) => (
                <MenuItem key={opt} value={opt}>
                  {opt}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box>
            <Typography sx={{ fontSize: "0.75rem", fontWeight: 700, color: SHELL_MUTED, mb: 1.25, letterSpacing: "0.04em" }}>Company size</Typography>
            <Stack direction="row" flexWrap="wrap" gap={1}>
              {COMPANY_SIZES.map((s) => {
                const selected = companySize === s;
                return (
                  <Chip
                    key={s}
                    label={s}
                    onClick={() => setCompanySize(s)}
                    variant="outlined"
                    clickable
                    sx={{
                      fontWeight: selected ? 800 : 600,
                      borderRadius: "12px",
                      borderWidth: selected ? 2 : 1.5,
                      borderStyle: "solid",
                      borderColor: selected ? SHELL_PRIMARY : BORDER,
                      bgcolor: selected ? "rgba(248, 114, 58, 0.12)" : "rgba(255,255,255,0.9)",
                      color: selected ? SHELL_PRIMARY : SHELL_INK,
                      boxShadow: "none",
                      transition: "border-color 0.18s ease, background-color 0.18s ease",
                      "&:hover": {
                        borderColor: selected ? SHELL_PRIMARY : "rgba(107, 99, 92, 0.45)",
                        bgcolor: selected ? "rgba(248, 114, 58, 0.16)" : "rgba(255,255,255,1)",
                      },
                    }}
                  />
                );
              })}
            </Stack>
          </Box>
          <Box>
            <Typography sx={{ fontSize: "0.75rem", fontWeight: 700, color: SHELL_MUTED, mb: 1.25, letterSpacing: "0.04em" }}>Organization type</Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
              {ORG_TYPES.map((o) => {
                const selected = orgType === o.id;
                const OrgIcon = o.Icon;
                return (
                  <Box
                    key={o.id}
                    component="button"
                    type="button"
                    onClick={() => setOrgType(o.id)}
                    sx={{
                      flex: 1,
                      textAlign: "left",
                      cursor: "pointer",
                      p: 1.5,
                      borderRadius: "14px",
                      border: "2px solid",
                      borderColor: selected ? SHELL_PRIMARY : BORDER,
                      boxShadow: "none",
                      bgcolor: selected ? "rgba(248, 114, 58, 0.1)" : "rgba(255,255,255,0.92)",
                      font: "inherit",
                      color: SHELL_INK,
                      transition: "background-color 0.2s ease, border-color 0.2s ease",
                      "&:hover": {
                        borderColor: selected ? SHELL_PRIMARY : "rgba(107, 99, 92, 0.45)",
                      },
                    }}
                  >
                    <Stack direction="row" spacing={1.25} alignItems="flex-start">
                      <Box
                        sx={{
                          flexShrink: 0,
                          width: 44,
                          height: 44,
                          borderRadius: "12px",
                          display: "grid",
                          placeItems: "center",
                          bgcolor: selected ? "rgba(248, 114, 58, 0.16)" : "rgba(23, 18, 14, 0.045)",
                          color: selected ? SHELL_PRIMARY : SHELL_MUTED,
                          transition: "background-color 0.2s ease, color 0.2s ease",
                        }}
                      >
                        <OrgIcon sx={{ fontSize: 24 }} />
                      </Box>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography sx={{ fontWeight: 700, fontSize: "0.9rem" }}>{o.label}</Typography>
                        <Typography sx={{ fontSize: "0.75rem", color: SHELL_MUTED, mt: 0.25 }}>{o.hint}</Typography>
                      </Box>
                    </Stack>
                  </Box>
                );
              })}
            </Stack>
          </Box>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
            <TextField fullWidth label="State / region" value={stateRegion} onChange={(e) => setStateRegion(e.target.value)} sx={fieldSx} />
            <TextField fullWidth label="City" value={city} onChange={(e) => setCity(e.target.value)} sx={fieldSx} />
          </Stack>
        </Stack>
      </Box>

      <Box sx={sectionSurface}>
        <Typography sx={{ fontSize: "0.62rem", fontWeight: 800, letterSpacing: "0.12em", color: SHELL_MUTED, textTransform: "uppercase", mb: 1 }}>
          {"company's story"}
        </Typography>
        <TextField
          fullWidth
          multiline
          minRows={4}
          label="Description"
          placeholder="Tell candidates what you do and why they should care."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={fieldSx}
        />
      </Box>

      <Box sx={sectionSurface}>
        <Typography sx={{ fontSize: "0.62rem", fontWeight: 800, letterSpacing: "0.12em", color: SHELL_MUTED, textTransform: "uppercase", mb: 1 }}>
          Branding
        </Typography>
        <Typography sx={{ fontWeight: 700, fontSize: "1rem", color: SHELL_INK, mb: 0.5 }}>Company logo</Typography>
        <Typography sx={{ fontSize: "0.8125rem", color: SHELL_MUTED, mb: 2 }}>
          Shown on branded job posts. PNG or JPG, square works best (at least 400px).
        </Typography>
        <input ref={fileInputRef} type="file" accept="image/png,image/jpeg,image/webp" hidden onChange={onLogoChange} />
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems={{ sm: "center" }}>
          {logoPreview ? (
            <Box
              sx={{
                width: 88,
                height: 88,
                borderRadius: "16px",
                bgcolor: "rgba(248,114,58,0.07)",
                boxShadow: "none",
                display: "grid",
                placeItems: "center",
                overflow: "hidden",
                flexShrink: 0,
              }}
            >
              <Box component="img" src={logoPreview} alt="" sx={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </Box>
          ) : null}
          <Button
            variant="outlined"
            startIcon={<CloudUploadOutlinedIcon />}
            onClick={() => fileInputRef.current?.click()}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              borderRadius: "12px",
              border: `1px solid ${BORDER}`,
              color: SHELL_INK,
              bgcolor: "rgba(255,255,255,0.95)",
              boxShadow: "none",
              "&:hover": { borderColor: "rgba(248,114,58,0.35)", bgcolor: "#fff" },
            }}
          >
            Upload logo
          </Button>
        </Stack>
      </Box>

      <Box sx={{ ...sectionSurface, mb: 2 }}>
        <Typography sx={{ fontSize: "0.62rem", fontWeight: 800, letterSpacing: "0.12em", color: SHELL_MUTED, textTransform: "uppercase", mb: 1.5 }}>
          Billing
        </Typography>
        <Stack spacing={3}>
          <TextField
            fullWidth
            multiline
            minRows={2}
            label="Billing address"
            value={billingAddress}
            onChange={(e) => setBillingAddress(e.target.value)}
            sx={fieldSx}
          />
          <TextField fullWidth type="email" label="Billing email" value={billingEmail} onChange={(e) => setBillingEmail(e.target.value)} sx={fieldSx} />
          <TextField fullWidth label="Phone number" value={billingPhone} onChange={(e) => setBillingPhone(e.target.value)} sx={fieldSx} />
          <TextField fullWidth label="GST number" value={gstNumber} onChange={(e) => setGstNumber(e.target.value)} placeholder="e.g. 22AAAAA0000A1Z5" sx={fieldSx} />
        </Stack>
      </Box>

      <Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap" sx={{ mt: 1, width: "100%" }}>
        {saveHint ? (
          <Typography sx={{ fontSize: "0.8125rem", color: SHELL_MUTED, flex: 1, minWidth: 0 }}>{saveHint}</Typography>
        ) : (
          <Box sx={{ flex: 1, minWidth: 0 }} />
        )}
        <Button
          variant="contained"
          disableElevation
          disabled={!isDirty}
          onClick={handleSave}
          sx={{ textTransform: "none", fontWeight: 700, borderRadius: "12px", px: 3, bgcolor: SHELL_PRIMARY, boxShadow: "none", flexShrink: 0 }}
        >
          Save changes
        </Button>
      </Stack>
    </Stack>
  );
}

function PricingPlanPanel() {
  const [currentPlanId, setCurrentPlanId] = useState("basic");
  const [upgradeMessage, setUpgradeMessage] = useState("");

  const handleUpgrade = (planId) => {
    if (planId === currentPlanId) return;
    setCurrentPlanId(planId);
    const name = PLANS.find((p) => p.id === planId)?.name ?? planId;
    setUpgradeMessage(`You are now on ${name}. Billing updates are simulated in this demo.`);
    window.setTimeout(() => setUpgradeMessage(""), 4000);
  };

  return (
    <Stack spacing={0}>
      <SectionIntro
        title="Pricing plan"
        subtitle={
          <>
            You are on{" "}
            <Box component="span" sx={{ fontWeight: 700, color: SHELL_INK }}>
              {PLANS.find((p) => p.id === currentPlanId)?.name}
            </Box>
            . Compare plans and upgrade when you need more capacity or features.
          </>
        }
      />

      {upgradeMessage ? (
        <Box
          sx={{
            ...sectionSurface,
            py: 2,
            mb: 3,
            bgcolor: "rgba(248,114,58,0.08)",
          }}
        >
          <Typography sx={{ fontSize: "0.875rem", color: SHELL_INK, fontWeight: 600 }}>{upgradeMessage}</Typography>
        </Box>
      ) : null}

      <Stack direction={{ xs: "column", lg: "row" }} spacing={2} alignItems="stretch">
        {PLANS.map((plan) => {
          const isCurrent = plan.id === currentPlanId;
          const popular = plan.emphasized;
          return (
            <Box
              key={plan.id}
              sx={{
                flex: popular ? { lg: "1.08 1 0" } : "1 1 0",
                minWidth: 0,
                position: "relative",
                borderRadius: popular ? "20px" : "18px",
                p: popular ? "3px" : 0,
                overflow: popular ? "hidden" : "visible",
              }}
            >
              {popular ? (
                <Box
                  aria-hidden
                  sx={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    width: "max(175%, 400px)",
                    height: "max(175%, 400px)",
                    background: `conic-gradient(
                      from 210deg,
                      ${SHELL_PRIMARY},
                      #FFF7EF,
                      #D4A574,
                      #F5E8DC,
                      #B87333,
                      #FFECD8,
                      #E5622E,
                      #F0DCC4,
                      ${SHELL_PRIMARY}
                    )`,
                    animation: `${pricingLuxuryBorderSpin} 14s linear infinite`,
                    "@media (prefers-reduced-motion: reduce)": {
                      animation: "none",
                      opacity: 0.92,
                    },
                  }}
                />
              ) : null}
              <Box
                sx={{
                  position: "relative",
                  zIndex: popular ? 1 : 0,
                  height: "100%",
                  borderRadius: popular ? "16px" : "18px",
                  bgcolor: popular ? "#FFFCFA" : "#fff",
                  border: "none",
                  p: { xs: 2, sm: 2.5 },
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: popular
                    ? "0 22px 44px rgba(23, 18, 14, 0.07), 0 0 0 1px rgba(255, 255, 255, 0.75) inset, 0 1px 0 rgba(255, 255, 255, 0.92) inset"
                    : "none",
                }}
              >
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1, width: "100%" }}>
                  <Typography sx={{ fontWeight: 800, fontSize: "1.05rem", color: SHELL_INK }}>{plan.name}</Typography>
                  {plan.badge ? (
                    <Typography
                      sx={{
                        fontSize: "0.6rem",
                        fontWeight: 600,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        color: SHELL_MUTED,
                        bgcolor: "rgba(23, 18, 14, 0.04)",
                        border: `1px solid ${BORDER}`,
                        px: 0.75,
                        py: 0.25,
                        borderRadius: "100px",
                      }}
                    >
                      {plan.badge}
                    </Typography>
                  ) : null}
                  {isCurrent ? (
                    <Chip size="small" label="Current" sx={{ ml: "auto", fontWeight: 700, bgcolor: "rgba(248,114,58,0.12)", color: SHELL_PRIMARY }} />
                  ) : null}
                </Stack>
                <Typography sx={{ fontSize: "0.8125rem", color: SHELL_MUTED, mb: 2, minHeight: 40 }}>{plan.description}</Typography>
                <Stack direction="row" alignItems="baseline" sx={{ mb: 2 }}>
                  <Typography sx={{ fontSize: "1.85rem", fontWeight: 800, color: SHELL_INK, letterSpacing: "-0.03em" }}>{plan.price}</Typography>
                  <Typography sx={{ fontSize: "0.85rem", color: SHELL_MUTED, ml: 0.5 }}>/{plan.period}</Typography>
                </Stack>
                <Typography sx={{ fontSize: "0.65rem", fontWeight: 800, letterSpacing: "0.08em", color: SHELL_MUTED, textTransform: "uppercase", mb: 1 }}>
                  {plan.featuresLabel}
                </Typography>
                <Stack spacing={1} component="ul" sx={{ listStyle: "none", m: 0, p: 0, flex: 1, mb: 2 }}>
                  {plan.features.map((line) => (
                    <Stack key={line} direction="row" spacing={1} component="li" alignItems="flex-start">
                      <Box
                        sx={{
                          width: 16,
                          height: 16,
                          borderRadius: "50%",
                          bgcolor: "rgba(248,114,58,0.12)",
                          display: "grid",
                          placeItems: "center",
                          flexShrink: 0,
                          mt: "2px",
                        }}
                      >
                        <CheckRoundedIcon sx={{ fontSize: 10, color: SHELL_PRIMARY }} />
                      </Box>
                      <Typography sx={{ fontSize: "0.8125rem", color: SHELL_INK, lineHeight: 1.45 }}>{line}</Typography>
                    </Stack>
                  ))}
                </Stack>
                {isCurrent ? (
                  <Button
                    disabled
                    variant="outlined"
                    sx={{
                      textTransform: "none",
                      fontWeight: 700,
                      borderRadius: "12px",
                      border: "none",
                      bgcolor: "rgba(23,18,14,0.04)",
                      color: SHELL_MUTED,
                    }}
                  >
                    Current plan
                  </Button>
                ) : popular ? (
                  <Button
                    variant="contained"
                    disableElevation
                    onClick={() => handleUpgrade(plan.id)}
                    sx={{
                      textTransform: "none",
                      fontWeight: 700,
                      borderRadius: "12px",
                      bgcolor: SHELL_PRIMARY,
                      boxShadow: "none",
                      "&:hover": { bgcolor: "#E5622E" },
                    }}
                  >
                    Upgrade to {plan.name}
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    onClick={() => handleUpgrade(plan.id)}
                    sx={{
                      textTransform: "none",
                      fontWeight: 700,
                      borderRadius: "12px",
                      color: SHELL_PRIMARY,
                      borderColor: SHELL_PRIMARY,
                      bgcolor: "transparent",
                      boxShadow: "none",
                      "&:hover": {
                        borderColor: SHELL_PRIMARY,
                        bgcolor: "rgba(248, 114, 58, 0.08)",
                        color: SHELL_PRIMARY,
                      },
                    }}
                  >
                    Upgrade to {plan.name}
                  </Button>
                )}
              </Box>
            </Box>
          );
        })}
      </Stack>
      <Typography sx={{ fontSize: "0.75rem", color: SHELL_MUTED }}>Upgrades apply to your workspace for this demo only.</Typography>
    </Stack>
  );
}

export default function RecruiterSettingsPanel() {
  const [section, setSection] = useState("company");

  return (
    <Stack sx={{ width: "100%", maxWidth: "100%", alignSelf: "stretch" }}>
      <Typography
        component="h2"
        sx={{
          fontSize: { xs: "1.125rem", md: "1.2rem" },
          fontWeight: 800,
          color: SHELL_INK,
          letterSpacing: "-0.02em",
          lineHeight: 1.25,
          mb: 2,
        }}
      >
        Settings
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "stretch",
          width: "100%",
          minHeight: { xs: "auto", md: "min(720px, calc(100vh - 200px))" },
          bgcolor: "#fff",
          borderRadius: "20px",
          boxShadow: "0 4px 20px rgba(23,18,14,0.055)",
          overflow: "hidden",
          border: `1px solid ${BORDER}`,
        }}
      >
        <Box
          sx={{
            width: { md: 236 },
            flexShrink: 0,
            background:
              "linear-gradient(165deg, rgba(255, 255, 255, 0.92) 0%, rgba(255, 255, 255, 0.94) 38%, rgba(255, 255, 255, 1) 100%)",
            p: 2.5,
            display: "flex",
            flexDirection: "column",
            minHeight: { md: "100%" },
          }}
        >
          <Stack spacing={1} sx={{ flex: 1 }}>
            <NavItem icon={BusinessOutlinedIcon} label="Company profile" active={section === "company"} onClick={() => setSection("company")} />
            <NavItem icon={CreditCardOutlinedIcon} label="Pricing plan" active={section === "pricing"} onClick={() => setSection("pricing")} />
          </Stack>
        </Box>
        <Box
          sx={{
            flex: "1 1 0%",
            minWidth: 0,
            minHeight: { md: 0 },
            bgcolor: PAGE_BG,
            boxShadow: "none",
            p: { xs: 2.5, sm: 3, md: 3.75 },
            overflowY: "auto",
          }}
        >
          {section === "company" ? <CompanyProfileForm /> : <PricingPlanPanel />}
        </Box>
      </Box>
    </Stack>
  );
}
