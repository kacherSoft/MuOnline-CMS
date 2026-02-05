/**
 * MuCMS Windows Service Installer
 * Run this script as Administrator to install/remove the Windows service
 */

const Service = require('node-windows').Service;
const path = require('path');

// Create a new service object
const svc = new Service({
  name: 'MuOnlineCMS',
  description: 'MuOnline Season 19.2 CMS Backend Server',
  script: path.join(__dirname, 'src', 'server-entry.ts'),
  nodeOptions: [
    '--require=tsx',
    '--max-old-space-size=4096'
  ],
  env: {
    name: 'NODE_ENV',
    value: 'production'
  },
  workingDirectory: __dirname
});

// Listen for the 'install' event
svc.on('install', () => {
  console.log('✅ MuOnlineCMS service installed successfully!');
  console.log('🚀 Starting service...');
  svc.start();
});

svc.on('start', () => {
  console.log('✅ MuOnlineCMS service started successfully!');
  console.log('📡 Server running on http://localhost:3000');
});

svc.on('error', (err) => {
  console.error('❌ Service error:', err);
});

svc.on('stop', () => {
  console.log('⏹️ MuOnlineCMS service stopped');
});

svc.on('uninstall', () => {
  console.log('✅ MuOnlineCMS service uninstalled successfully!');
});

// Parse command line arguments
const command = process.argv[2]?.toLowerCase();

switch (command) {
  case 'install':
    console.log('🔧 Installing MuOnlineCMS Windows Service...');
    svc.install();
    break;
  case 'uninstall':
    console.log('🔧 Uninstalling MuOnlineCMS Windows Service...');
    svc.uninstall();
    break;
  case 'start':
    console.log('🚀 Starting MuOnlineCMS service...');
    svc.start();
    break;
  case 'stop':
    console.log('⏹️ Stopping MuOnlineCMS service...');
    svc.stop();
    break;
  default:
    console.log(`
╔══════════════════════════════════════════════════════════╗
║  MuOnline CMS Windows Service Manager                    ║
╠══════════════════════════════════════════════════════════╣
║  Usage:                                                  ║
║    node install-windows-service.js install    Install    ║
║    node install-windows-service.js uninstall  Uninstall  ║
║    node install-windows-service.js start      Start      ║
║    node install-windows-service.js stop       Stop       ║
╚══════════════════════════════════════════════════════════╝
    `);
}
