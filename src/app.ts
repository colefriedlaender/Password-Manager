import { printWelcomeMessage, printNoAccess, sayHello } from "./messages";
import {
  askForPassword,
  askForSelection as askForSelection,
  askForUsername,
} from "./questions";
import {
  handleDeletePassword,
  handleGetPassword,
  handleSetPassword,
  handleUpdatePassword,
  hasAccess,
} from "./commands";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import { connectDB, closeDB } from "./db";
dotenv.config();

const run = async () => {
  const url = process.env.MONGODB_URL;
  try {
    await connectDB(url, "MOC-Cole");

    printWelcomeMessage();
    const user = await askForUsername();
    const master = await askForPassword(user.username);
    if (!hasAccess(master.masterPassword, user.username)) {
      printNoAccess();
      run();
      return;
    }
    sayHello(user.username);
    const action = await askForSelection();
    switch (action.command) {
      case "set":
        await handleSetPassword(action.passwordName);
        break;
      case "get":
        await handleGetPassword(action.passwordName);
        break;
      case "delete":
        await handleDeletePassword(action.passwordName);
        break;
      case "update":
        await handleUpdatePassword(action.passwordName);
    }
    await closeDB();
  } catch (error) {
    console.error({ error });
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
