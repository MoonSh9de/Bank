'use strict'

//DOM

//Modal window

//Login

document.querySelector('.input__name').value = '';
document.querySelector('.input__pin').value = '';

const btnLogin = document.querySelector('.btn--login');
const modalWindow = document.querySelector('.modal-window');
const overlay = document.querySelector('.overlay');

btnLogin.addEventListener('click', function() {

    const inputName = document.querySelector('.input__name').value;
    const inputPin = document.querySelector('.input__pin').value;

    if(inputName === '' || inputName !== account1.userName )
    {
        document.querySelector('.input__name').value = '';
        document.querySelector('.input__name').placeholder = 'Такого имени пользователя нет!';
    }
    else document.querySelector('.input__name').style.backgroundColor = 'white';

    if(inputPin === '' || inputPin !== account1.pin.toString() )
    {
        document.querySelector('.input__pin').value = '';
        document.querySelector('.input__pin').placeholder = 'Неправильный PIN!';
    }
    else document.querySelector('.input__pin').style.backgroundColor = 'white';

    if(inputName === account1.userName && inputPin === account1.pin.toString())
    {
        console.log('работает');
        modalWindow.classList.add('hidden');
        overlay.classList.add('hidden');
    }
});

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.total__value--in');
const labelSumOut = document.querySelector('.total__value--out');
const labelSumInterest = document.querySelector('.total__value--interest');
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
        ${index+1} ${transType}
        </div>
        <div class="transactions__value">${trans}</div>
    </div>`
    containerTransactions.insertAdjacentHTML('afterbegin', transactionRow);
    })
}

const displayBalance = function(transactions) {
    labelBalance.innerHTML = '';
    const balance = transactions.reduce((acc, trans) => acc + trans)
    labelBalance.textContent = `${balance}$` ;
}

console.log(accounts);

//Вызов функций
createNicknames(accounts);
displayTransactions(account1.transactions);
displayBalance(account1.transactions)