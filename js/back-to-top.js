document.addEventListener('DOMContentLoaded', function() {
    // 创建回到顶部按钮
    var backToTopBtn = document.createElement('div');
    backToTopBtn.className = 'back-to-top';
    document.body.appendChild(backToTopBtn);

    // 监听滚动事件
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    // 点击回到顶部
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});