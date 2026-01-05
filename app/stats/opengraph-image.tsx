import { ImageResponse } from "next/og"

export const runtime = "edge"

export const alt = "Pomobox Statistics - Track Focus & Productivity"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#111116",
          position: "relative",
        }}
      >
        {/* Background gradient overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "radial-gradient(circle at 30% 70%, rgba(99, 102, 241, 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1,
          }}
        >
          {/* Chart Icon */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: 8,
              marginBottom: 32,
            }}
          >
            {/* Bar chart visualization */}
            <div
              style={{
                width: 24,
                height: 40,
                backgroundColor: "#6366F1",
                borderRadius: 4,
              }}
            />
            <div
              style={{
                width: 24,
                height: 70,
                backgroundColor: "#6366F1",
                borderRadius: 4,
              }}
            />
            <div
              style={{
                width: 24,
                height: 55,
                backgroundColor: "#22C55E",
                borderRadius: 4,
              }}
            />
            <div
              style={{
                width: 24,
                height: 90,
                backgroundColor: "#22C55E",
                borderRadius: 4,
              }}
            />
            <div
              style={{
                width: 24,
                height: 65,
                backgroundColor: "#6366F1",
                borderRadius: 4,
              }}
            />
          </div>

          {/* Main Title */}
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: "#ffffff",
              marginBottom: 12,
              letterSpacing: "-0.02em",
            }}
          >
            Focus Statistics
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: 28,
              color: "#A1A1AA",
              letterSpacing: "0.01em",
              marginBottom: 40,
            }}
          >
            Track your productivity patterns & growth
          </div>

          {/* Stats preview */}
          <div
            style={{
              display: "flex",
              gap: 48,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div style={{ fontSize: 36, fontWeight: 700, color: "#6366F1" }}>
                Weekly
              </div>
              <div style={{ fontSize: 18, color: "#71717A" }}>Pattern</div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div style={{ fontSize: 36, fontWeight: 700, color: "#22C55E" }}>
                Growth
              </div>
              <div style={{ fontSize: 18, color: "#71717A" }}>Analysis</div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div style={{ fontSize: 36, fontWeight: 700, color: "#F59E0B" }}>
                Monthly
              </div>
              <div style={{ fontSize: 18, color: "#71717A" }}>Trend</div>
            </div>
          </div>
        </div>

        {/* Brand */}
        <div
          style={{
            position: "absolute",
            bottom: 32,
            right: 40,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              fontSize: 24,
              fontWeight: 600,
              color: "#71717A",
            }}
          >
            pomobox.app
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
