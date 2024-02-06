# Docker build
# Creates a beat-builders-app build
build:
	docker build -t beat-builders-app .

# Docker start
# Starts an existing beat-builders-app build
start:
	docker run -d --name beat-builders-app -p 3000:3000 beat-builders-app

# Docker stop
# Stops the container and cleans it out
stop:
	-@docker stop beat-builders-app
	-@docker rm beat-builders-app
	-@docker rmi beat-builders-app

# Docker clean
# Removes docker volumes, use if build issues occur
clean:
	-@docker system prune -af --volumes