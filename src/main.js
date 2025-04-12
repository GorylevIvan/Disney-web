// [Предыдущий код JavaScript остается без изменений]
// DOM Elements
const characterList = document.getElementById('characterList');
const characterDetails = document.getElementById('characterDetails');

// Fetch all characters
async function fetchCharacters() {
  try {
    const response = await fetch('https://api.disneyapi.dev/character');
    if (!response.ok) {
      throw new Error('Failed to fetch characters');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching characters:', error);
    characterList.innerHTML = '<div class="error">Failed to load characters. Please try again later.</div>';
    return [];
  }
}

// Fetch character details by ID
async function fetchCharacterDetails(characterId) {
  try {
    const response = await fetch(`https://api.disneyapi.dev/character/${characterId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch character details');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching character details:', error);
    characterDetails.innerHTML = '<div class="error">Failed to load character details. Please try again later.</div>';
    return null;
  }
}

// Display characters list
function displayCharacters(characters) {
  characterList.innerHTML = '';
  
  if (characters.length === 0) {
    characterList.innerHTML = '<div class="loading">No characters found</div>';
    return;
  }
  
  characters.forEach(character => {
    const characterCard = document.createElement('div');
    characterCard.className = 'character-card';
    characterCard.innerHTML = `
      <img src="${character.imageUrl || 'https://via.placeholder.com/50'}" alt="${character.name}" />
      <h3>${character.name}</h3>
    `;
    
    characterCard.addEventListener('click', () => {
      document.querySelectorAll('.character-card').forEach(card => {
        card.style.backgroundColor = '';
      });
      characterCard.style.backgroundColor = '#f0f2f5';
      loadCharacterDetails(character._id);
    });
    
    characterList.appendChild(characterCard);
  });
}

// Display character details
function displayCharacterDetails(character) {
  if (!character) return;
  
  characterDetails.innerHTML = `
    <div class="character-detail-view">
      <h2>${character.name}</h2>
      <img src="${character.imageUrl || 'https://via.placeholder.com/200'}" alt="${character.name}" />
      <div class="character-info">
        ${character.films && character.films.length > 0 ? `<p><strong>Films:</strong> ${character.films.join(', ')}</p>` : ''}
        ${character.tvShows && character.tvShows.length > 0 ? `<p><strong>TV Shows:</strong> ${character.tvShows.join(', ')}</p>` : ''}
        ${character.videoGames && character.videoGames.length > 0 ? `<p><strong>Video Games:</strong> ${character.videoGames.join(', ')}</p>` : ''}
        ${character.allies && character.allies.length > 0 ? `<p><strong>Allies:</strong> ${character.allies.join(', ')}</p>` : ''}
        ${character.enemies && character.enemies.length > 0 ? `<p><strong>Enemies:</strong> ${character.enemies.join(', ')}</p>` : ''}
        ${character.parkAttractions && character.parkAttractions.length > 0 ? `<p><strong>Park Attractions:</strong> ${character.parkAttractions.join(', ')}</p>` : ''}
      </div>
    </div>
  `;
}

// Load character details
async function loadCharacterDetails(characterId) {
  characterDetails.innerHTML = '<div class="loading">Loading character details...</div>';
  const character = await fetchCharacterDetails(characterId);
  displayCharacterDetails(character);
}

// Add bubble effect when clicking on characters
document.addEventListener('click', function(e) {
  if (e.target.closest('.character-card')) {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.style.left = e.clientX + 'px';
    bubble.style.top = e.clientY + 'px';
    document.body.appendChild(bubble);
    
    setTimeout(() => {
      bubble.remove();
    }, 1000);
  }
});

// Create floating elements with blue theme
function createFloatingElements() {
  const elements = ['❄️', '💧', '🌊', '🔷', '🌀'];
  const container = document.querySelector('.container');
  
  for (let i = 0; i < 10; i++) {
    const element = document.createElement('div');
    element.textContent = elements[Math.floor(Math.random() * elements.length)];
    element.style.position = 'absolute';
    element.style.fontSize = Math.random() * 20 + 10 + 'px';
    element.style.left = Math.random() * 100 + 'vw';
    element.style.top = Math.random() * 100 + 'vh';
    element.style.opacity = '0.4';
    element.style.animation = `float ${Math.random() * 10 + 5}s linear infinite`;
    element.style.pointerEvents = 'none';
    element.style.zIndex = '-1';
    element.style.color = '#4facfe';
    container.appendChild(element);
  }
}

// Initialize the app
async function init() {
  createFloatingElements();
  const characters = await fetchCharacters();
  displayCharacters(characters);
  
  if (characters.length > 0) {
    loadCharacterDetails(characters[0]._id);
    setTimeout(() => {
      const firstCard = document.querySelector('.character-card');
      if (firstCard) {
        firstCard.style.backgroundColor = '#f0f2f5';
      }
    }, 100);
  }
}

// Start the application
init();