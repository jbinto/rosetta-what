const keypair = require('keypair')
const { performance } = require('perf_hooks')

const start = performance.now()
const keys = keypair({ bits: 2048 })
const end = performance.now()

const elapsed = (end - start).toFixed(3)
console.log(`success after ${elapsed}ms`)
console.log({ keys })
