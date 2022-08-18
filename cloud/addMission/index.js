// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const db_date =  db.serverDate()

// 云函数入口函数
exports.main = async (context) => {
  return await db.collection('MissionList').add({
    data: {
      _openid: cloud.getWXContext().OPENID,

      date: db_date,
      credit: Number(context.credit),
      
      title: context.title,
      desc: context.desc,

      available: true,
      star: false
    }
  })
}