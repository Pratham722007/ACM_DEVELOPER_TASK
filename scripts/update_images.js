const fs = require('fs');
const path = require('path');

const teamFile = path.join(__dirname, '../acm-svnit-web/data/team.ts');
const imgDir = path.join(__dirname, '../acm-svnit-web/public/teams/allteams');

let content = fs.readFileSync(teamFile, 'utf8');

const updated = content.replace(/({ id: "t\d{4}-(\d+)",[\s\S]*?)( })/g, (match, start, idNum, end) => {
  const num = parseInt(idNum, 10);
  if (fs.existsSync(path.join(imgDir, num + '.jpg'))) {
    if (!match.includes('image:')) {
      return start + `, image: "/teams/allteams/${num}.jpg"` + end;
    }
  }
  return match;
});

fs.writeFileSync(teamFile, updated);
console.log('Script finished successfully.');
