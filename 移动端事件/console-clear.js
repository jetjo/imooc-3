window.addEventListener('keydown', (e) =>
{
  // 如果是回退键，则清空控制台
  if (e?.keyCode === 8)
  {
    console.clear();
  }
})
