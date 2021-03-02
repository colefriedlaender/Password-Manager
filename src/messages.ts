import chalk from "chalk";

export const printWelcomeMessage = () => {
  console.log(`Welcome to ${chalk.underline.green("MOC")}`);
};

export const sayHello = (username: string) => {
  console.log(`Loged in as ${username}`);
};
export const printNoAccess = () => {
  console.warn(chalk.bgRed("Wrong usnername or master password ! Try again"));
};

export const printPasswordSet = (passwordName: string) => {
  console.log(`You set a new ${passwordName} password.`);
};

export const printPassword = (passwordName: string, passwordValue: string) => {
  console.log(`Your ${passwordName} password is ${passwordValue}!`);
};
export const printReset = (passwordName: string) => {
  console.log(`Your ${passwordName} password has been changed.`);
};
