<template>
  <div>
    <h2>欢迎使用工业互联网后台管理系统<br/><br/>本系统具有设备管理、数据采集与存储、数据分析、大屏可视化等功能<br/><br/>当前用户为：{{name}}</h2>
  </div>

</template>

<script>

export default {
  name:"Home",
  data(){
    return{
      name:JSON.parse(localStorage.getItem("user")).username,
    }
  }
}
</script>

