# Contexto general del proyecto

## Propósito y dominio
- Dashboard tipo “war room” para la campaña de Guillermo Aliaga (Senado 2026, Somos Perú) con métricas narrativas, competidores, territorio y social.
- UI principal en `/dashboard` orquestada por `TranslationProvider` y selector de escenas (`narrative`, `competitors`, `geohub`, `social`, etc.).

## Stack clave
- Next.js 16 (App Router) + React 19, estilado con Tailwind 4.
- Mapas con MapLibre (`@vis.gl/react-maplibre`, `maplibre-gl`), iconografía `lucide-react`.
- Base de datos Postgres via Neon HTTP driver (`@neondatabase/serverless`) y Drizzle ORM.
- Tests con Jest (unidad, integración y E2E ligeros) ejecutados con Bun.

## Arquitectura y módulos
- **Escenas del dashboard** (`src/app/dashboard/scenes`):
  - GeoHub (capas, métricas geográficas en vivo), Social, Narrative, Competitors, Pulse/Territory.
  - Componentes reutilizables en `src/app/dashboard/ui` y ganchos en `src/app/dashboard/hooks.ts`.
- **Traducciones**: todo texto visible debe usar `useTranslation` desde `src/app/dashboard/contexts/TranslationContext.tsx`. Guía detallada en `agents/translation-integration-guide.md`.
- **API**: handler `POST /api/analyze` (ver `src/app/api/api-routes-context.md`) consume Apify y Gemini para analizar URLs de redes sociales y persiste en caché.
- **Cache y persistencia**: `src/services/cache.service.ts` gestiona TTL por plataforma (FB/IG/TT/Twitter), inserta/actualiza posts y guarda análisis con expiración. Esquema Drizzle en `src/lib/db/schema.ts` (`posts`, `analysis`).

## Variables de entorno mínimas
- `DATABASE_URL` (Neon/Postgres, requerida para levantar el servidor).
- `APIFY_API_KEY`, `GEMINI_API_KEY` para el flujo de análisis.

## Comandos frecuentes
- Desarrollo: `bun dev`
- Linter: `bun run lint`
- Tests: `bun run test` | `bun run test:watch` | `bun run test:coverage`
- Base de datos: `bun run db:generate` | `bun run db:migrate` | `bun run db:push`

## Documentos de contexto
- API: `src/app/api/api-routes-context.md`
- Tests: `tests/TESTS_CONTEXT.md`
- Traducción UI: `agents/translation-integration-guide.md`
- Este documento cubre visión global; usa los archivos anteriores para detalles específicos.
