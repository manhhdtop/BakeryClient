FROM nginx:latest

ARG APP_DIR=/var/lib/jenkins/workspace/bakery-client

WORKDIR ${APP_DIR}

# Copy the build output to replace the default nginx contents.

RUN rm -rf /usr/share/nginx/html

COPY dist/BakeryClient/ /usr/share/nginx/html

# Expose port 80
EXPOSE 80
