import { Check, Copy, Play, RefreshCw, Sparkles, Terminal } from "lucide-react";
import type React from "react";
import { useState } from "react";

interface TerminalScenario {
  id: string;
  name: string;
  command: string;
  badge: string;
  output: Array<{ text: string; color?: string; bold?: boolean }>;
}

export const TerminalDemo: React.FC = () => {
  const scenarios: TerminalScenario[] = [
    {
      id: "agent",
      name: "AI Agent & Sandbox",
      command: "poly add --agent --sandbox npm:zod pypi:fastapi",
      badge: "AI Optimization",
      output: [
        {
          text: "🛡️ [poly:sandbox] Pre-flight lifecycle script analysis active...",
          color: "text-sky-400",
          bold: true,
        },
        {
          text: "  ✔ npm:zod@3.23.8: 0 lifecycle scripts (postinstall: none) -> Clean",
          color: "text-emerald-400",
        },
        {
          text: "  ✔ pypi:fastapi: wheel distribution verified -> Injected --no-build-isolation",
          color: "text-emerald-400",
        },
        {
          text: "⚡ [poly:sandbox] Enforcing --ignore-scripts across Node/Python child processes",
          color: "text-slate-300",
        },
        { text: "" },
        {
          text: '{"status":"ok","command":"add","ecosystem":"polyglot","count":2,"installed":[{"purl":"npm:zod@3.23.8","ecosystem":"npm"},{"purl":"pypi:fastapi","ecosystem":"pypi"}],"sandbox":{"sandboxed":true,"neutralizedScripts":0},"metrics":{"durationMs":312,"tokensSaved":1920}}',
          color: "text-emerald-300",
          bold: true,
        },
        { text: "" },
        {
          text: "✨ Agent mode: 42 tokens emitted vs ~2,100 tokens of raw npm/pip logs (98% token savings).",
          color: "text-sky-400",
          bold: true,
        },
      ],
    },
    {
      id: "dev",
      name: "Parallel Dev Matrix",
      command: "poly dev",
      badge: "Cross-Service Matrix",
      output: [
        {
          text: "⚡ [poly] Launching parallel dev matrix across 3 services (Ctrl+C to stop)...",
          color: "text-sky-400",
          bold: true,
        },
        {
          text: "[web:dev]    ▲ Next.js 15.0.3 - Local: http://localhost:3000",
          color: "text-cyan-400",
        },
        {
          text: "[api:dev]    INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)",
          color: "text-emerald-400",
        },
        {
          text: "[worker:dev] [Cargo]   Running unbuffered event stream consumer (16 threads)",
          color: "text-amber-400",
        },
        {
          text: "[web:dev]    ✓ Compiled /page in 420ms",
          color: "text-cyan-400",
        },
        {
          text: "[api:dev]    INFO:     200 OK GET /v1/health (1.2ms)",
          color: "text-emerald-400",
        },
        { text: "" },
        {
          text: "✨ Multi-service dev runner active. Unified process tree with graceful termination.",
          color: "text-white",
          bold: true,
        },
      ],
    },
    {
      id: "outdated",
      name: "Upgrade Intelligence",
      command: "poly outdated",
      badge: "Semver Intelligence",
      output: [
        {
          text: "⚡ [poly] Scanning outdated dependencies across Node, Python, Rust, and Go...",
          color: "text-sky-400",
          bold: true,
        },
        {
          text: "Package            Current    Wanted     Latest     Ecosystem   Location",
          color: "text-slate-400",
          bold: true,
        },
        {
          text: "zod                3.22.4     3.23.8     3.23.8     npm         apps/web",
          color: "text-amber-400",
        },
        {
          text: "pydantic           2.8.2      2.9.2      2.9.2      pypi        services/api",
          color: "text-amber-400",
        },
        {
          text: "tokio              1.38.0     1.41.0     1.41.0     cargo       crates/engine",
          color: "text-amber-400",
        },
        {
          text: "react              18.3.1     18.3.1     19.0.0     npm         apps/web",
          color: "text-rose-400",
        },
        { text: "" },
        {
          text: "💡 Run 'poly upgrade' or 'poly upgrade --interactive' to safely apply updates.",
          color: "text-emerald-400",
          bold: true,
        },
      ],
    },
    {
      id: "add",
      name: "Polyglot Add",
      command: "poly add npm:zod@3.23.8 pypi:fastapi cargo:tokio",
      badge: "PURL Routing",
      output: [
        {
          text: "⚡ [poly] Resolving 3 polyglot dependencies across 3 ecosystems...",
          color: "text-sky-400",
          bold: true,
        },
        {
          text: "  ✔ [npm]   zod@3.23.8 -> resolved via pnpm (node_modules/zod)",
          color: "text-emerald-400",
        },
        {
          text: "  ✔ [pypi]  fastapi -> resolved via uv (0.5.1) in .venv",
          color: "text-emerald-400",
        },
        {
          text: "  ✔ [cargo] tokio -> resolved via cargo (features: ['full'])",
          color: "text-emerald-400",
        },
        { text: "" },
        { text: "⚡ [poly] Reconciling composite lockfile...", color: "text-slate-400" },
        {
          text: "  ✔ Updated poly.lock [SHA256: 4e88d7b0a...912f] (0 drift detected)",
          color: "text-emerald-400",
          bold: true,
        },
        { text: "✨ Successfully installed 3 packages in 412ms.", color: "text-white", bold: true },
      ],
    },
    {
      id: "doctor",
      name: "System Doctor",
      command: "poly doctor",
      badge: "Diagnostics",
      output: [
        {
          text: "⚡ [poly] Running comprehensive toolchain & registry diagnostic...",
          color: "text-sky-400",
          bold: true,
        },
        {
          text: "  [Node.js]  Node.js v22.11.0 (LTS) | Package Manager: pnpm v9.15.4  [OK]",
          color: "text-emerald-400",
        },
        {
          text: "  [Python]   Python 3.12.3          | Fast Runner: Astral uv v0.5.1   [OK]",
          color: "text-emerald-400",
        },
        {
          text: "  [Rust]     rustc 1.84.0           | Build Tool: cargo v1.84.0       [OK]",
          color: "text-emerald-400",
        },
        {
          text: "  [Go]       go version go1.23.2    | Compiler & Modules ready        [OK]",
          color: "text-emerald-400",
        },
        {
          text: "  [Native]   clang / gcc 14.2.0     | C/C++ Native Toolchain ready    [OK]",
          color: "text-emerald-400",
        },
        {
          text: "  [Network]  npm: 42ms | PyPI: 61ms | crates.io: 88ms                 [OK]",
          color: "text-emerald-400",
        },
        {
          text: "  [Lockfile] poly.lock integrity verified | Cryptographic Drift: 0%  [OK]",
          color: "text-emerald-400",
        },
        { text: "" },
        {
          text: "✔ PolyDoctor: All 7 diagnostic suites passed with zero errors (2.6s).",
          color: "text-emerald-400",
          bold: true,
        },
      ],
    },
    {
      id: "fix",
      name: "Auto-Heal CVEs",
      command: "poly fix",
      badge: "Security Remediation",
      output: [
        {
          text: "⚡ [poly] Auditing 412 monorepo dependencies against OSV Database...",
          color: "text-sky-400",
          bold: true,
        },
        {
          text: "  [npm]  axios@0.21.1: GHSA-42xw-2xvc-rh8d (High) -> Fixed in >=0.21.2",
          color: "text-amber-400",
        },
        {
          text: "  [pypi] urllib3@1.26.4: GHSA-q2q7-5pp4-w6pg (Moderate) -> Fixed in >=1.26.5",
          color: "text-amber-400",
        },
        { text: "" },
        { text: "⚡ [poly] Applying automated security patches...", color: "text-sky-400" },
        { text: "  ✔ Patched apps/web/package.json: axios -> ^0.21.4", color: "text-emerald-400" },
        {
          text: "  ✔ Patched services/api/pyproject.toml: urllib3 -> >=1.26.5",
          color: "text-emerald-400",
        },
        { text: "  ✔ Re-locked poly.lock with zero regression", color: "text-emerald-400" },
        {
          text: "🛡️ Auto-healed 2 vulnerabilities. Monorepo audit clean.",
          color: "text-white",
          bold: true,
        },
      ],
    },
    {
      id: "docker",
      name: "Docker Generator",
      command: "poly docker --devcontainer",
      badge: "Containers",
      output: [
        {
          text: "⚡ [poly] Generating polyglot multi-stage Docker & container configuration...",
          color: "text-sky-400",
          bold: true,
        },
        {
          text: "  ✔ Created Dockerfile (Multi-stage: node-builder, python-builder, runner)",
          color: "text-emerald-400",
        },
        {
          text: "  ✔ Created docker-compose.yml (Services: web:3000, api:4000)",
          color: "text-emerald-400",
        },
        {
          text: "  ✔ Created .devcontainer/devcontainer.json (VS Code & Codespaces ready)",
          color: "text-emerald-400",
        },
        {
          text: "  ✔ Injected BuildKit high-speed cache mounts (/root/.npm, /root/.cache/uv)",
          color: "text-slate-300",
        },
        {
          text: "  ✔ Hardened unprivileged appuser (UID 10001) for zero-trust runtime",
          color: "text-slate-300",
        },
        {
          text: "✨ Multi-stage container files generated successfully in 34ms.",
          color: "text-white",
          bold: true,
        },
      ],
    },
    {
      id: "cache",
      name: "Remote CI Cache",
      command: "poly cache restore",
      badge: "CI Optimization",
      output: [
        {
          text: "⚡ [poly] Computing deterministic cache key...",
          color: "text-sky-400",
          bold: true,
        },
        { text: "  Cache Key: poly-cache-linux-x64-sha256:9c1a5f4...", color: "text-slate-400" },
        {
          text: "  [Remote Cache] Hit found in S3 bucket 'enterprise-poly-cache' (214 MB)",
          color: "text-emerald-400",
        },
        {
          text: "  [Streaming] Restoring node_modules, .venv, target/ in parallel...",
          color: "text-slate-300",
        },
        { text: "  ✔ Restored 18,420 files across 4 packages (1.4s)", color: "text-emerald-400" },
        {
          text: "🚀 CI Cache restored in 1.4s (saved 7m 42s of native compilation).",
          color: "text-white",
          bold: true,
        },
      ],
    },
    {
      id: "mcp",
      name: "AI Agent (MCP)",
      command: "poly mcp",
      badge: "Cursor & Claude",
      output: [
        {
          text: "⚡ [poly] Starting Model Context Protocol (MCP) server over stdio...",
          color: "text-sky-400",
          bold: true,
        },
        { text: "  Protocol Version: 2024-11-05 (JSON-RPC 2.0)", color: "text-slate-400" },
        {
          text: "  Registered Tools: poly_detect_workspace, poly_resolve_package, poly_verify_lock, poly_doctor, poly_fix_vulnerabilities, poly_generate_docker",
          color: "text-slate-300",
        },
        {
          text: "  Registered Resources: poly://workspace/config, poly://workspace/lockfile",
          color: "text-slate-300",
        },
        {
          text: "  Client Connected: Cursor IDE Agent (session: agent-9182)",
          color: "text-emerald-400",
        },
        {
          text: "🤖 MCP AI coding agent mesh active and ready for tool execution.",
          color: "text-white",
          bold: true,
        },
      ],
    },
  ];

  const [activeScenario, setActiveScenario] = useState<TerminalScenario>(scenarios[0]);
  const [copied, setCopied] = useState(false);
  const [customInput, setCustomInput] = useState("");
  const [customOutputs, setCustomOutputs] = useState<
    Array<{ text: string; color?: string; bold?: boolean }>
  >([]);

  const handleCopy = () => {
    const fullText = `$ ${activeScenario.command}\n${activeScenario.output.map((o) => o.text).join("\n")}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;

    const cmd = customInput.trim();
    const matched = scenarios.find(
      (s) => s.command.toLowerCase().includes(cmd.toLowerCase()) || cmd.includes(s.id),
    );
    if (matched) {
      setActiveScenario(matched);
      setCustomOutputs([]);
    } else if (cmd === "help" || cmd === "--help" || cmd === "-h") {
      setCustomOutputs([
        { text: "⚡ poly <command> [options]", color: "text-sky-400", bold: true },
        { text: "Available commands:", color: "text-white" },
        {
          text: "  add <purl...>     Install dependencies (e.g. npm:zod, pypi:uv)",
          color: "text-slate-300",
        },
        {
          text: "  dev               Run parallel cross-service development matrix",
          color: "text-slate-300",
        },
        {
          text: "  outdated          Inspect pending updates across all 4 ecosystems",
          color: "text-slate-300",
        },
        {
          text: "  agent <cmd>       Token-efficient commands for AI coding agents",
          color: "text-slate-300",
        },
        {
          text: "  sandbox check     Scan packages for malicious lifecycle scripts",
          color: "text-slate-300",
        },
        {
          text: "  doctor            Run complete toolchain & registry diagnostics",
          color: "text-slate-300",
        },
        {
          text: "  fix               Automated CVE vulnerability auto-heal",
          color: "text-slate-300",
        },
        {
          text: "  docker            Generate multi-stage Docker & DevContainers",
          color: "text-slate-300",
        },
        {
          text: "  cache <save|restore> Manage distributed CI remote cache",
          color: "text-slate-300",
        },
        {
          text: "  mcp               Start stdio Model Context Protocol AI server",
          color: "text-slate-300",
        },
      ]);
    } else if (cmd === "clear") {
      setCustomOutputs([]);
    } else {
      setCustomOutputs([
        { text: `Executing '${cmd}'...`, color: "text-slate-400" },
        { text: `⚡ [poly] Dispatched '${cmd}' across 4 ecosystems.`, color: "text-emerald-400" },
        {
          text: "Try clicking one of the scenario tabs above to see full interactive output.",
          color: "text-sky-300",
        },
      ]);
    }
    setCustomInput("");
  };

  return (
    <section id="terminal" className="py-20 bg-[#090D14] border-y border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-950 text-sky-400 border border-sky-800/60 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive CLI Simulator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Experience Poly in Action
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            See how Poly replaces fragmented tools with unified commands, cryptographic
            verification, and instant speed. Click any scenario below:
          </p>
        </div>

        {/* Scenario Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {scenarios.map((s) => (
            <button
              key={s.id}
              onClick={() => {
                setActiveScenario(s);
                setCustomOutputs([]);
              }}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                activeScenario.id === s.id && customOutputs.length === 0
                  ? "bg-sky-500 text-slate-950 font-bold shadow-lg shadow-sky-500/25 scale-[1.02]"
                  : "bg-slate-900/90 text-slate-300 border border-slate-800 hover:border-slate-700 hover:text-white"
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>{s.name}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded ${
                  activeScenario.id === s.id && customOutputs.length === 0
                    ? "bg-slate-950/20 text-slate-950"
                    : "bg-slate-800 text-slate-400"
                }`}
              >
                {s.badge}
              </span>
            </button>
          ))}
        </div>

        {/* Terminal Window */}
        <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden border border-slate-800 bg-[#0B0F17] shadow-2xl shadow-black/80 font-mono">
          {/* Top Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-slate-900/90 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="ml-3 text-xs text-slate-400">
                ~/projects/polyglot-monorepo — zsh
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleCopy}
                className="flex items-center space-x-1.5 px-2.5 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-xs text-slate-300 transition-colors"
                title="Copy terminal output"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
              <button
                onClick={() => {
                  setCustomOutputs([]);
                }}
                className="p-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                title="Rerun scenario"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-6 text-sm overflow-x-auto min-h-[300px] max-h-[460px] terminal-scroll space-y-1.5">
            {/* Command Line Prompt */}
            <div className="flex items-center space-x-2 text-slate-300 pb-2 border-b border-slate-800/60 mb-3">
              <span className="text-sky-400 font-bold">polyglot-monorepo</span>
              <span className="text-purple-400">on git:main</span>
              <span className="text-emerald-400">&gt;</span>
              <span className="text-white font-semibold">{activeScenario.command}</span>
            </div>

            {/* Display Outputs */}
            {(customOutputs.length > 0 ? customOutputs : activeScenario.output).map((line, idx) => (
              <div
                // biome-ignore lint/suspicious/noArrayIndexKey: terminal lines are indexed
                key={idx}
                className={`leading-relaxed whitespace-pre ${line.color ?? "text-slate-300"} ${
                  line.bold ? "font-bold" : ""
                }`}
              >
                {line.text}
              </div>
            ))}

            {/* Interactive Prompt Line */}
            <form
              onSubmit={handleRunCustom}
              className="pt-4 flex items-center space-x-2 border-t border-slate-800/60 mt-4"
            >
              <span className="text-sky-400 font-bold">&gt;</span>
              <input
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder="Type 'help', 'doctor', 'fix', 'docker', 'cache', or 'mcp'..."
                className="bg-transparent border-none text-white text-sm focus:outline-none flex-1 placeholder:text-slate-600 font-mono"
              />
              <button
                type="submit"
                className="px-2.5 py-1 rounded bg-sky-500/20 hover:bg-sky-500/30 text-sky-400 text-xs font-semibold flex items-center space-x-1"
              >
                <Play className="w-3 h-3 fill-sky-400" />
                <span>Run</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
