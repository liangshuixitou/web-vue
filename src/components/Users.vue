<template>
    <div>
      <!-- 面包屑导航区 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 卡片区域 -->
      <el-card>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-input v-model="queryInfo.query" placeholder="请输入内容" clearable @clear="getUserList">
            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
            </el-input>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="addDialogVisible=true">添加用户</el-button>
          </el-col>
        </el-row>

        <!-- 用户列表区 -->
        <el-table :data="userList" border stripe>
          <el-table-column type="index" label="#"></el-table-column>
          <el-table-column prop="username" label="姓名"></el-table-column>
          <el-table-column prop="email" label="邮箱"></el-table-column>
          <el-table-column prop="telephone" label="电话"></el-table-column>
          <el-table-column prop="role_name" label="角色"></el-table-column>
          <el-table-column label="状态">
            <template v-slot:default="scope">
              <el-switch v-model="scope.row.mg_state" @change="userStateChanged(scope.row)"></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template v-slot:default="scope">
              <!-- 修改按钮-->
              <el-button type="primary" icon="el-icon-edit" size="small"></el-button>
              <!-- 删除按钮-->
              <el-button type="danger" icon="el-icon-delete" size="small"></el-button>
              <el-tooltip class="item" effect="dark" content="分配角色" placement="top" :enterable="false">
                <el-button type="warning" icon="el-icon-setting" size="small"></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pageNum"
          :page-sizes="[1, 2, 5, 10]"
          :page-size="queryInfo.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </el-card>
      <!-- 添加用户对话框-->
      <el-dialog
        title="添加用户"
        :visible.sync="addDialogVisible"
        width="30%"
        @close="addDialogClose">
        <!-- 主题区域 -->
        <el-form :model="addForm" status-icon :rules="addRules" ref="addFormRef" label-width="70px">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="addForm.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="addForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="addForm.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="telephone">
            <el-input v-model="addForm.telephone" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>

        <!-- 底部按钮区域 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addUser">确 定</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
export default {
  data () {
    const checkEmail = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入邮箱'));
      } else {
        // eslint-disable-next-line camelcase,no-useless-escape
        const email_reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
        if (!email_reg.test(value)) {
          callback(new Error('邮箱格式不正确'));
        } else {
          callback();
        }
      }
    };
    const checkTelephone = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入手机号'));
      } else {
        // eslint-disable-next-line camelcase,no-useless-escape
        const telephone_reg = /^1[3456789]\d{9}$/;
        if (!telephone_reg.test(value)) {
          callback(new Error('手机号格式不正确'));
        } else {
          callback();
        }
      }
    };
    return {
      queryInfo: {
        query: '',
        // 当前页码数
        pageNum: 1,
        // 当前每页显示条数
        pageSize: 2
      },
      input: '',
      userList: [],
      total: 0,
      // 隐藏对话框
      addDialogVisible: false,
      addForm: {
        username: '',
        password: '',
        email: '',
        telephone: ''
      },
      addRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 20, message: '用户名的长度在2-20个字符之间', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '密码的长度在6-15个字符之间', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        telephone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkTelephone, trigger: 'blur' }
        ]
      }
    };
  },
  created () {
    this.getUserList();
  },
  methods: {
    async getUserList () {
      const data = {
        version: 1,
        method: 'user.find',
        params: this.queryInfo,
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
      console.log(res);
      if ('error' in res) {
        return this.$message.error('用户数据获取失败');
      }
      this.userList = res.result.userList;
      this.total = res.result.total;
    },
    handleSizeChange (newSize) {
      // console.log(newSize);
      this.queryInfo.pageSize = newSize;
      this.getUserList();
    },
    handleCurrentChange (newPage) {
      // console.log(newPage);
      this.queryInfo.pageNum = newPage;
      this.getUserList();
    },
    async userStateChanged (userInfo) {
      console.log(userInfo);
      const data = {
        version: 1,
        method: 'user.change',
        params: {
          uid: userInfo.uid,
          state: userInfo.mg_state
        },
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
      console.log(res);
      if ('error' in res) {
        return this.$message.error('用户数据修改失败');
      } else {
        return this.$message.success('用户数据修改成功');
      }
    },
    // 舰艇用户对话框关闭事件
    addDialogClose () {
      this.$refs.addFormRef.resetFields();
    },
    // 点击按钮添加新用户
    addUser () {
      this.$refs.addFormRef.validate(valid => {
        if (!valid) return;

      });
    }
  }
};
</script>

<style lang="less" scoped>
  .el-breadcrumb{
    margin-bottom: 12px;
    font-size: 15px;
  }
  .el-card {
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15) !important;
  }
  .el-table {
    margin-top: 15px;
    font-size: 12px;
  }
</style>
