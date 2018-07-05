import Vue from 'vue';


import(/* webpackChunkName: "lodash" */ 'vue').then(() => {
  console.log('111');
});


const test = () => {
  const a = { b: 1, c: 2 };
  const { b, c } = a;
  console.log(b);
  console.log(c);
};

test();

export function createApp() {
  const app = new Vue({
    data: 1,
  });
  return app;
}
