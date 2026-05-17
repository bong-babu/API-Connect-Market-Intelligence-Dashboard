import { readFileSync } from 'fs';
import { join } from 'path';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const filePath = join(process.cwd(), 'public', 'data', 'github-signals.json');
    const raw = readFileSync(filePath, 'utf-8');
    const data = JSON.parse(raw);

    const { searchParams } = new URL(request.url);
    const competitorId = searchParams.get('competitorId');

    let result = Array.isArray(data) ? data : [];

    if (competitorId) {
      result = result.filter((item: { competitorId: string }) => item.competitorId === competitorId);
    }

    // Sort by stars descending
    result.sort((a: { stars: number }, b: { stars: number }) => b.stars - a.stars);

    return Response.json({
      data: result,
      count: result.length,
      source: 'github',
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return Response.json(
      { data: [], count: 0, source: 'github', warning: `Data file not ready: ${message}` },
      { status: 200 }
    );
  }
}
