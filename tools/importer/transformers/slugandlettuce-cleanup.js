/* eslint-disable */
/* global WebImporter */

const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Remove cookie consent dialog (OneTrust)
    WebImporter.DOMUtils.remove(element, [
      '#onetrust-consent-sdk',
      '#onetrust-banner-sdk',
      '.onetrust-pc-dark-filter',
      '[class*="onetrust"]',
    ]);

    // Remove Angular comments and hidden elements
    const comments = [];
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_COMMENT);
    while (walker.nextNode()) comments.push(walker.currentNode);
    comments.forEach((c) => c.remove());

    // Remove invisible/hidden elements
    WebImporter.DOMUtils.remove(element, [
      '.cdk-visually-hidden',
      '[class*="hidden"]',
      'img.invisible',
    ]);
  }

  if (hookName === TransformHook.afterTransform) {
    // Remove non-authorable site chrome
    WebImporter.DOMUtils.remove(element, [
      'navbar-section',
      'nav',
      'footer',
      '[role="contentinfo"]',
      'router-outlet',
      'noscript',
      'link',
      'iframe',
    ]);
  }
}
