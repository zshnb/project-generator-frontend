<template>
  <div id="project-table">
    <el-card>
      <div slot="header">
        <div class="card-header">
          <p>{{table.name}}</p>
          <div>
            <el-button size="small" type="primary" @click="onEdit" icon="el-icon-edit"></el-button>
            <el-button size="small" type="danger" @click="onDelete" icon="el-icon-delete"></el-button>
          </div>
        </div>
      </div>
      <div class="table-body">
        <ul>
          <li v-for="column in table.columns" :key="column.id">
            <span>{{column.name}}</span>
            <span>{{column.type}}</span>
            <span>({{column.length}})</span>
          </li>
        </ul>
      </div>
    </el-card>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  export default {
    name: "ProjectTable",
    props: {
      table: {
        type: Object
      },
      roles: {
        type: Array
      },
      index: {
        type: Number
      }
    },
    methods: {
      ...mapMutations('sbmp', ['deleteTable']),
      onDelete() {
        this.deleteTable(this.index)
      },
      onEdit() {
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
  #project-table
    .card-header
      display flex
      justify-content space-between
      align-items center
</style>
