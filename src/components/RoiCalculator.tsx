import { Calculator, Clock, DollarSign, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";
import type React from "react";
import { useState } from "react";

interface RoiCalculatorProps {
  onOpenContact: () => void;
}

export const RoiCalculator: React.FC<RoiCalculatorProps> = ({ onOpenContact }) => {
  const [engineers, setEngineers] = useState<number>(35);
  const [buildsPerDay, setBuildsPerDay] = useState<number>(6);
  const [buildDurationMinutes, setBuildDurationMinutes] = useState<number>(8);
  const [ciRunnerCostPerMin, setCiRunnerCostPerMin] = useState<number>(0.012);
  const [hourlyDevRate] = useState<number>(85);

  // Poly typically slashes build & install duration by 72% - 84% via remote cache
  const cacheReductionPercent = 0.78;
  const workingDaysPerMonth = 21;

  const totalBuildsPerMonth = engineers * buildsPerDay * workingDaysPerMonth;
  const minutesSavedPerBuild = buildDurationMinutes * cacheReductionPercent;
  const totalMinutesSavedPerMonth = totalBuildsPerMonth * minutesSavedPerBuild;
  const totalHoursSavedPerMonth = Math.round(totalMinutesSavedPerMonth / 60);

  // Cloud Compute savings
  const cloudSpendSavedPerMonth = Math.round(totalMinutesSavedPerMonth * ciRunnerCostPerMin);

  // Developer productivity value (wait time reclaimed)
  const devProductivityValuePerMonth = Math.round(totalHoursSavedPerMonth * hourlyDevRate);

  // Total monthly & annual business impact
  const totalMonthlyImpact = cloudSpendSavedPerMonth + devProductivityValuePerMonth;
  const totalAnnualImpact = totalMonthlyImpact * 12;

  // ROI vs Poly Team / Enterprise tier ($29 / dev / month)
  const polyCostMonthly = engineers * 29;
  const roiMultiplier = (totalMonthlyImpact / Math.max(polyCostMonthly, 1)).toFixed(1);

  return (
    <section id="roi" className="py-24 bg-[#0B0F17] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-950 text-purple-400 border border-purple-800/60 mb-4">
            <Calculator className="w-3.5 h-3.5" />
            <span>Enterprise Business Case</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Calculate Your Monorepo ROI
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            See the exact cloud compute and engineering hours Poly returns to your organization with
            remote caching and unified toolchain orchestration.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto">
          {/* Sliders Input Panel */}
          <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 p-8 rounded-3xl shadow-xl space-y-6">
            <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3 flex items-center justify-between">
              <span>Your Engineering Profile</span>
              <span className="text-xs text-sky-400 font-mono">Live Inputs</span>
            </h3>

            {/* Slider 1: Engineers */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-300 font-medium">Software Engineers</span>
                <span className="text-sky-400 font-bold font-mono text-base">
                  {engineers} engineers
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="500"
                step="5"
                value={engineers}
                onChange={(e) => setEngineers(Number(e.target.value))}
                className="w-full accent-sky-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-slate-500 mt-1 font-mono">
                <span>5</span>
                <span>100</span>
                <span>250</span>
                <span>500+</span>
              </div>
            </div>

            {/* Slider 2: Builds per Day */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-300 font-medium">CI Builds per Engineer / Day</span>
                <span className="text-sky-400 font-bold font-mono text-base">
                  {buildsPerDay} runs
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="25"
                value={buildsPerDay}
                onChange={(e) => setBuildsPerDay(Number(e.target.value))}
                className="w-full accent-sky-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-slate-500 mt-1 font-mono">
                <span>1 run</span>
                <span>10 runs</span>
                <span>25 runs</span>
              </div>
            </div>

            {/* Slider 3: Build Duration */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-300 font-medium">Average Monorepo Build Duration</span>
                <span className="text-sky-400 font-bold font-mono text-base">
                  {buildDurationMinutes} minutes
                </span>
              </div>
              <input
                type="range"
                min="2"
                max="30"
                value={buildDurationMinutes}
                onChange={(e) => setBuildDurationMinutes(Number(e.target.value))}
                className="w-full accent-sky-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-slate-500 mt-1 font-mono">
                <span>2 min</span>
                <span>15 min</span>
                <span>30 min</span>
              </div>
            </div>

            {/* Slider 4: CI Compute Cost */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-300 font-medium">Cloud CI Runner Rate</span>
                <span className="text-sky-400 font-bold font-mono text-base">
                  ${ciRunnerCostPerMin.toFixed(3)} / min
                </span>
              </div>
              <input
                type="range"
                min="0.006"
                max="0.036"
                step="0.002"
                value={ciRunnerCostPerMin}
                onChange={(e) => setCiRunnerCostPerMin(Number(e.target.value))}
                className="w-full accent-sky-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-slate-500 mt-1 font-mono">
                <span>$0.006 (Standard Linux)</span>
                <span>$0.016 (4-Core)</span>
                <span>$0.036 (macOS / GPU)</span>
              </div>
            </div>

            <div className="pt-2 text-xs text-slate-400 flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Conservative projection based on a verified 78% cache hit time reduction.</span>
            </div>
          </div>

          {/* Results Summary Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-[#101726] to-slate-900 border-2 border-sky-500/30 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center space-x-2 text-xs font-bold text-sky-400 uppercase tracking-wider mb-6">
              <TrendingUp className="w-4 h-4" />
              <span>Projected Enterprise Impact</span>
            </div>

            <div className="space-y-6">
              <div>
                <div className="text-xs text-slate-400 font-medium mb-1">
                  Developer Time Regained
                </div>
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono">
                    {totalHoursSavedPerMonth.toLocaleString()}
                  </span>
                  <span className="text-sm text-slate-400">hours / mo</span>
                </div>
                <div className="text-xs text-emerald-400 mt-1 flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>
                    Equivalent to {(totalHoursSavedPerMonth / 160).toFixed(1)} full-time engineering
                    months
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <div className="text-xs text-slate-400 font-medium mb-1">
                  Direct Cloud CI Spend Saved
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-sky-400 font-mono">
                  ${cloudSpendSavedPerMonth.toLocaleString()}{" "}
                  <span className="text-xs text-slate-400 font-normal">/ month</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <div className="text-xs text-slate-400 font-medium mb-1">
                  Total Annual Value Created
                </div>
                <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-sky-300 to-indigo-300 font-mono">
                  ${totalAnnualImpact.toLocaleString()}
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Reclaimed engineering velocity + direct CI cloud savings
                </div>
              </div>

              <div className="p-4 rounded-xl bg-sky-950/60 border border-sky-800/80 flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-sky-300 font-semibold uppercase">
                    Net Enterprise ROI
                  </div>
                  <div className="text-2xl font-black text-white font-mono">{roiMultiplier}x</div>
                </div>
                <DollarSign className="w-8 h-8 text-sky-400 opacity-60" />
              </div>

              <button
                onClick={onOpenContact}
                className="w-full py-3.5 rounded-xl text-sm font-bold text-slate-900 bg-gradient-to-r from-sky-400 to-indigo-400 hover:from-sky-300 hover:to-indigo-300 transition-all flex items-center justify-center space-x-2 shadow-lg shadow-sky-500/25"
              >
                <Sparkles className="w-4 h-4" />
                <span>Request Custom ROI Report</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
