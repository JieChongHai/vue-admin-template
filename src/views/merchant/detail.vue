<template>
  <div class="app-container">
    <div class="el-image">
      <h5>商户基础详情</h5>
      <el-col :span="12">
        <img :src="merchantImg" width="100%" height="666" alt="商家的详情">
      </el-col>
      <el-button @click="fetchDetail(intMerCode)">详情</el-button>
      <el-col>
        <label>商户号: </label>
        <h6> {{ intMerCode }} </h6>
        <label>商户名: </label>
        <h6> {{ common.merName }} </h6>
        <label>业务区域: </label>
        <h6> {{ common.businessArea }} </h6>
        <label>交易币种: </label>
        <h6> {{ common.currency }} </h6>
        <label>经营用户: </label>
        <h6> {{ common.contact.name }} </h6>
      </el-col>
    </div>
  </div>
</template>

<script>
import merchantImg from '@/assets/merchant/merchant.png'
import store from '@/store'
import { fetchDetail } from '@/api/merchant'

export default {
  name: 'Merchant',
  data() {
    return {
      merchantImg: merchantImg,
      intMerCode: '',
      common: {
        intMerCode: '',
        merName: '',
        businessArea: '',
        currency: '',
        contact: {
          name: '',
          phoneNumber: '',
          email: ''
        },
        status: '',
        auditConfigs: []
      },
      createAt: undefined,
      dialogVisible: false
    }
  },
  created() {
    console.log(this.$route)
    this.intMerCode = store.getters.intMerCode
    fetchDetail(this.intMerCode)
  },
  methods: {
    async fetchDetail(intMerCode) {
      await fetchDetail(intMerCode).then(response => {
        const { common, createAt } = response
        this.common = common
        this.createAt = createAt
      })
      console.log('1' + this.common)
    }
  }
}

</script>

<style scoped>

</style>
