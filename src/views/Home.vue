<template>
  <div class="home">
    <!-- 树形表格组件 -->
    <el-table
      :data="tableData"
      style="width: 100%; margin-bottom: 20px"
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
    <!-- 分页控件 -->
    <el-pagination
      class="Home__pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-sizes="pageSizes"
      :page-size.sync="pageSize"
      layout="sizes, prev, pager, next,total,jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getAllTask } from "@/api/system.js";

export default {
  name: "Home",
  data() {
    return {
      tableData: [], //树形总数据
      totalData: [], //树形部分数据
      total: 0, //数据条目总数
      pageSize: 10, //分页size
      pageSizes: [10, 15, 20], //分页size可选项
      currentPage: 1, //当前页
    };
  },
  // 生命周期钩子
  mounted() {
    // 调用函数
    this._getTreeListData();
  },
  methods: {
    // 获取初始树形结构数据
    _getTreeListData() {
      // 调用接口 getAllTask
      getAllTask.then((res) => {
        // 状态码200，请求成功
        if (res.status === 200) {
          // 处理返回数据
          for (key in res.data) {
            this.totalData = this.totalData.concat(res.data[key]);
          }
          this.total = this.totalData.length;
          this.tableData = this.separateData(
            this.pageSize,
            this.currentPage,
            this.totalData
          );
        }
      });
    },
    // 触发事件监听函数
    _sendMessage(item) {
      console.log(item);
    },
    // 分页--size变化监听函数
    handleSizeChange(val) {
      // console.log(val, this.pageSize, this.currentPage);
      this.tableData = this.separateData(
        this.pageSize,
        this.currentPage,
        this.totalData
      );
    },
    // 分页--当前页变化监听函数
    handleCurrentChange(val) {
      this.tableData = this.separateData(
        this.pageSize,
        this.currentPage,
        this.totalData
      );
    },
    // 前端分页，返回部分数据
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
/* .Home__pagination {
  position: absolute;
  bottom: 20px;
  right: 30px;
} */
/* .el-table__header {
  background-color: #f5f7fa;
} */
</style>
