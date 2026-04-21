import { useCallback, useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Chip,
  Fade,
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  LinearProgress,
  Link,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { keyframes } from "@mui/system";

const PRIMARY = "#F8723A";
const INK = "#17120E";
const MUTED = "#6B635C";
const BORDER = "rgba(220, 212, 202, 0.65)";

/** Menus must sit above the full-screen onboarding layer (z-index 1500). */
const SELECT_MENU_PROPS = {
  disableScrollLock: true,
  disableAutoFocus: true,
  PaperProps: {
    sx: {
      zIndex: 2000,
      maxHeight: 320,
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

const INDUSTRIES = [
  "Software & IT",
  "Internet & Digital Media",
  "Financial Services",
  "Insurance",
  "Healthcare & Life Sciences",
  "Pharmaceuticals & Biotech",
  "Retail & Consumer Goods",
  "E-commerce & Marketplaces",
  "Manufacturing & Industrial",
  "Logistics & Supply Chain",
  "Energy & Utilities",
  "Education & Training",
  "Professional Services & Consulting",
  "Legal & Compliance",
  "Media & Entertainment",
  "Hospitality & Travel",
  "Real Estate & Construction",
  "Telecommunications",
  "Aerospace & Defense",
  "Automotive & Mobility",
  "Agriculture & Food Production",
  "Government & Public Sector",
  "Non-profit & NGO",
  "Other",
];

const COMPANY_SIZES = ["1-10", "11-50", "51-200", "201-500", "500+"];

const ORG_TYPES = [
  { id: "startup", label: "Startup", hint: "Early stage" },
  { id: "sme", label: "SME", hint: "Small and medium" },
  { id: "enterprise", label: "Enterprise", hint: "Large organization" },
];

/** Indian states and UTs with representative cities for onboarding location pickers. */
const INDIA_STATE_CITIES = {
  "Andhra Pradesh": ["Amaravati", "Anantapur", "Guntur", "Kadapa", "Kurnool", "Nellore", "Rajahmundry", "Tirupati", "Vijayawada", "Visakhapatnam"],
  "Arunachal Pradesh": ["Itanagar", "Naharlagun", "Pasighat", "Tawang"],
  Assam: ["Dibrugarh", "Guwahati", "Jorhat", "Nagaon", "Silchar", "Tezpur"],
  Bihar: ["Bhagalpur", "Darbhanga", "Gaya", "Muzaffarpur", "Patna", "Purnia"],
  Chhattisgarh: ["Bhilai", "Bilaspur", "Durg", "Korba", "Raipur", "Rajnandgaon"],
  Goa: ["Mapusa", "Margao", "Panaji", "Vasco da Gama"],
  Gujarat: ["Ahmedabad", "Bhavnagar", "Gandhinagar", "Jamnagar", "Rajkot", "Surat", "Vadodara"],
  Haryana: ["Ambala", "Faridabad", "Gurugram", "Karnal", "Panipat", "Rohtak"],
  "Himachal Pradesh": ["Dharamshala", "Manali", "Mandi", "Shimla", "Solan"],
  Jharkhand: ["Bokaro", "Deoghar", "Dhanbad", "Jamshedpur", "Ranchi"],
  Karnataka: ["Belagavi", "Bengaluru", "Hubballi", "Kalaburagi", "Mangaluru", "Mysuru"],
  Kerala: ["Kochi", "Kollam", "Kozhikode", "Thiruvananthapuram", "Thrissur"],
  "Madhya Pradesh": ["Bhopal", "Gwalior", "Indore", "Jabalpur", "Ujjain"],
  Maharashtra: ["Aurangabad", "Mumbai", "Nagpur", "Nashik", "Pune", "Thane"],
  Manipur: ["Bishnupur", "Imphal", "Thoubal"],
  Meghalaya: ["Jowai", "Shillong", "Tura"],
  Mizoram: ["Aizawl", "Lunglei"],
  Nagaland: ["Dimapur", "Kohima", "Mokokchung"],
  Odisha: ["Bhubaneswar", "Cuttack", "Puri", "Rourkela", "Sambalpur"],
  Punjab: ["Amritsar", "Jalandhar", "Ludhiana", "Mohali", "Patiala"],
  Rajasthan: ["Ajmer", "Bikaner", "Jaipur", "Jodhpur", "Kota", "Udaipur"],
  Sikkim: ["Gangtok", "Namchi"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem", "Tiruchirappalli", "Vellore"],
  Telangana: ["Hyderabad", "Karimnagar", "Nizamabad", "Warangal"],
  Tripura: ["Agartala", "Dharmanagar", "Udaipur"],
  "Uttar Pradesh": ["Agra", "Ghaziabad", "Kanpur", "Lucknow", "Noida", "Varanasi"],
  Uttarakhand: ["Dehradun", "Haridwar", "Haldwani", "Nainital", "Rishikesh"],
  "West Bengal": ["Asansol", "Durgapur", "Howrah", "Kolkata", "Siliguri"],
  "Andaman and Nicobar Islands": ["Port Blair"],
  Chandigarh: ["Chandigarh"],
  "Dadra and Nagar Haveli and Daman and Diu": ["Daman", "Diu", "Silvassa"],
  Delhi: ["Central Delhi", "New Delhi", "North Delhi", "South Delhi"],
  "Jammu and Kashmir": ["Anantnag", "Jammu", "Srinagar"],
  Ladakh: ["Kargil", "Leh"],
  Lakshadweep: ["Agatti", "Kavaratti"],
  Puducherry: ["Karaikal", "Mahe", "Puducherry", "Yanam"],
};

const INDIAN_STATES_SORTED = Object.keys(INDIA_STATE_CITIES).sort((a, b) => a.localeCompare(b));

const COUNTRY_CODES = [
  { code: "+1", flag: "🇺🇸" },
  { code: "+44", flag: "🇬🇧" },
  { code: "+91", flag: "🇮🇳" },
  { code: "+61", flag: "🇦🇺" },
];

function formatCallingCode(value) {
  const row = COUNTRY_CODES.find((c) => c.code === value);
  return row ? `${row.flag} ${row.code}` : value;
}

const PHONE_OTP_LENGTH = 4;
const DEMO_PHONE_OTP = "1234";

/** Treat as complete when local number has enough digits (e.g. 10 for many regions). */
const MIN_PHONE_DIGITS_FOR_OTP = 10;

const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-6px); }
  40% { transform: translateX(6px); }
  60% { transform: translateX(-4px); }
  80% { transform: translateX(4px); }
`;

function Blob({ sx }) {
  return (
    <Box
      aria-hidden
      sx={{
        position: "absolute",
        borderRadius: "50%",
        pointerEvents: "none",
        filter: "blur(72px)",
        ...sx,
      }}
    />
  );
}

export default function RecruiterOnboardingScreen({ onComplete }) {
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)", { noSsr: true });
  const [activeStep, setActiveStep] = useState(0);
  const [touched, setTouched] = useState(false);

  const [industry, setIndustry] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [orgType, setOrgType] = useState("");
  const [city, setCity] = useState("");
  const [stateRegion, setStateRegion] = useState("");

  const [jobTitle, setJobTitle] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [phoneLocal, setPhoneLocal] = useState("");

  const [phoneOtp, setPhoneOtp] = useState(["", "", "", ""]);
  const [phoneOtpError, setPhoneOtpError] = useState("");
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpShakeKey, setOtpShakeKey] = useState(0);

  const phoneOtpRefs = useRef([]);
  const titleRef = useRef(null);
  const verifyLockRef = useRef(false);

  const totalSteps = 2;
  const progress = ((activeStep + 1) / totalSteps) * 100;

  const companyStepValid =
    Boolean(industry) && Boolean(companySize) && Boolean(orgType) && city.trim() && stateRegion.trim();

  const phoneDigits = phoneLocal.replace(/\D/g, "");
  const phoneCompleteForOtp = phoneDigits.length >= MIN_PHONE_DIGITS_FOR_OTP;
  const recruiterBasicsValid = jobTitle.trim().length > 0 && phoneCompleteForOtp;
  const step1ReadyToFinish = recruiterBasicsValid && phoneVerified;

  const verifyPhoneOtp = useCallback(() => {
    if (!otpSent || verifyLockRef.current || phoneVerified) return;
    const code = phoneOtp.join("");
    if (code.length !== PHONE_OTP_LENGTH) {
      setPhoneOtpError("Enter the 4-digit code.");
      return;
    }
    if (code !== DEMO_PHONE_OTP) {
      setPhoneOtpError("That code is not valid. Try again.");
      setOtpShakeKey((k) => k + 1);
      setPhoneOtp(["", "", "", ""]);
      queueMicrotask(() => phoneOtpRefs.current[0]?.focus());
      return;
    }
    setPhoneOtpError("");
    verifyLockRef.current = true;
    setPhoneVerified(true);
  }, [phoneOtp, phoneVerified, otpSent]);

  useEffect(() => {
    if (activeStep !== 1 || !otpSent || phoneVerified) return;
    if (phoneOtp.join("").length !== PHONE_OTP_LENGTH) return;
    const t = window.setTimeout(() => verifyPhoneOtp(), 280);
    return () => window.clearTimeout(t);
  }, [phoneOtp, activeStep, otpSent, phoneVerified, verifyPhoneOtp]);

  useEffect(() => {
    const id = window.setTimeout(() => {
      if (activeStep === 1) titleRef.current?.focus();
    }, 120);
    return () => window.clearTimeout(id);
  }, [activeStep]);

  useEffect(() => {
    if (phoneVerified) return;
    if (!phoneCompleteForOtp) {
      setOtpSent(false);
      setPhoneOtp(["", "", "", ""]);
      setPhoneOtpError("");
      verifyLockRef.current = false;
    }
  }, [phoneCompleteForOtp, phoneVerified]);

  const handleContinue = () => {
    setTouched(true);
    if (activeStep === 0) {
      if (!companyStepValid) return;
      setActiveStep(1);
      setTouched(false);
      return;
    }
    if (activeStep === 1) {
      if (!step1ReadyToFinish) return;
      onComplete();
    }
  };

  const handleSendCode = () => {
    if (!recruiterBasicsValid) return;
    setOtpSent(true);
    setPhoneOtpError("");
    setPhoneOtp(["", "", "", ""]);
    verifyLockRef.current = false;
    queueMicrotask(() => phoneOtpRefs.current[0]?.focus());
  };

  const handleResendCode = () => {
    setPhoneOtp(["", "", "", ""]);
    setPhoneOtpError("");
    verifyLockRef.current = false;
    queueMicrotask(() => phoneOtpRefs.current[0]?.focus());
  };

  const handlePhoneOtpChange = (index) => (event) => {
    const value = event.target.value.replace(/\D/g, "").slice(-1);
    setPhoneOtpError("");
    setPhoneOtp((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
    if (value && index < PHONE_OTP_LENGTH - 1) {
      phoneOtpRefs.current[index + 1]?.focus();
    }
  };

  const handlePhoneOtpKeyDown = (index) => (event) => {
    if (event.key === "Backspace" && !phoneOtp[index] && index > 0) {
      phoneOtpRefs.current[index - 1]?.focus();
    }
  };

  const handleBack = () => {
    if (activeStep === 0) return;
    if (activeStep === 1) {
      setOtpSent(false);
      setPhoneVerified(false);
      verifyLockRef.current = false;
      setPhoneOtp(["", "", "", ""]);
      setPhoneOtpError("");
    }
    setActiveStep((s) => s - 1);
    setTouched(false);
  };

  const fieldSx = {
    "& .MuiOutlinedInput-root": { borderRadius: "12px" },
    "& .MuiInputLabel-root": { fontSize: "14px" },
  };

  return (
    <Box
      role="main"
      sx={{
        position: "fixed",
        inset: 0,
        /* Above pricing (1500) during handoff so the stack never shows through */
        zIndex: 1510,
        background: [
          "radial-gradient(ellipse 78% 62% at -4% 4%, rgba(255, 186, 150, 0.45) 0%, transparent 58%)",
          "radial-gradient(ellipse 52% 58% at 104% 94%, rgba(248, 156, 104, 0.22) 0%, transparent 52%)",
          "#F7F3EE",
        ].join(", "),
        overflow: "auto",
      }}
    >
      <Blob
        sx={{
          width: 420,
          height: 420,
          top: "-12%",
          right: "-8%",
          background: "radial-gradient(circle, rgba(255, 176, 128, 0.28) 0%, transparent 65%)",
        }}
      />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100%",
          p: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: { xs: "100%", sm: 720, md: 1120 },
            minHeight: { xs: "min-content", md: 805 },
            borderRadius: { xs: "22px", md: "30px" },
            p: { xs: "32px 24px", sm: "44px 48px", md: "56px 64px" },
            backdropFilter: "blur(22px) saturate(160%)",
            WebkitBackdropFilter: "blur(22px) saturate(160%)",
            background:
              "linear-gradient(152deg, rgba(255, 255, 255, 0.72) 0%, rgba(255, 245, 236, 0.5) 100%)",
            border: "1px solid rgba(255, 255, 255, 0.85)",
            boxShadow: "0 24px 56px rgba(18, 10, 4, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.75)",
          }}
        >
          <Box sx={{ width: "100%", maxWidth: { xs: "100%", sm: 720, md: 840 }, mx: "auto" }}>
            <Stack spacing={{ xs: 3.5, md: 4 }}>
              <Box sx={{ minWidth: 0 }}>
                <LinearProgress
                  variant="determinate"
                  value={progress}
                  sx={{
                    height: 5,
                    borderRadius: 2.5,
                    bgcolor: "rgba(248, 114, 58, 0.12)",
                    "& .MuiLinearProgress-bar": {
                      borderRadius: 2.5,
                      background: `linear-gradient(90deg, ${PRIMARY}, #FF9B60)`,
                    },
                  }}
                />
                <Typography
                  component="p"
                  sx={{
                    mt: 1,
                    textAlign: "right",
                    fontSize: "0.8125rem",
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: MUTED,
                  }}
                >
                  Step {activeStep + 1} of {totalSteps}
                </Typography>
              </Box>

              <Fade in timeout={reducedMotion ? 0 : 280} key={activeStep}>
                <Box>
                  {activeStep === 0 && (
                    <Stack spacing={3.5}>
                      <Box>
                        <Typography
                          component="h1"
                          sx={{
                            fontSize: { xs: "1.35rem", md: "1.5rem" },
                            fontWeight: 800,
                            letterSpacing: "-0.03em",
                            color: INK,
                            mb: 0.5,
                          }}
                        >
                          Company details
                        </Typography>
                        <Typography sx={{ fontSize: "0.9375rem", color: MUTED, lineHeight: 1.5 }}>
                          Tell us about your organization. You can edit this later.
                        </Typography>
                      </Box>

                      <FormControl fullWidth error={touched && !industry} sx={fieldSx}>
                        <InputLabel id="industry-label">Industry / sector</InputLabel>
                        <Select
                          labelId="industry-label"
                          label="Industry / sector"
                          value={industry}
                          onChange={(e) => setIndustry(e.target.value)}
                          MenuProps={SELECT_MENU_PROPS}
                        >
                          {INDUSTRIES.map((opt) => (
                            <MenuItem key={opt} value={opt}>
                              {opt}
                            </MenuItem>
                          ))}
                        </Select>
                        {touched && !industry ? <FormHelperText>Select an industry.</FormHelperText> : null}
                      </FormControl>

                    <Box>
                      <Typography sx={{ fontSize: "0.75rem", fontWeight: 700, color: MUTED, mb: 1, letterSpacing: "0.04em" }}>
                        Company size
                      </Typography>
                      <Stack direction="row" flexWrap="wrap" gap={{ xs: 1.25, sm: 1.5 }}>
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
                                fontSize: { xs: "0.9375rem", sm: "1rem" },
                                letterSpacing: "0.02em",
                                minHeight: { xs: 48, sm: 52 },
                                px: 0.5,
                                borderRadius: "14px",
                                borderWidth: selected ? 2 : 1.5,
                                borderStyle: "solid",
                                borderColor: selected ? PRIMARY : BORDER,
                                bgcolor: selected ? "rgba(248, 114, 58, 0.14)" : "#fff",
                                color: selected ? PRIMARY : INK,
                                boxShadow: selected ? "0 1px 0 rgba(255, 255, 255, 0.8) inset" : "none",
                                transition: "border-color 0.18s ease, background-color 0.18s ease, color 0.18s ease, box-shadow 0.18s ease",
                                "& .MuiChip-label": { px: { xs: 1.5, sm: 1.75 }, py: { xs: 0.9, sm: 1 } },
                                "&:hover": {
                                  bgcolor: selected ? "rgba(248, 114, 58, 0.2)" : "rgba(0, 0, 0, 0.03)",
                                  borderColor: selected ? PRIMARY : "rgba(107, 99, 92, 0.45)",
                                },
                                "&:focus-visible": {
                                  outline: `2px solid ${PRIMARY}`,
                                  outlineOffset: 2,
                                },
                              }}
                            />
                          );
                        })}
                      </Stack>
                      {touched && !companySize ? (
                        <FormHelperText error sx={{ mx: 0, mt: 1 }}>
                          Select a company size.
                        </FormHelperText>
                      ) : null}
                    </Box>

                    <Box>
                      <Typography sx={{ fontSize: "0.75rem", fontWeight: 700, color: MUTED, mb: 1, letterSpacing: "0.04em" }}>
                        Organization type
                      </Typography>
                      <Stack direction={{ xs: "column", sm: "row" }} spacing={1.25}>
                        {ORG_TYPES.map((o) => {
                          const selected = orgType === o.id;
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
                                p: 1.75,
                                borderRadius: "14px",
                                border: "2px solid",
                                borderColor: selected ? PRIMARY : BORDER,
                                backgroundColor: selected ? "rgba(248, 114, 58, 0.06)" : "#fff",
                                transition: "border-color 0.2s, background-color 0.2s",
                                font: "inherit",
                                color: INK,
                              }}
                            >
                              <Typography sx={{ fontWeight: 700, fontSize: "0.9375rem" }}>{o.label}</Typography>
                              <Typography sx={{ fontSize: "0.75rem", color: MUTED, mt: 0.25 }}>{o.hint}</Typography>
                            </Box>
                          );
                        })}
                      </Stack>
                      {touched && !orgType ? (
                        <FormHelperText error sx={{ mx: 0, mt: 1 }}>
                          Select an organization type.
                        </FormHelperText>
                      ) : null}
                    </Box>

                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                      <FormControl fullWidth error={touched && !stateRegion} sx={fieldSx}>
                        <InputLabel id="onboarding-state-label" shrink>
                          State
                        </InputLabel>
                        <Select
                          labelId="onboarding-state-label"
                          label="State"
                          value={stateRegion}
                          onChange={(e) => {
                            setStateRegion(e.target.value);
                            setCity("");
                          }}
                          displayEmpty
                          renderValue={(v) =>
                            v ? (
                              v
                            ) : (
                              <Typography component="span" sx={{ color: MUTED, fontWeight: 400 }}>
                                Select state
                              </Typography>
                            )
                          }
                          MenuProps={SELECT_MENU_PROPS}
                        >
                          <MenuItem value="" disabled>
                            <em>Select state</em>
                          </MenuItem>
                          {INDIAN_STATES_SORTED.map((name) => (
                            <MenuItem key={name} value={name}>
                              {name}
                            </MenuItem>
                          ))}
                        </Select>
                        {touched && !stateRegion ? <FormHelperText>Select a state.</FormHelperText> : null}
                      </FormControl>
                      <FormControl fullWidth error={touched && Boolean(stateRegion) && !city} disabled={!stateRegion} sx={fieldSx}>
                        <InputLabel id="onboarding-city-label" shrink>
                          City
                        </InputLabel>
                        <Select
                          labelId="onboarding-city-label"
                          label="City"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          displayEmpty
                          renderValue={(v) => {
                            if (!stateRegion) {
                              return (
                                <Typography component="span" sx={{ color: MUTED, fontWeight: 400 }}>
                                  Select state first
                                </Typography>
                              );
                            }
                            if (!v) {
                              return (
                                <Typography component="span" sx={{ color: MUTED, fontWeight: 400 }}>
                                  Select city
                                </Typography>
                              );
                            }
                            return v;
                          }}
                          MenuProps={SELECT_MENU_PROPS}
                        >
                          <MenuItem value="" disabled>
                            <em>{stateRegion ? "Select city" : "Select state first"}</em>
                          </MenuItem>
                          {(INDIA_STATE_CITIES[stateRegion] ?? [])
                            .slice()
                            .sort((a, b) => a.localeCompare(b))
                            .map((name) => (
                              <MenuItem key={name} value={name}>
                                {name}
                              </MenuItem>
                            ))}
                        </Select>
                        {touched && stateRegion && !city ? <FormHelperText>Select a city.</FormHelperText> : null}
                      </FormControl>
                    </Stack>
                  </Stack>
                )}

                {activeStep === 1 && (
                  <Stack spacing={3.5}>
                    <Box
                      sx={{
                        pb: 2,
                        borderBottom: "1px solid rgba(220, 212, 202, 0.55)",
                      }}
                    >
                      <Typography
                        component="h1"
                        sx={{
                          fontSize: { xs: "1.35rem", md: "1.5rem" },
                          fontWeight: 800,
                          letterSpacing: "-0.03em",
                          color: INK,
                          mb: 0.5,
                        }}
                      >
                        Tell us about yourself
                      </Typography>
                      <Typography sx={{ fontSize: "0.9375rem", color: MUTED, lineHeight: 1.5 }}>
                        A few details so we can reach you about candidates and jobs.
                      </Typography>
                    </Box>

                    <TextField
                      fullWidth
                      inputRef={titleRef}
                      label="Job title / role"
                      placeholder="e.g. Talent Lead, Hiring Manager"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      error={touched && !jobTitle.trim()}
                      helperText={touched && !jobTitle.trim() ? "Enter your title." : ""}
                      sx={fieldSx}
                    />

                    <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} alignItems={{ sm: "flex-start" }}>
                      <FormControl
                        size="small"
                        hiddenLabel
                        sx={{
                          minWidth: { xs: "100%", sm: 118 },
                          "& .MuiOutlinedInput-root": { borderRadius: "12px" },
                        }}
                      >
                        <Select
                          value={countryCode}
                          onChange={(e) => setCountryCode(e.target.value)}
                          renderValue={(v) => formatCallingCode(v)}
                          aria-label="Country calling code"
                          MenuProps={SELECT_MENU_PROPS}
                          sx={{
                            "& .MuiSelect-select": {
                              py: 1.35,
                              pl: 1.5,
                              pr: 3,
                              display: "flex",
                              alignItems: "center",
                              fontWeight: 600,
                            },
                          }}
                        >
                          {COUNTRY_CODES.map((c) => (
                            <MenuItem key={c.code} value={c.code} dense>
                              <Stack direction="row" spacing={1} alignItems="center" component="span">
                                <Box component="span" aria-hidden sx={{ fontSize: "1.15rem", lineHeight: 1 }}>
                                  {c.flag}
                                </Box>
                                <Typography component="span" sx={{ fontWeight: 600, fontSize: "0.9375rem" }}>
                                  {c.code}
                                </Typography>
                              </Stack>
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <TextField
                        fullWidth
                        label="Mobile number"
                        placeholder="e.g. 984 743 2194"
                        value={phoneLocal}
                        onChange={(e) => setPhoneLocal(e.target.value)}
                        error={touched && phoneDigits.length > 0 && !phoneCompleteForOtp}
                        helperText={
                          touched && phoneDigits.length > 0 && !phoneCompleteForOtp
                            ? `${MIN_PHONE_DIGITS_FOR_OTP} digits required.`
                            : ""
                        }
                        inputProps={{ inputMode: "tel" }}
                        InputProps={{
                          endAdornment: phoneVerified ? (
                            <InputAdornment position="end">
                              <CheckCircleRoundedIcon sx={{ color: "success.main", fontSize: 26 }} />
                            </InputAdornment>
                          ) : null,
                        }}
                        sx={fieldSx}
                      />
                    </Stack>

                    {recruiterBasicsValid && !phoneVerified ? (
                      <Box
                        sx={{
                          mt: { xs: 0.5, sm: 0.75 },
                          px: { xs: 2, sm: 2.5 },
                          py: { xs: 1.75, sm: 2.25 },
                          borderRadius: "14px",
                          border: `1px solid ${BORDER}`,
                          bgcolor: "rgba(255, 255, 255, 0.92)",
                          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.95)",
                        }}
                      >
                        <Stack
                          direction="row"
                          alignItems="flex-start"
                          justifyContent="space-between"
                          gap={{ xs: 2, sm: 2.5 }}
                        >
                          <Box sx={{ minWidth: 0, flex: 1, pr: { sm: 0.5 } }}>
                            <Typography sx={{ fontWeight: 800, color: INK, fontSize: "0.9375rem", lineHeight: 1.45 }}>
                              Phone verification
                            </Typography>
                            <Typography sx={{ fontSize: "0.8125rem", color: MUTED, lineHeight: 1.5, mt: 0.4 }}>
                              Enter the 4-digit code we send to verify your number.
                            </Typography>
                          </Box>
                          {!otpSent ? (
                            <Button
                              variant="contained"
                              size="small"
                              onClick={handleSendCode}
                              sx={{
                                textTransform: "none",
                                fontWeight: 700,
                                borderRadius: "10px",
                                px: 2,
                                py: 0.85,
                                flexShrink: 0,
                                fontSize: "0.8125rem",
                                boxShadow: "0 4px 12px rgba(248, 114, 58, 0.26)",
                              }}
                            >
                              Send code
                            </Button>
                          ) : (
                            <Link
                              component="button"
                              type="button"
                              variant="body2"
                              onClick={handleResendCode}
                              sx={{
                                fontWeight: 700,
                                fontSize: "0.8125rem",
                                color: PRIMARY,
                                textDecoration: "none",
                                flexShrink: 0,
                                lineHeight: 1.45,
                                pt: 0.25,
                                "&:hover": { textDecoration: "underline" },
                              }}
                            >
                              Resend
                            </Link>
                          )}
                        </Stack>

                        {otpSent ? (
                          <Box sx={{ mt: 1.5 }}>
                            <Stack
                              key={otpShakeKey}
                              direction="row"
                              spacing={1.25}
                              justifyContent={{ xs: "center", sm: "flex-start" }}
                              sx={{
                                animation:
                                  otpShakeKey > 0 && !reducedMotion ? `${shake} 0.38s ease` : "none",
                              }}
                            >
                              {phoneOtp.map((digit, index) => (
                                <TextField
                                  key={index}
                                  value={digit}
                                  onChange={handlePhoneOtpChange(index)}
                                  onKeyDown={handlePhoneOtpKeyDown(index)}
                                  inputRef={(node) => {
                                    phoneOtpRefs.current[index] = node;
                                  }}
                                  error={Boolean(phoneOtpError)}
                                  inputProps={{
                                    inputMode: "numeric",
                                    maxLength: 1,
                                    style: { textAlign: "center", fontSize: "1.125rem", fontWeight: 700 },
                                    autoComplete: index === 0 ? "one-time-code" : "off",
                                    "aria-label": `Digit ${index + 1} of ${PHONE_OTP_LENGTH}`,
                                    "aria-invalid": phoneOtpError ? true : undefined,
                                  }}
                                  sx={{
                                    width: { xs: 52, sm: 58 },
                                    "& .MuiOutlinedInput-root": {
                                      borderRadius: "12px",
                                      backgroundColor: "#FFFFFF",
                                      minHeight: 52,
                                      boxShadow: phoneOtpError
                                        ? "none"
                                        : "0 1px 4px rgba(18, 10, 4, 0.05)",
                                    },
                                    "& .MuiOutlinedInput-input": {
                                      py: 1.35,
                                      px: 0.5,
                                    },
                                  }}
                                />
                              ))}
                            </Stack>
                            {phoneOtpError ? (
                              <Typography
                                role="alert"
                                sx={{
                                  mt: 1,
                                  color: "error.main",
                                  fontSize: "0.8125rem",
                                  fontWeight: 600,
                                  textAlign: { xs: "center", sm: "left" },
                                }}
                              >
                                {phoneOtpError}
                              </Typography>
                            ) : null}
                          </Box>
                        ) : null}
                      </Box>
                    ) : null}
                  </Stack>
                )}
              </Box>
            </Fade>

              <Stack
                direction="row"
                spacing={1.5}
                justifyContent="flex-end"
                alignItems="center"
                flexWrap="wrap"
                sx={{ mt: 2.5 }}
              >
                {activeStep > 0 ? (
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={handleBack}
                    sx={{
                      px: 3,
                      py: 1.25,
                      borderRadius: "14px",
                      textTransform: "none",
                      fontWeight: 700,
                      fontSize: "1rem",
                      borderColor: BORDER,
                      color: INK,
                      "&:hover": { borderColor: MUTED, bgcolor: "rgba(0,0,0,0.02)" },
                    }}
                  >
                    Previous
                  </Button>
                ) : null}
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleContinue}
                  disabled={
                    activeStep === 0 ? !companyStepValid : activeStep === 1 ? !step1ReadyToFinish : false
                  }
                  sx={{
                    px: 4,
                    py: 1.65,
                    minWidth: 168,
                    borderRadius: "14px",
                    textTransform: "none",
                    fontWeight: 700,
                    fontSize: "1rem",
                    boxShadow: "0 10px 24px rgba(248, 114, 58, 0.3)",
                  }}
                >
                  Continue
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
