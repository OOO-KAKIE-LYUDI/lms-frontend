# syntax=docker.io/docker/dockerfile:1

FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi


FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .


RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi












# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/config/next-config-js/output
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]








## Копируем исходный код приложения
#
#COPY . .
#
## Собираем приложение
#RUN npm run build
#
## Финальный образ
#FROM node:18-alpine AS production
#
## Устанавливаем системные зависимости
#RUN apk add --no-cache openssl
#
## Создаем непривилегированного пользователя
#RUN addgroup -g 1001 -S nodejs && \
#    adduser -S nextjs -u 1001 -G nodejs
#
#WORKDIR /app
#
## Копируем зависимости и конфигурационные файлы
#COPY --from=builder --chown=nextjs:nodejs /app/package.json /app/package-lock.json ./
#COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma/
#COPY --from=builder --chown=nextjs:nodejs /app/next.config.js ./
#COPY --from=builder --chown=nextjs:nodejs /app/next-env.d.ts ./
#COPY --from=builder --chown=nextjs:nodejs /app/postcss.config.js ./
#COPY --from=builder --chown=nextjs:nodejs /app/tailwind.config.js ./
#COPY --from=builder --chown=nextjs:nodejs /app/tsconfig.json ./
#
## Копируем собранное приложение
#COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
#COPY --from=builder --chown=nextjs:nodejs /app/public ./public
#
## Устанавливаем только production зависимости
#RUN npm ci --omit=dev
#
## Генерируем Prisma клиент
#RUN npx prisma generate
#
## Переключаемся на непривилегированного пользователя
#USER nextjs
#
## Открываем порт
#EXPOSE 3000
#
## Запускаем приложение
#CMD ["npm", "start"]