function onaddexpense(event) {
  event.preventDefault();
  let amount = document.getElementById('amount').value;
  let description = document.getElementById('description').value;
  let category = document.getElementById('category').value;

  let expense = {
      amount: amount,
      description: description,
      category: category
  };

  axios.post('http://localhost:3000/expense/add-expense', expense)
      .then(response => {
          const newExpense = response.data.newExpenseDetails;

          if (newExpense.id !== undefined) {
              console.log(newExpense);
              showExpenseOnScreen(newExpense);
          } else {
              console.error('Invalid expense ID: undefined');
          }
      })
      .catch(err => {
          document.body.innerHTML += "<h4>Something Went Wrong</h4>";
          console.error(err);
      });
}


  window.addEventListener("DOMContentLoaded", () => {
    axios.get('http://localhost:3000/expense/get-expense') 
      .then(response => {
        console.log(response);
        for (let i = 0; i < response.data.allExpenses.length; i++) {
            const expense = response.data.allExpenses[i];
            showExpenseOnScreen(expense); 
        }
      })
      .catch(err => {
        console.log(err);
      })
  });
  
  

  function showExpenseOnScreen(expense) {
    let parentElement = document.getElementById('history');
    let childElement = document.createElement('li');
    childElement.id = `expense-${expense.id}`;
    childElement.innerText = `${expense.amount} - ${expense.description} - ${expense.category}`;

    var deleteBtn = document.createElement('input');
    deleteBtn.type = 'button';
    deleteBtn.value = 'Delete';

    deleteBtn.onclick = () => {
      if (typeof expense.id !== 'undefined') {
          let expenseId = expense.id;
          axios.delete(`http://localhost:3000/expense/delete-expense/${expenseId}`)
              .then(() => {
                  removeExpenseFromScreen(expenseId);
              })
              .catch((err) => {
                  console.log(err);
              });
      } else {
          console.error('Invalid expense ID: undefined');
      }
  }
  
    

    var edit = document.createElement('input');
    edit.type = 'button';
    edit.value = 'Edit';

    edit.onclick = () => {
        let editexpense = JSON.parse(localStorage.getItem(expense.description));
        document.getElementById('amount').value = editexpense.amount;
        document.getElementById('description').value = editexpense.description;
        document.getElementById('category').value = editexpense.category;

        localStorage.removeItem(expense.description);
        parentElement.removeChild(childElement);
    }

    childElement.appendChild(edit);
    childElement.appendChild(deleteBtn);
    parentElement.appendChild(childElement);
}

function removeExpenseFromScreen(expenseId) {
    const parentNode = document.getElementById('history');
    const childNodeToBeDeleted = document.getElementById(`expense-${expenseId}`);
    if (childNodeToBeDeleted) {
        parentNode.removeChild(childNodeToBeDeleted);
    }
}

