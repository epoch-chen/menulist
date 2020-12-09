<template>
  <div class="home">
    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      default-expand-all
      stripe
      max-height="480"
      header-cell-class-name="headerClass"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="name" label="菜单名称" width="800">
      </el-table-column>
      <el-table-column prop="type" label="类型"> </el-table-column>
      <el-table-column prop="flag" label="操作" width="100">
        <template slot-scope="scopeData">
          <el-button
            type="primary"
            size="small"
            v-if="scopeData.row.flag"
            @click="_sendMessage(scopeData.row)"
            >触发</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="Home__pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-sizes="pageSizes"
      :page-size.sync="pageSize"
      layout="sizes, prev, pager, next"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  data() {
    return {
      tableData: [],
      totalData: [
        {
          id: 1,
          type: 'JOB',
          name: '数据中心产品信息',
          flag: 1,
          children: [
            {
              id: 11,
              type: 'JOB',
              name: '数据中心产品信息',
              flag: 1,
            },
            {
              id: 12,
              type: 'JOB',
              name: '数据中心产品信息',
              flag: 1,
            },
          ],
        },
        {
          id: 2,
          type: 'JOB',
          name: '绩效报表数据',
          flag: 0,
        },
        {
          id: 3,
          type: 'JOB',
          name: '数据中心产品信息',
          flag: 1,
          children: [
            {
              id: 31,
              type: 'JOB',
              name: '数据中心产品信息',
              flag: 1,
            },
            {
              id: 32,
              type: 'JOB',
              name: '数据中心产品信息',
              flag: 1,
            },
          ],
        },
      ],
      total: 3,
      pageSize: 10,
      pageSizes: [10, 15, 20],
      currentPage: 1,
    };
  },
  created() {
    this._getTreeListData();
    this.tableData = this.separateData(
      this.pageSize,
      this.currentPage,
      this.totalData
    );
  },
  methods: {
    _getTreeListData() {
      this.$http.get('/api/v1/keyTask/getAllTask').then((res) => {
        this.totalData = res.standard;
        this.total = res.standard.length;
        this.tableData = this.separateData(
          this.pageSize,
          this.currentPage,
          this.totalData
        );
      });
    },
    _sendMessage(item) {
      console.log(item);
    },
    handleSizeChange(val) {
      // console.log(val, this.pageSize, this.currentPage);
      this.tableData = this.separateData(
        this.pageSize,
        this.currentPage,
        this.totalData
      );
    },
    handleCurrentChange(val) {
      this.tableData = this.separateData(
        this.pageSize,
        this.currentPage,
        this.totalData
      );
    },
    separateData(size, page, data) {
      return data.slice((page - 1) * size, page * size);
    },
  },
};
</script>
<style>
.home {
  padding: 30px;
}
.Home__pagination {
  position: absolute;
  bottom: 20px;
  right: 30px;
  /* height: 20px; */
}
.el-table__header {
  background-color: #f5f7fa;
}
</style>
