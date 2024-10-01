FROM node:22.4.0-alpine as base

FROM base as builder

WORKDIR /app
COPY ./package*.json .

RUN npm install --verbose
COPY . .

RUN npx prisma generate
RUN npm run build

FROM base as runner
WORKDIR /app

ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public


RUN mkdir .next
RUN chown nextjs:nodejs .next
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs

EXPOSE 3000
ENV PORT=3000
CMD HOSTNAME="0.0.0.0" node server.js
