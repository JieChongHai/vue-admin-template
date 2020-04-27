<template>
  <div class="app-container">
    <el-row>
      <el-col :span="6">
        <el-image style="width: 100%" :src="storeImg" alt="门店的详情" />
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover">
          <label>商户号:</label>
          <h6>{{ store.common.intMerCode }}</h6>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover">
          <label>商户名:</label>
          <h6>{{ store.common.merName }}</h6>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover">
          <label>门店号:</label>
          <h6>{{ store.common.intStoreCode }}</h6>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover">
          <label>外部门店号:</label>
          <h6>{{ store.common.storeNum }}</h6>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover">
          <label>门店名:</label>
          <h6>{{ store.common.storeName }}</h6>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover">
          <label>币种:</label>
          <h6>{{ store.common.currency }}</h6>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover">
          <label>经营用户:</label>
          <h6>{{ store.common.contact.name || "-" }}</h6>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover">
          <label>联系方式:</label>
          <h6>{{ store.common.contact.phoneNumber || "-" }}</h6>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover">
          <label>联系邮箱:</label>
          <h6>{{ store.common.contact.email || "-" }}</h6>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-card shadow="hover">
          <label>门店状态:</label>
          <h6>{{ store.common.status || "-" }}</h6>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover">
          <label>门店备注:</label>
          <h6>{{ store.common.remark || "-" }}</h6>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import storeImg from '@/assets/store/store.png'
import store from '@/store'
import { fetchDetail } from '@/api/store'
import { parseStringToTime } from '@/utils'

export default {
  filters: {
    parseStringToTime
  },
  data() {
    return {
      storeImg: storeImg,
      store: {
        common: {
          intMerCode: '',
          merName: '',
          intStoreCode: '',
          storeNum: '',
          storeName: '',
          currency: '',
          contact: {
            name: '',
            phoneNumber: '',
            email: ''
          },
          status: '',
          remark: ''
        }
      },
      intStoreCode: ''
    }
  },
  created() {
    this.intStoreCode = this.$route.params.intStoreCode || store.getters.intStoreCode
    this.Detail()
  },
  methods: {
    Detail() {
      fetchDetail(this.intStoreCode).then(res => {
        this.store = res
      })
    }
  }
}
</script>

<style scoped>

</style>
