<template>
  <el-row class="sidebar">
    <el-col :span="4" class="full-height" style="overflow-y:auto;">
      <el-menu :router="true" :default-active="fullPath" 
                class="full-height" :unique-opened="true"
                @select="handleSelect">

        <el-menu-item index="/dashboard"><i class="el-icon-date"></i>首页</el-menu-item>

        <el-submenu index="2">
          <template slot="title"><i class="el-icon-star-on"></i>分类管理</template>
          <el-menu-item index="/cate/list">分类列表</el-menu-item>
          <el-menu-item index="/cate/create">添加分类</el-menu-item>
        </el-submenu>
        
        <el-submenu index="3">
          <template slot="title"><i class="el-icon-star-off"></i>用户管理</template>
          <el-menu-item index="/user/list">用户列表</el-menu-item>
          <el-menu-item index="/user/create">添加用户</el-menu-item>
        </el-submenu>
      
       </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'sidebar',
  data () {
    return {
      title: '',
      fullPath: ''
    }
  },
  watch: {
    '$route': function (route) {
      this.fullPath = route.path.split('/').slice(0, 3).join('/')
    }
  },
  methods: {
    push (name) {
      this.$router.push({ name })
    },
    handleSelect (index, indexPath) {

    }
  },
  beforeMount () {
    this.fullPath = this.$route.path.split('/').slice(0, 3).join('/')
    console.log(this.fullPath)
  }
}
</script>

<style lang="scss" scoped>
.sidebar {
  height: 100%;
  box-sizing: border-box;
  padding-bottom: 60px;

  .row-bg {
    height: 100%;
  }
}

.full-height {
  height: 100%;
  width: 148px;
}
</style>
