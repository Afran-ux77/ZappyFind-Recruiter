import { useEffect, useState } from "react";
import { Box, Button, Stack, Typography, useMediaQuery } from "@mui/material";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { keyframes } from "@mui/system";

const PRIMARY = "#F8723A";
const PRIMARY_DARK = "#C4511A";
const INK = "#17120E";
const MUTED = "#6B635C";
const FAINT = "#9C948C";

/* Card geometry (room for 3 text lines + border; scroll math stays consistent) */
const CARD_H = 78;
const CARD_GAP = 10;
const CARD_STEP = CARD_H + CARD_GAP;
/** Inner height used for scroll and winner centering */
const VIEWPORT_CONTENT_H = 300;
/** Room inside the overflow clip so card box-shadows are not cut off */
const VIEWPORT_SHADOW_PAD_Y = 14;
const VIEWPORT_H = VIEWPORT_CONTENT_H + 2 * VIEWPORT_SHADOW_PAD_Y;
const WINNER_IDX = 8;
const BOTTOM_SPACER = Math.round(VIEWPORT_CONTENT_H / 2 - CARD_H / 2);
const FINAL_Y = WINNER_IDX * CARD_STEP - BOTTOM_SPACER;

const ENTER_MS = 700;
const SCROLL_MS = 4400;
/** Cards scroll immediately on mount (no stagger with glass panel intro). */
const SCROLL_ANIMATION_DELAY_MS = 0;
/** Show Best tag and winner styling this many ms before the scroll animation finishes. */
const BEST_REVEAL_BEFORE_SCROLL_END_MS = 3000;
const SETTLED_AT =
  SCROLL_ANIMATION_DELAY_MS + SCROLL_MS - BEST_REVEAL_BEFORE_SCROLL_END_MS;

/** Ease-out-expo style: calm start, fluid middle, soft premium landing */
const SCROLL_EASING = "cubic-bezier(0.16, 1, 0.3, 1)";

const screenFadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const glassSlideIn = keyframes`
  from { opacity: 0; transform: translateY(24px) scale(0.97); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

const cardScroll = keyframes`
  0% { transform: translate3d(0, 0, 0); }
  100% { transform: translate3d(0, -${FINAL_Y}px, 0); }
