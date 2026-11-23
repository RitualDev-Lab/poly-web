import { ArrowUpRight, Github, Menu, Shield, Sparkles, Terminal, X } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";

interface NavbarProps {
  onOpenDocs: (tab?: string) => void;
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenDocs, onOpenContact }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0B0F17]/85 backdrop-blur-md border-b border-white/10 py-3 shadow-2xl shadow-black/40"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Version */}
          <div className="flex items-center space-x-3">
            <a href="#" className="flex items-center space-x-2 group">
              <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-sky-400 to-indigo-600 shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform duration-200">
                <span className="text-xl font-black text-white">⚡</span>
              </span>
              <span className="text-2xl font-black tracking-tight text-white group-hover:text-sky-300 transition-colors">
                poly
              </span>
            </a>
            <a
              href="https://www.npmjs.com/package/@ritualdev-lab/poly"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-950/80 text-sky-400 border border-sky-800/60 hover:bg-sky-900/60 transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>v0.6.0</span>
            </a>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-white transition-colors">
              Features
            </a>
            <a
              href="#analyzer"
              className="hover:text-white transition-colors flex items-center space-x-1 text-sky-300 font-semibold"
            >
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>Architecture Analyzer</span>
            </a>
            <a
              href="#terminal"
              className="hover:text-white transition-colors flex items-center space-x-1"
            >
              <Terminal className="w-3.5 h-3.5 text-sky-400" />
              <span>Interactive CLI</span>
            </a>
            <a href="#architecture" className="hover:text-white transition-colors">
              Architecture
            </a>
            <a href="#roi" className="hover:text-white transition-colors">
              ROI Calculator
            </a>
            <a
              href="#pricing"
              className="hover:text-white transition-colors flex items-center space-x-1"
            >
              <Shield className="w-3.5 h-3.5 text-indigo-400" />
              <span>Enterprise Pricing</span>
            </a>
            <button
              onClick={() => onOpenDocs("quickstart")}
              className="hover:text-white transition-colors text-slate-300 hover:text-sky-400"
            >
              Docs
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center space-x-3.5">
            <a
              href="https://github.com/RitualDev-Lab/poly"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-medium text-slate-200 bg-slate-900/80 border border-slate-700/80 hover:bg-slate-800 hover:border-slate-600 transition-all shadow-sm"
            >
              <Github className="w-4 h-4 text-slate-300" />
              <span>GitHub</span>
              <span className="ml-1 px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-sky-400 font-mono">
                ⭐ Star
              </span>
            </a>

            <button
              onClick={onOpenContact}
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg text-xs font-bold text-slate-900 bg-gradient-to-r from-sky-400 to-indigo-400 hover:from-sky-300 hover:to-indigo-300 shadow-md shadow-sky-500/20 hover:shadow-sky-500/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Enterprise Demo</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0F172A] border-b border-slate-800 px-4 pt-3 pb-6 space-y-3 mt-3 animate-fadeIn">
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-slate-800"
          >
            Features
          </a>
          <a
            href="#analyzer"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-sky-300 hover:bg-slate-800"
          >
            Architecture Analyzer
          </a>
          <a
            href="#terminal"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-slate-800"
          >
            Interactive CLI
          </a>
          <a
            href="#architecture"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-slate-800"
          >
            Architecture
          </a>
          <a
            href="#roi"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-slate-800"
          >
            ROI Calculator
          </a>
          <a
            href="#pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-slate-800"
          >
            Enterprise Pricing
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenDocs();
            }}
            className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-sky-400 hover:bg-slate-800"
          >
            Documentation
          </button>
          <div className="pt-2 flex flex-col space-y-2">
            <a
              href="https://github.com/RitualDev-Lab/poly"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center space-x-2 w-full py-2.5 rounded-lg text-sm font-medium text-slate-200 bg-slate-800 border border-slate-700"
            >
              <Github className="w-4 h-4" />
              <span>View on GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="w-full py-2.5 rounded-lg text-sm font-bold text-slate-900 bg-gradient-to-r from-sky-400 to-indigo-400"
            >
              Book Enterprise Demo
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
