import { Box, Stack, Typography } from "@mui/material";
import HubRoundedIcon from "@mui/icons-material/HubRounded";

const CARD_PALETTES = [
  { bg: "rgba(255,253,250,0.88)", border: "rgba(180,165,140,0.3)", accent: "#8B7355", pill: "rgba(139,115,85,0.09)", ring: "rgba(139,115,85,0.15)" },
  { bg: "rgba(249,255,250,0.88)", border: "rgba(140,178,148,0.3)", accent: "#4E7A52", pill: "rgba(78,122,82,0.09)", ring: "rgba(78,122,82,0.15)" },
  { bg: "rgba(250,248,255,0.88)", border: "rgba(168,155,198,0.3)", accent: "#6B5B8A", pill: "rgba(107,91,138,0.09)", ring: "rgba(107,91,138,0.15)" },
  { bg: "rgba(255,252,245,0.88)", border: "rgba(198,182,140,0.3)", accent: "#8A7B42", pill: "rgba(138,123,66,0.09)", ring: "rgba(138,123,66,0.15)" },
  { bg: "rgba(245,251,255,0.88)", border: "rgba(140,178,205,0.3)", accent: "#3E7A9A", pill: "rgba(62,122,154,0.09)", ring: "rgba(62,122,154,0.15)" },
  { bg: "rgba(255,248,248,0.88)", border: "rgba(198,155,155,0.3)", accent: "#9A5252", pill: "rgba(154,82,82,0.09)", ring: "rgba(154,82,82,0.15)" },
  { bg: "rgba(247,255,252,0.88)", border: "rgba(148,195,180,0.3)", accent: "#3E8A72", pill: "rgba(62,138,114,0.09)", ring: "rgba(62,138,114,0.15)" },
  { bg: "rgba(255,253,245,0.88)", border: "rgba(188,182,148,0.3)", accent: "#6E6E3E", pill: "rgba(110,110,62,0.09)", ring: "rgba(110,110,62,0.15)" },
];

