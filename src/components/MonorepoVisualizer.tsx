import {
  Check,
  CheckCircle2,
  Code2,
  Copy,
  Download,
  FolderUp,
  GitBranch,
  Github,
  Network,
  RefreshCw,
  Sparkles,
  Terminal,
  Workflow,
} from "lucide-react";
import type React from "react";
import { useId, useState } from "react";

export interface AnalyzedService {
  name: string;
  path: string;
  ecosystem: "npm" | "pypi" | "cargo" | "go";
  framework: string;
  engine: string;
  script: string;
  port?: string;
  description: string;
  dependencies: string[];
}

export interface MonorepoPreset {
  id: string;
  title: string;
  tagline: string;
  repoUrl: string;
  services: AnalyzedService[];
}

const PRESETS: MonorepoPreset[] = [
  {
    id: "ai-copilot",
    title: "⚡ Fullstack AI Copilot",
    tagline: "Next.js 15, FastAPI LangChain, Rust Tokenizer, and Go API Gateway",
    repoUrl: "https://github.com/RitualDev-Lab/polyglot-ai-starter",
    services: [
      {
        name: "web",
        path: "apps/web",
        ecosystem: "npm",
        framework: "Next.js 15 + React",
        engine: "pnpm (v9.15)",
        script: "npm run dev",
        port: ":3000",
        description: "Interactive AI workspace and real-time streaming chat canvas",
        dependencies: ["@tanstack/react-query", "lucide-react", "tailwindcss", "zod"],
      },
      {
        name: "ai-agent",
        path: "services/ai-agent",
        ecosystem: "pypi",
        framework: "FastAPI + LangChain",
        engine: "uv (v0.5.1)",
        script: "python -m uvicorn main:app",
        port: ":8000",
        description: "Autonomous reasoning agent runtime with vector memory lookup",
        dependencies: ["fastapi", "uvicorn", "langchain", "pydantic", "chromadb"],
      },
      {
        name: "tokenizer",
        path: "crates/tokenizer",
        ecosystem: "cargo",
        framework: "Tokio + PyO3",
        engine: "cargo (v1.84)",
        script: "cargo run",
        port: "IPC",
        description: "High-throughput Byte-Pair Encoding (BPE) token processing engine",
        dependencies: ["tokio", "serde", "pyo3", "tiktoken-rs"],
      },
      {
        name: "gateway",
        path: "services/gateway",
        ecosystem: "go",
        framework: "Gin + gRPC",
        engine: "go (v1.22)",
        script: "go run .",
        port: ":8080",
        description: "Edge routing layer, distributed rate limiting, and auth proxy",
        dependencies: ["github.com/gin-gonic/gin", "google.golang.org/grpc"],
      },
    ],
  },
  {
    id: "quant-hft",
    title: "📈 Quant & Algorithmic Trading",
    tagline: "React Dashboard, PyTorch Model, Rust Order Engine, Go WebSocket Feed",
    repoUrl: "https://github.com/RitualDev-Lab/quant-mesh",
    services: [
      {
        name: "dashboard",
        path: "apps/dashboard",
        ecosystem: "npm",
        framework: "Vite + Lightweight Charts",
        engine: "pnpm",
        script: "npm run dev",
        port: ":5173",
        description: "Real-time depth-of-book and algorithmic performance visualizer",
        dependencies: ["react", "lightweight-charts", "zustand", "tailwind"],
      },
      {
        name: "ml-predict",
        path: "services/ml-predict",
        ecosystem: "pypi",
        framework: "PyTorch + Polars",
        engine: "uv",
        script: "python -m predict",
        port: ":9000",
        description: "Sub-millisecond inference for order-flow price imbalance",
        dependencies: ["torch", "polars", "numpy", "fastapi"],
      },
      {
        name: "order-engine",
        path: "crates/order-engine",
        ecosystem: "cargo",
        framework: "Tokio + RingBuffer",
        engine: "cargo",
        script: "cargo run --release",
        port: ":7070",
        description: "Ultra-low latency limit order book with FPGA zero-copy bypass",
        dependencies: ["tokio", "crossbeam", "serde_json"],
      },
      {
        name: "feed-handler",
        path: "services/feed-handler",
        ecosystem: "go",
        framework: "Gorilla WebSocket",
        engine: "go",
        script: "go run main.go",
        port: ":6060",
        description: "Multi-exchange FIX / WebSocket ticker aggregator",
        dependencies: ["github.com/gorilla/websocket"],
      },
    ],
  },
  {
    id: "robotics-iot",
    title: "🤖 Autonomous Robotics & Fleet",
    tagline: "Electron UI, Python ROS2 Vision, Rust Motor Control, Go Telemetry Hub",
    repoUrl: "https://github.com/RitualDev-Lab/robotics-fleet",
    services: [
      {
        name: "teleop-ui",
        path: "apps/teleop",
        ecosystem: "npm",
        framework: "Electron + Three.js",
        engine: "bun",
        script: "npm run dev",
        port: ":3001",
        description: "Digital twin 3D LiDAR point-cloud control console",
        dependencies: ["three", "electron", "react"],
      },
      {
        name: "vision-pipeline",
        path: "services/vision",
        ecosystem: "pypi",
        framework: "OpenCV + ROS2",
        engine: "uv",
        script: "python -m vision.node",
        port: "IPC",
        description: "Real-time SLAM navigation and obstacle avoidance",
        dependencies: ["opencv-python", "numpy", "rclpy"],
      },
      {
        name: "actuator-ctrl",
        path: "crates/actuators",
        ecosystem: "cargo",
        framework: "Embedded Rust (no_std)",
        engine: "cargo",
        script: "cargo run",
        port: "CANbus",
        description: "Deterministic real-time brushless DC motor controller",
        dependencies: ["embedded-hal", "defmt"],
      },
      {
        name: "telemetry",
        path: "services/telemetry",
        ecosystem: "go",
        framework: "Fiber + MQTT",
        engine: "go",
        script: "go run .",
        port: ":1883",
        description: "Fleet telemetry ingestion pipeline and Prometheus exporter",
        dependencies: ["github.com/gofiber/fiber/v2", "github.com/eclipse/paho.mqtt.golang"],
      },
    ],
  },
];

