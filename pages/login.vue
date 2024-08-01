<template>
    <AdminLayout>
        <div id="AdminPage" class="m-4">
            <div class="max-w-[414px] mx-auto">
                <div class="mt-10">
                    <h1 class="lg:text-2xl text-3xl text-center font-extrabold">
                        Log in
                    </h1>
                    
                    <form class="mt-4" @submit.prevent="login()">
                        <div class="text-center mb-5 text-[#d88787]" v-if="errors">
                            {{ errors }}
                        </div>
                        <div>
                            <input class="form-control" placeholder="Email: link@gmail.com" v-model="email"
                                type="email" :error="errors && errors.email ? errors.email[0] : ''" />
                        </div>
                        <div class="mt-4">
                            <input placeholder="Password" class="form-control" v-model="password" type="password"
                                :error="errors && errors.password ? errors.password[0] : ''" />
                        </div>
                        <div class="mt-10 text-center">
                            <button type="submit" class="rounded-full w-full p-3 font-bold"
                                :disabled="(!email || !password)"
                                :class="(email && password) ?
                                'bg-[#5c769d] hover:bg-[#779cd5] text-white' :
                                'bg-[#EFF0EB] text-[#A7AAA2]'">
                                Log in
                            </button>
                        </div>
                    </form>
                    <div class="text-[14px] text-center pt-12">
                        Don't have an account?
                        <NuxtLink to="/register" class="text-[#8228D9] underline">
                            Sign up
                        </NuxtLink>
                    </div>
                    <p class="font-semi-bold italic text-center text-[#a8a8a8] mb-[10px]">As an admin, I can log in using my email and password</p>
                </div>
            </div>
        </div>    
    </AdminLayout>
</template>

<script setup>
    import axios from 'axios';
    import { useUserStore } from '~~/stores/user';
    import AdminLayout from '~/layouts/AdminLayout.vue';

    const userStore = useUserStore()
    const router = useRouter()

    definePageMeta({
        middleware: 'is-logged-in'
    })

    let email = ref(null)
    let password = ref(null)
    let errors = ref(null)

    const login = async () => {
        errors.value = null
        try {
            await userStore.login(email.value, password.value);
            const token = window.localStorage.getItem('token');
            if (token) {
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + userStore.api_token;
            }
            router.push('/')
        } catch (error) {
            errors.value = error.response.data.message
        }
    }
</script>
