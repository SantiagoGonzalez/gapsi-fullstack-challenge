# Backend Setup — Instrucciones de instalación y uso

## Requisitos
- Java 17
- Maven 3.8+

## Configurar puertos si se quiere (NO NECESARIO)
-src/main/resources/application.properties

## Compilar y ejecutar con maven
-mvn clean install
-mvn spring-boot:run

-si se ejecuta desde Powershell
	./mvnw spring-boot:run
	

# Frontend Project Setup — Instrucciones de instalación y uso

## Requisitos
- Node.js (recomendado LTS >= 18)
- npm (incluido con Node.js) o yarn

## Instalación
1. Abrir terminal en Windows (PowerShell o CMD) en la carpeta del proyecto:
   - PowerShell:
     ```bash
     npm install
     ```
   - CMD:
     ```bash
     npm install
     ```

## Arrancar en desarrollo
- Con npm:
  ```bash
  npm run dev
  ```
- Con yarn:
  ```bash
  yarn dev
  ```
El servidor de Vite se abrirá (por defecto en http://localhost:3000). Para ver la salida en otra terminal (ej. Windows PowerShell), usar los mismos comandos.

## Construir para producción
- ```bash
  npm run build
  ```
- Previsualizar build:
  ```bash
  npm run preview
  ```
