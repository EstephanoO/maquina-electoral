// Setup file for Jest tests
import { config } from 'dotenv';

// Load environment variables
config({ path: '.env.local' });

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  log: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};