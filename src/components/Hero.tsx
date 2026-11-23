import { ArrowRight, Check, Copy, Cpu, Layers, Play, ShieldCheck, Zap } from "lucide-react";
import type React from "react";
import { useState } from "react";

interface HeroProps {
  onOpenDocs: (tab?: string) => void;
  onOpenContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenDocs, onOpenContact }) => {
  const [activeInstallTab, setActiveInstallTab] = useState<
    "curl" | "powershell" | "brew" | "scoop" | "npm"
  >("curl");
  const [copied, setCopied] = useState(false);

  const installSnippets = {
    curl: "curl -fsSL https://poly.ritualdev.in/install.sh | sh",
    powershell: "irm https://poly.ritualdev.in/install.ps1 | iex",
    brew: "brew install RitualDev-Lab/tap/poly",
    scoop: "scoop bucket add ritualdev https://github.com/RitualDev-Lab/scoop-bucket\nscoop install poly",
    npm: "npm i -g @ritualdev-lab/poly",
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(installSnippets[activeInstallTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-sky-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[350px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-1/4 w-[350px] h-[300px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b0a_1px,transparent_1px),linear-gradient(to_bottom,#1e293b0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div 
          onClick={() => onOpenDocs("quickstart")}
          className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs text-slate-300 mb-8 shadow-inner hover:border-sky-500/50 transition-colors cursor-pointer group"
        >
          <span className="flex h-2 w-2 rounded-full bg-sky-400 animate-ping" />
          <span className="font-semibold text-white">Poly v0.5.1 Released</span>
          <span className="text-slate-500">•</span>
          <span className="text-sky-400 group-hover:underline">
            Standalone Native Binaries (Zero Node.js Required) &rarr;
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.1] mb-6">
          One Universal CLI for{" "}
          <span className="bg-gradient-to-r from-sky-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
            Node, Python, Rust & Go
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed mb-10">
          Stop juggling{" "}
          <code className="text-sky-300 bg-sky-950/60 px-1.5 py-0.5 rounded text-sm font-mono">
            pnpm
          </code>
          ,{" "}
          <code className="text-emerald-300 bg-emerald-950/60 px-1.5 py-0.5 rounded text-sm font-mono">
            uv
          </code>
          ,{" "}
          <code className="text-amber-300 bg-amber-950/60 px-1.5 py-0.5 rounded text-sm font-mono">
            cargo
          </code>
          , and{" "}
          <code className="text-indigo-300 bg-indigo-950/60 px-1.5 py-0.5 rounded text-sm font-mono">
            go
          </code>
          . Poly orchestrates polyglot workspaces with RFC PURL routing, cryptographic composite{" "}
          <code className="text-slate-200 font-mono">poly.lock</code>, OSV CVE auto-heal,
          distributed remote CI caching, and native AI coding agent mesh.
        </p>

        {/* Quick Install Bar */}
        <div className="max-w-xl mx-auto mb-10">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-2 shadow-2xl backdrop-blur-xl">
            {/* Tabs */}
            <div className="flex items-center space-x-1 border-b border-slate-800 pb-2 mb-2 px-2 text-xs font-mono overflow-x-auto">
              <button
                onClick={() => setActiveInstallTab("curl")}
                className={`px-3 py-1 rounded-md transition-colors shrink-0 ${
                  activeInstallTab === "curl"
                    ? "bg-slate-800 text-sky-400 font-bold"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                curl (Linux/macOS)
              </button>
              <button
                onClick={() => setActiveInstallTab("powershell")}
                className={`px-3 py-1 rounded-md transition-colors shrink-0 ${
                  activeInstallTab === "powershell"
                    ? "bg-slate-800 text-sky-400 font-bold"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                PowerShell (Windows)
              </button>
              <button
                onClick={() => setActiveInstallTab("brew")}
                className={`px-3 py-1 rounded-md transition-colors shrink-0 ${
                  activeInstallTab === "brew"
                    ? "bg-slate-800 text-sky-400 font-bold"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Homebrew
              </button>
              <button
                onClick={() => setActiveInstallTab("scoop")}
                className={`px-3 py-1 rounded-md transition-colors shrink-0 ${
                  activeInstallTab === "scoop"
                    ? "bg-slate-800 text-sky-400 font-bold"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Scoop
              </button>
              <button
                onClick={() => setActiveInstallTab("npm")}
                className={`px-3 py-1 rounded-md transition-colors shrink-0 ${
                  activeInstallTab === "npm"
                    ? "bg-slate-800 text-sky-400 font-bold"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                npm
              </button>
            </div>

            {/* Snippet & Copy Button */}
            <div className="flex items-center justify-between px-3 py-2 bg-[#06090F] rounded-xl border border-slate-800/80">
              <pre className="font-mono text-sm text-left text-slate-200 overflow-x-auto whitespace-pre pr-4">
                <code>{installSnippets[activeInstallTab]}</code>
              </pre>
              <button
                onClick={handleCopy}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white transition-all shrink-0"
                title="Copy to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="#terminal"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-7 py-3.5 rounded-xl text-sm font-bold text-slate-900 bg-gradient-to-r from-sky-400 via-sky-300 to-indigo-400 hover:from-sky-300 hover:to-indigo-300 shadow-lg shadow-sky-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Play className="w-4 h-4 fill-slate-900" />
            <span>Launch Interactive Terminal</span>
          </a>

          <button
            onClick={() => onOpenDocs("quickstart")}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-7 py-3.5 rounded-xl text-sm font-medium text-slate-200 bg-slate-900/90 border border-slate-700 hover:border-slate-500 hover:bg-slate-800 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Explore Documentation</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenContact}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-7 py-3.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white transition-colors"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Enterprise Architecture Review &rarr;</span>
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6 border-t border-slate-800/80">
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 text-center">
            <div className="flex items-center justify-center text-sky-400 mb-1">
              <Layers className="w-5 h-5 mr-1.5" />
              <span className="text-2xl font-bold font-mono text-white">4</span>
            </div>
            <div className="text-xs text-slate-400 font-medium">
              Unified Stacks (Node, Py, Rust, Go)
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 text-center">
            <div className="flex items-center justify-center text-emerald-400 mb-1">
              <Zap className="w-5 h-5 mr-1.5" />
              <span className="text-2xl font-bold font-mono text-white">&lt; 28ms</span>
            </div>
            <div className="text-xs text-slate-400 font-medium">Cold Start Runtime Overhead</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 text-center">
            <div className="flex items-center justify-center text-purple-400 mb-1">
              <Cpu className="w-5 h-5 mr-1.5" />
              <span className="text-2xl font-bold font-mono text-white">100%</span>
            </div>
            <div className="text-xs text-slate-400 font-medium">Deterministic SHA-256 Lockfile</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 text-center">
            <div className="flex items-center justify-center text-amber-400 mb-1">
              <ShieldCheck className="w-5 h-5 mr-1.5" />
              <span className="text-2xl font-bold font-mono text-white">84%</span>
            </div>
            <div className="text-xs text-slate-400 font-medium">CI Build Time Saved via Cache</div>
          </div>
        </div>
      </div>
    </section>
  );
};
