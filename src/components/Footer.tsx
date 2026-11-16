import { Github, Heart, Package, ShieldCheck } from "lucide-react";
import type React from "react";

interface FooterProps {
  onOpenDocs: (tab?: string) => void;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDocs, onOpenContact }) => {
  return (
    <footer className="bg-[#070A0F] border-t border-slate-800 text-slate-400 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-sky-400 to-indigo-600">
                <span className="text-lg font-black text-white">⚡</span>
              </span>
              <span className="text-xl font-black text-white tracking-tight">poly</span>
              <span className="text-xs px-2 py-0.5 rounded bg-sky-950 text-sky-400 border border-sky-800/60 font-mono">
                v0.4.0
              </span>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm max-w-sm leading-relaxed">
              The universal polyglot package & dependency orchestrator for Node.js, Python, Rust,
              and Go. Eliminating friction across high-velocity monorepos worldwide.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://github.com/RitualDev-Lab/poly"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://www.npmjs.com/package/@ritualdev-lab/poly"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
                title="npm"
              >
                <Package className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/RitualDev-Lab/setup-poly"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
                title="GitHub Action"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Platform</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#features" className="hover:text-white transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#terminal" className="hover:text-white transition-colors">
                  Interactive CLI
                </a>
              </li>
              <li>
                <a href="#architecture" className="hover:text-white transition-colors">
                  Architecture
                </a>
              </li>
              <li>
                <a href="#roi" className="hover:text-white transition-colors">
                  ROI Calculator
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white transition-colors">
                  Enterprise Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* Resources & Docs */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Resources</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onOpenDocs("quickstart")}
                  className="hover:text-white transition-colors"
                >
                  Quickstart
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenDocs("commands")}
                  className="hover:text-white transition-colors"
                >
                  CLI Reference
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenDocs("config")}
                  className="hover:text-white transition-colors"
                >
                  poly.toml Guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenDocs("ci")}
                  className="hover:text-white transition-colors"
                >
                  setup-poly Action
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenDocs("mcp")}
                  className="hover:text-white transition-colors"
                >
                  Cursor & Claude MCP
                </button>
              </li>
            </ul>
          </div>

          {/* Enterprise & Security */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Enterprise</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={onOpenContact}
                  className="hover:text-white transition-colors text-sky-400"
                >
                  Request 30-Day Pilot
                </button>
              </li>
              <li>
                <span className="text-slate-500">Air-Gapped Appliance</span>
              </li>
              <li>
                <span className="text-slate-500">SOC2 Type II Binder</span>
              </li>
              <li>
                <span className="text-slate-500">SLSA Level 3 Attestation</span>
              </li>
              <li>
                <a
                  href="https://ritualdev.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  RitualDev Lab &rarr;
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            &copy; {new Date().getFullYear()}{" "}
            <a
              href="https://ritualdev.in"
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-white underline"
            >
              RitualDev Lab
            </a>
            . Released under the MIT License.
          </div>
          <div className="flex items-center space-x-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for polyglot monorepo engineers.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
