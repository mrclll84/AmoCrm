import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AmoCrmService {
    private readonly amocrmBaseUrl: string;
    private readonly amocrmAccessToken: string;

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) {
        this.amocrmBaseUrl = this.configService.get<string>('AMOCRM_BASE_URL');
        this.amocrmAccessToken = this.configService.get<string>('AMOCRM_ACCESS_TOKEN');
    }

    async getLeads(query: string): Promise<any> {
        try {
            const response = await this.httpService.get(`${this.amocrmBaseUrl}/api/v4/leads`, {
                headers: {
                    Authorization: `Bearer ${this.amocrmAccessToken}`,
                },
                params: { query },
            }).toPromise();
            console.log(query)
            //тут нужно фильтровать по query
            return response.data;
        }
        catch (error) {
            const fakeResponse = [
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
            ]

            if (!query) {
                fakeResponse.push(...[{
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
                    }])
            }
            return fakeResponse
        }
    }
}