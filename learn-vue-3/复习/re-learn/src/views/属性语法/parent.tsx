import type { FunctionalComponent } from "vue";
import Index from './child'

const Parent: FunctionalComponent = () =>
{
    const bar = 'bar'
    const foo = true;
    // props modifiers such as `.prop` and `.attr` can be added
    // with `.` and `^` prefixes respectively
    // const args = { '.name': 'some-name', '^width': '100', id: 'wegw3hhe54w2', 'data-named': 'sssss', 'xx-value': 'xxx', class: [bar, {foo}] , '^style': {color: 'red'}};
    // const args = { '.name': 'some-name', '^width': '100', id: 'wegw3hhe54w2', 'data-named': 'sssss', 'xx-value': 'xxx', class: [bar, {foo}] , '^style': JSON.stringify({color: 'red'})};//style样式不生效
    const args = { '.name': 'some-name', '^width': '100', id: 'wegw3hhe54w2', 'data-named': 'sssss', 'xx-value': 'xxx', class: [bar, {foo}] , 'style': {color: 'red'}};
    // const args = { '.name': 'some-name', '^width': '100', id: 'wegw3hhe54w2', 'data-named': 'sssss', 'xx-value': 'xxx', class: [bar, {foo}] , '.style': {color: 'red'}};
    // const args = { '.name': 'some-name', '^width': '100', id: 'wegw3hhe54w2', 'data-named': 'sssss', 'xx-value': 'xxx', class: [bar, {foo}] , '.style': JSON.stringify({color: 'red'})};
    setTimeout(() =>
    {
        const node = document.getElementById(args.id);
        console.log(node?.name, node?.style, node?.attributes); 
    }, 3000);
    return (
    // return (
        //  [Vue warn]: Invalid VNode type: undefined(undefined) 
        //  at <Parent onVnodeUnmounted=fn<onVnodeUnmounted> ref=Ref< undefined > >
        // <div {...args}>{args}</div>

        // <div {...args}>{{args}}</div>
        // <div {...args}>{{default: () => args}}</div>
        // <div {...args}>{{ default: () => (<p>{ JSON.stringify(args) }</p>) }}</div>
        
        // <div {...args}>{{ default: () => (JSON.stringify(args)) }}</div>
            // <div {...args}>{ JSON.stringify(args) }</div>
            <div {...args}>
                 <Index {...args} />
            </div>
    )
};

export default Parent;
