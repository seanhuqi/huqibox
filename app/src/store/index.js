import Vue from "vue"; // 引入vue
import Vuex from "vuex"; // 引入vuex
Vue.use(Vuex); // 使用vuex

const moduleA = {
  state: () => ({
    count: 200,
  }),
  mutations: {},
  actions: {},
  getters: {},
};

const moduleB = {
  state: () => ({
    count: 300,
  }),
  mutations: {},
  mutations: {},
  actions: {},
};

// 暴露一个仓库实例对象
export default new Vuex.Store({
  // 核心1:  存入数据( 放多个组件共享的数据 )
  state: {
    num: 0,

    ages: [16, 17, 18, 19, 20],

    // 商品数据 ( 商品组件 和 购物车列表组件 共享这一份数据 )
    goods: [],
  },

  // 核心2:  mutations是修改仓库状态(数据)的唯一方式
  mutations: {
    // 增加数据 参数1:state对象本身 参数2: 你传递过来的参数
    ADD(state, n) {
      state.num += n; // 把state中的num + n
    },

    // 减少数据的函数
    REDUCE(state, n) {
      state.num -= n;
    },

    // 把商品数据放入仓库的函数
    SET_GOODS(state, data) {
      state.goods = data;
    },

    // 改变商品的数量
    CHANGE_NUM(state, obj) {
      // 两层循环 找到当前商品的名字 count+1 或者 -1
      for (let item of state.goods) {
        for (let food of item.foods) {
          if (food.name === obj.name) {
            food.count += obj.num;
          }
        }
      }
    },

    // 清空仓库数据 (所有数量都变为0)
    EMPTY(state) {
      for (let item of state.goods) {
        for (let food of item.foods) {
          food.count = 0;
        }
      }
    },
  },

  // 核心3: 仓库中的计算属性
  getters: {
    // 过滤数据
    newAges(state) {
      return state.ages.filter((age) => age > 18);
    },

    // 找到仓库中count > 0的所有食品数据
    shopListData(state) {
      let arr = []; // 定一个空数组
      for (let item of state.goods) {
        for (let food of item.foods) {
          if (food.count > 0) {
            // 双层循环 找到每一个食品 如果它的count大于0 就加入数组
            arr.push(food);
            // break;
          }
        }
      }

      // 根据名字数组对象去重
      let newArr = [];
      let obj = {};
      for (let item of arr) {
        if (!obj[item.name]) {
          obj[item.name] = "xxx";
          newArr.push(item);
        }
      }
      return newArr; // 返回结果
    },
  },

  // 一般用于异步更新状态(数据) ( ajax获取到的数据 本身不会改变状态的 最终还是要提交mutations )
  actions: {
    // 异步改变
    // context  相当于 $store 就是仓库的实例对象
    ASYNC_ADD(context, n) {
      console.log("触发了 触发了", context, n);

      // 假装1s之后 才获取到数据
      setTimeout(() => {
        context.commit("ADD", n); // 1s之后 去触发mutations 修改数据
      }, 5000);
    },
  },
  modules: {
    moduleA,
    moduleB,
  },
});