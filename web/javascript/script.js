let motorbikes = []; //motorbikes list
const motorbikesDOM = document.getElementById("motorbikes"); //main content is added in here
let id; // motorbike id

// GETS data from server url in json format
// on click functionality
async function getMotorbikes() {
    try {
        const res = await fetch("/json/motorbikes"); //fetch use a logical way to receive asynch. info in network.
        if (res.ok) {
            motorbikes = await res.json();
            showMotorbikes();
        } else {
            alert("Error:" + res.status);
        }
    } catch (err) {
        alert("Error:" + err.message);
    }
}

// visible content 
function showMotorbikes() {
    cleanNode(motorbikesDOM);

    const ul = document.createElement("ul");
    for (const motorbike of motorbikes) {
        const li = document.createElement("li");
        const b = document.createElement("b");
        const list = document.createTextNode(
            motorbike.id + " " + motorbike.brand + " " + motorbike.model + " " + motorbike.released,
        );
        b.appendChild(list);
        li.appendChild(b);

        const detailButton = document.createElement("button");
        detailButton.appendChild(document.createTextNode("Details"));
        // entering with button details section
        detailButton.onclick = motorbikeDetails;
        detailButton.attributes.motorbikeId = motorbike.id;
        li.appendChild(detailButton);
        ul.appendChild(li);
    }
    motorbikesDOM.appendChild(ul);
}

// reseting lines like innerHTML = ""
function cleanNode(node) {
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}

// visible content 
function insertMotorbike() {
    cleanNode(motorbikesDOM);

    // motorbikesDOM.appendChild(document.createTextNode("Brand: "));
    let label = document.createElement("label");
    label.innerText = "Brand";
    let input = document.createElement("input");
    input.id = "brand";
    motorbikesDOM.appendChild(label);
    motorbikesDOM.appendChild(input);
    motorbikesDOM.appendChild(document.createElement("br"));

    // motorbikesDOM.appendChild(document.createTextNode("Model: "));
    label = document.createElement("label");
    label.innerText = "Model";
    input = document.createElement("input");
    input.id = "model";
    motorbikesDOM.appendChild(label);
    motorbikesDOM.appendChild(input);
    motorbikesDOM.appendChild(document.createElement("br"));

    // motorbikesDOM.appendChild(document.createTextNode("Released: "));
    label = document.createElement("label");
    label.innerText = "Released";
    input = document.createElement("input");
    input.id = "released";
    motorbikesDOM.appendChild(label);
    motorbikesDOM.appendChild(input);
    motorbikesDOM.appendChild(document.createElement("br"));
    const saveButton = document.createElement("button");
    saveButton.appendChild(document.createTextNode("Save"));
    // functionality of saving new motrobike
    saveButton.onclick = addMotorbike;
    motorbikesDOM.appendChild(saveButton);
    motorbikesDOM.appendChild(document.createElement("br"));
    const cancelButton = document.createElement("button");
    cancelButton.appendChild(document.createTextNode("Cancel"));
    // back to the motrobikes list
    cancelButton.onclick = showMotorbikes;
    motorbikesDOM.appendChild(cancelButton);
}

// function of saving new motrobike
async function addMotorbike() {
    const brand = document.getElementById("brand").value;
    const model = document.getElementById("model").value;
    const released = document.getElementById("released").value;
    if (brand.trim() === "" || model.trim() === "" || isNaN(released)) {
        alert("Wrong data, please correct it");
        return;
    }
    const motorbike = {
        brand,
        model,
        released
    };
    try {
        const res = await fetch("/json/motorbikes/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(motorbike)
        });
        if (res.ok) {
            getMotorbikes();
        } else {
            alert("Error:" + res.status);
        }
    } catch (err) {
        alert("Error:" + err.message);
    }
}
// visible content of motrobikes details
function motorbikeDetails(event) {
    const motorbike = motorbikes.find((e) => e.id === parseInt(event.target.attributes.motorbikeId));
    cleanNode(motorbikesDOM);

    let input;
    if (motorbike) {
        input = document.createElement("input");
        input.id = "id";
        input.type = "hidden";
        input.value = motorbike.id;
        motorbikesDOM.appendChild(input);
    }
    // motorbikesDOM.appendChild(document.createTextNode("Brand: "));
    input = document.createElement("input");
    input.id = "brand";
    input.value = (motorbike) ? motorbike.brand : "";

    motorbikesDOM.appendChild(input);
    motorbikesDOM.appendChild(document.createElement("br"));
    // motorbikesDOM.appendChild(document.createTextNode("Model: "));
    input = document.createElement("input");
    input.id = "model";
    input.value = (motorbike) ? motorbike.model : "";

    motorbikesDOM.appendChild(input);
    motorbikesDOM.appendChild(document.createElement("br"));
    // motorbikesDOM.appendChild(document.createTextNode("Released: "));
    input = document.createElement("input");
    input.id = "released";
    input.value = (motorbike) ? motorbike.released : "";

    motorbikesDOM.appendChild(input);
    motorbikesDOM.appendChild(document.createElement("br"));
    const cancelButton = document.createElement("button");
    cancelButton.appendChild(document.createTextNode("Cancel"));
    cancelButton.onclick = showMotorbikes;
    motorbikesDOM.appendChild(cancelButton);
}