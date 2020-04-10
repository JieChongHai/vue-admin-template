<template>
  <div class="app-container">
    <div class="filter-container">
      <el-date-picker v-model="valueDate" type="daterange" range-separator="~" start-placeholder="开始日期" end-placeholder="结束日期" />
      <el-input v-model="listQuery.intMerCode" placeholder="商户号" prefix-icon="el-icon-search" style="width: 200px;" class="filter-item" clearable />
      <el-input v-model="listQuery.intStoreCode" placeholder="门店号" prefix-icon="el-icon-search" style="width: 200px;" class="filter-item" clearable />
      <el-input v-model="listQuery.username" placeholder="用户名" prefix-icon="el-icon-search" style="width: 200px;" class="filter-item" clearable />
      <el-select v-model="listQuery.userType" placeholder="用户角色">
        <el-option label="管理员" value="genAdmin" />
        <el-option label="商户用户" value="merchant" />
        <el-option label="门店用户" value="store" />
      </el-select>
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
      <el-table-column label="商户号" align="center">
        <template slot-scope="{row}">
          <span>{{ row.intMerCode }}</span>
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
          <el-button size="mini" type="danger" @click="handleDelete(row,$index)">
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
import { fetchList, remove, detail } from '@/api/user'
import Pagination from '@/components/Pagination'
import { parseStringToTime } from '@/utils'

export default {
  name: 'Merchants',
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
        username: undefined,
        intMerCode: undefined,
        intStoreCode: undefined,
        startTime: undefined,
        endTime: undefined,
        userType: undefined,
        status: undefined
      },
      user: undefined
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
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
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
      detail(row.username).then(res => {
        this.user = res
      })
    },
    handleEdit(row, index) {
      this.$notify({
        title: '成功',
        message: '???',
        type: 'success',
        duration: 2000
      })
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
