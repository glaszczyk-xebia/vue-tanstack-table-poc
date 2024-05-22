import type {PaymentStatus, PersonDetails} from "@/types/PersonDetails";
import {faker} from "@faker-js/faker";
import {ref} from "vue";
import {defineStore} from "pinia";

const getRemaining = (status: PaymentStatus, amount: number) => {
	if (status === 'Paid') {
		return 0;
	} else if (status === 'Unpaid') {
		return amount;
	} else {
		return amount / 2;
	}

}
const getPersonDetails = (): PersonDetails => {
	const amount =parseFloat(faker.finance.amount())
	const status = faker.helpers.arrayElement(['Paid', 'Unpaid', 'Partial']) as PaymentStatus

	return ({
		id: faker.string.nanoid(10),
		accountNo: faker.finance.accountNumber(),
		firstName: faker.person.firstName(),
		lastName: faker.person.lastName(),
		group: faker.helpers.arrayElement(['Finance', 'Operations', 'Sales', 'Marketing', 'IT', 'HR', 'Legal', 'Others']),
		description: faker.lorem.sentence(),
		amount ,
		dueDate: faker.date.future().toISOString(),
		status,
		remaining: getRemaining(status, amount)
	});
};


export const useDetailsStore = defineStore("detailsTable", () => {
	const data = ref<PersonDetails[]>(Array.from({length: 100}, getPersonDetails));

	return {data};
});
