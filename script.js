let lastKey = null;
const PROP_NAMES = ['ctrlKey', 'shiftKey', 'altKey', 'metaKey', 'code', 'key', 'charCode', 'keyCode'];

function isModifier(key) {
  return PROP_NAMES.slice(0, 4).includes(key);
}

function isMain(key) {
  return PROP_NAMES.slice(4, 6).includes(key);
}

function isDeprecated(key) {
  return PROP_NAMES.slice(-2).includes(key);
}

/**
 *
 * @param {KeyboardEvent} e
 */
function handlePress(e) {
  e.preventDefault();
  if (e.code === lastKey) return;
  const values = PROP_NAMES.map(prop => [prop, e[prop]]);

  lastKey = e.code;

  values.map(([key, val]) => {
    document.querySelector(`#${key}`).innerText = isMain(key) ? `"${val}"` : `${val}`;
    if (isModifier(key)) {
      document.querySelector(`#${key}`).dataset.active = val;
    }
  });
}

function buildPage() {
  const input = document.querySelector('input');
  input.addEventListener('keydown', handlePress);
  input.addEventListener('blur', () => {
    setTimeout(() => {
      input.focus();
    }, 0);
  });
}

document.addEventListener('DOMContentLoaded', buildPage);
