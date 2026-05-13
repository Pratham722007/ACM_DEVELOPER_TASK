// Script to convert allteams.js to team.ts format
const fs = require('fs');
const path = require('path');

// Read the raw JS file and extract the array
const raw = fs.readFileSync(path.join(__dirname, '..', 'data', 'allteams', 'allteams.js'), 'utf8');

// Remove import and export, extract just the array
const arrayStr = raw
  .replace(/import.*\n/g, '')
  .replace(/export default allteams\s*/, '')
  .replace(/const allteams =/, '')
  .trim();

// Use eval to parse (safe since it's our own data)
const allteams = eval(arrayStr);

// Normalize designation to role
function normalizeRole(d) {
  d = d.trim().replace(/\r?\n/g, '');
  const lower = d.toLowerCase();
  if (lower.includes('chair-person') || lower === 'chairperson') return 'Chairperson';
  if (lower.includes('vice')) return 'Vice-Chairperson';
  if (lower === 'secretary') return 'Secretary';
  if (lower === 'treasurer') return 'Treasurer';
  if (lower === 'developer' || lower === 'web developer') return 'Developer';
  if (lower === 'problem setter') return 'Problem Setter';
  if (lower === 'designer') return 'Designer';
  if (lower === 'editor') return 'Editor';
  if (lower === 'community head') return 'Community Head';
  if (lower.includes('core mem')) return 'Core Member';
  return d; // fallback
}

// Build TeamMember array
const members = allteams.map(m => {
  const obj = {
    id: `t${m.year}-${String(m.id).padStart(3,'0')}`,
    name: m.name.trim(),
    role: normalizeRole(m.designation),
    domain: "General",
    year: m.year,
  };
  
  // LinkedIn
  if (m.linkedin && m.linkedin.trim()) {
    obj.linkedin = m.linkedin.trim();
  }
  // GitHub  
  if (m.github && m.github.trim()) {
    obj.github = m.github.trim();
  }
  
  return obj;
});

// Build year highlights from real data
const yearHighlights = {
  2025: [
    "DotSlash 8.0 — 26-hour national hackathon with 40 teams",
    "Hour of Code — Educated 500+ school students across 5 schools",
    "Epiphany 14 — National level CP contest",
    "CodeWars at MINDBEND 2025",
  ],
  2024: [
    "Inception 9.0 — College-level CP contest",
    "SIH 2023 Stage 1 Ideathon mentorship",
    "Open Source Workshop — 70+ attendees",
    "ACM Summer Challenge — 30-day CP bootcamp",
  ],
  2023: [
    "Website completely revamped by the core team",
    "ButterFlask-UI open source project launched",
    "Continued Epiphany CP contest series",
  ],
  2022: [
    "Expanded team structure with LinkedIn integration",
    "Continued national-level programming contests",
  ],
  2021: [
    "Virtual events during COVID-19 pandemic",
    "Maintained community engagement online",
  ],
  2020: [
    "Adapted to fully virtual event format",
    "DotSlash hackathon series continued",
  ],
  2019: [
    "Strong developer and problem setter team",
    "Multiple national-level contest participations",
  ],
  2018: [
    "Expanded core team with dedicated roles",
    "Regular Epiphany contests and workshops",
  ],
  2017: [
    "Active social media presence established",
    "Diversified team with editors and designers",
  ],
  2016: [
    "Problem setter role formally introduced",
    "Growing community with 13 team members",
  ],
  2015: [
    "Expanded to include editors, designers, and problem setters",
    "Active Facebook community building",
  ],
  2014: [
    "Structured team with dedicated web developers",
    "Editor and problem setter roles added",
  ],
  2013: [
    "Team expanded with designer and editor roles",
    "10 team members across various positions",
  ],
  2012: [
    "Second year of the chapter",
    "Growing to 8 team members",
  ],
  2011: [
    "ACM NIT Surat chapter founded",
    "Initial team of 8 members established",
  ],
};

// Generate TypeScript output
let output = `import { TeamMember } from "@/types";\n\n`;
output += `export const teamMembers: TeamMember[] = [\n`;

members.forEach(m => {
  output += `  { id: "${m.id}", name: "${m.name}", role: "${m.role}", domain: "${m.domain}", year: ${m.year}`;
  if (m.linkedin) output += `, linkedin: "${m.linkedin}"`;
  if (m.github) output += `, github: "${m.github}"`;
  output += ` },\n`;
});

output += `];\n\n`;
output += `export const yearHighlights: Record<number, string[]> = ${JSON.stringify(yearHighlights, null, 2)};\n`;

fs.writeFileSync(path.join(__dirname, '..', 'data', 'team.ts'), output, 'utf8');
console.log(`Converted ${members.length} team members across years ${[...new Set(members.map(m=>m.year))].sort().join(', ')}`);
