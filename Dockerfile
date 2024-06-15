# Stage 1: Build
FROM node:18-alpine AS build

WORKDIR /app

# Install build dependencies in a single RUN command to minimize layers
RUN apk add --no-cache build-base python3 && \
    npm install -g pnpm

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN pnpm run build

# Remove development dependencies
RUN pnpm prune --production

# Stage 2: Final
FROM node:18-alpine

WORKDIR /app

# Only copy the necessary files from the build stage
COPY --from=build /app/package.json /app/pnpm-lock.yaml /app/
COPY --from=build /app/.next /app/.next
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/public /app/public

EXPOSE 3000

CMD ["pnpm", "run", "start"]
