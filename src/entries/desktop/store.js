// import { Store } from 'vuex';
// // import { isClient, isServer } from '@/utils/env';
// // import createLogger from '@/store/plugins/logger';
// // import logger from '@/utils/logger';
// // import item from '@/store/modules/item';
// // import video from '@/store/modules/video';
// // import user from '@/store/modules/user';
// // import product from '@/store/modules/product';
// // import navigation from '@/store/modules/navigation';
// // import page from '@/store/modules/page';
// // import widget from '@/store/modules/widget';
// // import brand from '@/store/modules/brand';
// // import shared from '@/store/modules/shared';
// // import subject from '@/store/modules/subject';
// // import coupon from '@/store/modules/coupon';
// // import category from '@/store/modules/category';
// // import efficacy from '@/store/modules/efficacy';
// // import redPacket from '@/store/modules/redpacket';

// export default function createStore() {
//   const plugins = [];

//   // if (isClient || (isServer && process.env.VINCI_LOG_LEVEL === 'debug')) {
//   //   plugins.push(createLogger({
//   //     collapsed: false,
//   //     logger,
//   //   }));
//   // }

//   return new Store({
//     plugins,
//     strict: process.env.NODE_ENV !== 'production',
//     modules: {
//       // item: item(app),
//       // user: user(app),
//       // navigation: navigation(app),
//       // page: page(app),
//       // widget: widget(app),
//       // product: product(app),
//       // brand: brand(app),
//       // shared: shared(app),
//       // subject: subject(app),
//       // video: video(app),
//       // coupon: coupon(app),
//       // category: category(),
//       // efficacy: efficacy(),
//       // redPacket: redPacket(app),
//     },
//   });
// }

// store.js
import Vue from 'vue';
import Vuex from 'vuex';

// 假定我们有一个可以返回 Promise 的
// 通用 API（请忽略此 API 具体实现细节）
import { fetchItem } from 'api/fetchItem';

Vue.use(Vuex);

export function createStore() {
  return new Vuex.Store({
    state: {
      items: {},
    },
    actions: {
      fetchItem({ commit }, id) {
        // `store.dispatch()` 会返回 Promise，
        // 以便我们能够知道数据在何时更新
        return fetchItem(id).then((item) => {
          commit('setItem', { id, item });
        });
      },
    },
    mutations: {
      setItem(state, { id, item }) {
        Vue.set(state.items, id, item);
      },
    },
  });
}
