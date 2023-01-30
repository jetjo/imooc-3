export const vLearnDirectiveHook = {
    // beforeCreate(el)没有这个钩子
    // {
    //     console.log(el.outerHTML, 'directive~ beforeCreate');
    // },
    //TODO: 不明白意思：// called before bound element's attributes or event listeners are applied
    created(el)
    {
        console.log(el.outerHTML, 'directive~ created');
    },
    // 对应元素插入DOM前调用
    beforeMount(el)
    {
        console.log(el.outerHTML, 'directive~ beforeMount');
    },
    // 元素所处的组件和这个组件的所有子组件都挂载后调用
    // 猜测：应该是在所处组件的mounted钩子后调用
    // 经测试，实际正好相反
    mounted(el)
    {
        console.log(el.outerHTML, 'directive~ mounted');
    },
    // 在指令绑定的元素所在组件的beforeUpdate钩子后调用
    beforeUpdate(el)
    {
        console.log(el.outerHTML, 'directive~ beforeUpdate');
    },
    // 在指令绑定的元素所在组件的updated钩子后执行
    updated(el)
    {
        console.log(el.outerHTML, 'directive~ updated');
    },
    beforeUnmount(el)
    {
        console.log(el.outerHTML, 'directive~ beforeUnmount');
    },
    unmounted(el)
    {
        console.log(el.outerHTML, 'directive~ unmounted');
    },
    // beforeDestroy(el)没有这个钩子
    // {
    //     console.log(el.outerHTML, 'directive~ beforeDestroy');
    // },
    // destroyed(el)没有这个钩子
    // {
    //     console.log(el.outerHTML, 'directive~ destroyed');
    // },
}
