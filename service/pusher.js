import Pusher from 'pusher-js'
export default {
  noti() {
    Pusher.logToConsole = true
    // eslint-disable-next-line no-var
    var pusher = new Pusher(process.env.PUSHER_KEY, {
      cluster: 'ap1',
    })
    // eslint-disable-next-line no-var
    var channel = pusher.subscribe('order')
    channel.bind('noti', function (data) {
      console.log(JSON.stringify(data))
    })
  }
}
