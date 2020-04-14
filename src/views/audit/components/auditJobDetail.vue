<template>
  <div class="filter-container">
    <el-row>
      <el-card>
        <div slot="header" class="clearfix">
          <span>审核基础详情</span>
        </div>
        <el-col>
          <el-col :span="6">
            <el-image style="width: 100%" :src="auditImg" alt="商家的详情" />
          </el-col>
        </el-col>
      </el-card>
    </el-row>
    <el-row>
      <el-card>
        <div slot="header" class="clearfix">
          <span>审核门店详情</span>
        </div>
      </el-card>
    </el-row>
    <el-row>
      <el-card>
        <div slot="header" class="clearfix">
          <span>审核用户详情</span>
        </div>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import auditImg from '@/assets/audit/audit.png'
export default {
  name: 'AuditJobDetail',
  data() {
    return {
      auditImg: auditImg,
      auditJob: undefined
    }
  }
}
</script>

<style scoped>

</style>
