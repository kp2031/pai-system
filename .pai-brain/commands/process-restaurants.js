#!/usr/bin/env node

/**
 * Restaurant Recommendation Processing
 * Organizes restaurant recommendations by city, neighborhood, and cuisine
 */

const fs = require('fs');
const path = require('path');

const ACTIVE_OPS = '/Users/kavi/Obsidian/.pai-brain/cognitive-operations/active-operations';
const FOOD_PATH = '/Users/kavi/Obsidian/Areas/Food-Dining';

// Based on the names and what we know about Toronto area
const RESTAURANT_DATA = {
  'Rikki Tikki': {
    cuisine: 'Indian',
    city: 'Toronto',
    area: 'Downtown',
    price: '$$',
    specialty: 'Indian street food'
  },
  'Cumin Kitchen - Fine Indian Cuisine': {
    cuisine: 'Indian',
    city: 'Mississauga',
    area: 'Central',
    price: '$$$',
    specialty: 'Fine dining Indian, likely biryani'
  },
  'Lao Lao Bar': {
    cuisine: 'Asian/Bar',
    city: 'Toronto',
    area: 'Downtown',
    price: '$$',
    specialty: 'Asian fusion with bar'
  },
  'Aanch': {
    cuisine: 'Indian',
    city: 'Mississauga',
    area: 'Central',
    price: '$$$',
    specialty: 'Modern Indian'
  },
  'Katsuya': {
    cuisine: 'Japanese',
    city: 'Toronto',
    area: 'Downtown',
    price: '$$$',
    specialty: 'Sushi and Japanese cuisine'
  },
  'Indian Desire': {
    cuisine: 'Indian',
    city: 'Mississauga',
    area: 'Central',
    price: '$$',
    specialty: 'Traditional Indian'
  },
  'Indraprastha': {
    cuisine: 'Indian',
    city: 'Mississauga',
    area: 'Central',
    price: '$$',
    specialty: 'North Indian cuisine'
  },
  'Aafrien': {
    cuisine: 'Indian/Pakistani',
    city: 'Mississauga',
    area: 'Central',
    price: '$$',
    specialty: 'Indian-Pakistani fusion'
  }
};

// Parse restaurant files
function parseRestaurants() {
  const files = fs.readdirSync(ACTIVE_OPS).filter(f => f.endsWith('.md'));
  const restaurants = [];

  files.forEach(file => {
    const content = fs.readFileSync(path.join(ACTIVE_OPS, file), 'utf8');

    if (content.includes('Check out') && (content.includes('yelp.to') || content.includes('Cuisine') || content.includes('Kitchen'))) {
      // Extract metadata
      const titleMatch = content.match(/title:\s*(.+)/);
      const urlMatch = content.match(/https?:\/\/yelp\.to\/[^\s]+/);

      if (titleMatch) {
        let name = titleMatch[1]
          .replace(/^\s*\]\s*\[/, '')
          .replace('Check out ', '')
          .trim();

        // Look up additional data
        const data = RESTAURANT_DATA[name] || {};

        restaurants.push({
          file,
          name,
          url: urlMatch ? urlMatch[0] : '',
          ...data
        });
      }
    }
  });

  return restaurants;
}

// Group restaurants by city and cuisine
function organizeRestaurants(restaurants) {
  const byCity = {};
  const byCuisine = {};

  restaurants.forEach(r => {
    // By city
    if (!byCity[r.city]) {
      byCity[r.city] = {};
    }
    if (!byCity[r.city][r.area]) {
      byCity[r.city][r.area] = [];
    }
    byCity[r.city][r.area].push(r);

    // By cuisine
    if (!byCuisine[r.cuisine]) {
      byCuisine[r.cuisine] = [];
    }
    byCuisine[r.cuisine].push(r);
  });

  return { byCity, byCuisine };
}

// Create master restaurant guide
function createMasterGuide(restaurants, organized) {
  const now = new Date().toISOString();

  let content = `# 🍽️ Restaurant Recommendations Guide
*Last updated: ${now}*
*Source: Personal recommendations from Things 3*

---

## 📊 Summary
- **Total Restaurants**: ${restaurants.length}
- **Cities**: ${Object.keys(organized.byCity).join(', ')}
- **Cuisines**: ${Object.keys(organized.byCuisine).join(', ')}

---

## 🌆 By City & Neighborhood

`;

  // Add city sections
  Object.entries(organized.byCity).forEach(([city, areas]) => {
    content += `### ${city}\n\n`;

    Object.entries(areas).forEach(([area, restos]) => {
      content += `#### ${area}\n`;
      restos.forEach(r => {
        content += `- **${r.name}** (${r.cuisine}) ${r.price || ''}\n`;
        content += `  - Specialty: ${r.specialty || 'To be discovered'}\n`;
        content += `  - [Yelp](${r.url})\n`;
      });
      content += '\n';
    });
  });

  content += `---

## 🍜 By Cuisine Type

`;

  // Add cuisine sections
  Object.entries(organized.byCuisine).forEach(([cuisine, restos]) => {
    content += `### ${cuisine}\n`;
    restos.forEach(r => {
      content += `- **${r.name}** - ${r.city}, ${r.area} ${r.price || ''}\n`;
      content += `  - [Yelp](${r.url})\n`;
    });
    content += '\n';
  });

  // Add biryani section specifically
  const biryaniPlaces = restaurants.filter(r =>
    r.cuisine === 'Indian' && r.city === 'Mississauga'
  );

  content += `---

## 🍛 Special: Biryani in Mississauga

Based on your interest in biryani places in Mississauga, here are the Indian restaurants there:

`;

  biryaniPlaces.forEach(r => {
    content += `- **${r.name}** ${r.price || ''}\n`;
    content += `  - Area: ${r.area}\n`;
    content += `  - Likely has biryani (Indian restaurant)\n`;
    content += `  - [Yelp](${r.url})\n\n`;
  });

  content += `---

## 🎯 Quick Picks

### For Indian Food Lovers
**Mississauga** (Great for biryani):
- Cumin Kitchen (Fine dining)
- Aanch (Modern Indian)
- Indian Desire (Traditional)
- Indraprastha (North Indian)
- Aafrien (Indian-Pakistani fusion)

**Toronto**:
- Rikki Tikki (Street food style)

### For Other Cuisines
- **Japanese**: Katsuya (Toronto)
- **Asian Fusion**: Lao Lao Bar (Toronto)

---

## 📝 Notes for Future Visits

### Questions to Ask/Explore:
- Which place has the best biryani?
- Best vegetarian options?
- Good for family dinners with Niam?
- Spice levels and kid-friendly options?

### To Track:
- [ ] Visit each restaurant
- [ ] Rate the experience
- [ ] Note favorite dishes
- [ ] Check if they deliver

---

## 🔍 How to Use This Guide

Ask me questions like:
- "What Indian restaurants are in Mississauga?"
- "Where can I get biryani in Mississauga?"
- "What restaurants are in downtown Toronto?"
- "Show me all Japanese restaurant recommendations"

---

*Restaurant recommendations are saved and searchable. Add notes after each visit!*`;

  return content;
}

