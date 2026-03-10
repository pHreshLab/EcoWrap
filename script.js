// read URL parameters
const params = new URLSearchParams(window.location.search);
const code = params.get("code");

// display the code
if(code){
    document.getElementById("content").innerText =
        "Serial Code: " + code;
} else {
    document.getElementById("content").innerText =
        "No serial code found.";
}