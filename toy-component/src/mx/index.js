import Collapse from './collapse/index';
import CollapseItem from './collapse-item/index';
import Tree from './tree/index';

const components = [Collapse, CollapseItem, Tree];

const install = function(Vue, options = {}) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
};

export default {
  install,
};
