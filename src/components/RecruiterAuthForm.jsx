import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Box,
  Button,
  Link,
  Stack,
  TextField,
  Typography,
  Alert,
  useMediaQuery,
} from "@mui/material";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import RecruiterWelcomeScreen from "./RecruiterWelcomeScreen";
import RecruiterPricingScreen from "./RecruiterPricingScreen";
import RecruiterOnboardingScreen from "./RecruiterOnboardingScreen";
import RecruiterDashboardDummy from "./RecruiterDashboardDummy";
import RecruiterCreateJobFlow from "./RecruiterCreateJobFlow";

const initialValues = {
  fullName: "",
  workEmail: "",
  companyName: "",
  companyWebsite: "",
};

const initialLoginValues = {
  workEmail: "",
};

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidWebsite(value) {
  if (!value.trim()) {
    return true;
  }
  return /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/.test(value.trim());
}

export default function RecruiterAuthForm() {
  const [mode, setMode] = useState("signup");
  const [loginStep, setLoginStep] = useState("email");
  const [signupRequestSubmitted, setSignupRequestSubmitted] = useState(false);
  const [values, setValues] = useState(initialValues);
  const [loginValues, setLoginValues] = useState(initialLoginValues);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [resendCountdown, setResendCountdown] = useState(26);
  const [didSubmit, setDidSubmit] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(false);
  const [showPricingScreen, setShowPricingScreen] = useState(false);
  const [welcomeExiting, setWelcomeExiting] = useState(false);
  const [pricingEntering, setPricingEntering] = useState(false);
  const [pricingExiting, setPricingExiting] = useState(false);
  const [showOnboardingScreen, setShowOnboardingScreen] = useState(false);
  const [showDashboardDummy, setShowDashboardDummy] = useState(false);
  const [showCreateJobFlow, setShowCreateJobFlow] = useState(false);
  const [otpVerifiedTransition, setOtpVerifiedTransition] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [otpShakeGeneration, setOtpShakeGeneration] = useState(0);
  const otpRefs = useRef([]);
  const otpVerifyInFlightRef = useRef(false);
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)", {
    noSsr: true,
  });

  const errors = useMemo(() => {
    const nextErrors = {};

    if (!values.fullName.trim()) {
      nextErrors.fullName = "Full name is required.";
    }
    if (!values.workEmail.trim()) {
      nextErrors.workEmail = "Work email address is required.";
    } else if (!isValidEmail(values.workEmail)) {
      nextErrors.workEmail = "Enter a valid business email.";
    }
    if (!values.companyName.trim()) {
      nextErrors.companyName = "Company name is required.";
    }
    if (!values.companyWebsite.trim()) {
      nextErrors.companyWebsite = "Company website is required.";
    } else if (!isValidWebsite(values.companyWebsite)) {
      nextErrors.companyWebsite = "Enter a valid website URL.";
    }

    return nextErrors;
  }, [values]);

  const hasErrors = Object.keys(errors).length > 0;
  const loginErrors = useMemo(() => {
    const nextErrors = {};

    if (!loginValues.workEmail.trim()) {
      nextErrors.workEmail = "Work email address is required.";
    } else if (!isValidEmail(loginValues.workEmail)) {
      nextErrors.workEmail = "Enter a valid business email.";
    }

    return nextErrors;
  }, [loginValues]);

  const hasLoginErrors = Object.keys(loginErrors).length > 0;

  const showError = (field) => didSubmit && Boolean(errors[field]);
  const showLoginError = (field) => didSubmit && Boolean(loginErrors[field]);
  const otpHasError = (didSubmit && otp.some((digit) => !digit)) || Boolean(otpError);

  const handleChange = (field) => (event) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }));
    if (successMessage) {
      setSuccessMessage("");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setDidSubmit(true);

    if (hasErrors) {
      return;
    }

    setSignupRequestSubmitted(true);
    setSuccessMessage("");
    setDidSubmit(false);
  };

  const handleLoginChange = (field) => (event) => {
    setLoginValues((prev) => ({ ...prev, [field]: event.target.value }));
    if (successMessage) {
      setSuccessMessage("");
    }
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    setDidSubmit(true);

    if (hasLoginErrors) {
      return;
    }

    setLoginStep("otp");
    setOtp(["", "", "", ""]);
    setOtpShakeGeneration(0);
    setOtpError("");
    setResendCountdown(26);
    setDidSubmit(false);
    setSuccessMessage("");
  };

  const verifyOtpCode = useCallback(() => {
    if (
      showWelcomeScreen ||
      showPricingScreen ||
      showOnboardingScreen ||
      showDashboardDummy ||
      otpVerifiedTransition
    ) {
      return;
    }
    if (otpVerifyInFlightRef.current) {
      return;
    }

    setOtpError("");

    if (otp.some((digit) => !digit)) {
      setDidSubmit(true);
      return;
    }

    const code = otp.join("");
    otpVerifyInFlightRef.current = true;

    if (code !== "1111") {
      if (
        !prefersReducedMotion &&
        typeof navigator !== "undefined" &&
        navigator.vibrate
      ) {
        navigator.vibrate(10);
      }
      setOtpError("That code is not valid. Please try again.");
      setDidSubmit(false);
      setOtpShakeGeneration((g) => g + 1);
      setOtp(["", "", "", ""]);
      otpVerifyInFlightRef.current = false;
      queueMicrotask(() => {
        otpRefs.current[0]?.focus();
      });
      return;
    }

    setDidSubmit(false);
    setOtpVerifiedTransition(true);
    window.setTimeout(() => {
      setShowWelcomeScreen(true);
      setOtpVerifiedTransition(false);
      otpVerifyInFlightRef.current = false;
    }, 520);
  }, [
    otp,
    showWelcomeScreen,
    showPricingScreen,
    showOnboardingScreen,
    showDashboardDummy,
    otpVerifiedTransition,
    prefersReducedMotion,
  ]);

  const handleOtpSubmit = (event) => {
    event.preventDefault();
    verifyOtpCode();
  };

  useEffect(() => {
    if (
      mode !== "login" ||
      loginStep !== "otp" ||
      showWelcomeScreen ||
      showPricingScreen ||
      showOnboardingScreen ||
      showDashboardDummy ||
      otpVerifiedTransition
    ) {
      return undefined;
    }
    if (otp.join("").length !== 4) {
      return undefined;
    }
    const timer = window.setTimeout(() => {
      verifyOtpCode();
    }, 220);
    return () => window.clearTimeout(timer);
  }, [
    mode,
    loginStep,
    otp,
    showWelcomeScreen,
    showPricingScreen,
    showOnboardingScreen,
    showDashboardDummy,
    otpVerifiedTransition,
    verifyOtpCode,
  ]);

  const handleOtpChange = (index) => (event) => {
    const value = event.target.value.replace(/\D/g, "").slice(-1);
    setOtpError("");
    setOtp((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });

    if (value && index < 3) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index) => (event) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  useEffect(() => {
    if (!(mode === "login" && loginStep === "otp")) {
      return undefined;
    }

    if (resendCountdown <= 0) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setResendCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [mode, loginStep, resendCountdown]);

  const commonFieldSx = {
    "& .MuiInputLabel-root": { fontWeight: 400, fontSize: "14px" },
    "& .MuiInputBase-input": { fontSize: "14px" },
  };

  const dismissWelcome = (message) => {
    setShowWelcomeScreen(false);
    setShowPricingScreen(false);
    setShowOnboardingScreen(false);
    setShowDashboardDummy(false);
    setShowCreateJobFlow(false);
    setWelcomeExiting(false);
    setPricingEntering(false);
    setPricingExiting(false);
    setOtpVerifiedTransition(false);
    setSuccessMessage(message);
    setLoginStep("email");
    setOtp(["", "", "", ""]);
    setOtpError("");
    otpVerifyInFlightRef.current = false;
  };

  const handleOnboardingComplete = useCallback(() => {
    setShowOnboardingScreen(false);
    setShowDashboardDummy(true);
  }, []);

  const showPricingAfterWelcome = useCallback(() => {
    if (prefersReducedMotion) {
      setShowWelcomeScreen(false);
      setShowPricingScreen(true);
      setPricingEntering(false);
      setWelcomeExiting(false);
      return;
    }

    setShowPricingScreen(true);
    setPricingEntering(true);
    setWelcomeExiting(true);

    requestAnimationFrame(() => {
      setPricingEntering(false);
    });

    window.setTimeout(() => {
      setShowWelcomeScreen(false);
      setWelcomeExiting(false);
    }, 360);
  }, [prefersReducedMotion]);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth:
          (mode === "signup" && signupRequestSubmitted) ||
          showWelcomeScreen ||
          showPricingScreen ||
          showOnboardingScreen ||
          showDashboardDummy ||
          showCreateJobFlow
            ? "100%"
            : 360,
        mx: "auto",
      }}
    >
      {showWelcomeScreen ? (
        <RecruiterWelcomeScreen
          onCreateJob={showPricingAfterWelcome}
          isExiting={welcomeExiting}
        />
      ) : null}
      {showPricingScreen ? (
        <RecruiterPricingScreen
          isEntering={pricingEntering}
          isExiting={pricingExiting}
          onContinue={() => {
            setShowOnboardingScreen(true);
            if (prefersReducedMotion) {
              setShowPricingScreen(false);
              return;
            }
            setPricingExiting(true);
            window.setTimeout(() => {
              setShowPricingScreen(false);
              setPricingExiting(false);
            }, 380);
          }}
        />
      ) : null}
      {showOnboardingScreen ? (
        <RecruiterOnboardingScreen onComplete={handleOnboardingComplete} />
      ) : null}
      {showDashboardDummy && !showCreateJobFlow ? (
        <RecruiterDashboardDummy
          onExit={() =>
            dismissWelcome(
              "You are signed out of the preview. Log in again to continue when your workspace is connected.",
            )
          }
          onCreateJob={() => setShowCreateJobFlow(true)}
        />
      ) : null}
      {showCreateJobFlow ? (
        <RecruiterCreateJobFlow
          onBack={() => setShowCreateJobFlow(false)}
          onExit={() => {
            setShowCreateJobFlow(false);
            dismissWelcome(
              "You are signed out of the preview. Log in again to continue when your workspace is connected.",
            );
          }}
        />
      ) : null}
      {!showWelcomeScreen && mode === "signup" && signupRequestSubmitted ? (
        <Stack
          spacing={2}
          sx={{
            py: { xs: 4, md: 6 },
            px: 0,
            textAlign: "center",
            width: "100%",
          }}
        >
          <Box
            sx={{
              backgroundColor: "#FFF4EC",
              border: "1px solid #F7D9C6",
              borderRadius: "20px",
              p: "48px",
              textAlign: "left",
              width: "100%",
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "20px", md: "20px" },
                fontWeight: 700,
                color: "#231F1B",
                mb: 1.5,
                lineHeight: 1.25,
              }}
            >
              Request Received
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ fontSize: "16px", lineHeight: 1.7 }}
            >
              Thank you for your interest in ZappyFind. We&apos;ve received your request and our
              team is reviewing your details. You&apos;ll receive a confirmation email shortly.
              Once approved, you can log in right away.
            </Typography>
          </Box>
        </Stack>
      ) : null}
      {!showWelcomeScreen &&
      !showPricingScreen &&
      !showOnboardingScreen &&
      !showDashboardDummy &&
      !(mode === "login" && loginStep === "otp") &&
      !(mode === "signup" && signupRequestSubmitted) ? (
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: "24px", md: "24px" },
            mb: 4.5,
            color: "#231F1B",
            textAlign: "center",
          }}
        >
          {mode === "signup" ? "Sign Up to ZappyFind" : "Log In to ZappyFind"}
        </Typography>
      ) : null}
      <Stack
        component="form"
        spacing={0}
        onSubmit={
          showWelcomeScreen ||
          showPricingScreen ||
          showOnboardingScreen ||
          showDashboardDummy
            ? (e) => e.preventDefault()
            : mode === "signup"
              ? handleSubmit
              : loginStep === "email"
                ? handleLoginSubmit
                : handleOtpSubmit
        }
        noValidate
        sx={{
          display:
            showWelcomeScreen ||
            showPricingScreen ||
            showOnboardingScreen ||
            showDashboardDummy
              ? "none"
              : undefined,
        }}
      >
        {mode === "signup" && signupRequestSubmitted ? null : mode === "signup" ? (
          <Stack spacing={1.5}>
            <TextField
              label="Full Name"
              value={values.fullName}
              onChange={handleChange("fullName")}
              error={showError("fullName")}
              helperText={showError("fullName") ? errors.fullName : ""}
              size="small"
              sx={commonFieldSx}
              required
            />
            <TextField
              label="Work Email Address"
              value={values.workEmail}
              onChange={handleChange("workEmail")}
              error={showError("workEmail")}
              helperText={showError("workEmail") ? errors.workEmail : ""}
              size="small"
              sx={commonFieldSx}
              required
            />
            <TextField
              label="Company Name"
              value={values.companyName}
              onChange={handleChange("companyName")}
              error={showError("companyName")}
              helperText={showError("companyName") ? errors.companyName : ""}
              size="small"
              sx={commonFieldSx}
              required
            />
            <TextField
              label="Company Website"
              value={values.companyWebsite}
              onChange={handleChange("companyWebsite")}
              error={showError("companyWebsite")}
              helperText={showError("companyWebsite") ? errors.companyWebsite : ""}
              size="small"
              sx={commonFieldSx}
              required
            />
          </Stack>
        ) : (
          <>
            {loginStep === "email" ? (
              <Stack spacing={1.5}>
                <TextField
                  label="Work Email Address"
                  value={loginValues.workEmail}
                  onChange={handleLoginChange("workEmail")}
                  error={showLoginError("workEmail")}
                  helperText={showLoginError("workEmail") ? loginErrors.workEmail : ""}
                  size="small"
                  sx={commonFieldSx}
                  required
                />
              </Stack>
            ) : (
              <Stack alignItems="center" sx={{ pt: 0.5 }}>
                {otpVerifiedTransition ? (
                  <Stack
                    alignItems="center"
                    sx={{
                      py: 3,
                      px: 1,
                      width: "100%",
                      textAlign: "center",
                      "@keyframes otpSuccessIn": {
                        from: { opacity: 0, transform: "scale(0.92) translateY(8px)" },
                        to: { opacity: 1, transform: "scale(1) translateY(0)" },
                      },
                      animation: prefersReducedMotion
                        ? "none"
                        : "otpSuccessIn 0.45s cubic-bezier(0.22, 1, 0.36, 1) forwards",
                    }}
                    role="status"
                    aria-live="polite"
                  >
                    <CheckCircleRoundedIcon
                      sx={{
                        fontSize: 64,
                        color: "success.main",
                        mb: 1.5,
                        filter: "drop-shadow(0 8px 20px rgba(46, 125, 50, 0.22))",
                      }}
                    />
                    <Typography
                      variant="h2"
                      sx={{
                        fontSize: { xs: "24px", md: "24px" },
                        mb: 1,
                        color: "#231F1B",
                        fontWeight: 700,
                      }}
                    >
                      Verified
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ fontSize: "16px", lineHeight: 1.6 }}>
                      Success. Taking you to your workspace…
                    </Typography>
                  </Stack>
                ) : (
                  <>
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: "18px",
                        border: "2px solid #F8DCCF",
                        display: "grid",
                        placeItems: "center",
                        backgroundColor: "#FFF7F2",
                        color: "#F06424",
                        mb: 2.5,
                      }}
                    >
                      <MailOutlineRoundedIcon sx={{ fontSize: 38 }} />
                    </Box>
                    <Typography
                      variant="h2"
                      sx={{
                        fontSize: { xs: "24px", md: "24px" },
                        mb: 2,
                        color: "#231F1B",
                        textAlign: "center",
                      }}
                    >
                      Verify your email
                    </Typography>

                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ fontSize: "18px", textAlign: "center", mb: 4 }}
                    >
                      We&apos;ve sent a 4-digit code to{" "}
                      <Box component="span" sx={{ color: "#1A140F", fontWeight: 600 }}>
                        {loginValues.workEmail || "your email"}
                      </Box>
                    </Typography>

                    <Stack
                      key={otpShakeGeneration}
                      direction="row"
                      spacing={1.25}
                      sx={{
                        mb: otpError ? 1.5 : 4,
                        "@keyframes otpShake": {
                          "0%, 100%": { transform: "translateX(0)" },
                          "15%": { transform: "translateX(-7px)" },
                          "30%": { transform: "translateX(7px)" },
                          "45%": { transform: "translateX(-5px)" },
                          "60%": { transform: "translateX(5px)" },
                          "75%": { transform: "translateX(-2px)" },
                        },
                        animation:
                          otpShakeGeneration > 0 && !prefersReducedMotion
                            ? "otpShake 0.42s cubic-bezier(0.36, 0.07, 0.19, 0.97) both"
                            : "none",
                      }}
                    >
                      {otp.map((digit, index) => (
                        <TextField
                          key={index}
                          value={digit}
                          onChange={handleOtpChange(index)}
                          onKeyDown={handleOtpKeyDown(index)}
                          inputRef={(node) => {
                            otpRefs.current[index] = node;
                          }}
                          inputProps={{
                            inputMode: "numeric",
                            maxLength: 1,
                            style: { textAlign: "center", fontSize: "28px", fontWeight: 600 },
                            "aria-invalid": otpError ? true : undefined,
                          }}
                          error={otpHasError}
                          sx={{
                            width: 74,
                            "& .MuiOutlinedInput-root": {
                              borderRadius: "18px",
                              backgroundColor: "#FFFFFF",
                              boxShadow: "0 2px 10px rgba(40, 32, 23, 0.06)",
                            },
                            "& .MuiOutlinedInput-input": {
                              py: 1.9,
                            },
                          }}
                        />
                      ))}
                    </Stack>
                    {otpError ? (
                      <Typography
                        role="alert"
                        sx={{
                          color: "error.main",
                          fontSize: "0.875rem",
                          fontWeight: 600,
                          textAlign: "center",
                          mb: 3,
                          maxWidth: 340,
                        }}
                      >
                        {otpError}
                      </Typography>
                    ) : null}

                    <Stack direction="row" spacing={0.75} alignItems="center" sx={{ mb: otpError ? 6 : 8 }}>
                      <AutorenewRoundedIcon sx={{ color: "#F06424", fontSize: 24 }} />
                      <Typography sx={{ color: "#8A8178", fontSize: "17px", fontWeight: 600 }}>
                        {resendCountdown > 0 ? `Resend code in ${resendCountdown}s` : "Resend code"}
                      </Typography>
                    </Stack>
                  </>
                )}
              </Stack>
            )}
          </>
        )}

        {mode === "signup" && signupRequestSubmitted ? null : mode === "login" && loginStep === "otp" ? null : (
          <Button type="submit" variant="contained" size="medium" sx={{ mt: 3 }}>
            {mode === "signup" ? "Create Account" : "Login"}
          </Button>
        )}

        {successMessage ? (
          <Alert severity="success" sx={{ borderRadius: 3, mt: 2 }}>
            {successMessage}
          </Alert>
        ) : null}

        {mode === "signup" && signupRequestSubmitted ? null : mode === "signup" ? (
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center", mt: 2 }}>
            Already have an account?{" "}
            <Link
              href="#"
              underline="hover"
              sx={{ fontWeight: 700 }}
              onClick={(event) => {
                event.preventDefault();
                setMode("login");
                setLoginStep("email");
                setSignupRequestSubmitted(false);
                setDidSubmit(false);
                setSuccessMessage("");
              }}
            >
              Log in
            </Link>
          </Typography>
        ) : (
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center", mt: 2 }}>
            {loginStep === "email" ? "Need an account? " : "Wrong email? "}
            <Link
              href="#"
              underline="hover"
              sx={{ fontWeight: 700 }}
              onClick={(event) => {
                event.preventDefault();
                if (loginStep === "email") {
                  setMode("signup");
                } else {
                  setLoginStep("email");
                  setOtpShakeGeneration(0);
                  setOtpVerifiedTransition(false);
                  setOtpError("");
                  otpVerifyInFlightRef.current = false;
                }
                setSignupRequestSubmitted(false);
                setDidSubmit(false);
                setSuccessMessage("");
              }}
            >
              {loginStep === "email" ? "Sign up" : "Change it"}
            </Link>
          </Typography>
        )}
      </Stack>
    </Box>
  );
}
