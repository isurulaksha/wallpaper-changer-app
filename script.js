// Sri Lankan nature wallpaper URLs from Pexels
const wallpapers = {
    nature: [
        'https://live.staticflickr.com/5029/5547883792_cc159528d2_b.jpg', // Sigiriya
        'https://images.pexels.com/photos/1450354/pexels-photo-1450354.jpeg', // Ella Rock (fixed direct image link)
        'https://images.pexels.com/photos/1450355/pexels-photo-1450355.jpeg', // Horton Plains
        'https://images.pexels.com/photos/1450356/pexels-photo-1450356.jpeg'  // Knuckles Range
    ],
    beaches: [
        'https://images.pexels.com/photos/1450357/pexels-photo-1450357.jpeg', // Mirissa Beach
        'https://images.pexels.com/photos/1450358/pexels-photo-1450358.jpeg', // Unawatuna Beach
        'https://images.pexels.com/photos/1450359/pexels-photo-1450359.jpeg', // Bentota Beach
        'https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg'  // Arugam Bay
    ],
    wildlife: [
        'https://images.pexels.com/photos/1450361/pexels-photo-1450361.jpeg', // Yala National Park
        'https://images.pexels.com/photos/1450362/pexels-photo-1450362.jpeg', // Udawalawe National Park
        'https://images.pexels.com/photos/1450363/pexels-photo-1450363.jpeg', // Minneriya National Park
        'https://images.pexels.com/photos/1450364/pexels-photo-1450364.jpeg'  // Wilpattu National Park
    ],
    waterfalls: [
        'https://images.pexels.com/photos/1450365/pexels-photo-1450365.jpeg', // Bambarakanda Falls
        'https://images.pexels.com/photos/1450366/pexels-photo-1450366.jpeg', // Diyaluma Falls
        'https://images.pexels.com/photos/1450367/pexels-photo-1450367.jpeg', // Ravana Falls
        'https://images.pexels.com/photos/1450368/pexels-photo-1450368.jpeg'  // Devon Falls
    ]
};

let currentCategory = 'nature';
let currentIndex = 0;
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// DOM Elements
const currentWallpaper = document.getElementById('currentWallpaper');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const setWallpaperBtn = document.getElementById('setWallpaperBtn');
const favoriteBtn = document.getElementById('favoriteBtn');
const categoryBtns = document.querySelectorAll('.category-btn');

// Initialize the first wallpaper
loadWallpaper();

// Event Listeners
prevBtn.addEventListener('click', showPreviousWallpaper);
nextBtn.addEventListener('click', showNextWallpaper);
setWallpaperBtn.addEventListener('click', setAsWallpaper);
favoriteBtn.addEventListener('click', toggleFavorite);

categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        currentCategory = btn.dataset.category;
        currentIndex = 0;
        categoryBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        loadWallpaper();
    });
});

// Functions
function loadWallpaper() {
    const url = wallpapers[currentCategory][currentIndex];
    currentWallpaper.style.opacity = '0';
    
    // Preload the image
    const img = new Image();
    img.onload = () => {
        currentWallpaper.src = url;
        currentWallpaper.style.opacity = '1';
        updateFavoriteButton();
    };
    img.onerror = () => {
        console.error('Failed to load image:', url);
        // Try loading the next image if current one fails
        currentIndex = (currentIndex + 1) % wallpapers[currentCategory].length;
        loadWallpaper();
    };
    img.src = url;
}

function showPreviousWallpaper() {
    currentIndex = (currentIndex - 1 + wallpapers[currentCategory].length) % wallpapers[currentCategory].length;
    loadWallpaper();
}

function showNextWallpaper() {
    currentIndex = (currentIndex + 1) % wallpapers[currentCategory].length;
    loadWallpaper();
}

