<template>
  <div class="app-container">
    <div class="el-image">
      <h5>商户基础详情</h5>
      <el-col :span="12">
        <img :src="merchantImg" width="444" height="528" alt="商家的详情">
      </el-col>
      <el-col>
        <label>商户号</label>
        <h6>{{ common.intMerCode }}</h6>
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
    this.intMerCode = store.getters.intMerCode
    fetchDetail(this.intMerCode)
  },
  methods: {
    fetchDetail(intMerCode) {
      fetchDetail(intMerCode).then(response => {
        this.common = response.common
        debugger
        this.createAt = response.createAt
      })
      console.log(this.merchant)
    }
  }
}

</script>

<style scoped>

</style>
