<template>
  <div id="project-table">
    <el-card>
      <div slot="header">
        <span>{{table.name}}</span>
        <el-button size="small" type="primary" @click="onEdit">编辑</el-button>
        <el-button size="small" type="danger" @click="onDelete">删除</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  export default {
    name: "ProjectTable",
    props: {
      table: {
        type: Object
      },
      roles: {
        type: Array
      },
      index: {
        type: Number
      }
    },
    methods: {
      ...mapMutations(['deleteTable']),
      onDelete() {
        this.deleteTable(this.index)
      },
      onEdit() {
        this.$router.push({
          name: 'TableEdit',
          params: {
            table: this.table,
            roles: this.roles
          }
        })
      },
    }
  }
</script>

<style scoped lang="stylus">
</style>
