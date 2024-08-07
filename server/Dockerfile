FROM node:22.4.0-alpine
WORKDIR /app
COPY ./package*.json .
RUN npm install --verbose
RUN npm install @nestjs/cli
COPY . .
RUN npm run build
EXPOSE 3000
CMD npx prisma generate && npm run start:prod
