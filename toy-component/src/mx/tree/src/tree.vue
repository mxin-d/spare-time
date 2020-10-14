<template>
  <div class="mx-tree">
    <div class="mx-tree-label" @click="toggle">
      {{ isFolder && (open ? '-' : '+') }}
      &nbsp;
      {{ treeData.label }}
    </div>
    <ul v-if="isFolder" v-show="open">
      <mx-tree
        v-for="data in treeData.children"
        :treeData="data"
        :key="data.label"
      />
    </ul>
  </div>
</template>

<script>
export default {
  // 递归组件必须指定name
  name: 'MxTree',
  componentName: 'MxTree',
  props: {
    treeData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      open: true,
    };
  },
  computed: {
    // 计算是否可以被展开 or 收起
    isFolder() {
      return this.treeData.children && this.treeData.children.length;
    },
  },
  methods: {
    // 展开 or 收起
    toggle() {
      if (this.isFolder) {
        this.open = !this.open;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.mx-tree-label {
  text-align: left;
  font-size: 13px;
}
</style>
