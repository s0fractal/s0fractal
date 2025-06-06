FROM denoland/deno:alpine-2.3.3

WORKDIR /app

COPY . .

RUN deno cache main.ts

CMD ["run", "--allow-all", "main.ts"]