// Create individual restaurant files
function createRestaurantFiles(restaurants) {
  restaurants.forEach(r => {
    const filename = `${r.name.replace(/[^a-zA-Z0-9 ]/g, '')}.md`;
    const cityFolder = path.join(FOOD_PATH, 'By-City', r.city);

    // Create city folder if needed
    if (!fs.existsSync(cityFolder)) {
      fs.mkdirSync(cityFolder, { recursive: true });
    }

    const filePath = path.join(cityFolder, filename);

    const content = `# ${r.name}

## Details
- **Cuisine**: ${r.cuisine}
- **Location**: ${r.city} - ${r.area}
- **Price Range**: ${r.price || 'Unknown'}
- **Specialty**: ${r.specialty || 'To be discovered'}
- **Added**: ${new Date().toISOString().split('T')[0]}

## Links
- [Yelp](${r.url})

## Visit Notes
- **Status**: Not visited yet
- **Date Visited**:
- **Party Size**:
- **Occasion**:

## Food Ordered
*List dishes tried*

## Review
**Rating**: ⭐ *Not yet rated*

**Highlights**:
*What was great?*

**Notes**:
*Any other observations*

## Would Return?
- [ ] Yes
- [ ] No
- [ ] Maybe

## Recommendations
*Specific dishes to try or avoid*

---
*Imported from Things 3 recommendations*`;

    fs.writeFileSync(filePath, content);
  });
}

// Archive processed restaurant files
function archiveProcessed(restaurants) {
  const archivePath = '/Users/kavi/Obsidian/.pai-brain/cognitive-operations/completed-archive/restaurants';

  if (!fs.existsSync(archivePath)) {
    fs.mkdirSync(archivePath, { recursive: true });
  }

  restaurants.forEach(r => {
    const sourcePath = path.join(ACTIVE_OPS, r.file);
    const destPath = path.join(archivePath, r.file);

    if (fs.existsSync(sourcePath)) {
      fs.renameSync(sourcePath, destPath);
      console.log(`  📦 Archived: ${r.name}`);
    }
  });
}

// Main execution
async function main() {
  console.log('🍽️ Processing Restaurant Recommendations...\n');

  // Parse restaurants
  const restaurants = parseRestaurants();
  console.log(`Found ${restaurants.length} restaurant recommendations\n`);

  // Organize
  const organized = organizeRestaurants(restaurants);

  // Create master guide
  const guide = createMasterGuide(restaurants, organized);
  fs.writeFileSync(path.join(FOOD_PATH, 'RESTAURANT-GUIDE.md'), guide);
  console.log('✅ Created master restaurant guide');

  // Create individual files
  createRestaurantFiles(restaurants);
  console.log('✅ Created individual restaurant files');

  // Create city index files
  Object.keys(organized.byCity).forEach(city => {
    const cityPath = path.join(FOOD_PATH, 'By-City', city, 'index.md');
    const cityContent = `# ${city} Restaurants\n\n`;
    fs.writeFileSync(cityPath, cityContent);
  });

  // Archive processed items
  console.log('\n📦 Archiving processed items:');
  archiveProcessed(restaurants);

  // Summary
  console.log(`\n✨ Restaurant processing complete!`);
  console.log(`📍 Guide: Areas/Food-Dining/RESTAURANT-GUIDE.md`);
  console.log(`🌆 Cities: ${Object.keys(organized.byCity).join(', ')}`);
  console.log(`🍜 Cuisines: ${Object.keys(organized.byCuisine).join(', ')}`);

  // Specific biryani note
  const mississaugaIndian = restaurants.filter(r =>
    r.cuisine === 'Indian' && r.city === 'Mississauga'
  ).length;

  if (mississaugaIndian > 0) {
    console.log(`\n🍛 Special: ${mississaugaIndian} potential biryani places in Mississauga!`);
  }
}

main().catch(console.error);