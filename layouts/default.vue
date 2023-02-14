<template>
  <div>
    <nav class="nav">
      <div class="nav-logo middle-xs">
        <img src="/img/logo.png" alt="" />
        <h3>POSFood</h3>
      </div>
      <ul class="nav-menu">
        <li class="center-xs">
          <nuxt-link to="/"
            ><div class="nav-menu-img">
              <img src="/img/home.png" alt="" />
            </div>
            <p>Home</p></nuxt-link
          >
        </li>
        <li class="center-xs">
          <nuxt-link to="/bill"
            ><div class="nav-menu-img">
              <img src="/img/bill.png" alt="" />
            </div>
            <p>Bill</p></nuxt-link
          >
        </li>
        <li class="center-xs">
          <nuxt-link to="/stat"
            ><div class="nav-menu-img">
              <img src="/img/stat.png" alt="" />
            </div>
            <p>Statistical</p></nuxt-link
          >
        </li>
        <li class="center-xs">
          <nuxt-link to="/settings/product"
            ><div class="nav-menu-img">
              <img src="/img/product.png" alt="" />
            </div>
            <p>Product</p></nuxt-link
          >
        </li>
        <li class="center-xs">
          <nuxt-link to="/settings/type"
            ><div class="nav-menu-img">
              <img src="/img/type.png" alt="" />
            </div>
            <p>Type</p></nuxt-link
          >
        </li>
      </ul>
    </nav>
    <Nuxt />
  </div>
</template>
