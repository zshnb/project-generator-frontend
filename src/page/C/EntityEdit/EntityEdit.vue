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
            <el-form-item label="删除" class="length-form-item">
              <el-switch v-model="field.deletable"/>
            </el-form-item>
          </div>
        </el-form>
      </el-form-item>
      <el-form-item label="操作">
        <el-checkbox-group v-model="entity.operations">
          <el-checkbox v-for="operation in operations"
                       :key="operation.value"
                       :label="operation.value">
            {{ operation.name }}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="onAddEntity">{{ buttonText }}</el-button>
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
      this.buttonText = '修改'
    } else {
      this.buttonText = '添加'
    }
  },
  props: {
    entity: {
      type: Object
    }
  },
  data() {
    return {
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
        }
      ],
      buttonText: ''
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
      this.entity.operations.forEach(it => {
        switch (it) {
          case 'add': {
            menus.push({
              name: `添加${ this.entity.comment }`,
              value: it,
              method: `add_${ this.entity.name }()`
            })
            break
          }
          case 'edit': {
            menus.push({
              name: `修改${ this.entity.comment }`,
              value: it,
              method: `update_${ this.entity.name }()`
            })
            break
          }
        }
      })
      let detailMenus = this.entity.fields.filter(it => it.searchable).map(it => {
        return {
          name: `通过${ it.comment }查找${ this.entity.comment }`,
          value: 'detail',
          method: `find_${ this.entity.name }_by_${ it.name }()`
        }
      })
      menus = appendAll(menus, detailMenus)
      let deleteMenus = this.entity.fields.filter(it => it.deletable).map(it => {
        return {
          name: `通过${ it.comment }删除${ this.entity.comment }`,
          value: 'delete',
          method: `delete_${ this.entity.name }_by_${ it.name }()`
        }
      })
      menus = appendAll(menus, deleteMenus)
      this.entity.menus = appendAll(menus, getDefaultMenus(this.entity))
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
