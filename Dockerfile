FROM node:16.16.0 as build
ARG APP_DIR=/home/workspace/bakery-client/
ARG SRC_DIR=dist/bakery-client/

WORKDIR ${APP_DIR}

RUN rm -rf node_modules

COPY . ${APP_DIR}

RUN npm install npm@latest -g
RUN npm link @angular/cli
RUN ng build --configuration production --aot --base-href / --delete-output-path true

FROM nginx:latest
# Copy the build output to replace the default nginx contents.
COPY --from=build ${APP_DIR}${SRC_DIR} /usr/share/nginx/html

# Expose port 80
EXPOSE 80
