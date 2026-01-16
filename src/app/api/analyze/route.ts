import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { CacheService } from "../../../services/cache.service";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: NextRequest) {
  console.log("🔄 Analysis request received");

  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // Check cache first
    console.log("🔍 Checking cache...");
    const cached = await CacheService.getValidAnalysis(url);
    if (cached) {
      console.log("✅ Cache hit! Returning cached analysis");
      return NextResponse.json({
        success: true,
        posts: cached.posts,
        fromCache: true,
        cacheAge: cached.cacheAge,
      });
    }

    console.log("❌ Cache miss, proceeding with analysis...");
    const config = getPlatformConfig(url);

    // Scrape data with Apify
    const scrapeResult = await scrapeWithApify(url, config.actor);

    // Analyze with Gemini
    const analyzedPosts = await Promise.all(
      scrapeResult.map(async (item: any) => {
        const text = item.text || item.caption || "Multimedia";
        const comments = item.latestComments || [];
        const ai = await analyzeIntelligence(text, comments);

        return {
          id: item.id || Math.random().toString(),
          text,
          platform: config.label,
          metrics: {
            likes: item.likes || item.likesCount || 0,
            comments: item.comments || item.commentsCount || 0,
            shares: item.shares || item.sharesCount || 0,
          },
          ai,
        };
      }),
    );

    // Save to cache
    console.log("💾 Saving analysis to cache...");
    await CacheService.saveAnalysis(url, {
      aiAnalysis: analyzedPosts,
      content: analyzedPosts[0]?.text || "",
      author: "Unknown",
      publishedAt: new Date(),
      metrics: analyzedPosts[0]?.metrics || {},
    });

    return NextResponse.json({
      success: true,
      posts: analyzedPosts,
      fromCache: false,
    });
  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json(
      {
        error: "Analysis failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

function getPlatformConfig(url: string) {
  if (url.includes("facebook.com"))
    return {
      actor: "apify~facebook-posts-scraper",
      label: "FB",
    };
  if (url.includes("instagram.com"))
    return {
      actor: "apify~instagram-post-scraper",
      label: "IG",
    };
  if (url.includes("tiktok.com"))
    return {
      actor: "apify~tiktok-scraper",
      label: "TT",
    };
  return {
    actor: "apify~facebook-posts-scraper",
    label: "SYS",
  };
}

async function scrapeWithApify(url: string, actor: string) {
  const response = await fetch(
    `https://api.apify.com/v2/acts/${actor}/run-sync-get-dataset-items?token=${process.env.APIFY_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        startUrls: [{ url }],
        resultsLimit: 3,
      }),
    },
  );

  const data: any = await response.json();
  return Array.isArray(data) ? data : data.items || [];
}

async function analyzeIntelligence(content: string, comments: any[]) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite",
    });

    const commentsText = comments.map((c) => c.text || c.content).join(" | ");

    const prompt = `
      ANALISIS DE GUERRA COGNITIVA. 
      POST: "${content}"
      COMENTARIOS_MUESTRA: "${commentsText}"
      
      RESPONDE SOLO JSON:
      {
        "score": -100 a 100,
        "cat": "CRISIS" | "ATAQUE" | "APOYO",
        "brief": "10 palabras max",
        "strategy": "accion tactica",
        "risks": ["r1", "r2"],
        "community": "resumen corto del sentimiento de los comentarios"
      }
    `;

    const result = await model.generateContent(prompt);
    const text = result.response
      .text()
      .replace(/```json|```/g, "")
      .trim();

    return JSON.parse(text);
  } catch (e) {
    return {
      score: 0,
      cat: "INFORMATIVO",
      brief: "Error IA",
      strategy: "Manual",
      risks: ["TIMEOUT"],
      community: "No analizado",
    };
  }
}

