# Stage 1: Build
FROM node:18-alpine AS build

WORKDIR /app

RUN apk add --no-cache build-base python3

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

RUN npm prune --production

# Stage 2: Final
FROM node:18-alpine

WORKDIR /app

COPY --from=build /app/package.json /app/package-lock.json /app/
COPY --from=build /app/.next /app/.next
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/public /app/public

RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

EXPOSE 3000

CMD ["npm", "run", "start"]
