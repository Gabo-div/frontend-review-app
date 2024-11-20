<p align="center"><h1 align="center">FRONTEND-REVIEW-APP</h1></p>
<p align="center">

</p>
<p align="center">
	<img src="https://img.shields.io/github/license/Gabo-div/frontend-review-app?style=default&logo=opensourceinitiative&logoColor=white&color=0080ff" alt="license">
	<img src="https://img.shields.io/github/last-commit/Gabo-div/frontend-review-app?style=default&logo=git&logoColor=white&color=0080ff" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/Gabo-div/frontend-review-app?style=default&color=0080ff" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/Gabo-div/frontend-review-app?style=default&color=0080ff" alt="repo-language-count">
</p>
<p align="center"><!-- default option, no dependency badges. -->
</p>
<p align="center">
	<!-- default option, no dependency badges. -->
</p>
<br>

### Requisitos

- Tener instalado [Node.js](https://nodejs.org/en).
- Recomendable utilizar [pnpm](https://pnpm.io/) (en caso de no tenerlo debes ejecutar todos los comandos usando npm).
- Recomendable tener un emulador de Android (o iPhone si usas Mac).

### Tecnologías

- JavaScript
- TypeScript
- React Native
- Expo
- React Query
- Tamagui

### Variables De Entorno

Para ejecutar este proyecto, necesitarás agregar las siguientes variables de entorno en tu `.env` en la raíz del proyecto:

- `API_URL`: URL en la cual se está ejecutando el servidor. (Normalmente, será la IP local de tu computadora `http://192.168.1.x:8080` o el localhost `http://localhost:8080`)

### Instalación

1. Clonar el repositorio:

```sh
git clone https://github.com/Gabo-div/frontend-review-app
```

2. Navegar al directorio del proyecto:

```sh
cd frontend-review-app
```

3. Instalar las dependencias del proyecto:

```sh
pnpm i
```

### Desarrollo

Dentro del proyecto ejecuta el siguiente comando para levantar el servidor de desarrollo:

```sh
pnpm run start
```

Luego escanea el código QR que se verá en la terminal utilizando la aplicación de [Expo Go](https://expo.dev/go).

Todos los cambios que realices se verán reflejados en tu dispositivo.
