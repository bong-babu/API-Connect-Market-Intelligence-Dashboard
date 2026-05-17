import { readFileSync } from 'fs';
import { join } from 'path';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const filePath = join(process.cwd(), 'public', 'data', 'review-signals.json');
    const raw = readFileSync(filePath, 'utf-8');
    const data = JSON.parse(raw);

    const { searchParams } = new URL(request.url);
    const competitorId = searchParams.get('competitorId');
    const withDataOnly = searchParams.get('withDataOnly') === 'true';

    let result = Array.isArray(data) ? data : [];

    if (competitorId) {
      result = result.filter((item: { competitorId: string }) => item.competitorId === competitorId);
    }

    if (withDataOnly) {
      result = result.filter((item: { rating: number | null }) => item.rating !== null);
    }

    return Response.json({
      data: result,
      count: result.length,
      source: 'g2',
      note: 'Aggregate ratings only — G2 full reviews require authenticated headless scraping.',
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return Response.json(
      { data: [], count: 0, source: 'g2', warning: `Data file not ready: ${message}` },
      { status: 200 }
    );
  }
}
