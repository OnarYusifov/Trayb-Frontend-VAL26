FROM node:22-alpine3.19 AS builder

WORKDIR /app

COPY . .

RUN corepack enable
RUN yarn install --immutable && \
  yarn build

FROM nginx:1.27.2-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY docker-entrypoint.d/40-trayb-config.sh /docker-entrypoint.d/40-trayb-config.sh
RUN chmod +x /docker-entrypoint.d/40-trayb-config.sh

COPY --from=builder /app/dist/trayb-frontend/browser /usr/share/nginx/html
