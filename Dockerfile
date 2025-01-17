# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Statik dosyalar build sırasında taşınıyor mu?
COPY public /app/public

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Generate the sitemap using next-sitemap
RUN npm run generate-sitemap

# Install serve to serve the static files
RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 5002

# Start the application using serve
CMD ["serve", "-s", "out", "-l", "5002"]