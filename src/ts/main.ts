const result = document.getElementById('result') as HTMLElement;
const filter = document.getElementById('filter') as HTMLInputElement;
const listItems = [];

async function getData() {
  const res = await fetch('https://randomuser.me/api?results=50');
  const { results } = await res.json();

  // Clear results
  result.innerHTML = '';

  results.forEach((user) => {
    const li = document.createElement('li');

    listItems.push(li);
    li.innerHTML = `
      <img src="${user.picture.large}" alt="${user.name.first}"/>
      <div class="user-info">
        <h4>${user.name.first} ${user.name.last}</h4>
        <p>${user.location.city}, ${user.location.country}</p>
      </div>
    `;

    result.appendChild(li);
  });
}

function filterData(searchTerm) {
  listItems.forEach((item) => {
    const matchToText = item.innerText
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    if (matchToText) {
      item.classList.remove('hide');
    } else {
      item.classList.add('hide');
    }
  });
}

filter.addEventListener('input', (e) => filterData(e.target.value));

getData();
