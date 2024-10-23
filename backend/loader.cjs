// File keperluan plesk untuk menjalankan aplikasi nodejs

async function loadApp() {
    await import("./bin/www.js");
}

loadApp();
