import type { FunctionalComponent } from "vue";

const Index: FunctionalComponent = (props) =>
{
    // console.log({props});
    return JSON.stringify(props)
};

// Index.props = ['data-named']//不写的话，所有参数都在props里能访问到，除了名称中包含-的，写上这句，props里只有dataNamed
// Index.props = {
//     'data-named': {
//         type: Number
//     }
// }
Index.props = {
    'dataNamed': {
        type: String
    }
}

Index.inheritAttrs = false;//不加这句，如果有传递attrs，会生成警告，但仍然能生效

export default Index;
