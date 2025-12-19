/**
 * YISHEN GLOBAL — High-Tech Kinetic Lazy Loader
 * Features: Cyber-Blue Scanning, Anime Fade-in, Mobile Optimized
 */

document.addEventListener("DOMContentLoaded", () => {
    // 1. 创建高科技扫描样式补丁
    const stylePatch = document.createElement('style');
    stylePatch.innerHTML = `
        .lazy-img-container {
            position: relative;
            background: #010409;
            overflow: hidden;
            border: 1px solid rgba(14, 165, 233, 0.1);
        }
        
        /* 扫描动画效果 - 动漫风格的高科技蓝 */
        .cyber-scanner {
            position: absolute;
            top: 0; left: 0; width: 100%; height: 3px;
            background: linear-gradient(90deg, transparent, var(--neon-blue), transparent);
            box-shadow: 0 0 15px var(--neon-blue);
            z-index: 10;
            animation: scanMove 2s infinite ease-in-out;
        }

        @keyframes scanMove {
            0% { top: -5%; opacity: 0; }
            50% { opacity: 1; }
            100% { top: 105%; opacity: 0; }
        }

        /* 图片进场效果 - 动漫重组 */
        .img-loaded {
            animation: animeAppear 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            filter: brightness(1);
        }

        @keyframes animeAppear {
            0% { opacity: 0; transform: scale(1.05) translateY(10px); filter: blur(10px) brightness(2); }
            100% { opacity: 1; transform: scale(1) translateY(0); filter: blur(0) brightness(1); }
        }
    `;
    document.head.appendChild(stylePatch);

    // 2. 核心懒加载逻辑 (使用 Intersection Observer)
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.getAttribute('data-src');

                // 注入扫描器
                const container = img.parentElement;
                const scanner = document.createElement('div');
                scanner.className = 'cyber-scanner';
                container.appendChild(scanner);

                // 开始加载高清图
                img.src = src;
                img.onload = () => {
                    img.classList.add('img-loaded');
                    scanner.remove(); // 加载完成移除扫描器
                };

                observer.unobserve(img); // 停止观察已加载的图片
            }
        });
    }, {
        rootMargin: "0px 0px 200px 0px" // 提前200px开始加载，确保用户滚动到时已准备好
    });

    images.forEach(img => {
        // 包裹容器以支持扫描动画
        if (img.parentElement.tagName !== 'DIV' || !img.parentElement.classList.contains('lazy-img-container')) {
            const wrapper = document.createElement('div');
            wrapper.className = 'lazy-img-container';
            img.parentNode.insertBefore(wrapper, img);
            wrapper.appendChild(img);
        }
        imageObserver.observe(img);
    });
});
