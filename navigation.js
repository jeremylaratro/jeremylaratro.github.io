/**
 * Navigation Component - Modern Vanilla JavaScript
 * Injects a modern navigation bar into all pages
 * Current page is shown but not linked
 */

(function() {
    'use strict';

    // Get current page filename and normalize it
    let currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // Ensure .html extension for comparison
    if (!currentPage.includes('.')) {
        currentPage = currentPage + '.html';
    }

    // Handle empty path (root) as index.html
    if (currentPage === '' || currentPage === '/' || currentPage === '.html') {
        currentPage = 'index.html';
    }

    // Define all navigation links
    const navLinks = [
        { href: 'index.html', text: 'Home', isHome: true },
        { href: 'about.html', text: 'About' },
        { href: 'compsci.html', text: 'Computer Science' },
        { href: 'chem.html', text: 'Chemistry' },
        { href: 'radio.html', text: 'Radio' },
        { href: 'hardware.html', text: 'Hardware' },
        { href: 'photo.html', text: 'Photography' }
    ];

    // Build navigation HTML
    function buildNavHTML() {
        let navItemsHTML = '';

        navLinks.forEach(link => {
            const isCurrent = link.href === currentPage;
            const homeClass = link.isHome ? ' home-link' : '';

            if (isCurrent) {
                // Current page - show as span, not a link
                navItemsHTML += `
                <li class="site-nav-item">
                    <span class="site-nav-link current-page${homeClass}">${link.text}</span>
                </li>`;
            } else {
                // Other pages - show as links
                navItemsHTML += `
                <li class="site-nav-item">
                    <a href="${link.href}" class="site-nav-link${homeClass}">${link.text}</a>
                </li>`;
            }
        });

        return `
        <nav class="site-nav" role="navigation" aria-label="Main navigation">
            <div class="site-nav-container">
                <button class="nav-toggle" aria-expanded="false" aria-controls="nav-list">
                    <span class="nav-toggle-icon"></span>
                    <span class="nav-toggle-label">Menu</span>
                </button>
                <ul class="site-nav-list" id="nav-list">
                    ${navItemsHTML}
                </ul>
            </div>
        </nav>
        `;
    }

    /**
     * Injects navigation into the page
     * Runs when DOM is ready
     */
    function injectNavigation() {
        const navContainer = document.getElementById('site-navigation');

        if (navContainer) {
            navContainer.innerHTML = buildNavHTML();

            // Add mobile toggle functionality
            const toggle = navContainer.querySelector('.nav-toggle');
            const navList = navContainer.querySelector('.site-nav-list');

            if (toggle && navList) {
                toggle.addEventListener('click', function() {
                    const isOpen = navList.classList.toggle('nav-open');
                    toggle.setAttribute('aria-expanded', isOpen);
                });

                // Close menu when clicking a link (mobile)
                navList.querySelectorAll('.site-nav-link').forEach(link => {
                    if (link.tagName === 'A') {
                        link.addEventListener('click', function() {
                            navList.classList.remove('nav-open');
                            toggle.setAttribute('aria-expanded', 'false');
                        });
                    }
                });
            }
        } else {
            console.warn('Navigation container #site-navigation not found on this page');
        }
    }

    // Wait for DOM to be ready before injecting navigation
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectNavigation);
    } else {
        // DOM already loaded
        injectNavigation();
    }

})();
