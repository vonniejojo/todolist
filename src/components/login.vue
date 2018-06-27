<template>
<div class="wrapper">
    <md-field>
      <label>用户名</label>
      <md-input v-model="username"></md-input>
    </md-field>
    <md-field>
      <label>密码</label>
      <md-input v-model="password" @keyup.enter="checkLogin" type="password"></md-input>
    </md-field>
    <md-button class="md-raised" @click="checkLogin" >登录</md-button>
</div>
</template>

<script>
export default {
    data() {
        return {
            name:'tess',
            username:'',
            password:'',
            isLogin:false
        }
    },
    computed:{
        users(){
            return this.$store.getters.users;
        }
    },
    methods:{
        checkLogin(){
            let user = this.$store.getters.users.find(user => {
                return (this.username === user.username)&&(this.password === user.password);
            });
            if (!user) {
                this.$store.commit('setLogin', false)
            }else {
                this.$store.commit('setLogin', true)
                this.$router.push('/index');
            }
        }
    },
    created() {
        let user = {
            username:'tess',
            password:'123'
        };
        this.$store.commit('addUser',user);
    }
}
</script>

<style>
.wrapper{
    width: 400px;
    height: 300px;
    margin: 200px auto;
}
.md-button{
    margin:auto;
}
</style>
