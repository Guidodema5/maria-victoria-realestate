# ── Stage 1: Dependencies ────────────────────────────────
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# ── Stage 2: Builder ──────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Variables públicas hardcodeadas (son públicas, no son secretos)
ENV NEXT_PUBLIC_SUPABASE_URL=https://mobzawuctsfbugwevpky.supabase.co
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vYnphd3VjdHNmYnVnd2V2cGt5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzMDQ2NzksImV4cCI6MjA4OTg4MDY3OX0.iJ--uY5qdsAKdtyOjlfuPFOztf8_5lP2vJLh8crN0BY
ENV NEXT_PUBLIC_WHATSAPP_NUMBER=5491144709617
ENV NEXT_PUBLIC_SITE_URL=https://victoriainmobiliaria.com

RUN npm run build

# ── Stage 3: Runner ───────────────────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
