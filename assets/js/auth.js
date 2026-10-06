/**
 * Lumiere — AUTH PAGES
 * Password reveal toggles, shared by login and register.
 */

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.pw-toggle').forEach(toggle => {
    const field = document.getElementById(toggle.dataset.target);
    if (!field) return;

    toggle.addEventListener('click', () => {
      const revealed = field.type === 'text';
      field.type = revealed ? 'password' : 'text';
      toggle.innerHTML = revealed
        ? '<i class="ph ph-eye"></i>'
        : '<i class="ph ph-eye-slash"></i>';
      toggle.setAttribute('aria-label', revealed ? 'Show password' : 'Hide password');
      field.focus();
    });
  });
});

