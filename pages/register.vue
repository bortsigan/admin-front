<template>
    <AdminLayout>
        <div id="AdminPage" class="m-4">
            <div class="max-w-[768px] mx-auto">
                

                <h1 class="text-2xl font-bold text-center text-gray-900">Register </h1>

                <div class="font-bold text-2xl text-[#519351] text-center" v-if="successMessage">{{ successMessage }}</div>
                <div class="font-bold text-2xl text-[#b0666c] text-center" v-if="errorMessage">
                    <ul>
                        <li v-for="error in errorMessage" :key="error"> {{ error }} </li>
                    </ul>
                </div>

                <form @submit.prevent="register">
                    
                    <div class="mb-3">
                        <label for="firstName" class="form-label">First Name</label>
                        <input type="text" class="form-control" id="firstName" v-model="firstName">
                    </div>
                    <div class="mb-3">
                        <label for="lastName" class="form-label">Last Name</label>
                        <input type="text" class="form-control" id="lastName" v-model="lastName">
                    </div>
                    <div class="mb-3">
                        <label for="email" class="form-label">Email address</label>
                        <input type="email" class="form-control" id="email" v-model="email">
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">Password</label>
                        <input type="password" class="form-control" id="password" v-model="password">
                    </div>
                    <div class="mb-3">
                        <label for="confirm_password" class="form-label">Confirm Password</label>
                        <input type="password" class="form-control" id="confirm_password" v-model="confirmPassword">
                    </div>
                    <button type="submit" class="btn btn-primary">Register</button>
                </form>
                <p class="font-semi-bold italic text-center text-[#a8a8a8] mb-[10px]">As an admin, I can register myself to the portal (name, email, and password)</p>
            </div>
        </div>
    </AdminLayout>
</template>

<script setup>
    import { useUserStore } from '~~/stores/user';
    import AdminLayout from '~/layouts/AdminLayout.vue';
    import axios from 'axios';
    
    


    definePageMeta({
        middleware: 'is-logged-in'
    })
    
    const router = useRouter()
    const userStore = useUserStore()
    const successMessage = ref('');
    let firstName = ref(null)
    let lastName = ref(null)
    let email = ref(null)
    let password = ref(null)
    let confirmPassword = ref(null)
    let errorMessage = ref(null)

    let register = async () => {
        successMessage.value = '';

        try {
            let datas = {
                first_name: firstName.value,
                last_name: lastName.value,
                email: email.value,
                password: password.value,
                password_confirmation: confirmPassword.value,
                is_registration: 1
            };
            const response = await axios.post(`/api/register`, datas);
            successMessage.value = response.data.message;

            await userStore.login(email.value, password.value);
            const token = window.localStorage.getItem('token');

            if (token) {
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + userStore.api_token;
            }

            router.push('/')

        } catch (error) {
            if (!error.response || !error.response.data.errors) {
                return;
            }

            const errors = error.response.data.errors;
            const errorMessageArray = [];

            for (const key in errors) {
                if (errors.hasOwnProperty(key)) {
                    console.log(errors[key][0]);
                    if (errors[key].length > 0) {
                        errorMessageArray.push(errors[key][0]);
                    }
                }
            }

            errorMessage.value = errorMessageArray;
        }
    };
</script>
