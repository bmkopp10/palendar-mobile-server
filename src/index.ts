import app from './app';
import os from 'os';

const port = process.env.PORT || 3000;

// Function to get local IP address
function getLocalIP() {
  const interfaces = os.networkInterfaces();
  let ipAddress = '';

  for (const name of Object.keys(interfaces)) {
    // @ts-ignore
    for (const net of interfaces[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        ipAddress = net.address;
        break;
      }
    }
    if (ipAddress) break;
  }

  return ipAddress;
}

// Get the local IP address
const ip = getLocalIP();

app.listen(port, () => {
  console.log(`Server is running at http://${ip}:${port}`);
});
