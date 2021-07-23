<template>
  <div id="home">
    <el-row>
      <el-col span="2">
        <el-menu default-active="1">
          <el-menu-item index="1" :route="{ name: ''}">
            <span slot="title">项目管理</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col span="22">
        <router-view/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Home"
}
</script>

<style scoped>

</style>