function setAsWallpaper() {
    const currentUrl = wallpapers[currentCategory][currentIndex];
    const link = document.createElement('a');
    link.href = currentUrl;
    link.download = `sri-lanka-${currentCategory}-${currentIndex + 1}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function toggleFavorite() {
    const currentUrl = wallpapers[currentCategory][currentIndex];
    const index = favorites.indexOf(currentUrl);
    
    if (index === -1) {
        favorites.push(currentUrl);
    } else {
        favorites.splice(index, 1);
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavoriteButton();
}

function updateFavoriteButton() {
    const currentUrl = wallpapers[currentCategory][currentIndex];
    const isFavorite = favorites.includes(currentUrl);
    
    favoriteBtn.innerHTML = isFavorite 
        ? '<i class="fas fa-heart"></i> Favorited'
        : '<i class="far fa-heart"></i> Favorite';
    
    favoriteBtn.style.background = isFavorite ? '#e74c3c' : '#1b5e20';
}

// Add smooth transitions
currentWallpaper.style.transition = 'opacity 0.3s ease';

// Add image attribution
function addImageAttribution() {
    const attribution = document.createElement('div');
    attribution.className = 'image-attribution';
    attribution.innerHTML = 'Created by ❤️ Randeepa Lakshan';
    document.querySelector('.wallpaper-container').appendChild(attribution);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadWallpaper();
    addImageAttribution();
    // Favorites List Modal logic
    const favoritesListBtn = document.getElementById('favoritesListBtn');
    const favoritesListModal = document.getElementById('favoritesListModal');
    const closeFavoritesModalBtn = document.getElementById('closeFavoritesModalBtn');
    const favoritesGrid = document.getElementById('favoritesGrid');

    if (favoritesListBtn) {
        favoritesListBtn.addEventListener('click', () => {
            // Get favorites from localStorage
            favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            if (favorites.length === 0) {
                favoritesGrid.innerHTML = '<div class="favorites-empty">No favorite wallpapers yet.<br>Click the heart icon to add some!</div>';
            } else {
                favoritesGrid.innerHTML = favorites.map(url => `<img src="${url}" alt="Favorite Wallpaper" data-url="${url}">`).join('');
            }
            favoritesListModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    }
    if (closeFavoritesModalBtn) {
        closeFavoritesModalBtn.addEventListener('click', () => {
            favoritesListModal.style.display = 'none';
            document.body.style.overflow = '';
        });
    }
    window.addEventListener('click', (e) => {
        if (e.target === favoritesListModal) {
            favoritesListModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
    if (favoritesGrid) {
        favoritesGrid.addEventListener('click', (e) => {
            if (e.target.tagName === 'IMG') {
                const url = e.target.getAttribute('data-url');
                // Find which category this wallpaper belongs to
                let found = false;
                for (const cat in wallpapers) {
                    const idx = wallpapers[cat].indexOf(url);
                    if (idx !== -1) {
                        currentCategory = cat;
                        currentIndex = idx;
                        found = true;
                        break;
                    }
                }
                if (found) {
                    loadWallpaper();
                    favoritesListModal.style.display = 'none';
                    document.body.style.overflow = '';
                }
            }
        });
    }
});

// Add Best Places logic
const bestPlaces = [
    'Sigiriya Rock Fortress',
    'Temple of the Tooth (Kandy)',
    'Yala National Park',
    'Galle Fort',
    'Ella (Nine Arches Bridge)',
    'Dambulla Cave Temple',
    'Mirissa Beach',
    'Nuwara Eliya',
    'Polonnaruwa Ancient City',
    'Horton Plains National Park',
    'Adams Peak (Sri Pada)',
    'Bentota Beach',
    'Anuradhapura',
    'Pinnawala Elephant Orphanage',
    'Arugam Bay'
];

const bestPlacesBtn = document.getElementById('bestPlacesBtn');
const bestPlacesModal = document.getElementById('bestPlacesModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const placesList = document.getElementById('placesList');
const mapSearchInput = document.getElementById('mapSearchInput');
const mapSearchBtn = document.getElementById('mapSearchBtn');
const googleMap = document.getElementById('googleMap');

if (bestPlacesBtn) {
    bestPlacesBtn.addEventListener('click', () => {
        // Populate the list
        placesList.innerHTML = bestPlaces.map(place => `<li>${place}</li>`).join('');
        bestPlacesModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
}
if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
        bestPlacesModal.style.display = 'none';
        document.body.style.overflow = '';
    });
}
window.addEventListener('click', (e) => {
    if (e.target === bestPlacesModal) {
        bestPlacesModal.style.display = 'none';
        document.body.style.overflow = '';
    }
});

// Google Map Search
if (mapSearchBtn) {
    mapSearchBtn.addEventListener('click', () => {
        const query = mapSearchInput.value.trim();
        if (query) {
            // Center search in Sri Lanka
            const searchUrl = `https://www.google.com/maps?q=${encodeURIComponent(query + ', Sri Lanka')}&output=embed`;
            googleMap.src = searchUrl;
        }
    });
}
mapSearchInput && mapSearchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        mapSearchBtn.click();
    }
});

