FROM node
RUN npm i
RUN npm run prod
COPY dist/bakery-client/ /home/workspace/bakery-client/
EXPOSE 4200
