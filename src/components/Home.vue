<template>
  <el-container class="home-container">
    <el-header>
	    <div>
		    <img src="../assets/uav.png" alt="无人机" />
        <span>规则引擎后台管理系统</span>
	    </div>
	  <el-button type="info" @click="signOut">退出</el-button>
	</el-header>
	<el-container>
	  <el-aside :width="isCollapsed ? '64px' : '200px'">
		<div class="toggle-button" @click="toggleCollapse">
		  |||
		</div>
		<el-menu
		  :default-active="activePath"
		  class="el-menu-vertical-demo"
		  @open="handleOpen"
		  @close="handleClose"
		  background-color="#333744"
		  text-color="#fff"
		  unique-opened
		  :router="true"
		  :collapse=isCollapsed
		  :collapse-transition="false"
		  active-text-color="#409eff">
		  <el-submenu index="1">
			<template slot="title">
			  <i class="el-icon-user"></i>
			  <span>用户管理</span>
			</template>
			<el-menu-item index="/users" @click="saveNavState('/users')">
			  <template slot="title">
				<i class="el-icon-menu"></i>
				<span>用户列表</span>
			  </template>
			</el-menu-item>
		  </el-submenu>
		  <el-submenu index="2">
			<template slot="title">
			  <i class="el-icon-key"></i>
			  <span>规则管理</span>
			</template>
			<el-menu-item index="/rules" @click="saveNavState('/rules')">
			  <template slot="title">
				<i class="el-icon-menu"></i>
				<span>规则列表</span>
			  </template>
			</el-menu-item>
			<el-menu-item index="2-2" @click="saveNavState('/ruleParams')">
			  <template slot="title">
				<i class="el-icon-menu"></i>
				<span>规则参数</span>
			  </template>
			</el-menu-item>
			<el-menu-item index="2-3" @click="saveNavState('/users')">
			  <template slot="title">
				<i class="el-icon-menu"></i>
				<span>规则定义</span>
			  </template>
			</el-menu-item>
		  </el-submenu>
		  <el-submenu index="3">
			<template slot="title">
			  <i class="el-icon-data-board"></i>
			  <span>数据统计</span>
			</template>
			<el-submenu index="1-4">
			  <template slot="title">选项4</template>
			  <el-menu-item index="1-4-1">选项1</el-menu-item>
			</el-submenu>
		  </el-submenu>
		</el-menu>
	  </el-aside>
	  <el-main>
		<router-view></router-view>
	  </el-main>
	</el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
	  isCollapsed: false,
	  activePath: ''
    };
  },
  created () {
    this.activePath = window.sessionStorage.getItem('activePath');
  },
  methods: {
    signOut () {
	  this.$message.success('退出成功');
	  window.sessionStorage.clear();
	  this.$router.push('/login');
    },
    // 点击按钮，实现菜单的折叠，切换以及展开
    toggleCollapse () {
	  console.log('1');
	  this.isCollapsed = !this.isCollapsed;
    },
    // 保存连接的激活状态
    saveNavState (activePath) {
	  window.sessionStorage.setItem('activePath', activePath);
	  this.activePath = activePath;
    }
  }
};
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header {
  display: flex;
  justify-content: space-between;
  background-color: #373d41;
  align-items: center;
  padding-left: 10px;
  color: #ffffff;
  font-size: 28px;
  font-family: "微软雅黑", "Helvetica Neue", Helvetica, "PingFang SC",
	"Hiragino Sans GB", "Microsoft YaHei", Arial, sans-serif;
  > div {
	display: flex;
	align-items: center;
	padding: 15px;
  }
}
.el-aside {
  background-color: #333744;
  .el-menu {
	border-right: 0;
  }
  .toggle-button {
	background-color: #4a5064;
	font-size: 10px;
	line-height: 24px;
	color: #ffffff;
	text-align: center;
	letter-spacing: 0.2em;
	cursor: pointer;
  }
}
.el-main {
  background-color: #eeeeee;
}
</style>
