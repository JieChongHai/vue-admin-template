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
              <div>
                <span>创建时间:</span>
                <h6>{{ createdAt }}</h6>
              </div>
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
                      <h6>{{ common.contact.name || "-" }}</h6>
                    </el-card>
                  </el-col>
                  <el-col :span="8">
                    <el-card shadow="hover">
                      <label>联系方式:</label>
                      <h6>{{ common.contact.phoneNumber || "-" }}</h6>
                    </el-card>
                  </el-col>
                  <el-col :span="8">
                    <el-card shadow="hover">
                      <label>联系邮箱:</label>
                      <h6>{{ common.contact.email || "-" }}</h6>
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
      <el-col>
        <h5>已开通的审核类型</h5>
        <el-collapse accordion>
          <el-collapse-item>
            <template slot="title">
              门店<i class="head-icon el-icon-info" />
            </template>
            <el-select v-model="level" :disabled="true">
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
          </el-collapse-item>
        </el-collapse>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-card shadow="hover">
          <el-button type="primary" @click="handlerReport">导出门店报表</el-button>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <!-- 表格 -->
      <el-table
        :key="tableKey"
        v-loading="listLoading"
        :data="list"
        border
        fit
        highlight-current-row
        style="width: 100%;"
      >
        <el-table-column label="用户名" align="center">
          <template slot-scope="{row}">
            <span>{{ row.username }}</span>
          </template>
        </el-table-column>
        <el-table-column label="邮箱" align="center">
          <template slot-scope="{row}">
            <span>{{ row.email }}</span>
          </template>
        </el-table-column>
        <el-table-column label="门店号" align="center">
          <template slot-scope="{row}">
            <span>{{ row.intStoreCode }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" align="center">
          <template slot-scope="{row}">
            <span>{{ row.createTime | parseStringToTime('{y}-{m}-{d} {h}:{i}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" class-name="small-padding">
          <template slot-scope="{row,$index}">
            <el-button size="mini" type="success" @click="handleDetail(row,$index)">
              详情
            </el-button>
            <el-button size="mini" type="primary" @click="handleEdit(row,$index)">
              编辑
            </el-button>
            <el-button slot="reference" size="mini" type="danger" @click="isConfirm=true">删 除</el-button>
            <el-dialog :visible.sync="isConfirm" title="确认删除商户？" width="30%" center>
              <span slot="footer" class="dialog-footer">
                <el-button @click="isConfirm = false">取 消</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(row,$index)">
                  删 除
                </el-button>
              </span>
            </el-dialog>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.size"
        :page-sizes="[2, 5, 10]"
        @pagination="getList" />
    </el-row>
  </div>
</template>

<script>
import merchantImg from '@/assets/merchant/merchant.png'
import store from '@/store'
import { fetchDetail, report } from '@/api/merchant'
import { fetchList, remove } from '@/api/user'
import Pagination from '@/components/Pagination'
import { parseStringToTime } from '@/utils'

export default {
  name: 'Merchant',
  components: { Pagination },
  filters: {
    parseStringToTime
  },
  data() {
    return {
      merchantImg: merchantImg,
      intMerCode: null,
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
      auditType: 'store',
      level: '',
      createdAt: undefined,
      dialogVisible: false,
      tableKey: 0,
      listLoading: true,
      list: null,
      total: 0,
      valueDate: undefined,
      listQuery: {
        page: 1,
        size: 2,
        intMerCode: undefined
      },
      isConfirm: false
    }
  },
  created() {
    console.log(this.$route)
    this.intMerCode = this.$route.params.intMerCode || store.getters.intMerCode
    this.getDetail(this.intMerCode)
    if (this.intMerCode) {
      this.listQuery.intMerCode = this.intMerCode
    }
    this.getList()
  },
  methods: {
    getDetail(intMerCode) {
      this.listLoading = true
      fetchDetail(intMerCode)
        .then(response => {
          console.log(response)
          const { common, createdAt } = response
          this.common = common
          this.createdAt = createdAt
          if (common.auditConfigs) {
            this.level = common.auditConfigs[0].level + ''
          }
        })
        .finally(() => (this.listLoading = false))
    },
    handlerReport() {
      const query = {
        intMerCode: this.intMerCode
      }
      report(query).then(res => {
        const content = res
        const blob = new Blob([content])
        const fileName = this.intMerCode + '导出门店信息.xlsx'
        if ('download' in document.createElement('a')) { // 非IE下载
          const elink = document.createElement('a')
          elink.download = fileName
          elink.style.display = 'none'
          elink.href = URL.createObjectURL(blob)
          document.body.appendChild(elink)
          elink.click()
          URL.revokeObjectURL(elink.href) // 释放URL 对象
          document.body.removeChild(elink)
        } else { // IE10+下载
          navigator.msSaveBlob(blob, fileName)
        }
      })
      this.$message({
        message: '正在下载门店报表',
        type: 'success'
      })
    },
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        const { data, total } = response
        this.list = data
        this.total = total
        setTimeout(() => { this.listLoading = false })
      })
    },
    handleDelete(row, index) {
      remove(row.username).then(res => {
        this.$notify({
          title: '成功',
          message: '删除门店成功',
          type: 'success',
          duration: 2000
        })
        this.getList()
      })
    },
    handleDetail(row, index) {
      this.$router.push({ path: `/merchant/user/${row.username}` })
    },
    handleEdit(row, index) {
      this.$notify({
        title: '成功',
        message: '待开发',
        type: 'success',
        duration: 2000
      })
    }
  }
}
</script>

<style scoped>
.text {
  font-size: 14px;
}
.item {
  margin-bottom: 18px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}
.el-icon-arrow-down {
  font-size: 12px;
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
