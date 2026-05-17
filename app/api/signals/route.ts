import { readFileSync } from 'fs';
import { join } from 'path';

// Always read fresh from disk — data is updated by the GitHub Action every 24h.
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const filePath = join(process.cwd(), 'public', 'data', 'rss-signals.json');
    const raw = readFileSync(filePath, 'utf-8');
    const data = JSON.parse(raw);

    // Optional filtering via query params: ?competitorId=kong&limit=20
    const { searchParams } = new URL(request.url);
    const competitorId = searchParams.get('competitorId');
    const limit = parseInt(searchParams.get('limit') ?? '0', 10);

    let result = Array.isArray(data) ? data : [];

    if (competitorId) {
      result = result.filter((item: { competitorId: string }) => item.competitorId === competitorId);
    }

    if (limit > 0) {
      result = result.slice(0, limit);
    }

    return Response.json({
      data: result,
      count: result.length,
      source: 'rss',
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    // Return empty data rather than a 500 — pipeline may not have run yet
    return Response.json(
      { data: [], count: 0, source: 'rss', warning: `Data file not ready: ${message}` },
      { status: 200 }
    );
  }
}
