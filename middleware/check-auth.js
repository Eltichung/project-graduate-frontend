export default function ({ app, $axios, redirect, route }) {
  const header = localStorage.getItem('token')
  if (header !== null) {
    app.store.commit('home/SET_ADMIN', 1)
    $axios.onRequest((config) => {
      // eslint-disable-next-line dot-notation
      config.headers.common['Authorization'] = `Bearer ${header}`
    })
  } else {
    app.store.commit('home/SET_ADMIN', 0)
    if (route.path !== '/') {
      return redirect('/')
    }
  }
}
