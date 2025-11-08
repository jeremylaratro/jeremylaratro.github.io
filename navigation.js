/**
 * Navigation Component - Vanilla JavaScript
 * Injects navigation menu into all pages
 * No build tools required - pure JavaScript
 */

(function() {
    'use strict';

    // Navigation template as a string
    const navigationHTML = `
        <div class="container main text-center padding-0">
            <div class="parent hard top height-5-percent">
                <div class="div1 hard top">
                    <div class="card-header"></div>
                </div>
                <div class="div2 hard top"></div>
                <div class="div3 hard top">
                    <div class="container top text-center">
                        <div class="rfbackground margin-0 display-fit-content">
                            <div class="card-header">
                                <div class="testbutton">
                                    <a href="index.html">Home</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="div4 hard top">
                    <div class="container top text-center">
                        <div class="rfbackground margin-0 display-fit-content">
                            <div class="card-header">
                                <div class="testbutton">
                                    <a href="about.html">About | Contact</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="div5 hard top">
                    <div class="container top text-center">
                        <div class="rfbackground margin-0 display-fit-content">
                            <div class="card-header">
                                <div class="testbutton">
                                    <a href="compsci.html">Computer Science</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="div6 hard top">
                    <div class="container top text-center">
                        <div class="rfbackground margin-0 display-fit-content">
                            <div class="card-header">
                                <div class="testbutton">
                                    <a href="chem.html">Chemistry</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="div7 hard top">
                    <div class="container top text-center">
                        <div class="rfbackground margin-0 display-fit-content">
                            <div class="card-header">
                                <div class="testbutton">
                                    <a href="radio.html">Radio</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="div8 hard top">
                    <div class="container top text-center">
                        <div class="rfbackground margin-0 display-fit-content">
                            <div class="card-header">
                                <div class="testbutton">
                                    <a href="hardware.html">Hardware</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="div1 hard top">
                    <div class="container top text-center">
                        <div class="rfbackground margin-0 display-fit-content">
                            <div class="card-header">
                                <div class="testbutton">
                                    <a href="photo.html">Photography</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
