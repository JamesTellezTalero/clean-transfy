# clean-transfy

# init docker container with volume

docker run -d --name clean_transfy_db -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=clean_transfy_secret_password -e POSTGRES_DB=clean_transfy_api_db -v clean_transfy_pgdata:/var/lib/postgresql/data -p 5432:5432 postgres
