/**
 * ====================================================================================================
 * YiShen Global Website - V31.0 Core JavaScript
 * Purpose: Handles essential user interface interactions (Mobile Navigation).
 * Author: AI Assistant for YiShen Global
 * Date: December 2025 (Ready for 2026 Deployment)
 * ====================================================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Mobile Navigation Toggle Logic (Handles Menu Open/Close) ---
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn && navLinks) {
        
        // A. Primary Listener: Toggles the 'active' class when the hamburger icon is clicked.
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // B. Secondary Listener: Improves mobile UX by closing the menu when a navigation link is clicked.
        const allLinks = navLinks.querySelectorAll('a');
        allLinks.forEach(link => {
            link.addEventListener('click', () => {
                // Ensure the menu closes after the user selects a destination
                navLinks.classList.remove('active');
            });
        });
    }

    // --- 2. Future Client-Side Hooks (Currently Frozen) ---
    // If we later implement:
    // - Complex form validation (e.g., custom error handling)
    // - Advanced scroll parallax or view-in-port animations
    // - Client-side SKU data filtering (outside of simple links)
    // These functions would be added here, after core content is verified.
    
    // Reminder: CSS handles mobile viewports, catalog grid interactions, and responsive design entirely.
});
