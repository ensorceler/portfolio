FROM golang:1.24-alpine

WORKDIR /app

# Copy everything
COPY . .

# Install Node.js 22.4
RUN apk add --no-cache nodejs npm

# Build the frontend
RUN cd frontend && npm install && npm run build

# Build the Go application
RUN go mod download
RUN go build -o portfolio-server ./cmd/server

# Set production environment
ENV GO_ENV=production

EXPOSE 8080

CMD ["./portfolio-server"]