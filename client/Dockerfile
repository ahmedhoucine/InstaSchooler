FROM node:18 as build

WORKDIR /usr/src/app

COPY client/package*.json ./
RUN npm install

COPY client/school-platform ./school-platform

WORKDIR /usr/src/app/school-platform
RUN npm run build --prod

FROM node:18

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/school-platform /usr/src/app/school-platform

WORKDIR /usr/src/app/school-platform

EXPOSE 4200

CMD ["npm", "start"]
