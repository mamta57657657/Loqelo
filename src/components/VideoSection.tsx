/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect } from 'react';
import { TranslationDictionary } from '../utils/i18n.ts';
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw, CheckCircle } from 'lucide-react';
import { getAssetUrl } from '../utils/assets.ts';

interface VideoSectionProps {
  t: TranslationDictionary;
}

export const VideoSection: React.FC<VideoSectionProps> = ({ t }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);

  const chapters = [
    { seconds: 0, timeStr: '0:00', label: 'Household & garden services overview' },
    { seconds: 15, timeStr: '0:15', label: 'Describe what you need in plain words' },
    { seconds: 23, timeStr: '0:23', label: 'Attach photos, location & dates' },
    { seconds: 29, timeStr: '0:29', label: 'Loqelo radar matches rated local pros' },
    { seconds: 38, timeStr: '0:38', label: 'Transparent price spread & quote comparison' },
    { seconds: 55, timeStr: '0:55', label: 'For Contractors: Jobs come directly to you' },
  ];

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const curr = videoRef.current.currentTime;
    setCurrentTime(curr);

    // Update active chapter
    let activeIdx = 0;
    for (let i = chapters.length - 1; i >= 0; i--) {
      if (curr >= chapters[i].seconds) {
        activeIdx = i;
        break;
      }
    }
    setActiveChapterIndex(activeIdx);
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const seekToSeconds = (seconds: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = seconds;
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = val;
      setCurrentTime(val);
    }
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (!document.fullscreenElement) {
      videoRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <section id="video-demo" className="py-16 sm:py-24 bg-white border-y border-[#E4EAE9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <p className="text-xs font-bold text-[#077E88] tracking-widest uppercase">
            {t.videoSection.kicker}
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0C2229]">
            {t.videoSection.title}
          </h2>
          <p className="text-sm sm:text-base text-[#3D5259]">
            {t.videoSection.subtitle}
          </p>
        </div>

        {/* Video Player Shell */}
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden bg-black shadow-2xl border border-slate-800 group">
            
            {/* The Video Element */}
            <video
              ref={videoRef}
              src={getAssetUrl('/assets/aistudio/Loqelo_final_video_compressed_fafd7b79.mp4')}
              poster={getAssetUrl('/assets/aistudio/hero_4b5d798a.jpg')}
              className="w-full aspect-16/9 object-cover cursor-pointer"
              playsInline
              muted={isMuted}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onClick={togglePlay}
            />

            {/* Play Button Overlay when Paused */}
            {!isPlaying && (
              <div
                onClick={togglePlay}
                className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center cursor-pointer transition-opacity"
              >
                <div className="w-20 h-20 rounded-full bg-[#077E88] text-white flex items-center justify-center shadow-xl hover:scale-110 transition-transform active:scale-95 pl-1">
                  <Play className="w-9 h-9 fill-white" />
                </div>
              </div>
            )}

            {/* Bottom Controls Bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 sm:p-5 space-y-2 opacity-90 group-hover:opacity-100 transition-opacity">
              
              {/* Progress Slider */}
              <div className="relative w-full flex items-center">
                <input
                  type="range"
                  min="0"
                  max={duration || 68}
                  step="0.1"
                  value={currentTime}
                  onChange={handleSeekChange}
                  className="w-full h-1.5 bg-white/30 rounded-lg appearance-none cursor-pointer accent-[#65C8A6]"
                />
              </div>

              {/* Controls Row */}
              <div className="flex items-center justify-between text-white text-xs pt-1">
                <div className="flex items-center gap-3">
                  <button
                    onClick={togglePlay}
                    className="p-1.5 hover:text-[#65C8A6] transition-colors"
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
                  </button>

                  <button
                    onClick={toggleMute}
                    className="p-1.5 hover:text-[#65C8A6] transition-colors"
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>

                  <span className="font-mono text-[11px] text-slate-300 tabular-nums">
                    {formatTime(currentTime)} / {formatTime(duration || 68)}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-white/20 text-[10px] font-semibold tracking-wider uppercase">
                    Loqelo HD
                  </span>
                  <button
                    onClick={toggleFullscreen}
                    className="p-1.5 hover:text-[#65C8A6] transition-colors"
                    aria-label="Toggle Fullscreen"
                  >
                    <Maximize className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Chapter Navigator */}
          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#0C2229] uppercase tracking-wider">
                Video Highlights & Key Moments
              </span>
              <span className="text-xs text-[#76898E]">
                Click any chapter to jump directly
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {chapters.map((ch, idx) => {
                const isActive = activeChapterIndex === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => seekToSeconds(ch.seconds)}
                    className={`flex items-start gap-2.5 p-3 rounded-xl border text-left transition-all ${
                      isActive
                        ? 'bg-[#E7F3F3] border-[#077E88] shadow-xs'
                        : 'bg-white hover:bg-[#F4F7F6] border-[#E4EAE9]'
                    }`}
                  >
                    <span
                      className={`font-mono text-xs font-bold px-1.5 py-0.5 rounded ${
                        isActive
                          ? 'bg-[#077E88] text-white'
                          : 'bg-[#F4F7F6] text-[#3D5259]'
                      }`}
                    >
                      {ch.timeStr}
                    </span>
                    <span className="text-xs font-medium text-[#0C2229] leading-tight">
                      {ch.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
