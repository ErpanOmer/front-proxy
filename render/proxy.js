const http = require('http')
const httpProxy = require('http-proxy')

let localServer = null
let proxyServer = null

export function connect (target) {
  return new Promise(async (resolve, reject) => {
    // 创建服务器之前，先关闭
    await close()
    // 创建反向代理服务
    proxyServer = httpProxy.createProxyServer()
    // 监听错误事件
    proxyServer.on('error', function (err, req, res) {
      console.log('target server error')
    })

    localServer = http
      .createServer(function (req, res) {
        // 执行反向代理
        proxyServer.web(req, res, {
          // 目标地址
          target
        })
      })
      .listen(3000, function (v) {
        const { port } = localServer.address()
        resolve([`http://localhost:${port}`, target])
        console.log('server is running at %d', port)
      })
  })
}

export function close () {
  if (!proxyServer || !localServer) {
    return
  }

  return new Promise(resolve => {
    // 先关闭反向代理服务器
    proxyServer.close()
    // 后关闭本地服务器
    localServer.close()
    localServer.on('close', resolve)
  })
}