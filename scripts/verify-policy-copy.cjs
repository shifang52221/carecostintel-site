const fs = require('node:fs');
const path = require('node:path');

const root = process.cwd();

const read = (relativePath) =>
  fs.readFileSync(path.join(root, relativePath), 'utf8');

const files = [
  {
    path: 'src/pages/privacy/index.astro',
    mustInclude: [
      'Non-essential analytics and advertising technologies are not currently active on this site.',
      'Affiliate or partner monetization links are not currently active on this site.'
    ],
    mustExclude: [
      'We use analytics and advertising tools to measure site usage and support free access.',
      'Some links may be affiliate or partner links.'
    ]
  },
  {
    path: 'src/pages/advertising-disclosure/index.astro',
    mustInclude: [
      'Ads, sponsored placements, and affiliate monetization are not currently active on this site.',
      'If advertising or affiliate relationships are introduced later, this page will be updated before those changes go live.'
    ],
    mustExclude: [
      'We may earn revenue from ads or affiliate relationships.',
      'Some links may be affiliate links. If you click and take action, we may receive a commission at no additional cost to you.',
      'Advertising networks may use cookies or similar technologies to measure performance.'
    ]
  }
];

const failures = [];

for (const file of files) {
  const source = read(file.path);

  for (const expected of file.mustInclude) {
    if (!source.includes(expected)) {
      failures.push(`Missing required copy in ${file.path}: ${expected}`);
    }
  }

  for (const banned of file.mustExclude) {
    if (source.includes(banned)) {
      failures.push(`Found outdated copy in ${file.path}: ${banned}`);
    }
  }
}

if (failures.length) {
  console.error('Policy copy verification failed:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('Policy copy verification passed.');
