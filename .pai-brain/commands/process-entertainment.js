#!/usr/bin/env node

/**
 * Entertainment Processing & Organization
 * Processes movie/TV recommendations from cognitive operations
 */

const fs = require('fs');
const path = require('path');

const ACTIVE_OPS = '/Users/kavi/Obsidian/.pai-brain/cognitive-operations/active-operations';
const ENTERTAINMENT_PATH = '/Users/kavi/Obsidian/Areas/Entertainment';

// Parse entertainment items
function parseEntertainmentItems() {
  const files = fs.readdirSync(ACTIVE_OPS).filter(f => f.endsWith('.md'));
  const items = [];

  files.forEach(file => {
    const content = fs.readFileSync(path.join(ACTIVE_OPS, file), 'utf8');

    if (content.toLowerCase().includes('imdb.com') || content.includes('- IMDb')) {
      // Extract metadata
      const titleMatch = content.match(/title:\s*(.+)/);
      const urlMatch = content.match(/https?:\/\/[^\s]*imdb\.com[^\s\)]*/);
      const typeMatch = content.match(/\((TV\s+(?:Series|Mini Series)\s+\d{4}[^)]*)\)|\((\d{4})\)/);

      if (titleMatch) {
        let title = titleMatch[1].trim();
        // Clean up title
        title = title.replace(/^\s*\]\s*\[/, '').replace(/- IMDb.*$/, '').trim();

        // Determine type
        let type = 'movie';
        let year = '';
        if (typeMatch) {
          if (typeMatch[1]) {
            type = 'tv-show';
            year = typeMatch[1].match(/\d{4}/)?.[0] || '';
          } else if (typeMatch[2]) {
            year = typeMatch[2];
          }
        }

        // Check for recommender
        let recommender = '';
        const recoMatch = title.match(/(Sai|Shivam|Dan)\s+reco/i);
        if (recoMatch) {
          recommender = recoMatch[1];
          title = title.replace(/-?\s*(Sai|Shivam|Dan)\s+reco/i, '').trim();
        }

        items.push({
          file,
          title,
          type,
          year,
          recommender,
          url: urlMatch ? urlMatch[0] : '',
          originalContent: content
        });
      }
    }
  });

  return items;
}

// Categorize items
function categorizeItems(items) {
  const categories = {
    movies: {
      recommended: [],
      general: [],
      kids: []
    },
    tvShows: {
      recommended: [],
      general: [],
      kids: []
    }
  };

  items.forEach(item => {
    const isKids = item.title.toLowerCase().includes('kids') ||
                   item.title.includes('Helpsters') ||
                   item.title.includes('Hello, Jack') ||
                   item.title.includes('The Bad Guys') ||
                   item.title.includes('Wild Robot');

    const category = item.type === 'tv-show' ? categories.tvShows : categories.movies;

    if (item.recommender) {
      category.recommended.push(item);
    } else if (isKids) {
      category.kids.push(item);
    } else {
      category.general.push(item);
    }
  });

  return categories;
}

// Create watchlist document
function createWatchlist(categories, items) {
  const now = new Date().toISOString();

  let content = `# 🎬 Entertainment Watchlist
*Last updated: ${now}*
*Source: Things 3 migration + cognitive operations*

---

## 📊 Summary
- **Total Items**: ${items.length}
- **Movies**: ${categories.movies.recommended.length + categories.movies.general.length + categories.movies.kids.length}
- **TV Shows**: ${categories.tvShows.recommended.length + categories.tvShows.general.length + categories.tvShows.kids.length}
- **Recommendations**: ${categories.movies.recommended.length + categories.tvShows.recommended.length}

---

## 🎯 Personal Recommendations

### Recommended Movies
${categories.movies.recommended.length > 0 ? categories.movies.recommended.map(item =>
  `- [ ] **${item.title}** (${item.year}) - *Recommended by ${item.recommender}*
  - [IMDB](${item.url})`
).join('\n') : '*No recommended movies yet*'}

### Recommended TV Shows
${categories.tvShows.recommended.length > 0 ? categories.tvShows.recommended.map(item =>
  `- [ ] **${item.title}** - *Recommended by ${item.recommender}*
  - [IMDB](${item.url})`
).join('\n') : '*No recommended TV shows yet*'}

---

## 🎬 Movies to Watch

### General Interest
${categories.movies.general.length > 0 ? categories.movies.general.map(item =>
  `- [ ] **${item.title}** (${item.year})
  - [IMDB](${item.url})`
).join('\n') : '*No general movies yet*'}

### Kids & Family
${categories.movies.kids.length > 0 ? categories.movies.kids.map(item =>
  `- [ ] **${item.title}** (${item.year})
  - [IMDB](${item.url})`
).join('\n') : '*No kids movies yet*'}

---

## 📺 TV Shows to Watch

### General Interest
${categories.tvShows.general.length > 0 ? categories.tvShows.general.map(item =>
  `- [ ] **${item.title}**
  - [IMDB](${item.url})`
).join('\n') : '*No general TV shows yet*'}

### Kids & Family
${categories.tvShows.kids.length > 0 ? categories.tvShows.kids.map(item =>
  `- [ ] **${item.title}**
  - [IMDB](${item.url})`
).join('\n') : '*No kids TV shows yet*'}

---

## 📈 Viewing Patterns

### By Recommender
${getRecommenderStats(items)}

### By Genre/Type
- Action/Thriller: ${countGenre(items, ['jackal', 'fall guy', 'sound of freedom'])}
- Sci-Fi: ${countGenre(items, ['dark', 'interstellar', 'dune', 'robot'])}
- Documentary: ${countGenre(items, ['factory', 'surveilled'])}
- Drama: ${countGenre(items, ['daughter', 'rehearsal'])}
- Kids/Family: ${countGenre(items, ['wild robot', 'bad guys', 'hello jack', 'helpsters'])}

---

## 🎲 Quick Pick Suggestions

### When You Want Something...

**Mind-bending**: Interstellar, Dark, Dark Matter
**Thrilling**: The Day of the Jackal, The Fall Guy, Sound of Freedom
**Thought-provoking**: American Factory, Surveilled
**Light/Fun**: The Bad Guys, The Wild Robot
**With Kids**: Hello Jack, Helpsters, The Wild Robot

---

## 📝 Notes

- Sai's recommendations lean toward sci-fi and complex narratives
- Shivam recommended Dune (epic sci-fi)
- Several documentaries in queue (American Factory, Surveilled)
- Good mix of recent releases (2024) and classics

---

*Use \`node ~/.claude/commands/process-entertainment.js\` to update this list*
`;

  return content;
}

