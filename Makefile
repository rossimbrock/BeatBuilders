# Docker start
# Builds and starts all docker containers
start:
	docker-compose up -d --build --remove-orphans

# Docker stop
# Stops all containers and cleans volumes
stop:
	docker-compose down --remove-orphans

# Docker clean
# Removes docker volumes, use if build issues occur
clean:
	docker system prune -af --volumes