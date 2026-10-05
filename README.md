# Secure Digital Creator Portfolio & Protected Video Management Platform

A modern, production-grade web application combining **Web Technology**, **Advanced Computer Networks (ACN)**, and **Technology & Information Security (TIS)**.

This system serves as a digital creator portfolio where visitors explore public creative work, registered users request access to protected video screeners, and an administrator manages video assets, reviews access requests, monitors real-time network telemetry, and audits security events.

---

## 🏛️ Academic & Engineering Pillars

### 1. Web Technology
- **Next.js 16 (Turbopack) & App Router**: Modern server-rendered and client-hydrated hybrid routing.
- **React 19 & TypeScript**: Strict types for video assets, cryptographic sessions, and telemetry.
- **Tailwind CSS & Rich Design System**: Cinematic obsidian dark mode (`#07080b`), glowing amber accents (`#f59e0b`), glassmorphism, and responsive layout.
- **Recharts Analytics**: High-performance Area, Bar, Donut, and multi-axis Line charts.
- **Sonner Notifications**: Non-blocking toast alerts for authentication and approval workflows.

### 2. Advanced Computer Networks (ACN)
- **HTTP/3 (QUIC) & HTTP/2 Stream Ingestion**: Real-time packet telemetry capturing modern UDP-based HTTP/3 transport.
- **Adaptive Bitrate (ABR) Chunk Distribution**: HTTP 206 Partial Content video segment streaming simulation.
- **Network Telemetry Dashboard (`/admin/network`)**:
  - Live Requests Per Minute (RPM) & Throughput.
  - Round-Trip Time (RTT) latency tracking.
  - Egress bandwidth and packet loss metrics.
  - Interactive packet stream inspector with TLSv1.3 cryptographic handshakes.
  - Live packet injection simulator for project demonstrations.

### 3. Technology / Information Security (TIS)
- **Zero-Trust Role-Based Access Control (RBAC)**: Enforced gatekeeping (`GUEST`, `USER`, `CREATOR`, `ADMIN`) with HTTP 403 barriers.
- **Dynamic Forensic Traceability Watermarking**:
  - Overlays viewer identity (Name, User ID, Session Token, Client IP, and live UTC clock).
  - Drifts dynamically across the viewport to deter screen recording and ensure cryptographic non-repudiation.
- **Argon2id & Bcrypt Password Cryptography**: Salted password hashing with no plaintext persistence.
- **Secure Session Management**: Signed JWT tokens sealed with `HttpOnly`, `SameSite=Strict`, and `Secure` cookie attributes.
- **WAF & Rate Limiting Defense**: Token bucket algorithms mitigating credential stuffing, SQL injection, and XSS.
- **Immutable Security Audit Trail (`/admin/security`)**: Categorized audit records with severity ratings (`INFO`, `LOW`, `MEDIUM`, `HIGH`, `CRITICAL`).

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js 18+ (tested on Node.js v24)
- npm 9+

### 1. Installation
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Demo & Evaluator Quick Switcher

For academic demonstrations and jury evaluation, a floating **Evaluator Role Switcher** is embedded in the navigation bar to allow instantaneous switching between:

| Role | Demo User | Key Capabilities |
| :--- | :--- | :--- |
| **ADMIN** | `Aadithyan A.S.` (`aadithyan@creatorstudio.dev`) | Access to `/admin`, Video Management, Approve/Reject requests, Network Monitor, Security Logs |
| **USER** | `Priya Patel` (`priya.patel@redvelvetagency.com`) | Browse library, Submit Access Request, Stream approved videos with dynamic watermarking |
| **CREATOR** | `Rahul Sharma` (`rahul.sharma@vfxcollective.in`) | Portfolio showcase and motion designer view |
| **GUEST** | Public Visitor | Browse public videos; encounters locked state on protected screener cuts |

> **Default Demo Password:** `Admin@12345` (for admin) or `Password@123` (for users). Any mock user can also authenticate using their email.

---

## 📂 Architecture & Directory Structure

