<template>
  <el-form ref="form" :model="form" label-width="120px">
    <el-form-item v-for="item in options.items" :label="item.label">
      <el-input v-if="typeof item.description === 'undefined'" :autosize="{ minRows: 2, maxRows: 16}" :type="item.type || 'text'" v-model="form[item.prop]"></el-input>
      <el-popover
        v-if="typeof item.description !== 'undefined'"
        placement="right-start"
        :title="item.label"
        width="50%"
        trigger="hover"
        :content="item.description">
        <el-input slot="reference" :autosize="{ minRows: 2, maxRows: 16}" :type="item.type || 'text'" v-model="form[item.prop]"></el-input>
      </el-popover>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click.native="onSubmit">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
const blackModelArr = ['user']

export default {
  name: 'create',
  props: ['options'],
  data () {
    let form = this.options.items.reduce((prev, curr) => {
      prev[curr.prop] = curr.default
      return prev
    }, {})
    return {
  
      form,
      isLoading: true
    }
  },
  computed: {
    list () {
      return this.$store.state.list
    }
  },
  methods: {
      onSubmit () {
      let id = this.$route.params.id
      if (typeof id !== 'undefined') {
           return this.$store.dispatch('PATCH', Object.assign({}, {
          id: this.$route.params.id,
          form: this.form
        }, this.options)).then(response => {
   
          this.$message({
            message: '已成功提交',
            type: 'success'
          })
  
        }).catch(err => console.error(err))
      } else {
        // post
        return this.$store.dispatch('POST', Object.assign({}, {
          form: this.form
        }, this.options)).then(response => {
   
          this.$router.go(-1)
          this.$message({
            message: '已成功提交',
            type: 'success'
          })
      
        }).catch(err => console.error(err))
      }
    }
  },
  created () {

    if (this.options.isSetting === true) {
        this.form = Object.assign({}, this.$store.state.user)
        this.isLoading = false
        return
      }
 
    if (typeof this.$route.params.id !== 'undefined') {
      return this.$store.dispatch('FETCH_CREATE', Object.assign({}, {
        id: this.$route.params.id
      }, this.options)).then(() => {
        this.form = Object.assign({}, this.$store.state.curr)

        this.isLoading = false
      }).catch(err => console.error(err))
    }
    
  }
}
</script>

<style lang="scss" scoped>
  .el-form {
    width: 40%;
    margin-top: 20px;

    .el-button {
      width: 100%;
    }
  }
</style>