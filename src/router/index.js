import Vue from 'vue'
import Router from 'vue-router'
import ProjectEdit from "../page/ProjectEdit/ProjectEdit";
import TableEdit from "../page/TableEdit/TableEdit";
import RoleEdit from "../page/RoleEdit/RoleEdit";
import MenuEdit from "../page/MenuEdit/MenuEdit";
import Home from "../page/Home/Home";
import ProjectManage from "../page/ProjectManage/ProjectManage";
import CProjectDetail from "../page/C/ProjectDetail/ProjectDetail";
import EntityEdit from "../page/C/EntityEdit/EntityEdit";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          name: 'ProjectManage',
          path: 'project-manage',
          component: ProjectManage
        },
        {
          name: 'CProjectDetail',
          path: 'c-project-detail',
          component: CProjectDetail
        },
        {
          name: 'CEntityEdit',
          path: 'c-entity-edit',
          component: EntityEdit
        },
        {
          path: '/project-edit',
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
    },
  ]
})
