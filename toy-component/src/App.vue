<template>
  <div id="app">
    <div>
      <img class="logo" alt="Vue logo" src="./assets/logo.png" />
    </div>

    <!-- collapse -->
    <mx-collapse v-model="activeNames" @change="handleChange" accordion>
      <mx-collapse-item title="一致性 Consistency" name="1">
        <div>
          与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；
        </div>
        <div>
          在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。
        </div>
      </mx-collapse-item>
      <mx-collapse-item title="反馈 Feedback" name="2">
        <div>
          控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；
        </div>
        <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
      </mx-collapse-item>
      <mx-collapse-item title="效率 Efficiency" name="3">
        <div>简化流程：设计简洁直观的操作流程；</div>
        <div>
          清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；
        </div>
        <div>
          帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。
        </div>
      </mx-collapse-item>
      <mx-collapse-item title="可控 Controllability" name="4">
        <div>
          用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；
        </div>
        <div>
          结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。
        </div>
      </mx-collapse-item>
    </mx-collapse>

    <br />

    <!-- tree -->
    <mx-tree :treeData="treeData" />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      activeNames: ['1'],
      treeData: {
        label: 'JavaScript',
        children: [
          {
            label: '数据类型',
            children: [
              {
                label: 'string',
              },
              {
                label: 'number',
              },
              {
                label: 'boolean',
              },
              {
                label: 'null',
              },
              {
                label: 'undefined',
              },
              {
                label: 'symbol',
              },
              {
                label: 'object',
              },
            ],
          },
          {
            label: '变量声明',
            children: [
              {
                label: 'var',
              },
              {
                label: 'let',
              },
              {
                label: 'const',
              },
            ],
          },
        ],
      },
    };
  },
  methods: {
    handleChange(val) {
      console.log(`activeNames: ${val}`);
    },
  },
};
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 40px;
  .logo {
    width: 40px;
    margin-bottom: 30px;
  }
  .mx-collapse {
    float: right;
    width: 70%;
    height: 600px;
  }
  .mx-tree:first {
    float: left;
    width: 30%;
    height: 600px;
  }
  .fade-enter-active {
    transition: opacity 0.3s;
  }
  .fade-leave-active {
    transition: opacity 0.1s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
}
</style>
