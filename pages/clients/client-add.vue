<template>
    <AdminLayout>
        <div id="AdminPage" class="m-4">
            <div class="max-w-[768px] mx-auto">
                <NuxtLink to="/">Back</NuxtLink>

                <h1 class="text-2xl font-bold text-center text-gray-900">Add Client </h1>

                <div class="font-bold text-2xl text-[#519351] text-center" v-if="successMessage">{{ successMessage }}</div>
                <div class="font-bold text-2xl text-[#b0666c] text-center" v-if="errorMessage">
                    <ul>
                        <li v-for="error in errorMessage" :key="error"> {{ error }} </li>
                    </ul>
                </div>

                <form  @submit.prevent="createClient">
                    <div class="mb-3">
                        <p> Labels with red asterisk(<span class="text-[red]">*</span>) are considered important</p>
                    </div>
                    <div class="mb-3">
                        <label for="firstName" class="form-label">First Name <span class="text-[red]">*</span></label>
                        <input type="text" class="form-control" id="firstName" v-model="client.first_name">
                    </div>
                    <div class="mb-3">
                        <label for="lastName" class="form-label">Last Name <span class="text-[red]">*</span></label>
                        <input type="text" class="form-control" id="lastName" v-model="client.last_name">
                    </div>
                    <div class="mb-3">
                        <label for="contactNo" class="form-label">Contact Number <span class="text-[red]">*</span></label>
                        <input type="text" class="form-control" id="contactNo" v-model="client.contact_no">
                    </div>
                    <div class="mb-3">
                        <label for="birthday" class="form-label">Birthday <span class="text-[red]">*</span></label>
                        <input type="date" class="form-control" id="birthday" v-model="client.birthday">
                    </div>
                    <div class="mb-3">
                        <label for="email" class="form-label">Email address <span class="text-[red]">*</span></label>
                        <input type="email" class="form-control" id="email" v-model="client.email">
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">Password <span class="text-[red]">*</span></label>
                        <input type="password" class="form-control" id="password" v-model="client.password">
                    </div>
                    <div class="mb-3">
                        <label for="password_confirmation" class="form-label">Password Confirmation <span class="text-[red]">*</span></label>
                        <input type="password" class="form-control" id="password_confirmation" v-model="client.password_confirmation">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Interests</label>
                        <div class="mb-3 form-check">
                            <input type="checkbox" class="form-check-input" id="selectAll" v-model="selectAll">
                            <label class="form-check-label" for="selectAll">Select All</label>
                        </div>
                        <div class="grid grid-cols-4 gap-4">
                            <div v-for="interest in interests" :key="interest.id" class="form-check">
                                <input type="checkbox" class="form-check-input" :id="'interest-' + interest.id" :value="interest.id" v-model="selectedInterestIds">
                                <label class="form-check-label" :for="'interest-' + interest.id">{{ interest.name }}</label>
                            </div>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
                <p class="font-semi-bold italic text-center text-[#a8a8a8] mb-[10px]">As an admin, I can register my clients and add their interests</p>
            </div>
        </div>
    </AdminLayout>  
</template>

<script setup>
import AdminLayout from '~~/layouts/AdminLayout.vue';
import { useUserStore } from '~~/stores/user';
import Client from '~~/scripts/clients';
import Interest from '~~/scripts/interest';
import { storeToRefs } from 'pinia';

const router = useRouter();
const userStore = useUserStore();
const { id, api_token } = storeToRefs(userStore);
const client = ref({
    email: '',
    first_name: '',
    last_name: '',
    contact_no: '',
    birthday: '',
    password: '',
    password_confirmation: '',
    hasChecked: false,
});
const interests = ref([]);
const selectedInterestIds = ref([]);
const successMessage = ref('');
const errorMessage = ref('');
const selectAll = ref(false);

const ClientApi = new Client(api_token.value);
const InterestApi = new Interest(api_token.value);

const getInterests = async () => {
    interests.value = await InterestApi.getInterests();
};

const createClient = async () => {
    errorMessage.value = '';
    successMessage.value = '';

    try {
        const createClientData = {
            first_name: client.value.first_name,
            last_name: client.value.last_name,
            birthday: client.value.birthday,
            contact_no: client.value.contact_no,
            email: client.value.email,
            interest_ids: selectedInterestIds.value,
            password: client.value.password,
            password_confirmation: client.value.password_confirmation,
            user_id: id.value
        };

        let { user } = await ClientApi.createClient(id.value, createClientData);
        successMessage.value = 'Client updated successfully!';

        client.value = {
            email: '',
            first_name: '',
            last_name: '',
            contact_no: '',
            birthday: '',
            password: '',
            hasChecked: false,
        };
        selectedInterestIds.value = [];

        successMessage.value = "New client added.";

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

watch(selectAll, (newValue) => {
    if (newValue) {
        selectedInterestIds.value = interests.value.map(i => i.id);
    } else {
        selectedInterestIds.value = [];
    }
});

watch(selectedInterestIds, (newValue) => {
    if (newValue.length === interests.value.length) {
        selectAll.value = true;
    } else {
        selectAll.value = false;
    }
});

onMounted(async () => {
    await getInterests();
});
</script>
