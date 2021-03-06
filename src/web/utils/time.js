export function timeAgo(time, minDelta = 24 * 60 * 60 * 1000) {
  if (!time) return;
  const delta = Date.now() - new Date(time).getTime();
  if (delta < minDelta) return;
  return `${formatDuration(delta)} ago`;
}

export function formatTime(str) {
  if (!str) return '?';
  const date = new Date(str);
  const h = date.getHours().toString().padStart(2, '0');
  const m = date.getMinutes().toString().padStart(2, '0');
  const s = date.getSeconds().toString().padStart(2, '0');
  return `${h}:${m}:${s}`;
}

const units = [{
  step: 1000,
  title: '{}ms',
}, {
  step: 60,
  title: '{}s',
}, {
  step: 60,
  title: '{}min',
}, {
  step: 24,
  title: '{}h',
}, {
  step: 30,
  title: '{}d',
}, {
  step: 12,
  title: '{}mon',
}, {
  step: 10,
  title: '{}yr',
}, {
  title: 'long time',
}];
export function formatDuration(time, maxUnits = 2) {
  const results = [];
  for (let i = 0, t = time; t && i < units.length; i += 1) {
    const unit = units[i];
    const value = unit.step ? t % unit.step : (t | 0);
    results.push(value ? unit.title.replace('{}', value) : '');
    t = unit.step ? (t / unit.step) | 0 : 0;
  }
  return results.slice(-maxUnits).reverse().filter(i => i).join(' ') || '0s';
}
