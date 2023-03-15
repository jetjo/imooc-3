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
    const childArgs = { 'modelValue': state.value, 'onUpdate:modelValue': (e: number) => state.value = e };
    return () => (
      <div>
        <div>{state.value}</div>
        {/* <Child v-model={state.value} />这样写可以，只是有ts错误提示。。。 */}
        {/* <Child {...{ 'modelValue': state.value, 'onUpdate:modelValue': (e: number) => state.value = e }} /> */}
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
