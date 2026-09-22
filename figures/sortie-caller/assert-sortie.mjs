#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const card = JSON.parse(readFileSync(join(here, 'sortie.json'), 'utf8'));

if (card.figureId !== 'sortie-caller') throw new Error('bad figureId');
const banned = new Set(card.bannedTokens || []);
const off = new Set(card.offRosterThisWave || []);
if (card.sorties.length !== 3) throw new Error('need exactly 3 sorties');
const ids = new Set();
for (const s of card.sorties) {
  if (!s.id || !s.assignee || !s.repo || !s.outcome || !s.test) {
    throw new Error('sortie missing fields: ' + s.id);
  }
  if (ids.has(s.id)) throw new Error('duplicate sortie id ' + s.id);
  ids.add(s.id);
  if (off.has(s.assignee)) throw new Error('off-roster assignee ' + s.assignee);
  for (const token of banned) {
    if (s.assignee.includes(token) || s.id.includes(token)) {
      throw new Error('banned token in sortie ' + s.id);
    }
  }
}
if (card.mergePolicy !== 'pr-only') throw new Error('merge policy must be pr-only');
console.log(`ok sortie-caller sorties=${card.sorties.length}`);
