import { test, expect } from '@playwright/test';
import {
  tokenize,
  scoreChunk,
  retrieveChunks,
  type KnowledgeChunk,
} from '../../src/utils/retrieval';
import knowledgeBase from '../../src/data/knowledge-base.json';

const chunks = knowledgeBase as KnowledgeChunk[];

// ─── tokenize() ──────────────────────────────────────────────────────────────

test.describe('retrieval – tokenize()', () => {
  test('lowercases all tokens', () => {
    const tokens = tokenize('Python TypeScript AWS');
    expect(tokens).toContain('python');
    expect(tokens).toContain('typescript');
    expect(tokens).toContain('aws');
  });

  test('strips punctuation and special characters', () => {
    const tokens = tokenize('99.99% uptime! (production-ready)');
    expect(tokens.every((t) => /^[a-z0-9]+$/.test(t))).toBe(true);
  });

  test('filters out tokens shorter than 3 characters', () => {
    const tokens = tokenize('I am an AI engineer');
    tokens.forEach((t) => expect(t.length).toBeGreaterThan(2));
  });

  test('returns empty array for empty input', () => {
    expect(tokenize('')).toEqual([]);
  });

  test('handles whitespace-only input', () => {
    expect(tokenize('   ')).toEqual([]);
  });
});

// ─── scoreChunk() ─────────────────────────────────────────────────────────────

test.describe('retrieval – scoreChunk()', () => {
  const sampleChunk: KnowledgeChunk = {
    id: 'test-chunk',
    topic: 'experience',
    title: 'Pacific Life Software Engineer',
    text: 'Automated claims triage using AWS Lambda and TensorFlow with LangChain orchestration.',
  };

  test('returns score > 0 when query token matches text', () => {
    const score = scoreChunk(sampleChunk, tokenize('tensorflow'));
    expect(score).toBeGreaterThan(0);
  });

  test('title match scores higher than body-only match', () => {
    const titleScore = scoreChunk(sampleChunk, tokenize('pacific'));
    const bodyScore = scoreChunk(sampleChunk, tokenize('tensorflow'));
    expect(titleScore).toBeGreaterThan(bodyScore);
  });

  test('returns 0 for completely unrelated query', () => {
    const score = scoreChunk(sampleChunk, tokenize('basketball football cooking'));
    expect(score).toBe(0);
  });

  test('normalises by query length', () => {
    const oneToken = scoreChunk(sampleChunk, tokenize('pacific'));
    const twoTokens = scoreChunk(sampleChunk, tokenize('pacific life'));
    // Both match; two-token query with both matching should have similar normalised score
    expect(oneToken).toBeGreaterThan(0);
    expect(twoTokens).toBeGreaterThan(0);
  });
});

// ─── retrieveChunks() ─────────────────────────────────────────────────────────

