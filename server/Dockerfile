FROM node:22.4.0-alpine
WORKDIR /app
COPY ./package*.json .
RUN npm install --verbose
RUN npm install @nestjs/cli
COPY . .
EXPOSE 3000
CMD npx prisma generate && npx nest start
