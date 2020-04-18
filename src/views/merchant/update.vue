<template>
  <div class="app-container">
    <router-view :key="key" />
    <el-form ref="merchant" :model="merchant" label-width="120px" class="with">
      <el-form-item label="商户号">
        <el-input v-model="merchant.common.intMerCode" :disabled="true" />
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
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Update</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
    <el-collapse accordion>
      <el-collapse-item>
        <template slot="title">
          审核功能管理<i class="head-icon el-icon-info" />
        </template>
        <el-select v-model="level" :disabled="supported" active-value="true">
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
        <el-button v-if="!supported" type="primary" @click="updateAudit">开启审核功能</el-button>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { fetchDetail, update, updateAuditConfig } from '@/api/merchant'
import store from '@/store'

export default {
  data() {
    return {
      merchant: {
        id: '',
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
        },
        version: 1
      },
      intMerCode: '',
      isSupportAuditConfig: false,
      supported: true, // 是否已经开通审核
      level: '',
      auditConfig: {
        auditType: 'store',
        level: undefined
      }
    }
  },
  computed: {
    key() {
      return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    }
  },
  created() {
    this.intMerCode = this.$route.params.intMerCode || store.getters.intMerCode
    this.fetchDetail(this.intMerCode)
  },
  methods: {
    onSubmit() {
      const data = {
        common: this.merchant.common,
        version: this.merchant.version
      }
      update(this.intMerCode, data)
      this.$message({
        message: 'submit!',
        type: 'success'
      })
      fetchDetail(this.intMerCode)
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    updateAudit() {
      if (!this.supported) {
        var auditConfigs = []
        this.auditConfig.level = parseInt(this.level)
        auditConfigs.push(this.auditConfig)
        this.merchant.common.auditConfigs = auditConfigs

        const data = {
          common: this.merchant.common,
          version: this.merchant.version
        }
        updateAuditConfig(this.intMerCode, data)
        fetchDetail(this.intMerCode)
      }
    },
    clickLink(path) {
      this.$router.push({
        path,
        query: {
          t: +new Date()
        }
      })
    },
    fetchDetail(intMerCode) {
      fetchDetail(intMerCode).then(res => {
        this.merchant = res
        if (this.merchant.common.auditConfigs) {
          this.supported = true
          this.level = this.merchant.common.auditConfigs[0].level + ''
        } else {
          this.supported = false
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

