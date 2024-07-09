async function fetchPhilosophers() {
    try {
        const response = await fetch('philosophers.json');
        if (!response.ok) {
            throw new Error('Failed to fetch philosopher data');
        }
        const philosophers = await response.json();
        return philosophers; // Return the philosophers data
    } catch (error) {
        console.error('Error fetching philosopher data:', error);
        return []; // Return an empty array if there's an error
    }
}

function displayPhilosophers(philosophers) {
    const content = document.getElementById('content');
    content.innerHTML = '';

    philosophers.forEach(philosopher => {
        const philosopherElement = document.createElement('div');
        philosopherElement.classList.add('philosopher');

        const name = document.createElement('h2');
        name.textContent = philosopher.name;

        const biography = document.createElement('p');
        biography.textContent = philosopher.biography;

        const ideology = document.createElement('h3');
        ideology.textContent = `Ideology: ${philosopher.ideology}`;

        const quotes = document.createElement('ul');
        philosopher.quotes.forEach(quote => {
            const quoteItem = document.createElement('li');
            quoteItem.textContent = quote;
            quotes.appendChild(quoteItem);
        });

        philosopherElement.appendChild(name);
        philosopherElement.appendChild(biography);
        philosopherElement.appendChild(ideology);
        philosopherElement.appendChild(quotes);

        content.appendChild(philosopherElement);
    });
}

document.getElementById('searchInput').addEventListener('input', async (event) => {
    const searchTerm = event.target.value.toLowerCase();
    try {
        const philosophers = await fetchPhilosophers();
        const filteredPhilosophers = philosophers.filter(philosopher => philosopher.name.toLowerCase().includes(searchTerm));
        displayPhilosophers(filteredPhilosophers);
    } catch (error) {
        console.error('Error filtering philosophers:', error);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    fetchPhilosophers().then(philosophers => {
        displayPhilosophers(philosophers);
    });

    const yearElement = document.getElementById('year');
    yearElement.textContent = new Date().getFullYear();
});
