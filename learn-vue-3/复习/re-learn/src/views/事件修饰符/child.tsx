export default function ()
{
    const divProp = { style: { height: '100px', backgroundColor: 'green' } };
    return (
        <div {...divProp}></div>
    )
}