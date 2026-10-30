/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TranslationDictionary } from '../utils/i18n.ts';
import { CountdownState } from '../utils/launch.ts';
import { HeroLayoutMode, ThemePresetId } from '../utils/theme.ts';
import { 
  Sparkles, 
  MapPin, 
  Mic, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  UserCheck, 
  Briefcase,
  Layers,
  Clock
} from 'lucide-react';
import { handleImageError, getAssetUrl } from '../utils/assets.ts';

interface HeroProps {
  t: TranslationDictionary;
  countdown: CountdownState;
  onSelectRole: (role: 'customer' | 'contractor') => void;
  onOpenWaitlist: () => void;
  heroMode?: HeroLayoutMode;
  activeTheme?: ThemePresetId;
}

export const Hero: React.FC<HeroProps> = ({
  t,
  countdown,
  onSelectRole,
  onOpenWaitlist,
  heroMode = 'studio',
  activeTheme = 'figma-clean',
}) => {
  const [queryInput, setQueryInput] = useState(
    'I need to clean my house, wash my windows, and wash my car'
  );
  const [selectedCity, setSelectedCity] = useState('Amsterdam');
  const [recognizedTags, setRecognizedTags] = useState<string[]>([
    'Cleaning',
    'Window cleaning',
    'Car washing',
  ]);

  // Video spotlight state
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(true);

  const sampleQueries = [
    {
      text: 'I need to clean my house, wash my windows, and wash my car',
      tags: ['Cleaning', 'Window cleaning', 'Car washing'],
    },
    {
      text: 'Lawn care & hedge trimming for back garden 120 m²',
      tags: ['Lawn care', 'Hedge trimming', 'Green waste removal'],
    },
    {
      text: 'Fix dripping bathroom tap and reseal shower cabin',
      tags: ['Plumbing', 'Tap repair', 'Bathroom sealant'],
    },
    {
      text: 'Move a 2-room flat to Utrecht with 2 helpers',
      tags: ['Moving & Transport', 'Van with tail-lift', 'Furniture packing'],
    },
  ];

  const handleQuerySample = (sample: { text: string; tags: string[] }) => {
    setQueryInput(sample.text);
    setRecognizedTags(sample.tags);
  };

  const handleCustomInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQueryInput(val);
    const lower = val.toLowerCase();
    const newTags: string[] = [];
    if (lower.includes('clean') || lower.includes('sprząt') || lower.includes('reinigen')) newTags.push('Cleaning');
    if (lower.includes('window') || lower.includes('okn') || lower.includes('fenster') || lower.includes('raam')) newTags.push('Window cleaning');
    if (lower.includes('car') || lower.includes('auto') || lower.includes('samochód')) newTags.push('Car washing');
    if (lower.includes('lawn') || lower.includes('garden') || lower.includes('trawnik') || lower.includes('garten') || lower.includes('tuin')) newTags.push('Garden & Lawn');
    if (lower.includes('tap') || lower.includes('leak') || lower.includes('kran') || lower.includes('plumb')) newTags.push('Plumbing');
    if (lower.includes('move') || lower.includes('przeprowadz') || lower.includes('umzug') || lower.includes('verhuiz')) newTags.push('Moving & Transport');
    
    setRecognizedTags(newTags.length > 0 ? newTags : ['General Home Service']);
  };

  const handleScrollToWaitlist = (role: 'customer' | 'contractor') => {
    onSelectRole(role);
    const form = document.getElementById('waitlist-form');
    if (form) {
      form.scrollIntoView({ behavior: 'smooth' });
    } else {
      onOpenWaitlist();
    }
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Background soft ambient glow */}
      <div className="absolute top-0 right-1/4 -z-10 w-96 h-96 bg-[#077E88]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-10 -z-10 w-80 h-80 bg-[#65C8A6]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Launch Countdown Banner Bar */}
        <div className="mb-8 p-3.5 sm:p-4 rounded-2xl bg-white border border-[#E4EAE9] shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-3 w-3 relative">
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#077E88]"></span>
            </span>
            <div>
              <p className="text-xs font-semibold text-[#077E88] uppercase tracking-wider">
                {t.hero.launchBadge}
              </p>
              <p className="text-xs text-[#76898E]">
                Target launch: February 1, 2027 · Accepting early customer & contractor registrations
              </p>
            </div>
          </div>

          {/* Countdown Clock */}
          <div className="flex items-center gap-2 sm:gap-3 text-center">
            <div className="px-2.5 py-1.5 rounded-lg bg-[#F4F7F6] border border-[#E4EAE9]/80 min-w-12">
              <div className="font-display font-bold text-base sm:text-lg text-[#0C2229] tabular-nums leading-tight">
                {countdown.months}
              </div>
              <div className="text-[10px] text-[#76898E] font-medium uppercase">{t.hero.months}</div>
            </div>
            <span className="font-display font-semibold text-[#76898E]">:</span>
            <div className="px-2.5 py-1.5 rounded-lg bg-[#F4F7F6] border border-[#E4EAE9]/80 min-w-12">
              <div className="font-display font-bold text-base sm:text-lg text-[#0C2229] tabular-nums leading-tight">
                {countdown.days}
              </div>
              <div className="text-[10px] text-[#76898E] font-medium uppercase">{t.hero.days}</div>
            </div>
            <span className="font-display font-semibold text-[#76898E]">:</span>
            <div className="px-2.5 py-1.5 rounded-lg bg-[#F4F7F6] border border-[#E4EAE9]/80 min-w-12">
              <div className="font-display font-bold text-base sm:text-lg text-[#0C2229] tabular-nums leading-tight">
                {String(countdown.hours).padStart(2, '0')}
              </div>
              <div className="text-[10px] text-[#76898E] font-medium uppercase">{t.hero.hours}</div>
            </div>
            <span className="font-display font-semibold text-[#76898E]">:</span>
            <div className="px-2.5 py-1.5 rounded-lg bg-[#F4F7F6] border border-[#E4EAE9]/80 min-w-12">
              <div className="font-display font-bold text-base sm:text-lg text-[#0C2229] tabular-nums leading-tight">
                {String(countdown.minutes).padStart(2, '0')}
              </div>
              <div className="text-[10px] text-[#76898E] font-medium uppercase">{t.hero.minutes}</div>
            </div>
            <span className="font-display font-semibold text-[#76898E]">:</span>
            <div className="px-2.5 py-1.5 rounded-lg bg-[#F4F7F6] border border-[#E4EAE9]/80 min-w-12">
              <div className="font-display font-bold text-base sm:text-lg text-[#077E88] tabular-nums leading-tight">
                {String(countdown.seconds).padStart(2, '0')}
              </div>
              <div className="text-[10px] text-[#077E88] font-medium uppercase">{t.hero.seconds}</div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* VARIATION 1: INTERACTIVE STUDIO LAYOUT (Default Loqelo)          */}
        {/* ============================================================== */}
        {heroMode === 'studio' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Column: Headlines & Interaction */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E7F3F3] text-[#05626A] text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-[#077E88]" />
                  <span>{t.hero.tagline}</span>
                </div>

                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#0C2229] leading-[1.08] text-balance">
                  What do you need? <br />
                  <span className="text-[#077E88] underline decoration-[#65C8A6] decoration-4 underline-offset-8">
                    Describe it.
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-[#3D5259] leading-relaxed max-w-2xl">
                  {t.hero.subheadline}
                </p>
              </div>

              {/* Interactive Search Box (From Loqelo Figma Screen 01_Home) */}
              <div className="bg-white rounded-2xl p-5 border border-[#E4EAE9] shadow-sm space-y-4">
                <div className="flex items-center justify-between text-xs text-[#76898E]">
                  <span className="font-semibold text-[#0C2229]">Write in your own words</span>
                  <span className="px-2 py-0.5 rounded bg-[#F4F7F6] text-[#76898E]">Any language</span>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    value={queryInput}
                    onChange={handleCustomInput}
                    className="w-full px-4 py-3.5 rounded-xl border-2 border-[#077E88]/30 focus:border-[#077E88] focus:outline-none text-sm text-[#0C2229] placeholder:text-[#76898E] bg-[#FAFCFB]"
                    placeholder={t.hero.queryPlaceholder}
                  />
                </div>

                {/* Controls bar: Speak, City & Get Quotes Button */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <div className="flex items-center gap-3 text-xs text-[#3D5259]">
                    <button
                      type="button"
                      onClick={() => setQueryInput('I need a professional painter for 3 bedrooms')}
                      className="inline-flex items-center gap-1 hover:text-[#077E88] transition-colors py-1 px-2 rounded-md hover:bg-[#F4F7F6]"
                    >
                      <Mic className="w-3.5 h-3.5 text-[#76898E]" />
                      <span>Speak</span>
                    </button>

                    <div className="flex items-center gap-1 py-1 px-2 rounded-md bg-[#F4F7F6] text-[#0C2229]">
                      <MapPin className="w-3.5 h-3.5 text-[#077E88]" />
                      <select
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                        className="bg-transparent text-xs font-medium focus:outline-none cursor-pointer"
                      >
                        <option value="Amsterdam">Amsterdam</option>
                        <option value="Berlin">Berlin</option>
                        <option value="Paris">Paris</option>
                        <option value="Madrid">Madrid</option>
                        <option value="Warsaw">Warsaw</option>
                        <option value="Brussels">Brussels</option>
                        <option value="London">London</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleScrollToWaitlist('customer')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#077E88] hover:bg-[#05626A] text-white text-xs sm:text-sm font-semibold tracking-tight shadow-sm transition-all"
                  >
                    <span>{t.hero.getQuotesBtn}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Service Recognition Indicator */}
                <div className="pt-3 border-t border-[#E4EAE9]/80 flex flex-wrap items-center gap-2">
                  <span className="text-xs text-[#05626A] font-medium flex items-center gap-1.5 mr-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2E9A77]" />
                    <span>Recognised services:</span>
                  </span>
                  {recognizedTags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-[#E9F7F1] text-[#2E9A77] border border-[#65C8A6]/40"
                    >
                      <span>✓ {tag}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Quick Prompts Suggestions */}
              <div className="space-y-2">
                <span className="text-xs font-medium text-[#76898E]">
                  {t.hero.sampleQueriesLabel}
                </span>
                <div className="flex flex-wrap gap-2">
                  {sampleQueries.map((sample, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleQuerySample(sample)}
                      className="text-xs px-3 py-1.5 rounded-full bg-white hover:bg-[#E7F3F3] text-[#3D5259] hover:text-[#05626A] border border-[#E4EAE9] transition-colors text-left"
                    >
                      {sample.text.length > 38 ? sample.text.slice(0, 36) + '...' : sample.text}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dual Main CTA buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <button
                  onClick={() => handleScrollToWaitlist('customer')}
                  className="px-7 py-3.5 rounded-full bg-[#077E88] hover:bg-[#05626A] text-white text-sm sm:text-base font-semibold shadow-md hover:shadow-lg transition-all text-center flex items-center justify-center gap-2"
                >
                  <span>{t.hero.joinCustomerBtn}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleScrollToWaitlist('contractor')}
                  className="px-7 py-3.5 rounded-full bg-[#0C2229] hover:bg-[#031C26] text-white text-sm sm:text-base font-semibold shadow-sm hover:shadow transition-all text-center"
                >
                  {t.hero.joinContractorBtn}
                </button>
              </div>

              {/* Trust points */}
              <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-[#76898E]">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#077E88]" />
                  <span>{t.hero.trustPoint1}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#2E9A77]" />
                  <span>{t.hero.trustPoint2}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#E8912C]" />
                  <span>{t.hero.trustPoint3}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Mockup Showcase from Figma UI kit */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Main Preview Card Container */}
                <div className="rounded-3xl bg-white p-4 sm:p-5 border border-[#E4EAE9] shadow-xl space-y-4">
                  
                  <div className="relative rounded-2xl overflow-hidden aspect-16/9 bg-slate-100 border border-[#E4EAE9] group">
                    <img
                      src={getAssetUrl('/assets/aistudio/windows_5cf1f912.jpg')}
                      alt="House, window & car cleaning job request"
                      onError={handleImageError}
                      loading="eager"
                      decoding="async"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0C2229]/60 via-transparent to-transparent pointer-events-none" />
                    
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full text-[11px] font-semibold text-[#077E88] shadow-sm flex items-center gap-1.5 border border-[#E4EAE9]">
                      <span className="w-2 h-2 rounded-full bg-[#077E88]"></span>
                      <span>Live Job Request</span>
                    </div>

                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full text-[11px] font-semibold text-[#0C2229] shadow-sm flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-[#65C8A6]"></span>
                      <span>34 pros nearby</span>
                    </div>

                    <div className="absolute bottom-2.5 left-3 text-white text-[11px] font-medium flex items-center gap-1.5">
                      <span>Cleaning · Window cleaning · Car wash</span>
                    </div>
                  </div>

                  {/* Attached Job Media Thumbnails */}
                  <div className="flex items-center gap-2 pt-1 pb-1">
                    <div className="text-[10px] uppercase font-bold text-[#76898E] shrink-0 mr-1">Photos:</div>
                    <div className="relative w-12 h-9 rounded-lg overflow-hidden border border-[#E4EAE9] bg-slate-100">
                      <img
                        src={getAssetUrl('/assets/aistudio/house_31508b24.jpg')}
                        alt="House exterior"
                        onError={handleImageError}
                        loading="eager"
                        decoding="async"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="relative w-12 h-9 rounded-lg overflow-hidden border border-[#E4EAE9] bg-slate-100">
                      <img
                        src={getAssetUrl('/assets/aistudio/living_1952c2b8.jpg')}
                        alt="Living room interior"
                        onError={handleImageError}
                        loading="eager"
                        decoding="async"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="relative w-12 h-9 rounded-lg overflow-hidden border border-[#E4EAE9] bg-slate-100">
                      <img
                        src={getAssetUrl('/assets/aistudio/car_9b5332fd.jpg')}
                        alt="Vehicle valeting"
                        onError={handleImageError}
                        loading="eager"
                        decoding="async"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-[10px] text-[#76898E] font-medium pl-1">+1 PDF floor-plan</span>
                  </div>

                  {/* Card Info Details */}
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-display text-base font-bold text-[#0C2229]">
                          House, window & car cleaning
                        </h3>
                        <p className="text-xs text-[#76898E] flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-[#077E88]" />
                          <span>Amsterdam, 1077 AB · Sat 10 Oct, ± 2 days</span>
                        </p>
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#E9F7F1] text-[#2E9A77]">
                        5 offers received
                      </span>
                    </div>

                    {/* Sample Contractor Bid Row */}
                    <div className="p-3 rounded-xl bg-[#F4F7F6] border border-[#E4EAE9] flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#077E88] text-white flex items-center justify-center font-bold text-xs">
                          FN
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[#0C2229] flex items-center gap-1">
                            Fresh Nest Cleaning
                            <CheckCircle2 className="w-3 h-3 text-[#077E88]" />
                          </div>
                          <div className="text-[11px] text-[#76898E]">
                            ★ 5.0 (214 reviews) · 1 day
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-display font-bold text-sm text-[#0C2229] tabular-nums">
                          €410
                        </div>
                        <span className="text-[10px] text-[#2E9A77] font-semibold">Fastest pro</span>
                      </div>
                    </div>

                    {/* Price Spread Bar */}
                    <div className="pt-1">
                      <div className="flex items-center justify-between text-[11px] text-[#76898E] mb-1">
                        <span>Lowest: €295</span>
                        <span className="font-semibold text-[#077E88]">Average: €346</span>
                        <span>Highest: €410</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-[#E4EAE9] overflow-hidden relative">
                        <div className="absolute top-0 bottom-0 left-[20%] right-[10%] bg-gradient-to-r from-[#65C8A6] via-[#077E88] to-[#05626A] rounded-full" />
                      </div>
                    </div>
                  </div>

                  <div className="text-center pt-2 border-t border-[#E4EAE9]/70">
                    <span className="text-xs text-[#76898E]">
                      Connects directly to vetted service providers · No obligation
                    </span>
                  </div>
                </div>

                <div className="absolute -bottom-4 -left-4 bg-[#0C2229] text-white p-3.5 rounded-2xl shadow-xl border border-slate-800 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#077E88] flex items-center justify-center text-white font-bold text-xs">
                    Q
                  </div>
                  <div>
                    <div className="text-xs font-bold">Planned Launch</div>
                    <div className="text-[11px] text-slate-300">February 2027 · Global Rollout</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* VARIATION 2: CINEMATIC VIDEO SPOTLIGHT HERO                      */}
        {/* ============================================================== */}
        {heroMode === 'video-spotlight' && (
          <div className="space-y-8 max-w-5xl mx-auto text-center">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E7F3F3] text-[#05626A] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#077E88]" />
                <span>Everything your place needs</span>
              </div>

              <h1 className="font-display text-4xl sm:text-6xl font-extrabold text-[#0C2229] tracking-tight leading-[1.05]">
                Connecting homeowners & businesses with <br className="hidden sm:inline" />
                <span className="text-[#077E88]">rated local service pros</span>
              </h1>

              <p className="text-base sm:text-lg text-[#5E7379] max-w-2xl mx-auto">
                Watch how Loqelo turns any service request into 5 transparent, verified bids in under 2 hours. Launching February 2027.
              </p>
            </div>

            {/* Featured Video Player Box */}
            <div className="relative rounded-3xl overflow-hidden bg-black shadow-2xl border-4 border-white/80 aspect-16/9 max-w-4xl mx-auto group">
              <video
                src={getAssetUrl('/assets/aistudio/Loqelo_final_video_compressed_fafd7b79.mp4')}
                poster={getAssetUrl('/assets/aistudio/hero_4b5d798a.jpg')}
                className="w-full h-full object-cover"
                controls
                muted={isVideoMuted}
                autoPlay={false}
              />
            </div>

            {/* Quick Dual Action Badges below Video */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => handleScrollToWaitlist('customer')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#077E88] hover:bg-[#05626A] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <UserCheck className="w-4 h-4" />
                <span>Join Customer Waiting List</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => handleScrollToWaitlist('contractor')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#0C2229] hover:bg-[#031C26] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Briefcase className="w-4 h-4 text-[#65C8A6]" />
                <span>Register as Service Provider (0% Fee)</span>
              </button>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* VARIATION 3: MINIMALIST SPLIT (Contest Design #37726396 Inspiration) */}
        {/* ============================================================== */}
        {heroMode === 'minimal-split' && (
          <div className="space-y-10 max-w-6xl mx-auto">
            
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="text-xs font-bold tracking-widest text-[#077E88] uppercase block">
                Loqelo Marketplace · February 2027
              </span>
              <h1 className="font-display text-4xl sm:text-6xl font-bold text-[#0C2229] tracking-tight leading-[1.08]">
                Everything your home, garden, and office needs.
              </h1>
              <p className="text-base sm:text-lg text-[#5E7379] leading-relaxed">
                Describe your project once. Receive up to 5 verified local quotes with transparent prices and zero obligation.
              </p>
            </div>

            {/* 2 Equal Focus Cards: Customer vs Contractor */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              
              {/* Customer Box */}
              <div className="p-8 rounded-3xl bg-white border border-[#E4EAE9] shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#E7F6F8] rounded-full blur-2xl pointer-events-none" />
                
                <div className="space-y-4 relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-[#E7F6F8] text-[#077E88] flex items-center justify-center shadow-xs">
                    <UserCheck className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-[#0C2229]">
                    For Homeowners & Clients
                  </h3>
                  <p className="text-sm text-[#5E7379] leading-relaxed">
                    Stop calling contractors one by one. Post your task in plain words and compare quotes from insured, rated specialists.
                  </p>
                  
                  <ul className="space-y-2 text-xs text-[#3D5259] pt-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#2E9A77]" />
                      <span>100% Free with zero booking commissions</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#2E9A77]" />
                      <span>First bids arrive in ~2 hours</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#2E9A77]" />
                      <span>Phone & address hidden until you choose</span>
                    </li>
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => handleScrollToWaitlist('customer')}
                  className="w-full py-3.5 px-6 rounded-full bg-[#077E88] hover:bg-[#05626A] text-white font-bold text-xs sm:text-sm tracking-tight shadow-xs transition-all flex items-center justify-center gap-2 relative z-10"
                >
                  <span>Join as Customer (Early Access)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Contractor Box */}
              <div className="p-8 rounded-3xl bg-[#0C2229] text-white shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#077E88]/30 rounded-full blur-2xl pointer-events-none" />

                <div className="space-y-4 relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 text-[#65C8A6] flex items-center justify-center shadow-xs">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white">
                    For Trades & Service Providers
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Set your operating radius. Get notified when qualified jobs appear near you without paying extortionate lead fees.
                  </p>

                  <ul className="space-y-2 text-xs text-slate-300 pt-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#65C8A6]" />
                      <span>0% commission for first 6 months</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#65C8A6]" />
                      <span>Work only within your chosen kilometer radius</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#65C8A6]" />
                      <span>Verified client budgets and direct chat</span>
                    </li>
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => handleScrollToWaitlist('contractor')}
                  className="w-full py-3.5 px-6 rounded-full bg-white hover:bg-slate-100 text-[#0C2229] font-bold text-xs sm:text-sm tracking-tight shadow-xs transition-all flex items-center justify-center gap-2 relative z-10"
                >
                  <span>Apply for Verified Contractor Badge</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
};
