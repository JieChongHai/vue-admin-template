<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row>
        <el-col :span="8">
        <el-date-picker v-model="valueDate" type="daterange" range-separator="~" start-placeholder="开始日期" end-placeholder="结束日期" />

        </el-col>
        <el-col :span="5">
          <el-input v-model="listQuery.roleName" placeholder="角色名称" prefix-icon="el-icon-search" style="width: 200px;" class="filter-item" clearable />
        </el-col>
        <el-col :span="11">
                <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        Search
      </el-button>
        </el-col>
      </el-row>

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
          <span>{{ row.intMerCodes }}</span>
        </template>
      </el-table-column>
      <el-table-column label="角色名称" align="center">
        <template slot-scope="{row}">
          <span>{{ row.roleName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建者名称" align="center">
        <template slot-scope="{row}">
          <span>{{ row.creatorName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="角色号" align="center">
        <template slot-scope="{row}">
          <span>{{ row.roleId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="{row}">
          <span>{{ row.status }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="{row}">
          <span>{{ row.createTime | parseStringToTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" align="center">
        <template slot-scope="{row}">
          <span>{{ row.updateTime | parseStringToTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding" fixed="right" width="280">
        <template slot-scope="{row,$index}">   
          <el-button v-if="row.status==='normal'" size="mini" type="success" @click="handleDetail(row,$index)">
            详情
          </el-button>
          <el-button v-if="row.status==='normal'" size="mini" type="primary" @click="handleEdit(row,$index)">
            编辑
          </el-button>
          <el-button v-if="row.status==='normal'" slot="reference" size="mini" type="danger" @click="isConfirm=true">删 除</el-button>
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
  </div>
</template>

<script>
import { fetchList } from '@/api/role'
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
        startTime: undefined,
        endTime: undefined,
        status: undefined
      },
      isConfirm: false
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
      this.$router.push({ path: `/stores/detail/${row.common.intStoreCode}` })
    },
    handleEdit(row, $index) {
      this.$router.push({ path: '/stores/update', params: { intStoreCode: row.common.intStoreCode }})
    },
    handleDelete(row, index) {
      remove(row.common.intStoreCode).then(res => {
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
