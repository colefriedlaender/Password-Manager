import {
  deletePasswordDoc,
  createPasswordDoc,
  PasswordDoc,
  readPasswordDoc,
} from "./db";
import { Boris, parseJSONBody } from "./helper.Function";
import http from "http";

export async function handleGet(
  req: http.IncomingMessage,
  res: http.ServerResponse,
  passwordName: string
) {
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
  const newPassword: PasswordDoc = await parseJSONBody(req);
  console.log({ newPassword });
  await createPasswordDoc(newPassword);
  if (!newPassword) {
    res.statusCode = 404;
    res.end();
    return;
  }
  Boris(res, newPassword);
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
  res.end(JSON.stringify("This password has been deleted"));
}
