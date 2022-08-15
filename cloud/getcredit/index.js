// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init(
  {env: cloud.DYNAMIC_CURRENT_ENV // 当前环境的常量
})

// 云函数入口函数
exports.main = async (event, context) => {
  // 1. 获取数据库引用
  const db = wx.cloud.database()
  // 2. 构造查询语句
  // collection 方法获取一个集合的引用
  // where 方法传入一个对象，数据库返回集合中字段等于指定值的 JSON 文档。API 也支持高级的查询条件（比如大于、小于、in 等），具体见文档查看支持列表
  // get 方法会触发网络请求，往数据库取数据
  // 根据待办的 _openid 找到并返回
  return await db.collection(credits).where({
    _openid: 'o7KsM5b9BsT1U-jg23wcgGAWkIoc'
  }).get()
}