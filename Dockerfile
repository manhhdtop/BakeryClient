FROM node
COPY ["package.json", "package-lock.json*", "./"]
RUN npm i
RUN npm run prod
COPY . .
EXPOSE 4200
