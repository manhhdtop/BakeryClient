FROM node:12.18.1
ENV NODE_ENV=production
COPY ["package.json", "package-lock.json*", "./"]
RUN npm i
RUN npm run prod
COPY . .
EXPOSE 4200
