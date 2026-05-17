import { readFileSync } from 'fs';
import { join } from 'path';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const filePath = join(process.cwd(), 'public', 'data', 'last-updated.json');
    const raw = readFileSync(filePath, 'utf-8');
    const data = JSON.parse(raw);

    const timestamp: string | null = data.timestamp ?? null;
    const ageMinutes = timestamp
      ? Math.round((Date.now() - new Date(timestamp).getTime()) / 60000)
      : null;

    return Response.json({
      timestamp,
      ageMinutes,
      fresh: ageMinutes !== null && ageMinutes < 1440, // < 24h
      results: data.results ?? {},
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return Response.json(
      {
        timestamp: null,
        ageMinutes: null,
        fresh: false,
        results: {},
        warning: `Metadata not ready: ${message}`,
      },
      { status: 200 }
    );
  }
}
