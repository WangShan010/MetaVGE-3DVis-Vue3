<template>
    <div class="header">
        <div v-show="isShowMenu" class="btns btn-left">
            <div v-for="item in titleHeader.left" class="title-btn">
                <a v-if="item.type==='url'" :href="item.url" style="color: whitesmoke" target="_blank">{{ item.name }}</a>
                <a v-if="item.type==='menu'" style="color: whitesmoke" target="_blank">{{ item.name }}</a>
                <a></a>
            </div>
        </div>
        <div class="title" style="width: 35%;text-align: center">{{ appName }}</div>
        <div v-show="isShowMenu" class="btns btn-right">
            <div v-for="item in titleHeader.right" class="title-btn">
                <a v-if="item.type==='url'" :href="item.url" style="color: whitesmoke" target="_blank">{{ item.name }}</a>
                <a v-if="item.type==='menu'" style="color: whitesmoke" target="_blank">{{ item.name }}</a>
                <a></a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'tileHeader',
    data: function () {
        return {
            themeColor: 'green', // 支持换肤功能 green ：原始绿 yellow ：黄
            isShowMenu: true
        };
    },
    computed: {
        appName() {
            return VGEEarth.ConfigTool.config.appName;
        },
        titleHeader() {
            return this.$store.state.VGEEarthStore.titleHeader;
        }
    },
    methods: {
        titleClickEvent() {
            const titleDoms = document.querySelectorAll('.title-btn');
            titleDoms.forEach(item => {
                item.addEventListener('click', function () {
                    const preActive = document.querySelector('.active');
                    if (preActive) {
                        preActive.classList.remove('active');
                    }
                    item.classList.add('active');
                });
            });
        }
    },
    mounted() {
        let that = this;
        window.addEventListener('resize', function () {
            that.isShowMenu = innerWidth > 850;
        });
        this.titleClickEvent();

    }
};
</script>

<style lang='less' scoped>
@import "../assets/css/common-theme.less";
@import "../assets/css/green-theme.less";
@import "../assets/css/yellow-theme.less";
</style>
