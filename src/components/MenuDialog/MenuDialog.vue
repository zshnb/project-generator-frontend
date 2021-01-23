<template>
  <div id="menu-dialog">
    <el-dialog :visible.sync="innerIsDialogShow" @close="onClose">
      <el-form :model="menu" label-width="80px">
        <el-form-item label="菜单名称">
          <el-input v-model="menu.name"/>
        </el-form-item>
        <el-form-item label="图标">
          <el-input v-model="menu.icon"/>
        </el-form-item>
        <el-form-item label="路径">
          <el-input v-model="menu.href"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSave">保存</el-button>
          <el-button @click="onClose">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "MenuDialog",
    props: {
      menu: {
        type: Object
      },
      isDialogShow: {
        type: Boolean
      }
    },
    data() {
      return {
        innerIsDialogShow: this.isDialogShow
      }
    },
    watch: {
      isDialogShow(val) {
        this.innerIsDialogShow = val
      }
    },
    methods: {
      onSave() {
        this.$emit('on-save')
      },
      onClose() {
        this.$emit('on-close', false)
      }
    }
  }
</script>

<style scoped>

</style>
