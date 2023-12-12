const table = document.querySelector('table');
const tableBody = document.querySelector('tbody');
const modal = document.querySelector('.modal');

const renderTable = () => {
  const data = JSON.parse(localStorage.getItem('data')) || [];

  if (data.length === 0) {
    table.classList.add('hidden');
    return;
  }

  table.classList.remove('hidden');

  tableBody.innerHTML = '';

  data.forEach((row) => {
    const trElement = document.createElement('tr');
    const {
      id,
      adults,
      children,
      email,
      name,
      nights,
      phone,
      roomType,
      bedType,
      smoking,
      arrival,
    } = row;

    const tdElement = `
        <td>${arrival}</td>
        <td>${nights}</td>
        <td>${adults}</td>
        <td>${children}</td>
        <td>${roomType}</td>
        <td>${bedType}</td>
        <td>${smoking ? '🚬' : '🚭'}</td>
        <td>${name}</td>
        <td>${email}</td>
        <td>${phone}</td>
        <td>
          <button class="btn btn--delete" data-id="${id}">Delete</button>
        </td>
      `;

    trElement.innerHTML = tdElement;
    tableBody.appendChild(trElement);
  });
};

let id;

tableBody.addEventListener('click', (event) => {
  if (event.target.classList.contains('btn--delete')) {
    modal.classList.remove('hidden');
    id = event.target.dataset.id;
  }
});

modal.addEventListener('click', (event) => {
  if (event.target.classList.contains('btn--confirm')) {
    const data = JSON.parse(localStorage.getItem('data')) || [];
    const filteredData = data.filter((row) => row.id !== Number(id));

    localStorage.setItem('data', JSON.stringify(filteredData));
    renderTable();
    modal.classList.add('hidden');
  }

  if (event.target.classList.contains('btn--cancel')) {
    modal.classList.add('hidden');
  }
});

export default renderTable;
