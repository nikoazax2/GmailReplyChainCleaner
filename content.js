// Gmail Reply Chain Cleaner
// Automatically removes quoted reply chains from Gmail messages

(function() {
  'use strict';

  // Common patterns for reply chains in English
  const REPLY_PATTERNS = [
    /^On .+ wrote:$/m,  // "On Mon, Jan 1, 2024 at 10:00 AM, someone@email.com wrote:"
    /^On .+, .+ <.+> wrote:$/m,  // "On Mon, Jan 1, 2024, Someone <someone@email.com> wrote:"
    /^From: .+$/m,  // Email forwarding headers
    /^Sent: .+$/m,
    /^To: .+$/m,
    /^Subject: .+$/m,
    /^Date: .+$/m,
    /^\d{4}-\d{2}-\d{2} .+ GMT.+:$/m,  // Date stamps
    /^Le .+ a écrit :$/m,  // French pattern (common in bilingual contexts)
  ];

  // Selectors for Gmail compose/reply areas
  const COMPOSE_SELECTORS = [
    'div[contenteditable="true"]',
    'div[role="textbox"]',
    'div.Am.Al.editable'
  ];

  // Function to detect if a text block is a reply chain
  function isReplyChain(element) {
    if (!element || !element.textContent) return false;
    
    const text = element.textContent.trim();
    
    // Check against known patterns
    for (const pattern of REPLY_PATTERNS) {
      if (pattern.test(text)) {
        return true;
      }
    }
    
    // Check for Gmail's quoted text div
    if (element.classList && element.classList.contains('gmail_quote')) {
      return true;
    }
    
    // Check for blockquote elements (often used for replies)
    if (element.tagName === 'BLOCKQUOTE') {
      return true;
    }
    
    return false;
  }

  // Function to remove reply chains from an element
  function cleanReplyChains(element) {
    if (!element) return;
    
    // Find all gmail_quote divs (Gmail's marker for quoted text)
    const gmailQuotes = element.querySelectorAll('.gmail_quote');
    gmailQuotes.forEach(quote => {
      console.log('[Gmail Cleaner] Removing gmail_quote element');
      quote.remove();
    });
    
    // Find all blockquotes
    const blockquotes = element.querySelectorAll('blockquote');
    blockquotes.forEach(quote => {
      // Only remove if it looks like a reply chain
      if (isReplyChain(quote)) {
        console.log('[Gmail Cleaner] Removing blockquote element');
        quote.remove();
      }
    });
    
    // Check all div elements for reply patterns
    const divs = element.querySelectorAll('div');
    divs.forEach(div => {
      if (isReplyChain(div)) {
        console.log('[Gmail Cleaner] Removing reply chain div');
        div.remove();
      }
    });
  }

  // Function to process compose/reply windows
  function processComposeWindows() {
    COMPOSE_SELECTORS.forEach(selector => {
      const composeAreas = document.querySelectorAll(selector);
      composeAreas.forEach(area => {
        // Only process if it hasn't been processed yet
        if (!area.dataset.cleanerProcessed) {
          cleanReplyChains(area);
          area.dataset.cleanerProcessed = 'true';
          
          // Re-process when content changes
          const observer = new MutationObserver(() => {
            cleanReplyChains(area);
          });
          
          observer.observe(area, {
            childList: true,
            subtree: true
          });
        }
      });
    });
  }

  // Initial processing
  console.log('[Gmail Cleaner] Extension loaded');
  
  // Wait for Gmail to load
  setTimeout(() => {
    processComposeWindows();
  }, 2000);

  // Watch for new compose windows opening
  const bodyObserver = new MutationObserver(() => {
    processComposeWindows();
  });

  bodyObserver.observe(document.body, {
    childList: true,
    subtree: true
  });

  // Also check periodically in case mutation observer misses something
  setInterval(processComposeWindows, 3000);

  console.log('[Gmail Cleaner] Monitoring for reply chains...');
})();
