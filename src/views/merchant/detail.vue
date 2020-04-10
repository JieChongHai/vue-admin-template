<template>
  <div class="app-container">
    <el-row>
      <el-col>
        <el-card shadow="never">
          <div slot="header" class="clearfix">
            <span>商户基础详情</span>
          </div>
          <el-row>
            <el-col :span="6">
              <el-image style="width: 100%" :src="merchantImg" alt="商家的详情" />
            </el-col>
            <el-col :span="18">
              <el-row>
                <el-row type="flex">
                  <el-col :span="8">
                    <el-card shadow="hover">
                      <label>商户号:</label>
                      <h6>{{ intMerCode }}</h6>
                    </el-card>
                  </el-col>
                  <el-col :span="8">
                    <el-card shadow="hover">
                      <label>商户名:</label>
                      <h6>{{ common.merName }}</h6>
                    </el-card>
                  </el-col>
                  <el-col :span="8">
                    <el-card shadow="hover">
                      <label>业务区域:</label>
                      <h6>{{ common.businessArea }}</h6>
                    </el-card>
                  </el-col>
                </el-row>
                <el-row type="flex">
                  <el-col :span="8">
                    <el-card shadow="hover">
                      <label>交易币种:</label>
                      <h6>{{ common.currency }}</h6>
                    </el-card>
                  </el-col>
                  <el-col :span="8">
                    <el-card shadow="hover">
                      <label>经营用户:</label>
                      <h6>{{ common.contact.name || "-"  }}</h6>
                    </el-card>
                  </el-col>
                </el-row>
              </el-row>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import merchantImg from "@/assets/merchant/merchant.png";
import store from "@/store";
import { fetchDetail } from "@/api/merchant";

export default {
  name: "Merchant",
  data() {
    return {
      merchantImg: merchantImg,
      intMerCode: null,
      common: {
        intMerCode: "",
        merName: "",
        businessArea: "",
        currency: "",
        contact: {
          name: "",
          phoneNumber: "",
          email: ""
        },
        status: "",
        auditConfigs: []
      },
      createAt: undefined,
      dialogVisible: false
    };
  },
  created() {
    console.log(this.$route);
    this.intMerCode = this.$route.params.intMerCode || store.getters.intMerCode;
    this.getDetail(this.intMerCode);
  },
  methods: {
    getDetail(intMerCode) {
      this.listLoading = true;
      fetchDetail(intMerCode)
        .then(response => {
          console.log(response);
          const { common, createAt } = response;
          this.common = common;
          this.createAt = createAt;
        })
        .finally(() => (this.listLoading = false));
    }
  }
};
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
</style>
