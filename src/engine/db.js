/*
 * @Author: Cecil
 * @Last Modified by: Cecil
 * @Last Modified time: 2018-05-27 17:07:09
 * @Description mongodb实例
 */

'use strict'

const mongoose = require('mongoose')

function initDB (DBConfig = {}) {
  mongoose.connect(DBConfig.address || 'mongodb://localhost:27017')

  const db = mongoose.connection
  db.on('error', console.error.bind(console, 'mongoose connection error:'))
  db.once('open', function() {
    console.log('mongoose connection opened')
  })
  db.on('connected', () => {
    console.log('mongoose connection connected')
  })
  db.on('disconnected', () => {
    throw new Error('mongodb未连接')
    process.exit(1)
  })

  return db
}

module.exports = class DB {
  constructor (DBConfig) {
    this.db = initDB(DBConfig)
  }
}
