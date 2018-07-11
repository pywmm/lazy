import { Store } from 'vuex';
// import { isClient, isServer } from '@/utils/env';
// import createLogger from '@/store/plugins/logger';
// import logger from '@/utils/logger';
// import item from '@/store/modules/item';
// import video from '@/store/modules/video';
// import user from '@/store/modules/user';
// import product from '@/store/modules/product';
// import navigation from '@/store/modules/navigation';
// import page from '@/store/modules/page';
// import widget from '@/store/modules/widget';
// import brand from '@/store/modules/brand';
// import shared from '@/store/modules/shared';
// import subject from '@/store/modules/subject';
// import coupon from '@/store/modules/coupon';
// import category from '@/store/modules/category';
// import efficacy from '@/store/modules/efficacy';
// import redPacket from '@/store/modules/redpacket';

export default function createStore() {
  const plugins = [];

  // if (isClient || (isServer && process.env.VINCI_LOG_LEVEL === 'debug')) {
  //   plugins.push(createLogger({
  //     collapsed: false,
  //     logger,
  //   }));
  // }

  return new Store({
    plugins,
    strict: process.env.NODE_ENV !== 'production',
    modules: {
      // item: item(app),
      // user: user(app),
      // navigation: navigation(app),
      // page: page(app),
      // widget: widget(app),
      // product: product(app),
      // brand: brand(app),
      // shared: shared(app),
      // subject: subject(app),
      // video: video(app),
      // coupon: coupon(app),
      // category: category(),
      // efficacy: efficacy(),
      // redPacket: redPacket(app),
    },
  });
}
