<template>
  <div class="home">
    <div class="baner">
      <img class="baner-img" src="@/assets/img/banner.png" alt="" />
    </div>
    <div class="main">
      <div class="navs">
        <router-link class="inventory" to="/pdgt">资产盘点</router-link>
        <router-link class="warning" to="/pdgt/warning"
          >资产预警</router-link
        >
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home {
  .baner-img {
    width: 100%;
  }

  .main {
    min-height: 700px;
    background: linear-gradient(
      180deg,
      #ffffff 0%,
      #fdfeff 20.31%,
      #f4f4f8 40.1%,
      #f4f4f8 100%
    );
    border-radius: 12px 12px 0px 0px;
    margin-top: -40px;
    padding: 28px 0 0 0;
    position: relative;
    padding: 16px;
  }
  .navs {
    padding: 4px;
    margin-bottom: 23px;
    background: #f4f4f8;
    border-radius: 8px;
    @include dcc;

    .inventory,
    .warning {
      width: 50%;
      height: 30px;
      border-radius: 4px;
      font-size: 14px;
      line-height: 30px;
      text-align: center;
      color: #6b7885;
    }
    .router-link-exact-active {
      background: $pdgtColor;
      color: #fff;
    }
  }
}
</style>
