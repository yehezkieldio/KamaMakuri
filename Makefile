reset-db:
	@echo "Stopping Docker Compose..."
	@docker-compose down
	@echo "Removing data folder..."
	@sudo rm -rf data
	@echo "Starting Docker Compose again..."
	@docker-compose up -d
