const possibleSpaces = [
    'Tree lighting',
    'Old flame',
    'Small town',
    'Visible whipped cream on holiday drink',
    'Classic Scotland scarf',
    'Animal dressed Christmassy',
    'More than one wreath in background of scene',
    'Oversize ornaments',
    'Kissing under mistletoe',
    'A change of heart',
    'Job offer',
    'Magically starts snowing',
    'Snow globe',
    'Skating',
    'Toboganning',
    'Protagonists sing Christmas carols',
    'Christmas concert',
    'Sitting around fireplace',
    'Stormed in',
    'Buy Christmas tree',
    'Make cookies',
    'Gingerbread',
    'Interrupted travel plans',
    'Parent interfering with love life',
    'Annual holiday party',
    'Single parent',
    'Child hungry',
    'Child lost',
    'Enters contest',
    'Turkey dinner',
    'Workaholic',
    '"This might be crazy but..."',
    '"It\'s not Christmas without..."',
    'Throwing snowballs',
    'Charity event',
    'Volunteering at an event',
    'Marriage proposal',
    'Dancing',
    'Two different love interests',
    '"U" patterned Christmas sweater',
    'Clashing people team up',
    'Falling on ice',
    'Homemade ornament',
    'Talking to animals',
    'Grand gesture',
    'Apologize for a kiss',
    'Couple runs into each other',
    'White toque',
]

const NUMBER_OF_SPACES = 25;
const LS_GREENS_KEY = "greens";
const LS_SPACES_KEY = "spaces";
const LS_SCORE_KEY = "score";

window.onload = function () {
    if (!localStorage.getItem(LS_SCORE_KEY)) {
        localStorage.setItem(LS_SCORE_KEY, 0);
    }
    document.getElementById('score').innerHTML = localStorage.getItem(LS_SCORE_KEY);
    document.getElementById('reset-btn').addEventListener('click', () => {
        localStorage.setItem(LS_SCORE_KEY, 0);
        document.getElementById('score').innerHTML = localStorage.getItem(LS_SCORE_KEY);
        reset();
    });
    resetListOfPossibleSpaces();
    if (localStorage.getItem(LS_GREENS_KEY) && localStorage.getItem(LS_SPACES_KEY)) {
        generateCard(JSON.parse(localStorage.getItem(LS_SPACES_KEY)), new Set(JSON.parse(localStorage.getItem(LS_GREENS_KEY))));
        return;
    }
    reset();
}

function reset() {
    let drawSpace = possibleSpaces;
    let draws = drawSpace.sort(() => Math.random() - 0.5).slice(0, NUMBER_OF_SPACES);
    draws[Math.floor(NUMBER_OF_SPACES / 2)] = 'Free';
    localStorage.setItem(LS_GREENS_KEY, JSON.stringify([]));
    localStorage.setItem(LS_SPACES_KEY, JSON.stringify(draws));
    generateCard(draws, new Set());
}

function resetListOfPossibleSpaces() {
    const listOfPossibleSpacesEl = document.getElementById('possible-spaces');
    listOfPossibleSpacesEl.innerHTML = '';
    possibleSpaces.forEach(possibleSpace => {
        listOfPossibleSpacesEl.innerHTML += '<li class="m-1 lg:text-md text-xl text-slate-200">' + possibleSpace + ' | </li>';
    });
}

function generateCard(draws) {
    const listOfSpacesEl = document.getElementById('spaces');
    listOfSpacesEl.innerHTML = '';
    draws.forEach((draw, index) => listOfSpacesEl.innerHTML += '<button class="lg:h-32 h-48 m-1 p-1 lg:text-lg text-3xl lg:rounded rounded-lg border" id="space-' + index + '">' + draw + '</button>');
    for (let i = 0; i < NUMBER_OF_SPACES; i++) {
        let el = document.getElementById('space-' + i);
        if (i === Math.floor(NUMBER_OF_SPACES / 2)) {
            toGreen(el);
            continue;
        }
        if (new Set(JSON.parse(localStorage.getItem(LS_GREENS_KEY))).has(el.id)) {
            toGreen(el);
        } else {
            toRed(el);
        }
        el.addEventListener('click', (event) => {
            toggle(event.target, new Set(JSON.parse(localStorage.getItem(LS_GREENS_KEY))));
            checkWinCondition();
        });
    }
}

function toggle(el, greens) {
    if (greens.has(el.id)) {
        toRed(el);
    } else {
        toGreen(el);
    }
}

