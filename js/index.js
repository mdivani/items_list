//set items from local storage or empty array if storage is null
let items = JSON.parse(localStorage.getItem('items')) || [];
//get reference to items container
const itemList = document.getElementById('item-list');

//items functionality
//get data from input fields and return item object
const createItem = () => {
  const itemName = document.getElementById('item-name').value;
  const itemFirst = document.getElementById('item-first').value || '';
  const itemSecond = document.getElementById('item-second').value || '';
  const itemThird = document.getElementById('item-third').value || '';
  console.log(itemName);
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
  const newRow = createElement('tr', {
    name: 'class',
    value: 'item-table__row'
  });
  for (let property in item) {
    if (item.hasOwnProperty(property)) {
      const newData = createElement('td', { name: 'class', value: 'item-table__data'});
      appendChildren(newData, [document.createTextNode(item[property])]);
      appendChildren(newRow, [newData]);
    }
  }
  appendChildren(itemList, [newRow]);
}

//gets called on items form submit
const onItemSubmit = (e) => {
  e.preventDefault();
  const item = createItem()
  addToCommonList(item);
} 

//Lists functionality
let selectedItems = [];

const setItems = () => {
  const select = document.getElementById('item-select');
  const options = items.map((item) => {
    const el = createElement('option');
    setAttributes([{name: 'value', value: item.name}, {name: 'label', value: item.name}], el);
    return el;
  });
  appendChildren(select, options);
}

const handleButtonClick = (e) => {
  e.preventDefault();
  const select = document.getElementById('item-select');
  const option = select.options[select.selectedIndex].value;
  const selectedItem = items.filter((item) => item.name === option);
  selectedItems.push(selectedItem[0]);
  addSelectedItem(option);
}

const addSelectedItem = (option) => {
  const list = document.getElementById('selected-items');
  const data = createElement('li', {name: 'textContent', value: option });

  appendChildren(data, [document.createTextNode(option)]);
  appendChildren(list, [data]);
}

const createList = () => {
  const listName = document.getElementById('list-name').value;
  const startDate = document.getElementById('list-start').value.toString();
  const endDate = document.getElementById('list-end').value.toString();

  const table = createListTable(['name', 'start date', 'end date'], [listName, startDate, endDate]);
  const itemsRow = createElement('tr', {name: 'class', value: 'item-table__row'});
  const itemsdata = createElement('td', {name: 'class', value: 'item-table__data item-table__data--nospace'});
  itemsdata.setAttribute('colspan', '3');
  appendChildren(itemsRow, [itemsdata]);
  console.log(selectedItems);
  const itemsTable = createItemTable(selectedItems);
  appendChildren(itemsdata, [itemsTable]);
  appendChildren(table, [itemsRow]);
  return table;
}

const createListTable = (headers, values) => {
  const table = createElement('table', {name: 'class', value: 'item-table'});
  const rowHeader = createElement('tr', {name: 'class', value: 'item-table__row'});
  const rowData = createElement('tr', {name: 'class', value: 'item-table__row'});
  appendChildren(table, [rowHeader]);
  appendChildren(table, [rowData]);
  headers.forEach((headerName) => {
    console.log('header name: ', headerName)
    const header = createElement('th', {name: 'class', value:'item-table__header'});
    const textNode = document.createTextNode(headerName);
    appendChildren(header, [textNode]);
    appendChildren(rowHeader, [header]);
  });
  values.forEach((value) => {
    const data = createElement('td', {name: 'class', value:'item-table__data'});
    const textNode = document.createTextNode(value);
    appendChildren(data, [textNode]);
    appendChildren(rowData, [data]);
  });
  return table;
}

const createItemTable = (items) => {
  const table = createElement('table', {name: 'class', value: 'item-table'});
  const rowHeader = createElement('tr', {name: 'class', value: 'item-table__row'});
  appendChildren(table, [rowHeader]);
  for(let property in items[0]) {
    if(items[0].hasOwnProperty(property)){
      const headerData = createElement('th', {name: 'class', value:'item-table__header'});
      const textNode = document.createTextNode(property);
      appendChildren(headerData, [textNode]);
    }
  }
  
  const dataRows = items.map((item) => {
    const row = createElement('tr', {name: 'class', value: 'item-table__row'});
    for(let property in item) {
      if(item.hasOwnProperty(property)) {
        const data = createElement('th', {name: 'class', value:'item-table__data'});
        appendChildren(data, [document.createTextNode(item[property])]);
        appendChildren(row, [data]);
      }
    }
    return row;
  });

  appendChildren(table, dataRows);
  return table;
}

const onListSubmit = (e) => {
  e.preventDefault();
  const listContainer = document.getElementById('lists');
  const list = createList();
  appendChildren(listContainer, [list]);
}

const clearListForm = () => {
  document.getElementById('list-name').value = '';
  document.getElementById('list-start').value = '';
  document.getElementById('list-end').value = '';

  selectedItems = [];
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

//create elements
const createElement = (element, attr) => {
  const el = document.createElement(element);
  if(attr) {
    el.setAttribute(attr.name, attr.value);
  }
  return el;
}

const setAttributes = (attrs, el) => {
  if(attrs && attrs.length > 0) {
    attrs.forEach((attr) => {
      el.setAttribute(attr.name, attr.value);
    });
  }
}

const appendChildren = (parent, elements) => {
  if(elements.length > 0) {
    elements.forEach((el) => {
      parent.appendChild(el);
    });
  }
}

//set items from local storage
const load = () => {
    if(items.length > 0) {
      setItems();
      items.forEach((item) => {
        addItemToList(item);
    });
  }
}

//attach event to form submit
const listForm = document.getElementsByTagName('form')[0];
const itemForm = document.getElementsByTagName('form')[1];
const btnAdd = document.getElementById('btn-add');
itemForm.addEventListener('submit', onItemSubmit);
listForm.addEventListener('submit', onListSubmit);
btnAdd.addEventListener('click', handleButtonClick);

load();