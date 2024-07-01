FROM node:lts-slim

ENV PNPM_HOME="/app"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

COPY . /app

RUN pnpm install --prod --frozen-lockfile

RUN pnpm run build

EXPOSE 3000

CMD [ "pnpm", "start" ]