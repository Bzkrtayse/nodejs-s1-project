import http, { IncomingMessage, ServerResponse } from "http";
import path from "path";
import { promises as fs, read } from "fs";
import geoip from 'geoip-lite';
import dotenv from 'dotenv'

dotenv.config();

const PORT = 3000;
const HOSTNAME = "localhost";

type Employee = {
  ad: string,
  soyad: string,
  email: string,
  pozisyon: string,
  ise_giris_tarihi: string,
  maas: number,
}
const directoryPath = path.join(__dirname, 'src', 'pages');
const stylesPath = path.join(__dirname, "src", "styles");
const employeesDataPath = path.join(__dirname, 'data','employeeList.json');

async function readHTMLfile(res: ServerResponse, fileName: string) {
  const filePath = path.join(directoryPath, fileName);
  try {
    const data = await fs.readFile(filePath);
    res.writeHead(200, { "content-type": "text/html" });
    res.end(data);
  }
  catch (error) {
    res.writeHead(500,{'content-type':'text/plain'});
    res.end("500 Internal Server Error");
  }
}
async function serveCSS(res: ServerResponse, fileUrl: string) {
  const filePath = path.join(stylesPath, path.basename(fileUrl));
  try {
    const data = await fs.readFile(filePath);
    res.writeHead(200, { "Content-Type": "text/css" });
    res.end(data);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 CSS File Not Found");
  }
}
async function readEmployeeData(): Promise<Employee[]> {
    const data = await fs.readFile(employeesDataPath,'utf-8');
    return JSON.parse(data);
 }

function removeSalary(employees: Employee[]) {
  return employees.map(({maas, ...rest})=>rest)
}
function oldestEmployee(employees: Employee[]) {
  return employees.reduce((oldest, current) => {
    return (current.ise_giris_tarihi < oldest.ise_giris_tarihi) ? current : oldest;
  });
}
function avarageSalary(employees: Employee[]) {
  const totalSalary = employees.reduce((sum, index) => sum + index.maas, 0);
  const avarage = totalSalary / employees.length;
  return avarage.toFixed(2);
}
async function getWeather(lat:number, lon:number) {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
  if (!response.ok) {
    throw new Error(`Weather API error: ${response.statusText}`);
  }
  const data= await response.json();
  return {
    success: true,
    data: {
      city: data.name,
      temperature: data.main.temp,
      condition: data.weather[0].description
    }
  }
}

const server = http.createServer(async (req: IncomingMessage, res: ServerResponse) => {

  const url = req.url || "/";

  if (url.startsWith("/styles/")) {
    serveCSS(res, url);
    return;
  }
  //API ENDPOINTS
  if (req.url === "/employeeList") {
    try {
      const data = await readEmployeeData();
      const noSalaryData=removeSalary(data);
      res.writeHead(200, { 'content-type': 'application/json' });
      res.end(JSON.stringify(noSalaryData));
    } catch (error) {
      res.writeHead(500, { 'content-type': 'text/plain' });
      res.end("500 Internal Server Error");
    }
    return;
  }
  if (req.url === '/oldestEmployee') {
    try {
      const data = await readEmployeeData();
      const oldest = oldestEmployee(data);
      res.writeHead(200, { 'content-type': 'application/json' });
      res.end(JSON.stringify(oldest));
    } catch (error) {
      res.writeHead(500, { 'content-type': 'text/plain' });
      res.end("500 Internal Server Error");
    }
    return;
  }
  if (req.url === '/avarageSalary') {
    try {
      const data = await readEmployeeData();
      const avarage = avarageSalary(data);
      res.writeHead(200, { 'content-type': 'application/json' });
      res.end(JSON.stringify({ avarageSalary: avarage }));
      
    }
    catch (error) {
      res.writeHead(500,{'content-type':'text/plain'});
      res.end("500 Internal Server Error");
    }
    return;
  }
  if (req.url === '/api/top100products') {
    try {
      const offsets = Array.from({ length: 10 }, (_, i) => {
        const offset = i * 10;
         return fetch(`https://e-commerce-m3d4.onrender.com/products?sort=rating:desc&limit=10&offset=${offset}`)
          .then(
            res => {
              if (!res.ok) {
                throw new Error(`API returned ${res.status}`);
              }
              return res.json();
            }
          );
      })
      const allProducts = (await Promise.all(offsets));
      const array = allProducts.flat();
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(array));
    }
    catch (error) {
      res.writeHead(500, { 'content-type': 'text/plain' });
      res.end("500 Internal Server Error");
    }
    return;
  }
  if (req.url === '/api/how-is-your-weather') {
    try {
      const ip = (req.headers['x-forwarded-for'] as string)
        || req.socket.remoteAddress
        || '';
      console.log(`IP Address: ${ip}`);

      const geo = geoip.lookup(ip);
      if (!geo) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: false, message: "Could not determine location" }));
        return;
      }
      const [lat, lon] = geo.ll;

      const weatherData = await getWeather(lat, lon);

      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(weatherData));
    }
    catch (error: any) {
      res.writeHead(500, { 'content-type': 'text/plain' });
      res.end(JSON.stringify({ success: false, error: error.message }));
    }
    return;
  }
  //HTML ROUTES
  if (req.url === "/" || req.url === "/home")
  {
    readHTMLfile(res, 'index.html');
    return;
  }
   if (req.url === "/products") {
     readHTMLfile(res, 'products.html');
     return;
  }
  if (req.url === "/connect") {
    readHTMLfile(res, 'contact.html');
    return;
  }
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  
});
server.listen(PORT, HOSTNAME, () => {
  console.log(`Server is listening on http://${HOSTNAME}:${PORT}...`);
});
