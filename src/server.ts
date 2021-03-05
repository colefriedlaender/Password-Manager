import http from "http";
import dotenv from "dotenv";
import { connectDB, createPasswordDoc, readPasswordDoc } from "./db";
import { handleDelete, handleGet, handlePost } from "./handle";

dotenv.config();
const port = process.env.PORT;
const url = process.env.MONGODB_URL;
connectDB(url, "MOC-Cole");

const server = http.createServer(
  async (req: http.IncomingMessage, res: http.ServerResponse) => {
    if (req.method === "GET") {
      handleGet(req, res);
    }
    if (req.method === "POST") {
      handlePost(req, res);
    }
    if (req.method === "DELETE") {
      handleDelete(req, res);
    }
  }
);
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