// Helper functions
function getRecommenderStats(items) {
  const stats = {};
  items.forEach(item => {
    if (item.recommender) {
      stats[item.recommender] = (stats[item.recommender] || 0) + 1;
    }
  });

  return Object.entries(stats)
    .map(([name, count]) => `- ${name}: ${count} recommendations`)
    .join('\n') || '- No personal recommendations yet';
}

function countGenre(items, keywords) {
  return items.filter(item =>
    keywords.some(keyword =>
      item.title.toLowerCase().includes(keyword)
    )
  ).length;
}

// Create individual item files
function createItemFiles(categories) {
  // Create movie files
  [...categories.movies.recommended, ...categories.movies.general, ...categories.movies.kids].forEach(item => {
    const filename = `${item.title.replace(/[^a-zA-Z0-9 ]/g, '')} ${item.year}`.trim() + '.md';
    const filePath = path.join(ENTERTAINMENT_PATH, 'Movies', filename);

    const content = `# ${item.title} (${item.year})

## Metadata
- **Type**: Movie
- **Year**: ${item.year}
- **Added**: ${new Date().toISOString().split('T')[0]}
${item.recommender ? `- **Recommended by**: ${item.recommender}` : ''}
- **Status**: To Watch
- **IMDB**: ${item.url}

## Notes
*Add viewing notes here*

## Rating
⭐ *Not yet rated*

---
*Imported from cognitive operations*`;

    fs.writeFileSync(filePath, content);
  });

  // Create TV show files
  [...categories.tvShows.recommended, ...categories.tvShows.general, ...categories.tvShows.kids].forEach(item => {
    const filename = `${item.title.replace(/[^a-zA-Z0-9 ]/g, '')}.md`;
    const filePath = path.join(ENTERTAINMENT_PATH, 'TV-Shows', filename);

    const content = `# ${item.title}

## Metadata
- **Type**: TV Series
- **Added**: ${new Date().toISOString().split('T')[0]}
${item.recommender ? `- **Recommended by**: ${item.recommender}` : ''}
- **Status**: To Watch
- **IMDB**: ${item.url}

## Episodes Watched
- [ ] Season 1

## Notes
*Add viewing notes here*

## Rating
⭐ *Not yet rated*

---
*Imported from cognitive operations*`;

    fs.writeFileSync(filePath, content);
  });
}

// Archive processed items
function archiveProcessedItems(items) {
  const archivePath = '/Users/kavi/Obsidian/.pai-brain/cognitive-operations/completed-archive/entertainment';

  if (!fs.existsSync(archivePath)) {
    fs.mkdirSync(archivePath, { recursive: true });
  }

  items.forEach(item => {
    const sourcePath = path.join(ACTIVE_OPS, item.file);
    const destPath = path.join(archivePath, item.file);

    if (fs.existsSync(sourcePath)) {
      fs.renameSync(sourcePath, destPath);
      console.log(`  📦 Archived: ${item.title}`);
    }
  });
}

// Main execution
async function main() {
  console.log('🎬 Processing Entertainment Items...\n');

  // Parse items
  const items = parseEntertainmentItems();
  console.log(`Found ${items.length} entertainment items\n`);

  // Categorize
  const categories = categorizeItems(items);

  // Create master watchlist
  const watchlist = createWatchlist(categories, items);
  fs.writeFileSync(path.join(ENTERTAINMENT_PATH, 'Watchlists', 'MASTER-WATCHLIST.md'), watchlist);
  console.log('✅ Created master watchlist');

  // Create individual files
  createItemFiles(categories);
  console.log('✅ Created individual entertainment files');

  // Archive processed items
  console.log('\n📦 Archiving processed items:');
  archiveProcessedItems(items);

  console.log(`\n✨ Entertainment processing complete!`);
  console.log(`📍 Watchlist: Areas/Entertainment/Watchlists/MASTER-WATCHLIST.md`);
  console.log(`🎬 Movies: ${categories.movies.recommended.length + categories.movies.general.length + categories.movies.kids.length}`);
  console.log(`📺 TV Shows: ${categories.tvShows.recommended.length + categories.tvShows.general.length + categories.tvShows.kids.length}`);
}

main().catch(console.error);