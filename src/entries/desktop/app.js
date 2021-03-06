import Vue from 'vue';
import Vuex from 'vuex';
import { sync } from 'vuex-router-sync';
import {
  Button,
  MessageBox,
  Message,
  Menu,
  MenuItem,
} from 'element-ui';
import Image from '@/components/ui/Image';
import Root from '@/entries/desktop/Root';
import { createRouter } from '@/entries/desktop/router';
import createStore from '@/entries/desktop/store';
// import initAxios from '@/entries/desktop/axios';

Vue.config.productionTip = false;
Vue.config.performance = process.env.NODE_ENV !== 'production';

Vue.use(Button);
Vue.use(Menu);
Vue.use(MenuItem);

Vue.component(Image.name, Image);

const MsgBox = MessageBox;
Vue.prototype.$msgbox = MsgBox;
Vue.prototype.$alert = MsgBox.alert;
Vue.prototype.$confirm = MsgBox.confirm;
Vue.prototype.$prompt = MsgBox.prompt;
Vue.prototype.$message = Message;

Vue.use(Vuex);

const router = createRouter();
const store = createStore('desktop');

// initAxios();

sync(store, router);

// Vue.prototype.$store = store;

new Vue({ // eslint-disable-line no-new
  router,
  store,
  el: '#test',
  render: h => h(Root),
});
