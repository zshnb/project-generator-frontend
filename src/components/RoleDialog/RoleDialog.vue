<template>
  <div id="role-dialog">
    <el-dialog :visible.sync="innerIsDialogShow" @close="onClose">
      <el-form :model="role" label-width="80px">
        <el-form-item label="角色描述">
          <el-input v-model="role.description"/>
        </el-form-item>
        <el-form-item label="角色名称">
          <el-input v-model="role.name"/>
        </el-form-item>
        <el-form-item label="角色菜单">
          <el-select v-model="role.menus" multiple value-key="name">
            <el-option v-for="menu in menus"
                       :key="menu.name"
                       :label="menu.name"
                       :value="menu"/>
          </el-select>
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
    name: "RoleDialog",
    props: {
      role: {
        type: Object
      },
      isDialogShow: {
        type: Boolean
      },
      menus: {
        type: Array
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
