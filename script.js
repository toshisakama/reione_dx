/* =========================================
   REIONE DX Roadmap LP - JS
========================================= */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Scroll Reveal Animation using Intersection Observer
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-fade');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Reveal only once
            }
        });
    }, {
        root: null,
        rootMargin: '0px 0px -100px 0px', // Trigger slightly before the element comes into view
        threshold: 0.1
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 2. Interactive Pyramid Diagram Logic
    const pyramidLayers = document.querySelectorAll('.pyramid-layer');
    const detailPanels = document.querySelectorAll('.detail-panel');

    // Function to switch active layer and corresponding detail panel
    const activateLayer = (targetId, currentLayer) => {
        // Remove active class from all layers and panels
        pyramidLayers.forEach(layer => layer.classList.remove('active'));
        detailPanels.forEach(panel => panel.classList.remove('active'));

        // Add active class to clicked/hovered layer
        currentLayer.classList.add('active');

        // Show corresponding detail panel
        const targetPanel = document.getElementById(`info-${targetId}`);
        if(targetPanel) {
            targetPanel.classList.add('active');
        }
    };

    // Add click event listeners (for mobile/desktop support)
    pyramidLayers.forEach(layer => {
        layer.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            activateLayer(targetId, this);
        });

        // Optional: Hover effect for desktop (mouse enter)
        layer.addEventListener('mouseenter', function() {
            // Only trigger hover interaction on larger screens to avoid mobile tap issues
            if(window.innerWidth > 992) {
                const targetId = this.getAttribute('data-target');
                activateLayer(targetId, this);
            }
        });
    });

    // 3. Simple Navbar Scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if(window.scrollY > 50) {
            navbar.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.08)';
            navbar.style.padding = '10px 0';
        } else {
            navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
            navbar.style.padding = '15px 0';
        }
    });

    // Page Load trigger for Hero elements immediately in view
    setTimeout(() => {
        const heroReveals = document.querySelectorAll('.hero .reveal-fade, .hero .reveal-up');
        heroReveals.forEach(el => el.classList.add('active'));
    }, 100);

});
