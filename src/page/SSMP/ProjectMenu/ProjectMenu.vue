<template>
  <div id="project-menu">
    <el-card>
      <div slot="header">
        <span>{{menu.name}}</span>
        <el-button size="small" type="primary" @click="onEdit">编辑</el-button>
        <el-button size="small" type="danger" @click="onDelete">删除</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  export default {
    name: "ProjectMenu",
    props: {
      menu: {
        type: Object
      },
      index: {
        type: Number
      }
    },
    methods: {
      ...mapMutations(['deleteMenu']),
      onEdit() {
        this.$router.push({
          name: 'MenuEdit',
          params: {
            menu: this.menu
          }
        })
      },
      onDelete() {
        this.deleteMenu(this.index)
      }
    }
  }
</script>

<style scoped>

</style>
