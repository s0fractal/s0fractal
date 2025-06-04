FROM denoland/deno:alpine-1.42.4
WORKDIR /app
COPY . .
RUN deno cache agent/index.ts
CMD ["run", "--allow-net", "--allow-read", "agent/index.ts"]
