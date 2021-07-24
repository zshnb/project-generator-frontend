<template>
  <div id="menu-edit">
    <el-col :span="8">
      <el-form :model="menu" label-width="80px">
        <el-form-item label="菜单名称">
          <el-input v-model="menu.name"/>
        </el-form-item>
        <el-form-item label="图标">
          <el-input v-model="menu.icon"/>
        </el-form-item>
        <el-form-item label="绑定表">
          <el-switch v-model="menu.bind"/>
        </el-form-item>
        <el-form-item label="路径">
          <el-input v-if="!menu.bind" v-model="menu.href"/>
          <el-select v-if="menu.bind" v-model="menu.tableName">
            <el-option v-for="table in tables" :key="table.id" :label="table.name" :value="table.name"/>
          </el-select>
        </el-form-item>
        <el-form-item label="所属角色">
          <el-select v-model="menu.roleDescriptions" multiple>
            <el-option v-for="role in roles" :key="role.id" :label="role.description" :value="role.description"/>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSave">保存</el-button>
          <el-button @click="onClose">取消</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </div>
</template>

<script>
  import {mapMutations, mapState} from 'vuex'

  export default {
    name: "MenuEdit",
    props: {
      menu: {
        type: Object
      }
    },
    created() {
      if (this.menu.name !== '') {
        this.overwrite = true
      }
    },
    computed: {
      ...mapState('ssmp', ['tables', 'roles'])
    },
    methods: {
      ...mapMutations('ssmp', ['saveMenu', 'addMenuInRole']),
      onSave() {
        let newMenu = JSON.parse(JSON.stringify(this.menu))
        if (this.menu.bind) {
          const camelcase = require('camelcase')
          newMenu.href = `/${camelcase(newMenu.tableName)}/tablePage`
        }
        this.menu.roleDescriptions.forEach(description => {
          this.addMenuInRole({
            roleDescription: description,
            menu: newMenu
          })
        })
        newMenu.id = Math.random()
        this.saveMenu({
          menu: newMenu,
          overwrite: this.overwrite
        })
        this.$router.back()
      },
      onClose() {
        this.$router.back()
      },
    }
  }
</script>

<style scoped>

</style>
