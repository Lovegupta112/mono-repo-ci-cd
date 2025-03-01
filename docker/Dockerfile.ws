FROM oven/bun:1

WORKDIR /app

# COPY  ../apps/ws-server/package.* .
COPY ./packages ./packages
COPY ./bun.lock ./bun.lock
COPY ./turbo.json ./turbo.json 
COPY ./package.json  ./package.json

COPY ./apps/ws-server ./apps/ws-server

RUN bun install 
RUN bun run db:generate

EXPOSE 8081

CMD ["bun","run","start:ws"]