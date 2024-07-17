# Base image
FROM node:16-alpine3.17 as builder
# Define build arguments for environment variables
ARG VITE_BASE_URL
ARG VITE_BASE_URL2
ARG VITE_API_URL
ARG VITE_SAML_ENTRY_POINT
# Set environment variables during build time
ENV VITE_BASE_URL=$VITE_BASE_URL
ENV VITE_BASE_URL2=$VITE_BASE_URL2
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_SAML_ENTRY_POINT=$VITE_SAML_ENTRY_POINT
# Set the working directory
WORKDIR /app
# Copy package.json and package-lock.json
COPY package*.json ./
# Install app dependencies
RUN npm install
# Copy app source code
COPY . .

RUN npm run build 

FROM node:16-alpine3.17 as production

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev || npm ci --only=production --ignore-scripts
# RUN npm install -g serve
RUN npm install express

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server.js ./server.js
# Expose a port if your app requires it #
EXPOSE 4173
# Start the app
# CMD ["serve", "-s", "/app", "-l", "4173"]
CMD ["node", "server.js"]

