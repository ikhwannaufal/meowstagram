// Url for cat API
const url = 'https://api.thecatapi.com/v1/breeds'

// Async function to fetch API
async function getCats() {
    try {
        const response = await fetch(url)
        const data = await response.json()
        console.log(data)
        retrieveCats(data)
    } catch (error) {
        console.log(error)
    }
}

// Function to create cat cards using create element
function retrieveCats(catData) {
    const secContainer = document.querySelector('#second__container')

    // Run loop for each cat read from response data and generate new html elements
    catData.forEach(cat => {
        // Generate card container
        const cardContainer = document.createElement('div');
        cardContainer.classList.add('card__container');

        // Generate image container div with class = "image__container"
        const imgContainer = document.createElement('div');
        imgContainer.classList.add('image__container');

        // Generate img element and construct cat image url along with set attribute onerror
        const catImage = document.createElement('img');
        const catImageUrl = `https://cdn2.thecatapi.com/images/${cat.reference_image_id}.jpg `;
        catImage.setAttribute('src', catImageUrl);
        const errLogic = `this.onerror=null; this.src='./assets/missingcat.png'`
        catImage.setAttribute('onerror', errLogic);

        // Append img element as a child to id card__image
        imgContainer.appendChild(catImage);

        // Generate div element with class card__info
        const cardInfo = document.createElement('div');
        cardInfo.classList.add('card__info')

        // Generate div element with class card_title
        const cardTitle = document.createElement('div');
        cardTitle.classList.add('card__title');
        // Link cat name value with class card__title
        const catBreed = document.createTextNode(cat.name);
        cardTitle.appendChild(catBreed);

        // Generate div element with class description
        const cardDesc = document.createElement('div');
        cardDesc.classList.add('cat__description')
        // Link cat description value with class description
        const catDesc = document.createTextNode(cat.description);
        cardDesc.appendChild(catDesc);

        // Append cardTitle and cardDesc class to cardInfo
        cardInfo.appendChild(cardTitle);
        cardInfo.appendChild(cardDesc);

        // Generate button with class card__button
        const cardButton = document.createElement('button');
        cardButton.classList.add('card__button')

        // Set button attributes and action onclick
        cardButton.setAttribute('type', 'button')
        cardButton.setAttribute('onclick', `window.open('${cat.wikipedia_url}')`)
        cardButton.textContent = 'Get to know me(ow)'

        // Append all sub components to the card__container
        cardContainer.appendChild(imgContainer);
        cardContainer.appendChild(cardInfo);
        cardContainer.appendChild(cardButton);

        // Append card__container to feed__container
        secContainer.appendChild(cardContainer);
    })
}   

// Function execution
getCats();