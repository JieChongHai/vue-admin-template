<template>
  <div class="app-container">
    <router-view :key="key" />
    <el-form ref="merchant" :model="merchant" label-width="120px" class="with">
      <el-form-item label="商户号">
        <el-input v-model="merchant.common.intMerCode" placeholder="长度六位" />
      </el-form-item>
      <el-form-item label="商户名">
        <el-input v-model="merchant.common.merName" placeholder="大商户" />
      </el-form-item>
      <el-form-item label="业务区域">
        <el-select v-model="merchant.common.businessArea" placeholder="please select your zone">
          <el-option label="上海" value="上海" />
          <el-option label="北京" value="北京" />
          <el-option label="武汉" value="武汉" />
          <el-option label="南昌" value="南昌" />
          <el-option label="重庆" value="重庆" />
          <el-option label="广州" value="广州" />
        </el-select>
      </el-form-item>
      <el-form-item label="币种">
        <el-select v-model="merchant.common.currency" placeholder="CNY">
          <el-option label="Chinese Yuan" value="CHY" />
          <el-option label="Europe" value="ERU" />
          <el-option label="American" value="USD" />
        </el-select>
      </el-form-item>
      <el-form-item label="联系方式">
        <el-col>联系人:</el-col>
        <el-col :span="11">
          <el-input v-model="merchant.common.contact.name" placeholder="一般是管理人" />
        </el-col>
        <el-col>联系号码:</el-col>
        <el-col :span="11">
          <el-input v-model="merchant.common.contact.phoneNumber" label="联系号码" placeholder="12306" />
        </el-col>
        <el-col>邮箱:</el-col>
        <el-col :span="11">
          <el-input v-model="merchant.common.contact.email" label="邮箱" placeholder="cc@gmail.com" />
        </el-col>
        <el-col>地址:</el-col>
        <el-col :span="11">
          <el-input v-model="merchant.common.contact.address" label="地址" placeholder="快说,在哪?" />
        </el-col>
      </el-form-item>
      <el-form-item label="是否开通门店审核">
        <el-switch v-model="isSupportAuditConfig" />
      </el-form-item>
      <el-form-item v-if="isSupportAuditConfig" label="门店审核层级">
        <el-select v-model="auditConfig.level" active-value="true">
          <el-option label="一审" value="1" />
          <el-option label="二审" value="2" />
          <el-option label="三审" value="3" />
          <el-option label="四审" value="4" />
          <el-option label="五审" value="5" />
          <el-option label="六审" value="6" />
          <el-option label="七审" value="7" />
          <el-option label="八审" value="8" />
          <el-option label="九审" value="9" />
        </el-select>
      </el-form-item>
      <h5>新增用户</h5>
      <el-form-item label="用户名" prop="username">
        <el-col :span="11">
          <el-input v-model="user.username" autocomplete="off" />
        </el-col>
      </el-form-item>
      <el-form-item label="用户角色">
        <el-select v-model="user.roleId" placeholder="用户角色">
          <el-option label="商户用户" value="3" />
        </el-select>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input v-model="user.password" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input v-model="checkPassword" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="user.email" label="邮箱" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { create } from '@/api/merchant'
export default {
  data() {
    return {
      merchant: {
        common: {
          intMerCode: '',
          merName: '',
          businessArea: '',
          currency: 'CHY',
          contact: {
            name: '',
            phoneNumber: '',
            email: '',
            address: ''
          },
          auditConfigs: []
        }
      },
      users: [],
      isSupportAuditConfig: false,
      auditConfig: {
        auditType: 'store',
        level: 1
      },
      user: {
        username: '',
        password: '',
        email: '',
        intMerCode: '',
        auditStatus: 'approved',
        roleId: null,
        status: 'normal'
      },
      checkPassword: ''
    }
  },
  computed: {
    key() {
      return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    }
  },
  methods: {
    onSubmit() {
      if (this.isSupportAuditConfig) {
        this.auditConfig.level = parseInt(this.auditConfig.level)
        this.merchant.common.auditConfigs.push(this.auditConfig)
      }
      this.user.intMerCode = this.merchant.common.intMerCode
      this.user.roleId = parseInt(this.user.roleId)
      this.users.push(this.user)
      const data = {
        merchant: this.merchant,
        users: this.users
      }
      create(data)
      this.$message('submit!')
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
    }
  }
}
</script>

<style scoped>
  .with{
    width:800px;
  }
</style>

