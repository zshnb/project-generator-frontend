<template>
  <div id="entity-edit">
    <el-form :model="entity" label-width="120px">
      <el-form-item label="名称">
        <el-input v-model="entity.name" placeholder="请输入名称"/>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="entity.comment" placeholder="请输入描述"/>
      </el-form-item>
      <el-form-item label="文件操作">
        <el-switch v-model="entity.fileOperation"/>
      </el-form-item>
      <el-form-item v-for="(field, index) in entity.fields" :key="field.id" @click.native="onClickField(field)">
        <div slot="label">
          <el-button type="primary"
                     size="small"
                     icon="el-icon-circle-plus-outline"
                     plain
                     @click="onAddField(index)"/>
          <el-button type="danger"
                     size="small"
                     icon="el-icon-remove-outline"
                     plain
                     @click="onDeleteField(index)"/>
        </div>
        <el-form :inline="true"
                 :model="field"
                 class="field-form">
          <el-form-item label="名称" class="name-form-item">
            <el-input v-model="field.name" placeholder="请输入字段名称"/>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="field.type" placeholder="请选择字段类型">
              <el-option v-for="type in fieldTypes" :key="type" :label="type" :value="type.toUpperCase()"/>
            </el-select>
          </el-form-item>
          <el-form-item label="描述" class="name-form-item">
            <el-input v-model="field.comment" placeholder="请输入字段描述"/>
          </el-form-item>
          <div>
            <el-form-item label="搜索" class="length-form-item">
              <el-switch v-model="field.searchable"/>
            </el-form-item>
          </div>
        </el-form>
      </el-form-item>
      <el-form-item label="操作">
        <el-checkbox-group v-model="checkOperations">
          <el-checkbox v-for="operation in operations"
                       :key="operation.value"
                       :label="operation">
            {{ operation.name }}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="onAddEntity">添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getDefaultMenus, getField } from "../../../util/EntityUtils";
import { appendAll } from "../../../util/ArrayUtils";
import axios from "../../../util/Axios";
import { mapMutations } from "vuex";

export default {
  name: "EntityEdit",
  created() {
    axios.get('/field/types').then(res => this.fieldTypes = res.list)
    if (this.entity.name !== '') {
      this.overwrite = true
    }
  },
  data() {
    return {
      entity: {
        name: '',
        comment: '',
        fileOperation: false,
        fields: [{
          name: '',
          type: '',
          comment: '',
          searchable: false
        }]
      },
      fieldTypes: [],
      field: {},
      overwrite: false,
      operations: [
        {
          name: '添加',
          value: 'add',
        },
        {
          name: '编辑',
          value: 'edit',
        },
        {
          name: '详情',
          value: 'detail',
        },
        {
          name: '删除',
          value: 'delete',
        }
      ],
      checkOperations: []
    }
  },
  methods: {
    onClickField(field) {
      this.field = field
    },
    onAddField(index) {
      this.entity.fields.splice(index + 1, 0, getField())
    },
    onDeleteField(index) {
      this.entity.fields.splice(index, 1)
    },
    onAddEntity() {
      let menus = []
      this.checkOperations.forEach(it => {
        switch (it.value) {
          case 'add': {
            menus.push({
              name: `添加${ this.entity.comment }`,
              value: it.value,
              method: `add_${ this.entity.name }()`
            })
            break
          }
          case 'edit': {
            menus.push({
              name: `修改${ this.entity.comment }`,
              value: it.value,
              method: `update_${ this.entity.name }()`
            })
            break
          }
          case 'detail': {
            let subMenus = this.entity.fields.filter(it => it.searchable).flatMap(it => {
              return {
                name: `通过${ it.name }查找${ this.entity.comment }`,
                value: 'detail',
                method: `find_${ this.entity.name }_by_${ it.name }()`
              }
            })
            appendAll(menus, ...subMenus)
            break
          }
          case 'delete': {
            let subMenus = this.entity.fields.filter(it => it.searchable).flatMap(it => {
              return {
                name: `通过${ it.name }删除${ this.entity.comment }`,
                value: 'delete',
                method: `delete_${ this.entity.name }_by_${ it.name }()`
              }
            })
            appendAll(menus, ...subMenus)
            break
          }
        }
      })
      appendAll(menus, ...getDefaultMenus(this.entity))
      this.entity.menus = menus
      this.addEntity({
        entity: JSON.parse(JSON.stringify(this.entity)),
        overwrite: this.overwrite
      })
      this.$message.success('添加成功')
      this.$router.back()
    },
    ...mapMutations('c', ['addEntity'])
  }
}
</script>

<style scoped>

</style>