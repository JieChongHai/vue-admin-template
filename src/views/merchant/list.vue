<template>
  <div class="app-container">
    <div class="filter-container">
      <el-date-picker v-model="valueDate" type="daterange" range-separator="~" start-placeholder="开始日期" end-placeholder="结束日期" />
      <el-input v-model="listQuery.intMerCode" placeholder="商户号" prefix-icon="el-icon-search" style="width: 200px;" class="filter-item" clearable />
      <el-input v-model="listQuery.merName" placeholder="商户名称" prefix-icon="el-icon-search" style="width: 200px;" class="filter-item" clearable />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        Search
      </el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="data"
      stripe
      fit
      highlight-current-row
      :row-class-name="tableRowClassName"
      style="width: 100%"
    >
      <el-table-column label="商户号" prop="common.intMerCode" align="center" width="150">
        <template slot-scope="{row}">
          <span>{{ row.common.intMerCode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商户名称" prop="common.merName" align="center" width="200">
        <template slot-scope="{row}">
          <span>{{ row.common.merName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="业务区域" prop="common.businessArea" align="center" width="150">
        <template slot-scope="{row}">
          <span>{{ row.common.businessArea }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="common.status" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.common.status }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="createdAt" align="center" width="300">
        <template slot-scope="{row}">
          <span>{{ row.createdAt }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Actions" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button v-if="row.common.status==='normal'" size="mini" type="danger" @click="handleDelete(row,$index)">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :page-size.sync="count" @pagination="getList" />
  </div>
</template>

<script>
import { fetchList, remove } from '@/api/merchant'
import Pagination from '@/components/Pagination'
import waves from '@/directive/waves'

export default {
  name: 'Merchants',
  components: { Pagination },
  directive: { waves },
  data() {
    return {
      listLoading: true,
      data: [],
      page: 1,
      total: 0,
      count: 0,
      size: 10,
      listQuery: {
        page: 1,
        size: 10,
        intMerCode: undefined,
        merName: undefined,
        startTime: undefined,
        endTime: undefined,
        status: undefined
      },
      valueDate: undefined
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.data = response.data
        this.total = response.total
        this.size = response.size
        this.page = response.page
        this.count = response.count
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return 'blue-row'
      }
      return 'yellow-row'
    },
    handleDelete(row, index) {
      this.$notify({
        title: 'Success',
        message: 'Delete Successfully',
        type: 'success',
        duration: 2000
      })
      this.list.splice(index, 1)
      remove(row.common.intMerCode)
    },
    handleFilter() {
      this.listQuery.page = 1
      if (this.valueDate.length) {
        let m, d
        m = this.valueDate[0].getMonth() < 10 ? '0' + (this.valueDate[0].getMonth() + 1) : this.valueDate[0].getMonth() + 1
        d = this.valueDate[0].getDate() < 10 ? '0' + this.valueDate[0].getDate() : this.valueDate[0].getDate
        this.listQuery.startTime = this.valueDate[0].getFullYear() + '-' + m + '-' + d + 'T00:00:00-08:00'
        m = this.valueDate[1].getMonth() < 10 ? '0' + (this.valueDate[1].getMonth() + 1) : this.valueDate[1].getMonth() + 1
        d = this.valueDate[1].getDate() < 10 ? '0' + this.valueDate[1].getDate() : this.valueDate[1].getDate
        this.listQuery.endTime = this.valueDate[0].getFullYear() + '-' + m + '-' + d + 'T00:00:00-08:00'
        console.log(this.valueDate[0].toString())
      }
      this.getList()
    }
  }
}
</script>

<style scoped>
  .el-table .blue-row {
    background: #fda0e0;
  }

  .el-table .yellow-row {
    background: #8a6ef9;
  }
</style>
