cd /root/docker_data/home

docker compose down

rm -rf ./data

unzip ./dist.zip

mv dist data

rm dist.zip

docker compose up -d