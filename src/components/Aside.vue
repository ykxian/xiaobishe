<template>
  <el-menu :default-openeds="['1', '3']" style="min-height: 100%; overflow-x: hidden"
           background-color="rgb(48, 65, 86)"
           text-color="#fff"
           active-text-color="#ffd04b"
           :collapse-transition="false"
           :collapse="isCollapse"
           router
  >
    <div style="height: 60px; line-height: 60px; text-align: center">
      <img src="../assets/Thunder11.png" alt="" style="width: 20px; position: relative; top: 5px; right: 5px">
      <b style="color: white" v-show="logoTextShow">后台管理系统</b>
    </div>
    <el-menu-item index="/home">
      <template slot="title">
        <i class="el-icon-house"></i>
        <span slot="title">主页</span>
      </template>
    </el-menu-item>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span slot="title">系统管理</span>
      </template>
      <el-menu-item index="/device">
        <i class="el-icon-s-custom"></i>
        <span slot="title">设备管理</span>
      </el-menu-item>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-monitor"></i>
        <span slot="title">数据可视化</span>
      </template>
      <el-menu-item index="/bigscreen" @click.native="goToBigScreen">
        <i class="el-icon-view"></i>
        <span slot="title">大屏管理</span>
      </el-menu-item>
    </el-submenu>
    <el-submenu index="4">
      <template slot="title">
        <i class="el-icon-position"></i>
        <span slot="title">日志管理</span>
      </template>
      <el-menu-item index="/userlog" >
        <i class="el-icon-document"></i>
        <span slot="title">用户日志</span>
      </el-menu-item>
      <el-menu-item index="/devicelog">
        <i class="el-icon-document"></i>
        <span slot="title">设备日志</span>
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: "Aside",
  props: {
    isCollapse: Boolean,
    logoTextShow: Boolean
  },
  methods: {
    goToBigScreen() {
      this.$router.push('/bigscreen');
    }
  }
}
</script>

<style scoped>

</style>
