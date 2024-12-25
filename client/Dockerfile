FROM node:18 as build

WORKDIR /usr/src/app/

COPY school-platform/package*.json ./school-platform/
WORKDIR /usr/src/app/school-platform

COPY school-platform ./school-platform/

RUN npm install
RUN npm install -g @angular/cli

EXPOSE 4200

CMD ["npm", "start"]