const C = [
  { n: "Sarah Chen", r: "Senior Product Designer", s: 96, i: "SC", q: "Exceptional portfolio depth", k: ["Figma", "Systems", "UX"], t: 0 },
  { n: "Marcus Rivera", r: "Full Stack Engineer", s: 92, i: "MR", q: "Strong system design skills", k: ["React", "Node", "AWS"], t: 1 },
  { n: "Priya Sharma", r: "Data Scientist", s: 94, i: "PS", q: "Published ML researcher", k: ["Python", "ML", "Stats"], t: 2 },
  { n: "James O'Brien", r: "DevOps Lead", s: 89, i: "JO", q: "Scale-tested infrastructure", k: ["K8s", "Terraform"], t: 3 },
  { n: "Aisha Patel", r: "UX Researcher", s: 91, i: "AP", q: "Mixed-methods specialist", k: ["Research", "Analytics"], t: 4 },
  { n: "Tomás García", r: "iOS Developer", s: 88, i: "TG", q: "App Store featured twice", k: ["Swift", "UIKit"], t: 5 },
  { n: "Elena Volkov", r: "Product Manager", s: 95, i: "EV", q: "Led three 0→1 launches", k: ["Strategy", "Agile"], t: 6 },
  { n: "David Kim", r: "ML Engineer", s: 93, i: "DK", q: "LLM fine-tuning expert", k: ["PyTorch", "NLP", "MLOps"], t: 7 },
  { n: "Nina Andersen", r: "Frontend Engineer", s: 90, i: "NA", q: "Performance optimization", k: ["React", "TypeScript"], t: 0 },
  { n: "Raj Mehta", r: "Backend Engineer", s: 87, i: "RM", q: "Distributed systems expert", k: ["Go", "gRPC", "Redis"], t: 1 },
  { n: "Sophie Laurent", r: "Brand Designer", s: 94, i: "SL", q: "Award-winning identities", k: ["Branding", "Motion"], t: 2 },
  { n: "Alex Turner", r: "Security Engineer", s: 91, i: "AT", q: "Zero-breach track record", k: ["Pentest", "Cloud"], t: 3 },
  { n: "Yuki Tanaka", r: "QA Lead", s: 86, i: "YT", q: "Automation-first approach", k: ["Cypress", "Jest", "CI"], t: 4 },
  { n: "Omar Hassan", r: "Data Engineer", s: 92, i: "OH", q: "Petabyte-scale pipelines", k: ["Spark", "Airflow"], t: 5 },
  { n: "Clara Müller", r: "Engineering Lead", s: 97, i: "CM", q: "Team builder & mentor", k: ["Architecture", "Agile"], t: 6 },
  { n: "Leo Rossi", r: "Mobile Developer", s: 89, i: "LR", q: "Cross-platform specialist", k: ["Flutter", "RN"], t: 7 },
  { n: "Maya Johnson", r: "Growth Marketing", s: 90, i: "MJ", q: "3x ARR at Series B", k: ["SEO", "Analytics"], t: 0 },
  { n: "Ryan Park", r: "Platform Engineer", s: 93, i: "RP", q: "Built internal dev tools", k: ["Rust", "Linux"], t: 1 },
  { n: "Ines Costa", r: "Content Strategist", s: 88, i: "IC", q: "Scaled content ops 10x", k: ["Editorial", "AI"], t: 2 },
  { n: "Ben Williams", r: "Cloud Architect", s: 95, i: "BW", q: "Multi-cloud migrations", k: ["AWS", "GCP", "IaC"], t: 3 },
  { n: "Lena Fischer", r: "Analytics Engineer", s: 91, i: "LF", q: "Self-serve BI advocate", k: ["dbt", "SQL", "Looker"], t: 4 },
  { n: "Kai Nakamura", r: "Design Engineer", s: 94, i: "KN", q: "Where code meets craft", k: ["React", "Motion"], t: 5 },
  { n: "Zara Ahmed", r: "Engineering Manager", s: 96, i: "ZA", q: "Shipped 12 major releases", k: ["Leadership", "Ops"], t: 6 },
  { n: "Carlos Mendez", r: "API Engineer", s: 87, i: "CD", q: "RESTful design purist", k: ["GraphQL", "Node"], t: 7 },
  { n: "Hannah Brooks", r: "HR Tech Lead", s: 93, i: "HB", q: "ATS integration expert", k: ["Workday", "SAP"], t: 0 },
  { n: "Viktor Novak", r: "Site Reliability Eng.", s: 90, i: "VN", q: "Achieved 99.99% uptime", k: ["Prometheus", "K8s"], t: 1 },
  { n: "Amara Obi", r: "Product Analyst", s: 88, i: "AO", q: "Data storytelling pro", k: ["Tableau", "Python"], t: 2 },
  { n: "Finn O'Sullivan", r: "Blockchain Dev", s: 85, i: "FO", q: "Smart contract auditor", k: ["Solidity", "Web3"], t: 3 },
];

/** One full seamless loop duration (seconds). Same for every row — slow, linear, even motion. */
const SHOWCASE_SCROLL_DURATION_S = 280;

const ROWS = [
  { cards: C.slice(0, 8), dir: "left" },
  { cards: C.slice(8, 15), dir: "right" },
  { cards: C.slice(15, 23), dir: "left" },
  { cards: C.slice(4, 12), dir: "right" },
  { cards: C.slice(12, 20), dir: "left" },
  { cards: C.slice(20, 28), dir: "right" },
  { cards: C.slice(2, 10), dir: "left" },
];

