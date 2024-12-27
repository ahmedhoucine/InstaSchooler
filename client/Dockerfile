FROM node:18 as build

WORKDIR /usr/src/app/

COPY school-platform/package*.json ./school-platform/
WORKDIR /usr/src/app/school-platform

RUN npm install

RUN npm cache clean --force

RUN npm install -g @angular/cli

RUN npm list -g @angular/cli

RUN npm install --save-dev @angular-devkit/build-angular

COPY school-platform ./school-platform/

EXPOSE 4200

CMD ["npm", "start"]
