import React from "react";

// ─────────────────────────────────────────────────────────────
//  Types
// ─────────────────────────────────────────────────────────────
export interface MemberIdCardProps {
  /** Member full name */
  name?: string;
  /** e.g. MCAN/BY/25C/1065 */
  regNo?: string;
  /** e.g. Lagos, Ogun, Oyo … */
  stateBranch?: string;
  /** e.g. Ameer, Secretary … */
  postHeld?: string;
  /** e.g. "Nov 25 – Oct 26" */
  validity?: string;
  /** Member's signature as a data-URL or public path */
  holderSignature?: string;
  /** Member phone number */
  phoneNo?: string;
  /** Passport photograph as a data-URL or public path */
  passportPhoto?: string;
  /** Show back face instead of front */
  showBack?: boolean;
}

// ─────────────────────────────────────────────────────────────
//  Colour & style tokens (mirrors the physical card)
// ─────────────────────────────────────────────────────────────
const GREEN  = "#1a5c2e";   // dark green border / header text
const GOLD   = "#c8a84b";   // NYSC torch accent / badge ring
const RED    = "#cc1f1f";   // "MEMBERSHIP IDENTITY CARD" banner
const CREAM  = "#f5f3ee";   // card body background
const WMARK  = "#e8e4dc";   // watermark text colour