```text
├── app/
│   ├── page.tsx                     # Cinematic landing page
│   ├── about/page.tsx               # Creator profile & technical arsenal
│   ├── videos/
│   │   ├── page.tsx                 # Video discovery library with filters
│   │   └── [id]/page.tsx            # Detail page: Player or Locked state
│   ├── categories/page.tsx          # Creative taxonomy
│   ├── contact/page.tsx             # Commercial inquiry channel
│   ├── login/page.tsx               # Login page
│   ├── register/page.tsx            # Register page
│   ├── dashboard/                   # User account area
│   │   ├── page.tsx                 # Dashboard overview
│   │   ├── requests/page.tsx        # My access requests status
│   │   ├── videos/page.tsx          # Approved DRM content
│   │   ├── profile/page.tsx         # User profile
│   │   └── settings/page.tsx        # Security & sessions
│   ├── admin/                       # Administrator portal (RBAC Protected)
│   │   ├── layout.tsx               # Admin layout & 403 Gatekeeper
│   │   ├── page.tsx                 # Overview dashboard & charts
│   │   ├── videos/page.tsx          # Video asset management
│   │   ├── requests/page.tsx        # Access request review queue
│   │   ├── users/page.tsx           # User directory & role assignment
│   │   ├── network/page.tsx         # ACN Network & HTTP/3 monitor
│   │   ├── security/page.tsx        # TIS Security ledger & score
│   │   └── settings/page.tsx        # System DRM policies
│   └── api/
│       └── auth/                    # Production-ready Auth APIs
│           ├── register/route.ts
│           ├── login/route.ts
│           ├── logout/route.ts
│           └── session/route.ts
├── components/
│   ├── common/                      # Badges, Skeletons, RoleSwitcher
│   ├── layout/                      # Navbar, Footer
│   ├── navigation/                  # AdminSidebar, DashboardNav
│   ├── video/                       # VideoCard, VideoPlayer, LockedVideo, VideoWatermark
│   ├── auth/                        # LoginForm, RegisterForm, GoogleLoginButton
│   ├── admin/                       # StatsCard, Tables, ReviewModal
│   └── charts/                      # Recharts Area, Donut, Bar, Line
├── context/
│   └── AuthContext.tsx              # Auth state & evaluator switcher
├── lib/
│   ├── api/                         # Service layer (auth, videos, requests, network, security)
│   ├── auth/                        # JWT jose signing & Zod validation
│   └── mock/                        # Realistic Indian creator & user datasets
├── prisma/
│   └── schema.prisma                # Complete PostgreSQL Prisma schema
└── types/
    └── index.ts                     # TypeScript definitions
```

---

## 🗄️ Database Models (`prisma/schema.prisma`)

The Prisma schema is fully designed for PostgreSQL and includes:
- `User` (RBAC roles, authentication credentials, profile attributes)
- `Account` (OAuth account mappings for Google OpenID Connect)
- `Session` (Auth sessions)
- `Category` (Creative video taxonomy)
- `Video` (Resolutions, bitrates, codecs, access tiers: `PUBLIC`, `LOGIN_REQUIRED`, `REQUEST_ACCESS`, `PRIVATE`)
- `AccessRequest` (User request reasoning, status: `PENDING`, `APPROVED`, `REJECTED`, `EXPIRED`, reviewer timestamps)
- `VideoSession` (Client IP, token, resolution delivered, bytes transferred, active state)
- `SecurityLog` (Audit actions, severities: `INFO`, `LOW`, `MEDIUM`, `HIGH`, `CRITICAL`, origin IP)
- `LoginAttempt` (IP address, email, success flag, brute-force tracking)

---

## 🎬 Testing the Complete User & Admin Journey

1. **Guest Browsing:**
   - Visit the home page `http://localhost:3000`.
   - Click **Explore Work** or go to `/videos`.
   - Click a public video (e.g., *Wanderlust Ladakh*) → Video plays smoothly.
   - Click a protected video (e.g., *TVS Apache RR 310* or *The Last Postbox of Munnar*) → Notice the **🔒 LOCKED** state.
2. **Access Request Flow:**
   - Switch role to **USER** (or Sign In as Priya Patel).
   - On the locked video, click **Request Access to Watch**.
   - Fill in the purpose and reason in the modal → Click **Send Request**.
   - Notice the status immediately updates to **Pending Review**.
3. **Admin Review & Approval Flow:**
   - Switch role to **ADMIN** (Aadithyan A.S.) using the navigation pill.
   - Go to `/admin/requests`.
   - Click **Review** on the incoming request → Inspect user details and risk indicator.
   - Click **Approve (Issue 7-Day Token)**.
4. **Watermarked Secure Playback:**
   - Switch back to **USER** and navigate to the video (or `/dashboard/videos`).
   - The video is now **UNLOCKED**!
   - Watch the stream: The **Secure Playback Session Panel** is displayed along with the **Dynamic Moving Watermark** drifting across the viewport showing user name, ID, session token, and live UTC clock.
5. **ACN & TIS Inspection:**
   - Go to `/admin/network` to see real-time HTTP/3 QUIC streams, latency curves, and inject live packets.
   - Go to `/admin/security` to see the 96/100 security score, defensive controls checklist, and audit log ledger.

---

## 📜 Compliance & Security Notice
This platform utilizes dynamic watermarking for content deterrence and forensic leak traceability. In alignment with academic guidelines, no claim is made that client browsers can prevent 100% of analog screen captures; rather, the system provides non-repudiation and forensic accountability.
