const trigger = [
    //0
    ["hi", "hey", "hello"],
    //1
    ["how are you", "how are things"],
    //2
    ["Do you want a treat?", "what is up"],
    //3
    ["happy", "good", "well", "fantastic", "cool"],
    //4
    ["bad", "bored", "tired", "sad"],
    //5
    ["do you want to play?", "Can we go to the park?"],
    //6
    ["thanks", "thank you"],
    //7
    ["bye", "good bye", "goodbye"]
];

const reply = [
    //0
    ["Hello!", "Hi!", "Hey!", "Hi there!"],
    //1
    ["Fine...how are you?", "Pretty well, how are you?", "Fantastic, how are you?"],
    //2
    ["Yes, right now", "That's a cats treat, yuck."],
    //3
    ["I like bones. Do you like bones?"],
    //4
    ["Why?", "Cheer up buddy", "You want a bone?"],
    //5
    ["Yeah, lets play ball.", "Yeah, lets go for a walk."],
    //6
    ["You're welcome", "I wanna lick your face."],
    //7
    ["Goodbye", "See you later"]

];

const alternative = [
    "ruff... ruff...", "Go on...", "Squirrel!!!!!!!!", "I'm listening...", "BIRDS!!!!"
];

const robot = ["Am I cute?", "I am not a bot, I'm a puppy", "Please snuggle me"];



document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.getElementById("input")
    inputField.addEventListener("keydown", function (e) {
        if (e.code === "Enter") {
            let input = inputField.value;
            inputField.value = "";
            output(input);
        }
    });
});

function output(input) {
    let product;
    let text = input.toLowerCase().replace(/[^\w\s\d]/gi, "");
    text = text
        .replace(/ a /g, " ")
        .replace(/i feel /g, "")
        .replace(/whats/g, "What is")
        .replace(/please /g, "")
        .replace(/ please/g, "");

    //compare arrays

    if (compare(trigger, reply, text)) {
        product = compare(trigger, reply, text);
    } else if (text.match(/robot/gi)) {
        product = robot[Math.floor(Math.random() * robot.length)];
    } else {
        product = alternative[Math.floor(Math.random() * alternative.length)];
    }
    //update DOM
    addChat(input, product);
}

function compare(triggerArray, replyArray, text) {
    let item;
    for (let x = 0; x < triggerArray.length; x++) {
        for (let y = 0; y < replyArray.length; y++) {
            if (triggerArray[x][y] == text) {
                items = replyArray[x];
                item = items[Math.floor(Math.random() * items.length)];
            }
        }
    }
    return item;
}

function addChat(input, product) {
    const mainDiv = document.getElementById("main");
    let userDiv = document.createElement("div");
    userDiv.id = "user";
    userDiv.innerHTML = `New Friend: <span id="bot-response">${input}</span>`;
    mainDiv.appendChild(userDiv);

    let botDiv = document.createElement("div");
    botDiv.id = "bot";
    botDiv.innerHTML = `Dasher: <span id="bot-response">${product}</span>`;
    mainDiv.appendChild(botDiv);
    speak(product);
}

const synth = window.speechSynthesis;
let voices = synth.getVoices();

function speak(string) {
    let u = new SpeechSynthesisUtterance(string);
    u.text = string;
    u.lang = "en-US";
    u.volume = 1;
    u.rate = 1;
    u.pitch = 1;
    synth.speak(u);
}