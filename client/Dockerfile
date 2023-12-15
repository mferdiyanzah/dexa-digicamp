# Use a Node.js base image
FROM node:18.0.0-alpine3.14
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install
COPY . .
EXPOSE 4173

CMD ["pnpm", "run", "preview"]
