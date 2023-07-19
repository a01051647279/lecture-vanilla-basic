function loadItems() {
  return fetch('data/data.json') //
    .then((response) => response.json())
    .then((json) => json.items)
}

function displayItems(items) {
  const container = document.querySelector('.items')
  container.innerHTML = items.map((item) => createHTMLString(item)).join('')
}

function createHTMLString(item) {
  return `
    <li class="item">
      <img src="${item.image}" alt="${item.type}" class="item__thumbnail" />
      <span class="item__description">${item.gender}, ${item.size}</span>
    </li>`
}

function handleClick(event, items) {
  const { key, value } = event.target.dataset
  if (!(key && value)) return
  displayItems(items.filter((item) => item[key] === value))
}

function setBindEvents(items) {
  const buttons = document.querySelector('.btns')
  buttons.addEventListener('click', (event) => handleClick(event, items))
}

loadItems()
  .then((items) => {
    displayItems(items)
    setBindEvents(items)
  })
  .catch(console.error)
