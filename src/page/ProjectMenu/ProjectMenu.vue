<template>
  <div id="project-menu">
    <el-card>
      <div slot="header">
        <span>{{menu.name}}</span>
        <el-button size="small" type="primary">编辑</el-button>
        <el-button size="small" type="danger" @click="onDelete">删除</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "ProjectMenu",
    props: {
      menu: {
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
        this.$emit('delete-menu')
      }
    }
  }
</script>

<style scoped>

</style>
