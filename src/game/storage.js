// Safe JSON wrappers around localStorage / sessionStorage (they can throw in
// private windows or when storage is blocked).

export function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function save(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable */
  }
}

export function sessionFlag(key) {
  try {
    return sessionStorage.getItem(key) === '1';
  } catch {
    return false;
  }
}

export function setSessionFlag(key) {
  try {
    sessionStorage.setItem(key, '1');
  } catch {
    /* storage unavailable */
  }
}
