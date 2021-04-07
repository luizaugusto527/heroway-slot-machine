// valor disponível para aposta
const availableToBet = 500;

// itens para aposta
const items = [{
    id: 1,
    reward: 1000,
    name: 'Batman',
    src: './assets/img/batman.png',
}, {
    id: 2,
    reward: 120,
    name: 'SpiderMan',
    src: './assets/img/spiderman.png',
}, {
    id: 3,
    reward: -40,
    name: 'Deadpool',
    src: './assets/img/deadpool.png',
}, {
    id: 4,
    reward: -5000,
    name: 'Bomb',
    src: './assets/img/bomb.png',
}, ];
// Declaração de variaives usadas 
const button = document.querySelector('.spin-button');
const slots = document.querySelectorAll('.slot-item');
const balance = document.querySelector('#balance');
const title = document.querySelector('#title');
let number = items.length;
let eventSlots;
let money = availableToBet;

balance.innerHTML = `${availableToBet}`;
button.addEventListener('click', () => {
    button.disabled = true;
    if (money <= 0) {
        title.innerHTML = `YOU DON'T HAVE ENOUGH MONEY`;
        return
    }
    getBet();
    moneyCoast();

})

function moneyCoast() {
    money -= 5;
    balance.innerHTML = `${money}`;
}

function getBet() {
    const shuffle = setInterval(() => {
        slots.forEach((value, key) => {
            eventSlots = slots[key]
            let random = randomNumber(number);
            randomImg(eventSlots, random);
        })
    }, 300);
    stopBet(shuffle);

}

function randomNumber(num) {
    let number = Math.floor(Math.random() * num)
    return number
}

function randomImg(eventSlots, random) {
    eventSlots.src = items[random].src;
    eventSlots.alt = items[random].name;

}

function stopBet(e) {
    setTimeout(() => {
        clearInterval(e)
        checkWinner();
        button.disabled = false;
    }, 2000);
}


function checkWinner() {

    const [a, b, c] = slots;
    if (a.src == b.src && b.src == c.src) {
        for (let index in items) {
            if (eventSlots.alt == items[index].name) {
                money += items[index].reward
                balance.innerHTML = `${money}`;
                changeTitle(items[index]);
            }
        }
    } else {
        setTimeout(() => {
            title.innerHTML = `HERO MACHINE`;
        }, 700);
        title.innerHTML = `TRY AGAIN`;
    }
}

function changeTitle(items) {
    setTimeout(() => {
        title.innerHTML = `HERO MACHINE`;
    }, 2000);
    title.innerHTML = `You received $ ${items.reward}`;
}