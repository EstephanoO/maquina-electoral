# Guía de contexto para los tests

Esta carpeta prueba el sistema de caché y el flujo de análisis de publicaciones (Next.js + servicios internos). Usa Jest con `tests/setup.ts` para cargar `.env.local` y silenciar consola. Datos simulados están en `tests/mock-data.ts` (posts multi‑plataforma y análisis AI) y `mockUrls`.

## Estructura y alcance de cada test
- `unit/cache.service.test.ts`: Smoke tests del `CacheService`; verifica que los métodos clave existan y no lancen al llamarlos con datos mínimos.
- `integration/api.analyze.test.ts`: Mockea `CacheService` y el handler `POST /api/analyze`. Cubre cache hit, falta de URL (400), análisis fresco + guardado, errores controlados y detección de plataforma (FB/IG/TT).
- `integration/cache.integration.test.ts`: Asegura que los mocks de `CacheService` estén cableados y que las llamadas de integración usen los parámetros esperados.
- `integration/database.test.ts`: Intenta importar `src/lib/db/index` y depende de `DATABASE_URL`, `GEMINI_API_KEY`, `APIFY_API_KEY`. Si no hay conexión, salta parte de las pruebas; si hay, valida acceso a esquema y operaciones básicas de caché.
- `integration/production-readiness.test.ts`: Checks ligeros de preparación: existencia de `NODE_ENV`, shape de DB mock, TTL esperados por plataforma y estructura de respuestas/errores.
- `e2e/cache.e2e.test.ts`: Smoke E2E mínimo: confirma configuración (`NODE_ENV`) y que los mocks async respondan.
- `e2e/cache.workflow.test.ts`: Flujo completo simulado: primera solicitud (miss + save), segunda (hit), expiración y renovación, validación de estructura de datos, y comprobación de beneficio de rendimiento con caché.

## Cómo modificar o extender
- Mantén los mocks consistentes: `jest.mock('../../src/services/cache.service', ...)` se usa en integración/E2E. Si cambias la firma del servicio, ajusta los mocks y las expectativas.
- Para nuevas rutas API, replica el patrón de `integration/api.analyze.test.ts`: crea un `NextRequest`, controla respuestas simuladas y valida shape/resultados.
- Si modificas TTL o lógica de expiración, actualiza las expectativas en `production-readiness.test.ts` y los workflows E2E.
- Las pruebas de base de datos aceptan desconexión: si añadimos asserts reales, protege con guardas similares a las existentes para que no fallen en entornos sin DB.
- Añade datos realistas en `mock-data.ts` para cubrir nuevos casos de plataforma o categorías AI.

## Ejecución y troubleshooting
- Comandos desde la raíz (según `tests/README.md`): `bun run test`, `bun run test:watch`, `bun run test:coverage`.
- Si ves fallos por variables de entorno, verifica `.env.local` o ajusta `tests/setup.ts`.
- Mantén los logs silenciados (se mockean en `setup.ts`) para evitar ruido en CI.
