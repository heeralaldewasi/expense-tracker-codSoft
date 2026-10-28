const form = document.getElementById('expense-form');
const list = document.getElementById('expense-list');
const totalAmountSpan = document.getElementById('total-amount');

let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

function renderExpenses() {
    list.innerHTML = '';
    let total = 0;

    expenses.forEach((expense, index) => {
        total += expense.amount;
        
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="expense-info">
                <strong>${expense.name}</strong> 
                <span>${expense.category}</span>
            </div>
            <div style="display: flex; align-items: center; gap: 15px;">
                <strong>₹${expense.amount.toFixed(2)}</strong>
                <button class="delete-btn" onclick="deleteExpense(${index})">✕</button>
            </div>
        `;
        list.appendChild(li);
    });

    totalAmountSpan.innerText = total.toFixed(2);
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('expense-name').value;
    const amount = parseFloat(document.getElementById('expense-amount').value);
    const category = document.getElementById('expense-category').value;

    expenses.push({ name, amount, category });
    
    form.reset();
    renderExpenses();
});

function deleteExpense(index) {
    expenses.splice(index, 1);
    renderExpenses();
}

renderExpenses();