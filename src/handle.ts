import {
  deletePasswordDoc,
  createPasswordDoc,
  PasswordDoc,
  readPasswordDoc,
} from "./db";
import http from "http";

const Boris = (res: http.ServerResponse, newPassword: PasswordDoc) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application / json");
  res.end(JSON.stringify(newPassword));
  return;
};

export async function handleGet(
  req: http.IncomingMessage,
  res: http.ServerResponse
) {
  const parts = req.url.split("/");
  const passwordName = parts[parts.length - 1];
  const passwordDoc = await readPasswordDoc(passwordName);
  console.log(passwordName);
  if (!passwordDoc) {
    res.statusCode = 404;
    res.end();
    return;
  }
  Boris(res, passwordDoc);
}

export async function handlePost(
  req: http.IncomingMessage,
  res: http.ServerResponse
) {
  let data = "";
  req.on("data", (chunk) => {
    data += chunk;
  });
  req.on("end", async () => {
    const newPassword: PasswordDoc = JSON.parse(data);
    console.log({ newPassword });

    await createPasswordDoc(newPassword);
    if (!newPassword) {
      res.statusCode = 404;
      res.end();
      return;
    }
    Boris(res, newPassword);
  });
}

export async function handleDelete(
  req: http.IncomingMessage,
  res: http.ServerResponse
) {
  const parts = req.url.split("/");
  const passwordName = parts[parts.length - 1];
  const passwordDoc = await deletePasswordDoc(passwordName);
  console.log(passwordName);
  if (!passwordDoc) {
    res.statusCode = 404;
    res.end();
    return;
  }
  res.statusCode = 200;
  res.setHeader("Content-Type", "application / json");
  res.end(JSON.stringify(passwordDoc));
}
