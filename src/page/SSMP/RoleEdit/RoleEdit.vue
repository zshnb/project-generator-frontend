<template>
  <div id="role-edit">
    <el-col :span="8">
      <el-form :model="role" label-width="80px">
        <el-form-item label="角色描述">
          <el-input v-model="role.description"/>
        </el-form-item>
        <el-form-item label="角色名称">
          <el-input v-model="role.name"/>
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
  import {mapMutations, mapState} from "vuex";

  export default {
    name: "RoleEdit",
    props: {
      role: {
        type: Object
      }
    },
    created() {
      if (this.role.name !== '') {
        this.overwrite = true
      }
    },
    data() {
      return {
        overwrite: false
      }
    },
    computed: {
      ...mapState('ssmp', ['menus'])
    },
    methods: {
      ...mapMutations('ssmp', ['saveRole']),
      onSave() {
        this.role.menus.forEach(it => it.role = this.role.name)
        let newRole = JSON.parse(JSON.stringify(this.role))
        newRole.id = Math.random()
        newRole.menus.forEach(it => it.id = 0)
        this.saveRole({
          role: newRole,
          overwrite: this.overwrite
        })
        this.$router.back()
      },
      onClose() {
        this.$router.back()
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>
