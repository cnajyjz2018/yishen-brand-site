/**
 * ====================================================================================================
 * YiShen Global Website - V31.1 Core JavaScript
 * Purpose: Handles essential UI interactions (Mobile Navigation & UX Safeguards)
 * Scope: Minimal, stable, production-safe
 * Author: YiShen Global Engineering System
 * Date: Dec 2025 → 2026 Ready
 * ====================================================================================================
 */

(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', () => {

        // === Mobile Navigation Toggle ===
        const menuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');

        if (!menuBtn || !navLinks) return;

        const openMenu = () => navLinks.classList.add('active');
        const closeMenu = () => navLinks.classList.remove('active');
        const toggleMenu = () => navLinks.classList.toggle('active');

        // A. Toggle via hamburger icon
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });

        // B. Close menu when clicking any nav link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // C. Close menu when clicking outside navigation (mobile UX polish)
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !menuBtn.contains(e.target)) {
                closeMenu();
            }
        });

        // D. Close menu with ESC key (desktop / tablet UX)
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeMenu();
            }
        });

        /**
         * ============================================================================================
         * Reserved Extension Area (Frozen by Design)
         * --------------------------------------------------------------------------------------------
         * Future features (ONLY if required):
         * - Form validation logic
         * - SKU table filtering / sorting
         * - Scroll-triggered analytics hooks
         *
         * Rule:
         * ❌ Do NOT add marketing logic here
         * ❌ Do NOT add tracking scripts here
         * ✔ Keep this file clean & deterministic
         * ============================================================================================
         */

    });

})();
