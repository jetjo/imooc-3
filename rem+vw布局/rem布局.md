# rem、vw布局

## rem、vw布局的特长

实现等宽高比缩放
rem等比缩放的核心是通过js代码使得html的width保持arem(rem是单位，a是个定值，a之所以
是定值，是js通过监听onresize事件及时调节保持的)，
那么当将一个块元素的高通过css设置为brem(rem是单位，b是个定值，b是个定值是因为b是写死在css代码中的)，那么这个块元素的宽高比就是
arem/brem，约掉单位rem，即a/b。

### rem、vw布局的三方替代方案

<https://github.com/amfe/lib-flexible>
