export default function decorate(block) {
  const rows = [...block.children];
  if (!rows.length) return;

  const slides = rows.map((row) => {
    const cols = [...row.children];
    const quote = cols[0]?.textContent.trim() || '';
    const attribution = cols[1]?.textContent.trim() || '';
    return { quote, attribution };
  });

  block.textContent = '';

  let currentSlide = 0;

  const container = document.createElement('div');
  container.className = 'carousel-container';

  const prevBtn = document.createElement('button');
  prevBtn.className = 'carousel-prev';
  prevBtn.setAttribute('aria-label', 'Previous quote');
  prevBtn.innerHTML = '&#8249;';

  const nextBtn = document.createElement('button');
  nextBtn.className = 'carousel-next';
  nextBtn.setAttribute('aria-label', 'Next quote');
  nextBtn.innerHTML = '&#8250;';

  const slideWrapper = document.createElement('div');
  slideWrapper.className = 'carousel-slides';

  function renderSlide(index) {
    const slide = slides[index];
    slideWrapper.innerHTML = '';

    const quoteEl = document.createElement('blockquote');
    quoteEl.className = 'carousel-quote';
    quoteEl.textContent = slide.quote;

    const attrEl = document.createElement('p');
    attrEl.className = 'carousel-attribution';
    attrEl.textContent = slide.attribution;

    slideWrapper.append(quoteEl, attrEl);
  }

  prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    renderSlide(currentSlide);
  });

  nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slides.length;
    renderSlide(currentSlide);
  });

  container.append(prevBtn, slideWrapper, nextBtn);
  block.append(container);

  renderSlide(0);
}
