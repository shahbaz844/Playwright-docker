# Use an official Node.js runtime as the base image
FROM mcr.microsoft.com/playwright:v1.18.0-focal

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the project files into the container
COPY . .

# Install Playwright browsers
RUN npx playwright install --with-deps

# Set the command to run your tests using Playwright test runner
CMD ["npx", "playwright", "test"]

# Run command to build image
# docker build -t playwright-typescript .