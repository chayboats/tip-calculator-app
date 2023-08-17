const form = document.querySelector('form');
const bill = document.getElementById('bill-amount');
const tipButtonContainer = document.querySelector('.tip-buttons');
const tipButtons = Array.from(tipButtonContainer.children);
const personsTotal = document.getElementById('total-per-person');
const personsTip = document.getElementById('tip-per-person');
const personCount = document.getElementById('number-of-people');

let tipButton;

function handleSubmit() {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    personsTotal.textContent = totalPerPerson();
    personsTip.textContent = tipPerPerson();
  });
}

function inputValue(input) {
  input.addEventListener('change', (event) => {
    input.value = event.target.value;
  });
}

function styleButton() {
  tipButtons.forEach((button) => {
    button.classList.add('unselected');
    button.addEventListener('click', (event) => {
      setSelectedButton(button);
    });
  });
}

function setSelectedButton(selectedButton) {
  tipButtons.forEach((button) => {
    if (button.className.includes('selected')) {
      button.classList.remove('selected');
    }
  });
  tipButton = selectedButton;
  selectedButton.classList.add('selected');
}

function calculateBill() {
  const people = Number(personCount.value);
  const billAmount = Number(bill.value);
  const tipPercent = Number(tipButton.value) / 100;
 
  const tip = billAmount * tipPercent;
  
  return { people, tip, billAmount };
}

function tipPerPerson() {
  const { tip, people } = calculateBill();
  const tipPerPeron = tip / people;
  
  return `$${tipPerPeron.toFixed(2)}`;
}

function totalPerPerson() {
  const { billAmount, tip, people } = calculateBill();
  const total = (billAmount + tip) / people;
  
  return `$${total.toFixed(2)}`;
}

function run() {
  handleSubmit();
  styleButton();
  inputValue(bill);
  inputValue(personCount);
}

personCount.value = 1;
run();
