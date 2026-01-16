-- Migration for posts table
CREATE TABLE IF NOT EXISTS posts (
  id SERIAL PRIMARY KEY,
  platform VARCHAR(10) NOT NULL,
  post_id VARCHAR(255) UNIQUE NOT NULL,
  url TEXT NOT NULL,
  content TEXT,
  author VARCHAR(255),
  published_at TIMESTAMP,
  scraped_at TIMESTAMP DEFAULT NOW(),
  metrics JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_posts_url ON posts(url);
CREATE INDEX IF NOT EXISTS idx_posts_platform ON posts(platform);

-- Migration for analysis table
CREATE TABLE IF NOT EXISTS analysis (
  id SERIAL PRIMARY KEY,
  post_id INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  ai_analysis JSONB NOT NULL,
  analyzed_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_analysis_expires ON analysis(expires_at);
CREATE INDEX IF NOT EXISTS idx_analysis_post_id ON analysis(post_id);
