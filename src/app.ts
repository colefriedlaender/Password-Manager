const [command] = process.argv.slice(2);
// const [, , command] = process.argv;
if (command === "get") {
  console.log("You like to get somthing");
} else if (command === "set") {
  console.log("You like to set somthing");
}
