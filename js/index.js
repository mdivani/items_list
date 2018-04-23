//set items from local storage or empty array if storage is null
let items = JSON.parse(localStorage.getItem('items')) || [];
//get reference to items container
const itemList = document.getElementById('item-list');

//get data from input fields and return item object
const createItem = () => {
  const itemName = document.getElementById('item-name').value;
  const itemFirst = document.getElementById('item-first').value || '';
  const itemSecond = document.getElementById('item-second').value || '';
  const itemThird = document.getElementById('item-third').value || '';
  return  {
        name: itemName,
        first: itemFirst,
        second: itemSecond,
        third: itemThird
      };
}
//add item to items array, localstorage and DOM
const addToCommonList = (item) => {
  //check if item fields are empty or item with name already exists
  if(validateItem(item) && checkIfEmpty(item)) {
    items.push(item);
    localStorage.setItem('items', JSON.stringify(items));
    addItemToList(item);
    document.getElementById('item-name').value = '';
    document.getElementById('item-first').value = '';
    document.getElementById('item-second').value = '';
    document.getElementById('item-third').value = '';
  }
}

//add item to DOM list
const addItemToList = (item) => {
  const table = document.createElement('table');
  table.setAttribute('class', 'item-table');
  table.setAttribute('id', item.name);
  for (let property in item) {
    if (item.hasOwnProperty(property)) {
      const newRow = document.createElement('tr');
      newRow.setAttribute('class', 'item-table__row');
      const newData = document.createElement('td');
      newData.setAttribute('class', 'item-table__data');
      const newDataHeader = document.createElement('td');
      newDataHeader.setAttribute('class', 'item-table__data item-table__data--header');
      newDataHeader.appendChild(document.createTextNode(property));
      newData.appendChild(document.createTextNode(item[property]));
      newRow.appendChild(newDataHeader);
      newRow.appendChild(newData);
      table.appendChild(newRow);
    }
  }
  itemList.appendChild(table);
}

//gets called on items form submit
const onItemSubmit = (e) => {
  e.preventDefault();
  const item = createItem()
  addToCommonList(item);
} 

//return false if item already exists
const validateItem = (item) => {
   for(let i = 0; i < items.length; i++) {
     if(items[i].name === item.name) {
       return false;
     }
   }
   return true;
}

//return false if any submit item field is empty
const checkIfEmpty = (item) => {
   if(!item.name || !item.second || !item.third || !item.first) {
     return false;
   }
   return true;
}

//set items from local storage
const load = () => {
    if(items.length > 0) {
      items.forEach((item) => {
        addItemToList(item);
    });
  }
}

//attach event to form submit
const form = document.getElementsByTagName('form')[0];
form.addEventListener('submit', onItemSubmit);

load();