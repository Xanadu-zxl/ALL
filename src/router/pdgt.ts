export default [
    {
        path: '/pdgt',
        name: 'Home',
        meta: {
            title: '资产运营驾驶舱'
        },
        component: () => import(/* webpackChunkName: "Home" */ '../views/pdgt/Home.vue'),
        children: [
            {
                path: '',
                name: 'Inventory',
                component: () => import(/* webpackChunkName: "Home" */ '../views/pdgt/Inventory.vue'),
            },
            {
                path: '/pdgt/warning',
                name: 'Warning',
                component: () => import(/* webpackChunkName: "Home" */ '../views/pdgt/Warning.vue'),
            }
        ]
    },
]
