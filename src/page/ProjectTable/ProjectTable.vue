<template>
  <div id="project-table">
    <el-card>
      <div slot="header">
        <span>{{table.name}}</span>
        <el-button size="small" type="primary">编辑</el-button>
        <el-button size="small" type="danger">删除</el-button>
      </div>
    </el-card>
    <table-dialog @on-save="onSave" :table="table" :is-dialog-show="isDialogShow"/>
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
    methods: {
      onSave() {
        this.$emit('on-save')
      }
    }
  }
</script>

<style scoped lang="stylus">
</style>
