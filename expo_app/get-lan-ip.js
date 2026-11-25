const os = require('os');

const nets = os.networkInterfaces();
let preferred = '';
let fallback = '';

for (const iface of Object.keys(nets)) {
    if (/virtual|vbox|vmware|hyper-v|wsl|loopback/i.test(iface)) continue;
    for (const net of nets[iface] || []) {
        if (
            net.family === 'IPv4' &&
            !net.internal &&
            !net.address.startsWith('169.254.') &&
            !net.address.startsWith('192.168.56.')
        ) {
            if (/wi-?fi|wlan|wireless/i.test(iface)) {
                preferred = net.address;
            } else if (!fallback) {
                fallback = net.address;
            }
        }
    }
}

console.log(preferred || fallback);
