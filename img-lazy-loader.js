/**
 * YISHEN GLOBAL - KINETIC LAZY LOADER V5.0
 * 逻辑集成：[CYBER_SCAN], [ANIME_RECONSTRUCT], [INTERSECTION_OBSERVER]
 * 适用维度：医疗精密、海洋五金、军工等全品类视觉资产
 */

(function() {
    "use strict";

    const LazyLoader = {
        init() {
            this.injectStyles();
            this.executeObserver();
            console.log("%c >> [VISUAL_SOVEREIGNTY]: IMAGE_SCANNER_ACTIVE ", "background: #0ea5e3; color: #000; font-weight: bold;");
        },

        // 1. [PATCH] 数字化视觉补丁：注入赛博扫描与动漫重组动画
        injectStyles() {
            const style = document.createElement('style');
            style.innerHTML = `
                :root { --neon-blue: #0ea5e3; --deep-space: #010409; }
                
                .lazy-img-container {
                    position: relative;
                    background: var(--deep-space);
                    overflow: hidden;
                    border: 1px solid rgba(14, 165, 227, 0.05);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-height: 200px;
                }
                
                /* 高科技蓝扫描线 */
                .cyber-scanner {
                    position: absolute;
                    top: 0; left: 0; width: 100%; height: 4px;
                    background: linear-gradient(90deg, transparent, var(--neon-blue), transparent);
                    box-shadow: 0 0 15px var(--neon-blue);
                    z-index: 20;
                    animation: scanMove 1.8s infinite cubic-bezier(0.4, 0, 0.2, 1);
                }

                @keyframes scanMove {
                    0% { top: -10%; opacity: 0; }
                    50% { opacity: 1; }
                    100% { top: 110%; opacity: 0; }
                }

                /* 动漫重组进场效果 */
                .img-reconstruct {
                    opacity: 0;
                    transform: scale(1.08) translateY(15px);
                    filter: blur(12px) brightness(2) saturate(0);
                    transition: all 0.9s cubic-bezier(0.16, 1, 0.3, 1);
                }

                .img-manifested {
                    opacity: 1;
                    transform: scale(1) translateY(0);
                    filter: blur(0) brightness(1) saturate(1);
                }

                /* 医疗/军工维度的占位符美化 */
                .lazy-img-container::before {
                    content: "DECRYPTING_ASSET...";
                    position: absolute;
                    font-family: 'JetBrains Mono', monospace;
                    font-size: 8px;
                    color: rgba(14, 165, 227, 0.3);
                    letter-spacing: 2px;
                    animation: pulse 2s infinite;
                }

                @keyframes pulse { 0%, 100% { opacity: 0.3; } 50% { opacity: 0.6; } }
            `;
            document.head.appendChild(style);
        },

        // 2. [PATCH] 核心拦截逻辑：物理检测用户视口
        executeObserver() {
            const images = document.querySelectorAll('img[data-src]');
            
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        this.processImage(img);
                        observer.unobserve(img);
                    }
                });
            }, { rootMargin: "0px 0px 300px 0px" }); // 提前300px激活，确保医疗买家滑到时已完成“对撞”

            images.forEach(img => {
                this.wrapImage(img);
                imageObserver.observe(img);
            });
        },

        wrapImage(img) {
            if (!img.parentElement.classList.contains('lazy-img-container')) {
                const wrapper = document.createElement('div');
                wrapper.className = 'lazy-img-container';
                img.parentNode.insertBefore(wrapper, img);
                wrapper.appendChild(img);
                img.classList.add('img-reconstruct');
            }
        },

        processImage(img) {
            const container = img.parentElement;
            const src = img.getAttribute('data-src');

            // 注入扫描能量条
            const scanner = document.createElement('div');
            scanner.className = 'cyber-scanner';
            container.appendChild(scanner);

            // 执行物理加载
            img.src = src;
            img.onload = () => {
                img.classList.add('img-manifested');
                setTimeout(() => {
                    scanner.style.opacity = '0';
                    setTimeout(() => scanner.remove(), 500);
                }, 400);
            };
        }
    };

    document.addEventListener("DOMContentLoaded", () => LazyLoader.init());
})();
