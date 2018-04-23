let items = JSON.parse(localStorage.getItem('items')) || [];
const itemList = document.getElementById('item-list');
const createElement = document.createElement;

const createItem = () => {
  const itemName = document.getElementById('item-name').value;
  const itemFirst = document.getElementById('item-first').value || '';
  const itemSecond = document.getElementById('item-second').value || '';
  const itemThird = document.getElementById('item-third').value || '';
  document.getElementById('item-name').value = '';
  document.getElementById('item-first').value = '';
  document.getElementById('item-second').value = '';
  document.getElementById('item-third').value = '';
  return  {
        name: itemName,
        first: itemFirst,
        second: itemSecond,
        third: itemThird
      };
}

const addToCommonList = (item) => {
  const domLists = Array.from(itemList.getElementsByTagName('div'));
   const itemNames = domLists.map((list) => {
     return list.firstChild.textContent;
  });
  if(itemNames.indexOf(item.name) < 0) {
      items.push(item);
      localStorage.setItem('items', JSON.stringify(items));
      items.forEach((item) => {
      if(itemNames.indexOf(item.name) < 0){
          addItemToList(item);
      }
    });
  }
}

const addItemToList = (item) => {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = '<h3>' + item.name + '</h3>';
  wrapper.setAttribute('class', 'item-wrapper');
  wrapper.setAttribute('id', item.name);
  const newUl = document.createElement('ul');
  newUl.setAttribute('class', 'list hide');
  for (let property in item) {
    if (item.hasOwnProperty(property) && property !== 'name') {
      const newLi = document.createElement('li');
      newLi.setAttribute('class', 'list__item-list');
      newLi.appendChild(document.createTextNode(item[property]));
      newUl.appendChild(newLi);
    }
  }
  wrapper.appendChild(newUl);
  wrapper.addEventListener('click', () => { onWrapperClick(wrapper) });
  itemList.appendChild(wrapper);
}

const onItemSubmit = (e) => {
  e.preventDefault();
  const item = createItem()
  addToCommonList(item);
} 

const onWrapperClick = (wrapper) => {
  const ul = wrapper.childNodes[1];
  ul.classList.toggle('hide');
}

const load = () => {
    if(items.length > 0) {
      items.forEach((item) => {
        addItemToList(item);
    });
  }
}

const form = document.getElementsByTagName('form')[0];
form.addEventListener('submit', onItemSubmit);

load();