FROM node:22.4.0-alpine as build

WORKDIR /app
COPY ./package*.json .

RUN npm install --verbose
COPY . .

RUN npm run build

FROM nginx:1.21.3-alpine

COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
