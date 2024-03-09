import { createRouter, createWebHashHistory } from 'vue-router';


const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            redirect: '/largeScreen'
        },
        {
            path: '/largeScreen',
            name: 'largeScreen',
            component: () => import('../components/VGEEarth/LargeScreen/index.vue')
        },
        {
            path: '/example',
            name: 'example',
            component: () => import('../components/Example/index.vue')
        },
        {
            path: '/blank',
            name: 'blank',
            component: () => import('../components/Blank/blank.vue')
        },
        {
            // 404 页面
            path: '/*',
            name: '404',
            component: () => import('../VGEUtils/views/404/pageMissing.vue')
        },
        {
            // 找不到路由重定向到 404 页面
            path: '/:pathMatch(.*)',
            component: () => import('../VGEUtils/views/404/pageMissing.vue'),
            hideMenu: true
        }
    ]

});

export default router;
