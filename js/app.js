const charLength = document.querySelector("#char-length");
const checkboxes = document.querySelectorAll("input[name='options']");
const copyButton = document.querySelector("#copy-button");
const copyText = document.querySelector("#copy-text");
const passwordGenerator = document.querySelector("#password-generator");
const passwordString = document.querySelector("#password-string");
const rangeLength = document.querySelector("#length");
const strengthBars = document.querySelectorAll(".strength-bar");
const strengthText = document.querySelector("#strength-text");

const uppercaseCharacters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const lowercaseCharacters = uppercaseCharacters.map((char) =>
  char.toLowerCase()
);

const numberCharacters = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const symbolCharacters = [
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "_",
  "-",
  "+",
  "=",
  "{",
  "[",
  "}",
  "]",
  "|",
  ":",
  ";",
  "<",
  ">",
  "?",
  "/",
];

charLength.textContent = rangeLength.value;

rangeLength.addEventListener("change", () => {
  charLength.textContent = rangeLength.value;
});

copyButton.addEventListener("click", () => {
  navigator.clipboard.writeText(passwordString.textContent);
  copyText.classList.add("active");
  setTimeout(() => {
    copyText.classList.remove("active");
  }, 2000);
});

passwordGenerator.addEventListener("submit", (e) => {
  e.preventDefault();
  strengthBars.forEach((ele) => {
    ele.className = "strength-bar";
  });
  const passwordLength = rangeLength.value;
  const characterList = [];
  let numberChecked = 0;
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      numberChecked++;
      characterList.push(
        ...(checkbox.value === "uppercase"
          ? uppercaseCharacters
          : checkbox.value === "lowercase"
          ? lowercaseCharacters
          : checkbox.value === "numbers"
          ? numberCharacters
          : symbolCharacters)
      );
    }
  });
  // TODO: Prevent form from submitting if password length is 0 or no boxes checked
  if (passwordLength === 0 || numberChecked === 0) {
    return;
  }
  // TODO: guarantee at least 1 of each character type
  const passwordCharacters = [];
  for (let i = 0; i < passwordLength; i++) {
    const randomNumber = Math.floor(Math.random() * characterList.length);
    passwordCharacters.push(characterList[randomNumber]);
  }
  let strengthClass;
  let strengthClassText;
  if (passwordLength < 8 || numberChecked === 1) {
    numberChecked = 1;
    strengthClass = "strength-too-weak";
    strengthClassText = "Too weak!";
  } else if (numberChecked === 2) {
    strengthClass = "strength-weak";
    strengthClassText = "Weak";
  } else if (numberChecked === 3) {
    strengthClass = "strength-medium";
    strengthClassText = "Medium";
  } else if (numberChecked === 4) {
    strengthClass = "strength-strong";
    strengthClassText = "Strong";
  }
  for (let i = 0; i < numberChecked; i++) {
    strengthBars[i].classList.add(strengthClass);
  }
  strengthText.textContent = strengthClassText;
  passwordString.classList.add("active");
  passwordString.textContent = passwordCharacters.join("");
});
