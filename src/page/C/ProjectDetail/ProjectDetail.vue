<template>
  <div id="c-project-edit">
    <el-tabs v-model="activeName" @tab-click="onChangeTabPane">
      <el-tab-pane label="项目配置" name="project-setting">
        <el-form :model="project">
          <el-form-item label="名称">
            <el-input v-model="project.name" placeholder="请输入项目名称"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onGenerate">生成</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="结构体配置" name="entity-setting">
        <div>
          <el-button type="primary" @click="onAddEntity">添加结构体</el-button>
        </div>
        <el-row :gutter="20">
          <el-col :span="6" v-for="(entity, index) in entities" :key="entity.id" >
            <el-card class="entity-card">
              <div slot="header">
                <div class="card-header">
                  <p>{{ entity.name }}</p>
                  <div>
                    <el-button size="small" type="primary" @click="onEditEntity" icon="el-icon-edit"></el-button>
                    <el-button size="small" type="danger" @click="onDeleteEntity(index)" icon="el-icon-delete"></el-button>
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
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import axios from "../../../util/Axios";

export default {
  name: "ProjectEdit",
  data() {
    return {
      project: {
        name: '',
        type: 'C'
      },
      activeName: 'project-setting'
    }
  },
  mounted() {
    this.activeName = this.$route.query.activeName || 'project-setting'
  },
  computed: {
    ...mapState('c', ["entities"])
  },
  methods: {
    onAddEntity() {
      this.$router.push({
        name: 'CEntityEdit',
      })
    },
    onChangeTabPane(tab) {
      this.$router.push({
        path: this.$route.path,
        query: {
          activeName: tab.name
        }
      })
    },
    onDeleteEntity(index) {
      this.deleteEntity(index)
    },
    onEditEntity() {
      this.$router.push({
        name: 'TableEdit',
        params: {
          table: this.table,
          roles: this.roles
        }
      })
    },
    onGenerate() {
      let project = JSON.parse(JSON.stringify(this.project))
      project.entities = this.entities
      axios.post('/project/generate', JSON.stringify({
        cProject: project
      }), {
        responseType: 'blob'
      }).then(data => {
        if (!data) {
          return
        }
        let url = window.URL.createObjectURL(new Blob([data]))
        let a = document.createElement('a')
        a.style.display = 'none'
        a.href = url
        a.setAttribute('download', `${this.project.name}.c`)
        document.body.appendChild(a)
        a.click() //执行下载
        window.URL.revokeObjectURL(a.href)
        document.body.removeChild(a)
      })
    },
    ...mapMutations('c', ['deleteEntity'])
  }
}
</script>

<style scoped lang="stylus">
#c-project-edit
  .el-row
    padding 10px
  .entity-card
    height 300px
    margin-top 20px
    .card-header
      display flex
      justify-content space-between
      align-items center
</style>
