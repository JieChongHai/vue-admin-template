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
            <div>
              <span>创建时间:</span>
              <h6>{{ auditJob.createTime }}</h6>
            </div>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover">
              <label>任务编号:</label>
              <h6>{{ auditJob.jobID }}</h6>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover">
              <label>审核类型:</label>
              <h6>{{ auditJob.auditType }}</h6>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover">
              <label>当前审核步骤:</label>
              <h6>{{ auditJob.auditStepName }}</h6>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover">
              <label>门店所属商户号:</label>
              <h6>{{ auditJob.intMerCode }}</h6>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover">
              <label>审核创建人:</label>
              <h6>{{ auditJob.creator }}</h6>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover">
              <label>当前审核人员:</label>
              <h6>{{ auditJob.lastOperator }}</h6>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover">
              <label>审核状态:</label>
              <h6>{{ auditJob.status }}</h6>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover">
              <label>已审核人员:</label>
              <div v-for="(item, index) in auditJob.preOperators" :key="index">
                <h6>{{ item }}</h6>
              </div>
            </el-card>
          </el-col>
          <el-col :span="16">
            <el-card shadow="hover">
              <label>当前可审核人员:</label>
              <div v-for="(item, index) in auditJob.currentOperators" :key="index">
                <h6>{{ item }}</h6>
              </div>
            </el-card>
          </el-col>
        </el-col>
      </el-card>
    </el-row>
    <el-divider />
    <el-row>
      <el-card>
        <div slot="header" class="clearfix">
          <span>审核门店详情</span>
        </div>
      </el-card>
      <el-col>
        <el-col :span="8">
          <el-card shadow="hover">
            <label>操作类型:</label>
            <h6>{{ auditJob.data.operation }}</h6>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover">
            <label>门店号:</label>
            <h6>{{ auditJob.data.store.common.intStoreCode }}</h6>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover">
            <label>外部门店号:</label>
            <h6>{{ auditJob.data.store.common.storeNum }}</h6>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover">
            <label>门店交易币种:</label>
            <h6>{{ auditJob.data.store.common.currency }}</h6>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover">
            <label>门店联系人:</label>
            <h6>{{ auditJob.data.store.common.contact.name }}</h6>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover">
            <label>联系电话:</label>
            <h6>{{ auditJob.data.store.common.contact.phoneNumber }}</h6>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover">
            <label>联系邮箱:</label>
            <h6>{{ auditJob.data.store.common.contact.email }}</h6>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover">
            <label>门店地址:</label>
            <h6>{{ auditJob.data.store.common.contact.address }}</h6>
          </el-card>
        </el-col>
        <el-col :span="16">
          <el-card shadow="hover">
            <label>备注信息:</label>
            <h6>{{ auditJob.data.store.common.remark }}</h6>
          </el-card>
        </el-col>
      </el-col>
    </el-row>
    <el-divider />
    <el-row>
      <el-card>
        <div slot="header" class="clearfix">
          <span>审核用户详情</span>
        </div>
        <el-col>
          <div v-for="(item, index) in auditJob.data.users" :key="index">
            <el-col :span="8">
              <el-card shadow="hover">
                <label>用户名:</label>
                <h6>{{ item.username }}</h6>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover">
                <label>用户邮箱:</label>
                <h6>{{ item.email }}</h6>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover">
                <label>用户类型:</label>
                <h6>{{ item.userType }}</h6>
              </el-card>
            </el-col>
          </div>
        </el-col>
      </el-card>
    </el-row>
    <el-divider />
    <div v-if="auditJob.status==='auditing'" class="app-container">
      <el-input v-if="isCheck" v-model="reason" type="textarea" autosize placeholder="填上原因" show-word-limit maxlength="30" class="bdg" />
      <el-button v-if="isCheck" size="mini" type="success" @click="handleResolve(auditJob.jobID, reason)">
        通过
      </el-button>
      <el-button v-if="isCheck" size="mini" type="danger" @click="handleReject(auditJob.jobID, reason)">
        拒绝
      </el-button>
    </div>
  </div>
</template>

<script>
import auditImg from '@/assets/audit/audit.png'
import { fetchJobDetail, resolve, reject } from '@/api/audit'
import store from '@/store'

export default {
  name: 'AuditJobDetail',
  data() {
    return {
      auditImg: auditImg,
      auditJob: {
        jobID: '',
        auditType: '',
        intMerCode: '',
        remark: '',
        creator: '',
        lastOperator: '',
        createTime: undefined,
        updateTime: undefined,
        operation: '',
        auditStepName: '',
        currentOperators: [], // 当前可操作的用户
        data: {
          operation: '',
          store: {
            common: {
              intStoreCode: '',
              storeNum: '',
              contact: {
                name: '',
                phoneNumber: '',
                email: '',
                address: ''
              },
              currency: '',
              remark: ''
            }
          },
          users: [
            {
              username: '',
              email: '',
              userType: '',
              status: ''
            }
          ]
        },
        preOperators: [],
        status: ''
      },
      reason: '',
      allowOperation: false
    }
  },
  computed: {
    isCheck() {
      return this.currentOperators && this.currentOperators.includes(store.getters.name)
    }
  },
  created() {
    const jobID = this.$route.params && this.$route.params.id
    this.fetchData(jobID)
  },
  methods: {
    fetchData(jobID) {
      fetchJobDetail(jobID).then(res => {
        this.auditJob = res
      }).catch(err => {
        console.log(err)
      })
    },
    handleResolve(jobID, reason) {
      console.log(jobID, reason)
      const tplProcess = {
        jobID: jobID,
        reason: reason
      }
      resolve(tplProcess)
    },
    handleReject(jobID, reason) {
      const tplProcess = {
        jobID: jobID,
        reason: reason
      }
      reject(tplProcess)
    }
  }
}
</script>

<style scoped>
  .ecal {
    height: 100%;
    width: 100%;
    background-color: #f2f5f6;
    box-shadow: 0 0 6px rgba(0,0,0, .12);
    text-align: center;
    line-height: 40px;
    color: #1989fa;
  }
  .bdg {
    width: 50%;
    height: 100%;
  }
</style>
