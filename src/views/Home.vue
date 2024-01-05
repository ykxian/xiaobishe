<template>
  <div>
    <h1>欢迎使用工业互联网后台管理系统!<br/><br/>当前用户为：{{name}}</h1>
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

