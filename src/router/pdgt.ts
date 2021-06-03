export default [
    {
        path: '/inventory',
        name: 'Home',
        meta: {
            title: '资产运营驾驶舱'
        },
        component: () => import(/* webpackChunkName: "Home" */ '../views/pdgt/Home.vue'),
        children: [
            {
                path: '',
                name: '/inventory',
                component: () => import(/* webpackChunkName: "Home" */ '../views/pdgt/Inventory.vue'),
            },
            {
                path: '/warning',
                name: 'Warning',
                component: () => import(/* webpackChunkName: "Home" */ '../views/pdgt/Warning.vue'),
            }
        ]
    },
]
