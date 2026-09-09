function showMessage() {
    alert("You have no new notifications!");
}

function searchBook() {
    let book = document.getElementById("bookSearch").value;
    let result = document.getElementById("result");

    if (book === "") {
        result.innerHTML = "Please enter a book name.";
    } else {
        result.innerHTML = "Searching for: " + book;
    }
}