// component-2.tsx
import type { FunctionalComponent } from "vue";
import state from './state'

interface Prop {t:number }

const Component2: FunctionalComponent<Prop, {}> = ({t}) =>
{
      console.log('我也刷新啦~');
    return (
        <div>
            我是{state.name}, {state.annualSalary}, {t}
            <p>
                <button onClick={
                    (e) =>
                    {
                        state.annualSalary = Math.random() * 9999999999
                    }
                }>设置随机薪资</button>
            </p>
        </div>
    )
};

export default Component2;
