#!/bin/bash

echo "Iniciando túnel público..."
echo ""

# Ejecutar localtunnel y capturar la salida
npx -y localtunnel --port 8000 2>&1 | while IFS= read -r line; do
    echo "$line"
    if [[ $line == *"https://"* ]]; then
        echo "$line" > /tmp/public_url.txt
        echo ""
        echo "========================================="
        echo "✅ ¡APLICACIÓN DISPONIBLE POR INTERNET!"
        echo "========================================="
        echo "URL: $line"
        echo "========================================="
        echo ""
    fi
done