function toGreen(el) {
    el.style.color = 'rgb(20 83 45)';
    el.style.borderColor = 'rgb(20 83 45)';
    el.style.backgroundColor = 'rgb(187 247 208)';
    let greens = new Set(JSON.parse(localStorage.getItem(LS_GREENS_KEY)));
    greens.add(el.id);
    localStorage.setItem(LS_GREENS_KEY, JSON.stringify(Array.from(greens)));
}

function toRed(el) {
    el.style.color = 'rgb(153 27 27)';
    el.style.borderColor = 'rgb(153 27 27)';
    el.style.backgroundColor = 'rgb(254 242 242)';
    let greens = new Set(JSON.parse(localStorage.getItem(LS_GREENS_KEY)));
    greens.delete(el.id);
    localStorage.setItem(LS_GREENS_KEY, JSON.stringify(Array.from(greens)));
}

function checkWinCondition() {
    const greens = JSON.parse(localStorage.getItem(LS_GREENS_KEY));
    if (greensInLine(greens)) {
        document.getElementById('confetti-container').innerHTML = `
        <div class="confetti">
            <div class="confetti-piece"></div>
            <div class="confetti-piece"></div>
            <div class="confetti-piece"></div>
            <div class="confetti-piece"></div>
            <div class="confetti-piece"></div>
            <div class="confetti-piece"></div>
            <div class="confetti-piece"></div>
            <div class="confetti-piece"></div>
            <div class="confetti-piece"></div>
            <div class="confetti-piece"></div>
            <div class="confetti-piece"></div>
            <div class="confetti-piece"></div>
            <div class="confetti-piece"></div>
        </div>`;
        localStorage.setItem(LS_SCORE_KEY, parseInt(localStorage.getItem(LS_SCORE_KEY)) + 1);
        document.getElementById('score').innerHTML = localStorage.getItem(LS_SCORE_KEY);
        setTimeout(() => {
            document.getElementById('confetti-container').innerHTML = '';
            reset();
        }, 5000);
    }
}

function greensInLine(greens) {
    const indicies = greens.map(g => parseInt(g.slice('space-'.length)));
    return horizontalLine(indicies) ||
        verticalLine(indicies) ||
        diagonalLine(indicies);
}

// god will frown upon what he hath sought henceforth

function horizontalLine(indicies) {
    return (
        indicies.includes(0) &&
        indicies.includes(1) &&
        indicies.includes(2) &&
        indicies.includes(3) &&
        indicies.includes(4)
    ) || (
            indicies.includes(5) &&
            indicies.includes(6) &&
            indicies.includes(7) &&
            indicies.includes(8) &&
            indicies.includes(9)
        ) || (
            indicies.includes(10) &&
            indicies.includes(11) &&
            indicies.includes(12) &&
            indicies.includes(13) &&
            indicies.includes(14)
        ) || (
            indicies.includes(15) &&
            indicies.includes(16) &&
            indicies.includes(17) &&
            indicies.includes(18) &&
            indicies.includes(19)
        ) || (
            indicies.includes(20) &&
            indicies.includes(21) &&
            indicies.includes(22) &&
            indicies.includes(23) &&
            indicies.includes(24)
        );
}

function verticalLine(indicies) {
    return (
        indicies.includes(0) &&
        indicies.includes(5) &&
        indicies.includes(10) &&
        indicies.includes(15) &&
        indicies.includes(20)
    ) || (
            indicies.includes(1) &&
            indicies.includes(6) &&
            indicies.includes(11) &&
            indicies.includes(16) &&
            indicies.includes(21)
        ) || (
            indicies.includes(2) &&
            indicies.includes(7) &&
            indicies.includes(12) &&
            indicies.includes(17) &&
            indicies.includes(22)
        ) || (
            indicies.includes(3) &&
            indicies.includes(8) &&
            indicies.includes(13) &&
            indicies.includes(18) &&
            indicies.includes(23)
        ) || (
            indicies.includes(4) &&
            indicies.includes(9) &&
            indicies.includes(14) &&
            indicies.includes(19) &&
            indicies.includes(24)
        );
}

function diagonalLine(indicies) {
    return (
        indicies.includes(0) &&
        indicies.includes(6) &&
        indicies.includes(12) &&
        indicies.includes(18) &&
        indicies.includes(24)
    ) || (
            indicies.includes(4) &&
            indicies.includes(8) &&
            indicies.includes(12) &&
            indicies.includes(16) &&
            indicies.includes(20)
        );
}
