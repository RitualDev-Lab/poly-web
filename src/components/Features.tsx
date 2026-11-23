import {
  Bot,
  Building2,
  CheckCircle2,
  Cloud,
  Container,
  Lock,
  ShieldAlert,
  Stethoscope,
  Zap,
} from "lucide-react";
import type React from "react";

export const Features: React.FC = () => {
  const featureList = [
    {
      icon: <Zap className="w-6 h-6 text-sky-400" />,
      title: "Zero-Latency PURL Routing",
      desc: "Install across four ecosystems in a single command. Poly resolves shorthand prefixes (npm:, pypi:, cargo:, go:) into native execution commands with under 28ms overhead.",
      tag: "Engine Layer",
      highlights: ["Sub-28ms dispatch", "RFC Package URLs", "Auto-engine detection"],
    },
    {
      icon: <Lock className="w-6 h-6 text-indigo-400" />,
      title: "Composite Cryptographic poly.lock",
      desc: "One deterministic lockfile unifying package-lock.json, uv.lock, Cargo.lock, and go.sum. SHA-256 merkle integrity guarantees zero-drift builds in CI/CD pipelines.",
      tag: "Workspace Core",
      highlights: ["Cryptographic SHA-256", "Zero-drift enforcement", "Monorepo traversal"],
    },
    {
      icon: <ShieldAlert className="w-6 h-6 text-emerald-400" />,
      title: "Automated CVE Auto-Healer (poly fix)",
      desc: "Queries the open OSV vulnerability database across all stacks, flags CVEs, automatically patches package manifests, and re-locks with frozen reconciliation.",
      tag: "Compliance & Security",
      highlights: ["OSV database queries", "Manifest auto-patching", "SARIF & SBOM exports"],
    },
    {
      icon: <Cloud className="w-6 h-6 text-purple-400" />,
      title: "Distributed CI Remote Cache",
      desc: "Deterministic OS/Arch/lockfile cache keys restore node_modules, .venv, and Cargo artifacts in seconds. Compatible with S3, Cloudflare R2, GCS, and local disk.",
      tag: "CI/CD Speedup",
      highlights: ["84% build time reduction", "S3/R2/GCS adapters", "Deterministic hashing"],
    },
    {
      icon: <Stethoscope className="w-6 h-6 text-amber-400" />,
      title: "System Health Suite (poly doctor)",
      desc: "Deep diagnostic scanner testing Node, Python, Astral uv, Rust, Go, C/C++ compilers, workspace lockfile drift, and real-time enterprise registry network latencies.",
      tag: "Diagnostics",
      highlights: ["Parallel ping tests", "Toolchain version audits", "Machine-readable JSON"],
    },
    {
      icon: <Container className="w-6 h-6 text-rose-400" />,
      title: "Polyglot Docker & DevContainer Generator",
      desc: "Instantly generates hardened multi-stage Dockerfiles with BuildKit cache mounts, unprivileged non-root appusers, docker-compose.yml, and VS Code DevContainers.",
      tag: "Cloud Native",
      highlights: ["BuildKit cache mounts", "Non-root appuser (UID 10001)", "Codespaces ready"],
    },
    {
      icon: <Bot className="w-6 h-6 text-cyan-400" />,
      title: "The Package Manager for AI Agents",
      desc: "Autonomous coding agents (Claude Code, Cursor, Windsurf, Devin) waste 40% of their context windows on npm spinners and risk running malicious lifecycle scripts. Poly provides ultra-terse --agent JSON output and supply-chain script sandboxing.",
      tag: "AI Coding Agents",
      highlights: [
        "Token-efficient --agent JSON",
        "Supply-chain script sandboxing",
        "Zero-prompt non-interactive",
      ],
    },
    {
      icon: <Building2 className="w-6 h-6 text-slate-300" />,
      title: "Air-Gapped Enterprise Registries",
      desc: "Seamless proxying and environment variable injection for Artifactory, Nexus, and AWS CodeArtifact. Verifies token authorization and mirror connectivity out-of-the-box.",
      tag: "Enterprise Tier",
      highlights: ["Air-gapped runners", "Registry ping verification", "Token injection"],
    },
  ];

  return (
    <section id="features" className="py-24 relative bg-[#0B0F17]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-950 text-indigo-400 border border-indigo-800/60 mb-4">
            <span>Built for Enterprise Scale</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Everything Required for Polyglot Excellence
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Architected to eliminate toolchain friction, secure software supply chains, and slash
            CI/CD minutes across large engineering organizations.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featureList.map((f, i) => (
            <div
              // biome-ignore lint/suspicious/noArrayIndexKey: features are static
              key={i}
              className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 hover:border-slate-700 hover:bg-slate-900/90 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/50 group-hover:scale-105 transition-transform">
                    {f.icon}
                  </div>
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700/50">
                    {f.tag}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-sky-300 transition-colors">
                  {f.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">{f.desc}</p>
              </div>

              <div className="pt-4 border-t border-slate-800/60 space-y-1.5">
                {f.highlights.map((h, hi) => (
                  <div
                    // biome-ignore lint/suspicious/noArrayIndexKey: highlights static
                    key={hi}
                    className="flex items-center space-x-2 text-xs text-slate-300"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
