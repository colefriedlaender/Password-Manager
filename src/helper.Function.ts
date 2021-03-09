import http from "http";
import { PasswordDoc } from "./db";
export const parseJSONBody = <T>(req: http.IncomingMessage): Promise<T> => {
  return new Promise((resolve) => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", () => {
      resolve(JSON.parse(data));
    });
  });
};

export const Boris = (res: http.ServerResponse, newPassword: PasswordDoc) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application / json");
  res.end(JSON.stringify(newPassword));
  return;
};
export function PasswordName(
  req: http.IncomingMessage,
  res: http.ServerResponse
) {
  const parts = req.url.match(/\/api\/passwords\/(\w+)/);
  if (!parts) {
    res.statusCode = 400;
    res.end();
    return;
  }
  const [, passwordName] = parts;
  return parts;
}