// Chatbot logic (wrapped in DOMContentLoaded)
document.addEventListener('DOMContentLoaded', function() {
    const chatbotBtn = document.getElementById('chatbotBtn');
    const chatbotWindow = document.getElementById('chatbotWindow');
    const closeChatbot = document.getElementById('closeChatbot');
    const chatArea = document.getElementById('chatArea');
    const chatInput = document.getElementById('chatInput');
    const sendChat = document.getElementById('sendChat');

    function userMsg(msg) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'chat-msg user';
        msgDiv.innerHTML = `<div class=\"chat-bubble\">${msg}<span class=\"chat-emoji\" title=\"React\">😊</span></div>`;
        chatArea.appendChild(msgDiv);
        chatArea.scrollTop = chatArea.scrollHeight;
    }
    function botReply(msg) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'chat-msg bot';
        msgDiv.innerHTML = `<div class=\"chat-bubble\"><span class=\"chat-emoji\" title=\"React\">😊</span>${msg}</div>`;
        chatArea.appendChild(msgDiv);
        chatArea.scrollTop = chatArea.scrollHeight;
    }
    function handleChat() {
        const input = chatInput.value.trim();
        if (!input) return;
        userMsg(input);
        chatInput.value = '';
        setTimeout(() => botReply(getBotResponse(input)), 500);
    }
    if (chatbotBtn) {
        chatbotBtn.addEventListener('click', () => {
            chatbotWindow.style.display = 'flex';
            chatbotBtn.style.display = 'none';
            setTimeout(() => chatInput.focus(), 200);
            if (chatArea.innerHTML.trim() === '') {
                botReply("Hi! 👋 I'm your Sri Lanka travel assistant. Ask me about visiting places, guest houses, supermarkets, ATMs, vehicle rentals, restaurants, bars, or hospitals.");
            }
        });
    }
    if (closeChatbot) {
        closeChatbot.addEventListener('click', () => {
            chatbotWindow.style.display = 'none';
            chatbotBtn.style.display = 'flex';
        });
    }
    if (sendChat) sendChat.addEventListener('click', handleChat);
    if (chatInput) chatInput.addEventListener('keydown', e => {
        if (e.key === 'Enter') handleChat();
    });

    // Emoji reaction event delegation
    chatArea.addEventListener('click', function(e) {
        if (e.target.classList.contains('chat-emoji')) {
            // Remove selected from any other emoji in this bubble
            const bubble = e.target.parentElement;
            const emojis = bubble.querySelectorAll('.chat-emoji');
            emojis.forEach(emoji => emoji.classList.remove('selected'));
            e.target.classList.add('selected');
        }
    });
});

function getBotResponse(input) {
    const txt = input.toLowerCase();
    if (txt.includes('hello') || txt.includes('hi')) {
        return "Hello! How can I help you explore Sri Lanka?";
    }
    if (txt.includes('visiting place') || txt.includes('tourist') || txt.includes('attraction')) {
        return "Here are some top places: Sigiriya, Temple of the Tooth, Yala National Park, Galle Fort, Ella, Dambulla Cave Temple, Mirissa Beach, Nuwara Eliya, Polonnaruwa, Horton Plains, Adams Peak, Bentota Beach, Anuradhapura, Pinnawala Elephant Orphanage, Arugam Bay.";
    }
    if (txt.includes('guest house') || txt.includes('hotel') || txt.includes('stay')) {
        return "Popular guest houses and hotels: Jetwing Hotels, Cinnamon Hotels, Heritance Hotels, Amaya Resorts, and many local guest houses in each city. Try searching on Booking.com or Agoda for more options.";
    }
    if (txt.includes('supermarket')) {
        return "Major supermarkets in Sri Lanka: Keells, Cargills Food City, Arpico Supercentre, Laugfs Super. You'll find them in all major cities.";
    }
    if (txt.includes('atm') || txt.includes('bank')) {
        return "Most towns have ATMs from Bank of Ceylon, Commercial Bank, Sampath Bank, HNB, and People's Bank. Use Google Maps to find the nearest ATM.";
    }
    if (txt.includes('vehicle') || txt.includes('car') || txt.includes('rent') || txt.includes('taxi') || txt.includes('tuk tuk')) {
        return "For vehicle rentals: Malkey Rent A Car, Casons Rent a Car, Kings Rent A Car, and local providers. For tuk-tuks, you can use PickMe or local stands.";
    }
    if (txt.includes('restaurant') || txt.includes('food')) {
        return "Try these restaurants: Ministry of Crab (Colombo), Upali's (Colombo), Cafe Chill (Ella), Theva Cuisine (Kandy), and many local eateries. For local food, try rice & curry, hoppers, and kottu!";
    }
    if (txt.includes('bar') || txt.includes('pub') || txt.includes('nightlife')) {
        return "Popular bars: The RnB (Colombo), The Dutch Pub (Galle), Slightly Chilled Lounge Bar (Kandy), and beach bars in Mirissa, Unawatuna, and Hikkaduwa.";
    }
    if (txt.includes('hospital') || txt.includes('clinic') || txt.includes('medical')) {
        return "Major hospitals: Asiri Hospital (Colombo), Lanka Hospitals, Nawaloka Hospital, Kandy General Hospital, and government hospitals in every district.";
    }
    if (txt.includes('thank')) {
        return "You're welcome! Let me know if you need more help.";
    }
    return "Sorry, I can help with visiting places, guest houses, supermarkets, ATMs, vehicle rentals, restaurants, bars, and hospitals in Sri Lanka. Try asking about one of these!";
} 