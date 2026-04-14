import { get, list, put } from "@vercel/blob";
import type { AttributionData } from "./tracking";

const badgerPrefix = "badger/";

export type BadgerEventType = "honeypot" | "turnstile_failed" | "rate_limited";

export type BadgerEvent = {
  id: string;
  type: BadgerEventType;
  detectedAt: string;
  email?: string;
  redirectPath: string;
  path: string;
  ip: string;
  userAgent: string;
  referer: string;
  origin: string;
  honeypotValue?: string;
  attribution: AttributionData;
  headers: Record<string, string>;
  turnstile: {
    enabled: boolean;
    tokenPresent: boolean;
  };
  rateLimit?: {
    attempts: number;
    windowMs: number;
  };
};

type BadgerSummary = {
  total: number;
  honeypot: number;
  turnstile_failed: number;
  rate_limited: number;
};

export type BadgerDashboard = {
  enabled: boolean;
  events: BadgerEvent[];
  summary: BadgerSummary;
};

const emptySummary = (): BadgerSummary => ({
  total: 0,
  honeypot: 0,
  turnstile_failed: 0,
  rate_limited: 0,
});

export const isBadgerEnabled = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN);

export async function recordBadgerEvent(event: Omit<BadgerEvent, "id" | "detectedAt">) {
  if (!isBadgerEnabled()) {
    return;
  }

  const payload: BadgerEvent = {
    ...event,
    id: crypto.randomUUID(),
    detectedAt: new Date().toISOString(),
  };
  const safeTimestamp = payload.detectedAt.replace(/[:.]/g, "-");

  await put(`${badgerPrefix}${safeTimestamp}-${payload.id}.json`, JSON.stringify(payload), {
    access: "private",
    addRandomSuffix: false,
    contentType: "application/json",
  });
}

const readBadgerBlob = async (pathname: string) => {
  const result = await get(pathname, { access: "private" });

  if (!result || result.statusCode !== 200 || !result.stream) {
    return null;
  }

  try {
    const text = await new Response(result.stream).text();
    return JSON.parse(text) as BadgerEvent;
  } catch {
    return null;
  }
};

export async function getBadgerDashboard(): Promise<BadgerDashboard> {
  if (!isBadgerEnabled()) {
    return {
      enabled: false,
      events: [],
      summary: emptySummary(),
    };
  }

  const pathnames: string[] = [];
  let cursor: string | undefined;

  do {
    const page = await list({
      cursor,
      limit: 1000,
      prefix: badgerPrefix,
    });

    pathnames.push(...page.blobs.map((blob) => blob.pathname));
    cursor = page.cursor;
  } while (cursor);

  const events = (await Promise.all(pathnames.map((pathname) => readBadgerBlob(pathname))))
    .filter((event): event is BadgerEvent => Boolean(event))
    .sort((a, b) => new Date(b.detectedAt).getTime() - new Date(a.detectedAt).getTime());

  const summary = events.reduce<BadgerSummary>(
    (acc, event) => {
      acc.total += 1;
      acc[event.type] += 1;
      return acc;
    },
    emptySummary(),
  );

  return {
    enabled: true,
    events,
    summary,
  };
}
