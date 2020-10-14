<template>
  <div class="mx-collapse">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'MxCollapse',
  componentName: 'MxCollapse',
  props: {
    accordion: Boolean,
    value: {
      type: [Array, String, Number],
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      activeNames: [].concat(this.value),
    };
  },
  // 将当前组件实例作为依赖，注入到子组件中，用于 在子孙后代中使用祖先组件实例 发起自定义事件
  provide() {
    return {
      collapse: this,
    };
  },
  watch: {
    value(value) {
      this.activeNames = [].concat(value);
    },
  },
  methods: {
    /**
     * item-click 自定义事件处理
     * 1. 手风琴模式下，展开的元素只有一个
     * 2. 普通模式可以多个展开
     */
    handleItemClick(item) {
      const { name } = item;

      // 手风琴模式
      if (this.accordion) {
        this.setActiveNames(
          (this.activeNames[0] || this.activeNames[0] === 0) &&
            this.activeNames[0] === name
            ? ''
            : name
        );
      }
      // 普通模式
      else {
        const activeNames = this.activeNames.slice(0);
        const index = activeNames.indexOf(name);
        if (index > -1) {
          activeNames.splice(index, 1);
        } else {
          activeNames.push(name);
        }
        this.setActiveNames(activeNames);
      }
    },

    /**
     * 实时修改 activeNames 值
     * 当 activeNames 数据变化时，触发组件自定义 change 事件
     */
    setActiveNames(activeNames) {
      activeNames = [].concat(activeNames);
      this.activeNames = activeNames;
      const value = this.accordion ? activeNames[0] : activeNames;
      this.$emit('change', value);
    },
  },
  created() {
    // 自定义事件监听
    this.$on('item-click', this.handleItemClick);
  },
};
</script>
<style lang="less" scoped>
.mx-collapse {
  border-top: 1px solid #ebeef5;
  border-bottom: 1px solid #ebeef5;
}
</style>
