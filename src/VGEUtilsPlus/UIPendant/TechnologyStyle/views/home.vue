<template>
    <div class="home">
        <section class="home-content">
            <div class="title-box">
                <h6>xxxx应用</h6>
            </div>
            <div class="content-box">
                <div class="left">
                    <ul>
                        <li v-for="(item, index) in oneRouter" :key="index" @click="oneRouterHandle(item)">
                            <div>应用1</div>
                        </li>
                    </ul>
                </div>
                <div class="middle">
                    <ul>
                        <li v-for="(item, index) in twoRouter" :key="index" @click="twoRouterHandle(item)">
                            <div>{{ item.title }}</div>
                        </li>
                    </ul>
                </div>
                <div class="right">
                    <ul>
                        <li v-for="(item, index) in threeRouter" :key="index" @click="threeRouterHandle(item)">
                            <div>应用4</div>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    </div>
</template>

<script>

export default {
    name: 'home',
    data() {
        return {
            oneRouter: [
                {
                    titleImg: new URL('../assets/img/p1.png', import.meta.url).href,
                    from: ''
                },
                {
                    titleImg: new URL('../assets/img/p2.png', import.meta.url).href,
                    from: ''
                }
            ],
            twoRouter: [
                {
                    from: '',
                    title: '应用1'
                },
                {
                    from: '',
                    title: '应用2'
                },
                {
                    from: '',
                    title: '应用3'
                }
            ],
            threeRouter: [
                {
                    from: '/TechnologyScreen'
                }
            ]
        };
    },
    methods: {
        oneRouterHandle() {
        },
        twoRouterHandle() {
        },
        threeRouterHandle(item) {
            const { href } = this.$router.resolve({
                path: item.from
            });
            window.open(href, '_blank');
        }
    }
};

</script>
<style lang='less' scoped>
.home {
    height: 100vh;
    background: url('../assets/img/img.png') no-repeat center center;
    background-size: 100% 100%;

    .home-content {
        position: relative;
        padding-top: 7%;

        h6 {
            background: linear-gradient(0deg, #E1FCFF 0%, #ACD9FF 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-family: '35-font';
            font-size: 40px;
            font-weight: normal;
            text-align: center;
        }

        img {
            display: block;
            width: 100%;
            height: 100%;
        }

        li {
            cursor: pointer;
        }

        div {
            font-family: '35-font';
            letter-spacing: 2px;
        }

        .title-box {
            width: 724px;
            margin: 0 auto;
        }

        .content-box {
            display: flex;
            flex: 1;
            justify-content: center;
            padding-top: 10%;

            .left {
                width: 427px;

                li:nth-of-type(1) {
                    background: url('../assets/img/b1_icon.png') no-repeat center center;
                    background-size: auto;
                    height: 138px;
                    padding-left: 15px;

                    div {
                        width: 148px;
                        line-height: 38px;
                        margin: 0 auto;
                        padding-top: 35px;
                        text-align: center;
                        transform: perspective(600px) rotateY(-20deg) rotateX(5deg) rotateZ(2deg);
                    }

                    &:hover {
                        background: url('../assets/img/b1-hover.png') no-repeat center center;
                        background-size: auto;
                    }
                }

                li:nth-of-type(2) {
                    margin-top: 20px;
                    background: url('../assets/img/b2_icon.png') no-repeat center center;
                    background-size: auto;
                    height: 185px;


                    div {
                        width: 148px;
                        margin: 0 auto;
                        text-align: center;
                        padding-top: 40px;
                        transform: perspective(600px) rotateY(-20deg) rotateX(5deg) rotateZ(3deg);
                        line-height: 38px;
                    }

                    &:hover {
                        background: url('../assets/img/b2-hover.png') no-repeat center center;
                        background-size: auto;
                    }
                }

                div {
                    font-size: 25px;
                    font-weight: bold;
                    color: #c5fcfe;
                }
            }

            .middle {
                width: 523px;

                li {
                    height: 123px;
                    background: url('../assets/img/b3_icon.png') no-repeat center center;
                    background-size: auto;

                    div {
                        height: 100%;
                        line-height: 105px;
                        margin-top: 5px;
                        background: linear-gradient(0deg, #FFD9B3 0%, #FFFFFF 100%);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        text-align: center;
                        font-size: 24px;
                        font-weight: bold;
                    }

                    &:hover {
                        background: url('../assets/img/b3-hover.png') no-repeat center center;
                        background-size: auto;
                    }
                }
            }

            .right {
                width: 434px;

                li {
                    height: 360px;
                    background: url('../assets/img/b4_icon.png') no-repeat center center;
                    background-size: auto;

                    div {
                        width: 182px;
                        height: 84px;
                        padding-top: 110px;
                        margin: 0 auto;
                        transform: perspective(600px) rotateY(15deg) rotateX(5deg) rotateZ(-2deg);
                        line-height: 50px;
                        font-size: 32px;
                        font-weight: bold;
                        color: #c5fcfe;
                    }

                    &:hover {
                        background: url('../assets/img/b4-hover.png') no-repeat center center;
                        background-size: auto;
                    }
                }
            }
        }
    }


}
</style>