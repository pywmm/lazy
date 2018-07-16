// const path = require('path');


if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw2.js', { scope: '/' })
    .then(registration => console.log('ServiceWorker 注册成功！作用域为: ', registration.scope))
    .catch(err => console.log('ServiceWorker 注册失败: ', err));
}
