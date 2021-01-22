import Vue from 'vue'
import Router from 'vue-router'
import ProjectEdit from "../page/ProjectEdit/ProjectEdit";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ProjectEdit',
      component: ProjectEdit
    }
  ]
})
