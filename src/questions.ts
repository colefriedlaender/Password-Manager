import prompts from "prompts";

type username = {
  username: string;
};
type masterPassword = {
  masterPassword: string;
};

export const askForUsername = (): Promise<username> => {
  return prompts({
    type: "text",
    name: "username",
    message: "What is your Username?",
  });
};

export const askForPassword = (username: string): Promise<masterPassword> => {
  return prompts({
    type: "password",
    name: "masterPassword",
    message: `${username} what is your master password?`,
  });
};

type Action = {
  command: "get" | "set" | "reset";
  passwordName: string;
};
export const askForSelection = (): Promise<Action> =>
  prompts([
    {
      type: "select",
      name: "command",
      message: "What do you want to do?",
      choices: [
        { title: "Get a password", value: "get" },
        { title: "Set a password", value: "set" },
        { title: "Reset a password", value: "reset" },
      ],
    },
    {
      type: "text",
      name: "passwordName",
      message: "Which password?",
    },
  ]);

export const askForPasswordValue = async (): Promise<string> => {
  const response = await prompts({
    type: "password",
    name: "passwordValue",
    message: "What is the new password?",
  });
  return response.passwordValue;
};
