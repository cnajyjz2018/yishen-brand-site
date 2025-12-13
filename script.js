document.addEventListener('DOMContentLoaded', () => {
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // 移动端菜单
    const menuBtn = document.querySelector('.menu-toggle');
    menuBtn.addEventListener('click', () => {
        alert('Welcome to YiShen Global. (Mobile menu expanding...)');
    });
});
