// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const _openid = event._openid
  const creditAdd = event.creditAdd
  return await db.collection('credits').where({
    _openid: _openid
  }).update({
    data: {
      credit: _.inc(creditAdd)
    },
  })
}