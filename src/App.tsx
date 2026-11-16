import type React from "react";
import { useState } from "react";
import { ArchitectureExplorer } from "./components/ArchitectureExplorer.tsx";
import { ContactModal } from "./components/ContactModal.tsx";
import { DocsModal } from "./components/DocsModal.tsx";
import { Features } from "./components/Features.tsx";
import { Footer } from "./components/Footer.tsx";
import { Hero } from "./components/Hero.tsx";
import { Navbar } from "./components/Navbar.tsx";
import { Pricing } from "./components/Pricing.tsx";
import { RoiCalculator } from "./components/RoiCalculator.tsx";
import { TerminalDemo } from "./components/TerminalDemo.tsx";

export default function App(): React.ReactElement {
  const [docsOpen, setDocsOpen] = useState(false);
  const [docsTab, setDocsTab] = useState("quickstart");
  const [contactOpen, setContactOpen] = useState(false);

  const handleOpenDocs = (tab?: string) => {
    if (tab) setDocsTab(tab);
    setDocsOpen(true);
  };

  const handleOpenContact = () => {
    setContactOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 flex flex-col font-sans selection:bg-sky-500/30 selection:text-sky-200">
      {/* Navbar */}
      <Navbar onOpenDocs={handleOpenDocs} onOpenContact={handleOpenContact} />

      {/* Main Sections */}
      <main className="flex-1">
        <Hero onOpenDocs={handleOpenDocs} onOpenContact={handleOpenContact} />
        <TerminalDemo />
        <Features />
        <ArchitectureExplorer />
        <RoiCalculator onOpenContact={handleOpenContact} />
        <Pricing onOpenContact={handleOpenContact} />
      </main>

      {/* Footer */}
      <Footer onOpenDocs={handleOpenDocs} onOpenContact={handleOpenContact} />

      {/* Modals */}
      <DocsModal isOpen={docsOpen} onClose={() => setDocsOpen(false)} defaultTab={docsTab} />
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
}
