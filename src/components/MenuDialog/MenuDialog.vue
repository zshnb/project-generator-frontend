<template>
  <div id="menu-dialog">
    <el-dialog :visible.sync="innerIsDialogShow" :close-on-click-modal="false">
      <el-form :model="menu" label-width="80px">
        <el-form-item label="菜单名称">
          <el-input v-model="menu.name"/>
        </el-form-item>
        <el-form-item label="图标">
          <el-input v-model="menu.icon"/>
        </el-form-item>
        <el-form-item label="路径">
          <el-select v-model="menu.tableName">
            <el-option v-for="table in tables" :key="table.id" :label="table.name" :value="table.name"/>
          </el-select>
        </el-form-item>
        <el-form-item>
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
  import { mapMutations } from 'vuex'
  export default {
    name: "MenuDialog",
    props: {
      menu: {
        type: Object
      },
      isDialogShow: {
        type: Boolean
      },
      tables: {
        type: Array
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
      },
    },
    watch: {
      menu: {
        handler(newValue, oldValue) {
          const inflect = require('i')()
          newValue.href = `${inflect.camelize(oldValue.tableName, false)}/tablePage`
        },
        deep: true
      }
    },
    methods: {
      ...mapMutations(['saveMenu']),
      onSave() {
        let newMenu = JSON.parse(JSON.stringify(this.menu))
        newMenu.id = Math.random()
        this.saveMenu(newMenu)
        this.$emit('update:isDialogShow', false)
      },
      onClose() {
        this.$emit('update:isDialogShow', false)
      },
    }
  }
</script>

<style scoped>

</style>
