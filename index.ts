import http, { IncomingMessage, ServerResponse } from "http";
import path from "path";
import { promises as fs, read } from "fs";
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
