<template>
  <div class="app-container">
    <router-view :key="key" />
    <el-form ref="store" :model="store" label-width="120px" class="with">
      <el-form-item label="商户号">
        <el-autocomplete
          v-model="store.common.intMerCode"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入内容"
          @select="handleSelect"
        />
      </el-form-item>
      <el-form-item label="门店号">
        <el-input v-model="store.common.intStoreCode" placeholder="长度六位" maxlength="6" />
      </el-form-item>
      <el-form-item label="外部门店号" :span="11">
        <el-input v-model="store.common.storeNum" placeholder="字母和数字" />
      </el-form-item>
      <el-form-item label="门店名" :span="11">
        <el-input v-model="store.common.storeName" placeholder="起个好听的名字,拜托" />
      </el-form-item>
      <el-form-item label="币种">
        <el-select v-model="store.common.currency" placeholder="CNY">
          <el-option label="Chinese Yuan" value="CHY" />
          <el-option label="Europe" value="ERU" />
          <el-option label="American" value="USD" />
        </el-select>
      </el-form-item>
      <el-form-item label="联系方式">
        <el-col>联系人:</el-col>
        <el-col :span="11">
          <el-input v-model="store.common.contact.name" placeholder="一般是管理人" />
        </el-col>
        <el-col>联系号码:</el-col>
        <el-col :span="11">
          <el-input v-model="store.common.contact.phoneNumber" label="联系号码" placeholder="12306" />
        </el-col>
        <el-col>邮箱:</el-col>
        <el-col :span="11">
          <el-input v-model="store.common.contact.email" label="邮箱" placeholder="cc@gmail.com" />
        </el-col>
        <el-col>地址:</el-col>
        <el-col :span="11">
          <el-input v-model="store.common.contact.address" label="地址" placeholder="快说,在哪?" />
        </el-col>
      </el-form-item>
      <h5>新增用户</h5>
      <el-form-item label="用户名" prop="username">
        <el-col :span="11">
          <el-input v-model="user.username" autocomplete="off" placeholder="那就是你的名字" />
        </el-col>
      </el-form-item>
      <el-form-item label="用户角色">
        <el-select v-model="user.roleId" placeholder="用户角色">
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
      <el-form-item label="门店备注">
        <el-input v-model="store.common.remark" type="textarea" autosize placeholder="发表你的 title" show-word-limit maxlength="30" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { create } from '@/api/store'
import { fetchList } from '@/api/merchant'
import storeData from '@/store'
import { submitted } from '@/api/audit'

export default {
  data() {
    return {
      store: {
        common: {
          intMerCode: '',
          intStoreCode: '',
          storeNum: '',
          storeName: '',
          currency: 'CHY',
          contact: {
            name: '',
            phoneNumber: '',
            email: '',
            address: ''
          },
          remark: '',
          status: 'normal'
        }
      },
      users: [],
      user: {
        username: '',
        password: '',
        email: '',
        intMerCode: '',
        intStoreCode: '',
        auditStatus: 'approved',
        roleId: null,
        status: 'normal'
      },
      checkPassword: '',
      merchants: [],
      intMerCodes: [],
      size: 10,
      token: ''
    }
  },
  computed: {
    key() {
      return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    }
  },
  methods: {
    async onSubmit() {
      if (this.store.common.intMerCode === '') {
        this.store.common.intMerCode = storeData.intMerCode
      }
      this.user.roleId = parseInt(this.user.roleId)
      this.users.push(this.user)
      const data = {
        store: this.store,
        users: this.users
      }
      this.token = await create(data)
      if (this.token !== '') {
        submitted(this.token)
      }
      this.$message({
        message: 'submit!',
        type: 'success'
      })
      this.store = {}
      this.users = []
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

