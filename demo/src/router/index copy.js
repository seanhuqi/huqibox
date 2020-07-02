import Vue from 'vue'
import VueRouter from 'vue-router'


// 解决跳重复跳转到同一个地址的警告问题
const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch((error) => error);
};

Vue.use(VueRouter);

import Login from '../views/Login.vue'
import Layout from '../views/Layout/Layout.vue'
import local from '../utils/local'
Vue.use(VueRouter)

// 修改为动态路由

export const routes = [{
    // 登录
    path: '/login',
    component: Login,
  },
  // 后台首页
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      meta: {
        title: "后台首页"
      },
      path: 'home',
      component: () => import('../views/Home.vue')
    }]
  },
  // 订单管理
  {
    path: '/order',
    component: Layout,
    redirect: "/order/order-list",
    meta: {
      title: "订单管理"
    },
    children: [{
        meta: {
          title: "订单列表"
        },
        path: 'order-list',
        component: () => import('../views/Order/OrderList.vue')
      },
      {
        meta: {
          title: "订单详情"
        },
        path: 'order-detail',
        component: () => import('../views/Order/OrderDetail.vue')
      }
    ]
  },
  // 商品管理
  {
    path: '/goods',
    component: Layout,
    meta: {
      title: "商品管理"
    },
    redirect: "/goods/goods-list",
    children: [{
        meta: {
          title: "商品列表"
        },
        path: 'goods-list',
        component: () => import('../views/Goods/GoodsList.vue')
      },
      {
        meta: {
          title: "商品分类"
        },
        path: 'goods-cate',
        component: () => import('../views/Goods/GoodsCate.vue')
      },
      {
        meta: {
          title: "商品添加"
        },
        path: 'goods-add',
        component: () => import('../views/Goods/GoodsAdd.vue')
      }
    ]
  },
  // 店铺管理
  {
    path: '/shop',
    component: Layout,
    children: [{
      meta: {
        title: "店铺管理"
      },
      path: '',
      component: () => import('../views/Shop.vue')
    }, ]
  },
  // 账号管理
  {
    path: '/account',
    component: Layout,
    redirect: "/account/account-list",
    meta: {
      title: "账号管理"
    },
    children: [{
        meta: {
          title: "账号列表"
        },
        path: 'account-list',
        component: () => import('../views/Account/AccountList.vue')
      },
      {
        meta: {
          title: "密码修改"
        },
        path: 'pass-modify',
        component: () => import('../views/Account/PassModify.vue')
      },
      {
        meta: {
          title: "账号添加"
        },
        path: 'account-add',
        component: () => import('../views/Account/AccountAdd.vue')
      },
      {
        meta: {
          title: "个人中心"
        },
        path: 'personal',
        component: () => import('../views/Account/Personal.vue')
      }
    ]
  },
  // 销售统计
  {
    path: '/total',
    component: Layout,
    redirect: "/Total/goods-total",
    children: [{
        meta: {
          title: "商品统计"
        },
        path: 'goods-total',
        component: () => import('../views/Total/GoodsTotal.vue')
      },
      {
        meta: {
          title: "订单统计"
        },
        path: 'order-total',
        component: () => import('../views/Total/OrderTotal.vue')
      },
    ]
  },

]

const router = new VueRouter({
  routes
})

// 路由守卫
/**
 * 路由守卫,会把所有的路由都守护起来, 你想要访问任务的路由 都需要先经过这个守卫
 * 所以:
 *   1. 我们可以在守卫里面 判断 这个用户到底能否访问路由
 */


router.beforeEach((to, from, next) => {
  let isLogin = local.get("tk") ? true : false; // 检查是否登录
  if (to.path === "/login") {
    next(); // 放行
  } else {
    if (isLogin) {
      next(); // 放行
    } else {
      next("/login"); // 重置到登录
    }
  }
});
export default router