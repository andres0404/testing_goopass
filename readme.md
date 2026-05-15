# Prueba tecnica Gopass
Prueba técnica para Gopass. el proyecto incluye:
## Stack docker con contenedores
- React
- Express js
- Postgres
- [Adminer](http://localhost:8080?pgsql=postgres) (para ver BD)

Arrancar Stack
```bash
docker compose up -d
```
## Arrancar react
```bash
docker exec -it $(docker ps -f name=react -q) npm install
docker exec -it $(docker ps -f name=react -q) npm run dev -- --host
```
Ir a http://localhost:5173
## Arrancar express
```bash
docker exec -it $(docker ps -f name=back -q) npm install
docker exec -it $(docker ps -f name=back -q) node --watch src/index.js
```
Ir a http://localhost:3000

## Postgres
Es necesario [entrar](http://localhost:8080?pgsql=postgres), crear la BD **goopass_proyectos** y allí restaurarla con la BD [**bd.sql**](https://github.com/andres0404/testing_goopass/blob/master/bd.sql)