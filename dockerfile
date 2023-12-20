FROM node:18.10-alpine as build
WORKDIR /app
COPY . .
RUN npm install -g @angular/cli
RUN npm install
RUN ng build --configuration=production

FROM nginx:1.17.1-alpine
COPY --from=build /app/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/poll-project /usr/share/nginx/html
