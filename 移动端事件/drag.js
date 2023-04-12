// NOTE: 给元素添加移动端单指拖拽行为,借助Touch事件
function __drag(el)//: HTMLElement)
{
  if (!el || !('ontouchstart' in el))
  {
    console.warn('非移动端Web环境！');
    return;
  }
  const startPos = {
    x: 0,
    y: 0,
    touchId: null
  }
  const movingPos = {
    x: 0,
    y: 0
  }
  const curPos = {
    x: 0,
    y: 0
  }
  function startHandler(evt)//: TouchEvent)
  {
    const { pageX, pageY, identifier } = evt.changedTouches[0];
    startPos.x = pageX;
    startPos.y = pageY;
    startPos.touchId = identifier;
    console.log(startPos);
  }
  function moveHandler(evt)//: TouchEvent)
  {
    const touch = [...evt.changedTouches].find(e => e.identifier === startPos.touchId);
    if (!touch)
    {
      console.error('没找到触摸点???');
      return;
    }
    // NOTE: 在移动端，默认，拖拽时，本来元素就会有轻微的移动行为，并且可能导致容器出现滚动条
    evt.preventDefault();
    movingPos.x = curPos.x + (touch.pageX - startPos.x);
    movingPos.y = curPos.y + (touch.pageY - startPos.y);
    console.log(movingPos);
    // translate3d比translate2d性能要好
    el.style.transform = `translate3d(${ movingPos.x }px, ${ movingPos.y }px, 0)`;
  }
  function endHandler(evt)//: TouchEvent)
  {
    // NOTE: 防止下次开始拖拽前回弹
    curPos.x = movingPos.x;
    curPos.y = movingPos.y;
  }
  el.addEventListener('touchstart', (e) => startHandler(e));
  el.addEventListener('touchmove', (e) => moveHandler(e));
  el.addEventListener('touchend', (e) => endHandler(e));
  el.addEventListener('touchcancel', (e) => endHandler(e));
}

function _drag(el)//: HTMLElement)
{
  if (!el || !('onpointerup' in el))
  {
    console.warn('非移动端Web环境！');
    return;
  }
  const startPos = {
    x: 0,
    y: 0,
    touchId: null
  }
  const movingPos = {
    x: 0,
    y: 0
  }
  const curPos = {
    x: 0,
    y: 0
  }
  function startHandler(evt)//: PointerEvent)
  {
    const { pageX, pageY, identifier } = evt;
    startPos.x = pageX;
    startPos.y = pageY;
    startPos.touchId = identifier;
    console.log(startPos);
  }
  function moveHandler(evt)//: PointerEvent)
  {
    const touch = [evt].find(e => e.target === el);
    if (!touch)
    {
      console.error('没找到触摸点???');
      return;
    }
    // evt.preventDefault();
    movingPos.x = curPos.x + (touch.pageX - startPos.x);
    movingPos.y = curPos.y + (touch.pageY - startPos.y);
    console.log(movingPos);
    // translate3d比translate2d性能要好
    el.style.transform = `translate3d(${ movingPos.x }px, ${ movingPos.y }px, 0)`;
  }
  function endHandler(evt)//: TouchEvent)
  {
    // NOTE: 防止下次开始拖拽前回弹
    curPos.x = movingPos.x;
    curPos.y = movingPos.y;
  }
  el.addEventListener('pointerdown', (e) => startHandler(e));
  el.addEventListener('pointermove', (e) => moveHandler(e));
  el.addEventListener('pointerup', (e) => endHandler(e));
  el.addEventListener('pointercancel', (e) => endHandler(e));

  // el.addEventListener('mousedown', (e) => startHandler(e));
  // // NOTE: 只在抬起手指的一瞬间触发一次mousemove...
  // el.addEventListener('mousemove', (e) => moveHandler(e));
  // el.addEventListener('mouseup', (e) => endHandler(e));
  // // el.addEventListener('mousecancel', (e) => endHandler(e));

  // NOTE: 完全阻止了mouse事件的触发
  // el.addEventListener('touchstart', (e) => e.preventDefault());
  el.style.touchAction = 'manipulation';
  // el.style.touchAction = 'none';
}

// NOTE:  以上两个方法在移动端都能正常工作

function drag(el)//: HTMLElement)
{
  if (!el || !('onpointerup' in el))
  {
    console.warn('非移动端Web环境！');
    return;
  }
  const startPos = {
    x: 0,
    y: 0,
    touchId: null
  }
  const movingPos = {
    x: 0,
    y: 0
  }
  const curPos = {
    x: 0,
    y: 0
  }
  function startHandler(evt)//: PointerEvent)
  {
    // pointerId：自增正整数
    const { pageX, pageY, pointerId } = evt;
    startPos.x = pageX;
    startPos.y = pageY;
    startPos.touchId = pointerId;
    console.log(startPos);
    // NOTE： 因为在PC端，指针移出元素后pointermove事件不在分发给元素，所以不能在el元素上绑定pointermove事件监听，可以在window或document上
    window.addEventListener('pointermove', moveHandler);
    window.addEventListener('pointerup', endHandler);
    window.addEventListener('pointercancel', endHandler);
  }
  function moveHandler(evt)//: PointerEvent)
  {
    const touch = [evt].find(e => e.target === el || window);
    if (!touch)
    {
      console.error('没找到触摸点???');
      return;
    }
    // evt.preventDefault();
    movingPos.x = curPos.x + (touch.pageX - startPos.x);
    movingPos.y = curPos.y + (touch.pageY - startPos.y);
    console.log(movingPos);
    // translate3d比translate2d性能要好
    el.style.transform = `translate3d(${ movingPos.x }px, ${ movingPos.y }px, 0)`;
  }
  function endHandler(evt)//: TouchEvent)
  {
    // NOTE: 防止下次开始拖拽前回弹
    curPos.x = movingPos.x;
    curPos.y = movingPos.y;
    // NOTE： 因为这些事件在每次pointerdown时都会绑定一次，为了防止重复多次绑定，对应的在这儿也要清除
    window.removeEventListener('pointermove', moveHandler);
    window.removeEventListener('pointerup', endHandler);
    window.removeEventListener('pointercancel', endHandler);
  }
  el.addEventListener('pointerdown', (e) => startHandler(e));
  // // el.addEventListener('pointermove', (e) => moveHandler(e));
  // el.addEventListener('pointerup', (e) => endHandler(e));
  // el.addEventListener('pointercancel', (e) => endHandler(e));
  el.addEventListener('gotpointercapture', (e) => console.log(e));
  el.addEventListener('lostpointercapture', (e) => console.log(e));

  // el.addEventListener('mousedown', (e) => startHandler(e));
  // // NOTE: 只在抬起手指的一瞬间触发一次mousemove...
  // el.addEventListener('mousemove', (e) => moveHandler(e));
  // el.addEventListener('mouseup', (e) => endHandler(e));
  // // el.addEventListener('mousecancel', (e) => endHandler(e));

  // NOTE: 完全阻止了mouse事件的触发， 必须加，否则touchmove的默认晃动行为(引发了lostpointercapture事件。。。)会阻止pointermove的继续触发！！！！
  // el.addEventListener('touchstart', (e) => e.preventDefault());
  // NOTE: 或者使用touch-action阻止平移行为
  // NOTE: 最佳实践
  el.style.touchAction = 'pinch-zoom';
  // el.style.touchAction = 'manipulation';
  // el.style.touchAction = 'none';
}

