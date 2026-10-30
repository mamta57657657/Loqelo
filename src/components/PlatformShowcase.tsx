/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TranslationDictionary } from '../utils/i18n.ts';
import { Eye, ExternalLink, X, ZoomIn, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';
import { handleImageError, getAssetUrl } from '../utils/assets.ts';

interface PlatformShowcaseProps {
  t: TranslationDictionary;
}

interface ScreenItem {
  id: string;
  tabLabel: string;
  title: string;
  subtitle: string;
  imageSrc: string;
  badge: string;
  highlights: string[];
}

export const PlatformShowcase: React.FC<PlatformShowcaseProps> = ({ t }) => {
  const [activeTab, setActiveTab] = useState<string>('job_details');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const screens: ScreenItem[] = [
    {
      id: 'job_details',
      tabLabel: 'Quote Comparison',
      title: 'Compare transparent price spreads & ratings',
      subtitle: 'See all received bids on a visual price spectrum (lowest, average, highest). Review verified completed jobs, completion speed, and contractor messages.',
      imageSrc: '/assets/aistudio/04_Job_details___quotes_d468b4c3.png',
      badge: 'Client Feature',
      highlights: [
        'Visual price spread bar (e.g. €295 lowest to €410 highest)',
        'Detailed provider metrics: rating, jobs done, completion %',
        'Direct public Q&A without sharing private telephone numbers',
        'Sort by: Best match, Price, Fastest, or Highest rated',
      ],
    },
    {
      id: 'home',
      tabLabel: 'Smart Search',
      title: 'Natural language search & service recognition',
      subtitle: 'Users describe tasks in normal sentences. Loqelo’s AI engine automatically tags services (cleaning, window washing, car wash) and identifies category tags.',
      imageSrc: '/assets/aistudio/01_Home_d6b1243b.png',
      badge: 'Client Feature',
      highlights: [
        'Speak or type in any European language',
        'Instant multi-service recognition chips',
        '8 core categories: Home, Garden, Construction, Installations, etc.',
        'Zero registration barrier to start describing',
      ],
    },
    {
      id: 'post_flow',
      tabLabel: 'Post a Job',
      title: '2-minute request submission flow',
      subtitle: 'Simple step-by-step form with media attachments, postal area specification, and date flexibility (exact day, ±2 days, anytime).',
      imageSrc: '/assets/aistudio/02_Post_a_job_4944fdf6.png',
      badge: 'Client Feature',
      highlights: [
        'Photo, video, and floor plan PDF upload',
        'Privacy protection: address only revealed after hiring',
        'Live summary preview card on right side',
        'Immediate notification sent to 30+ local providers',
      ],
    },
    {
      id: 'client_dashboard',
      tabLabel: 'Client Dashboard',
      title: 'All your jobs & progress in one place',
      subtitle: 'Track active, completed, and in-progress jobs with real-time notifications when new quotes or questions arrive from pros.',
      imageSrc: '/assets/aistudio/03_Client_panel_33c4618e.png',
      badge: 'Client Feature',
      highlights: [
        'Track multiple jobs: Cleaning, Lawn care, Tap repair, Moving',
        'Real-time activity feed with quote alerts',
        'Completion rate and client rating overview',
        'One-click detail view and provider communication',
      ],
    },
    {
      id: 'contractor_radar',
      tabLabel: 'Contractor Radar Map',
      title: 'Interactive job radius & earning potential',
      subtitle: 'Service providers view incoming jobs on an interactive map matching their designated trade skills and geographical kilometer radius.',
      imageSrc: '/assets/aistudio/05_Contractor_panel_5996a4f2.png',
      badge: 'Contractor Feature',
      highlights: [
        'Customizable radius filter (10, 25, 50, 100 km)',
        'Earning potential counter based on matching open jobs',
        'Interactive map pins with job previews and countdown timer',
        'Switch between list view and aerial map view',
      ],
    },
    {
      id: 'contractor_bid',
      tabLabel: '1-Minute Bidding',
      title: 'Fast, competitive contractor offer submission',
      subtitle: 'Contractors send clear fixed-price proposals in under a minute with starting date, completion timeframe, and included services.',
      imageSrc: '/assets/aistudio/06_Contractor_job___bid_5a63f884.png',
      badge: 'Contractor Feature',
      highlights: [
        'Price comparison guidance (e.g. similar jobs nearby: €180–€320)',
        'Pre-configured tags: Green waste removal, Own equipment, Insured',
        'Direct personal message to customer',
        'Live competition benchmark (lowest, average, and your rating rank)',
      ],
    },
  ];

  const currentScreen = screens.find((s) => s.id === activeTab) || screens[0];

  return (
    <section id="platform-preview" className="py-16 sm:py-24 bg-white border-b border-[#E4EAE9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <p className="text-xs font-bold text-[#077E88] tracking-widest uppercase">
            {t.screenshotsSection.kicker}
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0C2229]">
            {t.screenshotsSection.title}
          </h2>
          <p className="text-sm sm:text-base text-[#3D5259]">
            {t.screenshotsSection.subtitle}
          </p>
        </div>

        {/* Tab Selector Buttons */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {screens.map((screen) => {
            const isActive = activeTab === screen.id;
            return (
              <button
                key={screen.id}
                onClick={() => setActiveTab(screen.id)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-[#077E88] text-white shadow-sm'
                    : 'bg-[#F4F7F6] text-[#3D5259] hover:text-[#0C2229] hover:bg-[#E7F3F3]'
                }`}
              >
                {screen.tabLabel}
              </button>
            );
          })}
        </div>

        {/* Main Showcase Stage */}
        <div className="bg-[#F4F7F6] rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#E4EAE9]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Explanatory Details */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-3">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-white text-[#077E88] border border-[#E4EAE9]">
                  {currentScreen.badge}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#0C2229] leading-tight">
                  {currentScreen.title}
                </h3>
                <p className="text-sm text-[#3D5259] leading-relaxed">
                  {currentScreen.subtitle}
                </p>
              </div>

              {/* Highlights List */}
              <div className="space-y-2.5 pt-2">
                <p className="text-xs font-bold text-[#0C2229] uppercase tracking-wider">
                  Key UX Features:
                </p>
                {currentScreen.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#3D5259]">
                    <CheckCircle2 className="w-4 h-4 text-[#2E9A77] shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              {/* Zoom & Inspect Action */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setLightboxImage(currentScreen.imageSrc)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-slate-50 text-[#0C2229] border border-[#E4EAE9] text-xs font-semibold shadow-2xs hover:shadow-xs transition-all"
                >
                  <ZoomIn className="w-4 h-4 text-[#077E88]" />
                  <span>Click to view full-resolution screen</span>
                </button>
              </div>
            </div>

            {/* Right: Screenshot Mockup Container */}
            <div className="lg:col-span-7">
              <div
                onClick={() => setLightboxImage(currentScreen.imageSrc)}
                className="group relative rounded-2xl overflow-hidden bg-white shadow-xl border border-[#E4EAE9] cursor-zoom-in transition-all duration-300 hover:shadow-2xl"
              >
                {/* Browser-style Top Bar */}
                <div className="bg-[#E7F3F3]/60 px-4 py-2.5 border-b border-[#E4EAE9] flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                  </div>
                  <span className="text-[11px] font-mono text-[#76898E]">
                    app.loqelo.com/{currentScreen.id}
                  </span>
                  <Eye className="w-3.5 h-3.5 text-[#76898E] group-hover:text-[#077E88] transition-colors" />
                </div>

                {/* Screenshot Image */}
                <div className="max-h-[500px] overflow-hidden bg-white">
                  <img
                    src={getAssetUrl(currentScreen.imageSrc)}
                    alt={currentScreen.title}
                    onError={handleImageError}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto object-cover object-top group-hover:scale-[1.02] transition-transform duration-500"
                  />
                </div>

                {/* Hover Click-to-Zoom badge */}
                <div className="absolute inset-0 bg-[#0C2229]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <div className="px-4 py-2 rounded-full bg-white text-[#0C2229] text-xs font-bold shadow-lg flex items-center gap-2">
                    <ZoomIn className="w-4 h-4 text-[#077E88]" />
                    <span>View Fullscreen</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setLightboxImage(null)}
        >
          <div
            className="relative max-w-6xl max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#0C2229] text-white px-4 py-3 flex items-center justify-between">
              <span className="text-xs font-mono">Loqelo High-Resolution Design Asset</span>
              <button
                onClick={() => setLightboxImage(null)}
                className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/10"
                aria-label="Close lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="overflow-auto p-2 bg-[#F4F7F6]">
              <img
                src={getAssetUrl(lightboxImage)}
                alt="Enlarged screenshot"
                onError={handleImageError}
                loading="eager"
                decoding="async"
                className="w-full h-auto rounded-lg shadow-sm"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
