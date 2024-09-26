let items = [];
let pickedItems = [];

// Load data from localStorage when the page loads
window.onload = function() {
    loadFromLocalStorage();
    updateItemList();
    updatePickedList();
};

function addItem() {
    const input = document.getElementById('itemInput');
    const item = input.value.trim();
    if (item) {
        items.push(item);
        input.value = '';
        updateItemList();
        saveToLocalStorage();
    }
}

function updateItemList() {
    const list = document.getElementById('itemList');
    list.innerHTML = '';
    items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        list.appendChild(li);
    });
}

function pickItem() {
    if (items.length > 0) {
        const randomIndex = Math.floor(Math.random() * items.length);
        const pickedItem = items[randomIndex];
        const result = document.getElementById('result');
        result.textContent = `Your lunch pick: ${pickedItem}`;
        
        pickedItems.push(pickedItem);
        items.splice(randomIndex, 1);
        
        updateItemList();
        updatePickedList();
        saveToLocalStorage();
    } else {
        alert('Please add some items first!');
    }
}

function updatePickedList() {
    const pickedList = document.getElementById('pickedList');
    pickedList.innerHTML = '';
    pickedItems.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        pickedList.appendChild(li);
    });
}

function saveToLocalStorage() {
    localStorage.setItem('lunchItems', JSON.stringify(items));
    localStorage.setItem('pickedLunchItems', JSON.stringify(pickedItems));
}

function loadFromLocalStorage() {
    const savedItems = localStorage.getItem('lunchItems');
    const savedPickedItems = localStorage.getItem('pickedLunchItems');
    
    if (savedItems) {
        items = JSON.parse(savedItems);
    }
    
    if (savedPickedItems) {
        pickedItems = JSON.parse(savedPickedItems);
    }
}