`;

const badgeReveal = keyframes`
  from { opacity: 0; transform: translateY(-4px) scale(0.9); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

const winnerRing = keyframes`
  0%, 100% {
    box-shadow: 0 0 0 1px ${PRIMARY}, 0 8px 22px rgba(248, 114, 58, 0.14);
  }
  50% {
    box-shadow: 0 0 0 2px rgba(248, 114, 58, 0.28), 0 12px 28px rgba(248, 114, 58, 0.2);
  }
`;

const CANDIDATES = [
  { id: 1, name: "Marcus Reid", role: "Backend Engineer", insight: "API platforms, high scale", match: 79 },
  { id: 2, name: "Yuna Sato", role: "Product Designer", insight: "Systems thinking, research", match: 72 },
  { id: 3, name: "Daniel Osei", role: "Data Scientist", insight: "Production ML, SQL depth", match: 81 },
  { id: 4, name: "Priya Nair", role: "DevOps Engineer", insight: "K8s, zero-downtime deploys", match: 76 },
  { id: 5, name: "Luca Ferretti", role: "iOS Engineer", insight: "Consumer apps at scale", match: 83 },
  { id: 6, name: "Amara Diallo", role: "Growth Lead", insight: "Experiment-led growth", match: 68 },
  { id: 7, name: "Tom Fischer", role: "Security Engineer", insight: "SOC2, zero-trust", match: 74 },
  { id: 8, name: "Mei Lin", role: "Frontend Engineer", insight: "Real-time collaboration", match: 86 },
  {
    id: 9,
    name: "Sofia Andersen",
    role: "Staff Backend Engineer",
    insight: "Strong match for backend-heavy roles",
    match: 97,
    isWinner: true,
  },
  {
    id: 10,
    name: "Jordan Hayes",
    role: "Platform Engineer",
    insight: "Infra as code, reliability at scale",
    match: 71,
  },
  {
    id: 11,
    name: "Nina Okonkwo",
    role: "ML Engineer",
    insight: "Model serving, eval pipelines, Python depth",
    match: 73,
  },
];

const AVATAR_PALETTES = [
  { bg: "#FEE2E2", fg: "#9B1C1C" },
  { bg: "#DBEAFE", fg: "#1D4ED8" },
  { bg: "#D1FAE5", fg: "#065F46" },
  { bg: "#FEF3C7", fg: "#92400E" },
  { bg: "#EDE9FE", fg: "#5B21B6" },
  { bg: "#FCE7F3", fg: "#9D174D" },
  { bg: "#CCFBF1", fg: "#0F766E" },
  { bg: "#E0F2FE", fg: "#0369A1" },
  { bg: "#FFF7ED", fg: "#C2410C" },
  { bg: "#F3E8FF", fg: "#6B21A8" },
];

function initials(name) {
  return name.split(" ").slice(0, 2).map((n) => n[0]).join("");
}

function CandidateCard({ candidate, index, settled, reducedMotion }) {
  const isWinner = !!candidate.isWinner;
  const palette = AVATAR_PALETTES[index % AVATAR_PALETTES.length];
  const winnerActive = isWinner && settled;

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: CARD_H,
        height: CARD_H,
        flexShrink: 0,
        boxSizing: "border-box",
        borderRadius: "12px",
        px: "12px",
        py: "9px",
        backgroundColor: winnerActive ? "rgba(255, 250, 246, 0.95)" : "rgba(255, 255, 255, 0.92)",
        border: "1px solid",
        borderColor: winnerActive ? "rgba(248, 114, 58, 0.28)" : "rgba(220, 212, 202, 0.55)",
        boxShadow: "0 1px 4px rgba(18, 10, 4, 0.04)",
        overflow: "visible",
        transition: reducedMotion
          ? "none"
          : "border-color 0.1s ease-out, background-color 0.1s ease-out, box-shadow 0.1s ease-out",
        ...(winnerActive && !reducedMotion ? { animation: `${winnerRing} 2.6s ease-in-out 0s infinite` } : {}),
      }}
    >
      {winnerActive && (
        <Box
          aria-label="Best match"
          sx={{
            position: "absolute",
            top: 7,
            right: 9,
            background: `linear-gradient(118deg, ${PRIMARY} 0%, #FF8046 100%)`,
            color: "#fff",
            fontSize: "8px",
            fontWeight: 800,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            px: "7px",
            py: "2px",
            borderRadius: "100px",
            animation: reducedMotion ? "none" : `${badgeReveal} 0.2s cubic-bezier(0.22, 1, 0.36, 1) forwards`,
          }}
        >
          Best
        </Box>
      )}

      <Stack direction="row" spacing={1.25} alignItems="center">
        <Box
          aria-hidden
          sx={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            backgroundColor: palette.bg,
            color: palette.fg,
            fontSize: "10.5px",
            fontWeight: 800,
            display: "grid",
            placeItems: "center",
            flexShrink: 0,
          }}
        >
          {initials(candidate.name)}
        </Box>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: "1px" }}>
            <Typography
              sx={{
                fontSize: "12.5px",
                fontWeight: 700,
                color: INK,
                letterSpacing: "-0.01em",
                lineHeight: 1.25,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {candidate.name}
            </Typography>
            {!isWinner && (
              <Typography sx={{ fontSize: "10px", fontWeight: 700, color: FAINT, ml: 1, flexShrink: 0 }}>
                {candidate.match}%
              </Typography>
            )}
          </Stack>
          <Typography
            sx={{
              fontSize: "10.5px",
              fontWeight: 500,
              color: MUTED,
              lineHeight: 1.25,
              mb: "3px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {candidate.role}
          </Typography>
          <Typography
            sx={{
              fontSize: "10px",
              fontStyle: "italic",
              color: winnerActive ? PRIMARY_DARK : FAINT,
              lineHeight: 1.35,
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            {candidate.insight}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}

const VIEWPORT_FEATHER =
  "linear-gradient(to bottom, transparent 0%, #000 9%, #000 91%, transparent 100%)";

function CardStream({ settled, reducedMotion }) {
  return (
    <Box
      aria-label="AI candidate matching"
      aria-live="polite"
      sx={{
        position: "relative",
        height: VIEWPORT_H,
        overflow: "hidden",
        borderRadius: "14px",
        /* Vertical inset inside the clip so box-shadows paint inside the padding band */
        pt: `${VIEWPORT_SHADOW_PAD_Y}px`,
        pb: `${VIEWPORT_SHADOW_PAD_Y}px`,
        px: "10px",
        mx: "-2px",
        boxSizing: "border-box",
        /* Feather top and bottom so cards soften instead of hard-cutting */
        WebkitMaskImage: VIEWPORT_FEATHER,
        maskImage: VIEWPORT_FEATHER,
        WebkitMaskSize: "100% 100%",
        maskSize: "100% 100%",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: `${CARD_GAP}px`,
          willChange: reducedMotion ? "auto" : "transform",
          backfaceVisibility: "hidden",
          ...(reducedMotion
            ? { transform: `translate3d(0, -${FINAL_Y}px, 0)` }
            : {
                animation: `${cardScroll} ${SCROLL_MS}ms ${SCROLL_EASING} ${SCROLL_ANIMATION_DELAY_MS}ms forwards`,
              }),
        }}
      >
        {CANDIDATES.map((c, i) => (
          <CandidateCard key={c.id} candidate={c} index={i} settled={settled} reducedMotion={reducedMotion} />
        ))}
        <Box sx={{ height: BOTTOM_SPACER, flexShrink: 0 }} aria-hidden />
      </Box>
    </Box>
  );
}

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

export default function RecruiterWelcomeScreen({ onCreateJob, isExiting = false }) {
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)", { noSsr: true });
  const [settled, setSettled] = useState(reducedMotion);

  useEffect(() => {
    if (reducedMotion) {
      setSettled(true);
      return undefined;
    }
    const t = setTimeout(() => setSettled(true), SETTLED_AT);
    return () => clearTimeout(t);
  }, [reducedMotion]);

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
        opacity: isExiting ? 0 : 1,
        pointerEvents: isExiting ? "none" : "auto",
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
        {/* Single glass panel (no outer white shell) */}
        <Box
          sx={{
            width: "100%",
            maxWidth: { xs: "100%", sm: 720, md: 1120 },
            minHeight: { xs: "min-content", sm: 500, md: 805 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            borderRadius: { xs: "22px", md: "26px" },
            p: { xs: "20px 18px", sm: "26px 28px", md: "56px" },
            backdropFilter: "blur(26px) saturate(165%)",
            WebkitBackdropFilter: "blur(26px) saturate(165%)",
            background:
              "linear-gradient(152deg, rgba(255, 252, 250, 0.5) 0%, rgba(255, 247, 242, 1) 45%, rgba(255, 243, 236, 1) 100%)",
            border: "1px solid rgba(255, 255, 255, 0.78)",
            boxShadow: [
              "inset 0 1px 0 rgba(255, 255, 255, 0.7)",
              "0 28px 64px rgba(18, 10, 4, 0.09)",
              "0 8px 20px rgba(18, 10, 4, 0.05)",
            ].join(", "),
            animation: reducedMotion
              ? "none"
              : `${glassSlideIn} ${ENTER_MS}ms cubic-bezier(0.22, 1, 0.36, 1) forwards`,
            opacity: reducedMotion ? 1 : 0,
            transform: isExiting ? "scale(0.985)" : "scale(1)",
            transition: reducedMotion ? "none" : "transform 340ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <Box sx={{ width: "100%", maxWidth: { xs: "100%", sm: 720, md: 800 }, mx: "auto" }}>
            {/* Animation on top */}
            <Box sx={{ mb: { xs: 2.5, md: 3 } }}>
              <CardStream settled={settled} reducedMotion={reducedMotion} />
            </Box>

            <Box sx={{ mb: { xs: 2.5, md: 3 }, maxWidth: 520, mx: "auto", textAlign: "center" }}>
              <Typography
                component="h1"
                sx={{
                  fontSize: { xs: "1.125rem", sm: "1.25rem", md: "1.35rem" },
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.35,
                  color: INK,
                  mb: 0.75,
                }}
              >
                Find the right people before they even apply
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: "0.8125rem", md: "0.875rem" },
                  fontWeight: 400,
                  lineHeight: 1.55,
                  color: MUTED,
                }}
              >
                Post a role and let AI surface candidates scored on the skills that actually matter to your team.
              </Typography>
            </Box>

            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              onClick={onCreateJob}
              endIcon={<ChevronRightRoundedIcon sx={{ fontSize: 20 }} />}
              sx={{
                maxWidth: 400,
                mx: "auto",
                display: "flex",
                py: "14px",
                fontSize: "15px",
                fontWeight: 700,
                borderRadius: "16px",
                textTransform: "none",
                boxShadow: "0 10px 28px rgba(248, 114, 58, 0.35)",
                "&:hover": {
                  boxShadow: "0 12px 32px rgba(248, 114, 58, 0.42)",
                },
              }}
            >
              Get Started
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
