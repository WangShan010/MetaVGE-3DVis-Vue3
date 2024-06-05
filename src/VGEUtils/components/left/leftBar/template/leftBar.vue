<template>
    <div ref="leftBar-box" :style="{top:css_top}" class="leftBar-box">
        <div class="tool-title">
            <div>
                <img alt="" src="./img/base-map.png">
                <span>{{ title }}</span>
            </div>
            <img alt="" class="close-btn" src="./img/close.png" @click="close">
        </div>
        <div class="tool-body">
            <slot></slot>
        </div>
    </div>
    <div v-show="hasShowBtn && displayBtn"
         ref="leftBar-box-showBtn"
         :style="{top:`calc(${css_top} + 90px)`}"
         class="leftBar-box-showBtn" @click="showBackBtn">
        <el-icon>
            <DArrowRight/>
        </el-icon>
        <span>
      展开列表
    </span>
    </div>
</template>

<script>
import animationTool from './lib/animationTool.js';

export default {
    name: 'leftBar',
    data() {
        return {
            // 刷新计时器
            refreshTimer: null,

            selItem: null,
            hideBack: false,
            displayBtn: false
        };
    },
    props: {
        title: {
            type: String,
            default: ''
        },
        css_top: {
            type: String,
            default: '120px'
        },
        hasShowBtn: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        close() {
            this.hideBackBtn();
        },
        hideBackBtn() {
            this.hideBack = true;
            this.displayBtn = true;
            animationTool(this.$refs['leftBar-box'], { left: -370 });
            animationTool(this.$refs['leftBar-box-showBtn'], { opacity: 100, left: 0 });
        },
        showBackBtn() {
            this.hideBack = false;
            animationTool(this.$refs['leftBar-box'], { left: 20 });
            animationTool(this.$refs['leftBar-box-showBtn'], { opacity: 0 });
            animationTool(this.$refs['leftBar-box-showBtn'], { opacity: 0, left: 370 }, () => {
                this.displayBtn = false;
            });
        }
    },
    unmounted() {
        clearInterval(this.refreshTimer);
    }
};
</script>

<style lang='less' scoped>
.leftBar-box {
    position: absolute;
    left: 40px;
    width: 360px;
    background: rgba(33, 45, 33, 0.8);
    border-radius: 10px;
    min-height: 30vh;
    max-height: 40vh;
    overflow: hidden;

    .tool-body {
        padding: 5px;
        min-height: calc(30vh - 50px);
        max-height: calc(40vh - 50px);
        overflow: auto;
    }

    .tool-body::-webkit-scrollbar {
        display: none
    }

    .ctr-btns {
        text-align: right;
        padding: 10px;
        border-top: solid 1px rgba(255, 255, 255, 0.4)
    }
}

.tool-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    font-size: 16px;
    font-weight: 400;
    color: #FFFFFF;
    height: 35px;
    line-height: 35px;
    border-bottom: 1px solid rgba(185, 197, 185, 0.2);

    img:first-child {
        margin-right: 0.5vw;
    }

    .close-btn {
        text-align: right;
        width: 22px;
        height: 22px;
        color: #fff;
        border-radius: 3px;
        padding: 2px;
        cursor: pointer;
    }

    .close-btn:hover {
        background: rgba(245, 222, 179, 0.4);
    }
}

.leftBar-box-showBtn {
    border-radius: 0 5px 5px 0;
    border-left: #A6AEB1 1px solid;
    position: absolute;
    left: 370px;
    background: rgba(33, 45, 33, 0.8);
    width: 30px;
    height: 110px;
    cursor: pointer;
    font-size: 15px;
    color: #ffffff;
    padding: 10px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    span {
        writing-mode: vertical-lr;
    }
}
</style>
