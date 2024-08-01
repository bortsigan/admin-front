<template>
    <header class="d-flex flex-wrap justify-content-center py-3 px-3 mb-4 border-bottom">
      <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
        <h1 class="text-2xl text-[blue] font-bold">Minski Take - Home Exam</h1>
      </a>

      <ul class="nav nav-pills" v-if="api_token">
        <li class="nav-item"><a href="/" class="nav-link" aria-current="page">Home</a></li>
        <li class="nav-item"><button type="button" class="nav-link" @click="handleLogout">Logout</button></li>
      </ul>
    </header>
    <div class="px-2.5 w-full z-0">
        <slot />
    </div>
</template>

<script setup>
    import { useUserStore } from '~~/stores/user'
    import { storeToRefs} from 'pinia';
    const userStore = useUserStore();
    const router = useRouter();
    const { isLoggedIn } = storeToRefs(userStore)
    const { id, api_token } = storeToRefs(userStore);

    definePageMeta({
        middleware: 'is-logged-out'
    })


    computed(async () => {
        try {
            await userStore.getUser()
        } catch (error) {}
    })

    const handleLogout = async () => {
        let res = confirm('Are you sure you want to sign out?')
        try {
            if (res) {
                await userStore.logout()
                localStorage.removeItem('token');
                router.push('/login')
                return
            }
        } catch (error) {
            console.log(error) 
        }
    }
</script>
