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

const run = async () => {
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
      handleSetPassword(action.passwordName);
      break;
    case "get":
      handleGetPassword(action.passwordName);
      break;
    case "reset":
      handleresetPassword(action.passwordName);
      break;
  }
};

run();
