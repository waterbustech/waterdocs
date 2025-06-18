FROM docker.io/oven/bun:1 AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY bun.lock package.json ./
COPY . .

RUN bun install --frozen-lockfile
RUN bun run build
   
FROM docker.io/oven/bun:1 AS runner

WORKDIR /app

# Copy only the necessary files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/bun.lock ./bun.lock
COPY --from=builder /app/node_modules ./node_modules

# Start the server
CMD ["bun", "start"]
