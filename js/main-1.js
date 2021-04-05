const tagsEl = document.querySelector('.random__content--tags');
const textarea = document.querySelector('.random__content--textarea');
const btn = document.querySelector('.random__content--btn');

textarea.focus();

textarea.addEventListener('keyup', (e) => {
    // createTags(e.target.value);
    createTags(textarea.value);

    if (e.key === 'Enter') {
        // when enter is pressed, clear textarea nad trigger randomSelect()
        setTimeout(() => {
            textarea.value = ""
        }, 500);

        randomSelect();
    }
})

btn.addEventListener('click', () => {
    randomSelect();
})

function createTags(input) {
    // console.log(input)

    // taking all the inputs from textarea, split them by comma (','), then filter empty space, and finaly trim all spaces before and after
    const tags = input.split(',')
        .filter(tag => tag.trim() !== "")
        .map(tag => tag.trim());

    console.log(tags)

    tagsEl.innerHTML = '';

    // from every array value, creating a span, and appending to parent
    tags.forEach(tag => {
        const span = document.createElement('span');
        span.innerText = tag;
        span.classList.add('random__content--tags__tag')
        tagsEl.appendChild(span);
    })

    // JUST A FOR LOOP, SAME METHOD AS ABOVE
    // for (let i = 0; i < tags.length; i++) {
    //     const span = document.createElement('span');
    //     span.innerHTML = tags[i];
    //     span.classList.add('random__content--tags__tag');
    //     tagsEl.appendChild(span);
    // }
}

function randomSelect() {

    // check to see, if span array is empty, if it is, just return from function, it not, proceed
    if (document.querySelectorAll('.random__content--tags__tag').length < 2) {
        textarea.value = '';
        tagsEl.innerHTML = '';
        alert('Needs to be two choices minimum for program to work')
        return
    };

    // time duration in ms, in which a program will pick a random span/tag
    const times = 3000;

    const interval = setInterval(() => {

        // creating randomSpan argument, from function
        const randomSpan = pickRandomSpan();
        // highlighting a span
        highlightSpan(randomSpan);

        // Un-highlighting a span
        setTimeout(() => {
            unHighlightSpan(randomSpan);
        }, 100)

    }, 100)

    // stopping the selection and higlighting
    setTimeout(() => {
        clearInterval(interval);
        setTimeout(() => {
            const randomSpan = pickRandomSpan();
            highlightSpan(randomSpan);
        }, 100);
    }, times)
}
// pick random span from nodelist-array
function pickRandomSpan() {
    let spans = document.querySelectorAll('.random__content--tags__tag');
    return spans[Math.floor(Math.random() * spans.length)];
}

function highlightSpan(span) {
    span.classList.add('highlight');
}

function unHighlightSpan(span) {
    span.classList.remove('highlight');
}

