// Smooth scroll functions for navigation links (Global scope for onclick handlers)
function scrollToHotels(event) {
    event.preventDefault();
    const hotelSection = document.querySelector('.hotel-section');
    if (hotelSection) {
        hotelSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function scrollToFlights(event) {
    event.preventDefault();
    const flightsSection = document.querySelector('.flights-section');
    if (flightsSection) {
        flightsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function scrollToItinerary(event) {
    event.preventDefault();
    const itinerarySection = document.querySelector('.itinerary-section');
    if (itinerarySection) {
        itinerarySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function scrollToBudget(event) {
    event.preventDefault();
    const budgetSection = document.querySelector('.budget-section');
    if (budgetSection) {
        budgetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function scrollToLocations(event) {
    event.preventDefault();
    const locationsSection = document.querySelector('#featured-locations');
    if (locationsSection) {
        locationsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function scrollToTips(event) {
    event.preventDefault();
    const tipsSection = document.querySelector('.tips-section');
    if (tipsSection) {
        tipsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Smooth scrolling for anchor links (with validation)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        // Only handle valid selectors (not just '#' or empty)
        if (href && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// Add scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.overview-card, .flight-card, .day-content, .location-card, .tip-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// View toggle functionality
function toggleView(viewType) {
    const comparisonView = document.getElementById('comparison-view');
    const detailedView = document.getElementById('detailed-view');
    const comparisonToggle = document.getElementById('comparison-toggle');
    const detailedToggle = document.getElementById('detailed-toggle');
    
    if (viewType === 'comparison') {
comparisonView.style.display = 'block';
detailedView.style.display = 'none';
comparisonToggle.classList.add('active');
detailedToggle.classList.remove('active');
    } else {
comparisonView.style.display = 'none';
detailedView.style.display = 'block';
comparisonToggle.classList.remove('active');
detailedToggle.classList.add('active');
    }
}

// Select hotel from comparison table and switch to detailed view
function selectHotelFromTable(hotelId) {
    // Switch to detailed view
    toggleView('detailed');
    
    // Scroll to the detailed section
    document.getElementById('detailed-view').scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    // After a brief delay for scroll, show the hotel
    setTimeout(() => {
showHotel(hotelId);
    }, 500);
}


// Hotel comparison functionality

const hotelImages = {
    'casa-maria': [
        'https://r.profitroom.pl/casamariahotelboutique/images/gallery/202311231747060.WhatsApp_Image_2023_11_17_at_17.58.15_Easy_Resize.com.jpg',  // Pool view
        'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/28/49/ba/03/hotel-boutique-casa-maria.jpg?w=1400&h=-1&s=1',  // Room interior
        'https://wa-uploads.profitroom.com/casamariahotelboutique/1475x700/16982592205521_633f63bc7e2c2fachadacasamariahome1.jpg'   // Building/exterior
    ],
    'rivera': [
        'https://tbb-prod-emea.imgix.net/attachments/room_type_photos/images/87359/87359/Carlotta_1.jpg?auto=format,compress&fit=crop&crop=entropy&w=1728&q=75',  // Carlotta Suite
        'https://webbox.imgix.net/images/rkxocpoygswmxsto/427ddf10-31c4-4a45-8c73-9aff49f765cb.jpg?auto=format,compress&fit=crop&crop=entropy&w=1728',  // Pool area
        'https://webbox.imgix.net/images/rkxocpoygswmxsto/15ab75d7-1169-4551-99e5-e4845776e067.jpg?auto=format,compress&fit=crop&crop=entropy&w=1728'   // River view
    ],
    'almar': [
        'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/30/a8/b1/d3/mantamar-beach-club-bar.jpg?w=1200',  // Beach club
        'https://image-tc.galaxy.tf/wijpeg-9i0ezhf7w60b1r663ws0ta9yc/almar-resort-aerial-4.jpg?width=1200',  // Eden Pool aerial
        'https://thetopskybar.com/wp-content/uploads/photo-gallery/PV-THETOPSKYBAR.jpg?bwg=1723839624'   // Top Sky Bar
    ],
    'vallarta': [
        'https://vallartashores.com/wp-content/uploads/2021/10/Vallarta-Shores-suite-7-19.jpeg',  // Beachfront suite
        'https://vallartashores.com/wp-content/uploads/2021/10/Vallarta-Shores-suite-7-28.jpeg',  // Balcony view
        'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/07/3e/55/36/vallarta-shores-international.jpg?w=1200&h=-1&s=1'   // Infinity pool
    ]
};

// Hotel pricing data for dynamic budget calculation
const hotelPricing = {
    'casa-maria': {
        total: 1040,
        perPerson: 260,
        name: 'Casa Maria Hotel'
    },
    'rivera': {
        total: 1194,
        perPerson: 299,
        name: 'Rivera Del Rio'
    },
    'almar': {
        total: 1549,
        perPerson: 387,
        name: 'Almar Resort'
    },
    'vallarta': {
        total: 1800,
        perPerson: 450,
        name: 'Vallarta Shores'
    }
};

// Fixed costs that don't change based on hotel selection
const fixedCosts = {
    flights: 3151,
    activities: 1200
};

function showHotel(hotelId) {
    // Hide all hotel content
    document.querySelectorAll('.hotel-content').forEach(content => {
        content.classList.remove('active');
    });

    // Remove active class from all selection cards
    document.querySelectorAll('.selection-card').forEach(card => {
        card.classList.remove('active');
    });

    // Show selected hotel
    const hotelElement = document.getElementById(hotelId);
    if (hotelElement) {
        hotelElement.classList.add('active');
    }
    
    // Add active class to clicked selection card
    const selectionCard = document.querySelector(`.selection-card[data-hotel="${hotelId}"]`);
    if (selectionCard) {
        selectionCard.classList.add('active');
    }

    // Update budget breakdown with selected hotel pricing
    updateBudget(hotelId);
}

// Function to update budget breakdown based on selected hotel
function updateBudget(hotelId) {
    const hotel = hotelPricing[hotelId];
    const totalCost = fixedCosts.flights + hotel.total + fixedCosts.activities;
    const budgetBuffer = 7000 - totalCost;

    // Update accommodation cost and hotel name
    document.getElementById('accommodation-cost').textContent = `$${hotel.total.toLocaleString()}`;
    document.getElementById('selected-hotel').textContent = hotel.name;

    // Update total cost
    document.getElementById('total-cost').textContent = `$${totalCost.toLocaleString()}`;

    // Update budget buffer with appropriate styling
    const bufferElement = document.getElementById('budget-buffer');
    if (budgetBuffer >= 0) {
        bufferElement.textContent = `$${budgetBuffer.toLocaleString()} buffer remaining from $7,000 budget`;
        bufferElement.style.color = 'rgba(255, 255, 255, 0.9)';
    } else {
        bufferElement.textContent = `$${Math.abs(budgetBuffer).toLocaleString()} over $7,000 budget`;
        bufferElement.style.color = '#ff6b6b';
    }
}

// New arrow navigation functions
let currentImageIndex = {
    'casa-maria': 0,
    'rivera': 0,
    'almar': 0,
    'vallarta': 0
};

function nextImage(hotelId, event) {
    event.stopPropagation();
    const maxIndex = hotelImages[hotelId].length - 1;
    currentImageIndex[hotelId] = (currentImageIndex[hotelId] + 1) % (maxIndex + 1);
    changeImage(hotelId, currentImageIndex[hotelId], event);
}

function previousImage(hotelId, event) {
    event.stopPropagation();
    const maxIndex = hotelImages[hotelId].length - 1;
    currentImageIndex[hotelId] = currentImageIndex[hotelId] === 0 ? maxIndex : currentImageIndex[hotelId] - 1;
    changeImage(hotelId, currentImageIndex[hotelId], event);
}

function changeImage(hotelId, imageIndex, event) {
    event.stopPropagation();
    const imgElement = document.getElementById(hotelId + '-img');
    const dots = document.querySelectorAll(`#${hotelId} .gallery-dot`);
    
    currentImageIndex[hotelId] = imageIndex;
    imgElement.src = hotelImages[hotelId][imageIndex];
    
    dots.forEach((dot, index) => {
        if (index === imageIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Initialize page with Casa Maria data when loaded
document.addEventListener('DOMContentLoaded', function() {
    updateBudget('casa-maria'); // Initialize budget with Casa Maria pricing

    // Add mobile tap-to-flip functionality for flip cards
    const flipCards = document.querySelectorAll('.flip-card');
    flipCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // On mobile, toggle the flipped class on tap
            if (window.innerWidth <= 768) {
                this.classList.toggle('flipped');
            }
        });
    });

    // Sticky Navigation Functionality
    const stickyNav = document.getElementById('sticky-nav');
    const heroElement = document.querySelector('.hero');

    if (stickyNav && heroElement) {
        let lastScrollTop = 0;
        const heroHeight = heroElement.offsetHeight;

        window.addEventListener('scroll', function() {
            if (!stickyNav) return; // Safety check

            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            // Show nav after scrolling past hero section
            if (scrollTop > heroHeight - 100) {
                stickyNav.classList.add('visible');
            } else {
                stickyNav.classList.remove('visible');
            }

            lastScrollTop = scrollTop;
        });
    }

    // Active section highlighting based on actual section positions
    // Sections in actual page order: Overview → Hotels → Budget → Flights → Itinerary → Locations → Tips
    const sections = [
        { id: 'overview', selector: '#overview' },
        { id: 'hotels', selector: '.hotel-section' },
        { id: 'budget', selector: '.budget-section' },
        { id: 'flights', selector: '.flights-section' },
        { id: 'itinerary', selector: '.itinerary-section' },
        { id: 'locations', selector: '#featured-locations' },
        { id: 'tips', selector: '.tips-section' }
    ];

    // Map sections to their corresponding nav links
    const navLinkMap = {
        'overview': 'a[href="#overview"]',
        'hotels': 'a[onclick*="scrollToHotels"]',
        'flights': 'a[onclick*="scrollToFlights"]',
        'itinerary': 'a[onclick*="scrollToItinerary"]',
        'budget': 'a[onclick*="scrollToBudget"]',
        'locations': 'a[onclick*="scrollToLocations"]',
        'tips': 'a[onclick*="scrollToTips"]'
    };

    let currentSection = null;
    let isScrolling = false;
    let scrollTimeout;

    // Calculate actual section positions
    const sectionPositions = sections.map(s => {
        const element = document.querySelector(s.selector);
        if (element) {
            return {
                id: s.id,
                top: element.offsetTop,
                bottom: element.offsetTop + element.offsetHeight
            };
        }
        return null;
    }).filter(s => s !== null);

    // Helper function to update nav highlight
    function updateNavHighlight(sectionId) {
        if (sectionId && sectionId !== currentSection) {
            currentSection = sectionId;

            // Remove nav-highlight from all nav links
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('nav-highlight');
            });

            // Add nav-highlight to the corresponding nav link
            const navLinkSelector = navLinkMap[sectionId];
            if (navLinkSelector) {
                const activeLink = document.querySelector(navLinkSelector);
                if (activeLink) {
                    activeLink.classList.add('nav-highlight');
                }
            }
        }
    }

    // Position-based scroll detection for all devices
    window.addEventListener('scroll', function() {
        if (isScrolling) return;

        // Get scroll position with offset for sticky nav (100px)
        const scrollPos = window.scrollY + 150;

        // Find which section we're currently in
        let currentSectionData = sectionPositions.find(s =>
            scrollPos >= s.top && scrollPos < s.bottom
        );

        // If not found (e.g., at very bottom), use last section
        if (!currentSectionData && sectionPositions.length > 0) {
            currentSectionData = sectionPositions[sectionPositions.length - 1];
        }

        if (currentSectionData) {
            updateNavHighlight(currentSectionData.id);
        }
    });

    // Add click listeners to nav links to prevent conflicts
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            // Immediately highlight the clicked link
            document.querySelectorAll('.nav-link').forEach(l => {
                l.classList.remove('nav-highlight');
            });
            this.classList.add('nav-highlight');

            // Determine which section was clicked
            let clickedSection = null;
            if (this.getAttribute('href') === '#overview') {
                clickedSection = 'overview';
            } else if (this.getAttribute('onclick')?.includes('scrollToHotels')) {
                clickedSection = 'hotels';
            } else if (this.getAttribute('onclick')?.includes('scrollToBudget')) {
                clickedSection = 'budget';
            } else if (this.getAttribute('onclick')?.includes('scrollToFlights')) {
                clickedSection = 'flights';
            } else if (this.getAttribute('onclick')?.includes('scrollToItinerary')) {
                clickedSection = 'itinerary';
            } else if (this.getAttribute('onclick')?.includes('scrollToLocations')) {
                clickedSection = 'locations';
            } else if (this.getAttribute('onclick')?.includes('scrollToTips')) {
                clickedSection = 'tips';
            }

            if (clickedSection) {
                currentSection = clickedSection;
            }

            // Disable observer updates during scroll
            isScrolling = true;

            // Clear any existing timeout
            clearTimeout(scrollTimeout);

            // Re-enable observer after scroll completes (500ms - matches smooth scroll duration)
            scrollTimeout = setTimeout(() => {
                isScrolling = false;
            }, 500);
        });
    });

    // Fallback: Highlight Overview by default when page loads
    const overviewLink = document.querySelector('a[href="#overview"]');
    if (overviewLink) {
        overviewLink.classList.add('nav-highlight');
        currentSection = 'overview';
    }
});
