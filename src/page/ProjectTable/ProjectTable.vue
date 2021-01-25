<template>
  <div id="project-table">
    <el-card>
      <div slot="header">
        <span>{{table.name}}</span>
        <el-button size="small" type="primary">编辑</el-button>
        <el-button size="small" type="danger" @click="onDelete">删除</el-button>
      </div>
    </el-card>
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
      },
      onDelete() {
        this.$emit('delete-table')
      }
    }
  }
</script>

<style scoped lang="stylus">
</style>
