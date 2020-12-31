const mainIndexPage = document.querySelector('main#index-page');
const contentDiv = document.querySelector('div.content');
const inviteInput = document.querySelector('div.invite input');
const inviteSubmitButton = document.querySelector('div.invite button');
const filterCheckbox = document.querySelector('input#filter');
const parentOfCards = document.querySelector('div.content div.results');
const allCards = parentOfCards.children;

// function to create an html element
function createElement(elementToCreate, ...property) {
    let element = document.createElement(elementToCreate);
    if (property.length > 0) {
        for (let i = 0; i < property.length; i += 2) {
            element[property[i]] = property[i + 1]
        }
    }
    return element;
}

// function to create a "card" for a person that is invited
function createCard(inviteInput) {
    function appendItems() {
        p.appendChild(input);
        divRow.appendChild(button1);
        divRow.appendChild(button2);
        div.appendChild(h3);
        div.appendChild(p);
        div.appendChild(divRow);
    }
    let div = createElement('div', 'className', 'person-info');
    let h3 = createElement('h3', 'textContent', inviteInput.value)
    let p = createElement('p', 'textContent', 'Confirmed ');
    let input = createElement('input', 'type', 'checkbox', 'className', 'confirm');
    let divRow = createElement('div', 'className', 'row');
    let button1 = createElement('button', 'className', 'first', 'textContent', 'Edit');
    let button2 = createElement('button', 'className', 'second', 'textContent', 'Remove');
    // Appending items to create the div we need to return;
    appendItems();
    return div;
}

// 'Submit' button clicked (Submit the people you want to invite)
inviteSubmitButton.addEventListener('click', (e) => {
    let card = createCard(inviteInput);
    let checkboxChecked = filterCheckbox.checked;
    let h3ElementOfCard = card.querySelector('h3').textContent
    if (checkboxChecked) {
        card.style.display = 'none';
    }
    let inputExists = h3ElementOfCard.length > 0 ? true : false;
    if (inputExists) {
        parentOfCards.appendChild(card);
    }
    inviteInput.value = '';
})

// Pressing 'Enter' When focused on InviteInput will be equal to 'Submit' Button;
inviteInput.addEventListener('keydown', (e) => {
    let keyPressed = e.code;
    if (keyPressed == 'Enter') {
        let card = createCard(inviteInput);
        let checked = filterCheckbox.checked;
        if (checked) {
            card.style.display = 'none';
        }
        let h3ElementOfCard = card.querySelector('h3').textContent
        if (h3ElementOfCard.length > 0) {
            parentOfCards.appendChild(card);
        }
        inviteInput.value = '';
    }
})

// Edit/Remove existing "Card"
parentOfCards.addEventListener('click', (e) => {
    let button = e.target;
    let tagName = e.target.tagName;
    // Entering Edit mode
    if (tagName == 'BUTTON') {
        let buttonClass = button.className;
        let buttonName = button.textContent;
        let userAction = {
            Edit: () => {
                button.textContent = 'Save';
                let tempInput = createElement('input', 'className', 'edit-h3', 'type', 'text');
                let card = button.parentNode.parentNode;
                let h3 = card.firstElementChild;
                tempInput.value = h3.textContent;
                card.insertBefore(tempInput, h3);
                card.removeChild(h3);
            },
            Save: () => {
                let card = button.parentNode.parentNode;
                let tempInput = card.firstElementChild;
                let h3 = createElement('h3', 'textContent', tempInput.value);
                // If tempInput is empty (no text) then you can't save the "card";
                if (tempInput.value.length > 0) {
                    button.textContent = 'Edit';
                    card.insertBefore(h3, tempInput);
                    card.removeChild(tempInput);
                }
            },
            Remove: () => {
                let card = button.parentNode.parentNode;
                parentOfCards.removeChild(card);
            }
        }
        // Edit/Save modes and Remove button;
        if (buttonName == 'Edit' && buttonClass == 'first') {
            userAction.Edit();
        } else if (buttonName == 'Save' && buttonClass == 'first') {
            userAction.Save();
        } else if (buttonName == 'Remove' && buttonClass == 'second') {
            userAction.Remove();
        }
    }

    // Once the card's checkbox is checked that card's bg color changes;
    if (tagName == 'INPUT') {
        if (button.type == 'checkbox' && button.checked) {
            let card = button.parentNode.parentNode;
            card.classList.add('checked');
        } else if (button.type == 'checkbox' && !button.checked) {
            let card = button.parentNode.parentNode;
            card.classList.remove('checked');
        }
    }

})

// When you press Enter it Saves the changes. (works the same as you would press Save button)
parentOfCards.addEventListener('keydown', (e) => {
    if (e.target.tagName == 'INPUT' && e.target.className == 'edit-h3' && e.code == 'Enter') {
        let inputButton = e.target;
        // If inputButton is empty (no text) then you can't save the "card";
        if (inputButton.value.length > 0) {
            let card = inputButton.parentNode;
            let h3 = createElement('h3', 'textContent', inputButton.value);
            card.insertBefore(h3, inputButton);
            card.removeChild(inputButton);
            let divRow = card.lastElementChild;
            let editButton = divRow.firstElementChild;
            editButton.textContent = 'Edit';
        }
    }
})

// Creating filter function that removes unconfirmed cards.
filterCheckbox.addEventListener('click', (e) => {
    if (filterCheckbox.checked) {
        let items = parentOfCards.children;
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            let confirmed = item.querySelector('input.confirm').checked;
            if (!confirmed) {
                item.style.display = 'none';
            }
        }

    }
    // turning off Filter mode.
    if (!filterCheckbox.checked) {
        let items = parentOfCards.children;
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            let confirmed = item.querySelector('input.confirm').checked;
            if (!confirmed) {
                item.style.display = 'block';
            }
        }
    }
})

// Adding counter for how many people were invited.
mainIndexPage.addEventListener('click', (e) => {

    if (e.target.tagName == 'BUTTON' && e.target.textContent == 'Submit' || e.target.textContent == 'Remove') {
        let total = allCards.length;
        let p = document.querySelector('p.number-invited');
        p.innerHTML = 'People Invited: ' + `<strong>${total}</strong>`;
    }
});

// When pressed Enter to submit the person. We want to make a recount of the number of people invited;
mainIndexPage.addEventListener('keydown', (e) => {
    let keyPressed = e.code;
    let tagName = e.target.tagName;
    let className = e.target.className;
    if (keyPressed == 'Enter' && tagName == 'INPUT' && className == 'inviteInput') {
        let numberOfCards = allCards.length;
        let p = document.querySelector('p.number-invited');
        p.innerHTML = 'People Invited: ' + `<strong>${numberOfCards}</strong>`;
    }
});

// Once the page loads DOM (HTML Elements) to count the amount of people invited currently;
document.addEventListener('DOMContentLoaded', () => {
    let numberOfCards = allCards.length;
    let p = document.querySelector('p.number-invited');
    p.innerHTML = 'People Invited: ' + `<strong>${numberOfCards}</strong>`;
});
