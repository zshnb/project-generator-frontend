<template>
  <div id="menu-dialog">
    <el-dialog :visible.sync="innerIsDialogShow" :close-on-click-modal="false" @close="onClose">
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
    computed: {
      innerIsDialogShow: {
        get() {
          return this.isDialogShow
        },
        set(newValue) {
          this.$emit('update:isDialogShow', newValue)
        }
      }
    },
    methods: {
      onSave() {
        let newMenu = JSON.parse(JSON.stringify(this.menu))
        newMenu.id = Math.random()
        this.$emit('on-save', newMenu)
        this.$emit('update:isDialogShow', false)
      },
      onClose() {
        this.$emit('update:isDialogShow', false)
      }
    }
  }
</script>

<style scoped>

</style>
