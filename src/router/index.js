import Vue from 'vue'
import Router from 'vue-router'
import ProjectEdit from "../page/ProjectEdit/ProjectEdit";
import TableEdit from "../page/TableEdit/TableEdit";
import RoleEdit from "../page/RoleEdit/RoleEdit";
import MenuEdit from "../page/MenuEdit/MenuEdit";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ProjectEdit',
      component: ProjectEdit
    },
    {
      path: '/table-edit',
      name: 'TableEdit',
      component: TableEdit,
      props: true
    },
    {
      path: '/role-edit',
      name: 'RoleEdit',
      component: RoleEdit,
      props: true
    },
    {
      path: '/menu-edit',
      name: 'MenuEdit',
      component: MenuEdit,
      props: true
    }
  ]
})
