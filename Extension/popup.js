 const questionInput = document.getElementById("question");
const askButton = document.getElementById("askButton");
const response = document.getElementById("response");

askButton.addEventListener("click", function () {

    const question = questionInput.value;

    response.textContent = "You asked: " + question;

});