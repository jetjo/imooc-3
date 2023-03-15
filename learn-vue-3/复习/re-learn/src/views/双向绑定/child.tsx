/* eslint-disable @typescript-eslint/no-unused-vars */
import type { EmitsOptions, ObjectEmitsOptions, FunctionalComponent } from 'vue';

type P =
// interface P
{
    readonly [_: string]: any;
    modelValue: number;
    modelValueModifiers?: {
        readonly [_: string]: boolean
    }
}

type E =
// interface E extends ObjectEmitsOptions
{
    // readonly [eventName: string]: (...args: any) => void;//不能加，加上就没有事件名称提示了。。。
    'update:model-value': (e: number) => void;
    // 'update:modelValue': (e: number) => void;// SFC、JSX组件都支持，只是devtool会有“update:model-value:⚠️ Not declared”警告。
    // updateModelValue: (e: number) => void;// 不行。。。不加冒号的写法完全是一个常规事件，完全匹配不到v-model传递的处理。。。
    // 'update-model-value': (e: number) => void;// 不行。。。
}

const Child: FunctionalComponent<P, E> = (props, { emit }) =>
{
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
            <input type="number" name="modelValue" value={props.modelValue} onChange={(e:any) => handleChange(e.target)} />
            {/* <input type="number" name="modelValue" value={props.modelValue} onChange={(e) => handleChange(e)} /> */}
        </div>
    )
};

Child.props = {
    modelValue: {
        type: Number
    },
    modelValueModifiers: {}
}

Child.emits = {
    ['update:model-value']: (e: number) =>
    // ['update:modelValue']: (e: number) =>
    // updateModelValue: (e: number) =>
    // 'update-model-value': (e: number) =>
    {
        return true;
        // return false;//控制台告警，但不影响事件处理。。。
    }
};

export default Child;
