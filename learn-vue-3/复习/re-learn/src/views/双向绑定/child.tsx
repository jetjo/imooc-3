/* eslint-disable @typescript-eslint/no-unused-vars */
import type { EmitsOptions, ObjectEmitsOptions, FunctionalComponent, Ref } from 'vue';

type P =
// interface P
{
    readonly [_: string]: any;
    modelValue: number;
    modelValueRef: Ref<number>;
    modelValueModifiers?: {
        readonly [_: string]: boolean
    }
}

type E =
// interface E extends ObjectEmitsOptions
{
    'move': (e: 'move') => void;
    '_Fuck': (e: '_Fuck') => void;
    '_kiss': (e: '_kiss') => void;
    '2Kiss': (e: '2Kiss') => void;
    
    // readonly [eventName: string]: (...args: any) => void;//不能加，加上就没有事件名称提示了。。。
    'update:model-value': (e: number) => void;

    // 'update:modelValue': (e: number) => void;// SFC、JSX组件都支持，只是devtool会有“update:model-value:⚠️ Not declared”警告。
    // updateModelValue: (e: number) => void;// 不行。。。不加冒号的写法完全是一个常规事件，完全匹配不到v-model传递的处理。。。
    // 'update-model-value': (e: number) => void;// 不行。。。对父组件来讲，和updateModelValue完全指得是同一个事件
}

const Child: FunctionalComponent<P, E> = (props, { emit }) =>
{
    // emit('iMounted!')//父组件侦听onIMounted
    // emit('on-click', 'on-click');//父组件侦听onOn-click
    // emit('click', 'click');//父组件侦听onCLick
    // emit('onMove', 'onMove')//父组件侦听onOnMove
    emit('move', 'move')
    // emit('on_Fuck', 'on_Fuck')//父组件侦听onOn_Fuck
    // emit('fuck', 'fuck')
    emit('_Fuck', '_Fuck')//父组件侦听on_Fuck
    // emit('_fuck', '_fuck')//父组件侦听on_fuck
    // emit('_Kiss', '_Kiss')
    emit('_kiss', '_kiss')
    // emit('2kiss', '2kiss')//父组件侦听on2kiss
    emit('2Kiss', '2Kiss');//父组件侦听on2Kiss
    
    // emit('update:model-value', 789);
    // function handleChange(e?:HTMLInputElement) {
    // function handleChange(e:Event) {
    function handleChange(e) {
        emit("update:model-value", parseInt((e?.value)||'0'))
        // emit("update:modelValue", parseInt((e?.value) || '0'));
        // emit("updateModelValue", parseInt((e?.value)||'0'))
        // emit("update-model-value", parseInt((e?.value)||'0'))
        // emit("update:model-value", parseInt(e?.target?.value))
        // emit("update:modelValue", parseInt(e?.target?.value))
        // emit('updateModelValue', parseInt(e?.target?.value))
        // emit('update-model-value', parseInt(e?.target?.value))
    }

    return (
    // return () => (
        <div>
            <input type="number" name="modelValue" value={props.modelValueRef.value} onChange={(e:any) => handleChange(e.target)} />
            {/* <input type="number" name="modelValue" value={props.modelValue} onChange={(e:any) => handleChange(e.target)} /> */}
            {/* <input type="number" name="modelValue" value={props.modelValue} onChange={(e) => handleChange(e)} /> */}
        </div>
    )
};

Child.props = {
    modelValue: {
        type: Number
    },
    modelValueRef: {

    },
    modelValueModifiers: {}, 
    '^prop1': {},
    '.prop2': {}
}

// Child.emits = {
//     ['update:model-value']: (e: number) =>
//     // ['update:modelValue']: (e: number) =>
//     // updateModelValue: (e: number) =>
//     // 'update-model-value': (e: number) =>
//     {
//         return true;
//         // return false;//控制台告警，但不影响事件处理。。。
//     }
// };
Child.emits = ['move', '2Kiss', '_Fuck', '_kiss', 'update:model-value'];

export default Child;
