FROM node:22-alpine

WORKDIR /app
COPY . .

RUN npm install -g pnpm

EXPOSE 3000
CMD [ "npm", "run", "dev" ]
