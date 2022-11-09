FROM node:16.18.0 as build
WORKDIR /app
RUN npm install -g @angular/cli
COPY ./DS2022_30441_Filip_Denisa_1_Frontend/energy_platform .
RUN npm install
RUN npm run build

FROM nginx:1.17-alpine
COPY ./DS2022_30441_Filip_Denisa_1_Frontend/energy_platform/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/energy_platform /usr/share/nginx/html
EXPOSE 80
