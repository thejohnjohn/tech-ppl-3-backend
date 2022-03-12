FROM node:alpine
ENV HOST=0.0.0.0
ENV PORT=3000
RUN apk update
WORKDIR /app
COPY package*.json ./
COPY tsconfig.json ./
COPY src /app/src
RUN ls -a
EXPOSE 3000
RUN npm install
RUN npm run build
CMD [ "npm", "start" ]