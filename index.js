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
    let draws = drawSpace.sort(() => Math.random() - 0.5).slice(0, 9);
    draws.forEach((draw, index) => listOfSpacesEl.innerHTML += '<button style="color: black;" id="draw-' + index + '">' + draw + '</button>');
    for (let i = 0; i < 9; i++) {
        let el = document.getElementById('draw-' + i);
        el.addEventListener('click', (event) => {
            if (event.target.style.color == 'green') {
                event.target.style.color = 'black';
            } else {
                event.target.style.color = 'green';
            }
        });
    }
}

