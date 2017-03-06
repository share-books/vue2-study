import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import createListView from '../components/views/CreateListView'
import createEditView from '../components/views/CreateEditView'

import Main from '../components/Main'
import Dashboard from '../components/pages/Dashboard'
import Login from '../components/pages/Login'
import Logout from '../components/pages/Logout'
const catInfo=[
              {
                prop: 'code',
                label: '编码',
                 width: 150
              },
              {
                prop: 'name',
                label: '分类名',
                width: 250
              }
            ]
const userInfo=[
              {
                prop: 'name',
                label: '账号',
                default: '',
                width: 250
              },
              {
                prop: 'password',
                label: '密码',
                default: '',
                width: 170
              },
              {
                prop: 'displayName',
                label: '昵称',
                default: '',
                width: 170,
                description: '在后台管理的顶部导航栏中显示'
              },
              {
                prop: 'email',
                label: '邮箱',
                default: '',
                width: 170,
                description: '在文章被回复时博客需要通知的目标邮箱，空则不通知'
              }
            ]
export default new VueRouter({
  mode: 'history',
  scrollBehavior: function (to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/admin/login',
      name: 'login',
      component: Login
      
    },
    {
      path: '/admin/logout',
      name: 'logout',
     component: Logout

    },
    {
      path: '/dashboard',
      component: Main,
      children: [
        {
          path: '/',
          name: 'dashboard',
          component: Dashboard
        }
      ]
    },
    {
      path: '/cate',
      name: 'cate',
      component: Main,
      children: [
        {
          path: 'list',
          name: 'cateList',
          component: createListView({
            name: 'cate',
            model: 'category',
            items:catInfo
          })
        },
        {
          path: 'create/:id?',
          name: 'cateCreate',
          component: createEditView({
            name: 'cate',
            model: 'category',
            items: catInfo
          })
        }
      ]
    },
    {
      path: '/user',
      name: 'user',
      component: Main,
      children: [
              {
          path: 'list',
          name: 'userList',
          component: createListView({
            name: 'user',
            model: 'user',
            items: userInfo
          })
        },
            {
          path: 'edit',
          name: 'setting',
          component: createEditView({
            name: 'user',
            model: 'user',
            isSetting: true,
            items: userInfo,
            query: {}
          })
        },
        {
           path: 'create/:id?',
          name: 'userCreate',
          component: createEditView({
            name: 'user',
            model: 'user',
           // isPlain: true,
            items: userInfo,
            query: {}
          })
        }
      ]
    },
    {
      path: '*',
      redirect: '/admin/login'
    }
  ]
})
