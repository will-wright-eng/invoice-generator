FROM nginx:alpine
COPY src /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/nginx.conf
# Ensure the config file is copied
COPY src/config.json /usr/share/nginx/html/config.json

