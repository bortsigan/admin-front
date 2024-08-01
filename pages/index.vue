<template>
    <AdminLayout>
        <div id="AdminPage" class="m-4" v-if="api_token">
            <div class="max-w-[768px] mx-auto">
                <h1 class="text-2xl font-bold text-center text-gray-900 mb-[20px]">My Clients</h1>   

                <div class="font-bold text-2xl text-[#519351] text-center" v-if="successMessage" >{{ successMessage }}</div>
                <NuxtLink to="/clients/client-add" class="btn btn-primary mb-[20px]" v-if="role_id == 1">Add Client</NuxtLink>
                <table class="table table-striped border-4">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody v-if="clients">
                        <tr v-for="client in clients" :key="client.id" class="border-2">
                            <td class="border-2">{{ client.id }}</td>
                            <td class="border-2">{{ client.first_name }}</td>
                            <td class="border-2">{{ client.last_name }}</td>
                            <td class="border-2">{{ client.email }}</td>
                            <td class="border-2">
                                <NuxtLink :to="`/clients/client-edit?id=${client.id}`" class="font-bold text-[green]">Edit</NuxtLink> |
                                <button class="font-bold text-[#b35858]" @click="deleteClient(client.id)">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <p class="font-semi-bold italic text-center text-[#a8a8a8] mb-[10px]">As an admin, I can only see clients that belong to me.</p>
            </div>
        </div>

        <div class="m-4 text-center" v-else>
            <h1 class="text-3xl font-bolder text-center text-[#2b2bd3]">EMAPTA Tech Exam</h1>
            <NuxtLink to="/login" class="rounded w-full p-2 font-bold mr-[10px] bg-[#5c769d] hover:bg-[#779cd5] text-white">Login</NuxtLink>
            <NuxtLink to="/register" class="text-[#8228D9] underline">
                Sign up
            </NuxtLink>
        </div>
        
    </AdminLayout>
</template>

<script setup>
    import AdminLayout from '~~/layouts/AdminLayout.vue';
    import { useUserStore } from '~~/stores/user';
    import Client from '~~/scripts/clients';
    import { storeToRefs } from 'pinia';

    const userStore = useUserStore()
    const { id, api_token, role_id } = storeToRefs(userStore);
    const test = storeToRefs(userStore);
    const clients = ref();
    const ClientApi = new Client(api_token.value);
    const successMessage = ref("");

    const handleLogout = async () => {
        await userStore.logout();
        window.location.href = "/login";
    }

    const getMyUsers = async () => {
        // As an admin, I can only see clients that belong to me.
        clients.value = await ClientApi.getMyUsers(id.value);
        console.log(test);
    }

    const deleteClient = async(clientId) => {
        // As an admin, I can delete my clients
        if(confirm("Are you sure you want to delete?")) {
            await ClientApi.deleteClient(id.value, clientId);
            getMyUsers();

            successMessage.value = "Deleted..";
            
            setTimeout(() => {
                successMessage.value = "";
            }, 2000);
        }
    }

    onMounted(async () => {
        getMyUsers();
    })
</script>