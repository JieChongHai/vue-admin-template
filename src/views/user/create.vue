<template>
  <div class="app-container">
    <router-view :key="key" />
    <el-form ref="user" :model="user" label-width="120px" class="with">
      <h5>新增用户</h5>
      <el-form-item label="商户号">
        <el-autocomplete
          v-model="user.intMerCode"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入内容"
          @select="handleSelect"
        />
      </el-form-item>
      <el-form-item label="用户名" prop="username">
        <el-col :span="11">
          <el-input v-model="user.username" autocomplete="off" placeholder="那就是你的名字" />
        </el-col>
      </el-form-item>
      <el-form-item label="用户角色">
        <el-select v-model="user.roleId" placeholder="用户角色">
          <el-option label="商户用户" value="3" />
          <el-option label="门店用户" value="4" />
        </el-select>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input v-model="user.password" type="password" autocomplete="off" clearable />
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input v-model="checkPassword" type="password" autocomplete="off" clearable />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="user.email" label="邮箱" placeholder="cc@gmail.com" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { create } from '@/api/user'
import { fetchList } from '@/api/merchant'
import storeData from '@/store'
export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
        email: '',
        intMerCode: '',
        intStoreCode: '',
        auditStatus: 'approved',
        roleId: null,
        status: 'normal',
        auditPermissions: []
      },
      checkPassword: '',
      merchants: [],
      intMerCodes: [],
      size: 10,
      merchant: undefined
    }
  },
  computed: {
    key() {
      return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    }
  },
  methods: {
    onSubmit() {
      if (this.user.intMerCode === '') {
        this.user.intMerCode = storeData.intMerCode
      }
      if (this.user.intStoreCode === '') {
        this.user.intStoreCode = storeData.intStoreCode
      }
      this.user.roleId = parseInt(this.user.roleId)
      create(this.user)
      this.$message({
        message: 'success',
        type: 'success'
      })
      this.user = {}
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    clickLink(path) {
      this.$router.push({
        path,
        query: {
          t: +new Date()
        }
      })
    },
    querySearchAsync(queryString, cb) {
      const query = {
        size: this.size
      }
      fetchList(query).then(response => {
        const { data, total } = response
        this.merchants = data
        this.size = total
        this.merchants.forEach(merchant => {
          const { common } = merchant
          const { intMerCode } = common
          const code = {
            value: intMerCode
          }
          this.intMerCodes.push(code)
        })
        console.log(this.intMerCodes)
        cb(this.intMerCodes)
        this.intMerCodes = []
      })
    },
    handleSelect(item) {
      console.log(item)
    }
  }
}
</script>

<style scoped>
  .with{
    width:800px;
  }
</style>

