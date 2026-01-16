"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "es";

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

// Translation data
const translations = {
  en: {
    // Navigation
    "nav.competitors.label": "Intel",
    "nav.geohub.label": "GeoHub",
    "nav.social.label": "Social",
    "nav.narrative.label": "Narrative",
    "nav.badge.live": "LIVE",
    "nav.badge.version": "2.0",
    "nav.badge.ai": "AI",

    // Header
    "header.timezone": "UTC-5",
    "header.listNumber": "LISTA #1",

    // Scenes
    "scene.narrative.title": "Narrative Control",
    "scene.narrative.description": "Social media narrative analysis",
    "scene.competitors.title": "Competitor Intelligence",
    "scene.competitors.description": "Opposition monitoring and analysis",
    "scene.geohub.title": "GeoHub",
    "scene.geohub.description": "Advanced geographic intelligence",
    "scene.social.title": "Social Analytics",
    "scene.social.description": "Social media performance and trends",

    // Widgets
    "widget.mainMap.title": "Main Map",
    "widget.geoMetrics.title": "Geographic Metrics",
    "widget.mapLayers.title": "Map Layers",
    "widget.trendingTopics.title": "Trending Topics",
    "widget.recentPosts.title": "Recent Posts",
    "widget.platformMetrics.title": "Platform Metrics",
    "widget.new.title": "New Widget",

    // Widget types and sizes
    "widget.type.kpi": "KPI",
    "widget.type.map": "Map",
    "widget.type.table": "Table",
    "widget.type.chart": "Chart",
    "widget.type.feed": "Feed",
    "widget.size.small": "Small",
    "widget.size.medium": "Medium",
    "widget.size.large": "Large",

    // Customization Panel
    "panel.customizeTitle": "Customize {title}",
    "panel.saveLayout": "Save Layout",
    "panel.layoutOptions": "Layout Options",
    "panel.defaultLayout": "Default Layout",
    "panel.layout.grid": "Grid",
    "panel.layout.focus": "Focus",
    "panel.addWidget": "Add Widget",
    "panel.widgetManagement": "Widget Management",

    // Narrative Scene
    "narrative.header.title": "NEXUS_3.0",
    "narrative.button.sync": "SYNC",
    "narrative.button.scanning": "SCANNING",
    "narrative.button.cognition": "COGNITION",
    "narrative.logs.title": "Live_Logs",
    "narrative.logs.scanning": "Scanning target...",
    "narrative.logs.processing": "Processing intelligence...",
    "narrative.logs.live": "Intelligence Live.",
    "narrative.logs.error": "System Failure: {error}",
    "narrative.metric.likes": "Likes",
    "narrative.metric.comments": "Comm",
    "narrative.metric.shares": "Share",
    "narrative.metric.reach": "Reach",
    "narrative.analysis.signal": "Signal_Detected",
    "narrative.analysis.sentimentIndex": "Sent_Index",
    "narrative.analysis.counterStrategy": "Counter_Strategy",
    "narrative.analysis.impactVector": "Impact_Vector",
    "narrative.analysis.risks": "Riesgos identificados:",
    "narrative.analysis.community": "Community_Reaction",
    "narrative.analysis.audienceSentiment": "SENTIMIENTO_AUDIENCIA",
    "narrative.analysis.liveScan": "LIVE_SCAN",
    "narrative.action.deploy": "Deploy AI Response",
    "narrative.status.engine": "ENGINE_ACTIVE",
    "narrative.empty.state": "System_Standby",

    // Competitors Scene
    "competitors.threat.label": "Active Threat",
    "competitors.projection.label": "Proyección:",

    // GeoHub Scene
    "geohub.intelligence.title": "Geographic Intelligence",
    "geohub.layers.title": "Map Layers",
    "geohub.liveAnalysis.title": "Live Geographic Analysis",
    "geohub.metric.regions": "Regions",
    "geohub.metric.dataPoints": "Data Points",
    "geohub.metric.coverage": "Coverage",
    "geohub.metric.accuracy": "Accuracy",
    "geohub.layer.support": "Support Level",
    "geohub.layer.population": "Population Density",
    "geohub.layer.risk": "Risk Areas",
    "geohub.layer.campaign": "Campaign Activities",
    "geohub.status.live": "LIVE",
    "geohub.status.static": "STATIC",
    "geohub.stat.strongholds": "Stronghold Regions",
    "geohub.stat.contested": "Contested Zones",
    "geohub.stat.highRisk": "High Risk Areas",
    "geohub.stat.activeCampaigns": "Active Campaigns",
    "geohub.legend.title": "Legend",
    "geohub.legend.strong": "Strong Support",
    "geohub.legend.contested": "Contested",
    "geohub.legend.highRisk": "High Risk",
    "geohub.legend.active": "Campaign Active",
    "geohub.region.population": "Population:",
    "geohub.region.support": "Support:",
    "geohub.region.risk": "Risk:",
    "geohub.risk.low": "LOW",
    "geohub.risk.medium": "MEDIUM",
    "geohub.risk.high": "HIGH",

    // Social Scene
    "social.platforms.title": "Platforms",
    "social.timeframe.title": "Timeframe",
    "social.trending.title": "Trending Topics",
    "social.recentPosts.title": "Recent Posts",
    "social.performance.title": "Performance Metrics",
    "social.alerts.title": "Critical Alerts",
    "social.platform.all": "All Platforms",
    "social.platform.facebook": "Facebook",
    "social.platform.instagram": "Instagram",
    "social.platform.twitter": "Twitter",
    "social.platform.tiktok": "TikTok",
    "social.platform.youtube": "YouTube",
    "social.timeframe.lastHour": "Last Hour",
    "social.timeframe.last24h": "Last 24 Hours",
    "social.timeframe.last7d": "Last 7 Days",
    "social.timeframe.last30d": "Last 30 Days",
    "social.metric.totalReach": "Total Reach",
    "social.metric.engagement": "Engagement Rate",
    "social.metric.sentiment": "Sentiment Score",
    "social.metric.viral": "Viral Posts",
    "social.alert.negativeSpike": "Negative sentiment spike detected in \"{topic}\"",
    "social.alert.competitorGrowth": "Competitor trending with +{growth}% growth in last 24h",
    "social.alert.unusualActivity": "Unusual activity pattern detected in hashtag performance",

    // Pulse Scene
    "pulse.status.title": "Campaign Status",
    "pulse.status.stable": "ESTABLE",
    "pulse.metric.electoralBase": "Base Electoral",
    "pulse.metric.seatProb": "Prob. Escaño",
    "pulse.metric.digitalVisibility": "Visibilidad Digital",
    "pulse.metric.engagement": "Engagement",
    "pulse.metric.reputationRisk": "Riesgo Reputacional",
    "pulse.metric.recall": "Recordación",
    "pulse.risk.low": "Bajo",

    // Territory Scene
    "territory.title": "Geo Strategy Engine",

    // Language switcher
    "lang.english": "English",
    "lang.spanish": "Español"
  },
  es: {
    // Navigation
    "nav.competitors.label": "Inteligencia",
    "nav.geohub.label": "GeoHub",
    "nav.social.label": "Social",
    "nav.narrative.label": "Narrativa",
    "nav.badge.live": "EN VIVO",
    "nav.badge.version": "2.0",
    "nav.badge.ai": "IA",

    // Header
    "header.timezone": "UTC-5",
    "header.listNumber": "LISTA #1",

    // Scenes
    "scene.narrative.title": "Control Narrativo",
    "scene.narrative.description": "Análisis narrativo de redes sociales",
    "scene.competitors.title": "Inteligencia de Competidores",
    "scene.competitors.description": "Monitoreo y análisis de oposición",
    "scene.geohub.title": "GeoHub",
    "scene.geohub.description": "Inteligencia geográfica avanzada",
    "scene.social.title": "Analítica Social",
    "scene.social.description": "Rendimiento y tendencias en redes sociales",

    // Widgets
    "widget.mainMap.title": "Mapa Principal",
    "widget.geoMetrics.title": "Métricas Geográficas",
    "widget.mapLayers.title": "Capas del Mapa",
    "widget.trendingTopics.title": "Temas Tendencia",
    "widget.recentPosts.title": "Publicaciones Recientes",
    "widget.platformMetrics.title": "Métricas de Plataforma",
    "widget.new.title": "Nuevo Widget",

    // Widget types and sizes
    "widget.type.kpi": "KPI",
    "widget.type.map": "Mapa",
    "widget.type.table": "Tabla",
    "widget.type.chart": "Gráfico",
    "widget.type.feed": "Feed",
    "widget.size.small": "Pequeño",
    "widget.size.medium": "Mediano",
    "widget.size.large": "Grande",

    // Customization Panel
    "panel.customizeTitle": "Personalizar {title}",
    "panel.saveLayout": "Guardar Diseño",
    "panel.layoutOptions": "Opciones de Diseño",
    "panel.defaultLayout": "Diseño Predeterminado",
    "panel.layout.grid": "Cuadrícula",
    "panel.layout.focus": "Enfoque",
    "panel.addWidget": "Añadir Widget",
    "panel.widgetManagement": "Gestión de Widgets",

    // Narrative Scene
    "narrative.header.title": "NEXUS_3.0",
    "narrative.button.sync": "SINCRONIZAR",
    "narrative.button.scanning": "ESCANEANDO",
    "narrative.button.cognition": "PROCESANDO",
    "narrative.logs.title": "Registros en Vivo",
    "narrative.logs.scanning": "Escaneando objetivo...",
    "narrative.logs.processing": "Procesando inteligencia...",
    "narrative.logs.live": "Inteligencia Activa",
    "narrative.logs.error": "Fallo del Sistema: {error}",
    "narrative.metric.likes": "Me gusta",
    "narrative.metric.comments": "Comentarios",
    "narrative.metric.shares": "Compartidos",
    "narrative.metric.reach": "Alcance",
    "narrative.analysis.signal": "Señal Detectada",
    "narrative.analysis.sentimentIndex": "Índice de Sentimiento",
    "narrative.analysis.counterStrategy": "Contramedida",
    "narrative.analysis.impactVector": "Vector de Impacto",
    "narrative.analysis.risks": "Riesgos identificados:",
    "narrative.analysis.community": "Reacción de la Comunidad",
    "narrative.analysis.audienceSentiment": "SENTIMIENTO_AUDIENCIA",
    "narrative.analysis.liveScan": "ESCANEO_EN_VIVO",
    "narrative.action.deploy": "Desplegar Respuesta IA",
    "narrative.status.engine": "MOTOR_ACTIVO",
    "narrative.empty.state": "Sistema en Espera",

    // Competitors Scene
    "competitors.threat.label": "Amenaza Activa",
    "competitors.projection.label": "Proyección:",

    // GeoHub Scene
    "geohub.intelligence.title": "Inteligencia Geográfica",
    "geohub.layers.title": "Capas del Mapa",
    "geohub.liveAnalysis.title": "Análisis Geográfico en Vivo",
    "geohub.metric.regions": "Regiones",
    "geohub.metric.dataPoints": "Puntos de Datos",
    "geohub.metric.coverage": "Cobertura",
    "geohub.metric.accuracy": "Precisión",
    "geohub.layer.support": "Nivel de Apoyo",
    "geohub.layer.population": "Densidad Poblacional",
    "geohub.layer.risk": "Áreas de Riesgo",
    "geohub.layer.campaign": "Actividades de Campaña",
    "geohub.status.live": "EN VIVO",
    "geohub.status.static": "ESTÁTICO",
    "geohub.stat.strongholds": "Regiones Seguras",
    "geohub.stat.contested": "Zonas Disputadas",
    "geohub.stat.highRisk": "Áreas de Alto Riesgo",
    "geohub.stat.activeCampaigns": "Campañas Activas",
    "geohub.legend.title": "Leyenda",
    "geohub.legend.strong": "Apoyo Fuerte",
    "geohub.legend.contested": "Disputado",
    "geohub.legend.highRisk": "Alto Riesgo",
    "geohub.legend.active": "Campaña Activa",
    "geohub.region.population": "Población:",
    "geohub.region.support": "Apoyo:",
    "geohub.region.risk": "Riesgo:",
    "geohub.risk.low": "BAJO",
    "geohub.risk.medium": "MEDIO",
    "geohub.risk.high": "ALTO",

    // Social Scene
    "social.platforms.title": "Plataformas",
    "social.timeframe.title": "Periodo",
    "social.trending.title": "Temas Tendencia",
    "social.recentPosts.title": "Publicaciones Recientes",
    "social.performance.title": "Métricas de Rendimiento",
    "social.alerts.title": "Alertas Críticas",
    "social.platform.all": "Todas las Plataformas",
    "social.platform.facebook": "Facebook",
    "social.platform.instagram": "Instagram",
    "social.platform.twitter": "Twitter",
    "social.platform.tiktok": "TikTok",
    "social.platform.youtube": "YouTube",
    "social.timeframe.lastHour": "Última Hora",
    "social.timeframe.last24h": "Últimas 24 Horas",
    "social.timeframe.last7d": "Últimos 7 Días",
    "social.timeframe.last30d": "Últimos 30 Días",
    "social.metric.totalReach": "Alcance Total",
    "social.metric.engagement": "Tasa de Compromiso",
    "social.metric.sentiment": "Puntuación de Sentimiento",
    "social.metric.viral": "Publicaciones Virales",
    "social.alert.negativeSpike": "Pico de sentimiento negativo detectado en \"{topic}\"",
    "social.alert.competitorGrowth": "Competidor en tendencia con +{growth}% de crecimiento en últimas 24h",
    "social.alert.unusualActivity": "Patrón de actividad inusual detectado en rendimiento de hashtag",

    // Pulse Scene
    "pulse.status.title": "Estado de Campaña",
    "pulse.status.stable": "ESTABLE",
    "pulse.metric.electoralBase": "Base Electoral",
    "pulse.metric.seatProb": "Prob. Escaño",
    "pulse.metric.digitalVisibility": "Visibilidad Digital",
    "pulse.metric.engagement": "Compromiso",
    "pulse.metric.reputationRisk": "Riesgo Reputacional",
    "pulse.metric.recall": "Recordación",
    "pulse.risk.low": "Bajo",

    // Territory Scene
    "territory.title": "Motor de Estrategia Geográfica",

    // Language switcher
    "lang.english": "English",
    "lang.spanish": "Español"
  }
};

export function TranslationProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    // Try to get from localStorage, default to Spanish
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("dashboard-language");
      return (stored as Language) || "es";
    }
    return "es";
  });

  // Save to localStorage when language changes
  useEffect(() => {
    localStorage.setItem("dashboard-language", language);
  }, [language]);

  const t = (key: string, params?: Record<string, string | number>): string => {
    const translation = translations[language][key];

    if (!translation) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }

    if (params) {
      return Object.entries(params).reduce((acc, [paramKey, value]) => {
        return acc.replace(new RegExp(`\\{${paramKey}\\}`, "g"), String(value));
      }, translation);
    }

    return translation;
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
}