<template>
  <div class="app-container">
    <router-view :key="key" />
    <el-row>
      <el-col :span="6">
        <el-image style="width: 100%" :src="userImg" alt="用户" />
      </el-col>
      <el-col :span="12">
        <el-form ref="user" label-width="120px" class="with">
          <el-form-item label="旧密码" prop="pass">
            <el-input v-model="oldPassword" type="password" autocomplete="off" />
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input v-model="newPassword" type="password" autocomplete="off" />
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input v-model="checkPassword" type="password" autocomplete="off" />
          </el-form-item>
          <el-row align="center">
            <el-button type="primary" @click="updatePassword">
              提交
            </el-button>
          </el-row>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import store from '@/store'
import userImg from '@/assets/user/user.png'
import { updatePassword } from '@/api/user'

export default {
  data() {
    return {
      userImg: userImg,
      username: '',
      oldPassword: '',
      newPassword: '',
      checkPassword: ''
    }
  },
  computed: {
    key() {
      return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    }
  },
  created() {
    this.username = this.$route.params.username || store.getters.name
  },
  methods: {
    updatePassword() {
      const tplPassword = {
        passwordOld: this.oldPassword,
        passwordNew: this.newPassword
      }
      updatePassword(this.username, tplPassword).then(res => {
        this.$message({
          message: '恭喜你，这是一条成功消息',
          type: 'success'
        })
      }).catch(err => {
        this.$message.error(err)
      })
    }
  }
}
</script>

<style scoped>

</style>
