// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const toUserOpenid = event.toOpenId
  const res = await db.collection('MissionList').where({
    toOpenId: toUserOpenid
  }).get()
  return {
    res
  }
}