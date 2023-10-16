<template>
    <el-container class="tac">
        <el-container style="overflow: auto;height: 100%">
            <el-aside width="250px" style="height: 100%">
                <div class="left-menu">
                    <el-menu
                        active-text-color="#ffd04b"
                        background-color="#545c64"
                        class="el-menu-vertical-demo"
                        text-color="#fff"
                    >
                        <el-sub-menu v-for="groupItem in menuList" :index="groupItem.group">
                            <template #title class="el-sub-menu-li">
                                <el-icon>
                                    <location/>
                                </el-icon>
                                <span>{{ groupItem.group }}</span>
                            </template>
                            <el-menu-item v-for="menuItem in groupItem.list" :index="menuItem.name"
                                          @click="handleClick(menuItem)">{{ menuItem.name }}
                            </el-menu-item>
                        </el-sub-menu>
                    </el-menu>
                </div>
            </el-aside>
            <el-main style="padding: 0">
                <iframe id="demoIframe" ref="Sandbox" :src="iframeUrl"></iframe>
            </el-main>
        </el-container>
    </el-container>

</template>


<script>
import Viewer from '@/VGEUtils/components/viewer/viewer.vue';
import { Delete, Edit, Refresh, Share } from '@element-plus/icons-vue';

export default {
    name: 'index',
    components: {Viewer},
    data() {
        return {
            htmlList: [],
            iframeUrl: ''
        };
    },
    computed: {
        Refresh() {
            return Refresh;
        },
        Delete() {
            return Delete;
        },
        Share() {
            return Share;
        },
        Edit() {
            return Edit;
        },
        menuList() {
            const menuMap = new Map();
            const menuList = [];
            this.htmlList.forEach(item => {
                const group = menuMap.get(item.group);
                if (group) {
                    group.push(item);
                } else {
                    menuMap.set(item.group, [item]);
                }
            });

            menuMap.forEach((value, key) => menuList.push({group: key, list: value}));

            return menuList;
        }
    },
    methods: {
        async loadHtmlList() {
            this.htmlList = await fetch(window.demoServer + '/Demo/htmlList.json').then(res => res.json());
        },
        openDemo(pid) {
            this.iframeUrl = './app/WebEditor/index.html?demo=' + pid;
        },
        handleClick(menuItem) {
            this.openDemo(menuItem.pid);
        },
        refresh() {
            let url = this.iframeUrl;
            this.iframeUrl = '';
            this.$nextTick(() => {
                this.iframeUrl = url;
            });
        }
    },
    async mounted() {
        await this.loadHtmlList();
        this.openDemo(this.menuList[0].list[0].pid);
    }
};
</script>

<style lang="less" scoped>
#demoIframe {
    width: 100%;
    height: calc(100% - 1px);
    border: 0;
}


.tac {
    height: 100%;
}

.left-menu {
    height: 100%;
    overflow: auto;
    background-color: #545c64;
}

.el-sub-menu {
    border: rgba(192, 192, 192, 0.52) 1px solid;
}

.el-sub-menu:hover {
    background-color: #1E84F3;
}

.el-menu-item {
    border: rgba(192, 192, 192, 0.24) 1px solid;
    line-height: 38px;
    height: 38px
}

.tac /deep/ .el-sub-menu__title {
    height: 40px !important;
    line-height: 40px !important;
    background-color: #242934 !important;

}
</style>