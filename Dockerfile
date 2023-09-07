FROM node:18 as builder

WORKDIR /app

# Turbo package
COPY package.json yarn.lock ./

COPY apps/server/package.json ./apps/server/package.json

COPY packages packages 
RUN yarn
COPY . .

# BUILD
RUN yarn build --filter=server --filter=@fistbump/fistbump-types

# apps/server/dist
# node_modules
# packages/fistbump-types/dist -> node_modules/@fistbump/fistbump-types

EXPOSE 4000

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/apps/server/dist /app
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/packages/fistbump-types/dist /app/node_modules/@fistbump/fistbump-types

CMD ["node", "index.js"]