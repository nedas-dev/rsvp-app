const inviteInput = document.querySelector('div.invite input');
const inviteSubmit = document.querySelector('div.invite button');
const parentPersonInfo = document.querySelector('div.results')
const contentDiv = document.querySelector('div.content');
const filterInput = document.querySelector('input#filter');
const resultDiv = document.querySelector('div.content div.results');
const mainIndexPage = document.querySelector('main#index-page');
const resultChildren = resultDiv.children;

// function to create a "card" or "profile" for a person that is invited
function createPersonDiv(inputItem) {
    let div = document.createElement('div');
    div.className = 'person-info';
    let h3 = document.createElement('h3');
    h3.textContent = inputItem.value;
    let p = document.createElement('p');
    let input = document.createElement('input');
    input.type = 'checkbox';
    input.className = 'confirm';
    p.textContent = 'Confirmed ';
    p.appendChild(input);
    let divRow = document.createElement('div');
    divRow.className = 'row';
    let button1 = document.createElement('button');
    button1.className = 'first';
    button1.textContent = 'Edit'
    let button2 = document.createElement('button');
    button2.className = 'second';
    button2.textContent = 'Remove'
    divRow.appendChild(button1);
    divRow.appendChild(button2);
    div.appendChild(h3);
    div.appendChild(p);
    div.appendChild(divRow);
    return div;
}

// Submit the people you want to invite
inviteSubmit.addEventListener('click', (e) => {
    let div = createPersonDiv(inviteInput);
    if (filterInput.checked) {
        div.style.display = 'none';
    }
    let h3Content = div.querySelector('h3').textContent
    if (h3Content.length > 0) {
        parentPersonInfo.appendChild(div);
    }
    inviteInput.value = '';
})

// When you press Enter it works as 'Submit' button;
inviteInput.addEventListener('keydown', (e) => {
    if (e.code == 'Enter') {
        let div = createPersonDiv(inviteInput);
        if (filterInput.checked) {
            div.style.display = 'none';
        }
        let h3Content = div.querySelector('h3').textContent
        if (h3Content.length > 0) {
            parentPersonInfo.appendChild(div);
        }
        inviteInput.value = '';
    }
})

// Edit/Remove existing "Card"
resultDiv.addEventListener('click', (e) => {
    if (e.target.tagName == 'BUTTON' && e.target.className == 'first' && e.target.textContent == 'Edit') {
        let editButton = e.target;
        editButton.textContent = 'Save';
        let tempInput = document.createElement('input');
        tempInput.className = 'edit-h3';
        tempInput.type = 'text';
        let personInfoDiv = editButton.parentNode.parentNode;
        let h3 = personInfoDiv.firstElementChild;
        tempInput.value = h3.textContent;
        personInfoDiv.insertBefore(tempInput, h3);
        personInfoDiv.removeChild(h3);
    } else if (e.target.tagName == 'BUTTON' && e.target.className == 'first' && e.target.textContent == 'Save') {
        let editButton = e.target;
        let h3 = document.createElement('h3');
        let personInfoDiv = editButton.parentNode.parentNode;
        let tempInput = personInfoDiv.firstElementChild;
        // If tempInput is empty (no text) then you can't save the "card";
        if (tempInput.value.length > 0) {
            editButton.textContent = 'Edit';
            h3.textContent = tempInput.value;
            personInfoDiv.insertBefore(h3, tempInput);
            personInfoDiv.removeChild(tempInput);
        }
    }

    if (e.target.tagName == 'BUTTON' && e.target.className == 'second') {
        let card = e.target.parentNode.parentNode;
        let resultDiv = card.parentNode;
        resultDiv.removeChild(card);
    }
})

// When you press Enter it Saves the changes. (works the same as you would press Save button)
resultDiv.addEventListener('keydown', (e) => {
    if (e.target.tagName == 'INPUT' && e.target.className == 'edit-h3' && e.code == 'Enter') {
        let inputButton = e.target;
        // If inputButton is empty (no text) then you can't save the "card";
        if (inputButton.value.length > 0) {
            let personInfoDiv = inputButton.parentNode;
            let h3 = document.createElement('h3');
            h3.textContent = inputButton.value;
            personInfoDiv.insertBefore(h3, inputButton);
            personInfoDiv.removeChild(inputButton);
            let divRow = personInfoDiv.lastElementChild;
            let editButton = divRow.firstElementChild;
            editButton.textContent = 'Edit';
        }
    }
})

// Filtering out those that are not confirmed yet.

filterInput.addEventListener('click', (e) => {
    if (filterInput.checked) {
        let items = parentPersonInfo.children;
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            let confirmed = item.querySelector('input.confirm').checked;
            if (!confirmed) {
                item.style.display = 'none';
            }
        }
    }
    if (!filterInput.checked) {
        let items = parentPersonInfo.children;
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
        let total = resultChildren.length;
        let p = document.querySelector('p.number-invited');
        p.innerHTML = 'People Invited: ' + `<strong>${total}</strong>`;
    }
});

// When pressed Enter to submit the person recounting the number of people invited;
mainIndexPage.addEventListener('keydown', (e) => {
    if (e.code == 'Enter' && e.target.tagName == 'INPUT' && e.target.placeholder == 'Invite someone') {
        let total = resultChildren.length;
        let p = document.querySelector('p.number-invited');
        p.innerHTML = 'People Invited: ' + `<strong>${total}</strong>`;
    }
});

// Once the page loaded to count the amount of people invited;
document.addEventListener('DOMContentLoaded', () => {
    let total = resultChildren.length;
    let p = document.querySelector('p.number-invited');
    p.innerHTML = 'People Invited: ' + `<strong>${total}</strong>`;
});

