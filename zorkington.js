const readline = require("readline");

const readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Ask question
const ask = questionText => {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
};

let currentRoom = "";
let playerInventory = [];
let roomInventory = [];
let status = "";
let globalResponses = [
  "i",
  "inventory",
  "take inventory",
  "r",
  "room inventory",
  "take room inventory"
];

// Get Response Main St
const getResponseGlobal = thePrompt => {
  let theResponse = "";

  if (
    thePrompt === "i" ||
    thePrompt === "inventory" ||
    thePrompt === "take inventory"
  ) {
    theResponse = "You are carrying: \n" + playerInventory + "\n";
  } else if (
    thePrompt === "r" ||
    thePrompt === "room inventory" ||
    thePrompt === "take room inventory"
  ) {
    theResponse = "The rooms inventory: \n" + roomInventory + "\n";
  }

  return theResponse;
};

// Get Response Main St
const getResponseMainSt = thePrompt => {
  let theResponse = "";

  if (thePrompt === "start") {
    theResponse =
      "182 Main St. \n" +
      "You are standing on Main Street between Church and South Winooski. \n" +
      "There is a door here. A keypad sits on the handle. \n" +
      "On the door is a handwritten sign. \n";
  } else if (thePrompt === "read sign") {
    theResponse =
      'The sign says "Welcome to Burlington Code Academy! Come on \n' +
      "up to the second floor. If the door is locked, use the code \n" +
      '12345." \n';
  } else if (thePrompt === "take sign") {
    theResponse =
      "That would be selfish. How will other students find their way? \n";
  } else if (thePrompt === "open door") {
    theResponse =
      "The door is locked. There is a keypad on the door handle. \n";
  } else if (thePrompt === "enter code 12345" || thePrompt === "key in 12345") {
    theResponse =
      "Success! The door opens. You enter the foyer and the door shuts behind you. \n\n" +
      "You are in a foyer. Or maybe it's an antechamber. Or a \n" +
      "vestibule. Or an entryway. Or an atrium. Or a narthex. \n" +
      "But let's forget all that fancy flatlander vocabulary, \n" +
      'and just call it a foyer. In Vermont, this is pronounced "FO-ee-yurr". \n' +
      "A copy of Seven Days lies in a corner. \n";
    currentRoom = "182 Main St - Foyer";
  } else if (
    thePrompt.startsWith("enter code") ||
    thePrompt.startsWith("key in")
  ) {
    theResponse = "Bzzzzt! The door is still locked. \n";
  } else if (thePrompt === "xyzzy") {
    theResponse =
      "You entered the magic short cut word. You enter the classroom. Please be seated. \n";
    currentRoom = "182 Main St - Classroom";
  } else if (thePrompt === "muddy waters" || thePrompt === "muddy") {
    theResponse = "You are now inside Muddy Waters. \n";
    currentRoom = "Muddy";
  } else if (thePrompt === "mr mikes" || thePrompt === "mikes") {
    theResponse = "You are now inside Mr Mikes. \n";
    currentRoom = "Mikes";
  }

  return theResponse;
};

// Get Response Main St Foyer
const getResponseMainStFoyer = thePrompt => {
  let theResponse = "";

  if (
    (thePrompt === "take paper" || thePrompt === "take seven days") &&
    playerInventory.includes("seven days") === false
  ) {
    theResponse =
      "You pick up the paper and leaf through it looking for comics \n" +
      "and ignoring the articles, just like everybody else does. \n";
    playerInventory.push("seven days");
  } else if (thePrompt === "take paper" || thePrompt === "take seven days") {
    theResponse = "You have already picked up the Seven Days paper. \n";
  } else if (
    (thePrompt === "drop paper" || thePrompt === "drop seven days") &&
    playerInventory.includes("seven days") === true
  ) {
    theResponse = "The paper has been dropped. \n";
    roomInventory.push(
      playerInventory.splice(playerInventory.indexOf("seven days"), 1)
    );
  } else if (
    (thePrompt === "read paper" || thePrompt === "read seven days") &&
    playerInventory.includes("seven days") === true
  ) {
    theResponse =
      'You begin reading the paper and notice a note inside that says, "Go Upstairs". \n';
  } else if (
    (thePrompt === "go upstairs" || thePrompt === "go up") &&
    playerInventory.includes("seven days") === true
  ) {
    theResponse =
      'You are now upstairs, with a closed classroom door in front of you, "Enter Classroom" \n';
    currentRoom = "182 Main St - Upstairs";
  } else if (thePrompt === "go back") {
    theResponse = "You left foyer and are now at 182 Main St. \n";
    currentRoom = "182 Main St";
  }

  return theResponse;
};

// Get Response Main St Upstairs
const getResponseMainStUpstairs = thePrompt => {
  let theResponse = "";

  if (thePrompt === "enter classroom" || thePrompt === "open door") {
    theResponse = "You enter the classroom. Please be seated. \n";
    currentRoom = "182 Main St - Classroom";
  } else if (thePrompt === "go back") {
    theResponse = "You left the upstairs and are now in the foyer. \n";
    currentRoom = "182 Main St - Foyer";
  }

  return theResponse;
};