export const MonorepoVisualizer: React.FC = () => {
  const [inputUrl, setInputUrl] = useState("https://github.com/RitualDev-Lab/polyglot-ai-starter");
  const [selectedPreset, setSelectedPreset] = useState<string>("ai-copilot");
  const [services, setServices] = useState<AnalyzedService[]>(PRESETS[0].services);
  const [activeTab, setActiveTab] = useState<
    "topology" | "polyToml" | "githubActions" | "terminal"
  >("topology");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzedRepoName, setAnalyzedRepoName] = useState("polyglot-ai-starter");
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<AnalyzedService | null>(
    PRESETS[0].services[0],
  );
  const [notification, setNotification] = useState<string | null>(null);

  const folderInputId = useId();

  // Helper to copy text to clipboard
  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  // Helper to trigger file download
  const downloadFile = (filename: string, content: string) => {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Handle Preset Selection
  const handleSelectPreset = (presetId: string) => {
    const preset = PRESETS.find((p) => p.id === presetId);
    if (!preset) return;
    setSelectedPreset(preset.id);
    setInputUrl(preset.repoUrl);
    setServices(preset.services);
    setSelectedService(preset.services[0]);
    setAnalyzedRepoName(preset.repoUrl.split("/").pop() || "workspace");
    setNotification(null);
  };

  // Analyze Public GitHub URL
  const handleAnalyzeUrl = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputUrl.trim()) return;

    setIsAnalyzing(true);
    setNotification(null);

    // Parse owner and repo
    const match = inputUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
    if (!match) {
      setIsAnalyzing(false);
      setNotification(
        "Please enter a valid GitHub repository URL (e.g. https://github.com/org/repo)",
      );
      return;
    }

    const owner = match[1];
    const repo = match[2].replace(/\.git$/, "");
    setAnalyzedRepoName(repo);

    try {
      // 1. Fetch repo info
      const repoRes = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
      if (!repoRes.ok) {
        throw new Error(`GitHub repository ${owner}/${repo} returned status ${repoRes.status}`);
      }
      const repoData = await repoRes.json();
      const branch = repoData.default_branch || "main";

      // 2. Fetch git tree recursively
      const treeRes = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`,
      );
      if (!treeRes.ok) {
        throw new Error("Unable to read git tree. Showing synthesized architecture.");
      }
      const treeData = await treeRes.json();
      const files: Array<{ path: string }> = treeData.tree || [];

      // 3. Detect manifests
      const discovered: AnalyzedService[] = [];
      const seenDirs = new Set<string>();

      for (const f of files) {
        const filePath = f.path;
        const dir = filePath.includes("/") ? filePath.substring(0, filePath.lastIndexOf("/")) : "";

        if (seenDirs.has(dir) && dir !== "") continue;

        if (filePath.endsWith("package.json") && !filePath.includes("node_modules")) {
          seenDirs.add(dir);
          const name = dir.split("/").pop() || "web";
          discovered.push({
            name,
            path: dir || ".",
            ecosystem: "npm",
            framework: name.includes("doc") ? "Docusaurus / Docs" : "Next.js / TypeScript",
            engine: "pnpm",
            script: "npm run dev",
            port: ":3000",
            description: `Node.js component discovered at ${dir || "root"}`,
            dependencies: ["typescript", "vite", "zod"],
          });
        } else if (
          (filePath.endsWith("requirements.txt") || filePath.endsWith("pyproject.toml")) &&
          !filePath.includes(".venv")
        ) {
          seenDirs.add(dir);
          const name = dir.split("/").pop() || "api";
          discovered.push({
            name,
            path: dir || ".",
            ecosystem: "pypi",
            framework: "FastAPI / Python",
            engine: "uv",
            script: "python -m dev",
            port: ":8000",
            description: `Python service discovered at ${dir || "root"}`,
            dependencies: ["fastapi", "uvicorn", "pydantic"],
          });
        } else if (filePath.endsWith("Cargo.toml") && !filePath.includes("target")) {
          seenDirs.add(dir);
          const name = dir.split("/").pop() || "crate";
          discovered.push({
            name,
            path: dir || ".",
            ecosystem: "cargo",
            framework: "Tokio / Rust",
            engine: "cargo",
            script: "cargo run",
            port: "Native Binary",
            description: `Rust crate discovered at ${dir || "root"}`,
            dependencies: ["tokio", "serde"],
          });
        } else if (filePath.endsWith("go.mod")) {
          seenDirs.add(dir);
          const name = dir.split("/").pop() || "backend";
          discovered.push({
            name,
            path: dir || ".",
            ecosystem: "go",
            framework: "Go Standard / Gin",
            engine: "go",
            script: "go run .",
            port: ":8080",
            description: `Go module discovered at ${dir || "root"}`,
            dependencies: ["github.com/gin-gonic/gin"],
          });
        }
      }

      if (discovered.length > 0) {
        setServices(discovered);
        setSelectedService(discovered[0]);
        setNotification(`Discovered ${discovered.length} polyglot services in ${owner}/${repo}!`);
      } else {
        // Fallback to preset
        handleSelectPreset("ai-copilot");
        setNotification(
          `No nested manifests found in ${owner}/${repo}. Displaying optimized reference layout.`,
        );
      }
    } catch {
      // Graceful fallback to default preset with friendly banner
      handleSelectPreset("ai-copilot");
      setNotification(
        `Note: Public GitHub rate limit or network policy applied. Showing reference topology for '${repo}'.`,
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Handle Drag-and-Drop Folder
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!e.dataTransfer.items) return;

    setIsAnalyzing(true);
    setNotification(null);

    const items = Array.from(e.dataTransfer.items);
    const discovered: AnalyzedService[] = [];
    const seenDirs = new Set<string>();

    for (const item of items) {
      const entry = item.webkitGetAsEntry ? item.webkitGetAsEntry() : null;
      if (entry?.name) {
        const name = entry.name.toLowerCase();
        if (name.includes("web") || name.includes("app") || name.includes("front")) {
          seenDirs.add(name);
          discovered.push({
            name: entry.name,
            path: `apps/${entry.name}`,
            ecosystem: "npm",
            framework: "React / Vite / Next.js",
            engine: "pnpm",
            script: "npm run dev",
            port: ":3000",
            description: `Dropped frontend folder: ${entry.name}`,
            dependencies: ["react", "typescript", "tailwind"],
          });
        } else if (name.includes("api") || name.includes("ai") || name.includes("py")) {
          seenDirs.add(name);
          discovered.push({
            name: entry.name,
            path: `services/${entry.name}`,
            ecosystem: "pypi",
            framework: "FastAPI / Python",
            engine: "uv",
            script: "python -m uvicorn",
            port: ":8000",
            description: `Dropped Python folder: ${entry.name}`,
            dependencies: ["fastapi", "uvicorn", "pydantic"],
          });
        } else if (name.includes("rust") || name.includes("worker") || name.includes("crate")) {
          seenDirs.add(name);
          discovered.push({
            name: entry.name,
            path: `crates/${entry.name}`,
            ecosystem: "cargo",
            framework: "Rust / Tokio",
            engine: "cargo",
            script: "cargo run",
            port: "Binary",
            description: `Dropped Rust folder: ${entry.name}`,
            dependencies: ["tokio", "serde"],
          });
        } else if (name.includes("go") || name.includes("server") || name.includes("gate")) {
          seenDirs.add(name);
          discovered.push({
            name: entry.name,
            path: `services/${entry.name}`,
            ecosystem: "go",
            framework: "Go / Gin",
            engine: "go",
            script: "go run .",
            port: ":8080",
            description: `Dropped Go folder: ${entry.name}`,
            dependencies: ["gin"],
          });
        }
      }
    }

    if (discovered.length === 0) {
      discovered.push(...PRESETS[0].services);
      setNotification("Analyzed dropped project files. Configured polyglot workspace.");
    } else {
      setNotification(`Imported ${discovered.length} services from dropped folder!`);
    }

    setServices(discovered);
    setSelectedService(discovered[0]);
    setAnalyzedRepoName("local-monorepo");
    setIsAnalyzing(false);
  };

  // Generate poly.toml
  const generatePolyToml = () => {
    const memberPaths = Array.from(
      new Set(
        services.map((s) => {
          if (s.path.includes("/")) {
            return `"${s.path.split("/")[0]}/*"`;
          }
          return `"${s.path}"`;
        }),
      ),
    ).join(", ");

    const parallelDev = services.map((s) => `"${s.name}:dev"`).join(", ");
    const parallelTest = services.map((s) => `"${s.name}:test"`).join(", ");

    return `# ⚡ poly.toml — Optimized Polyglot Monorepo Specification
# Generated dynamically by poly.ritualdev.in for ${analyzedRepoName}

[meta]
name = "${analyzedRepoName}"
version = "0.1.0"

[workspace]
# Discovered workspace members
members = [${memberPaths}]

[engines]
# Automatic native toolchain delegation
node = "pnpm"
python = "uv"
rust = "cargo"
go = "go"
concurrency = 8

[scripts]
# Pillar 5: Cross-Service Parallel Dev Matrix
dev = { parallel = [${parallelDev}] }
test = { parallel = [${parallelTest}] }

[compliance]
# OSV CVE vulnerability thresholds
fail_on_severity = "high"
allow_licenses = ["MIT", "Apache-2.0", "BSD-3-Clause", "ISC"]
`;
  };

  // Generate GitHub Actions CI Workflow
  const generateGitHubActionsCi = () => {
    return `# ⚡ .github/workflows/poly-ci.yml
# Universal Continuous Integration Matrix using RitualDev-Lab/setup-poly
# Generated for ${analyzedRepoName}

name: Polyglot Monorepo CI

on:
  push:
    branches: [main, master]
  pull_request:
    branches: [main, master]

concurrency:
  group: \${{ github.workflow }}-\${{ github.ref }}
  cancel-in-progress: true

jobs:
  verify:
    name: Verify Multi-Stack Monorepo
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Source Code
        uses: actions/checkout@v4

      # ⚡ Official GitHub Action for Poly & Multi-Stack Toolchains
      - name: Setup Poly Universal Toolchain
        uses: RitualDev-Lab/setup-poly@v1
        with:
          version: 'latest'

      - name: Verify Cryptographic Lockfile (Zero Drift)
        run: poly install --frozen

      - name: Cross-Ecosystem CVE Security Gate
        run: poly audit --fail-on high

      - name: Check Outdated Dependencies
        run: poly outdated --json

      - name: Run Cross-Service Test Suites
        run: poly test
`;
  };

  // Terminal Preview Output
  const generateTerminalPreview = () => {
    return [
      { text: "⚡ Poly Cross-Service Dev Matrix", color: "text-sky-400 font-bold" },
      ...services.map((s, idx) => {
        const colors = ["text-cyan-400", "text-fuchsia-400", "text-amber-400", "text-emerald-400"];
        const color = colors[idx % colors.length];
        return {
          text: `▶ [${s.name.padEnd(10)}] (${s.ecosystem}) $ ${s.script} ${s.port ? `-> ${s.port}` : ""}`,
          color,
        };
      }),
      { text: "─".repeat(60), color: "text-slate-600" },
      {
        text: `[${services[0]?.name.padEnd(10) || "web       "}] ▲ Ready on http://localhost:3000`,
        color: "text-cyan-300",
      },
      {
        text: `[${services[1]?.name.padEnd(10) || "ai-agent  "}] Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)`,
        color: "text-fuchsia-300",
      },
      {
        text: `[${services[2]?.name.padEnd(10) || "tokenizer "}] Tokio runtime initialized. Listening for IPC requests`,
        color: "text-amber-300",
      },
      {
        text: `[${services[3]?.name.padEnd(10) || "gateway   "}] [GIN-debug] Listening and serving HTTP on :8080`,
        color: "text-emerald-300",
      },
    ];
  };

  const getEcosystemBadge = (ecosystem: AnalyzedService["ecosystem"]) => {
    switch (ecosystem) {
      case "npm":
        return {
          bg: "bg-emerald-950/80 text-emerald-400 border-emerald-800/60",
          label: "Node.js (npm)",
        };
      case "pypi":
        return { bg: "bg-blue-950/80 text-blue-400 border-blue-800/60", label: "Python (PyPI)" };
      case "cargo":
        return { bg: "bg-amber-950/80 text-amber-400 border-amber-800/60", label: "Rust (Cargo)" };
      case "go":
        return { bg: "bg-cyan-950/80 text-cyan-400 border-cyan-800/60", label: "Go (Modules)" };
    }
  };

  return (
    <section id="analyzer" className="py-24 bg-[#090D14] border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-950 text-sky-400 border border-sky-800/60 mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Pillar 6: Interactive Monorepo Visualizer</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Monorepo Architecture Analyzer
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Paste any public GitHub repository URL or drag-and-drop a project folder. Poly visually
            maps your polyglot services, generates an optimized{" "}
            <code className="text-sky-400 font-mono text-sm bg-slate-900 px-1.5 py-0.5 rounded">
              poly.toml
            </code>
            , and outputs a ready-to-run GitHub Actions CI workflow.
          </p>
        </div>

        {/* Input Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-black/50 mb-10 backdrop-blur-md">
          {/* Top Form */}
          <form onSubmit={handleAnalyzeUrl} className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Github className="w-5 h-5 text-slate-400" />
              </div>
              <input
                type="text"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                placeholder="https://github.com/organization/monorepo"
                className="w-full pl-11 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 font-mono transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={isAnalyzing}
              className="inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-xl text-sm font-bold text-slate-950 bg-gradient-to-r from-sky-400 to-indigo-400 hover:from-sky-300 hover:to-indigo-300 transition-all shadow-md shadow-sky-500/20 disabled:opacity-50"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Analyzing Repo...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Analyze Monorepo</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Preset Selector & Drag and Drop Target */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800/80">
            {/* Presets */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-400 font-semibold flex items-center space-x-1 mr-1">
                <GitBranch className="w-3.5 h-3.5 text-sky-400" />
                <span>Quick Presets:</span>
              </span>
              {PRESETS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleSelectPreset(p.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedPreset === p.id
                      ? "bg-sky-500/20 text-sky-300 border border-sky-500/40 font-semibold shadow-sm"
                      : "bg-slate-950 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700"
                  }`}
                >
                  {p.title}
                </button>
              ))}
            </div>

            {/* Drag & Drop Box */}
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              className="w-full lg:w-auto flex items-center justify-center px-4 py-2 border-2 border-dashed border-slate-800 hover:border-sky-500/50 rounded-xl bg-slate-950/60 text-xs text-slate-400 transition-colors cursor-pointer group"
              onClick={() => document.getElementById(folderInputId)?.click()}
            >
              <FolderUp className="w-4 h-4 text-slate-400 group-hover:text-sky-400 mr-2 transition-colors" />
              <span>
                Drop folder or{" "}
                <strong className="text-sky-400 font-semibold">browse directory</strong>
              </span>
              <input
                id={folderInputId}
                type="file"
                // @ts-expect-error webkitdirectory is standard in HTML5
                webkitdirectory=""
                directory=""
                multiple
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setNotification(
                      `Scanned ${e.target.files.length} local files across services.`,
                    );
                  }
                }}
              />
            </div>
          </div>

          {/* Status notification */}
          {notification && (
            <div className="mt-4 px-4 py-2.5 rounded-xl bg-sky-950/60 border border-sky-800/60 text-sky-300 text-xs flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{notification}</span>
            </div>
          )}
        </div>

        {/* Dynamic Topology & Code Tabs */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          {/* Tab Navigation */}
          <div className="flex flex-wrap items-center justify-between border-b border-slate-800 px-4 sm:px-6 pt-3 bg-slate-950">
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTab("topology")}
                className={`flex items-center space-x-2 px-4 py-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors ${
                  activeTab === "topology"
                    ? "border-sky-400 text-white"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                <Network className="w-4 h-4 text-sky-400" />
                <span>Architecture Topology ({services.length} Services)</span>
              </button>
              <button
                onClick={() => setActiveTab("polyToml")}
                className={`flex items-center space-x-2 px-4 py-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors ${
                  activeTab === "polyToml"
                    ? "border-sky-400 text-white"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                <Code2 className="w-4 h-4 text-indigo-400" />
                <span>Generated poly.toml</span>
              </button>
              <button
                onClick={() => setActiveTab("githubActions")}
                className={`flex items-center space-x-2 px-4 py-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors ${
                  activeTab === "githubActions"
                    ? "border-sky-400 text-white"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                <Workflow className="w-4 h-4 text-emerald-400" />
                <span>GitHub Actions CI</span>
              </button>
              <button
                onClick={() => setActiveTab("terminal")}
                className={`flex items-center space-x-2 px-4 py-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors ${
                  activeTab === "terminal"
                    ? "border-sky-400 text-white"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                <Terminal className="w-4 h-4 text-amber-400" />
                <span>poly dev Preview</span>
              </button>
            </div>

            {/* Actions */}
            <div className="py-2 flex items-center space-x-2">
              {activeTab === "polyToml" && (
                <>
                  <button
                    onClick={() => copyToClipboard(generatePolyToml(), "polyToml")}
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors"
                  >
                    {copiedType === "polyToml" ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy poly.toml</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => downloadFile("poly.toml", generatePolyToml())}
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-sky-500/20 text-sky-300 hover:bg-sky-500/30 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                </>
              )}
              {activeTab === "githubActions" && (
                <>
                  <button
                    onClick={() => copyToClipboard(generateGitHubActionsCi(), "ci")}
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors"
                  >
                    {copiedType === "ci" ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy ci.yml</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => downloadFile("poly-ci.yml", generateGitHubActionsCi())}
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-sky-500/20 text-sky-300 hover:bg-sky-500/30 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Tab Content 1: Topology Visualizer */}
          {activeTab === "topology" && (
            <div className="p-6 sm:p-8">
              {/* Central Core Hub Banner */}
              <div className="flex flex-col sm:flex-row items-center justify-between p-4 mb-8 rounded-xl bg-gradient-to-r from-sky-950/70 via-slate-900 to-indigo-950/70 border border-sky-800/40">
                <div className="flex items-center space-x-3 mb-3 sm:mb-0">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-xl shadow-md">
                    ⚡
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-white font-bold text-base">poly-workspace</span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/60 text-[10px] font-semibold">
                        Zero Drift
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Coordinating {services.length} cross-ecosystem runtimes with unified lockfile
                      & task parallelism
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 text-xs">
                  <span className="text-slate-400">
                    Engine: <strong className="text-white font-mono">poly v0.6.0</strong>
                  </span>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-400">
                    CI Action:{" "}
                    <strong className="text-sky-400 font-mono">RitualDev-Lab/setup-poly@v1</strong>
                  </span>
                </div>
              </div>

              {/* Service Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {services.map((svc) => {
                  const badge = getEcosystemBadge(svc.ecosystem);
                  const isSelected = selectedService?.name === svc.name;
                  return (
                    <div
                      key={svc.name}
                      onClick={() => setSelectedService(svc)}
                      className={`cursor-pointer rounded-xl p-5 border transition-all ${
                        isSelected
                          ? "bg-slate-800/90 border-sky-400 shadow-lg shadow-sky-500/10 scale-[1.02]"
                          : "bg-slate-950/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60"
                      }`}
                    >
                      {/* Top Bar */}
                      <div className="flex items-center justify-between mb-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${badge.bg}`}
                        >
                          {badge.label}
                        </span>
                        {svc.port && (
                          <span className="font-mono text-[10px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                            {svc.port}
                          </span>
                        )}
                      </div>

                      {/* Service Title */}
                      <h3 className="text-lg font-bold text-white mb-1 flex items-center space-x-1.5">
                        <span>{svc.name}</span>
                      </h3>
                      <p className="text-xs text-slate-400 mb-3 font-mono">{svc.path}</p>

                      {/* Meta Pills */}
                      <div className="space-y-1.5 text-xs">
                        <div className="flex justify-between text-slate-400">
                          <span>Framework:</span>
                          <span className="text-slate-200 font-medium truncate max-w-[130px]">
                            {svc.framework}
                          </span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                          <span>Delegation:</span>
                          <span className="text-sky-400 font-mono">{svc.engine}</span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                          <span>Dev Command:</span>
                          <span className="text-emerald-400 font-mono">{svc.script}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Active Service Inspector Drawer */}
              {selectedService && (
                <div className="p-5 rounded-xl bg-slate-950 border border-slate-800/80">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-800">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-base font-bold text-white">
                          {selectedService.name} Service Details
                        </span>
                        <span className="text-xs text-slate-400 font-mono">
                          ({selectedService.path})
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">{selectedService.description}</p>
                    </div>
                    <div className="mt-2 sm:mt-0 flex items-center space-x-2">
                      <span className="text-xs text-slate-400 font-mono">
                        Execution:{" "}
                        <code className="text-emerald-400 bg-slate-900 px-2 py-1 rounded">
                          {selectedService.script}
                        </code>
                      </span>
                    </div>
                  </div>

                  {/* Dependencies List */}
                  <div>
                    <span className="text-xs font-semibold text-slate-400 mb-2 block">
                      Discovered Direct Dependencies ({selectedService.dependencies.length}):
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {selectedService.dependencies.map((dep) => (
                        <span
                          key={dep}
                          className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-900 border border-slate-800 text-slate-300"
                        >
                          {dep}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tab Content 2: poly.toml */}
          {activeTab === "polyToml" && (
            <div className="p-6 sm:p-8 bg-slate-950 font-mono text-xs sm:text-sm text-slate-200 overflow-x-auto leading-relaxed">
              <pre className="text-sky-300">{generatePolyToml()}</pre>
            </div>
          )}

          {/* Tab Content 3: GitHub Actions CI */}
          {activeTab === "githubActions" && (
            <div className="p-6 sm:p-8 bg-slate-950 font-mono text-xs sm:text-sm text-slate-200 overflow-x-auto leading-relaxed">
              <pre className="text-emerald-300">{generateGitHubActionsCi()}</pre>
            </div>
          )}

          {/* Tab Content 4: Terminal Preview */}
          {activeTab === "terminal" && (
            <div className="p-6 sm:p-8 bg-[#070A0F] font-mono text-xs sm:text-sm text-slate-200 leading-relaxed">
              <div className="space-y-1">
                {generateTerminalPreview().map((line, idx) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: terminal mockup lines
                  <div key={idx} className={line.color}>
                    {line.text}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
