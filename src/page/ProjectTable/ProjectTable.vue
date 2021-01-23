<template>
  <div id="project-table">
    <el-row :gutter="12">
      <el-col :span="8">
        <el-card>
          <div slot="header">
            <span>test-table</span>
            <el-button size="small" type="primary">编辑</el-button>
            <el-button size="small" type="danger">删除</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="isDialogShow" width="90%">
      <el-form :model="table" label-width="120px">
        <el-form-item class="name-form-item">
          <div slot="label">
            <el-switch v-model="table.enablePage"/>
          </div>
          <el-input v-model="table.name" placeholder="请输入表名"/>
        </el-form-item>
        <el-form-item v-for="(column, index) in table.columns" :key="column.id">
          <div slot="label">
            <el-button type="primary"
                       size="small"
                       icon="el-icon-circle-plus-outline"
                       plain
                       @click="onAddColumn"/>
            <el-button type="danger"
                       size="small"
                       icon="el-icon-remove-outline"
                       plain
                       @click="onDeleteColumn(index)"/>
          </div>
          <el-form :inline="true"
                   :model="column"
                   class="column-form">
            <el-form-item label="列名">
              <el-input v-model="column.name"/>
            </el-form-item>
            <el-form-item label="类型">
              <el-select v-model="column.type">
                <el-option label="varchar" value="varchar"/>
              </el-select>
            </el-form-item>
            <el-form-item class="length-form-item" label="长度">
              <el-input v-model="column.length"/>
            </el-form-item>
            <el-form-item label="描述">
              <el-input v-model="column.comment"/>
            </el-form-item>
            <el-form-item label="主键">
              <el-switch v-model="column.primary"/>
            </el-form-item>
            <el-form-item label="搜索">
              <el-switch v-model="column.searchable"/>
            </el-form-item>
            <el-form-item label="表单项">
              <el-switch v-model="column.enableFormItem"/>
            </el-form-item>
            <el-form-item label="表单项类型">
              <el-select v-model="column.formItemType">
                <el-option label="输入框" value="input"/>
              </el-select>
            </el-form-item>
          </el-form>
        </el-form-item>
        <el-form-item v-if="table.enablePage"
                      v-for="(permission, index) in table.permissions"
                      :key="permission.id">
          <div slot="label">
            <el-button type="primary"
                       size="small"
                       icon="el-icon-circle-plus-outline"
                       plain
                       @click="onAddPermission"/>
            <el-button type="danger"
                       size="small"
                       icon="el-icon-remove-outline"
                       plain
                       @click="onDeletePermission(index)"/>
          </div>
          <el-form :inline="true"
                   class="permission-form">
            <el-form-item label="角色">
              <el-select v-model="permission.role">
                <el-option label="管理员" value="admin"/>
              </el-select>
            </el-form-item>
            <el-form-item label="操作">
              <el-checkbox-group v-model="permission.operations">
                <el-checkbox label="add"/>
                <el-checkbox label="edit"/>
                <el-checkbox label="detail"/>
                <el-checkbox label="delete"/>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item>
              <el-button type="danger"
                         size="small"
                         icon="el-icon-remove-outline"
                         plain
                         @click="onDeletePermission(index)"/>
            </el-form-item>
          </el-form>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSave">保存</el-button>
          <el-button @click="onCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import { md5 } from '../../util/HashUtil'

  export default {
    name: "ProjectTable",
    props: {
      table: {
        type: Object
      },
      isDialogShow: {
        type: Boolean
      }
    },
    methods: {
      onAddColumn() {
        let column = {
          name: '',
          type: '',
          length: 0,
          comment: '',
          primary: false,
          searchable: false,
          enableFormItem: true,
          formItemType: ''
        }
        column.id = md5(column)
        this.table.columns.push(column)
      },
      onDeleteColumn(index) {
        this.table.columns.splice(index, 1)
      },
      onAddPermission() {
        let permission = {
          role: '',
          operations: []
        }
        permission.id = md5(permission)
        this.table.permissions.push(permission)
      },
      onDeletePermission(index) {
        this.table.permissions.splice(index, 1)
      },
      onSave() {
        this.$emit('on-save')
      }
    }
  }
</script>

<style scoped lang="stylus">
  #project-table
    .el-icon-circle-plus-outline
      cursor pointer
    .name-form-item
      width 500px
    .column-form, .permission-form
      margin-bottom 20px
</style>
