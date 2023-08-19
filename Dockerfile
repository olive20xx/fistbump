FROM node:18

WORKDIR /app

COPY package.json yarn.lock ./

COPY apps/client/package.json ./apps/client/package.json
COPY packages ./packages

RUN yarn

COPY . .

EXPOSE 3000

CMD ["yarn", "dev"]
