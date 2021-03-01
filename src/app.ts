import prompts from "prompts";

const name = async () => {
  const response = await prompts({
    type: "text",
    name: "value",
    message: "Who are you? ",
  });
  if (response.value === "Cole") {
    password();
  } else {
    console.log(`Ups, somthing went wrong!`);
    console.log(`Try again`);
    name();
  }
};
name();

const password = async () => {
  const response = await prompts({
    type: "password",
    name: "value",
    message: "What is your Password?",
  });
  if (response.value === "1234") {
    action();
  } else {
    console.log("That is not your Password!");
    console.log(`Try again`);
    password();
  }
};

const action = async () => {
  const response = await prompts({
    type: "text",
    name: "value",
    message: "Do you want set or get a password",
  });
  if (response.value === "set") {
    console.log("Now you can set your Password");
    setpassword();
  } else if (response.value === "get") {
    console.log("Your Password is 1234");
  } else {
    console.log("Enter set or get");
    action();
  }
};

const setpassword = async () => {
  const response = await prompts({
    type: "password",
    name: "value",
    message: "Set a Password",
  });
  console.log("Congratulation you have set a new Password");
};
