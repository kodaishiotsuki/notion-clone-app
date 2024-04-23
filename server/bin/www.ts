import http from 'http'
import { AddressInfo } from 'net'

import debug from 'debug'
import mongoose from 'mongoose'

import app from '../app'
import { MONGODB_URI, PORT } from '../config'

const debugLog = debug('server:server')

// ポートを正規化する関数。有効なポート番号を保証します。
function normalizePort(val: string): number | string | boolean {
  const port = parseInt(val, 10)
  if (isNaN(port)) {
    // 名前付きパイプ
    return val
  }
  if (port >= 0) {
    // ポート番号
    return port
  }
  return false
}

const port = normalizePort(PORT) // configからポート番号を取得
app.set('port', port)

// HTTPサーバーを作成
const server = http.createServer(app)

// MongoDBに接続
mongoose
  .connect(MONGODB_URI) // configからMongoDBのURIを取得
  .then(() => {
    console.log(`MongoDB connected`)
    server.listen(port) // DB接続後にサーバーを起動
    server.on('error', onError)
    server.on('listening', onListening)
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err)
  })

// 特定のリッスンエラーに対して親切なメッセージで対処
function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`)
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`)
      process.exit(1)
      break
    default:
      throw error
  }
}

// HTTPサーバーの「listening」イベントのためのイベントリスナー
function onListening(): void {
  const addr = server.address()
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + (addr as AddressInfo).port
  debugLog('Listening on ' + bind)
}
