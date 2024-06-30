<template>
    <div id="app">
        <section
            class="transactions"
        >
            <a-card
                class="transactions__card"
                title="Тестовое задание"
                :bordered="false"
            >
                <template
                    v-slot:extra
                >
                    <a-space
                        direction="vertical"
                    >
                        <a-input-search
                            v-model:value="searchQuery"
                            placeholder="Найти..."
                            class="transactions__search"
                            @input="fetchLeads"
                        />
                    </a-space>
                </template>
                <a-spin
                    :spinning="isLoading"
                >
                    <a-table
                        :data-source="leads"
                        :columns="columns"
                        :pagination="false"
                    >
                        <template
                            v-slot:bodyCell="{ column, record }"
                        >
                            <template
                                v-if="column.key === 'name'"
                            >
                                {{ record.name }}
                            </template>
                            <template
                                v-else-if="column.key === 'status'"
                            >
                                <p>
                                    <a-tag
                                        v-for="tag in record.status"
                                        :key="tag"
                                        :class="generateTag(tag)"
                                        class="status-tag"
                                    >
                                        {{ tag }}
                                    </a-tag>
                                </p>
                            </template>
                        </template>
                        <template
                            v-slot:expandedRowRender="{ record }"
                        >
                            <p
                                class="expanded-row"
                            >
                                <template
                                    v-if="record.contacts"
                                >
                                    <UserOutlined
                                        class="mx-sm user-icon"
                                    />
                                    {{ record.contacts.label }}
                                    <a
                                        :href="`tel:${record.contacts.phone}`"
                                    >
                                        <PhoneOutlined
                                            class="mx-sm"
                                        />
                                    </a>

                                    <a
                                        :href="`mailto:${record.contacts.mail}`"
                                    >
                                        <MailOutlined
                                            class="mx-sm"
                                        />
                                    </a>
                                </template>
                                <template
                                    v-else
                                >
                                    <p class="expanded-row">Без контакта</p>
                                </template>
                            </p>
                        </template>
                    </a-table>
                </a-spin>
            </a-card>
        </section>
    </div>
</template>

<script
    setup
    lang="ts"
>
import axios from 'axios';
import { ref } from "vue";
import { UserOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons-vue'

export interface Leads {
    key: number
    title: string
    budget: number
    status: ['Принимают решение'] | ['Закрыто и не реализовано'] | ['Переговоры']
    name: string
    date: string
    contacts?: {
        label: string,
        phone: string,
        mail: string,
    }
}

const isLoading = ref<boolean>(false)
const searchQuery = ref<string>('')
const leads = ref<Leads[]>([
    {
        key: 1,
        title: 'Первая сделка',
        budget: 1000,
        status: ['Принимают решение'],
        name: 'Андрей Соколов',
        date: '20.01.1970 15:32',
        contacts: {
            label: 'Тест Контактов',
            phone: '+7-999-999-99-99',
            mail: 'dCkOQ@example.com',
            
        }
    },
    {
        key: 2,
        title: 'Сделка #31738737',
        budget: 0,
        status: ['Закрыто и не реализовано'],
        name: 'Андрей Тулев',
        date: '20.01.1970 19:54'
    },
    {
        key: 3,
        title: 'Вторая сделка',
        budget: 0,
        status: ['Принимают решение'],
        name: 'Андрей Тулев',
        date: '20.01.1970 15:32',
        contacts: {
            label: 'Перт Петров',
            phone: '+7-999-999-99-99',
            mail: 'dCkOQ@example.com',
        }
    },
    {
        key: 4,
        title: 'Сделка #31943981',
        budget: 8888,
        status: ['Переговоры'],
        name: 'Андрей Тулев',
        date: '20.01.1970 22:37'
    }
])


const columns = ref([
    { title: 'Название', dataIndex: 'title', key: 'title', fixed: true },
    { title: 'Бюджет', dataIndex: 'budget', key: 'budget' },
    { title: 'Статус', dataIndex: 'status', key: 'status' },
    { title: 'Ответственный', dataIndex: 'name', key: 'name' },
    { title: 'Дата создания', dataIndex: 'date', key: 'date' },
]);

const fetchLeads = async () => {
    isLoading.value = true
    try {
        //Тут нужен debounce
        const response = await axios.get(`/api/leads`, {
            params: {
                query: searchQuery.value
            },
        });
        leads.value = response.data;
    }
    catch (error) {
        console.error(error)
    }
    finally {
        isLoading.value = false
    }
};

const generateTag = (tag: string) => {
    switch (tag) {
        case 'Принимают решение':
            return 'access'
        case 'Закрыто и не реализовано':
            return 'closed'
        default:
            return 'conservation'
    }
}
</script>

<style
    lang="scss"
>
.user-icon {
    border-radius: 50%;
    background-color: #BBBBBB;
    color: white;
    padding: 5px;
    margin-right: 5px;
}
.mx-sm {
    margin-left: 12px;
    margin-right: 12px;
}
.access {
    background-color: RGB(255, 204, 102);
}
.closed {
    background-color: RGB(213, 216, 219);
}
.conservation {
    background-color: RGB(255, 255, 153);
}
</style>
