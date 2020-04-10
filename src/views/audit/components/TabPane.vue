<template>
  <div class="filter-container">
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
      <el-table-column label="任务编号" align="center">
        <template slot-scope="{row}">
          <span>{{ row.jobID }}</span>
        </template>
      </el-table-column>
      <el-table-column label="审核类型" align="center">
        <template slot-scope="{row}">
          <span>{{ row.auditType }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属商户" align="center">
        <template slot-scope="{row}">
          <span>{{ row.intMerCode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="上个审核者" align="center">
        <template slot-scope="{row}">
          <span>{{ row.lastOperator }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作类型" align="center">
        <template slot-scope="{row}">
          <span>{{ row.operation }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="{row}">
          <span>{{ row.createTime | parseStringToTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="详情" align="center" class-name="small-padding">
        <template slot-scope="{row,$index}">
          <el-button size="mini" type="success" @click="handleDetail(row,$index)">
            查看
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding">
        <template slot-scope="{row,$index}">
          <el-button v-if="row.status==='auditing'" size="mini" type="primary" @click="handleResolve(row,$index)">
            通过
          </el-button>
          <el-button v-if="row.status==='auditing'" size="mini" type="danger" @click="handleReject(row,$index)">
            拒绝
          </el-button>
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
  </div>
</template>

<script>
import { fetchJobs, fetchJobDetail, resolve, reject } from '@/api/audit'
import Pagination from '@/components/Pagination'
import { parseStringToTime } from '@/utils'

export default {
  components: { Pagination },
  filters: {
    parseStringToTime
  },
  props: {
    type: {
      type: String,
      default: 'all'
    }
  },
  data() {
    return {
      list: null,
      category: this.type,
      tableKey: 0,
      listLoading: true,
      total: 0,
      valueDate: undefined,
      listQuery: {
        page: 1,
        size: 5,
        intMerCode: undefined,
        jobID: undefined,
        startTime: undefined,
        endTime: undefined,
        status: undefined
      },
      detail: undefined,
      tplProcess: {
        jobID: '',
        reason: ''
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.loading = true
      this.$emit('create') // for test
      fetchJobs(this.category, this.listQuery).then(response => {
        const { data, total } = response
        this.list = data
        this.total = total
        setTimeout(() => { this.listLoading = false })
      })
    },
    handleDetail(row, index) {
      fetchJobDetail(row.jobID).then(response => {
        this.detail = response
      })
      // todo
    },
    handleResolve(row, index) {
      this.tplProcess.jobID = row.jobID
      this.tplProcess.reason = '通过'
      resolve(this.tplProcess)
    },
    handleReject(row, index) {
      this.tplProcess.jobID = row.jobID
      this.tplProcess.reason = '拒绝'
      reject(this.tplProcess)
    }
  }
}
</script>

