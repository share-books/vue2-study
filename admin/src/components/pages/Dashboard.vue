<template>
  <div class="dashboard">
    <el-row>
      <el-col :span="24">
        <div class="info">
         <a :href="'http://192.168.1.200:9333/'+file.fid">{{file.name}}</a>
         
       </div>
        <el-slider style="margin-top: 20px" v-model="sliderValue"></el-slider>
      </el-col>
    </el-row>
    <el-row :gutter="10" style="margin-top:20px;">
      <el-col :span="10">
        <div class="recent">
          <el-tree 
              :default-expand-all='true'
              style="border-width: 0px" 
              :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
        </div>
      </el-col>
 
    </el-row>
  </div>
</template>

<script>
const FILE_SERVER = `/fsPrefix`
import request from 'axios'

export default {
  name: 'info',
  data () {
    return {
      sliderValue: 100,
      file:{
        name:'',
        fid:''
      }
    }
  },
  methods: {
    handleNodeClick (data, node, tree) {
    
    }
  },
  created(){
    console.log("created")
    request.get(FILE_SERVER,{ headers: {'Accept': 'application/json'}}).then(response=>{
      console.log( response.data)
      let {name,fid}=response.data.Files[0]
      this.file={name,fid}
    })

  },
  mounted () {
  /*  this.$store.dispatch('FETCH', {
      model: 'post',
      query: {
        select: {
          title: 1,
          type: 1
        },
        sort: 1,
        limit: 10
      }
    }).then(list => {
      this.data = [{
        title: '最近发布的文章',
        children: list
      }]
    })*/
  }
}
</script>

<style lang="scss" scoped>
  .dashboard {
    padding: 20px; 
    .info {
      height: 100px;
    }
  }
</style>