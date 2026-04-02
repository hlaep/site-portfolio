const background = document.getElementById("background");
const CHARACTERS_SET = ["!=", "==", "( )", "[ ]", "{ }", "</>", "i"];

const CHARACTER_SIZE = 32;

function getCharactersAmount() {
  const backgroundStyles = window.getComputedStyle(background);
  //get character space
  const gap = parseFloat(backgroundStyles.gap);
  const characterSpace = CHARACTER_SIZE + gap;
  //get amount per row
  const animationAreaWidth = parseFloat(backgroundStyles.width) + gap; // The last element doesn't have a gap. that's why this + gap
  const amountPerRow = Math.floor(animationAreaWidth / characterSpace);
  //get amount per column
  const animationAreaHeight = parseFloat(backgroundStyles.width) + gap; // The last element doesn't have a gap. that's why this + gap
  const amountPerColumn = Math.floor(animationAreaWidth / characterSpace);

  return amountPerColumn * amountPerRow;
}

function getRandomizedCharacter() {
  const randomIndex = Math.floor(Math.random() * CHARACTERS_SET.length);
  return CHARACTERS_SET[randomIndex];
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        console.log("Character overflowed background");
        observer.unobserve(entry.target);
        entry.target.remove();
      }
    });
  },
  { root: background, threshold: 0 },
);

function drawCharacter() {
  const characterDiv = document.createElement("div");
  characterDiv.className = "character";
  characterDiv.innerText = getRandomizedCharacter();
  observer.observe(characterDiv);
  background.appendChild(characterDiv);
}

function fillBackground() {
  const necessaryAmount = getCharactersAmount;
  for (let i = 0; i < necessaryAmount; i++) {
    drawCharacter();
  }
}

fillBackground();
