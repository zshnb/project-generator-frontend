<template>
  <div id="home">
    <el-header class="header">
      <el-row class="row">
        <el-col :span="4">项目生成器</el-col>
      </el-row>
    </el-header>
    <el-row>
      <el-col :span="2">
        <el-menu :router="true">
          <el-menu-item index="1" :route="{ name: 'ProjectManage'}">
            <span slot="title">项目管理</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="20" style="margin-left: 20px">
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

<style scoped lang="stylus">
#home
  .header
    .row
      background-color #409EFF
      height 50px
      color white
      line-height 50px
      padding-left 10px
</style>
