/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Loqelo Pre-Launch Website (Planned Launch: February 2027)
 * Modern landing page connecting customers and rated contractors for home, garden, and office.
 */

import React, { useState, useEffect } from 'react';
import {
  SupportedLanguage,
  TRANSLATIONS,
  detectInitialLanguage,
} from './utils/i18n.ts';
import {
  UserRole,
  WaitlistSubmission,
  loadWaitlistEntries,
  saveWaitlistEntries,
  getAndIncrementVisitorCount,
  calculateWaitlistStats,
  SEED_WAITLIST_ENTRIES,
} from './utils/waitlist.ts';
import { calculateCountdown, CountdownState } from './utils/launch.ts';
import {
  ThemePresetId,
  HeroLayoutMode,
  CategoryCardStyle,
  THEME_PRESETS
} from './utils/theme.ts';
import { Palette } from 'lucide-react';

// Components
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { VideoSection } from './components/VideoSection.tsx';
import { HowItWorks } from './components/HowItWorks.tsx';
import { PlatformShowcase } from './components/PlatformShowcase.tsx';
import { CategoriesGrid } from './components/CategoriesGrid.tsx';
import { InteractivePostJobSection } from './components/InteractivePostJobSection.tsx';
import { LiveQuoteComparisonSection } from './components/LiveQuoteComparisonSection.tsx';
import { ContractorRadarBanner } from './components/ContractorRadarBanner.tsx';
import { DualAudienceCards } from './components/DualAudienceCards.tsx';
import { WaitlistSection } from './components/WaitlistSection.tsx';
import { AnalyticsSection } from './components/AnalyticsSection.tsx';
import { TestimonialsSection } from './components/TestimonialsSection.tsx';
import { Footer } from './components/Footer.tsx';
import { AdminConsoleModal } from './components/AdminConsoleModal.tsx';
import { UserManualModal } from './components/UserManualModal.tsx';
import { StyleSwitcherModal } from './components/StyleSwitcherModal.tsx';
import { CookieBanner } from './components/CookieBanner.tsx';

