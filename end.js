const username = document.getElementById("username");
const saveScoreButton = document.getElementById("saveScoreButton");
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");
finalScore.innerText = mostRecentScore;

username.addEventListener("keyup", () => {
    saveScoreButton.disabled = !username.value;
})

saveHighScore = (event) => {
    console.log("Clicked the save button!")
    event.preventDefault();
}