<template>
  <div id="project-table">
    <el-card>
      <div slot="header">
        <span>{{table.name}}</span>
        <el-button size="small" type="primary" @click="onEdit">编辑</el-button>
        <el-button size="small" type="danger" @click="onDelete">删除</el-button>
      </div>
    </el-card>
    <table-dialog :table="table"
                  :roles="roles"
                  v-if="isTableDialogShow"
                  :is-dialog-show.sync="isTableDialogShow"
                  @on-save="onUpdateTable"/>
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
      },
      roles: {
        type: Array
      }
    },
    data() {
      return {
        isTableDialogShow: false
      }
    },
    methods: {
      onSave() {
        this.$emit('on-save')
      },
      onDelete() {
        this.$emit('delete-table')
      },
      onEdit() {
        this.$router.push({
          name: 'TableEdit',
          params: {
            table: this.table
          }
        })
      },
      onUpdateTable(event) {
        this.$emit("update:table", event)
      }
    }
  }
</script>

<style scoped lang="stylus">
</style>
