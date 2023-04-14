import { readonly, ref } from "vue";

export function install(app, options)
{
  console.log(app, options, '学习插件');
  app.config.globalProperties.$pluginLearn = () => console.log('我是在插件中注册到全局的方法');
  app.directive('learn-directive', (el, { arg, value, oldValue, modifiers, instance }, vNode, preVNode) =>
  {
    console.log(el, { arg, value, oldValue, modifiers, instance }, vNode, preVNode, '学习在插件中注册自定义指令');
  });
  const bg = {
    name: "",//readonly('柳如是'),
    fuckingCount: ref(0)
  };
  function fuckingOneNight()
  {
    bg.fuckingCount.value++;
  }
  app.provide('aInjectedData', ({ bg, fuckingOneNight }));
  app.provide('aCommonInjectData', 'xxx');
}
