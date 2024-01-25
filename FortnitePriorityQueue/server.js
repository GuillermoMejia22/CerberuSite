const express = require('express');
const app = express();
const path = require('path');

// Configurar la carpeta de archivos estáticos
app.use(express.static(path.join(process.cwd(), "public")));

// Iniciar el servidor
app.listen(3000, () => {
  console.log('Servidor iniciado en http://localhost:3000');
});
