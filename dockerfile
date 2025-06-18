FROM oven/bun:1.1.3 AS builder

WORKDIR /app

COPY . .

RUN bun install

RUN bun run build

FROM oven/bun:1.1.3 AS runner

WORKDIR /app

COPY --from=builder /app /app

EXPOSE 3000

CMD ["bun", "start"]
