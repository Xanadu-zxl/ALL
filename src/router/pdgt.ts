export default [
    {
        path: '/pdgt',
        name: 'Home',
        meta: {
            title: '资产运营驾驶舱'
        },
        component: () => import(/* webpackChunkName: "Home" */ '../views/pdgt/Home.vue')
    },
]