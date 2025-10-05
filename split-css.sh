#!/bin/bash

# Extract hero styles (lines 15-100)
sed -n '15,100p' css/extracted-all.css > css/hero.css

# Extract navigation styles (grep for sticky-nav related)
grep -A 100 '\.sticky-nav' css/extracted-all.css | head -150 > css/navigation.css

# Extract overview styles  
sed -n '127,172p' css/extracted-all.css > css/overview.css

# Extract flights styles
sed -n '174,235p' css/extracted-all.css > css/flights.css

# Extract hotel styles (large section ~240-900)
sed -n '237,950p' css/extracted-all.css > css/hotels.css

# Extract budget styles
grep -A 70 '\.budget-section' css/extracted-all.css | head -80 > css/budget.css

# Extract itinerary styles
grep -A 100 '\.itinerary-section\|\.timeline' css/extracted-all.css | head -150 > css/itinerary.css

# Extract locations/flip cards styles
grep -A 200 '\.flip-card\|\.location-card' css/extracted-all.css | head -250 > css/locations.css

# Extract tips styles
grep -A 60 '\.tips-section\|\.tip-card' css/extracted-all.css | head -70 > css/tips.css

echo "CSS files created successfully"
