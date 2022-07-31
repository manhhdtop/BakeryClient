ARG APP_DIR=/home/workspace/bakery-client/

FROM nginx:latest
# Copy the build output to replace the default nginx contents.
COPY /var/lib/jenkins/workspace/bakery-client/dist/BakeryClient/ /usr/share/nginx/html

# Expose port 80
EXPOSE 80
