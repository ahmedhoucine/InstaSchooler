FROM node:18 as build

WORKDIR /usr/src/app/

COPY school-platform/package*.json ./school-platform/
WORKDIR /usr/src/app/school-platform
RUN npm install

COPY school-platform ./school-platform/

RUN npm run build --prod

EXPOSE 4200

CMD ["npm", "start"]
