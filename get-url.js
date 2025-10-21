const localtunnel = require('localtunnel');
const { exec } = require('child_process');

(async () => {
  try {
    console.log('Conectando...');
    const tunnel = await localtunnel({ port: 8000 });

    const url = tunnel.url;
    console.log('\n' + '='.repeat(50));
    console.log('✅ APLICACIÓN DISPONIBLE EN INTERNET');
    console.log('='.repeat(50));
    console.log('\nURL: ' + url);
    console.log('\n' + '='.repeat(50));
    console.log('\nPresiona Ctrl+C para detener el túnel\n');

    // Guardar URL en archivo
    require('fs').writeFileSync('/tmp/public_url.txt', url);

    tunnel.on('close', () => {
      console.log('\nTúnel cerrado');
      process.exit(0);
    });

  } catch (err) {
    console.error('\n❌ Error al crear túnel:', err.message);
    process.exit(1);
  }
})();
