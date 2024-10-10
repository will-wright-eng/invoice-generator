# Makefile for Invoice Generator

# Variables
DOCKER_COMPOSE = docker compose
BROWSER = open
URL = http://localhost:8080

# Default target
.DEFAULT_GOAL := help

# Help command
help:
	@echo "Usage: make [target]"
	@echo
	@echo "Targets:"
	@echo "  help     : Show this help message"
	@echo "  build    : Build the Docker image"
	@echo "  run      : Run the Docker container"
	@echo "  stop     : Stop the Docker container"
	@echo "  open     : Open the application in the default browser"
	@echo "  up       : Build and run the application"
	@echo "  down     : Stop and remove containers, networks, and volumes"
	@echo "  logs     : View logs"
	@echo "  rebuild  : Rebuild the application from scratch"
	@echo "  clean    : Clean up Docker resources"

# Build the Docker image
build:
	$(DOCKER_COMPOSE) build

# Run the Docker container
run:
	$(DOCKER_COMPOSE) up --build --remove-orphans

# Stop the Docker container
stop:
	$(DOCKER_COMPOSE) down

# Open the application in the default browser
open:
	$(BROWSER) $(URL)

# Build and run the application
up: build run

# Stop and remove containers, networks, and volumes
down:
	$(DOCKER_COMPOSE) down -v

# View logs
logs:
	$(DOCKER_COMPOSE) logs -f

# Rebuild the application from scratch
rebuild: down build run

# Clean up Docker resources
clean:
	$(DOCKER_COMPOSE) down -v --rmi all --remove-orphans

.PHONY: help all build run stop open up down logs rebuild clean
