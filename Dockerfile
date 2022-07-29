FROM node:latest as build
ARG APP_DIR=/home/workspace/bakery-client/
ARG SRC_DIR=/dist/bakery-client/

WORKDIR ${APP_DIR}

COPY ./ ${APP_DIR}

RUN rm ${APP_DIR}package-lock.json

# Install all the dependencies
RUN npm install
RUN npm run prod

FROM nginx:latest
# Copy the build output to replace the default nginx contents.
COPY --from=build ${APP_DIR}${SRC_DIR} /usr/share/nginx/html

# Expose port 80
EXPOSE 80
