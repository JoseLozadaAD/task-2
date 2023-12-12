import Validations from './validations.js';
import renderTable from './script-table.js';

const submitButton = document.querySelector('#submitButton');
const resetButton = document.querySelector('#resetButton');
const inputs = document.querySelectorAll(`
  input:not(input[type="submit"],
  input[type="reset"],
  input[type="radio"],
  input[type="checkbox"])`);
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const nightInput = document.querySelector('#nights');
const adultsInput = document.querySelector('#adults');
const phoneInput = document.querySelector('#phone');
const childrenInput = document.querySelector('#children');
const arrivalInput = document.querySelector('#arrival');
const smoking = document.querySelector('input[name="smoking"]');
const errors = document.querySelectorAll('.error');
const nameError = document.querySelector('.error--name');
const emailError = document.querySelector('.error--email');
const phoneError = document.querySelector('.error--phone');
const nightsError = document.querySelector('.error--nights');
const adultsError = document.querySelector('.error--adults');
const childrenError = document.querySelector('.error--children');
const arrivalError = document.querySelector('.error--arrival');
const form = document.getElementById('form');

document.addEventListener('DOMContentLoaded', () => {
  Validations.init(
    nameInput,
    emailInput,
    phoneInput,
    nightInput,
    adultsInput,
    arrivalInput,
    childrenInput,
  );

  renderTable();
});

submitButton.addEventListener('click', (event) => {
  event.preventDefault();
  errors.forEach((error) => error.classList.remove('hidden'));

  nameError.textContent = nameInput.error;
  emailError.textContent = emailInput.error;
  phoneError.textContent = phoneInput.error;
  nightsError.textContent = nightInput.error;
  adultsError.textContent = adultsInput.error;
  childrenError.textContent = childrenInput.error;
  arrivalError.textContent = arrivalInput.error;

  const inputErrors = Array.from(inputs);

  // prettier-ignore
  if (inputErrors.some((input) => input.error !== '' && input.error !== undefined)) {
    return;
  }

  const roomType = document.querySelector('input[name="roomType"]:checked');
  const bedType = document.querySelector('input[name="bedType"]:checked');

  const data = JSON.parse(localStorage.getItem('data')) || [];
  const formData = {
    ...Validations.getValues(),
    id: Date.now(),
    roomType: roomType.value,
    bedType: bedType.value,
    smoking: smoking.checked,
  };

  localStorage.setItem('data', JSON.stringify([...data, formData]));

  form.reset();
  renderTable();
});

resetButton.addEventListener('click', (event) => {
  event.preventDefault();

  errors.forEach((error) => error.classList.add('hidden'));
});

nameInput.addEventListener('input', (event) => {
  const name = event.target.value;
  const validations = new Validations(name, nameInput, nameError);

  return validations.isRequired().build();
});

emailInput.addEventListener('input', (event) => {
  const email = event.target.value;
  const validations = new Validations(email, emailInput, emailError);

  return validations.isRequired().isEmail().build();
});

phoneInput.addEventListener('input', (event) => {
  const phone = event.target.value;
  const validations = new Validations(phone, phoneInput, phoneError);

  return validations.isRequired().isNumber().build();
});

nightInput.addEventListener('input', (event) => {
  const nights = event.target.value;
  const validations = new Validations(nights, nightInput, nightsError);

  return validations
    .isRequired()
    .isNumber()
    .isGreaterThan(100)
    .isLessThan(0)
    .build();
});

adultsInput.addEventListener('input', (event) => {
  const adults = event.target.value;
  const validations = new Validations(adults, adultsInput, adultsError);

  return validations
    .isRequired()
    .isNumber()
    .isGreaterThan(100)
    .isLessThan(0)
    .build();
});

childrenInput.addEventListener('input', (event) => {
  const children = event.target.value;
  const validations = new Validations(children, childrenInput, childrenError);

  return validations.isGreaterThan(100).isLessThan(0).build();
});

arrivalInput.addEventListener('input', (event) => {
  const arrival = event.target.value;
  const validations = new Validations(arrival, arrivalInput, arrivalError);

  return validations.isRequired().build();
});
