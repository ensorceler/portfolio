.PHONY: dev build run clean

dev:
	@echo "Starting development servers..."
	@cd frontend && npm run dev & cd backend && go run main.go

build-frontend:
	@echo "Building frontend..."
	@cd frontend && npm run build

build-backend:
	@echo "Building backend..."
	@cd backend && go build -o ../server

build: build-frontend build-backend

run:
	@echo "Running server..."
	@./server

clean:
	@echo "Cleaning up..."
	@rm -rf dist server
	@cd frontend && rm -rf node_modules