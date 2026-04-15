import type { NextRequest } from "next/server";

export const SHERLOCK_COOKIE_NAME = "sherlock_access";

const normalizeIp = (value: string) => value.trim().replace(/^::ffff:/, "");

export const getSherlockAccessToken = () => process.env.SHERLOCK_ACCESS_TOKEN?.trim() || "";

export const getSherlockAllowedIps = () =>
  (process.env.SHERLOCK_ALLOWED_IPS || "")
    .split(",")
    .map((item) => normalizeIp(item))
    .filter(Boolean);

export const getSherlockClientIp = (request: NextRequest) =>
  normalizeIp(request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "");

export const isSherlockIpAllowed = (ip: string) =>
  Boolean(ip) && getSherlockAllowedIps().includes(normalizeIp(ip));
