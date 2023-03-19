export default function ()
{
    return (
        <div>
            {{
                default: () => 'hello default!!!',
                head: () => (
                    <div><p>我是头部</p></div>
                ),
                main: () => [<span>去哦是</span>, <span>ddddddd</span>]
            }}
        </div>
    )
}
