const textarea = document.querySelector('.random__content--textarea');
const spanContainer = document.querySelector('.random__content--tags');
const btnLucky = document.querySelector('.random__content--btn');
const btnClear = document.querySelector('.random__content--btn__clear');

textarea.addEventListener('keyup', (e) => {
    // console.log(textarea.value);
    // console.log(e.target.value)

    createSpan(textarea.value);

    if (e.key === "Enter") {
        // console.log('enter')
        pickRandom()
    }

})

// LUCKY/START BUTTON 
btnLucky.addEventListener('click', () => {
    pickRandom()
})

// CLEAR BUTTON
btnClear.addEventListener('click', () => {
    textarea.value = '';
    createSpan(inputValue = "");
})

function createSpan(inputValue) {

    // FILTER WORDS FOR EMPTY SPACES TYPED
    const textValue = inputValue.split(',')
        .filter(text => text.trim() !== "")
        .map(text => text.trim());
    // console.log(textValue)

    // this commands delete letter by letter typed, it only let whole array words to pass through
    spanContainer.innerHTML = "";

    textValue.forEach(text => {
        let span = document.createElement('span');
        span.innerHTML = text;
        span.classList.add('random__content--tags__tag')
        spanContainer.appendChild(span);
    });
}

function pickRandom() {

    // CHECK TO SEE IF THERE IS AT LEAST TWO ENTERED CHOICES
    if (document.querySelectorAll('.random__content--tags__tag').length < 2) {
        alert('There needs to be at least two choices entered')
        return
    }

    // INTERVAL FOR HIGHLIGHT/UNHIGHLIGHT SPAN'S
    const interval = setInterval(() => {
        let randomSpan = chooseRandomSpan();

        highlightSpan(randomSpan);

        setTimeout(() => {
            unHighlightSpan(randomSpan);
        }, 100);
    }, 100);

    // STOPING INTERVAL AFTER DEFINED TIME
    let time = 3000;

    setTimeout(() => {
        clearInterval(interval);

        setTimeout(() => {
            let randomSpan = chooseRandomSpan();
            highlightSpan(randomSpan);
        }, 200);

    }, time);
}

// CHOOSE A RANDOM SPAN ELEMENT
function chooseRandomSpan() {
    const allSpans = document.querySelectorAll('.random__content--tags__tag');
    return allSpans[Math.floor(Math.random() * allSpans.length)];
}

// HIGHLIGHT SPAN WITH CLASS
function highlightSpan(randomSpan) {
    randomSpan.classList.add('highlight');
}

// UNHIGHLIGHT SPAN
function unHighlightSpan(randomSpan) {
    randomSpan.classList.remove('highlight');
}