// ─────────────────────────────────────────────────────────────
//  Watermark (repeating background text)
// ─────────────────────────────────────────────────────────────
function Watermark() {
  const repeat = Array.from({ length: 120 }, (_, i) => i);
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        userSelect: "none",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      <p
        style={{
          color: WMARK,
          fontSize: 7,
          fontWeight: 700,
          letterSpacing: "0.12em",
          lineHeight: "1.6",
          wordBreak: "break-all",
          padding: "4px",
          whiteSpace: "normal",
        }}
      >
        {repeat.map(() => "MUSLIM CORPERS ASSOCIATION OF NIGERIA MCAN ").join("")}
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
//  NYSC torch SVG (left logo)
// ─────────────────────────────────────────────────────────────
function NyscBadge() {
  return (
    <img src="/photos/nysc-logo.svg" alt="NYSC" style={{ width: 46, height: 46, objectFit: 'contain' }} />
  );
}

// ─────────────────────────────────────────────────────────────
//  MCAN seal SVG (right logo)
// ─────────────────────────────────────────────────────────────
function McanSeal() {
  return (
    <img src="/photos/logo-mcan.png" alt="MCAN" style={{ width: 46, height: 46, objectFit: 'contain' }} />
  );
}

// ─────────────────────────────────────────────────────────────
//  Field row
// ─────────────────────────────────────────────────────────────
interface FieldRowProps {
  label: string;
  value?: string;
  isSignature?: boolean;
  signatureSrc?: string;
}

function FieldRow({ label, value, isSignature, signatureSrc }: FieldRowProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: 4,
        marginBottom: 3,
        position: "relative",
        zIndex: 1,
      }}
    >
      <span
        style={{
          fontSize: 10,
          fontWeight: 700,
          color: "#111",
          whiteSpace: "nowrap",
          minWidth: 100,
          fontFamily: "serif",
        }}
      >
        {label}:
      </span>
      <div
        style={{
          flex: 1,
          borderBottom: "1.5px solid #333",
          minHeight: 18,
          display: "flex",
          alignItems: "flex-end",
          paddingBottom: 2,
        }}
      >
        {isSignature && signatureSrc ? (
          <img src={signatureSrc} alt="signature" style={{ height: 14, maxWidth: "100%", objectFit: "contain" }} />
        ) : (
          <span
            style={{
              fontSize: 10,
              color: "#1a1a1a",
              fontFamily: "serif",
            }}
          >
            {value ?? ""}
          </span>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
//  FRONT FACE
// ─────────────────────────────────────────────────────────────
function CardFront({
  name,
  regNo,
  stateBranch,
  postHeld,
  validity,
  holderSignature,
  phoneNo,
  passportPhoto,
}: MemberIdCardProps) {
  return (
      <div
        style={{
          width: 340,
          height: 240,
          borderRadius: 8,
          border: `10px solid ${GREEN}`,
          background: CREAM,
          position: "relative",
          overflow: "hidden",
          fontFamily: "serif",
          boxShadow: "0 4px 24px rgba(0,0,0,0.22)",
          boxSizing: "border-box",
        }}
      >
        <Watermark />

        {/* ── Header ─────────────────────────────────── */}
        <div style={{ position: "relative", zIndex: 1, textAlign: "center", paddingTop: 6 }}>
          {/* Logo row */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              paddingLeft: 8,
              paddingRight: 8,
            }}
          >
            <NyscBadge />

            <div style={{ flex: 1, padding: "0 6px" }}>
              <p
                style={{
                  margin: 0,
                  fontSize: 11,
                  fontWeight: 900,
                  color: GREEN,
                  fontFamily: "serif",
                  lineHeight: 1.2,
                  letterSpacing: "0.02em",
                }}
              >
                MUSLIM CORPERS' ASSOCIATION OF NIGERIA<br />(MCAN SOUTHWEST)
              </p>
              <p
                style={{
                  margin: "1px 0 0",
                  fontSize: 6.5,
                  color: "#333",
                  fontFamily: "serif",
                }}
              >
                The regional coordinating body of the Muslim Corpers' Association of Nigeria across Lagos, Ogun, Oyo, Osun, Ondo and Ekiti
              </p>
            </div>

            <McanSeal />
          </div>

          {/* Red banner */}
          <div
            style={{
              background: RED,
              borderRadius: 20,
              display: "inline-block",
              padding: "2px 18px",
              margin: "4px auto 4px",
            }}
          >
            <span
              style={{
                color: "white",
                fontWeight: 900,
                fontSize: 9,
                letterSpacing: "0.08em",
                fontFamily: "sans-serif",
              }}
            >
              MEMBERSHIP IDENTITY CARD
            </span>
          </div>
        </div>

      {/* ── Body: fields + photo ────────────────────── */}
      <div
        style={{
          display: "flex",
          gap: 8,
          paddingLeft: 10,
          paddingRight: 10,
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Fields */}
        <div style={{ flex: 1 }}>
          <FieldRow label="Name"             value={name} />
          <FieldRow label="State Code"     value={regNo} />
          <FieldRow label="State Branch"     value={stateBranch} />
          <FieldRow label="Post Held"        value={postHeld} />
          <FieldRow label="Validity"         value={validity} />
          <FieldRow label="Holder's Sign"    isSignature signatureSrc={holderSignature} />
          <FieldRow label="Holder's Phone No" value={phoneNo} />
        </div>

        {/* Passport box */}
        <div
          style={{
            width: 62,
            height: 76,
            border: "1.5px solid #888",
            background: passportPhoto ? "transparent" : "#e0ddd6",
            flexShrink: 0,
            alignSelf: "flex-start",
            marginTop: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {passportPhoto ? (
            <img
              src={passportPhoto}
              alt="passport"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <span style={{ fontSize: 7, color: "#888", textAlign: "center", padding: 4 }}>
              Passport Photo
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
//  BACK FACE
// ─────────────────────────────────────────────────────────────
function CardBack() {
  return (
    <div
      style={{
        width: 340,
        height: 240,
        borderRadius: 8,
        border: `10px solid ${GREEN}`,
        background: CREAM,
        position: "relative",
        overflow: "hidden",
        fontFamily: "serif",
        boxShadow: "0 4px 24px rgba(0,0,0,0.22)",
        boxSizing: "border-box",
      }}
    >
      <Watermark />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          padding: "14px 16px 10px",
        }}
      >
        {/* NOTE heading */}
        <p
          style={{
            textAlign: "center",
            fontWeight: 900,
            fontSize: 18,
            color: RED,
            margin: "0 0 8px",
            letterSpacing: "0.06em",
          }}
        >
          NOTE
        </p>

        {/* Rules */}
        <ol
          style={{
            margin: "0 0 10px",
            paddingLeft: 18,
            fontSize: 10,
            fontWeight: 700,
            color: "#111",
            lineHeight: 1.8,
          }}
        >
          <li>The bearer of this identity Card is a member of the association</li>
          <li>This card is not transferable to another person</li>
          <li>It expires as indicated overleaf</li>
          <li>If found, please return it to</li>
        </ol>

        {/* Address */}
        <p
          style={{
            textAlign: "center",
            fontSize: 10,
            color: "#222",
            margin: "0 0 12px",
            lineHeight: 1.6,
          }}
        >
          The regional coordinating body of the Muslim Corpers'<br />
          Association of Nigeria across Lagos, Ogun, Oyo,<br />
          Osun, Ondo and Ekiti
        </p>

        {/* Signatures */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          {/* Nat. Secretary General */}
          <div style={{ textAlign: "center", flex: 1 }}>
            {/* Signature SVG (stylised scrawl) */}
            <svg width="80" height="28" viewBox="0 0 80 28" style={{ display: "block", margin: "0 auto" }}>
              <path
                d="M5 22 C10 10 15 6 25 14 C30 18 32 8 40 10 C48 12 50 20 58 16 C64 13 68 18 75 14"
                stroke="#111"
                strokeWidth="1.8"
                fill="none"
                strokeLinecap="round"
              />
              <line x1="5" y1="26" x2="75" y2="26" stroke="#111" strokeWidth="1" />
            </svg>
            <p style={{ fontSize: 9, fontWeight: 700, color: "#111", margin: 0 }}>
              Nat. Secretary General
            </p>
          </div>

          {/* National Ameer */}
          <div style={{ textAlign: "center", flex: 1 }}>
            <svg width="80" height="28" viewBox="0 0 80 28" style={{ display: "block", margin: "0 auto" }}>
              <path
                d="M5 20 C12 8 20 5 30 16 C35 22 38 10 48 12 C56 14 60 22 70 16 C73 14 75 18 78 16"
                stroke="#111"
                strokeWidth="1.8"
                fill="none"
                strokeLinecap="round"
              />
              <line x1="5" y1="26" x2="75" y2="26" stroke="#111" strokeWidth="1" />
            </svg>
            <p style={{ fontSize: 9, fontWeight: 700, color: "#111", margin: 0 }}>
              National Ameer (President)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
//  Main export — flippable card
// ─────────────────────────────────────────────────────────────
export default function MemberIdCard(props: MemberIdCardProps) {
  const [flipped, setFlipped] = React.useState(props.showBack ?? false);
  const [scale, setScale] = React.useState(1);

  React.useEffect(() => {
    function updateScale() {
      const maxW = Math.min(360, window.innerWidth - 32);
      setScale(maxW < 360 ? maxW / 360 : 1);
    }
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  return (
    <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 12, maxWidth: "100%" }}>
      {/* Card */}
      <div
        style={{
          perspective: 1000,
          width: 340,
          height: 240,
          cursor: "pointer",
          transform: scale < 1 ? `scale(${scale})` : undefined,
          transformOrigin: "top center",
        }}
        onClick={() => setFlipped((f) => !f)}
        title="Click to flip"
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            transformStyle: "preserve-3d",
            transition: "transform 0.55s cubic-bezier(0.4,0,0.2,1)",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* Front */}
          <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden" }}>
            <CardFront {...props} />
          </div>
          {/* Back */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <CardBack />
          </div>
        </div>
      </div>

      {/* Flip hint */}
      <p style={{ fontSize: 11, color: "#888", margin: 0 }}>Click card to flip</p>
    </div>
  );
}
