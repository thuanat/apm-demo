FROM node:18-alpine

WORKDIR /usr/src/app

# Copy package trước để cache layer
COPY package.json package-lock.json* ./

RUN npm install

# Copy source code
COPY . .

EXPOSE 3001

CMD ["node", "index.js"]