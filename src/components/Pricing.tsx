import { ArrowRight, Building2, Check, HelpCircle, Shield, Sparkles } from "lucide-react";
import type React from "react";
import { useState } from "react";

interface PricingProps {
  onOpenContact: () => void;
}

export const Pricing: React.FC<PricingProps> = ({ onOpenContact }) => {
  const [isAnnual, setIsAnnual] = useState(true);

  const faqs = [
    {
      q: "Is the core Poly CLI completely free and open source?",
      a: "Yes. Poly CLI is 100% free under the permissive MIT license. You can use it locally and across unlimited CI runners forever without paying a cent.",
    },
    {
      q: "What is the Hosted Remote CI Cache?",
      a: "Our distributed cloud cache allows your CI runners (GitHub Actions, GitLab CI, CircleCI) to share build artifacts and restored dependencies across branches and teams globally, cutting monorepo build durations by up to 84%.",
    },
    {
      q: "Can Enterprise tier be deployed on-premises in air-gapped VPCs?",
      a: "Absolutely. The Enterprise tier includes a Docker/Helm appliance that runs fully inside your AWS VPC, GCP project, Azure subscription, or air-gapped on-premises Kubernetes cluster with zero external telemetry.",
    },
    {
      q: "How does Poly fix CVE vulnerabilities?",
      a: "Poly queries the OSV (Open Source Vulnerabilities) distributed database in real-time, identifies the minimal non-breaking upgrade for vulnerable dependencies, patches your manifests, and regenerates poly.lock with zero drift.",
    },
    {
      q: "Do you offer proof of concepts (PoC) for enterprise teams?",
      a: "Yes. We offer a 30-day guided enterprise pilot including a dedicated Solutions Architect to configure poly.toml, remote cache mirrors, and your CI/CD pipelines.",
    },
  ];

  return (
    <section id="pricing" className="py-24 bg-[#090D14] border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-950 text-sky-400 border border-sky-800/60 mb-4">
            <Shield className="w-3.5 h-3.5" />
            <span>Transparent Enterprise Tiers</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Predictable Pricing for High-Velocity Teams
          </h2>
          <p className="text-slate-400 text-base sm:text-lg mb-8">
            From single developers to Fortune 500 monorepo engineering organizations.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center p-1 rounded-full bg-slate-900 border border-slate-800">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-colors ${
                !isAnnual
                  ? "bg-sky-500 text-slate-950 font-bold shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-colors flex items-center space-x-1.5 ${
                isAnnual
                  ? "bg-sky-500 text-slate-950 font-bold shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <span>Annual Billing</span>
              <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-400 text-slate-950">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20 items-stretch">
          {/* Tier 1: Community */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 flex flex-col justify-between hover:border-slate-700 transition-all">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">Community</h3>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  Open Source
                </span>
              </div>
              <p className="text-xs text-slate-400 mb-6">
                Full-featured polyglot CLI for individual engineers and open source repositories.
              </p>
              <div className="mb-6">
                <span className="text-4xl font-extrabold text-white font-mono">$0</span>
                <span className="text-xs text-slate-400 ml-2">free forever</span>
              </div>

              <div className="space-y-3 pt-6 border-t border-slate-800 text-xs sm:text-sm text-slate-300">
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Full CLI across Node, Python, Rust & Go</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>RFC PURL Shorthand Resolution</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Composite poly.lock SHA-256 verification</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Local hardlink / disk caching</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Model Context Protocol (MCP) AI Server</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Poly Doctor diagnostic suite</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>MIT License & Community Discord</span>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <a
                href="https://github.com/RitualDev-Lab/poly"
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 rounded-xl text-sm font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 transition-colors flex items-center justify-center space-x-1.5"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Tier 2: Team (Featured) */}
          <div className="bg-gradient-to-b from-slate-900 via-[#10192A] to-slate-900 border-2 border-sky-500 rounded-3xl p-8 flex flex-col justify-between shadow-2xl shadow-sky-500/10 relative scale-105">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-sky-400 to-indigo-400 text-slate-950 uppercase tracking-wider shadow-md">
              Most Popular
            </div>

            <div>
              <div className="flex justify-between items-center mb-4 pt-1">
                <h3 className="text-xl font-bold text-white">Team</h3>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-sky-950 text-sky-400 border border-sky-800">
                  Cloud Hosted
                </span>
              </div>
              <p className="text-xs text-slate-400 mb-6">
                Fast distributed remote CI caching and automated CVE alerts for growing engineering
                teams.
              </p>
              <div className="mb-6 flex items-baseline">
                <span className="text-4xl sm:text-5xl font-black text-white font-mono">
                  ${isAnnual ? "23" : "29"}
                </span>
                <span className="text-xs text-slate-400 ml-2">/ developer / month</span>
              </div>

              <div className="space-y-3 pt-6 border-t border-slate-800 text-xs sm:text-sm text-slate-200">
                <div className="flex items-center space-x-2 font-medium text-white">
                  <Sparkles className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Everything in Community, plus:</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Hosted Remote CI Cache (up to 500 GB)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Priority GitHub Actions CDN edge routing</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Automated OSV CVE alerts & Slack/Discord webhooks</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Automated manifest auto-heal bot (poly fix PRs)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Monorepo cache hit & drift analytics dashboard</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Private support channel (8h response SLA)</span>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <button
                onClick={onOpenContact}
                className="w-full py-3.5 rounded-xl text-sm font-bold text-slate-950 bg-gradient-to-r from-sky-400 to-indigo-400 hover:from-sky-300 hover:to-indigo-300 transition-all flex items-center justify-center space-x-2 shadow-lg shadow-sky-500/25"
              >
                <span>Start 14-Day Free Team Trial</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Tier 3: Enterprise */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 flex flex-col justify-between hover:border-slate-700 transition-all">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">Enterprise</h3>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-400 border border-purple-800">
                  Zero Trust / On-Prem
                </span>
              </div>
              <p className="text-xs text-slate-400 mb-6">
                Air-gapped VPC deployment, SLSA Level 3 provenance, and dedicated solutions
                engineering.
              </p>
              <div className="mb-6 flex items-baseline">
                <span className="text-4xl sm:text-5xl font-black text-white font-mono">
                  ${isAnnual ? "79" : "99"}
                </span>
                <span className="text-xs text-slate-400 ml-2">/ developer / month</span>
              </div>

              <div className="space-y-3 pt-6 border-t border-slate-800 text-xs sm:text-sm text-slate-300">
                <div className="flex items-center space-x-2 font-medium text-white">
                  <Building2 className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>Everything in Team, plus:</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>Self-hosted air-gapped cache & registry proxy</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>Zero-Trust SLSA L3 artifact signing (Sigstore/Cosign)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>Corporate federation (Artifactory, Nexus, AWS CodeArtifact)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>Okta / SAML / OIDC Single Sign-On & RBAC</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>Enterprise License Compliance Gates (block AGPL)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>Dedicated Solutions Architect & 99.99% SLA</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>SOC2 Type II & ISO 27001 compliance binder</span>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <button
                onClick={onOpenContact}
                className="w-full py-3 rounded-xl text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors flex items-center justify-center space-x-1.5"
              >
                <span>Contact Enterprise Sales</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Enterprise FAQs */}
        <div className="max-w-4xl mx-auto pt-12 border-t border-slate-800">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-white mb-2 flex items-center justify-center space-x-2">
              <HelpCircle className="w-5 h-5 text-sky-400" />
              <span>Frequently Asked Questions</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Clear answers regarding security, licensing, infrastructure, and deployment.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((f, i) => (
              <div
                // biome-ignore lint/suspicious/noArrayIndexKey: faqs static
                key={i}
                className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80"
              >
                <h4 className="text-sm sm:text-base font-bold text-white mb-2">{f.q}</h4>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
