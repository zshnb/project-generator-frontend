<template>
  <div id="role-dialog">
    <el-dialog :visible.sync="innerIsDialogShow" :close-on-click-modal="false">
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
  import { mapMutations, mapState } from 'vuex'
  export default {
    name: "RoleDialog",
    props: {
      role: {
        type: Object
      },
      isDialogShow: {
        type: Boolean
      }
    },
    computed: {
      ...mapState(['menus']),
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
      ...mapMutations(['saveRole']),
      onSave() {
        this.role.menus.forEach(it => it.role = this.role.name)
        let newRole = JSON.parse(JSON.stringify(this.role))
        newRole.id = Math.random()
        newRole.menus.forEach(it => it.id = 0)
        this.saveRole(newRole)
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
