const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#site-navigation');

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Open menu' : 'Close menu');
    navigation.classList.toggle('is-open', !isOpen);
  });

  navigation.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      navigation.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open menu');
    }
  });
}

document.querySelectorAll('[data-year]').forEach((element) => {
  element.textContent = String(new Date().getFullYear());
});

const serviceSelect = document.querySelector('#service');
const serviceFromUrl = new URLSearchParams(window.location.search).get('service');
const supportedServices = new Set([
  'social-media-marketing',
  'seo',
  'google-ads-analytics',
]);

if (serviceSelect && supportedServices.has(serviceFromUrl)) {
  serviceSelect.value = serviceFromUrl;
}

const inquiryForm = document.querySelector('#inquiry-form');
const formStatus = document.querySelector('#form-status');

if (inquiryForm && formStatus) {
  inquiryForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(inquiryForm);
    const serviceLabel = serviceSelect.selectedOptions[0].textContent;
    const details = [
      ['Name', formData.get('fullName')],
      ['Business', formData.get('business')],
      ['Email', formData.get('email')],
      ['Phone / WhatsApp', formData.get('phone')],
      ['Service', serviceLabel],
      ['Approximate monthly budget', formData.get('budget')],
      ['Goals', formData.get('message')],
    ].filter(([, value]) => String(value ?? '').trim());
    const subject = `Yalla Digital inquiry — ${serviceLabel}`;
    const body = details.map(([label, value]) => `${label}: ${value}`).join('\n\n');
    const mailto = `mailto:andrewayad22@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    formStatus.textContent = 'Your email app should open with the inquiry ready to review. If it does not, email andrewayad22@gmail.com.';
    formStatus.hidden = false;
    window.location.href = mailto;
  });
}
