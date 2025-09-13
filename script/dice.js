const diceList = document.querySelectorAll('.dice-list li');
const field = document.querySelector('.field');
const runBtn = document.querySelector('.run-btn');
const resetBtn = document.querySelector('.reset-btn');
const outputResult = document.querySelector('.output-result');
const outputTotal = document.querySelector('.output-total');

const diceSides = {
  "D4": 4,
  "D6": 6,
  "D8": 8,
  "D10": 10,
  "D12": 12,
  "D20": 20,
  "D%": 100
};

// cari dadu di field
function findDice(diceType) {
  return field.querySelector(`[data-dice="${diceType}"]`);
}

// tambah dadu ke field
diceList.forEach(dice => {
  dice.addEventListener('click', () => {
    const diceType = dice.getAttribute('data-dice');
    let diceBox = findDice(diceType);

    if (diceBox) {
      let count = parseInt(diceBox.dataset.count) + 1;
      diceBox.dataset.count = count;
      diceBox.textContent = `${count}${diceType}`;
    } else {
      diceBox = document.createElement('div');
      diceBox.classList.add('dice-output');
      diceBox.setAttribute('data-dice', diceType);
      diceBox.setAttribute('data-count', 1);
      diceBox.textContent = `1${diceType}`;

      diceBox.addEventListener('click', () => diceBox.remove());

      field.appendChild(diceBox);
    }
  });
});

// ini tombol run
runBtn.addEventListener('click', () => {
  const diceBoxes = field.querySelectorAll('.dice-output');
  let results = [];
  let total = 0;

  diceBoxes.forEach(box => {
    const diceType = box.dataset.dice;
    const count = parseInt(box.dataset.count);
    const sides = diceSides[diceType];

    let rolls = [];
    for (let i = 0; i < count; i++) {
      const roll = Math.floor(Math.random() * sides) + 1;
      rolls.push(roll);
      total += roll;
    }

    // contoh: 3D4 (2, 2, 1)
    results.push(`${count}${diceType} (${rolls.join(", ")})`);
  });

  outputResult.textContent = results.join(" + ");
  outputTotal.textContent = total;
});

// tombol reset
resetBtn.addEventListener('click', () => {
  field.innerHTML = "";
  outputResult.textContent = "";
  outputTotal.textContent = "";
});


