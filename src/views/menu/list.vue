<template>
  <div class="app-container">
    <h4>菜单列表</h4>
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
      <el-table-column label="菜单ID" align="center">
        <template slot-scope="{row}">
          <span>{{ row.menuId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="菜单名称" align="center">
        <template slot-scope="{row}">
          <span>{{ row.menuName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="菜单描述" align="center">
        <template slot-scope="{row}">
          <span>{{ row.menuDesc }}</span>
        </template>
      </el-table-column>
      <el-table-column label="菜单状态值" align="center">
        <template slot-scope="{row}">
          <span>{{ row.menuStatus }}</span>
        </template>
      </el-table-column>
      <el-table-column label="菜单 uri" align="center">
        <template slot-scope="{row}">
          <span>{{ row.menuUri }}</span>
        </template>
      </el-table-column>
      <el-table-column label="权限点" align="center">
        <template slot-scope="{row}">
          <span>{{ row.menuState }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding">
        <template slot-scope="{row,$index}">
          <el-button size="mini" type="success" @click="handleDetail(row,$index)">
            详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { fetchList } from '@/api/menu'
import { parseStringToTime } from '@/utils'

export default {
  name: 'Menus',
  filters: {
    parseStringToTime
  },
  data() {
    return {
      tableKey: 0,
      listLoading: true,
      list: [],
      listQuery: {
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
        this.list = response
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
      this.$notify({
        title: '成功',
        message: '你以为呢?',
        type: 'success',
        duration: 2000
      })
    },
    handleFilter() {
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
