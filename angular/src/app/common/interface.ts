export interface IVendor {
    id: number;
    name: string;
    icon: string;
    longitude: string;
    latitude: string;
}

export interface IVendorExpenseType {
    id: number;
    vendor: number;
    vendor_id: number;
    expenseType: number;
    expense_type_id: number;
}

export interface IExpenseType {
    id: number;
    name: string;
    icon: string;
}

export interface IExpense {
    id: number;
    expense_total: number;
    vendor_id: number;
    dated: Date;
    expense_id: number;
    member_id: number;
    is_reoccurring: boolean;
    reoccurring_interval: number;
    reoccurring_day: number;
}

export interface IUser {
    id: number;
    username: string;
    dated: Date;
}

export interface ILogin {
    username: string;
    password: string;
}

export interface IMember {
    name: string;
    age: number;
    photo: string;
}

export interface IIncome {
    amount: string;
    vendor_id: string;
    income_interval: number;
    income_day: number;
    is_reoccurring: boolean;
}
