<template>
    <div class="masing-out"></div>
    <div class="header-box">
        <h1>{{ appName }}</h1>
        <div class="left-nav">
            <ul>
                <li v-for="(item,index) in titleHeader.left" :key="item.name"
                    :class="item.open ? (index!==titleHeader.left.length-1? 'activeNav' : 'lastActiveNav') : ''"
                    @click="setTitleHeaderCurrent(item.id)">
                    <span>{{ item.name }}</span>
                </li>
            </ul>
            <div class="home" @click="backHome">
                <span class="iconfont icon-shouye"></span>
                <span>首页</span>
            </div>
        </div>
        <div class="right-nav">
            <ul>
                <li v-for="(item, index) in titleHeader.right" :key="item.name"
                    :class="item.open ? (index===0? 'firstActiveNav' : 'activeNav') : ''"
                    @click="setTitleHeaderCurrent(item.id)">
                    <span>{{ item.name }}</span>
                </li>
            </ul>
            <div class="setting">
                <span class="iconfont icon-shezhi"></span>
                <span>设置</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TitleHeader55',
    computed: {
        appName() {
            return VGEEarth.ConfigTool.config.appName;
        },
        titleHeader() {
            return this.$store.state.VGEEarthStore.titleHeader;
        },
        titleHeaderCurrent() {
            return this.$store.getters.titleHeaderCurrent();
        }
    },
    methods: {
        backHome() {
            this.$router.push('/login');
        },
        setTitleHeaderCurrent(index) {
            if (this.titleHeaderCurrent?.id === index) {
                store.commit('setTitleHeaderCurrent', '');
            } else {
                store.commit('setTitleHeaderCurrent', index);
            }
            if (this.titleHeaderCurrent?.url) {
                window.open(this.titleHeaderCurrent?.url);
            }
        }
    }
};
</script>


<style lang="less" scoped>

