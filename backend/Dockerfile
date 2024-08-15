# Usa una imagen base de Node.js
FROM node:18

# Define el directorio de trabajo
WORKDIR /usr/src

# Copia los archivos package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código del proyecto
COPY . .

# Expon el puerto en el que la aplicación se ejecutará
EXPOSE 5000

# Define el comando para ejecutar la aplicación
CMD ["npm", "start"]
