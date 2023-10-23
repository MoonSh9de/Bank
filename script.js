'use strict'

//DOM

//Modal window

//Login

document.querySelector('.input__name').value = '';
document.querySelector('.input__pin').value = '';

const btnLogin = document.querySelector('.btn--login');
const modalWindow = document.querySelector('.modal-window');
const overlay = document.querySelector('.overlay');

let currentAccount;

btnLogin.addEventListener('click', function(e) {
    e.preventDefault();
    const inputName = document.querySelector('.input__name').value;
    const inputPin = document.querySelector('.input__pin').value;
    currentAccount = accounts.find((account) => account.nickname === inputName);

    //! Посмотреть optional chaining
    if(currentAccount?.pin === Number(inputPin)) {
        modalWindow.classList.toggle('hidden');
        overlay.classList.toggle('hidden');
        //! Сделать приветствие для Usera
        displayTransactions(currentAccount.transactions);
        displayBalance(currentAccount);
        displayTotal(currentAccount);
        console.log('верно');
    }
    else {

        console.log('неверно');
    }

    // if(inputName === '' || accounts.find((account) => account.nickaname !== inputName))
    // {
    //     document.querySelector('.input__name').value = '';
    //     document.querySelector('.input__name').placeholder = 'Такого имени пользователя нет!';
    // }
    // else document.querySelector('.input__name').style.backgroundColor = 'white';

    // if(inputPin === '' || accounts.find((account) => account.pin.toString() !== inputPin))
    // {
    //     document.querySelector('.input__pin').value = '';
    //     document.querySelector('.input__pin').placeholder = 'Неправильный PIN!';
    // }
    // else document.querySelector('.input__pin').style.backgroundColor = 'white';

    // if(inputName === account1.userName && inputPin === account1.pin.toString())
    // {
    //     console.log('работает');
    //     modalWindow.classList.add('hidden');
    //     overlay.classList.add('hidden');
    // }
});

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labeldepositesTotal = document.querySelector('.total__value--in');
const labelwithdrawalsTotal = document.querySelector('.total__value--out');
const labelinterestTotal = document.querySelector('.total__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerTransactions = document.querySelector('.transactions');

const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


const account1 = {
    userName: 'Cecil Ireland',
    transactions: [500, 250, -300, 5000, -850, -110,-170, 1100],
    interest: 1.5,
    pin: 1111,
};

const account2 = {
    userName: 'Amani Salt',
    transactions: [2000, 6400, -1350, -70, -210, -2000,5500, -30],
    interest: 1.3,
    pin: 2222,
};

const account3 = {
    userName: 'Corey Martinez',
    transactions: [900, -200, 280, 300, -200, 150, 1400, -400],
    interest: 0.8,
    pin: 3333,
};

const account4 = {
    userName: 'Kamile Searle',
    transactions: [530, 1300, 500, 40, 190],
    interest: 1,
    pin: 4444,
};

const account5 = {
    userName: 'Oliver Avile',
    transactions: [630, 800, 300, 50, 120],
    interest: 1.1,
    pin: 5555,
};

const accounts = [account1, account2, account3, account4, account5];

//* Добавление нового свойства nickaname для каждого объекта массива accounts
const createNicknames = function(accs) {
    accs.forEach(function(acc) {
        acc.nickname = acc.userName.toUpperCase().split(' ').map((word) => word[0]).join('');
    })
};

const displayTransactions = function(transactions) {

    containerTransactions.innerHTML = '';
    transactions.forEach(function(trans, index) {

        const transType = trans > 0 ? 'deposit' : 'withdrawal'

        const transactionRow = `<div class="transactions__row">
        <div class="transactions__type transactions__type--${transType}">
        ${transType}
        </div>
        <div class="transactions__value">${trans}</div>
    </div>`
    containerTransactions.insertAdjacentHTML('afterbegin', transactionRow);
    })
}

const displayBalance = function(account) {
    labelBalance.innerHTML = '';
    const balance = account.transactions.reduce((acc, trans) => acc + trans);
    account.balance = balance;
    labelBalance.textContent = `${balance}$` ;
}

const updateUI = function(account) {
    displayTransactions(account.transactions);
    displayBalance(account);
    displayTotal(account);
}
const displayTotal = function(account) {

    labeldepositesTotal.innerHTML = '';
    labelinterestTotal.innerHTML = '';
    labelwithdrawalsTotal.innerHTML = '';


    const depositesTotal = account.transactions
        .filter((trans) => trans > 0)
        .reduce((acc, trans) => acc + trans, 0);

    const withdrawalsTotal = Math.abs(account.transactions.
        filter((trans) => trans < 0)
        .reduce((acc,trans) => acc+ trans, 0));

    const interestTotal = account.transactions
        .filter((trans) => trans > 0)
        .map((dep) => (dep * account.interest / 100))
        .reduce((acc, int) => acc + int, 0);


    labeldepositesTotal.textContent = `${depositesTotal}$`;
    labelwithdrawalsTotal.textContent = `${withdrawalsTotal}$`;
    labelinterestTotal.textContent = `${interestTotal}$`
}

createNicknames(accounts);

btnTransfer.addEventListener('click', function(e) {
    e.preventDefault();

    const transferAmount = Number(inputTransferAmount.value);
    const recipientNickname = inputTransferTo.value;
    const recipientAccount = accounts.find((account) => account.nickname === recipientNickname);
    console.log(transferAmount,recipientAccount);

    inputTransferTo.value = '';
    inputTransferAmount.value = '';

    if(transferAmount > 0 && currentAccount.balance >= transferAmount && recipientAccount && recipientNickname !== currentAccount.nickname) {
        console.log(currentAccount.transactions);
        currentAccount.transactions.push(-transferAmount);
        recipientAccount.transactions.push(transferAmount);
        updateUI(currentAccount);
        console.log(accounts);
    }
});

btnClose.addEventListener('click', function(e) {
    e.preventDefault();
    const closeNicknameAccount = inputCloseUsername.value;
    const clocePinAccount = Number(inputClosePin.value);
    if(currentAccount.nickname === closeNicknameAccount && currentAccount.pin === clocePinAccount) {
        const currentAccountIndex = accounts.findIndex((account) => account.nickname === currentAccount.nickname);
        console.log(currentAccountIndex);
        accounts.splice(currentAccountIndex, 1);
        //! Сделать обнуление всего интерфейса и перехода к другому пользователю
        modalWindow.classList.toggle('hidden');
        overlay.classList.toggle('hidden');
    }
});

//* Займ
//! Сделать сообщение, что денег не хватает
btnLoan.addEventListener('click', function(e) {
    e.preventDefault();
    const loanAmount = Number(inputLoanAmount.value);
    if(loanAmount > 0 && currentAccount.transactions.some((trans) => trans >= loanAmount / 10))
    {
        currentAccount.transactions.push(loanAmount);
        updateUI(currentAccount);
    }
    inputLoanAmount.value = '';
})

