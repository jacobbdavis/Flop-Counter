
// DOM Elements
const usernameInput = document.getElementById('username-input');
const addBtn = document.getElementById('add-btn');
const countersList = document.getElementById('counters-list');

// State
let users = [];

// Functions
// Functions
function init() {
    loadFromStorage();
    usernameInput.focus();
    renderUsers();
}

function saveToStorage() {
    localStorage.setItem('flopCounterUsers', JSON.stringify(users));
}

function loadFromStorage() {
    const storedUsers = localStorage.getItem('flopCounterUsers');
    if (storedUsers) {
        try {
            users = JSON.parse(storedUsers);
        } catch (e) {
            console.error('Failed to parse users from storage', e);
            users = [];
        }
    }
}

function addUser() {
    const name = usernameInput.value.trim();
    if (name) {
        const newUser = {
            id: Date.now(),
            name: name,
            count: 0
        };
        users.push(newUser);
        saveToStorage(); // Save after adding
        usernameInput.value = '';
        renderUsers();
        usernameInput.focus();
    } else {
        // Visual feedback for empty input
        usernameInput.style.borderColor = '#f72585';
        setTimeout(() => usernameInput.style.borderColor = '', 500);
    }
}

function updateCounter(userId, change) {
    const user = users.find(u => u.id === userId);
    if (user) {
        user.count += change;
        saveToStorage(); // Save after update
        renderUserCard(user); // Re-render just this card or update value
    }
}

function renderUsers() {
    if (users.length === 0) {
        countersList.innerHTML = '<div class="empty-state">No users added yet.</div>';
        return;
    }

    countersList.innerHTML = '';
    users.forEach(user => {
        const card = document.createElement('div');
        card.className = 'user-card';
        card.id = `user-${user.id}`;
        card.innerHTML = `
      <button class="delete-btn" data-action="delete" data-id="${user.id}" aria-label="Delete User">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <h2 class="user-name" title="${user.name}">${user.name}</h2>
      <div class="counter-controls">
        <button class="btn icon-btn" data-action="decrement" data-id="${user.id}" aria-label="Decrease">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <span class="count-value">${user.count}</span>
        <button class="btn icon-btn" data-action="increment" data-id="${user.id}" aria-label="Increase">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    `;
        countersList.appendChild(card);
    });
}

function renderUserCard(user) {
    const card = document.getElementById(`user-${user.id}`);
    if (card) {
        const valueSpan = card.querySelector('.count-value');
        valueSpan.textContent = user.count;

        // Animation
        valueSpan.animate([
            { transform: 'scale(1.2)' },
            { transform: 'scale(1)' }
        ], {
            duration: 200,
            easing: 'ease-out'
        });
    }
}

function deleteUser(userId) {
    const card = document.getElementById(`user-${userId}`);
    if (card) {
        // Animation before removal
        card.style.transform = 'scale(0.9)';
        card.style.opacity = '0';
        setTimeout(() => {
            users = users.filter(u => u.id !== userId);
            saveToStorage(); // Save after delete
            renderUsers();
        }, 300);
    } else {
        users = users.filter(u => u.id !== userId);
        saveToStorage(); // Save after delete
        renderUsers();
    }
}

// Event Listeners
addBtn.addEventListener('click', addUser);

usernameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addUser();
    }
});

// Event delegation for counters
countersList.addEventListener('click', (e) => {
    // Check for delete button first (or icon inside it)
    const delBtn = e.target.closest('.delete-btn');
    if (delBtn) {
        const id = parseInt(delBtn.dataset.id);
        deleteUser(id);
        return;
    }

    const btn = e.target.closest('.icon-btn');
    if (!btn) return;

    const action = btn.dataset.action;
    const id = parseInt(btn.dataset.id);

    if (action === 'increment') {
        updateCounter(id, 1);
    } else if (action === 'decrement') {
        updateCounter(id, -1);
    }
});

// Initialize
init();
