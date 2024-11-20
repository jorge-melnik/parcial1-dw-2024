- docker-compose.yaml para levantar el ambiente de desarrollo
- docker-compose.build.yaml para levantar un ambiente con todo "compilado".
- docker-compose.production para levantar un ambiente descargando las imágenes del registry (para usar en prod).

Para subir todo a la vm:
sh scripts/deploy-prod.sh
claro que hay que configurar todo en el .env...
