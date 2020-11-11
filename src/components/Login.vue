<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/avator.jpg" alt="头像">
      </div>

      <!-- 登陆表单区域 -->
      <el-form ref="LoginFormRef" label-width="0" class="login_form" :model="login_form" :rules="login_form_rules">
        <!-- 用户名 -->
        <el-form-item label="" prop="username">
          <el-input v-model="login_form.username">
            <i style="font-size:150%" slot="prefix" class="iconfont iconusercenter"></i>
          </el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="" prop="password">
          <el-input v-model="login_form.password" type="password">
            <i style="font-size:140%" slot="prefix" class="iconfont iconpassword"></i>
          </el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item label="" class="buttons">
          <el-button type="primary" @click="submitLoginForm">登陆</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 登陆表单的数据绑定对象
      login_form: {
        username: 'l1hy',
        password: '123456'
      },
      // 登陆表单的数据验证
      login_form_rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 20, message: '用户名长度应在2-20个字符之间', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 2, max: 20, message: '密码长度应在2-20个字符之间', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    resetLoginForm () {
      this.$refs.LoginFormRef.resetFields();
    },
    submitLoginForm () {
      // 构造请求参数
      const data = {
        administratorName: this.login_form.username,
        administratorPassword: this.login_form.password
      };
      // 发起请求
      this.$refs.LoginFormRef.validate(async valid => {
        if (!valid) return false;
        const res = await this.$http({
          url: '/login',
          method: 'post',
          data: this.$qs.stringify(data)
          // headers: {
          //  'Content-Type': 'application/x-www-form-urlencoded'
          // }
        });
        console.log(res);
        if (res.data.flag) {
          this.$message.success('登陆成功');
          console.log(res.data.data);
          window.sessionStorage.setItem('token', '123321');
          await this.$router.push('home');
          return true;
        } else this.$message.error(res.data.errorMsg);
        return true;
      });
    }
  }
};
</script>

<style lang="less" scoped>
  .login_container{
    background-color: #50AEFF;
    height: 80%;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
  .login_box{
    width: 500px;
    height: 350px;
    background-color: #ffffff;
    border-radius: 5px;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    box-shadow: 0 0 3px #dddddd;

    .avatar_box{
      height: 150px;
      width: 150px;
      border: 1px solid #50AEFF;
      border-radius: 50%;
      padding: 10px;
      box-shadow: 0 3px 3px #c8c8c8 ;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #ffffff;

      img{
        height: 100%;
        width: 100%;
        border-radius: 50%;
        background-color: #eeeeee;
        cursor: pointer;
        transition: all 0.6s;
      }

      img:hover{
        transform: scale(1.12, 1.12);
      }
    }
  }
  .buttons{
    display: flex;
    justify-content: flex-end;
  }

  .login_form{
    position: absolute;
    bottom: 20px;
    width: 100%;
    box-sizing: border-box;

    .el-form-item {
      margin: 25px 25px;
    }
  }
</style>
