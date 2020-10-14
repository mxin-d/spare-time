<template>
  <div class="mx-collapse-item">
    <div class="mx-collapse-item__header" @click="handleHeaderClick">
      <slot name="title">{{ title }}</slot>
    </div>
    <transition name="fade" mode="in-out">
      <div class="mx-collapse-item__content" v-show="isActive">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'MxCollapseItem',
  componentName: 'MxCollapseItem',
  data() {
    return {};
  },
  inject: ['collapse'],
  props: {
    disabled: Boolean,
    title: String,
    name: {
      type: [String, Number],
    },
  },
  computed: {
    isActive() {
      return this.collapse.activeNames.indexOf(this.name) > -1;
    },
  },
  methods: {
    // 使用父组件实例触发自定义事件，并将本组件数据回传
    handleHeaderClick() {
      this.collapse.$emit('item-click', this);
    },
  },
};
</script>
<style lang="less" scoped>
.mx-collapse-item {
  font-size: 13px;
  user-select: none;
  &:last-child {
    margin-bottom: -1px;
  }
  .mx-collapse-item__header {
    height: 48px;
    line-height: 48px;
    color: #303133;
    cursor: pointer;
    border-bottom: 1px solid #ebeef5;
    font-weight: bold;
    outline: 0;
  }
  .mx-collapse-item__content {
    padding: 25px 0;
    color: #303133;
    line-height: 1.769230769230769;
  }
}
</style>
