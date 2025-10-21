const localtunnel = require('localtunnel');
const fs = require('fs');

(async () => {
  const tunnel = await localtunnel({ port: 8000 });

  const message = `
======================
Tu aplicación está disponible en:
${tunnel.url}
======================
`;

  console.log(message);
  fs.writeFileSync('/tmp/tunnel_url.txt', tunnel.url);

  tunnel.on('close', () => {
    console.log('Túnel cerrado');
  });

  // Mantener el proceso vivo
  process.on('SIGINT', () => {
    tunnel.close();
    process.exit();
  });
})();
