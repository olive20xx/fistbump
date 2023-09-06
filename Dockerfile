FROM node:18

WORKDIR /app

# Turbo package
COPY package.json yarn.lock ./

COPY apps/server/package.json ./apps/server/package.json

RUN yarn

COPY . .

# BUILD
RUN yarn build

EXPOSE 3000

CMD [""]