import { readFile, writeFile, rename } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
const path = process.argv[2] ?? fileURLToPath(new URL('../gold/history.json', import.meta.url));
const valid = r => r && /^\d{4}-\d{2}-\d{2}$/.test(r.d) && Number.isFinite(r.gram) && r.gram >= 1000 && r.gram <= 100000 && Number.isFinite(r.ceyrek) && r.ceyrek / r.gram >= 1.4 && r.ceyrek / r.gram <= 1.8;
try {
  const response = await fetch('https://finans.truncgil.com/v4/today.json', { signal: AbortSignal.timeout(8000) });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const body = await response.json();
  const row = { d: typeof body.Update_Date === 'string' ? body.Update_Date.slice(0, 10) : '', ceyrek: body.CEYREKALTIN?.Selling, gram: body.GRA?.Selling };
  if (!valid(row)) throw new Error('Geçersiz canlı fiyat');
  const history = JSON.parse(await readFile(path, 'utf8'));
  if (history.source !== 'Truncgil Finans' || !Array.isArray(history.days) || !history.days.every(valid)) throw new Error('Geçersiz geçmiş');
  const days = new Map(history.days.map(day => [day.d, day]));
  days.set(row.d, row);
  const sorted = [...days.values()].sort((a, b) => a.d.localeCompare(b.d));
  const next = { source: 'Truncgil Finans', updated: sorted.at(-1).d, days: sorted };
  await writeFile(`${path}.tmp`, JSON.stringify(next, null, 2) + '\n');
  await rename(`${path}.tmp`, path);
  console.log(`Altın geçmişi geçerli: ${sorted.length} gün; son ${next.updated}`);
} catch (error) { console.error(error.message); process.exitCode = 1; }
