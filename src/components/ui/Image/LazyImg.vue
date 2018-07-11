<script>
import './LazyImg.css';

export default {
  name: 'lazy-img',

  props: {
    src: {
      type: String,
      default: '',
    },
    bgSrc: {
      type: String,
      default: '',
    },
    nodeName: {
      type: String,
      default: 'div',
    },
    alt: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      srcAssigned: false,
      bgSrcAssigned: false,
    };
  },

  watch: {
    src() {
      this.assignImage();
    },
    bgSrc() {
      this.assignBgImage();
    },
  },

  mounted() {
    this.assignImage();
    this.assignBgImage();
  },

  methods: {
    assignBgImage() {
      if (this.bgSrc) {
        this.bgSrcAssigned = true;
      }
    },

    assignImage() {
      if (this.src) {
        this.srcAssigned = true;
      }
    },
  },

  render(createElement) {
    return createElement(
      this.bgSrc ? this.nodeName : 'img',
      this.bgSrc ? {
        class: 'LazyImg-bg',
        style: {
          backgroundImage: `url(${this.bgSrc})`,
          opacity: this.bgSrcAssigned ? 1 : 0,
        },
      } : {
        class: 'LazyImg-Img',
        attrs: {
          src: this.src,
        },
        style: {
          opacity: this.srcAssigned ? 1 : 0,
        },
      },
      this.$slots.default,
    );
  },
};
</script>
