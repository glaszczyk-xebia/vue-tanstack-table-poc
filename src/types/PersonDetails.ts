export type PaymentStatus = 'Paid' | 'Unpaid' | 'Partial';
export type PersonDetails = {
	id: string;
	accountNo: string;
	firstName: string;
	lastName: string;
	group: 'Finance' | 'Operations' | 'Sales' | 'Marketing' | 'IT' | 'HR' | 'Legal' | 'Others';
	description: string;
	amount: number;
	dueDate: string;
	status: PaymentStatus;
	remaining: number;
}