.header-box {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    height: calc((94 / 1080) * 100vh);
    background: url('../../../assets/img/head-bg.png') no-repeat center center;
    background-size: 100% 100%;

    h1 {
        margin-bottom: 0;
        margin-top: 0;
        font-family: '35-font';
        line-height: calc((60 / 1080) * 100vh);
        margin-left: 20px;
        font-size: calc(100vw * 28 / 1920);
        font-weight: normal;
        background: linear-gradient(to bottom, #FFFFFF 40%, rgba(42, 184, 220, 1));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        text-align: center;
        letter-spacing: 5px;
    }

    ul {
        display: flex;

        li {
            background-size: 100% 100%;
            flex: 1;
            text-align: center;
            cursor: pointer;
            line-height: calc((35 / 1080) * 100vh);

            span {
                font-weight: bold;
                font-size: calc(100vw * 16 / 1920);
                background: linear-gradient(to bottom, #FFFFFF 40%, rgba(42, 184, 220, 1));
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }

            &:hover {
                span {
                    background: linear-gradient(to bottom, #FFFFFF 0%, #ffe6ab 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

            }

        }

    }

    .left-nav {
        position: absolute;
        top: calc((33 / 1080) * 100vh);
        width: 36.5%;

        ul {
            padding-left: 21%;

            li {
                background: url('../../../assets/img/leftnav1.png') no-repeat center center;
                background-size: 100% 100%;

                &:nth-of-type(2) {
                    position: relative;
                    left: -1%;
                }

                &:nth-of-type(3) {
                    position: relative;
                    left: -2%;
                }

                &:nth-of-type(4) {
                    position: relative;
                    left: -3%;
                }

                &:last-child {
                    background: url('../../../assets/img/leftnav2.png') no-repeat center center;
                    background-size: 100% 100%;
                }

                &:not(:last-child):hover {
                    background: url('../../../assets/img/leftnav1-hover.png') no-repeat center center;
                    background-size: 100% 100%;
                }

                &:last-child:hover {
                    background: url('../../../assets/img/leftnav2-hover.png') no-repeat center center;
                    background-size: 100% 100%;
                }

                &.activeNav {
                    background: url('../../../assets/img/leftnav1-hover.png') no-repeat center center;
                    background-size: 100% 100%;

                    span {
                        background: linear-gradient(to bottom, #FFFFFF 0%, #ffe6ab 100%);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                    }
                }

                &.lastActiveNav {
                    background: url('../../../assets/img/leftnav2-hover.png') no-repeat center center;
                    background-size: 100% 100%;

                    span {
                        background: linear-gradient(to bottom, #FFFFFF 0%, #ffe6ab 100%);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                    }
                }
            }
        }

        .home {
            position: absolute;
            top: calc((20 / 1080) * 100vh);
            margin-left: 1.9%;
            background: url('../../../assets/img/home.png') no-repeat center center;
            background-size: 100% 100%;
            text-align: center;
            width: calc((78 / 1920) * 100vw);
            cursor: pointer;
            padding-top: 2px;
            line-height: calc((18 / 1080) * 100vh);

            span {
                display: inline-block;
                margin-left: 2px;
                color: #8dfffb;
                font-size: calc(100vw * 12 / 1920);
            }

            img {
                display: inline-block;
                width: 1vmin;
                height: 1vmin;
            }

            &:hover {
                background: url('../../../assets/img/home-hover.png') no-repeat center center;
                background-size: 100% 100%;

                span {
                    color: #FFE8BD;
                }
            }
        }
    }

    .right-nav {
        position: absolute;
        top: calc((33 / 1080) * 100vh);
        right: 0;
        width: 35.5%;
        color: #fff;

        ul {
            padding-right: 16%;

            li {
                background: url('../../../assets/img/rightnav1.png') no-repeat center center;
                background-size: 100% 100%;

                &:nth-of-type(2) {
                    position: relative;
                    left: -1%;
                }

                &:nth-of-type(3) {
                    position: relative;
                    left: -2%;
                }

                &:nth-of-type(4) {
                    position: relative;
                    left: -3%;
                }

                &:first-child {
                    background: url('../../../assets/img/rightnav2.png') no-repeat center center;
                    background-size: 100% 100%;
                }

                &:not(:first-child):hover {
                    background: url('../../../assets/img/rightnav1-hover.png') no-repeat center center;
                    background-size: 100% 100%;
                }

                &:first-child:hover {
                    background: url('../../../assets/img/rightnav2-hover.png') no-repeat center center;
                    background-size: 100% 100%;
                }


                &.activeNav {
                    background: url('../../../assets/img/rightnav1-hover.png') no-repeat center center;
                    background-size: 100% 100%;
                }

                &.firstActiveNav {
                    background: url('../../../assets/img/rightnav2-hover.png') no-repeat center center;
                    background-size: 100% 100%;
                }
            }
        }

        .setting {
            position: absolute;
            right: 0;
            top: calc((20 / 1080) * 100vh);
            margin-right: 1.9%;
            background: url('../../../assets/img/setting.png') no-repeat center center;
            background-size: 100% 100%;
            text-align: center;
            width: calc((78 / 1920) * 100vw);
            padding-top: 2px;
            line-height: calc((18 / 1080) * 100vh);
            cursor: pointer;

            img {
                width: 1.1vmin;
                height: 1.1vmin;
            }

            span {
                display: inline-block;
                margin-left: 2px;
                color: #8dfffb;
                font-size: calc(100vw * 12 / 1920);
            }

            &:hover {
                background: url('../../../assets/img/setting-hover.png') no-repeat center center;
                background-size: 100% 100%;

                span {
                    color: #FFE8BD;
                }
            }
        }
    }

}


.masing-out {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    height: 24%;
    background: url('../../../assets/img/masking-out.png') no-repeat center center;
    background-size: 100% 100%;
    pointer-events: none;
}

</style>
