import {
  ArrowDown,
  Bot,
  ChevronRight,
  Database,
  FileCode,
  Layers,
  Network,
  ShieldCheck,
} from "lucide-react";
import type React from "react";
import { useState } from "react";

export const ArchitectureExplorer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"overview" | "flow" | "lockfile" | "mcp">("overview");

  return (
    <section id="architecture" className="py-24 bg-[#090D14] border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950 text-emerald-400 border border-emerald-800/60 mb-4">
            <Network className="w-3.5 h-3.5" />
            <span>Under The Hood</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            The Polyglot Orchestration Engine
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            How Poly unifies heterogeneous runtimes, prevents configuration drift, and enforces
            zero-trust compliance without proprietary lock-in.
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm font-medium">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === "overview"
                  ? "bg-sky-500 text-slate-950 font-bold shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              System Diagram
            </button>
            <button
              onClick={() => setActiveTab("flow")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === "flow"
                  ? "bg-sky-500 text-slate-950 font-bold shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              PURL Resolution Flow
            </button>
            <button
              onClick={() => setActiveTab("lockfile")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === "lockfile"
                  ? "bg-sky-500 text-slate-950 font-bold shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Composite poly.lock
            </button>
            <button
              onClick={() => setActiveTab("mcp")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === "mcp"
                  ? "bg-sky-500 text-slate-950 font-bold shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              AI Agent Mesh (MCP)
            </button>
          </div>
        </div>

        {/* Dynamic Architecture Display */}
        {activeTab === "overview" && (
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Top Workspace Layer */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-sky-500/40 shadow-xl shadow-sky-500/5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Layers className="w-5 h-5 text-sky-400" />
                  <span className="font-bold text-white text-base sm:text-lg">
                    Workspace Orchestrator & Configuration
                  </span>
                </div>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-800">
                  poly.toml & Root Monorepo
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mb-4">
                Discovers workspace members using glob patterns (`apps/*`, `services/*`,
                `crates/*`). Detects language contexts, environment overrides, and registry mirrors.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs font-mono">
                <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/60 text-slate-200">
                  apps/web (Node)
                </div>
                <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/60 text-slate-200">
                  services/api (Python)
                </div>
                <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/60 text-slate-200">
                  crates/core (Rust)
                </div>
                <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/60 text-slate-200">
                  pkg/gateway (Go)
                </div>
              </div>
            </div>

            <div className="flex justify-center text-slate-600">
              <ArrowDown className="w-6 h-6 animate-bounce" />
            </div>

            {/* Native Execution Engine Layer */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-indigo-500/40 shadow-xl shadow-indigo-500/5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Database className="w-5 h-5 text-indigo-400" />
                  <span className="font-bold text-white text-base sm:text-lg">
                    Native Zero-Latency Engines
                  </span>
                </div>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                  Sub-30ms Delegation
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-4">
                <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/80">
                  <div className="font-bold text-sky-400 text-sm mb-1">NodeEngine</div>
                  <div className="text-xs text-slate-400 mb-2">
                    Priority: pnpm &rarr; bun &rarr; yarn &rarr; npm
                  </div>
                  <div className="text-[11px] font-mono text-emerald-400 bg-slate-900/80 p-1.5 rounded">
                    pnpm add &lt;pkg&gt;
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/80">
                  <div className="font-bold text-emerald-400 text-sm mb-1">PythonEngine</div>
                  <div className="text-xs text-slate-400 mb-2">
                    Priority: Astral uv &rarr; pip / venv
                  </div>
                  <div className="text-[11px] font-mono text-emerald-400 bg-slate-900/80 p-1.5 rounded">
                    uv add &lt;pkg&gt;
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/80">
                  <div className="font-bold text-amber-400 text-sm mb-1">RustEngine</div>
                  <div className="text-xs text-slate-400 mb-2">
                    Toolchain: Cargo with feature flags
                  </div>
                  <div className="text-[11px] font-mono text-emerald-400 bg-slate-900/80 p-1.5 rounded">
                    cargo add &lt;pkg&gt;
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/80">
                  <div className="font-bold text-cyan-400 text-sm mb-1">GoEngine</div>
                  <div className="text-xs text-slate-400 mb-2">Toolchain: go get & go mod tidy</div>
                  <div className="text-[11px] font-mono text-emerald-400 bg-slate-900/80 p-1.5 rounded">
                    go get &lt;pkg&gt;
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center text-slate-600">
              <ArrowDown className="w-6 h-6 animate-bounce" />
            </div>

            {/* Compliance, Cache & AI Mesh */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-emerald-500/40 shadow-lg">
                <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm mb-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Compliance & Security</span>
                </div>
                <p className="text-xs text-slate-400">
                  Live OSV queries, manifest auto-patching, SARIF v2.1.0 output for GitHub Advanced
                  Security, and CycloneDX/SPDX SBOM generation.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/90 border border-purple-500/40 shadow-lg">
                <div className="flex items-center space-x-2 text-purple-400 font-bold text-sm mb-2">
                  <Database className="w-4 h-4" />
                  <span>Distributed CI Cache</span>
                </div>
                <p className="text-xs text-slate-400">
                  Deterministic hash caching over S3, Cloudflare R2, GCS, and local disk. Saves up
                  to 84% CI build duration.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/90 border border-cyan-500/40 shadow-lg">
                <div className="flex items-center space-x-2 text-cyan-400 font-bold text-sm mb-2">
                  <Bot className="w-4 h-4" />
                  <span>AI Agent Mesh (MCP)</span>
                </div>
                <p className="text-xs text-slate-400">
                  Model Context Protocol stdio server granting Cursor, Windsurf, and Claude agents
                  safe workspace introspection and dependency remediation.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "flow" && (
          <div className="max-w-3xl mx-auto p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl font-mono text-xs sm:text-sm">
            <div className="text-slate-400 mb-4 pb-2 border-b border-slate-800">
              # RFC PURL Shorthand Resolution Pipeline
            </div>
            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-[#06090F] border border-slate-800">
                <div className="text-sky-400 font-bold mb-1">1. User / Agent Input</div>
                <div className="text-white">$ poly add npm:zod@3.23.8 pypi:fastapi cargo:tokio</div>
              </div>
              <div className="flex justify-center text-slate-600">
                <ChevronRight className="rotate-90 w-4 h-4" />
              </div>
              <div className="p-3 rounded-lg bg-[#06090F] border border-slate-800">
                <div className="text-indigo-400 font-bold mb-1">2. PURL Parser Tokenization</div>
                <div className="text-slate-300">
                  pkg:npm/zod@3.23.8 &rarr; Ecosystem: npm, Name: zod, Version: 3.23.8
                  <br />
                  pkg:pypi/fastapi &rarr; Ecosystem: pypi, Name: fastapi
                  <br />
                  pkg:cargo/tokio &rarr; Ecosystem: cargo, Name: tokio
                </div>
              </div>
              <div className="flex justify-center text-slate-600">
                <ChevronRight className="rotate-90 w-4 h-4" />
              </div>
              <div className="p-3 rounded-lg bg-[#06090F] border border-slate-800">
                <div className="text-emerald-400 font-bold mb-1">
                  3. Native Engine Execution (Parallel or Closest Directory)
                </div>
                <div className="text-slate-300">
                  &bull; NodeEngine: pnpm add zod@3.23.8 in /apps/web
                  <br />
                  &bull; PythonEngine: uv add fastapi in /services/api
                  <br />
                  &bull; RustEngine: cargo add tokio in /crates/core
                </div>
              </div>
              <div className="flex justify-center text-slate-600">
                <ChevronRight className="rotate-90 w-4 h-4" />
              </div>
              <div className="p-3 rounded-lg bg-[#06090F] border border-slate-800">
                <div className="text-purple-400 font-bold mb-1">
                  4. Composite poly.lock Reconciliation
                </div>
                <div className="text-slate-300">
                  Computes SHA-256 digest of underlying lockfiles and writes composite lockfile.
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "lockfile" && (
          <div className="max-w-3xl mx-auto p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl font-mono text-xs sm:text-sm">
            <div className="flex items-center justify-between text-slate-400 mb-4 pb-2 border-b border-slate-800">
              <span className="flex items-center space-x-2">
                <FileCode className="w-4 h-4 text-sky-400" />
                <span className="text-white font-bold">
                  poly.lock (Cryptographic Composite Format)
                </span>
              </span>
              <span className="text-emerald-400">version: 1</span>
            </div>
            <pre className="text-slate-300 bg-[#06090F] p-4 rounded-xl border border-slate-800/80 overflow-x-auto">
              {`# poly.lock — Auto-generated by Poly. DO NOT EDIT DIRECTLY.
version = 1
hash = "4e88d7b0a912fd834b...e018a3"
timestamp = "2026-11-16T10:05:14.281Z"

[[members]]
path = "apps/web"
ecosystem = "npm"
manager = "pnpm"
manifest_hash = "sha256:8f9a2e..."
lockfile_hash = "sha256:1b3c4d..."

[[members]]
path = "services/api"
ecosystem = "pypi"
manager = "uv"
manifest_hash = "sha256:5e6f7a..."
lockfile_hash = "sha256:9c0d1e..."

[[members]]
path = "crates/core"
ecosystem = "cargo"
manager = "cargo"
manifest_hash = "sha256:3a4b5c..."
lockfile_hash = "sha256:7d8e9f..."`}
            </pre>
          </div>
        )}

        {activeTab === "mcp" && (
          <div className="max-w-3xl mx-auto p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl font-mono text-xs sm:text-sm">
            <div className="flex items-center justify-between text-slate-400 mb-4 pb-2 border-b border-slate-800">
              <span className="flex items-center space-x-2">
                <Bot className="w-4 h-4 text-cyan-400" />
                <span className="text-white font-bold">
                  Model Context Protocol (MCP) Tools Schema
                </span>
              </span>
              <span className="text-cyan-400">JSON-RPC 2.0</span>
            </div>
            <pre className="text-slate-300 bg-[#06090F] p-4 rounded-xl border border-slate-800/80 overflow-x-auto">
              {`// Exposed Tools for Cursor, Claude Desktop, and Agent Mesh
{
  "tools": [
    { "name": "poly_detect_workspace", "description": "Inspect monorepo members and active ecosystems" },
    { "name": "poly_resolve_package", "description": "Resolve PURL shorthand into concrete ecosystem commands" },
    { "name": "poly_verify_lock", "description": "Check composite poly.lock cryptographic integrity & drift" },
    { "name": "poly_doctor", "description": "Run diagnostic check on runtimes, compilers, and registries" },
    { "name": "poly_fix_vulnerabilities", "description": "Auto-patch vulnerable dependencies across manifests" },
    { "name": "poly_generate_docker", "description": "Generate multi-stage Docker & DevContainer files" }
  ]
}`}
            </pre>
          </div>
        )}
      </div>
    </section>
  );
};
