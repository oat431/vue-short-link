#!/bin/sh

echo "window.config = { VITE_API_URL: '${VUE_APP_API_URL}' };" > /usr/share/nginx/html/config.js

nginx -g "daemon off;"