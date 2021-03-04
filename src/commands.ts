import { printPassword, printPasswordSet, printReset } from "./messages";
import { askForPasswordValue } from "./questions";

export const hasAccess = (masterPassword: string, username: string): boolean =>
  (username === "Cole" && masterPassword === "1234") ||
  (username === "Leon" && masterPassword === "1111");
export const handleSetPassword = async (
  passwordName: string
): Promise<void> => {
  const passwordValue = await askForPasswordValue();
  printPasswordSet(passwordName);
};

export const handleGetPassword = async (
  passwordName: string
): Promise<void> => {
  printPassword(passwordName, "zipzip1234");
};
export const handleresetPassword = async (
  passwordName: string
): Promise<void> => {
  const passwordValue = await askForPasswordValue();
  printReset(passwordName);
};
