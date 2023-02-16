export default  function ({ app, $axios }) {
  const header = localStorage.getItem('token')
  if(header !== null)
  {
    app.store.commit('home/SET_ADMIN',1)
    $axios.onRequest(config => {
      // eslint-disable-next-line dot-notation
      config.headers.common['Authorization'] = `Bearer ${header}`;
    });
  }
  else 
  {
    app.router.push('/')
    app.store.commit('home/SET_ADMIN',0)
  }
  }