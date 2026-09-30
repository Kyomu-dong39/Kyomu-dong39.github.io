const app = Vue.createApp({
    mixins: Object.values(mixins),
    data() {
        return {
            loading: true,
            progress: 0,
            hiddenMenu: false,
            showMenuItems: false,
            menuColor: false,
            scrollTop: 0,
            renderers: [],
        };
    },
    created() {
        this.startLoading();
        window.addEventListener("load", () => {
            this.finishLoading();
        });
    },
    mounted() {
        window.addEventListener("scroll", this.handleScroll, true);
        this.render();
    },
    methods: {
        startLoading() {
            this.progress = 0;
            this.updateProgress();
            this._loadTimer = setInterval(() => {
                if (this.progress < 90) {
                    this.progress += Math.random() * 8 + 2;
                    if (this.progress > 90) this.progress = 90;
                    this.updateProgress();
                }
            }, 200);
        },
        updateProgress() {
            const bar = document.getElementById("loading-bar");
            const num = document.getElementById("loading-percent-num");
            if (bar) bar.style.width = this.progress + "%";
            if (num) num.textContent = Math.floor(this.progress);
        },
        finishLoading() {
            if (this._loadTimer) {
                clearInterval(this._loadTimer);
                this._loadTimer = null;
            }
            this.progress = 100;
            this.updateProgress();
            setTimeout(() => {
                this.loading = false;
            }, 450);
        },
        render() {
            for (let i of this.renderers) i();
        },
        handleScroll() {
            let wrap = this.$refs.homePostsWrap;
            let newScrollTop = document.documentElement.scrollTop;
            if (this.scrollTop < newScrollTop) {
                this.hiddenMenu = true;
                this.showMenuItems = false;
            } else this.hiddenMenu = false;
            if (wrap) {
                if (newScrollTop <= window.innerHeight - 100) this.menuColor = true;
                else this.menuColor = false;
                if (newScrollTop <= 400) wrap.style.top = "-" + newScrollTop / 5 + "px";
                else wrap.style.top = "-80px";
            }
            this.scrollTop = newScrollTop;
        },
    },
});
app.mount("#layout");

// Discord-like spoiler reveal behavior
(function initDiscordSpoiler() {
    function reveal(el) {
        if (!el || el.classList.contains("revealed")) return;
        el.classList.add("revealed");
        el.setAttribute("aria-expanded", "true");
    }

    document.addEventListener("click", (e) => {
        const t = e.target;
        if (t && t.classList && t.classList.contains("discord-spoiler")) {
            reveal(t);
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key !== "Enter" && e.key !== " ") return;
        const t = e.target;
        if (t && t.classList && t.classList.contains("discord-spoiler")) {
            e.preventDefault();
            reveal(t);
        }
    });
})();