export default function App() {
  const [lang, setLang] = useState<SupportedLanguage>('en');
  const [entries, setEntries] = useState<WaitlistSubmission[]>([]);
  const [visitorCount, setVisitorCount] = useState<number>(3480);
  const [activeRole, setActiveRole] = useState<UserRole>('customer');
  const [countdown, setCountdown] = useState<CountdownState>(calculateCountdown());
  const [selectedCategoryInterest, setSelectedCategoryInterest] = useState<string>('');

  // Styles & Themes Customization State
  const [theme, setTheme] = useState<ThemePresetId>('figma-clean');
  const [heroMode, setHeroMode] = useState<HeroLayoutMode>('studio');
  const [cardStyle, setCardStyle] = useState<CategoryCardStyle>('blend');
  const [isStylesOpen, setIsStylesOpen] = useState(false);

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isManualOpen, setIsManualOpen] = useState(false);

  // Initialize language, entries, theme, and visitor count
  useEffect(() => {
    const initialLang = detectInitialLanguage();
    setLang(initialLang);

    const loadedEntries = loadWaitlistEntries();
    setEntries(loadedEntries);

    const count = getAndIncrementVisitorCount();
    setVisitorCount(count);

    try {
      const savedTheme = localStorage.getItem('loqelo_theme') as ThemePresetId;
      if (savedTheme && THEME_PRESETS[savedTheme]) setTheme(savedTheme);

      const savedHeroMode = localStorage.getItem('loqelo_hero_mode') as HeroLayoutMode;
      if (savedHeroMode) setHeroMode(savedHeroMode);

      const savedCardStyle = localStorage.getItem('loqelo_card_style') as CategoryCardStyle;
      if (savedCardStyle) setCardStyle(savedCardStyle);
    } catch {}
  }, []);

  // Update countdown clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(calculateCountdown());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const stats = calculateWaitlistStats(entries, visitorCount);

  const handleLanguageChange = (newLang: SupportedLanguage) => {
    setLang(newLang);
    try {
      localStorage.setItem('loqelo_user_lang', newLang);
    } catch {}
  };

  const handleSelectTheme = (newTheme: ThemePresetId) => {
    setTheme(newTheme);
    try {
      localStorage.setItem('loqelo_theme', newTheme);
    } catch {}
  };

  const handleSelectHeroMode = (mode: HeroLayoutMode) => {
    setHeroMode(mode);
    try {
      localStorage.setItem('loqelo_hero_mode', mode);
    } catch {}
  };

  const handleSelectCardStyle = (style: CategoryCardStyle) => {
    setCardStyle(style);
    try {
      localStorage.setItem('loqelo_card_style', style);
    } catch {}
  };

  const handleNewSubmission = (newEntry: WaitlistSubmission) => {
    const updated = [newEntry, ...entries];
    setEntries(updated);
    saveWaitlistEntries(updated);
  };

  const handleDeleteEntry = (id: string) => {
    const updated = entries.filter((e) => e.id !== id);
    setEntries(updated);
    saveWaitlistEntries(updated);
  };

  const handleResetSeedData = () => {
    setEntries(SEED_WAITLIST_ENTRIES);
    saveWaitlistEntries(SEED_WAITLIST_ENTRIES);
  };

  const handleSelectRole = (role: UserRole) => {
    setActiveRole(role);
    const el = document.getElementById('waitlist-form');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectCategory = (categoryName: string) => {
    if (categoryName.toLowerCase().includes('contractor')) {
      setActiveRole('contractor');
    }
    setSelectedCategoryInterest(categoryName);
    const el = document.getElementById('waitlist-form');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToWaitlist = () => {
    const el = document.getElementById('waitlist-form');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 theme-${theme} bg-[#F4F7F6] text-[#0C2229]`}>
      {/* 1. Header / Navbar */}
      <Navbar
        currentLang={lang}
        onLanguageChange={handleLanguageChange}
        t={t}
        onOpenManual={() => setIsManualOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        totalSignups={entries.length}
        onOpenStyles={() => setIsStylesOpen(true)}
        activeTheme={theme}
      />

      {/* 2. Main Hero Section with Countdown & Selected Layout Mode */}
      <main className="flex-1">
        <Hero
          t={t}
          countdown={countdown}
          onSelectRole={handleSelectRole}
          onOpenWaitlist={handleScrollToWaitlist}
          heroMode={heroMode}
          activeTheme={theme}
        />

        {/* 3. Popular Service Categories with Chosen Card Presentation Style */}
        <CategoriesGrid
          t={t}
          onSelectCategory={handleSelectCategory}
          cardStyle={cardStyle}
        />

        {/* 4. Interactive "Post a job" Wizard from Figma Screen 02 */}
        <InteractivePostJobSection
          t={t}
          onScrollToWaitlist={handleScrollToWaitlist}
          onPostSuccess={(job) => {
            setSelectedCategoryInterest(job.category);
            handleScrollToWaitlist();
          }}
        />

        {/* 5. Promotional Video Section with Interactive Chapters */}
        <VideoSection t={t} />

        {/* 6. How Loqelo Works: 4-Step Process */}
        <HowItWorks t={t} onPostJobClick={handleScrollToWaitlist} />

        {/* 7. Platform UI Screenshots Showcase */}
        <PlatformShowcase t={t} />

        {/* 8. Live 5-Offers Quote Comparison & Interactive Q&A */}
        <LiveQuoteComparisonSection
          t={t}
          onPostJobClick={handleScrollToWaitlist}
        />

        {/* 9. Dual Audience Cards: For Customers & For Contractors */}
        <DualAudienceCards t={t} onSelectRole={handleSelectRole} />

        {/* 10. Jobs inside your radius radar banner for service providers */}
        <ContractorRadarBanner
          t={t}
          onStartCollaboration={() => handleSelectRole('contractor')}
          onExploreRadar={() => {
            const el = document.getElementById('platform-preview');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 11. Dual Waitlist Sign-up Forms */}
        <WaitlistSection
          t={t}
          activeRole={activeRole}
          onRoleChange={setActiveRole}
          onNewSubmission={handleNewSubmission}
          totalSignups={entries.length}
          selectedCategoryInterest={selectedCategoryInterest}
          onClearCategoryInterest={() => setSelectedCategoryInterest('')}
        />

        {/* 12. Live Statistics, Conversion & CSV Export */}
        <AnalyticsSection
          t={t}
          stats={stats}
          entries={entries}
          onOpenAdmin={() => setIsAdminOpen(true)}
        />

        {/* 13. Testimonials & Clarity Proof Section */}
        <TestimonialsSection t={t} onPostJobClick={handleScrollToWaitlist} />
      </main>

      {/* 14. Footer */}
      <Footer
        t={t}
        onOpenManual={() => setIsManualOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Floating Theme & Style Switcher Action Pill */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          type="button"
          onClick={() => setIsStylesOpen(true)}
          className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#0C2229] hover:bg-[#077E88] text-white shadow-xl hover:shadow-2xl border border-white/20 transition-all active:scale-95 cursor-pointer backdrop-blur-md"
          title="Open Website Style & Theme Explorer"
        >
          <Palette className="w-4 h-4 text-[#65C8A6] group-hover:text-white transition-colors" />
          <span className="text-xs font-bold tracking-tight">Theme Styles</span>
          <span className="px-1.5 py-0.5 rounded-full bg-white/20 text-[10px] font-mono">
            {THEME_PRESETS[theme].badge}
          </span>
        </button>
      </div>

      {/* Modals & Overlays */}
      <StyleSwitcherModal
        isOpen={isStylesOpen}
        onClose={() => setIsStylesOpen(false)}
        activeTheme={theme}
        onSelectTheme={handleSelectTheme}
        activeHeroMode={heroMode}
        onSelectHeroMode={handleSelectHeroMode}
        activeCardStyle={cardStyle}
        onSelectCardStyle={handleSelectCardStyle}
      />

      <AdminConsoleModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        entries={entries}
        onDeleteEntry={handleDeleteEntry}
        onResetSeedData={handleResetSeedData}
      />

      <UserManualModal
        isOpen={isManualOpen}
        onClose={() => setIsManualOpen(false)}
      />

      <CookieBanner />
    </div>
  );
}
