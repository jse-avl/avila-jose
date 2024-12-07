let numbers = new Set();

function generateNumber() {
    if (numbers.size >= 99) {
        alert("Todos los números posibles ya han sido generados.");
        return;
    }
    let number;
    do {
        number = Math.floor(Math.random() * 99) + 1;
    } while (numbers.has(number));
    numbers.add(number);
    displayNumbers();
}

function displayNumbers() {
    const numberList = document.getElementById('number-list');
    numberList.innerHTML = '';
    numbers.forEach(num => {
        const div = document.createElement('div');
        div.className = 'number-item';
        div.textContent = num < 10 ? '0' + num : num;
        numberList.appendChild(div);
    });
}

function sortNumbers(order) {
    const sortedNumbers = Array.from(numbers).sort((a, b) => order === 'asc' ? a - b : b - a);
    const numberList = document.getElementById('number-list');
    numberList.innerHTML = '';
    sortedNumbers.forEach(num => {
        const div = document.createElement('div');
        div.className = 'number-item';
        div.textContent = num < 10 ? '0' + num : num;
        numberList.appendChild(div);
    });
}
