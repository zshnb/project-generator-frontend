<template>
  <div id="c-project-edit">
    <el-tabs>
      <el-tab-pane>
        <el-form :model="project">
          <el-form-item label="名称">
            <el-input v-model="project.name" label="请输入项目名称"/>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="结构体配置">
        <el-card v-for="entity in project.entities" :key="entity.id">
          <div slot="header">
            <div class="card-header">
              <p>{{ entity.name }}</p>
              <div>
                <el-button size="small" type="primary" @click="onEdit" icon="el-icon-edit"></el-button>
                <el-button size="small" type="danger" @click="onDelete" icon="el-icon-delete"></el-button>
              </div>
            </div>
          </div>
          <div class="table-body">
            <ul>
              <li v-for="entity in entity.fields" :key="entity.id">
                <span>{{ entity.name }}</span>
                <span>{{ entity.type }}</span>
              </li>
            </ul>
          </div>
        </el-card>
        <el-card class="create-entity-card" @click.native="onCreateEntity">
          <i class="el-icon-plus"/>
        </el-card>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "ProjectEdit",
  data() {
    return {
      project: {
        name: '',
        entities: []
      }
    }
  },
  methods: {
    onCreateEntity() {
      this.$router.push({
        name: 'TableEdit',
        params: {
          table: this.table,
          roles: this.roles
        }
      })
    },
  }
}
</script>

<style scoped lang="stylus">
#c-project-edit
  .card-header
    display flex
    justify-content space-between
    align-items center
</style>
