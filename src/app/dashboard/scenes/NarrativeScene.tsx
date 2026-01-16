"use client";

import React, { useState } from "react";
import {
  Zap,
  Loader2,
  Facebook,
  Instagram,
  Video,
  MessageCircle,
  Heart,
  Share2,
  Eye,
  ShieldAlert,
  Terminal,
  Search,
  MousePointer2,
  BrainCircuit,
  Trophy,
  Activity,
  Globe,
  Users,
  Target,
} from "lucide-react";
import {
  Post,
  AnalyzeResponse,
  PlatformConfig,
  StatusType,
} from "../types/analyzer";

const DEFAULT_URL = "https://www.facebook.com/GuilloAliaga";

const POST_ICONS = {
  FB: <Facebook className="text-blue-500" size={14} />,
  IG: <Instagram className="text-pink-500" size={14} />,
  TT: <Video className="text-cyan-400" size={14} />,
  SYS: <Globe size={14} />,
};

export default function NarrativeScene() {
  const [targetUrl, setTargetUrl] = useState(DEFAULT_URL);
  const [status, setStatus] = useState<StatusType>("idle");
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLogs((prev) => [
      `${new Date().toLocaleTimeString()} > ${msg}`,
      ...prev.slice(0, 3),
    ]);
  };

  const executePipeline = async () => {
    setStatus("scraping");
    addLog(`Scanning target...`);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: targetUrl }),
      });

      const result: AnalyzeResponse = await response.json();
      console.log(result);

      if (!response.ok) {
        throw new Error(result.error || "Analysis failed");
      }

      if (result.fromCache) {
        setStatus("done");
        addLog(`🚀 Cache hit! (${Math.round((result.cacheAge || 0) / 1000)}s old)`);
      } else {
        setStatus("analyzing");
        addLog("Processing intelligence...");
      }

      // Enriquecer posts con iconos del frontend
      const enrichedPosts = result.posts.map((post: Post) => ({
        ...post,
        icon: POST_ICONS[post.platform],
      }));

      setPosts(enrichedPosts);
      setSelectedPost(enrichedPosts[0]);
      setStatus("done");
      addLog("Intelligence Live.");
    } catch (error) {
      addLog(
        `System Failure: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-500 font-mono p-2 selection:bg-amber-500/30">
      {/* HEADER */}
      <header className="flex items-center gap-2 bg-[#0a0a0a] border border-zinc-800/40 p-2 rounded-lg mb-2 shadow-xl">
        <div className="flex items-center gap-2 pr-4 border-r border-zinc-800/60">
          <BrainCircuit className="text-amber-500" size={18} />
          <span className="text-white font-black text-xs tracking-tighter uppercase">
            NEXUS_3.0
          </span>
        </div>

        <div className="flex-1 flex items-center gap-2 bg-black/40 px-3 py-1 rounded border border-zinc-800/20">
          <Search size={12} />
          <input
            value={targetUrl}
            onChange={(e) => setTargetUrl(e.target.value)}
            className="bg-transparent text-[10px] text-zinc-300 w-full outline-none font-bold uppercase"
          />
        </div>

        <button
          type="button"
          onClick={executePipeline}
          disabled={status !== "idle" && status !== "done"}
          className="bg-amber-500 hover:bg-amber-400 text-black px-4 py-1.5 rounded font-black text-[10px] flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50"
        >
          {status === "idle" || status === "done" ? (
            <Zap size={12} />
          ) : (
            <Loader2 size={12} className="animate-spin" />
          )}
          {status === "scraping"
            ? "SCANNING"
            : status === "analyzing"
              ? "COGNITION"
              : "SYNC"}
        </button>
      </header>

      <main className="grid grid-cols-12 gap-2 max-w-[1600px] mx-auto">
        {/* SIDEBAR */}
        <div className="col-span-3 space-y-2">
          <div className="bg-[#080808] border border-zinc-800/40 p-2 rounded-lg">
            <div className="flex items-center gap-2 mb-2 text-[9px] font-bold uppercase opacity-50">
              <Terminal size={10} /> Live_Logs
            </div>
            {logs.map((log, i) => (
              <div
                key={`log-${i}-${Date.now()}`}
                className="text-[8px] leading-tight border-l border-amber-500/20 pl-2 mb-1 truncate font-mono"
              >
                {log}
              </div>
            ))}
          </div>

          <div className="space-y-1.5 overflow-y-auto max-h-[70vh]">
            {posts.map((post) => (
              <button
                key={post.id}
                type="button"
                onClick={() => setSelectedPost(post)}
                className={`w-full p-2 rounded border transition-all focus:outline-none focus:ring-1 focus:ring-amber-500/50 ${
                  selectedPost?.id === post.id
                    ? "bg-amber-500/5 border-amber-500/40"
                    : "bg-[#080808] border-zinc-800/30 hover:border-zinc-700"
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  {post.icon}
                  <div
                    className={`text-[8px] px-1 rounded font-bold ${
                      post.ai.cat === "CRISIS"
                        ? "bg-red-500 text-white"
                        : "bg-zinc-800 text-zinc-500"
                    }`}
                  >
                    {post.ai.cat}
                  </div>
                </div>
                <p className="text-[10px] text-zinc-400 line-clamp-1 italic text-left">
                  "{post.text}"
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="col-span-9">
          {selectedPost ? (
            <div className="bg-[#080808] border border-zinc-800/60 rounded-xl p-4 relative overflow-hidden">
              <div className="relative z-10">
                {/* HEADER ANALYSIS */}
                <div className="flex justify-between items-start mb-4 border-b border-zinc-800/40 pb-4">
                  <div>
                    <div className="flex items-center gap-2 text-amber-500/60 mb-1">
                      <Target size={12} />
                      <span className="text-[9px] font-black uppercase tracking-[0.3em]">
                        Signal_Detected
                      </span>
                    </div>
                    <h2 className="text-xl font-black text-white uppercase tracking-tighter leading-none">
                      {selectedPost.ai.brief}
                    </h2>
                  </div>
                  <div className="bg-zinc-900 border border-zinc-800 px-3 py-1 rounded text-center">
                    <div className="text-[8px] text-zinc-500 uppercase font-bold">
                      Sent_Index
                    </div>
                    <div
                      className={`text-lg font-black ${
                        selectedPost.ai.score < 0
                          ? "text-red-500"
                          : "text-green-500"
                      }`}
                    >
                      {selectedPost.ai.score}%
                    </div>
                  </div>
                </div>

                {/* METRICS */}
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {[
                    {
                      l: "Likes",
                      v: selectedPost.metrics.likes,
                      i: Heart,
                      c: "text-red-500",
                    },
                    {
                      l: "Comm",
                      v: selectedPost.metrics.comments,
                      i: MessageCircle,
                      c: "text-blue-500",
                    },
                    {
                      l: "Share",
                      v: selectedPost.metrics.shares,
                      i: Share2,
                      c: "text-green-500",
                    },
                    {
                      l: "Reach",
                      v: Math.floor(selectedPost.metrics.likes * 12),
                      i: Eye,
                      c: "text-amber-500",
                    },
                  ].map((metric) => (
                    <div
                      key={metric.l}
                      className="bg-black/40 border border-zinc-800/40 p-2 rounded flex items-center gap-3"
                    >
                      <metric.i size={12} className={metric.c} />
                      <div>
                        <div className="text-xs font-bold text-white leading-none">
                          {metric.v}
                        </div>
                        <div className="text-[8px] uppercase text-zinc-600 font-bold">
                          {metric.l}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* ANALYSIS GRID */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-3">
                    <div className="bg-amber-500/5 border-l-2 border-amber-500 p-3 rounded-r">
                      <div className="flex items-center gap-2 text-amber-500 mb-1 font-black text-[9px] uppercase tracking-widest">
                        <Trophy size={12} /> Counter_Strategy
                      </div>
                      <p className="text-[11px] text-zinc-300 leading-tight font-sans italic">
                        {selectedPost.ai.strategy}
                      </p>
                    </div>
                    <div className="p-3 bg-zinc-900/30 rounded border border-zinc-800/40">
                      <div className="text-[9px] font-bold text-zinc-500 mb-1 uppercase flex items-center gap-2">
                        <Activity size={12} /> Impact_Vector
                      </div>
                      <p className="text-[10px] text-zinc-400 leading-snug">
                        Riesgos identificados:{" "}
                        {selectedPost.ai.risks.join(", ")}
                      </p>
                    </div>
                  </div>

                  {/* COMMUNITY ANALYSIS */}
                  <div className="bg-blue-500/5 border-l-2 border-blue-500 p-3 rounded-r">
                    <div className="flex items-center gap-2 text-blue-400 mb-1 font-black text-[9px] uppercase tracking-widest">
                      <Users size={12} /> Community_Reaction
                    </div>
                    <p className="text-[11px] text-zinc-300 leading-tight mb-3 italic">
                      {selectedPost.ai.community}
                    </p>
                    <div className="flex gap-1">
                      <span className="text-[7px] bg-blue-500/10 text-blue-400 px-1.5 py-0.5 rounded border border-blue-500/20 font-bold">
                        SENTIMIENTO_AUDIENCIA
                      </span>
                      <span className="text-[7px] bg-zinc-800 text-zinc-500 px-1.5 py-0.5 rounded font-bold">
                        LIVE_SCAN
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <button
                    type="button"
                    className="flex-1 bg-white hover:bg-amber-500 text-black font-black py-2 rounded text-[10px] flex items-center justify-center gap-2 transition-all uppercase group"
                  >
                    Deploy AI Response{" "}
                    <MousePointer2
                      size={12}
                      className="group-hover:scale-110 transition-transform"
                    />
                  </button>
                  <div className="bg-zinc-900 px-3 py-2 rounded flex items-center gap-2 border border-zinc-800/60 text-[8px] font-black text-amber-500/50 uppercase tracking-widest">
                    <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />{" "}
                    ENGINE_ACTIVE
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[400px] border border-dashed border-zinc-800/40 rounded-xl flex flex-col items-center justify-center opacity-20">
              <ShieldAlert size={40} strokeWidth={1} />
              <span className="text-[10px] uppercase font-black mt-4 tracking-[0.3em]">
                System_Standby
              </span>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
