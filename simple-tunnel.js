const localtunnel = require('localtunnel');

(async () => {
  try {
    const tunnel = await localtunnel({
      port: 8000,
      subdomain: 'poketype-' + Math.random().toString(36).substring(7)
    });

    console.log('\n========================================');
    console.log('🌐 APLICACIÓN DISPONIBLE EN INTERNET:');
    console.log(tunnel.url);
    console.log('========================================\n');

    // Mantener vivo
    setInterval(() => {
      // Keep alive
    }, 10000);

  } catch (err) {
    console.error('Error:', err.message);
  }
})();