// Get Response Main St Classroom
const getResponseMainStClassroom = thePrompt => {
  let theResponse = "";

  if (
    (thePrompt === "sit down" || thePrompt === "be seated") &&
    roomInventory.includes("coffee") === false
  ) {
    theResponse =
      'The Teacher speaks gibberish, you must "Go Back" and \n' +
      "get the teacher a cup of coffee from Muddy's. \n";
  } else if (
    (thePrompt === "sit down" || thePrompt === "be seated") &&
    roomInventory.includes("coffee") === true
  ) {
    theResponse = "Welcome to the class! Take pen to get started. \n";
  } else if (
    (thePrompt === "give coffee" || thePrompt === "drop coffee") &&
    playerInventory.includes("coffee") === true
  ) {
    theResponse =
      "You give the teacher the coffee, he says, you can now sit down. \n";
    roomInventory.push(
      playerInventory.splice(playerInventory.indexOf("coffee"), 1)
    );
  } else if (
    (thePrompt === "give coffee" || thePrompt === "drop coffee") &&
    roomInventory.includes("coffee") === true
  ) {
    theResponse = "You have already given the coffee. \n";
  } else if (
    (thePrompt === "take pen" || thePrompt === "pickup pen") &&
    playerInventory.includes("pen") === false
  ) {
    theResponse =
      "You pick up the pen, class is under way, drop pen for class to be over. \n";
    playerInventory.push("pen");
  } else if (thePrompt === "take pen" || thePrompt === "pickup pen") {
    theResponse = "You have already picked up the pen. \n";
  } else if (
    (thePrompt === "drop pen" || thePrompt === "drop the pen") &&
    playerInventory.includes("pen") === true
  ) {
    theResponse =
      "The pen has been dropped. You are now hungry and your stomach \n" +
      'will growl until you get pizza from Mikes. Please "Go Back" \n';
    roomInventory.push(
      playerInventory.splice(playerInventory.indexOf("pen"), 1)
    );
    status = "hungry";
  } else if (thePrompt === "go back") {
    theResponse = "You left the classroom and are now back upstairs. \n";
    currentRoom = "182 Main St - Upstairs";
  }

  return theResponse;
};

// Get Response Muddy
const getResponseMuddy = thePrompt => {
  let theResponse = "";

  if (
    (thePrompt === "coffee" || thePrompt === "get coffee") &&
    playerInventory.includes("coffee") === false
  ) {
    theResponse = "You now have a coffee in your inventory. \n";
    playerInventory.push("coffee");
  } else if (thePrompt === "coffee" || thePrompt === "get coffee") {
    theResponse = "You already have coffee. \n";
  } else if (thePrompt === "go back") {
    theResponse = "You left Muddy Waters and are now at 182 Main St. \n";
    currentRoom = "182 Main St";
  }

  return theResponse;
};

// Get Response Mikes
const getResponseMikes = thePrompt => {
  let theResponse = "";

  if (
    (thePrompt === "pizza" || thePrompt === "get pizza") &&
    playerInventory.includes("pizza") === false
  ) {
    theResponse =
      "You now have pizza in your inventory. Eat it to stop the growling. \n";
    playerInventory.push("pizza");
  } else if (
    (thePrompt === "eat it" || thePrompt === "eat pizza") &&
    playerInventory.includes("pizza") === true
  ) {
    theResponse = "You have eaten the pizza and are no longer hungry. \n";
    roomInventory.push(
      playerInventory.splice(playerInventory.indexOf("pizza"), 1)
    );
    status = "";
  } else if (thePrompt === "pizza" || thePrompt === "get pizza") {
    theResponse = "You already have pizza. \n";
  } else if (thePrompt === "go back") {
    theResponse = "You left Mr Mikes and are now at 182 Main St. \n";
    currentRoom = "182 Main St";
  }

  return theResponse;
};

// Get Response
const getResponse = (thePrompt, theRoom) => {
  let theResponse = "";

  thePrompt = thePrompt.toLowerCase();

  if (globalResponses.includes(thePrompt) === true) {
    theResponse = getResponseGlobal(thePrompt);
  } else if (theRoom === "182 Main St") {
    theResponse = getResponseMainSt(thePrompt);
  } else if (theRoom === "182 Main St - Foyer") {
    theResponse = getResponseMainStFoyer(thePrompt);
  } else if (theRoom === "182 Main St - Upstairs") {
    theResponse = getResponseMainStUpstairs(thePrompt);
  } else if (theRoom === "182 Main St - Classroom") {
    theResponse = getResponseMainStClassroom(thePrompt);
  } else if (theRoom === "Muddy") {
    theResponse = getResponseMuddy(thePrompt);
  } else if (theRoom === "Mikes") {
    theResponse = getResponseMikes(thePrompt);
  }

  if (theResponse === "") {
    theResponse = "Sorry, I don't know how to " + thePrompt + ". \n";
  }

  return theResponse;
};

start();

async function start() {
  let prompt = "start";

  currentRoom = "182 Main St";

  while (prompt.toLowerCase() !== "exit") {
    if (status === "hungry") {
      prompt = await ask("*** GROWL ***\n" + getResponse(prompt, currentRoom));
    } else {
      prompt = await ask(getResponse(prompt, currentRoom));
    }
  }

  console.log("Thanks for playing!");
  process.exit();
}
