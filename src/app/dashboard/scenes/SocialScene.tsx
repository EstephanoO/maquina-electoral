"use client";

import React, { useState } from "react";
import { KPI } from "../ui/KPI";
import { useTranslation } from "../contexts/TranslationContext";
import {
  TrendingUp,
  MessageCircle,
  Heart,
  Share2,
  Eye,
  Filter,
  RefreshCw,
  Download,
  Search,
  BarChart3,
  Users,
  Hash,
  Calendar,
  AlertTriangle
} from "lucide-react";
import type { SocialPost, SocialTrend } from "../types/social";

export function SocialScene() {
  const { t } = useTranslation();
  const [selectedPlatform, setSelectedPlatform] = useState("all");
  const [selectedTimeframe, setSelectedTimeframe] = useState("24h");
  const [selectedTrend, setSelectedTrend] = useState<SocialTrend | null>(null);

  // Mock data for demonstration
  const socialMetrics = [
    { label: t("social.metric.totalReach"), value: "2.4M", status: "good" as const, change: "+12%" },
    { label: t("social.metric.engagement"), value: "4.8%", status: "mid" as const, change: "-0.3%" },
    { label: t("social.metric.sentiment"), value: "72%", status: "good" as const, change: "+5%" },
    { label: t("social.metric.viral"), value: "18", status: "good" as const, change: "+7" }
  ];

  const platforms = [
    { id: "all", name: t("social.platform.all"), color: "bg-zinc-500" },
    { id: "facebook", name: t("social.platform.facebook"), color: "bg-blue-500" },
    { id: "instagram", name: t("social.platform.instagram"), color: "bg-pink-500" },
    { id: "twitter", name: t("social.platform.twitter"), color: "bg-cyan-400" },
    { id: "tiktok", name: t("social.platform.tiktok"), color: "bg-black" },
    { id: "youtube", name: t("social.platform.youtube"), color: "bg-red-500" }
  ];

  const timeframes = [
    { id: "1h", name: t("social.timeframe.lastHour") },
    { id: "24h", name: t("social.timeframe.last24h") },
    { id: "7d", name: t("social.timeframe.last7d") },
    { id: "30d", name: t("social.timeframe.last30d") }
  ];

  const trendingTopics: SocialTrend[] = [
    {
      keyword: "Aliaga2026",
      volume: 45200,
      growth: 127,
      sentiment: 78,
      posts: [],
      timeframe: "24h"
    },
    {
      keyword: "CambioPerú",
      volume: 38400,
      growth: 89,
      sentiment: 65,
      posts: [],
      timeframe: "24h"
    },
    {
      keyword: "DebatePresidencial",
      volume: 28900,
      growth: 203,
      sentiment: 45,
      posts: [],
      timeframe: "24h"
    },
    {
      keyword: "EconomíaPerú",
      volume: 21700,
      growth: 34,
      sentiment: 52,
      posts: [],
      timeframe: "24h"
    }
  ];

  const recentPosts: SocialPost[] = [
    {
      id: "1",
      platform: "facebook",
      content: "Nuestro compromiso con el progreso del Perú sigue firme. ¡Juntos por un mejor futuro! #Aliaga2026",
      author: "Guillermo Aliaga",
      metrics: {
        likes: 2847,
        shares: 523,
        comments: 189,
        reach: 45200,
        engagement: 4.2
      },
      sentiment: {
        score: 85,
        category: "positive",
        confidence: 92
      },
      timestamp: "2024-01-15T14:30:00Z",
      tags: ["política", "perú", "campaña"],
      verified: true
    },
    {
      id: "2",
      platform: "twitter",
      content: "El país necesita líderes con visión. Es hora de un verdadero cambio. #PerúNecesitaCambio",
      author: "Supporter2026",
      metrics: {
        likes: 892,
        shares: 445,
        comments: 67,
        reach: 12800,
        engagement: 6.8
      },
      sentiment: {
        score: 72,
        category: "positive",
        confidence: 78
      },
      timestamp: "2024-01-15T13:45:00Z",
      tags: ["política", "opinión"],
      verified: false
    }
  ];

  const getPlatformIcon = (platform: string) => {
    const icons = {
      facebook: <div className="w-2 h-2 bg-blue-500 rounded-sm" />,
      instagram: <div className="w-2 h-2 bg-pink-500 rounded-sm" />,
      twitter: <div className="w-2 h-2 bg-cyan-400 rounded-sm" />,
      tiktok: <div className="w-2 h-2 bg-black border border-zinc-600 rounded-sm" />,
      youtube: <div className="w-2 h-2 bg-red-500 rounded-sm" />
    };
    return icons[platform as keyof typeof icons] || <div className="w-2 h-2 bg-zinc-500 rounded-sm" />;
  };

  const getSentimentColor = (score: number) => {
    if (score >= 70) return "text-green-500";
    if (score >= 50) return "text-amber-500";
    return "text-red-500";
  };

  return (
    <div className="grid grid-cols-12 gap-3 h-full">
      {/* Left Sidebar - Controls & Filters */}
      <div className="col-span-3 space-y-3">
        {/* Platform Filter */}
        <div className="bg-[#080808] border border-zinc-800/40 rounded-lg p-3">
          <div className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest mb-3 flex items-center gap-2">
            <Hash size={10} />
            {t("social.platforms.title")}
          </div>
          <div className="space-y-1">
            {platforms.map((platform) => (
              <button
                key={platform.id}
                type="button"
                onClick={() => setSelectedPlatform(platform.id)}
                className={`w-full p-2 rounded border text-left transition-all text-[8px] font-mono flex items-center gap-2 ${
                  selectedPlatform === platform.id
                    ? "bg-amber-500/10 border-amber-500/40 text-amber-500"
                    : "bg-black/40 border-zinc-800/30 text-zinc-400 hover:border-zinc-700"
                }`}
              >
                <div className={`w-1.5 h-1.5 rounded ${platform.color}`} />
                <span>{platform.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Timeframe Filter */}
        <div className="bg-[#080808] border border-zinc-800/40 rounded-lg p-3">
          <div className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest mb-3 flex items-center gap-2">
            <Calendar size={10} />
            {t("social.timeframe.title")}
          </div>
          <div className="space-y-1">
            {timeframes.map((timeframe) => (
              <button
                key={timeframe.id}
                type="button"
                onClick={() => setSelectedTimeframe(timeframe.id)}
                className={`w-full p-1.5 rounded border text-left transition-all text-[8px] font-mono ${
                  selectedTimeframe === timeframe.id
                    ? "bg-amber-500/10 border-amber-500/40 text-amber-500"
                    : "bg-black/40 border-zinc-800/30 text-zinc-400 hover:border-zinc-700"
                }`}
              >
                {timeframe.name}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Metrics */}
        <div className="grid grid-cols-2 gap-2">
          {socialMetrics.slice(0, 4).map((metric) => (
            <KPI 
              key={metric.label}
              label={metric.label}
              value={metric.value}
              status={metric.status}
            />
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="col-span-9 space-y-3">
        {/* Trending Topics */}
        <div className="bg-[#080808] border border-zinc-800/40 rounded-lg p-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-[9px] font-mono text-amber-500 font-black uppercase tracking-widest">
              <TrendingUp size={12} />
              {t("social.trending.title")}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="p-1.5 border border-zinc-700/50 text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                <RefreshCw size={10} className="animate-spin" />
              </button>
              <button
                type="button"
                className="p-1.5 border border-zinc-700/50 text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                <Filter size={10} />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-2">
            {trendingTopics.map((trend) => (
              <button
                key={trend.keyword}
                type="button"
                onClick={() => setSelectedTrend(trend)}
                className={`p-2 rounded border text-left transition-all ${
                  selectedTrend?.keyword === trend.keyword
                    ? "bg-amber-500/10 border-amber-500/40"
                    : "bg-black/40 border-zinc-800/30 hover:border-zinc-700"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[8px] font-mono text-zinc-300 uppercase">
                    #{trend.keyword}
                  </span>
                  <div className={`text-[8px] font-black ${getSentimentColor(trend.sentiment)}`}>
                    {trend.sentiment}%
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[7px] text-zinc-500">
                    {(trend.volume / 1000).toFixed(1)}K
                  </span>
                  <span className="text-[7px] text-green-500 font-black">
                    +{trend.growth}%
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Posts Feed */}
        <div className="flex-1 grid grid-cols-2 gap-3">
          {/* Recent Posts */}
          <div className="bg-[#080808] border border-zinc-800/40 rounded-lg p-3">
            <div className="flex items-center gap-2 text-[9px] font-mono text-zinc-500 uppercase tracking-widest mb-3">
              <MessageCircle size={10} />
              {t("social.recentPosts.title")}
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {recentPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-black/40 border border-zinc-800/30 rounded p-2"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getPlatformIcon(post.platform)}
                      <span className="text-[8px] font-mono text-zinc-300">
                        {post.author}
                      </span>
                      {post.verified && (
                        <div className="w-2 h-2 bg-amber-500 rounded-full" />
                      )}
                    </div>
                    <div className={`text-[8px] font-black ${getSentimentColor(post.sentiment.score)}`}>
                      {post.sentiment.score}%
                    </div>
                  </div>
                  <p className="text-[9px] text-zinc-400 line-clamp-2 mb-2">
                    {post.content}
                  </p>
                  <div className="flex items-center gap-3 text-[7px] text-zinc-500">
                    <div className="flex items-center gap-1">
                      <Heart size={8} />
                      {post.metrics.likes}
                    </div>
                    <div className="flex items-center gap-1">
                      <Share2 size={8} />
                      {post.metrics.shares}
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye size={8} />
                      {(post.metrics.reach / 1000).toFixed(1)}K
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Engagement Metrics */}
          <div className="bg-[#080808] border border-zinc-800/40 rounded-lg p-3">
            <div className="flex items-center gap-2 text-[9px] font-mono text-zinc-500 uppercase tracking-widest mb-3">
              <BarChart3 size={10} />
              {t("social.performance.title")}
            </div>
            <div className="space-y-3">
              {socialMetrics.map((metric) => (
                <div key={metric.label} className="bg-black/40 border border-zinc-800/30 rounded p-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[8px] font-mono text-zinc-400">
                      {metric.label}
                    </span>
                    <span className={`text-[8px] font-black ${
                      metric.change?.startsWith('+') ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {metric.change}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-mono text-white">
                      {metric.value}
                    </span>
                    <div className={`w-1 h-4 rounded ${
                      metric.status === 'good' ? 'bg-green-500' :
                      metric.status === 'mid' ? 'bg-amber-500' : 'bg-red-500'
                    }`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Alert Section */}
        <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-3">
          <div className="flex items-center gap-2 text-red-400 mb-2">
            <AlertTriangle size={12} />
            <span className="text-[9px] font-black uppercase tracking-widest">
              {t("social.alerts.title")}
            </span>
          </div>
          <div className="text-[8px] text-zinc-400">
            • {t("social.alert.negativeSpike", { topic: "DebatePresidencial" })}
            • {t("social.alert.competitorGrowth", { growth: 203 })}
            • {t("social.alert.unusualActivity")}
          </div>
        </div>
      </div>
    </div>
  );
}