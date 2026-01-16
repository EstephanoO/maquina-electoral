# Contexto de rutas en `src/app/api`

## POST `/api/analyze`
- **Objetivo**: analizar el contenido de una URL de red social (FB/IG/TT u otro) y devolver un resumen con métricas y evaluación IA.
- **Cuerpo esperado**: JSON `{ "url": "https://..." }`. Sin `url` responde `400`.
- **Flujo principal**:
  1) Busca en cache previa (`CacheService.getValidAnalysis(url)`). Si existe devuelve `posts`, marca `fromCache: true`, incluye `cacheAge`.
  2) Si no hay cache, detecta plataforma para elegir actor Apify: `facebook-posts-scraper` (FB por defecto), `instagram-post-scraper` (IG), `tiktok-scraper` (TT).
  3) Llama a Apify vía `fetch` (run-sync-get-dataset-items) con token `APIFY_API_KEY`, `resultsLimit: 3`.
  4) Para cada item resultante arma texto (`text` o `caption`), métricas (`likes`, `comments`, `shares`) y evalúa con Gemini (`gemini-2.5-flash-lite`) mediante `GoogleGenerativeAI` (clave `GEMINI_API_KEY`). Prompt genera JSON con `score`, `cat`, `brief`, `strategy`, `risks`, `community`.
  5) Persiste en cache (`CacheService.saveAnalysis`) con `aiAnalysis`, contenido y metadatos mínimos.
  6) Responde `200` con `{ success: true, posts: [...], fromCache }`.
- **Respuesta por defecto de IA ante error**: `score: 0`, `cat: "INFORMATIVO"`, `brief: "Error IA"`, `strategy: "Manual"`, `risks: ["TIMEOUT"], community: "No analizado"`.
- **Errores**: captura excepciones y responde `500` con mensaje `Analysis failed` y detalle del error.

## Dependencias y consideraciones
- **Servicios externos**: Apify (scraping) y Google Gemini (análisis). Cualquier cambio que altere payloads o límites debe considerar sus APIs.
- **Variables de entorno necesarias**: `GEMINI_API_KEY`, `APIFY_API_KEY`. Sin ellas la ruta fallará en runtime.
- **Cache**: centralizado en `CacheService` (`src/app/services/cache.service`), que define vigencia y almacenamiento; revisar su implementación antes de modificar estructuras guardadas.
- **Sensibilidad de datos**: el prompt está en español y espera JSON estricto; si cambias el formato actualiza también el consumo en frontend.
- **Límites**: solo procesa hasta 3 resultados por llamada; aumenta `resultsLimit` con cuidado por costo/latencia.
- **Plataformas nuevas**: para soportar otra red añade rama en `getPlatformConfig` con `actor` y `label` y verifica que el actor Apify devuelva campos similares (`text/caption`, `likes/comments/shares`, `latestComments`).
