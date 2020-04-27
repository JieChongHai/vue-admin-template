<template>
  <div class="app-container">
    <el-row>
      <el-button class="right" type="warning" @click="uP">修改密码</el-button>
    </el-row>
    <el-row>
      <el-col>
        <el-card shadow="never">
          <div slot="header" class="clearfix">
            <span>用户基础详情</span>
          </div>
          <el-row>
            <el-col :span="6">
              <el-image style="width: 100%" :src="userImg" alt="用户" />
              <div>
                <span>用户状态:</span>
                <h6>{{ user.status }}</h6>
              </div>
            </el-col>
            <el-col :span="18">
              <el-row>
                <el-row type="flex">
                  <el-col :span="8">
                    <el-card shadow="hover">
                      <label>商户号:</label>
                      <h6>{{ user.intMerCode || "-"}}</h6>
                    </el-card>
                  </el-col>
                  <el-col :span="8">
                    <el-card shadow="hover">
                      <label>门店号:</label>
                      <h6>{{ user.intStoreCode || "-" }}</h6>
                    </el-card>
                  </el-col>
                  <el-col :span="8">
                    <el-card shadow="hover">
                      <label>用户名:</label>
                      <h6>{{ user.username }}</h6>
                    </el-card>
                  </el-col>
                </el-row>
                <el-row type="flex">
                  <el-col :span="8">
                    <el-card shadow="hover">
                      <label>用户邮箱:</label>
                      <h6>{{ user.email }}</h6>
                    </el-card>
                  </el-col>
                </el-row>
                <el-row type="flex">
                  <el-col :span="8">
                    <el-card shadow="hover">
                      <label>审核权限:</label>
                      <h6 v-for="item in auditConfig.steps" :key="item.stepID">{{ item.stepName }}</h6>
                    </el-card>
                  </el-col>
                </el-row>
              </el-row>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-select v-model="permissions" multiple placeholder="请选择审核权限" focus="fetchMerchantDetail">
        <el-option
          v-for="item in common.steps"
          :key="item.stepID"
          :label="item.stepName"
          :value="item.stepID">
        </el-option>
      </el-select>
      <el-button type="primary" @click="updatePermission">修改审核权限</el-button>
    </el-row>
  </div>
</template>

<script>
import userImg from '@/assets/user/user.png'
import { detail, update } from '@/api/user'
import { fetchDetail } from '@/api/merchant'
import store from '@/store'

export default {
  data() {
    return {
      passwordUrl: '',
      userImg: userImg,
      save: undefined, // 保存完整的user数据
      user: {
        username: '',
        email: '',
        intMerCode: '',
        intStoreCode: '',
        updateTime: '',
        lockTime: '',
        auditPermissions: [],
        auditConfigs: [],
        status: ''
      },
      auditConfig: {
        auditType: '',
        level: '',
        steps: []
      },
      step: {
        stepID: undefined,
        stepName: ''
      },
      common: {
        auditConfigs: [],
        steps: []
      },
      permissions: []
    }
  },
  created() {
    this.username = this.$route.params.username || store.getters.name
    this.passwordUrl = '/user/password' + this.username
    this.fetchDetail(this.username)
  },
  methods: {
    fetchDetail(username) {
      detail(username).then(res => {
        this.user = res
        this.save = res
        if (this.user.auditConfigs) { // 因为暂时只有一个类型,暂处理
          this.auditConfig.auditType = this.user.auditConfigs[0].auditType
          this.auditConfig.level = this.user.auditConfigs[0].level
          this.auditConfig.steps = this.user.auditConfigs[0].steps
        }
        fetchDetail(this.user.intMerCode)
          .then(response => {
            const { common } = response
            this.common = common
            if (this.common.auditConfigs) {
              this.common.steps = this.common.auditConfigs[0].steps
            }
          })
      })
    },
    fetchMerchantDetail(intMerCode) {
      fetchDetail(intMerCode)
        .then(response => {
          const { common } = response
          this.common = common
          if (this.common.auditConfigs) {
            this.common.steps = this.common.auditConfigs[0].steps
          }
        })
    },
    updatePermission() {
      this.save.auditPermissions = this.permissions.map(Number)
      this.save.password = '123456' // 后端接口必填
      this.save.roleId = 3 // 重置角色
      update(this.user.username, this.save).then(res => {
        this.$message({
          message: '恭喜你，这是一条成功消息',
          type: 'success'
        })
      }).catch(err => {
        this.$message.error(err)
      })
      this.fetchDetail(this.user.username)
    },
    uP() {
      this.$router.push({ path: '/user/password/' + this.username })
    }
  }
}
</script>

<style scoped>
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.right {
  float:right;
}
</style>
