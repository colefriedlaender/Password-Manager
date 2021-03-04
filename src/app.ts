import { printWelcomeMessage, printNoAccess, sayHello } from "./messages";
import {
  askForPassword,
  askForSelection as askForSelection,
  askForUsername,
} from "./questions";
import {
  handleGetPassword,
  handleresetPassword,
  handleSetPassword,
  hasAccess,
} from "./commands";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import {
  connectDB,
  closeDB,
  getCollection,
  createPasswordDoc,
  readPasswordDoc,
  updatePasswordDoc,
  updatePasswordValue,
  deletePasswordDoc,
} from "./db";
dotenv.config();

const run = async () => {
  const url = process.env.MONGODB_URL;

  try {
    await connectDB(url, "MOC-Cole");
    await createPasswordDoc({
      name: "Wifi",
      value: "12345",
    }); //
    // console.log(await updatePasswordDoc("Wifi", { value: "123" }));
    // console.log(await updatePasswordValue("Wifi", "12345"));
    // await readPasswordDoc;
    // console.log(await deletePasswordDoc("Wifi"));

    await closeDB();
  } catch (error) {
    console.error(error);
  }
};

run();

// type CommandToFunction = {
//   set: (passwordName: string) => Promise<void>;
//   get: (passwordName: string) => Promise<void>;
// };
// const commandToFunction: CommandToFunction = {
//   set: handleSetPassword,
//   get: handleGetPassword,
// };
// printWelcomeMessage();
// const user = await askForUsername();
// const master = await askForPassword(user.username);
// if (!hasAccess(master.masterPassword, user.username)) {
//   printNoAccess();
//   run();
//   return;
// }
// sayHello(user.username);
// const action = await askForSelection();
// switch (action.command) {
//   const commandFunction = commandToFunction[action.command];
// commandFunction(action.passwordName);
// }
