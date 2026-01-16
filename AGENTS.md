# Guía de orquestación para agentes

Esta guía aplica a todo el repositorio. Úsala para saber qué contexto leer según la tarea.

## Ruta rápida de contexto
- Primero lee `PROJECT_CONTEXT.md` para la vista general (stack, dominios, variables y comandos).
- Para pruebas usa `@tests/TESTS_CONTEXT.md` (estructura, mocks y comandos de Jest/Bun).
- Para la API `POST /api/analyze` consulta `@src/app/api/api-routes-context.md` (payloads, dependencias y manejo de cache).
- Para UI del dashboard y textos sigue `agents/translation-integration-guide.md` (uso obligatorio de `useTranslation`).

## Reglas operativas
- Ajusta código y documentación en conjunto: si cambias flujos de API, caché o tests, actualiza el contexto correspondiente.
- Respeta el sistema de caché y TTL definidos en `src/services/cache.service.ts` y el esquema Drizzle en `src/lib/db/schema.ts`.
- Ejecuta scripts con Bun (`bun dev`, `bun run test`, `bun run lint`, `bun run db:*`).

## Notas rápidas
- El dashboard principal vive en `src/app/dashboard` con escenas modulares (narrative, competitors, geohub, social, etc.).
- Usa las guías de contexto antes de modificar o crear archivos en esos dominios para mantener consistencia.
