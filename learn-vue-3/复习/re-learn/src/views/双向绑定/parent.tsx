// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { defineComponent, ref } from 'vue';
import Child from './child';

const DoubleBindParent = {
  name: 'doubleBindParent',
  props: {},
  emits: ['vnode-unmounted'],//{},
  setup()
  {
    const state = ref(9);
    // both attributes and properties can be used in props
    // Vue automatically picks the right way to assign it
    // const childArgs = { 'modelValue': state.value, 'onUpdate:modelValue': (e: number) => state.value = e };
    //这样写on-update:model-value完全不被识别为一个事件绑定，而是一个attr
    // const childArgs = { 'model-value': state.value, 'on-update:model-value': (e: number) => state.value = e };
    // 属性名如果以on开头，并且on后面不是短横‘-’，并且属性值是一个函数，则会被子组件识别为一个事件绑定
    const childArgs = {
      'model-value': state.value,//失去响应性
      'model-value-ref': state,
      'onUpdate:model-value': (e: number) => state.value = e,
      'on-click': (e) => console.log(e),//不是事件
      'onMove': (e) => console.log(e),//子组件发射move事件 emit(move, e)
      'on_Fuck': (e) => console.log(e),//子组件发射_Fuck事件 emit(_Fuck, e)
      'on_kiss': (e) => console.log(e),//子组件发射_kiss事件 emit(_kiss, e)
      'on2Kiss': (e) => console.log(e),//子组件发射2Kiss事件 emit(2Kiss, e)
      '^prop1': '^prop1',
      '.prop2': '.prop2',
    };
    setTimeout(() => {
      state.value += 1000
    }, 30000);
    return () => (
      <div>
        <div>{state.value}</div>
        {/* <Child v-model={state.value} />这样写可以，只是有ts错误提示。。。 */}
        {/* <Child {...{ 'modelValue': state.value, 'onUpdate:modelValue': (e: number) => state.value = e }} /> */}
        {/* <Child {...childArgs} model-value={ state.value } /> */}
        <Child {...childArgs} />
        {/* <Child modelValue={state.value} onUpdate:modelValue={(e: number) => state.value = e} /> */}
      </div>
    )
  }
}

// export { DoubleBindParent }//不方便定义路由

export default DoubleBindParent;

/* <style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style> */
