export const possibleSpaces = [
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
    'Job offer in another town',
    'Magically starts snowing',
    'Snow globe',
    'Skating',
    'Toboganning',
    'Protagonists sing christmas carols',
    'Christmas concert',
    'Sitting around fireplace',
    'Stormed in',
    'Buy Christms tree',
    'Make cookies',
    'Gingerbread',
    'Interrupted travel plans',
    'Prent interfering with love life',
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
]

const NUMBER_OF_SPACES = 25;
var greens = new Set();

window.onload = function () {
    resetListOfPossibleSpaces();
    generateCard();
}

function resetListOfPossibleSpaces() {
    const listOfPossibleSpacesEl = document.getElementById('possible-spaces');
    listOfPossibleSpacesEl.innerHTML = '';
    possibleSpaces.forEach(possibleSpace => {
        listOfPossibleSpacesEl.innerHTML += '<li>' + possibleSpace + '</li>';
    });
}

export function generateCard() {
    const listOfSpacesEl = document.getElementById('spaces');
    listOfSpacesEl.innerHTML = '';
    let drawSpace = possibleSpaces;
    let draws = drawSpace.sort(() => Math.random() - 0.5).slice(0, NUMBER_OF_SPACES);
    draws[Math.floor(NUMBER_OF_SPACES / 2)] = 'Free'
    draws.forEach((draw, index) => listOfSpacesEl.innerHTML += '<button class="p-4 m-1 border border-slate-500" id="space-' + index + '">' + draw + '</button>');
    for (let i = 0; i < NUMBER_OF_SPACES; i++) {
        let el = document.getElementById('space-' + i);
        if (i === Math.floor(NUMBER_OF_SPACES / 2)) {
            toGreen(el);
            continue;
        }
        toBlack(el);
        el.addEventListener('click', (event) => {
            if (greens.has(event.target.id)) {
                toBlack(event.target);
            } else {
                toGreen(event.target);
            }
        });
    }
}

function toGreen(el) {
    el.style.color = 'rgb(22 101 52)';
    el.style.backgroundColor = 'rgb(240 253 244)';
    greens.add(el.id);
}

function toBlack(el) {
    el.style.color = 'rgb(30 41 59)'
    el.style.backgroundColor = 'rgb(248 250 252)';
    greens.delete(el.id);
}

