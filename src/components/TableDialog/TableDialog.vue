<template>
  <div id="table-dialog">
    <el-dialog :visible.sync="innerIsDialogShow" :close-on-click-modal="false" width="90%">
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
            <el-form-item label="列名" class="name-form-item">
              <el-input v-model="column.name"/>
            </el-form-item>
            <el-form-item label="类型">
              <el-select v-model="column.type">
                <el-option v-for="type in columnTypes" :key="type" :label="type" :value="type"/>
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
            <el-form-item label="必选项">
              <el-switch v-model="column.require"/>
            </el-form-item>
            <el-form-item label="表单项">
              <el-switch v-model="column.enableFormItem"/>
            </el-form-item>
            <el-form-item label="表单项类型">
              <el-select v-model="column.formItemType" @change="onChangeFormItemType(column)">
                <el-option v-for="formItemType in formItemTypes"
                           :key="formItemType.className"
                           :label="formItemType.name"
                           :value="formItemType.className"/>
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
                <el-option v-for="role in roles" :key="role.name" :label="role.description" :value="role.name"/>
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
          </el-form>
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
  import axios from "../../util/Axios";

  export default {
    name: "TableDialog",
    created() {
      axios.get('/column/types').then(res => this.columnTypes = res.list)
      axios.get('/page/form-items').then(res => this.formItemTypes = res.list)
    },
    props: {
      table: {
        type: Object
      },
      isDialogShow: {
        type: Boolean
      },
      roles: {
        type: Array
      }
    },
    data() {
      return {
        columnTypes: [],
        formItemTypes: []
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
          formItemType: '',
          require: false
        }
        column.id = Math.random()
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
        permission.id = Math.random()
        this.table.permissions.push(permission)
      },
      onDeletePermission(index) {
        this.table.permissions.splice(index, 1)
      },
      onSave() {
        this.table.form.formItems = this.table.columns.filter(it => it.enableFormItem)
          .map(it => {
            let formItem = {
              formItemClassName: it.formItemType,
              require: it.require
            }
            this.isOptionFormItem(it.formItemType, () => {
              formItem.options = it.options
            })
            return formItem
          })
        let newTable = JSON.parse(JSON.stringify(this.table))
        newTable.id = Math.random()
        this.$emit('on-save', newTable)
        this.$emit('update:isDialogShow', false)
      },
      onClose() {
        this.$emit('update:isDialogShow', false)
      },
      onChangeFormItemType(column) {
        this.isOptionFormItem(column.formItemType, () => {
          column.options = []
        })
      },
      isOptionFormItem(formItemType, callback) {
        axios.get(`/page/option-form-items?formItemType=${formItemType}`).then(res => {
          if (res.data) {
            callback()
          }
        })
      }
    }
  }
</script>

<style scoped lang="stylus">
  #table-dialog
    .el-icon-circle-plus-outline
      cursor pointer

    .column-form, .permission-form
      margin-bottom 20px

</style>
