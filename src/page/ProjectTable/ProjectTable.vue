<template>
  <div id="project-table">
    <el-card>
      <div slot="header">
        <span>{{table.name}}</span>
        <el-button size="small" type="primary">编辑</el-button>
        <el-button size="small" type="danger">删除</el-button>
      </div>
    </el-card>
    <table-dialog :table="table" :is-dialog-show="isDialogShow"/>
  </div>
</template>

<script>

  import TableDialog from "../../components/TableDialog/TableDialog";

  export default {
    name: "ProjectTable",
    components: {TableDialog},
    props: {
      table: {
        type: Object
      },
      isDialogShow: {
        type: Boolean
      }
    },
    methods: {}
  }
</script>

<style scoped lang="stylus">
</style>
