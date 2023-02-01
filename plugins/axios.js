export default function ({ $axios, app, redirect }) {
    $axios.create({
      baseURL: process.env.BASE_URL
    })
    // $axios.onError((error) => {
    //   const code = parseInt(error.response && error.response.status)
    //   if (code === 400) {
    //     if (error.response.data.message_code === 60) 
    //     app.$toast.success(error.response.data.message)
    //     else app.$toast.error(error.response.data.message)
    //   }
    //   if (code === 401) {
    //     location.reload()
    //     localStorage.clear()
    //     app.router.replace('/login')
    //   }
    // })
  }