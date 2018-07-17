/* eslint-disable quote-props */

// we need ensure version is matched
const scriptUrls = {
  'weixin': {
    // 'https://res.wx.qq.com/open/js/jweixin-1.3.2.js'
    src: '//meipu1.video.meipai.com/bc52723a-e2ae-413e-b0e8-ca3683332c39.js',
    // src: '/assets/3party/jweixin-1.3.2.js',
    required: false,
  },
  'swiper': {
    // 'https://unpkg.com/swiper@3.4.2/dist/js/swiper.min.js'
    src: '//meipu1.video.meipai.com/cff2d923-7d8e-44f4-b319-03ede75a8d5d.js',
    // src: '/assets/3party/swiper@3.4.2.min.js',
    required: true,
  },
  'vue': {
    // 'https://unpkg.com/vue@2.5.13/dist/vue.min.js'
    src: '//meipu1.video.meipai.com/8b5f33df-ef2a-4723-a837-f7e2a2d21bf8.js',
    // src: '/assets/3party/vue@2.5.13.min.js',
    required: true,
  },
  'video.js': {
    // 'https://unpkg.com/video.js@6.6.0/dist/video.min.js'
    src: '//meipu1.video.meipai.com/cdd5b483-b7da-457c-817d-1fbe98b66e7c.js',
    // src: '/assets/3party/video@6.6.0.min.js',
    required: true,
  },
  'raven-js': {
    // 'https://unpkg.com/raven-js@3.19.1/dist/raven.min.js'
    src: '//meipu1.video.meipai.com/a006aa98-e2c4-4bfa-b075-69f5f3fc5ba4.js',
    // src: '/assets/3party/raven@3.19.1.min.js',
    required: true,
    // async: true,
  },
};

  /* eslint-enable quote-props */

module.exports = scriptUrls;
