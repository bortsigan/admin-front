import { defineStore } from "pinia";
import axios from "@/plugins/axios";

const $axios = axios().provide.axios;

export const useUserStore = defineStore('user', {
    state: () => ({
        id: '',
        first_name: '',
        last_name: '',
        email: '',
        api_token: '',
        isLoggedIn: false,
        role_id: ''
    }),
    actions: {
        async login(email, password) {
            await $axios.post('/api/login', {
              email: email,
              password: password,
            }).then((result) => {
                
                let datas = result.data;

                localStorage.setItem('token', datas.token)

                this.$state.api_token = datas.token
                this.$state.email = datas.user.email
                this.$state.first_name = datas.user.first_name
                this.$state.last_name = datas.user.last_name
                this.$state.id = datas.user.id
                this.$state.isLoggedIn = true
                this.$state.role_id = datas.user.role_id
            });
        },
        
        async register(name, email, password, confirmPassword) {
            await $axios.post('/api/register', {
              first_name: first_name,
              last_name: last_name,
              email: email,
              password: password,
              password_confirmation: confirmPassword
            })
        },

        async getUser() {
            let res = await $axios.get('/api/user')
            this.$state.id = res.data.data.id
            this.$state.first_name = res.data.data.first_name
            this.$state.last_name = res.data.data.last_name
            this.$state.email = res.data.data.email      
            this.$state.isLoggedIn = true
            this.$state.role_id = res.data.data.role_id
        },
      
        async logout() {
            const config = {
                headers: {
                    Authorization: `Bearer ${this.$state.api_token}`
                }
            };
            await $axios.post('/api/logout', null, config)
            this.resetState()
        },

        resetState() {      
            this.$state.id = ''
            this.$state.first_name = ''
            this.$state.last_name = ''
            this.$state.email = ''
            this.$state.api_token = ''
            this.$state.isLoggedIn = false
            this.$state.role_id = ''
        },
    },
    persist: true,
})