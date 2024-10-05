const http = require('http'); // Importar el módulo http nativo de Node.js

// Crear el servidor HTTP
const server = http.createServer((req, res) => {
    // Solo aceptar solicitudes POST en la ruta raíz
    if (req.method === 'POST' && req.url === '/') {
        let body = '';

        // Escuchar el evento 'data' para recibir los datos del cuerpo de la solicitud
        req.on('data', chunk => {
            body += chunk.toString(); // Convertir los datos binarios a string y agregarlos al cuerpo
        });

        // Una vez que se recibe todo el cuerpo de la solicitudc
        req.on('end', () => {
            try {
                console.log(body);

                // Intentar analizar el cuerpo como JSON
                const jsonData = JSON.parse(body);


                // Procesar el JSON recibido según sea necesario (aquí se imprime en consola)
                console.log('Solicitud recibida con el siguiente cuerpo:', jsonData);

                // Enviar una respuesta de éxito
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ status: 'success', receivedData: jsonData }));
            } catch (error) {
                // Manejar errores en caso de que el cuerpo no sea JSON válido
                console.error('Error al procesar la solicitud:', error.message);
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ status: 'error', message: 'Invalid JSON' }));
            }
        });
    } else {
        // Manejar cualquier solicitud que no sea POST a la raíz
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'error', message: 'Not Found' }));
    }
});

// Definir el puerto en el que se ejecutará el servidor
const PORT = 7000;

// Iniciar el servidor y escuchar en el puerto especificado
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor HTTP escuchando en http://localhost:${PORT}`);
});
