const scriptUrls = require('./3party');

function makeScript(key) {
  const option = scriptUrls[key];
  let extra = '';
  if (option.async) {
    extra = `${extra} async`;
  }

  if (option.defer) {
    extra = `${extra} defer`;
  }

  // return `<script src="${isDesktop ? '/vinci' : ''}${option.src}"${extra}></script>`;
  return `<script src="${option.src}"${extra}></script>`;
}

function renderExtraScripts({ miniProgram, isProd, isDesktop }) {
  const scripts = [];

  if (isProd) {
    scripts.push(...['vue', 'video.js', 'raven-js', 'swiper'].map(r => makeScript(r, isDesktop)));
  }

  if (!isDesktop && miniProgram) {
    scripts.push(makeScript('weixin'));
  }

  return scripts.join('');
}

module.exports = {
  renderExtraScripts,
};
