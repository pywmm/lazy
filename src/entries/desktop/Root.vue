<template>
  <div id="Root" class="Root">
    <el-menu
      v-if="menuShown"
      ref="menu"
      :default-active="activeLink"
      :router="true"
      mode="horizontal"
      background-color="#324157"
      text-color="#bfcbd9"
      active-text-color="#20a0ff"
      class="Root-menu"

    >
      <el-menu-item
        v-for="item in menuItems"
        :index="item.index"
        :key="item.index"
      >
        {{ item.name }}
      </el-menu-item>
    </el-menu>
    <router-view :key="$route.path" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import './Root.css';

export default {
  name: 'app',

  data() {
    return {
      menuItems: [
        {
          index: '/',
          name: '首页',
        },
        {
          index: '/page',
          name: '商城页管理',
        },
      ],
    };
  },

  computed: {
    ...mapState({
      activeLink(state) {
        return [...this.menuItems].reverse()
          .filter(item => state.route.path.startsWith(item.index))[0].index;
      },
    }),

    menuShown() {
      const { matched } = this.$route;
      return !(matched && matched[matched.length - 1].name === 'preview');
    },
  },
};
</script>
