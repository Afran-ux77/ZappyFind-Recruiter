import { Box, Button, Stack, Typography, useMediaQuery } from "@mui/material";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { keyframes } from "@mui/system";

const PRIMARY = "#F8723A";
const INK = "#17120E";
const MUTED = "#6B635C";
const FAINT = "#9C948C";

const screenFadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const cardUp = keyframes`
  from { opacity: 0; transform: translateY(32px); }
  to { opacity: 1; transform: translateY(0); }
`;

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const ENTER_MS = 600;
const STAGGER = 120;

const PLANS = [
  {
    id: "basic",
    name: "Basic",
    description: "For small teams getting started with AI-powered hiring.",
    price: "$12",
    period: "mo",
    featuresLabel: "What's included:",
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
    badge: "Most Popular",
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

function Blob({ sx }) {
  return (
    <Box
      aria-hidden
      sx={{
        position: "absolute",
        borderRadius: "50%",
        pointerEvents: "none",
        filter: "blur(72px)",
        willChange: "transform",
        ...sx,
      }}
    />
  );
}

function PlanCard({ plan, isSelected, reducedMotion, index }) {
  const popular = plan.emphasized;

  return (
    <Box
      sx={{
        flex: popular ? "1.12 1 0" : "1 1 0",
        minWidth: 0,
        position: "relative",
        borderRadius: "20px",
        ...(popular
          ? {
              p: "2px",
              background: `linear-gradient(160deg, ${PRIMARY} 0%, #FF9B60 40%, #FFCBA4 70%, ${PRIMARY} 100%)`,
              backgroundSize: "300% 300%",
              animation: reducedMotion ? "none" : `${shimmer} 6s ease-in-out infinite`,
              transform: { md: "scale(1.04)" },
              zIndex: 2,
              boxShadow: "0 20px 48px rgba(248, 114, 58, 0.18), 0 0 0 1px rgba(248, 114, 58, 0.08)",
            }
          : {
              border: "1px solid",
              borderColor: isSelected ? PRIMARY : "rgba(220, 212, 202, 0.55)",
              boxShadow: isSelected
                ? "0 8px 28px rgba(248, 114, 58, 0.10)"
                : "0 2px 12px rgba(18, 10, 4, 0.04)",
              zIndex: 1,
            }),
        opacity: 0,
        animation: reducedMotion
          ? "none"
          : `${cardUp} 0.55s cubic-bezier(0.22, 1, 0.36, 1) ${ENTER_MS + index * STAGGER}ms forwards`,
        ...(reducedMotion ? { opacity: 1 } : {}),
        transition: "border-color 0.25s ease, box-shadow 0.25s ease",
      }}
    >
      <Box
        sx={{
          borderRadius: popular ? "18px" : "20px",
          backgroundColor: popular ? "rgba(255, 253, 250, 0.97)" : "#FFFFFF",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          p: { xs: "22px 20px", md: "28px 24px" },
          position: "relative",
          overflow: "hidden",
        }}
      >
        {popular && (
          <Box
            aria-hidden
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 3,
              background: `linear-gradient(90deg, ${PRIMARY}, #FF9B60, ${PRIMARY})`,
              backgroundSize: "200% 100%",
              animation: reducedMotion ? "none" : `${shimmer} 4s ease-in-out infinite`,
            }}
          />
        )}

        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1.5 }}>
          <Typography
            sx={{
              fontSize: { xs: "1rem", md: "1.0625rem" },
              fontWeight: 700,
              color: INK,
              letterSpacing: "-0.01em",
            }}
          >
            {plan.name}
          </Typography>
          {plan.badge && (
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                background: `linear-gradient(118deg, ${PRIMARY} 0%, #FF8046 100%)`,
                color: "#fff",
                fontSize: "9.5px",
                fontWeight: 800,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                px: "8px",
                py: "3px",
                borderRadius: "100px",
              }}
            >
              <StarRoundedIcon sx={{ fontSize: 10 }} />
              {plan.badge}
            </Box>
          )}
          {isSelected && !popular && (
            <Box
              sx={{
                ml: "auto",
                width: 20,
                height: 20,
                borderRadius: "50%",
                backgroundColor: PRIMARY,
                display: "grid",
                placeItems: "center",
                flexShrink: 0,
              }}
            >
              <CheckRoundedIcon sx={{ fontSize: 13, color: "#fff" }} />
            </Box>
          )}
        </Stack>

        <Typography
          sx={{
            fontSize: "0.8125rem",
            color: MUTED,
            lineHeight: 1.5,
            mb: 2.5,
            minHeight: { md: 40 },
          }}
        >
          {plan.description}
        </Typography>

        <Box sx={{ mb: 2.5, display: "flex", alignItems: "baseline" }}>
          <Typography
            component="span"
            sx={{
              fontSize: { xs: "2rem", md: "2.25rem" },
              fontWeight: 800,
              color: INK,
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
          >
            {plan.price}
          </Typography>
          <Typography
            component="span"
            sx={{
              fontSize: "0.8125rem",
              color: FAINT,
              ml: 0.5,
              fontWeight: 500,
            }}
          >
            /{plan.period}
          </Typography>
        </Box>

        <Box
          sx={{
            width: "100%",
            height: "1px",
            backgroundColor: "rgba(220, 212, 202, 0.45)",
            mb: 2,
          }}
        />

        <Typography
          sx={{
            fontSize: "0.6875rem",
            fontWeight: 700,
            letterSpacing: "0.06em",
            color: popular ? PRIMARY : FAINT,
            textTransform: "uppercase",
            mb: 1.5,
          }}
        >
          {plan.featuresLabel}
        </Typography>

        <Stack spacing={1.25} component="ul" sx={{ listStyle: "none", m: 0, p: 0, flex: 1 }}>
          {plan.features.map((line) => (
            <Stack
              key={line}
              direction="row"
              spacing={1}
              component="li"
              alignItems="flex-start"
            >
              <Box
                aria-hidden
                sx={{
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  backgroundColor: popular ? PRIMARY : "rgba(248, 114, 58, 0.12)",
                  display: "grid",
                  placeItems: "center",
                  flexShrink: 0,
                  mt: "2px",
                }}
              >
                <CheckRoundedIcon
                  sx={{ fontSize: 10, color: popular ? "#fff" : PRIMARY }}
                />
              </Box>
              <Typography
                sx={{
                  fontSize: "0.8125rem",
                  color: INK,
                  lineHeight: 1.45,
                  fontWeight: popular ? 500 : 400,
                }}
              >
                {line}
              </Typography>
            </Stack>
          ))}
        </Stack>

        {popular && (
          <Box
            sx={{
              mt: 2.5,
              py: "7px",
              px: "12px",
              borderRadius: "10px",
              backgroundColor: "rgba(248, 114, 58, 0.06)",
              border: "1px solid rgba(248, 114, 58, 0.12)",
              textAlign: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: "0.75rem",
                fontWeight: 600,
                color: PRIMARY,
                letterSpacing: "0.01em",
              }}
            >
              Recommended for most teams
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default function RecruiterPricingScreen({
  onContinue,
  isEntering = false,
  isExiting = false,
}) {
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)", { noSsr: true });
  const layerHidden = isEntering || isExiting;

  return (
    <Box
      role="main"
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 1500,
        background: [
          "radial-gradient(ellipse 78% 62% at -4% 4%, rgba(255, 186, 150, 0.5) 0%, transparent 58%)",
          "radial-gradient(ellipse 52% 58% at 104% 94%, rgba(248, 156, 104, 0.28) 0%, transparent 52%)",
          "radial-gradient(ellipse 58% 40% at 98% 6%, rgba(253, 228, 200, 0.38) 0%, transparent 50%)",
          "#F7F3EE",
        ].join(", "),
        animation: reducedMotion ? "none" : `${screenFadeIn} ${ENTER_MS}ms ease forwards`,
        opacity: layerHidden ? 0 : 1,
        pointerEvents: layerHidden ? "none" : "auto",
        transition: reducedMotion ? "none" : "opacity 340ms cubic-bezier(0.22, 1, 0.36, 1)",
        overflow: "auto",
      }}
    >
      <Blob
        sx={{
          width: 580,
          height: 580,
          top: "-16%",
          left: "-10%",
          background: "radial-gradient(circle, rgba(255, 176, 128, 0.38) 0%, transparent 66%)",
        }}
      />
      <Blob
        sx={{
          width: 400,
          height: 400,
          bottom: "-10%",
          right: "-6%",
          background: "radial-gradient(circle, rgba(248, 148, 92, 0.26) 0%, transparent 66%)",
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
            maxWidth: { xs: "100%", sm: 960, md: 1120 },
            minHeight: { xs: "min-content", sm: 640, md: 805 },
            display: "flex",
            flexDirection: "column",
            borderRadius: isEntering ? { xs: "22px", md: "26px" } : { xs: "22px", md: "28px" },
            p: isEntering
              ? { xs: "20px 18px", sm: "26px 28px", md: "56px" }
              : { xs: "24px 18px", sm: "32px 28px", md: "56px 56px 52px" },
            backdropFilter: "blur(26px) saturate(165%)",
            WebkitBackdropFilter: "blur(26px) saturate(165%)",
            background:
              "linear-gradient(152deg, rgba(255, 255, 255, 0.58) 0%, rgba(255, 245, 236, 0.46) 45%, rgba(255, 230, 212, 0.42) 100%)",
            border: "1px solid rgba(255, 255, 255, 0.78)",
            boxShadow: [
              "inset 0 1px 0 rgba(255, 255, 255, 0.7)",
              "0 28px 64px rgba(18, 10, 4, 0.09)",
              "0 8px 20px rgba(18, 10, 4, 0.05)",
            ].join(", "),
            opacity: isEntering ? 0.72 : 1,
            transform: isEntering ? "translateY(14px) scale(0.94)" : "translateY(0) scale(1)",
            transition: reducedMotion
              ? "none"
              : "max-width 520ms cubic-bezier(0.16, 1, 0.3, 1), min-height 520ms cubic-bezier(0.16, 1, 0.3, 1), padding 520ms cubic-bezier(0.16, 1, 0.3, 1), border-radius 520ms cubic-bezier(0.16, 1, 0.3, 1), opacity 420ms cubic-bezier(0.22, 1, 0.36, 1), transform 520ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <Box sx={{ width: "100%", maxWidth: { xs: "100%", sm: 720, md: 800 }, mx: "auto" }}>
            {/* Header */}
            <Box sx={{ textAlign: "center", mb: { xs: 4, md: 5 } }}>
              <Typography
                component="h1"
                sx={{
                  fontSize: { xs: "1.375rem", sm: "1.5rem", md: "1.75rem" },
                  fontWeight: 800,
                  letterSpacing: "-0.025em",
                  color: INK,
                  mb: { xs: 1.25, md: 1.5 },
                  lineHeight: 1.2,
                }}
              >
                You're starting with{" "}
                <Box
                  component="span"
                  sx={{
                    background: `linear-gradient(118deg, ${PRIMARY}, #FF9B60)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Basic
                </Box>
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: "0.75rem", sm: "0.8125rem", md: "0.9375rem" },
                  color: MUTED,
                  mx: "auto",
                  lineHeight: 1.45,
                  whiteSpace: "nowrap",
                  textAlign: "center",
                  maxWidth: "100%",
                }}
              >
                Your Basic plan is ready. You can upgrade anytime from billing settings.
              </Typography>
            </Box>

            {/* Plan cards */}
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={{ xs: 2.5, md: 3 }}
              sx={{
                alignItems: { md: "stretch" },
                mb: { xs: 4, md: 5 },
              }}
            >
              {PLANS.map((plan, i) => (
                <PlanCard
                  key={plan.id}
                  plan={plan}
                  isSelected={plan.id === "basic"}
                  reducedMotion={reducedMotion}
                  index={i}
                />
              ))}
            </Stack>

            {/* CTA */}
            <Box sx={{ textAlign: "center", pt: { xs: 0.5, md: 1 } }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => onContinue("basic")}
                endIcon={<ArrowForwardRoundedIcon sx={{ fontSize: 18 }} />}
                sx={{
                  minWidth: { xs: "100%", sm: 320 },
                  maxWidth: 400,
                  py: "14px",
                  px: 5,
                  fontSize: "15px",
                  fontWeight: 700,
                  borderRadius: "16px",
                  textTransform: "none",
                  boxShadow: "0 10px 28px rgba(248, 114, 58, 0.35)",
                  "&:hover": {
                    boxShadow: "0 14px 36px rgba(248, 114, 58, 0.42)",
                    transform: "translateY(-1px)",
                  },
                  transition: "box-shadow 0.25s ease, transform 0.25s ease",
                }}
              >
                Continue with Basic
              </Button>
              <Typography
                sx={{
                  fontSize: "0.75rem",
                  color: FAINT,
                  mt: 1.5,
                }}
              >
                No credit card required to get started
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
