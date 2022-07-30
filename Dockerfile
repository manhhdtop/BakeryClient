FROM node as build
ARG APP_DIR=/home/workspace/bakery-client/
ARG SRC_DIR=dist/bakery-client/

WORKDIR ${APP_DIR}

RUN rm -rf node_modules

COPY . ${APP_DIR}

RUN npm install -g npm@6.11.0
RUN npm install -g @angular/cli@latest
RUN npm install
RUN npm link @angular/cli
RUN ng build --configuration production --aot --base-href /bakery-client --delete-output-path true

FROM nginx:latest
# Copy the build output to replace the default nginx contents.
COPY --from=build ${APP_DIR}${SRC_DIR} /usr/share/nginx/html

# Expose port 80
EXPOSE 80
