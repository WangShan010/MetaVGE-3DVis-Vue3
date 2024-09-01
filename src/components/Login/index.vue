<template>
	<div class="login">
		<section class="login-content">
			<div class="title-box">
				<h1>{{ getAppName() }}</h1>
			</div>
			<div class="form-box">
				<div class="form-content">
					<el-form :model="form">
						<el-form-item>
							<el-input v-model="form.username" placeholder="请输入用户名">
								<template #prefix>
									<div class="icon-box">
										<img alt="" src="./img/user_icon.png">
									</div>
								</template>
							</el-input>
						</el-form-item>
						<el-form-item>
							<el-input v-model="form.password" placeholder="请输入密码" type="password">
								<template #prefix>
									<div class="icon-box">
										<img alt="" src="./img/pwd_icon.png">
									</div>
								</template>
							</el-input>
						</el-form-item>
						<el-button class="login-button" type="primary" :class="{'loading-btn':loading}"
								   @click="loginHandle">{{ loading ? '登录中...' : '登录' }}
						</el-button>
					</el-form>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
export default {
	data() {
		return {
			loading: false,
			form: {
				username: 'admin',
				password: 'NhkjYDCjC2MpXeRsrcw3'
			}
		};
	},
	methods: {
		getAppName() {
			return VGEEarth.ConfigTool.config.appName;
		},
		async loginHandle() {
			this.loading = true;
			await new Promise(resolve => setTimeout(resolve, 200));
			this.$router.push({path: '/TechnologyScreen'});
			await new Promise(resolve => setTimeout(resolve, 2000));
			this.loading = false;
		}
	},
	mounted() {
	},
	unmounted() {
	}
};

</script>
<style lang='less' scoped>
.login {
	height: 100vh;
	background: url('./img/img.jpg') no-repeat center center;
	background-size: 100% 100%;

	.login-content {
		padding-top: 7%;
	}

	.title-box {
		background: url('./img/title_bg.png') no-repeat center center;
		background-size: 100% 100%;
		width: 724px;
		height: 100px;
		margin: 0 auto;

		h1 {
			background: linear-gradient(0deg, #E1FCFF 0%, #ACD9FF 100%);
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
			font-size: 42px;
			font-weight: normal;
			letter-spacing: 5px;
			line-height: 95px;
			text-align: center;
		}
	}

	.form-box {
		background: url('./img/form_bg.png') no-repeat center center;
		background-size: contain;
		width: 500px;
		height: 500px;
		position: relative;
		margin: 0 auto;
		color: #fff;
		top: 55px;

		.form-content {
			width: calc(100% - 100px);
			position: absolute;
			margin: 144px auto 0;
			left: 50px;
		}
	}

	:deep {
		.el-form {
			margin: 0 20px;
		}

		.el-form-item {
			margin-bottom: 48px;
			height: 67px;
			border: 1px solid #248AA4;
			opacity: 0.72;
			border-radius: 4px;
			background: rgba(0, 2, 2, 0.67);
		}

		.el-input__wrapper {
			background: none;
			padding: 0;
			box-shadow: none;
			height: 67px;
		}

		.el-input__inner {
			padding-left: 22px;
			font-size: 18px;
			color: #acd6de;
		}

		.el-input__wrapper.is-focus {
			box-shadow: 0 0 10px #248AA4;

		}
	}

	.icon-box {
		width: 67px;
		margin: 11px 0;
		border-right: 1px solid #4A8AA2;
	}

	img {
		display: inline-block;
		width: 26px;
		height: 29px;
	}

	.login-button {
		display: flex;
		background: url('./img/login_bg.png') no-repeat center center;
		background-size: auto;
		border: none;
		width: 218px;
		height: 54px;
		margin: 4px auto 0;
		font-size: 20px;
		color: #adfffa;
	}

	.loading-btn {
		color: #ddc22d;
	}
}</style>
