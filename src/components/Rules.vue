<template>
    <div>
      <!-- 面包屑导航区 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>规则管理</el-breadcrumb-item>
        <el-breadcrumb-item>规则列表</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 卡片视图区域 -->
      <el-card>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-input v-model="input" placeholder="请输入内容">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </el-col>
          <el-col :span="4">
            <el-button type="primary">添加规则</el-button>
          </el-col>
        </el-row>

        <!-- 树形表格 -->
        <el-table :data="ruleList" border stripe>
          <el-table-column type="index" label="#"></el-table-column>
          <el-table-column prop="ruleName" label="规则名"></el-table-column>
          <el-table-column label="规则实体" width="1000px">
            <template v-slot:default="scope">
              <div v-text="scope.row.rules"></div>
            </template>
          </el-table-column>
          <el-table-column label="状态">
            <template v-slot:default="scope">
              <el-switch v-model="scope.row.mg_state"></el-switch>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
</template>

<script>
export default {
  data () {
    return {
      ruleList: [],
      total: 0,
    };
  },
  created () {
    this.getRuleList();
  },
  methods: {
    // 获取规则数据
    async getRuleList () {
      const data = {
        version: 1,
        method: 'rule.Find',
        id: 1
      };
      const { data: res } = await this.$http({
        url: '/ruleEngine',
        method: 'post',
        data: data,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if ('error' in res) {
        return this.$message.error('规则数据获取失败');
      }
      console.log(res);
      this.ruleList = res.result.ruleList;
      this.total = this.ruleList.length;
    }
  }
};
</script>

<style lang="less" scoped>
  .el-breadcrumb {
    margin-bottom: 12px;
    font-size: 15px;
  }
  div {
    white-space: pre-line !important;
    overflow: hidden
  }
</style>
