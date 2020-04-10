<template>
  <div class="app-container">
    <div class="filter-container">
      <el-date-picker v-model="valueDate" type="daterange" range-separator="~" start-placeholder="开始日期" end-placeholder="结束日期" />
      <el-input v-model="listQuery.intMerCode" placeholder="商户号" prefix-icon="el-icon-search" style="width: 200px;" class="filter-item" clearable />
      <el-input v-model="listQuery.intStoreCode" placeholder="门店号" prefix-icon="el-icon-search" style="width: 200px;" class="filter-item" clearable />
      <el-input v-model="listQuery.currency" placeholder="币种" prefix-icon="el-icon-search" style="width: 200px;" class="filter-item" clearable />
      <el-input v-model="listQuery.storeName" placeholder="门店名称" prefix-icon="el-icon-search" style="width: 200px;" class="filter-item" clearable />
      <el-input v-model="listQuery.storeNum" placeholder="外部门店号" prefix-icon="el-icon-search" style="width: 200px;" class="filter-item" clearable />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        Search
      </el-button>
    </div>
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
      <el-table-column label="商户号" align="center">
        <template slot-scope="{row}">
          <span>{{ row.common.intMerCode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商户名称" align="center">
        <template slot-scope="{row}">
          <span>{{ row.common.merName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="门店号" align="center">
        <template slot-scope="{row}">
          <span>{{ row.common.intStoreCode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="门店名称" align="center">
        <template slot-scope="{row}">
          <span>{{ row.common.storeName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="{row}">
          <span>{{ row.createdAt | parseStringToTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding">
        <template slot-scope="{row,$index}">
          <el-button v-if="row.common.status==='normal'" size="mini" type="success" @click="handleDetail(row,$index)">
            详情
          </el-button>
          <el-button v-if="row.common.status==='normal'" size="mini" type="primary" @click="handleEdit(row,$index)">
            编辑
          </el-button>
          <el-button v-if="row.common.status==='normal'" size="mini" type="danger" @click="handleDelete(row,$index)">
            删除
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
import { fetchList, remove } from '@/api/store'
import Pagination from '@/components/Pagination'
import { parseStringToTime } from '@/utils'

export default {
  name: 'Stores',
  components: { Pagination },
  filters: {
    parseStringToTime
  },
  data() {
    return {
      tableKey: 0,
      listLoading: true,
      list: null,
      total: 0,
      valueDate: undefined,
      listQuery: {
        page: 1,
        size: 2,
        intMerCode: undefined,
        intStoreCode: undefined,
        storeNum: undefined,
        storeName: undefined,
        currency: undefined,
        startTime: undefined,
        endTime: undefined,
        status: undefined
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        const { data, total } = response
        this.list = data
        this.total = total
        setTimeout(() => { this.listLoading = false })
      })
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return 'blue-row'
      }
      return 'yellow-row'
    },
    handleDetail(row, index) {
      this.$router.push({ path: `/stores/detail/${row.common.intMerCode}` })
    },
    handleEdit(row, $index) {
      this.$router.push({ path: '/stores/update', params: { intMerCode: row.common.intMerCode }})
    },
    handleDelete(row, index) {
      remove(row.common.intMerCode).then(res => {
        this.$notify({
          title: '成功',
          message: '删除门店成功',
          type: 'success',
          duration: 2000
        })
        this.getList()
      })
    },
    handleFilter() {
      this.listQuery.page = 1
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
