import { createRouter, createWebHashHistory } from 'vue-router';


const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            name: 'largeScreen',
            path: '/largeScreen',
            component: () => import('../components/largeScreen/index.vue')
        },
        {
            name: 'TechnologyScreen',
            path: '/TechnologyScreen',
            component: () => import('../components/TechnologyScreen/index.vue')
        },
        {
            name: 'VRScreen',
            path: '/VRScreen',
            component: () => import('../components/VRScreen/index.vue')
        },
        {
            name: 'example',
            path: '/example/:demoPid?',
            component: () => import('../components/Example/index.vue')
        },
        {
            name: 'blank',
            path: '/blank',
            component: () => import('../components/blank/blank.vue')
        },
        {
            name: 'login',
            path: '/login',
            component: () => import('../components/Login/index.vue')
        },
        {
            name: 'home',
            path: '/home',
            component: () => import('../VGEUtilsPlus/UIPendant/TechnologyStyle/views/home.vue')
        },
        {
            name: 'screen',
            path: '/screen',
            component: () => import('../VGEUtilsPlus/UIPendant/TechnologyStyle/views/screen/index.vue')
        },
        {
            // 404 页面
            name: '404',
            path: '/*',
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

// router.beforeEach((to, from, next) => {
//     let userInfo = localStorage.getItem('userInfo');
//     if (userInfo) {
//         userInfo = JSON.parse(userInfo) || {};
//         next();
//     } else if (to.path === '/login' || to.path === '/' || to.path === '/blank' || to.path === '/404') {
//         next();
//     } else {
//         next({ path: '/login' });
//     }
// });


export default router;
