import { BookOpen, Bot, Check, Copy, FileText, GitBranch, Terminal, X } from "lucide-react";
import type React from "react";
import { useState } from "react";

interface DocsModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: string;
}

export const DocsModal: React.FC<DocsModalProps> = ({
  isOpen,
  onClose,
  defaultTab = "quickstart",
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(id);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#0B0F17] border border-slate-800 rounded-3xl w-full max-w-5xl h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 border-b border-slate-800 shrink-0">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-sky-400" />
            <h2 className="text-lg font-bold text-white">Poly Official Documentation</h2>
            <span className="text-xs px-2 py-0.5 rounded bg-sky-950 text-sky-400 border border-sky-800">
              v0.6.1
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body with Sidebar */}
        <div className="flex-1 flex overflow-hidden">
          {/* Docs Sidebar Tabs */}
          <div className="w-60 bg-slate-900/40 border-r border-slate-800 p-4 space-y-1.5 overflow-y-auto shrink-0 text-xs sm:text-sm font-medium">
            <button
              onClick={() => setActiveTab("quickstart")}
              className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-left transition-colors ${
                activeTab === "quickstart"
                  ? "bg-sky-500 text-slate-950 font-bold"
                  : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              <Terminal className="w-4 h-4" />
              <span>Quickstart Guide</span>
            </button>
            <button
              onClick={() => setActiveTab("commands")}
              className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-left transition-colors ${
                activeTab === "commands"
                  ? "bg-sky-500 text-slate-950 font-bold"
                  : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>CLI Reference</span>
            </button>
            <button
              onClick={() => setActiveTab("config")}
              className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-left transition-colors ${
                activeTab === "config"
                  ? "bg-sky-500 text-slate-950 font-bold"
                  : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>poly.toml Schema</span>
            </button>
            <button
              onClick={() => setActiveTab("ci")}
              className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-left transition-colors ${
                activeTab === "ci"
                  ? "bg-sky-500 text-slate-950 font-bold"
                  : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              <GitBranch className="w-4 h-4" />
              <span>GitHub Actions & CI</span>
            </button>
            <button
              onClick={() => setActiveTab("mcp")}
              className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-left transition-colors ${
                activeTab === "mcp"
                  ? "bg-sky-500 text-slate-950 font-bold"
                  : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              <Bot className="w-4 h-4" />
              <span>AI Agents (MCP)</span>
            </button>
          </div>

          {/* Docs Content Panel */}
          <div className="flex-1 p-8 overflow-y-auto font-sans text-slate-300 space-y-6">
            {activeTab === "quickstart" && (
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Quickstart: Get Up and Running in 60s
                </h3>
                <p className="text-sm text-slate-400 mb-6">
                  Install Poly globally via npm. It works seamlessly alongside existing toolchains
                  with zero required migration.
                </p>

                <div className="space-y-4">
                  <div className="bg-[#06090F] p-4 rounded-xl border border-slate-800 relative font-mono text-xs sm:text-sm">
                    <div className="text-slate-500 mb-1"># 1. Install Poly globally</div>
                    <div className="text-sky-400">npm install -g @ritualdev-lab/poly</div>
                    <button
                      onClick={() => copyToClipboard("npm install -g @ritualdev-lab/poly", "c1")}
                      className="absolute top-3 right-3 p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                    >
                      {copiedSnippet === "c1" ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <div className="bg-[#06090F] p-4 rounded-xl border border-slate-800 relative font-mono text-xs sm:text-sm">
                    <div className="text-slate-500 mb-1">
                      # 2. Check toolchains and system health
                    </div>
                    <div className="text-sky-400">poly doctor</div>
                  </div>

                  <div className="bg-[#06090F] p-4 rounded-xl border border-slate-800 relative font-mono text-xs sm:text-sm">
                    <div className="text-slate-500 mb-1">
                      # 3. Add cross-stack packages concurrently
                    </div>
                    <div className="text-sky-400">poly add npm:zod pypi:fastapi cargo:tokio</div>
                  </div>

                  <div className="bg-[#06090F] p-4 rounded-xl border border-slate-800 relative font-mono text-xs sm:text-sm">
                    <div className="text-slate-500 mb-1">
                      # 4. Generate multi-stage container and devcontainer
                    </div>
                    <div className="text-sky-400">poly docker --devcontainer</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "commands" && (
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Complete CLI Reference</h3>
                <div className="grid grid-cols-1 gap-4 text-xs sm:text-sm">
                  <div className="p-4 rounded-xl bg-[#06090F] border border-slate-800">
                    <div className="font-mono font-bold text-sky-400 mb-1">
                      poly add &lt;purl...&gt;
                    </div>
                    <div className="text-slate-400">
                      Resolves shorthand PURLs (npm:, pypi:, cargo:, go:) and delegates to closest
                      engine.
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-[#06090F] border border-slate-800">
                    <div className="font-mono font-bold text-sky-400 mb-1">
                      poly install, sync, i [--frozen]
                    </div>
                    <div className="text-slate-400">
                      Installs dependencies across all workspace members and generates or verifies
                      poly.lock.
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-[#06090F] border border-slate-800">
                    <div className="font-mono font-bold text-sky-400 mb-1">
                      poly update [pkg...]
                    </div>
                    <div className="text-slate-400">
                      Upgrades packages to their latest compatible versions across all engines.
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-[#06090F] border border-slate-800">
                    <div className="font-mono font-bold text-sky-400 mb-1">
                      poly audit [--fix] [--fail-on &lt;level&gt;]
                    </div>
                    <div className="text-slate-400">
                      Audits dependencies against the OSV CVE database and auto-patches manifests
                      when --fix is provided.
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-[#06090F] border border-slate-800">
                    <div className="font-mono font-bold text-sky-400 mb-1">
                      poly doctor [--json]
                    </div>
                    <div className="text-slate-400">
                      Executes comprehensive diagnostics on Node, Python, Rust, Go, C/C++
                      toolchains, and registry latencies.
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-[#06090F] border border-slate-800">
                    <div className="font-mono font-bold text-sky-400 mb-1">
                      poly docker [--devcontainer] [--dry-run]
                    </div>
                    <div className="text-slate-400">
                      Generates hardened multi-stage Dockerfile with BuildKit cache mounts and
                      Codespaces devcontainer.
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-[#06090F] border border-slate-800">
                    <div className="font-mono font-bold text-sky-400 mb-1">
                      poly dev [--filter &lt;pattern&gt;]
                    </div>
                    <div className="text-slate-400">
                      Cross-Service Dev Matrix: Concurrently streams color-coded output from all
                      services and handles graceful process termination on Ctrl+C.
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-[#06090F] border border-slate-800">
                    <div className="font-mono font-bold text-sky-400 mb-1">
                      poly outdated [--json] & poly upgrade
                    </div>
                    <div className="text-slate-400">
                      Concurrent registry scan across npm, PyPI, crates.io, and Go proxy in
                      &lt;300ms with colorized semver indicators and batch upgrade.
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-[#06090F] border border-slate-800">
                    <div className="font-mono font-bold text-sky-400 mb-1">
                      poly completion &lt;bash|zsh|fish|powershell&gt;
                    </div>
                    <div className="text-slate-400">
                      Fast, zero-dependency tab auto-completion scripts for shell subcommands,
                      flags, members, and dynamic tasks.
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-[#06090F] border border-slate-800">
                    <div className="font-mono font-bold text-sky-400 mb-1">
                      poly cache &lt;save|restore|clean&gt;
                    </div>
                    <div className="text-slate-400">
                      Manages deterministic distributed CI caches across local disk or cloud S3/R2
                      storage.
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-[#06090F] border border-slate-800">
                    <div className="font-mono font-bold text-sky-400 mb-1">poly mcp [--config]</div>
                    <div className="text-slate-400">
                      Launches stdio Model Context Protocol (MCP) server for AI coding agents
                      (Cursor, Claude, Windsurf).
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "config" && (
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">poly.toml Configuration File</h3>
                <p className="text-sm text-slate-400 mb-4">
                  Place a `poly.toml` in your repository root to configure workspaces and mirrors:
                </p>
                <pre className="p-4 rounded-xl bg-[#06090F] border border-slate-800 font-mono text-xs sm:text-sm text-slate-200 overflow-x-auto">
                  {`[workspace]
members = [
  "apps/*",
  "services/*",
  "crates/*",
  "pkg/*"
]

[engines]
node = "pnpm"    # "pnpm" | "bun" | "yarn" | "npm"
python = "uv"     # "uv" | "pip"
rust = "cargo"
go = "go"

[registries]
npm = "https://registry.npmjs.org/"
pypi = "https://pypi.org/simple"
cargo = "https://crates.io"

[cache]
adapter = "local" # "local" | "s3"
ttl_days = 14`}
                </pre>
              </div>
            )}

            {activeTab === "ci" && (
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Official GitHub Action: setup-poly
                </h3>
                <p className="text-sm text-slate-400 mb-4">
                  Add <code className="text-sky-400 font-mono">RitualDev-Lab/setup-poly@v1</code> to
                  your GitHub Actions workflow for instant installation and cross-stack caching:
                </p>
                <pre className="p-4 rounded-xl bg-[#06090F] border border-slate-800 font-mono text-xs sm:text-sm text-slate-200 overflow-x-auto">
                  {`name: CI Matrix
on: [push, pull_request]

jobs:
  test:
    runs-on: \${{ matrix.os }}
    strategy:
      matrix:
        os: [ubuntu-latest, macos-latest, windows-latest]
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Poly Orchestrator
        uses: RitualDev-Lab/setup-poly@v1
        with:
          version: 'latest'
          cache: true

      - name: Frozen Polyglot Install
        run: poly install --frozen

      - name: Cross-Stack Test
        run: poly run test`}
                </pre>
              </div>
            )}

            {activeTab === "mcp" && (
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  AI Agent Integration (Cursor & Claude)
                </h3>
                <p className="text-sm text-slate-400 mb-4">
                  Connect Poly directly to Cursor or Claude Desktop via Model Context Protocol:
                </p>
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-[#06090F] border border-slate-800">
                    <div className="text-xs text-sky-400 font-bold mb-2">
                      Automated IDE Setup Command:
                    </div>
                    <div className="font-mono text-sm text-white">poly init --ide all</div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#06090F] border border-slate-800">
                    <div className="text-xs text-slate-400 font-bold mb-2">
                      Cursor Config (.cursor/mcp.json):
                    </div>
                    <pre className="font-mono text-xs text-slate-300">
                      {`{
  "mcpServers": {
    "poly": {
      "command": "poly",
      "args": ["mcp"]
    }
  }
}`}
                    </pre>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
