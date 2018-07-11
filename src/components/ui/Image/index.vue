<script>
import { mapState } from 'vuex';
// import { cut } from '@/utils/qiniu';
import LazyImg from '@/components/ui/Image/LazyImg';

const CloudSuppliers = {
  qiniu: 'qiniu',
};

export default {
  name: 'ui-image',
  components: {
    LazyImg,
  },

  props: {
    src: {
      type: String,
      default: '',
    },

    lazy: {
      type: Object,
      default: () => {},
    },

    // 云供应商
    supplier: {
      type: String,
      default: CloudSuppliers.qiniu,
    },

    // 配置文件
    configs: {
      type: Object,
      default() {
        return {
          t: '1',
          q: 70,
        };
      },
    },
  },

  computed: {
    ...mapState({
      webpSupport(state) {
        return state.shared.webpSupport;
      },
    }),

    output() {
      return '';
      // return cut(this.src, {
      //   t: '1',
      //   q: 80,
      //   f: this.webpSupport ? 'webp' : '',
      //   ...this.configs,
      // });
    },
  },

  render(createElement) {
    const props = {};
    if (this.lazy) {
      Object.keys(LazyImg.props).forEach((key) => {
        props[key] = this.lazy[key];
      });
      props.src = props.src ? this.output : '';
      props.bgSrc = props.bgSrc ? this.output : '';
    } else {
      props.src = this.output;
    }
    return createElement(
      LazyImg,
      { props },
      this.$slots.default,
    );
  },
};
</script>
