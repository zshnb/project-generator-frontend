import Vue from 'vue'
import Router from 'vue-router'
import ProjectEdit from "../page/SBMP/ProjectEdit/ProjectEdit";
import TableEdit from "../page/SBMP/TableEdit/TableEdit";
import RoleEdit from "../page/SBMP/RoleEdit/RoleEdit";
import MenuEdit from "../page/SBMP/MenuEdit/MenuEdit";
import Home from "../page/Home/Home";
import ProjectManage from "../page/ProjectManage/ProjectManage";
import CProjectDetail from "../page/C/ProjectDetail/ProjectDetail";
import EntityEdit from "../page/C/EntityEdit/EntityEdit";
import SwingProjectDetail from "../page/Swing/ProjectDetail/ProjectDetail";
import SwingTable from "../page/Swing/Table/Table";
import SwingMenu from "../page/Swing/Menu/Menu";
import SwingRole from "../page/Swing/Role/Role";

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
          component: EntityEdit,
          props: true
        },
        {
          name: 'SSMPProjectEdit',
          path: 'project-edit',
          component: ProjectEdit
        },
        {
          name: 'SwingProjectEdit',
          path: 'swing-project-edit',
          component: SwingProjectDetail
        },
        {
          name: 'SwingTable',
          path: 'swing-table',
          component: SwingTable,
          props: true
        },
        {
          name: 'SwingRole',
          path: 'swing-role',
          component: SwingRole,
          props: true
        },
        {
          name: 'SwingMenu',
          path: 'swing-menu',
          component: SwingMenu,
          props: true
        },
        {
          name: 'TableEdit',
          path: 'table-edit',
          component: TableEdit,
          props: true
        },
        {
          name: 'RoleEdit',
          path: 'role-edit',
          component: RoleEdit,
          props: true
        },
        {
          name: 'MenuEdit',
          path: 'menu-edit',
          component: MenuEdit,
          props: true
        }
      ]
    },
  ]
})
