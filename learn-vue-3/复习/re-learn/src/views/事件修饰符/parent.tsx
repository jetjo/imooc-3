import { withDirectives, withModifiers } from 'vue';
import Child from './child';

export default {
    setup()
    {
        return () => (
            <div onClick={ withModifiers(() => window.alert('parent hello~'), [])} style={{ padding: '20px', border: '1px solid red' }}>
            {/* <div onClick={ withModifiers(() => window.alert('parent hello~'), ['self'])} style={{ padding: '20px', border: '1px solid red' }}> */}
                <Child onClick={ withModifiers(() => window.alert('child hello~'), ['stop']) } />
            </div>
        )
    }
};
