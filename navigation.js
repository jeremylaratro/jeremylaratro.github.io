/**
 * Navigation Component - Vanilla JavaScript
 * Injects navigation menu into all pages
 * No build tools required - pure JavaScript
 */

(function() {
    'use strict';

    // Get current page filename
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // Define all navigation links
    const navLinks = [
        { href: 'index.html', text: 'Home', class: 'div1' },
        { href: 'about.html', text: 'About | Contact', class: 'div2' },
        { href: 'compsci.html', text: 'Computer Science', class: 'div3' },
        { href: 'chem.html', text: 'Chemistry', class: 'div4' },
        { href: 'radio.html', text: 'Radio', class: 'div5' },
        { href: 'hardware.html', text: 'Hardware', class: 'div6' },
        { href: 'photo.html', text: 'Photography', class: 'div7' }
    ];

    // Filter out current page
    const filteredLinks = navLinks.filter(link => link.href !== currentPage);

    // Build navigation HTML
    let navItemsHTML = '';
    filteredLinks.forEach((link, index) => {
        navItemsHTML += `
                <div class="div${index + 1} hard top">
                    <div class="container top text-center">
                        <div class="rfbackground margin-0 display-fit-content">
                            <div class="card-header">
                                <div class="testbutton">
                                    <a href="${link.href}">${link.text}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
    });

    const navigationHTML = `
        <div class="container main text-center padding-0">
            <div class="parent hard top height-5-percent">${navItemsHTML}
            </div>
        </div>
    `;

    /**
     * Injects navigation into the page
     * Runs when DOM is ready
     */
    function injectNavigation() {
        const navContainer = document.getElementById('site-navigation');

        if (navContainer) {
            navContainer.innerHTML = navigationHTML;
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