test.describe('retrieval – retrieveChunks() against knowledge base', () => {
  test('Pacific Life query retrieves the Pacific Life experience chunk', () => {
    const results = retrieveChunks('Pacific Life experience', chunks);
    const ids = results.map((c) => c.id);
    expect(ids).toContain('experience-pacific-life');
  });

  test('Accenture query retrieves the Accenture experience chunk', () => {
    const results = retrieveChunks('Accenture software engineer', chunks);
    const ids = results.map((c) => c.id);
    expect(ids).toContain('experience-accenture');
  });

  test('Cognizant query retrieves the Cognizant experience chunk', () => {
    const results = retrieveChunks('Cognizant job', chunks);
    const ids = results.map((c) => c.id);
    expect(ids).toContain('experience-cognizant');
  });

  test('Python query retrieves the programming languages skills chunk', () => {
    const results = retrieveChunks('Python programming languages', chunks);
    const ids = results.map((c) => c.id);
    expect(ids).toContain('skills-languages');
  });

  test('TensorFlow ML query retrieves the ML/AI skills chunk', () => {
    const results = retrieveChunks('TensorFlow machine learning', chunks);
    const ids = results.map((c) => c.id);
    expect(ids).toContain('skills-ml-ai');
  });

  test('AWS Docker cloud query retrieves the cloud infrastructure chunk', () => {
    const results = retrieveChunks('AWS Docker cloud infrastructure', chunks);
    const ids = results.map((c) => c.id);
    expect(ids).toContain('skills-cloud');
  });

  test('contact email query retrieves the contact info chunk', () => {
    const results = retrieveChunks('contact email linkedin', chunks);
    const ids = results.map((c) => c.id);
    expect(ids).toContain('contact-info');
  });

  test('education CSUF query retrieves the education chunk', () => {
    const results = retrieveChunks('California State University Fullerton', chunks);
    const ids = results.map((c) => c.id);
    expect(ids).toContain('education-csuf');
  });

  test('LLM project query retrieves the LLM knowledge retrieval project chunk', () => {
    const results = retrieveChunks('LLM knowledge retrieval platform', chunks);
    const ids = results.map((c) => c.id);
    expect(ids).toContain('project-llm-knowledge-retrieval');
  });

  test('brain tumor query retrieves the brain tumor project chunk', () => {
    const results = retrieveChunks('brain tumor detection', chunks);
    const ids = results.map((c) => c.id);
    expect(ids).toContain('project-brain-tumor');
  });

  test('availability/job query retrieves the availability chunk', () => {
    const results = retrieveChunks('available for work job opportunities', chunks);
    const ids = results.map((c) => c.id);
    expect(ids).toContain('availability');
  });

  test('returns at most topK results', () => {
    const results = retrieveChunks('software engineer', chunks, 3);
    expect(results.length).toBeLessThanOrEqual(3);
  });

  test('returns top 4 by default', () => {
    const results = retrieveChunks('experience company', chunks);
    expect(results.length).toBeLessThanOrEqual(4);
  });

  test('empty query returns first N chunks without error', () => {
    const results = retrieveChunks('', chunks, 3);
    expect(results.length).toBe(3);
  });

  test('completely unrelated query returns empty array', () => {
    const results = retrieveChunks('basketball football cooking recipe', chunks);
    expect(results.length).toBe(0);
  });

  test('all returned chunks come from the knowledge base', () => {
    const ids = chunks.map((c) => c.id);
    const results = retrieveChunks('software engineer AWS Python', chunks);
    results.forEach((r) => expect(ids).toContain(r.id));
  });

  test('result chunks have required fields', () => {
    const results = retrieveChunks('experience', chunks);
    results.forEach((r) => {
      expect(r).toHaveProperty('id');
      expect(r).toHaveProperty('topic');
      expect(r).toHaveProperty('title');
      expect(r).toHaveProperty('text');
    });
  });
});

// ─── knowledge-base.json schema validation ────────────────────────────────────

test.describe('knowledge-base.json – schema', () => {
  test('contains at least 20 chunks', () => {
    expect(chunks.length).toBeGreaterThanOrEqual(20);
  });

  test('every chunk has a unique id', () => {
    const ids = chunks.map((c) => c.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });

  test('all topic values are valid enum members', () => {
    const validTopics = new Set([
      'profile',
      'experience',
      'education',
      'projects',
      'skills',
      'contact',
    ]);
    chunks.forEach((c) => {
      expect(validTopics.has(c.topic)).toBe(true);
    });
  });

  test('all chunks have non-empty text', () => {
    chunks.forEach((c) => {
      expect(c.text.trim().length).toBeGreaterThan(0);
    });
  });

  test('experience chunks cover all three companies', () => {
    const expIds = chunks.filter((c) => c.topic === 'experience').map((c) => c.id);
    expect(expIds).toContain('experience-pacific-life');
    expect(expIds).toContain('experience-accenture');
    expect(expIds).toContain('experience-cognizant');
  });

  test('project chunks cover all four projects', () => {
    const projIds = chunks.filter((c) => c.topic === 'projects').map((c) => c.id);
    expect(projIds).toContain('project-llm-knowledge-retrieval');
    expect(projIds).toContain('project-portfolio');
    expect(projIds).toContain('project-ecommerce');
    expect(projIds).toContain('project-brain-tumor');
  });

  test('skills chunks cover all 9 categories', () => {
    const skillIds = chunks.filter((c) => c.topic === 'skills').map((c) => c.id);
    expect(skillIds.length).toBe(9);
  });
});
