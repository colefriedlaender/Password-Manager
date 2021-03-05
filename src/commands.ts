import {
  createPasswordDoc,
  deletePasswordDoc,
  readPasswordDoc,
  updatePasswordDoc,
} from "./db";
import {
  printUpdate,
  printPassword,
  printPasswordSet,
  printDelete,
} from "./messages";
import {
  askForNewPassword,
  askForPasswordCode,
  askForPasswordValue,
} from "./questions";

export const hasAccess = (masterPassword: string, username: string): boolean =>
  (username === "Cole" && masterPassword === "1234") ||
  (username === "Leon" && masterPassword === "1111");
export const handleSetPassword = async (
  passwordName: string
): Promise<void> => {
  const passwordValue = await askForPasswordValue();
  await createPasswordDoc({ name: passwordName, value: passwordValue });
  printPasswordSet(passwordName);
};

export const handleGetPassword = async (
  passwordName: string
): Promise<void> => {
  const passwordDoc = await readPasswordDoc(passwordName);
  if (!passwordDoc) {
    console.log("No password found");
    return;
  } else {
    printPassword(passwordDoc.name, passwordDoc.value);
  }
};

export const handleDeletePassword = async (
  passwordName: string
): Promise<void> => {
  const passwordCode = await askForPasswordCode(passwordName);
  const realPassword = await readPasswordDoc(passwordName);
  if (!realPassword) {
    console.log("No password found");
    return;
  }
  if (passwordCode === realPassword.value) {
    const passwordDoc = await deletePasswordDoc(passwordName);
    if (!passwordDoc) {
      console.log("No password found");
      return;
    }
    printDelete(passwordName);
  } else {
    console.log("The password is wrong");
    return;
  }
};
export const handleUpdatePassword = async (
  passwordName: string
): Promise<void> => {
  const realPassword = await readPasswordDoc(passwordName);
  if (!realPassword) {
    console.log("No password found");
    return;
  }
  const passwordCode = await askForPasswordCode(passwordName);
  if (passwordCode === realPassword.value) {
    const newPassword = await askForNewPassword(passwordName);
    const passwordDoc = await updatePasswordDoc(passwordName, {
      value: newPassword,
    });
    if (!passwordDoc) {
      console.log("No password found");
      return;
    }
    printUpdate(passwordName);
  } else {
    console.log("The password is wrong");
    return;
  }
};
