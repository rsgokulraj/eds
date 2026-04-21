export default function decorate(block) {
  const rows = [...block.children];
  const config = {};

  rows.forEach((row) => {
    const cols = [...row.children];
    if (cols.length >= 2) {
      const key = cols[0].textContent.trim().toLowerCase();
      const value = cols[1].textContent.trim();
      config[key] = value;
    }
  });

  const placeholder = config.placeholder || 'Search for a job...';
  const radiusDefault = config.radius || '10 miles';
  const actionUrl = config.action || '/vacancies';
  const buttonText = config.button || 'Search';
  const radiusOptions = ['5 miles', '10 miles', '15 miles', '25 miles', '50 miles'];

  block.textContent = '';

  const form = document.createElement('form');
  form.className = 'job-search-form';
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = form.querySelector('.job-search-location').value;
    const radius = form.querySelector('.job-search-radius').value;
    const params = new URLSearchParams();
    if (location) params.set('location', location);
    if (radius) params.set('radius', radius);
    window.location.href = `${actionUrl}?${params.toString()}`;
  });

  const locationInput = document.createElement('input');
  locationInput.type = 'search';
  locationInput.className = 'job-search-location';
  locationInput.placeholder = placeholder;
  locationInput.setAttribute('aria-label', 'Job location');

  const radiusSelect = document.createElement('select');
  radiusSelect.className = 'job-search-radius';
  radiusSelect.setAttribute('aria-label', 'Search radius');
  radiusOptions.forEach((opt) => {
    const option = document.createElement('option');
    option.value = opt;
    option.textContent = opt;
    if (opt === radiusDefault) option.selected = true;
    radiusSelect.append(option);
  });

  const searchBtn = document.createElement('button');
  searchBtn.type = 'submit';
  searchBtn.className = 'job-search-button';
  searchBtn.textContent = buttonText;

  form.append(locationInput, radiusSelect, searchBtn);
  block.append(form);
}
