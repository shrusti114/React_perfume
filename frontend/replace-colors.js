const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

const replacements = [
  { from: /bg-\[#fafafa\]/g, to: 'bg-neutral-50 dark:bg-neutral-950' },
  { from: /text-\[#000000\]/g, to: 'text-black dark:text-white' },
  { from: /bg-\[#000000\]/g, to: 'bg-black dark:bg-white/10' }, // Buttons or dark backgrounds
  { from: /border-\[#000000\]\/5/g, to: 'border-black/5 dark:border-white/10' },
  { from: /border-\[#000000\]\/10/g, to: 'border-black/10 dark:border-white/20' },
  { from: /border-\[#000000\]\/20/g, to: 'border-black/20 dark:border-white/30' },
  { from: /text-white hover:text-\[#000000\]/g, to: 'text-white dark:text-white hover:text-black dark:hover:text-black' },
  { from: /hover:bg-\[#FFD1DC\]/g, to: 'hover:bg-[#FFD1DC] dark:hover:bg-[#f8c8dc]' },
  { from: /focus:ring-\[#FFD1DC\]/g, to: 'focus:ring-[#FFD1DC] dark:focus:ring-[#f8c8dc]' },
  { from: /focus:border-\[#FFD1DC\]/g, to: 'focus:border-[#FFD1DC] dark:focus:border-[#f8c8dc]' },
  { from: /hover:text-\[#FFD1DC\]/g, to: 'hover:text-[#FFD1DC] dark:hover:text-[#f8c8dc]' },
  { from: /text-\[#FFD1DC\]/g, to: 'text-[#FFD1DC] dark:text-[#f8c8dc]' },
  { from: /bg-\[#FFD1DC\]/g, to: 'bg-[#FFD1DC] dark:bg-[#f8c8dc]' },
];

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.jsx') || file.endsWith('.js')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk(srcDir);
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  
  replacements.forEach(({from, to}) => {
    content = content.replace(from, to);
  });
  
  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});

console.log('Colors replaced successfully!');
