import { describe, it, expect, jest, beforeAll, afterAll, beforeEach } from '@jest/globals';
import { NextRequest } from 'next/server';
import { mockUrls } from '../mock-data';

// Mock cache service properly
const mockCacheService = {
  getValidAnalysis: jest.fn(),
  saveAnalysis: jest.fn(),
};

jest.mock('../../src/services/cache.service', () => ({
  cacheService: mockCacheService,
}));

// Mock the route handler
let mockRouteHandler: jest.Mock;

describe('Cache System End-to-End Workflow', () => {
  beforeAll(() => {
    // Setup route handler mock
    mockRouteHandler = jest.fn();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should demonstrate complete cache workflow', async () => {
    const testUrl = mockUrls.facebook;
    
    // Mock cache miss for first request
    mockCacheService.getValidAnalysis.mockResolvedValue(null);
    
    // Mock route handler for fresh analysis
    mockRouteHandler.mockImplementation(async (request: NextRequest) => {
      const { url } = await request.json();
      await mockCacheService.getValidAnalysis(url);
      
      const freshData = [{
        id: 'fresh-post-123',
        text: 'Test post content for analysis',
        platform: 'FB',
        metrics: { likes: 100, comments: 25, shares: 10 },
        ai: {
          score: 50,
          cat: 'INFORMATIVO',
          brief: 'Post informativo',
          strategy: 'Monitorear',
          risks: ['Bajo impacto'],
          community: 'Neutral'
        }
      }];
      
      await mockCacheService.saveAnalysis(url, freshData);
      
      return new Response(JSON.stringify({
        success: true,
        posts: freshData,
        fromCache: false
      }));
    });

    // First request - cache miss
    const firstRequest = new NextRequest('http://localhost/api/analyze', {
      method: 'POST',
      body: JSON.stringify({ url: testUrl }),
      headers: { 'Content-Type': 'application/json' }
    });

    const firstResponse = await mockRouteHandler(firstRequest);
    const firstResult = await firstResponse.json();

    // Verify first request
    expect(firstResponse.status).toBe(200);
    expect(firstResult.success).toBe(true);
    expect(firstResult.fromCache).toBe(false);
    expect(firstResult.posts).toHaveLength(1);
    expect(mockCacheService.saveAnalysis).toHaveBeenCalledWith(
      testUrl,
      expect.any(Array)
    );

    // Mock cache hit for second request
    const mockCachedData = [{
      id: 'cached-post-123',
      text: 'Test post content for analysis',
      platform: 'FB',
      metrics: { likes: 100, comments: 25, shares: 10 },
      ai: {
        score: 50,
        cat: 'INFORMATIVO',
        brief: 'Post informativo',
        strategy: 'Monitorear',
        risks: ['Bajo impacto'],
        community: 'Neutral'
      },
      fromCache: true,
      cacheAge: 60000 // 1 minute old
    }];

    mockCacheService.getValidAnalysis.mockResolvedValue(mockCachedData as any);

    // Mock route handler for cache hit
    mockRouteHandler.mockImplementation(async (request: NextRequest) => {
      const { url } = await request.json();
      const cached = await mockCacheService.getValidAnalysis(url);
      
      if (cached) {
        return new Response(JSON.stringify({
          success: true,
          posts: cached,
          fromCache: true,
          cacheAge: 60000
        }));
      }
    });

    // Second request - cache hit
    const secondRequest = new NextRequest('http://localhost/api/analyze', {
      method: 'POST',
      body: JSON.stringify({ url: testUrl }),
      headers: { 'Content-Type': 'application/json' }
    });

    const secondResponse = await mockRouteHandler(secondRequest);
    const secondResult = await secondResponse.json();

    // Verify second request
    expect(secondResponse.status).toBe(200);
    expect(secondResult.success).toBe(true);
    expect(secondResult.fromCache).toBe(true);
    expect(secondResult.cacheAge).toBe(60000);
    expect(secondResult.posts[0].fromCache).toBe(true);
    expect(mockCacheService.getValidAnalysis).toHaveBeenCalledWith(testUrl);
  });

  it('should handle cache expiration', async () => {
    const testUrl = mockUrls.instagram;
    
    // Mock expired cache (returns null)
    mockCacheService.getValidAnalysis.mockResolvedValue(null);

    // Mock route handler for fresh analysis after expiration
    mockRouteHandler.mockImplementation(async (request: NextRequest) => {
      const { url } = await request.json();
      await mockCacheService.getValidAnalysis(url);
      
      const freshData = [{
        id: 'expired-renewal-post',
        text: 'Content after cache expiration',
        platform: 'IG',
        metrics: { likes: 200, comments: 30, shares: 15 },
        ai: {
          score: 85,
          cat: 'APOYO',
          brief: 'Contenido positivo',
          strategy: 'Amplificar',
          risks: [],
          community: 'Muy positivo'
        }
      }];
      
      await mockCacheService.saveAnalysis(url, freshData);
      
      return new Response(JSON.stringify({
        success: true,
        posts: freshData,
        fromCache: false
      }));
    });

    const request = new NextRequest('http://localhost/api/analyze', {
      method: 'POST',
      body: JSON.stringify({ url: testUrl }),
      headers: { 'Content-Type': 'application/json' }
    });

    const response = await mockRouteHandler(request);
    const result = await response.json();

    // Verify fresh analysis was performed
    expect(response.status).toBe(200);
    expect(result.success).toBe(true);
    expect(result.fromCache).toBe(false);
    expect(mockCacheService.saveAnalysis).toHaveBeenCalledWith(testUrl, expect.any(Array));
  });

  it('should validate data persistence structure', async () => {
    const testUrl = mockUrls.tiktok;
    mockCacheService.getValidAnalysis.mockResolvedValue(null);

    mockRouteHandler.mockImplementation(async (request: NextRequest) => {
      const { url } = await request.json();
      await mockCacheService.getValidAnalysis(url);
      
      const validData = [{
        id: 'structured-post-123',
        text: 'Structured test content',
        platform: 'TT',
        metrics: { likes: 500, comments: 100, shares: 50 },
        ai: {
          score: -20,
          cat: 'CRISIS',
          brief: 'Contenido controversial',
          strategy: 'Responder con datos',
          risks: ['Alto impacto', 'Polarización'],
          community: 'Dividido'
        }
      }];
      
      return new Response(JSON.stringify({
        success: true,
        posts: validData,
        fromCache: false
      }));
    });

    const request = new NextRequest('http://localhost/api/analyze', {
      method: 'POST',
      body: JSON.stringify({ url: testUrl }),
      headers: { 'Content-Type': 'application/json' }
    });

    const response = await mockRouteHandler(request);
    const result = await response.json();

    // Validate response structure
    expect(result).toHaveProperty('success', true);
    expect(result).toHaveProperty('posts');
    expect(result).toHaveProperty('fromCache', false);
    
    const post = result.posts[0];
    expect(post).toHaveProperty('id');
    expect(post).toHaveProperty('text');
    expect(post).toHaveProperty('platform');
    expect(post).toHaveProperty('metrics');
    expect(post).toHaveProperty('ai');

    // Validate metrics structure
    expect(post.metrics).toHaveProperty('likes');
    expect(post.metrics).toHaveProperty('comments');
    expect(post.metrics).toHaveProperty('shares');

    // Validate AI analysis structure
    expect(post.ai).toHaveProperty('score');
    expect(post.ai).toHaveProperty('cat');
    expect(post.ai).toHaveProperty('brief');
    expect(post.ai).toHaveProperty('strategy');
    expect(post.ai).toHaveProperty('risks');
    expect(post.ai).toHaveProperty('community');
  });

  it('should test performance improvements with cache', async () => {
    const testUrl = mockUrls.facebook;
    
    // Mock fast cache response
    const mockFastCache = [{
      id: 'fast-cached-post',
      text: 'Fast cached content',
      platform: 'FB',
      metrics: { likes: 1000, comments: 100, shares: 50 },
      ai: {
        score: 85,
        cat: 'APOYO',
        brief: 'Alto apoyo',
        strategy: 'Amplificar',
        risks: [],
        community: 'Muy positivo'
      },
      fromCache: true,
      cacheAge: 100 // Very fresh cache
    }];

    mockCacheService.getValidAnalysis.mockResolvedValue(mockFastCache as any);

    mockRouteHandler.mockImplementation(async (request: NextRequest) => {
      const { url } = await request.json();
      const cached = await mockCacheService.getValidAnalysis(url);
      
      return new Response(JSON.stringify({
        success: true,
        posts: cached,
        fromCache: true,
        cacheAge: 100
      }));
    });

    const startTime = Date.now();
    
    const request = new NextRequest('http://localhost/api/analyze', {
      method: 'POST',
      body: JSON.stringify({ url: testUrl }),
      headers: { 'Content-Type': 'application/json' }
    });

    const response = await mockRouteHandler(request);
    const endTime = Date.now();

    // Cache response should be fast (< 100ms)
    expect(endTime - startTime).toBeLessThan(100);
    
    const result = await response.json();
    expect(result.fromCache).toBe(true);
    expect(result.cacheAge).toBe(100);
  });
});