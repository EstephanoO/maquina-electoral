# Cache System Tests

This directory contains comprehensive tests for the MCP cache system.

## Test Structure

- **Unit Tests** (`tests/unit/`): Test individual components in isolation
- **Integration Tests** (`tests/integration/`): Test component interactions
- **E2E Tests** (`tests/e2e/`): Test complete workflows

## Running Tests

```bash
# Run all tests
bun run test

# Run tests in watch mode
bun run test:watch

# Run with coverage report
bun run test:coverage
```

## Test Coverage Areas

✅ **CacheService Unit Tests**
- TTL calculation per platform
- Cache retrieval (hit/miss scenarios)
- Data persistence (save/update)
- Cache invalidation
- Error handling

✅ **API Integration Tests**  
- Cache hit responses
- Fresh analysis workflow
- Error handling
- Platform-specific logic

✅ **End-to-End Workflow Tests**
- Complete cache cycle
- Performance validation
- Data structure validation
- Cache expiration

## Mock Data

Tests use realistic mock data for:
- Social media posts (Facebook, Instagram, TikTok)
- AI analysis results
- API responses (Apify, Gemini)
- Database operations

## Key Test Scenarios

1. **Cache Hit**: Returns cached data quickly
2. **Cache Miss**: Performs fresh analysis and saves
3. **Cache Expiration**: Handles TTL properly
4. **Error Scenarios**: Graceful degradation
5. **Performance**: Validates speed improvements

All tests ensure the cache system:
- Reduces API costs
- Improves response times
- Maintains data integrity
- Handles edge cases properly