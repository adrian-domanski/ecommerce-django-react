FROM node:20-alpine AS build

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# final image
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html