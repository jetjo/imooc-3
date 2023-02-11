const { Girl, GirlSchema } = require('./model');

!(async () =>
{
  const dongxiaowan = new Girl({ name: '董小宛' + Math.random().toFixed(5), city: 'beijing' });
  const created = await dongxiaowan.save();
  console.log('创建了数据：', created);

  const liYuanyuan = await Girl.create({
    name: '李媛媛' + Math.random().toFixed(3),
    city: 'beijing'
  });
  console.log('创建了李媛媛', liYuanyuan);
  // const list = await Girl.find({ name: '秋秋' })
  const list = await Girl.find({ city: 'beijing' }).sort({ _id: -1 })
  console.log(`查询到的女孩：`, list);

  const updated = await Girl.findOneAndUpdate({ city: 'beijing' }, { city: 'New York' }, { new: true })

  const listUpdate = await Girl.find({ city: 'New York' }).sort({ _id: -1 })
  console.log('应用更新后的结果：', listUpdate);

  // const removeResult = await Girl.remove();
  // console.log('删除结果：', removeResult);
})().catch(console.dir).finally(_ => console.log('...'));
