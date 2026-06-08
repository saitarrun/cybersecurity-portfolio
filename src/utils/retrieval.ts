export interface KnowledgeChunk {
  id: string;
  topic: string;
  title: string;
  text: string;
}

export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length > 2);
}

export function scoreChunk(chunk: KnowledgeChunk, queryTokens: string[]): number {
  const chunkTokens = tokenize(chunk.title + ' ' + chunk.text);
  const chunkSet = new Set(chunkTokens);
  let score = 0;
  for (const token of queryTokens) {
    if (chunkSet.has(token)) {
      if (tokenize(chunk.title).includes(token)) score += 2;
      else score += 1;
    }
  }
  return score / Math.max(queryTokens.length, 1);
}

export function retrieveChunks(
  query: string,
  chunks: KnowledgeChunk[],
  topK = 4
): KnowledgeChunk[] {
  const queryTokens = tokenize(query);
  if (queryTokens.length === 0) return chunks.slice(0, topK);

  return chunks
    .map((chunk) => ({ chunk, score: scoreChunk(chunk, queryTokens) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .map(({ chunk }) => chunk);
}
