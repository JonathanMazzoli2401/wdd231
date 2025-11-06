const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';

const cards = document.querySelector('#cards');

async function getProphetData() {
  try {
    const response = await fetch(url);                 
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();                
    console.table(data.prophets);                      
    displayProphets(data.prophets);                    
  } catch (err) {
    console.error(err);
    cards.innerHTML = `<p class="error">There was a problem loading the data. Please try again.</p>`;
  }
}

const displayProphets = (prophets) => {
  prophets.forEach((prophet) => {
    const { name, lastname, birthdate, birthplace, imageurl } = prophet;

    const card = document.createElement('section');
    card.className = 'card';

    const fullName = document.createElement('h2');
    fullName.textContent = `${name} ${lastname}`;

    const portrait = document.createElement('img');
    portrait.setAttribute('src', imageurl);
    portrait.setAttribute('alt', `Portrait of ${name} ${lastname}`);
    portrait.setAttribute('loading', 'lazy');
    portrait.setAttribute('width', '340');
    portrait.setAttribute('height', '440');

    const meta = document.createElement('p');
    meta.className = 'meta';
    meta.innerHTML = `<strong>Date of Birth:</strong> ${birthdate}<br><strong>Place of Birth:</strong> ${birthplace}`;

    card.appendChild(fullName);
    card.appendChild(portrait);
    card.appendChild(meta);

    cards.appendChild(card);
  });
};

getProphetData();
