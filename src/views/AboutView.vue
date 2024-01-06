<template>
  <div>
    <button @click="handleButtonClick">选择文件（可多选）</button>
  </div>
</template>

  <script>
    export default {
      name: "About",
      methods: {
        handleButtonClick() {
          try{
            const response = this.request.get("/bigscreen/communityData")
            // 在按钮点击时执行的逻辑
            console.log(response);
          } catch(error) {
            console.error('错误')
          }
        }
      }
}
  </script>

