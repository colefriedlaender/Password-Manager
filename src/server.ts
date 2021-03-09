import http from "http";
import dotenv from "dotenv";
import { connectDB } from "./db";
import { handleDelete, handleGet, handlePost } from "./handle";

dotenv.config();
const port = process.env.PORT;
const url = process.env.MONGODB_URL;
connectDB(url, "MOC-Cole");

const server = http.createServer(
  async (req: http.IncomingMessage, res: http.ServerResponse) => {
    if (req.url === "/") {
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      res.end("<h1>Safe Me!</h1>");
      return;
    }

    if (req.method === "POST") {
      handlePost(req, res);
    }
    const parts = req.url.match(/\/api\/passwords\/(\w+)/);
    if (!parts) {
      res.statusCode = 400;
      res.end();
      return;
    }
    const [, passwordName] = parts;

    if (req.method === "GET") {
      handleGet(req, res, passwordName);
    }
    if (req.method === "DELETE") {
      handleDelete(req, res);
    }
    res.statusCode = 405;
  }
);
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
