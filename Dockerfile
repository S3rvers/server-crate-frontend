FROM node:alpine as build
WORKDIR /server-create-frontend
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build --omit=dev

FROM nginx:alpine
COPY --from=build /server-create-frontend/dist/server-crate-frontend/browser /usr/share/nginx/html/server-crate-frontend
