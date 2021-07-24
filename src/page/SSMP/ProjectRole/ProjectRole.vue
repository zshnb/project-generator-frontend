<template>
  <div id="project-role">
    <el-card>
      <div slot="header">
        <span>{{role.description}}</span>
        <el-button size="small" type="primary" @click="onEdit">编辑</el-button>
        <el-button size="small" type="danger" @click="onDelete">删除</el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
  import { mapMutations } from 'vuex'
  export default {
    name: "ProjectRole",
    props: {
      role: {
        type: Object
      },
      index: {
        type: Number
      }
    },
    methods: {
      ...mapMutations('ssmp', ['deleteRole']),
      onDelete() {
        this.deleteRole(this.index)
      },
      onEdit() {
        this.$router.push({
          name: 'RoleEdit',
          params: {
            role: this.role
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
