# develop stage
FROM node:12.4.0-alpine as develop-stage2
WORKDIR /my-manager
COPY package*.json ./
RUN npm install -g @quasar/cli
COPY . .

# build stage
FROM develop-stage2 as build-stage2
#RUN npm
RUN quasar build

# production stage
FROM nginx:alpine as production-stage2
COPY --from=build-stage2 /my-manager/dist/spa /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
