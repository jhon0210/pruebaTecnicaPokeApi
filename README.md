# Instrcciones de Instalacion

Ejecutar el comando git clone https://github.com/jhon0210/pruebaTecnicaPokeApi.git

Tener instalado Docker o en su defecto instalar Docker Desktop

Ubicarse en la carpeta donde se clono el proyecto

Ejecutar el comando docker compose up

# Endpoints para realizar las pruebas

# Endpoint 1
http://localhost:3000/api/pokemon 

# Endpoint 2
http://localhost:3000/api/pokemon/:id 

# Endpoint 3
http://localhost:3000/api/pokemonAndTypes/:id

# Tecnologias Utilizadas

1. Nodejs con el framework Express
2. Redis para el almacenamiento en cache y lograr una mayor rapidez en las respuestas al consumir las apis
3. Jest y supertest para testiar el endpoint /api/pokemon
4. Docker para una instalacion mas facil en otros entornos para su revision

# Notas
1. Se subio tambien el archivo .env ya que es un repo de prueba, para su comodidad utilizar en su equpo local el puerto 3000,
   en caso de que utilice otro por favor cambiarlo en el archivo .env y en el archivo index.js
   
2.En caso de que requieran ejecutar el entorno de pruebas seguir las siguientes instrcciones
 * Detener la ejecucion de docker
 * Arrancar el contenedor de docker con docker start <ID_CONTENEDOR> Ò <NOMBRE_CONTEENDOR>
 * En el archivo .env, en REDIS_HOST cambiar el nombre del host por localhost
 * Ejecutar el comando npm test



