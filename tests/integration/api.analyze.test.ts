import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { NextRequest } from 'next/server';
import { mockUrls, mockScrapedData } from '../mock-data';

// Mock cache service properly
const mockCacheService = {
  getValidAnalysis: jest.fn(),
  saveAnalysis: jest.fn(),
};

// Mock the entire route module
const mockRoute = jest.fn();
jest.mock('../../src/services/cache.service', () => ({
  CacheService: mockCacheService,
}));

import { POST } from '../../src/app/api/analyze/route';

describe('/api/analyze Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return cached analysis when available', async () => {
    const mockCachedData = mockScrapedData.map(post => ({
      ...post,
      fromCache: true,
      cacheAge: 30000
    }));

    mockCacheService.getValidAnalysis.mockResolvedValue(mockCachedData as any);
    mockRoute.mockImplementation(async (request: NextRequest) => {
      const { url } = await request.json();
      const cached = await mockCacheService.getValidAnalysis(url);
      
      if (cached) {
        return new Response(JSON.stringify({
          success: true,
          posts: cached,
          fromCache: true,
          cacheAge: 30000
        }));
      }
    });

    const request = new NextRequest('http://localhost/api/analyze', {
      method: 'POST',
      body: JSON.stringify({ url: mockUrls.facebook }),
      headers: { 'Content-Type': 'application/json' }
    });

    const response = await POST(request);
    const result = await response.json();

    expect(response.status).toBe(200);
    expect(result.success).toBe(true);
    expect(result.fromCache).toBe(true);
    expect(result.cacheAge).toBe(30000);
    expect(mockCacheService.getValidAnalysis).toHaveBeenCalledWith(mockUrls.facebook);
  });

  it('should handle missing URL', async () => {
    mockRoute.mockImplementation(async (request: NextRequest) => {
      const { url } = await request.json();
      
      if (!url) {
        return new Response(JSON.stringify({
          error: "URL is required"
        }), { status: 400 });
      }
    });

    const request = new NextRequest('http://localhost/api/analyze', {
      method: 'POST',
      body: JSON.stringify({}),
      headers: { 'Content-Type': 'application/json' }
    });

    const response = await POST(request);
    const result = await response.json();

    expect(response.status).toBe(400);
    expect(result.error).toBe('URL is required');
  });

  it('should perform fresh analysis when no cache exists', async () => {
    mockCacheService.getValidAnalysis.mockResolvedValue(null);
    
    mockRoute.mockImplementation(async (request: NextRequest) => {
      const { url } = await request.json();
      const cached = await mockCacheService.getValidAnalysis(url);
      
      if (!cached) {
        // Simulate fresh analysis
        const freshData = [{
          id: 'fresh-post-123',
          text: 'Fresh analysis content',
          platform: 'FB',
          metrics: { likes: 150, comments: 25, shares: 10 },
          ai: {
            score: 75,
            cat: 'APOYO',
            brief: 'Contenido positivo',
            strategy: 'Amplificar mensaje',
            risks: ['Bajo impacto'],
            community: 'Comunidad activa'
          }
        }];
        
        await mockCacheService.saveAnalysis(url, freshData as any);
        
        return new Response(JSON.stringify({
          success: true,
          posts: freshData,
          fromCache: false
        }));
      }
    });

    const request = new NextRequest('http://localhost/api/analyze', {
      method: 'POST',
      body: JSON.stringify({ url: mockUrls.facebook }),
      headers: { 'Content-Type': 'application/json' }
    });

    const response = await POST(request);
    const result = await response.json();

    expect(response.status).toBe(200);
    expect(result.success).toBe(true);
    expect(result.fromCache).toBe(false);
    expect(result.posts).toHaveLength(1);
    expect(mockCacheService.saveAnalysis).toHaveBeenCalled();
  });

  it('should handle analysis errors gracefully', async () => {
    mockCacheService.getValidAnalysis.mockResolvedValue(null);
    
    mockRoute.mockImplementation(async (request: NextRequest) => {
      try {
        const { url } = await request.json();
        await mockCacheService.getValidAnalysis(url);
        throw new Error('Analysis failed');
      } catch (error) {
        return new Response(JSON.stringify({
          error: "Analysis failed",
          details: error instanceof Error ? error.message : "Unknown error"
        }), { status: 500 });
      }
    });

    const request = new NextRequest('http://localhost/api/analyze', {
      method: 'POST',
      body: JSON.stringify({ url: mockUrls.facebook }),
      headers: { 'Content-Type': 'application/json' }
    });

    const response = await POST(request);
    const result = await response.json();

    expect(response.status).toBe(500);
    expect(result.error).toBe('Analysis failed');
  });

  it('should work with different platforms', async () => {
    mockCacheService.getValidAnalysis.mockResolvedValue(null);
    
    mockRoute.mockImplementation(async (request: NextRequest) => {
      const { url } = await request.json();
      await mockCacheService.getValidAnalysis(url);
      
      // Simulate platform detection
      let platform = 'SYS';
      if (url.includes('instagram.com')) platform = 'IG';
      if (url.includes('facebook.com')) platform = 'FB';
      if (url.includes('tiktok.com')) platform = 'TT';
      
      const freshData = [{
        id: 'platform-post-123',
        text: 'Platform specific content',
        platform: platform,
        metrics: { likes: 100, comments: 15, shares: 5 },
        ai: {
          score: 50,
          cat: 'INFORMATIVO',
          brief: 'Contenido informativo',
          strategy: 'Monitorear',
          risks: [],
          community: 'Neutral'
        }
      }];
      
      return new Response(JSON.stringify({
        success: true,
        posts: freshData,
        fromCache: false
      }));
    });

    const request = new NextRequest('http://localhost/api/analyze', {
      method: 'POST',
      body: JSON.stringify({ url: mockUrls.instagram }),
      headers: { 'Content-Type': 'application/json' }
    });

    const response = await POST(request);
    const result = await response.json();

    expect(response.status).toBe(200);
    expect(result.success).toBe(true);
    expect(result.posts[0].platform).toBe('IG');
  });
});