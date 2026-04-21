/* eslint-disable */
/* global WebImporter */

const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Remove cookie consent (OneTrust)
    WebImporter.DOMUtils.remove(element, [
      '#onetrust-consent-sdk',
      '#onetrust-banner-sdk',
      '.onetrust-pc-dark-filter',
      '[class*="onetrust"]',
    ]);

    // Remove mobile menu
    WebImporter.DOMUtils.remove(element, [
      '.mob-menu',
    ]);

    // Remove dummy content placeholders (search loading skeletons)
    WebImporter.DOMUtils.remove(element, [
      '.dummy-content-wrapper',
      '#rootLocationLoader',
    ]);

    // Remove location search results and map (dynamic content)
    WebImporter.DOMUtils.remove(element, [
      '.search-location-result.root-search-location-result',
      '#map_canvas',
    ]);

    // Remove venue selector widget (dynamic)
    WebImporter.DOMUtils.remove(element, [
      '#locationSiteSelector',
      '.cms-176021',
    ]);
  }

  if (hookName === TransformHook.afterTransform) {
    // Remove non-authorable site chrome
    WebImporter.DOMUtils.remove(element, [
      '.header-container',
      '.header-top',
      '#footer',
      '.footer-root',
      'footer',
      'nav',
      '.ma5menu',
      '.mob-nav',
      '#js-ma5menu',
      '.smartApp-container',
      '.gold-rule',
      'noscript',
      'link',
      'iframe',
      'select',
      'input',
      '.search-location-result',
      '.root-home-location-search',
    ]);
  }
}
