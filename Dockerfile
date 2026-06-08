FROM node:20-slim

WORKDIR /app

COPY package*.json ./
COPY .npmrc ./

# Use yarn for faster/more reliable installs
RUN yarn install --network-timeout 100000

COPY . .

EXPOSE 5173

# Host 0.0.0.0 is required for Docker to access the Vite server
CMD ["yarn", "dev", "--", "--host"]