function CandidateCard({ n, r, s, i, q, k, t: ti }) {
  const p = CARD_PALETTES[ti % CARD_PALETTES.length];
  return (
    <Box
      sx={{
        width: 218,
        flexShrink: 0,
        borderRadius: "14px",
        bgcolor: p.bg,
        border: `1px solid ${p.border}`,
        p: "13px 15px",
        boxShadow:
          "0 1px 2px rgba(0,0,0,0.04), 0 2px 8px rgba(0,0,0,0.025), 0 8px 24px rgba(0,0,0,0.018)",
      }}
    >
      <Stack direction="row" alignItems="center" spacing={0.75} sx={{ mb: 0.6 }}>
        <Box
          sx={{
            width: 30,
            height: 30,
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${p.pill}, ${p.ring})`,
            color: p.accent,
            fontSize: "0.6rem",
            fontWeight: 700,
            display: "grid",
            placeItems: "center",
            flexShrink: 0,
            letterSpacing: "0.03em",
            border: `1.5px solid ${p.ring}`,
          }}
        >
          {i}
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            sx={{
              fontSize: "0.76rem",
              fontWeight: 700,
              color: "#453C35",
              lineHeight: 1.15,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              letterSpacing: "-0.01em",
            }}
          >
            {n}
          </Typography>
          <Typography
            sx={{
              fontSize: "0.62rem",
              fontWeight: 500,
              color: "#7A6E62",
              lineHeight: 1.25,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {r}
          </Typography>
        </Box>
        <Box
          sx={{
            fontSize: "0.68rem",
            fontWeight: 800,
            color: p.accent,
            bgcolor: p.pill,
            borderRadius: "8px",
            px: 0.7,
            py: 0.25,
            flexShrink: 0,
            lineHeight: 1.3,
            letterSpacing: "-0.02em",
          }}
        >
          {s}%
        </Box>
      </Stack>
      <Box sx={{ height: "1px", bgcolor: p.border, my: 0.5, opacity: 0.7 }} />
      <Typography
        sx={{
          fontSize: "0.6rem",
          fontWeight: 500,
          color: "#6B5D52",
          fontStyle: "italic",
          lineHeight: 1.35,
          mb: 0.6,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        &ldquo;{q}&rdquo;
      </Typography>
      <Stack direction="row" spacing={0.4} sx={{ flexWrap: "nowrap" }}>
        {k.map((skill) => (
          <Box
            key={skill}
            sx={{
              fontSize: "0.55rem",
              fontWeight: 600,
              color: p.accent,
              bgcolor: p.pill,
              borderRadius: "5px",
              px: 0.55,
              py: 0.12,
              lineHeight: 1.3,
              whiteSpace: "nowrap",
            }}
          >
            {skill}
          </Box>
        ))}
      </Stack>
    </Box>
  );
}

function ScrollRow({ cards, dir }) {
  const doubled = [...cards, ...cards];
  return (
    <Box
      sx={{
        display: "flex",
        gap: "14px",
        width: "max-content",
        willChange: "transform",
        backfaceVisibility: "hidden",
        animation:
          dir === "left"
            ? `showcaseScrollL ${SHOWCASE_SCROLL_DURATION_S}s linear infinite`
            : `showcaseScrollR ${SHOWCASE_SCROLL_DURATION_S}s linear infinite`,
        "@media (prefers-reduced-motion: reduce)": {
          animationPlayState: "paused",
        },
      }}
    >
      {doubled.map((c, idx) => (
        <CandidateCard key={`${c.i}-${idx}`} {...c} />
      ))}
    </Box>
  );
}

export default function AuthShowcase() {
  return (
    <Box
      sx={{
        height: "100%",
        position: "relative",
        overflow: "hidden",
        color: "#1F1A15",
        background:
          "radial-gradient(130% 120% at 15% 14%, #FFE8D7 0%, #F9D2B2 38%, #E5AA77 100%)",
        "@keyframes showcaseScrollL": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "@keyframes showcaseScrollR": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        "@keyframes showcaseFadeIn": {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        "@keyframes showcaseLogoUp": {
          from: { opacity: 0, transform: "translateY(16px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
      }}
    >
      {/* Diagonal hatching texture */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          opacity: 0.18,
          backgroundImage:
            "linear-gradient(24deg, rgba(85,50,24,0.18) 24%, transparent 24%, transparent 50%, rgba(85,50,24,0.18) 50%, rgba(85,50,24,0.18) 74%, transparent 74%, transparent)",
          backgroundSize: "18px 18px",
          zIndex: 0,
        }}
      />

      {/* Glass tint layer */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(150deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.02) 36%, rgba(95,48,20,0.22) 100%)",
          zIndex: 0,
        }}
      />

      {/* ── Scrolling card grid (rotated) ── */}
      <Box
        sx={{
          position: "absolute",
          top: "-45%",
          left: "-35%",
          right: "-35%",
          bottom: "-45%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "14px",
          transform: "rotate(-15deg)",
          zIndex: 1,
          pointerEvents: "none",
          opacity: 0,
          animation: "showcaseFadeIn 1.2s ease-out 0.2s forwards",
        }}
      >
        {ROWS.map((row, idx) => (
          <ScrollRow key={idx} {...row} />
        ))}
      </Box>

      {/* ── Top gradient overlay + logo ── */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: { xs: "40%", md: "32%" },
          background:
            "linear-gradient(to bottom, rgba(246,212,178,0.97) 0%, rgba(246,212,178,0.75) 45%, rgba(246,212,178,0.0) 100%)",
          zIndex: 2,
          p: { xs: 3, md: 5 },
        }}
      >
        <Stack
          direction="row"
          spacing={1.25}
          alignItems="center"
          sx={{
            opacity: 0,
            animation: "showcaseLogoUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.15s forwards",
          }}
        >
          <Box
            sx={{
              width: 38,
              height: 38,
              borderRadius: 2.5,
              display: "grid",
              placeItems: "center",
              background:
                "linear-gradient(140deg, rgba(248,114,58,1) 0%, rgba(244,146,94,1) 100%)",
              color: "#FFF",
              boxShadow: "0 4px 16px rgba(248,114,58,0.35)",
            }}
          >
            <HubRoundedIcon fontSize="small" />
          </Box>
          <Typography
            variant="h6"
            sx={{ fontWeight: 800, color: "#17110D", letterSpacing: "-0.01em" }}
          >
            ZappyFind
          </Typography>
        </Stack>
      </Box>

      {/* ── Bottom gradient overlay + tagline ── */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          /* Taller overlay so the warm fill sits higher behind the headline */
          height: { xs: "52%", md: "46%" },
          minHeight: { xs: 240, md: 260 },
          background:
            "linear-gradient(0deg, rgba(222, 168, 115, 0.98) 0%, rgba(226, 174, 122, 0.92) 22%, rgba(228, 178, 124, 0.72) 57%, rgba(230, 180, 130, 0.5) 84%, rgba(230, 180, 130, 0) 100%)",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          p: { xs: 3, md: 5 },
        }}
      >
        <Box
          sx={{
            maxWidth: 440,
            opacity: 0,
            animation: "showcaseLogoUp 0.8s cubic-bezier(0.22,1,0.36,1) 0.5s forwards",
          }}
        >
          <Typography
            sx={{
              fontFamily: '"DM Serif Display", serif',
              fontSize: { xs: "1.65rem", md: "44px" },
              fontWeight: 500,
              lineHeight: 1.2,
              letterSpacing: "-0.015em",
              color: "#0E0B08",
              mb: 1.5,
            }}
          >
            Every great hire starts
            <br />
            with the{" "}
            <Box component="span" sx={{ color: "#c2410c", fontStyle: "italic" }}>
              right match
            </Box>
            .
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "0.8rem", md: "0.875rem" },
              fontWeight: 500,
              color: "#3D3026",
              lineHeight: 1.65,
              maxWidth: 380,
              mb: 2,
            }}
          >
            AI-powered candidate scoring finds who fits your role best, so your team
            interviews fewer, better people.
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <Box
              sx={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                bgcolor: "#c2410c",
                boxShadow: "0 0 8px rgba(194,65,12,0.45)",
                "@keyframes showcasePulse": {
                  "0%, 100%": { opacity: 0.5 },
                  "50%": { opacity: 0.85 },
                },
                animation: "showcasePulse 2.5s ease-in-out infinite",
              }}
            />
            <Typography
              sx={{
                fontSize: "0.68rem",
                fontWeight: 700,
                color: "#5E4E3E",
                letterSpacing: "0.07em",
                textTransform: "uppercase",
              }}
            >
              Trusted by hiring teams
            </Typography>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
