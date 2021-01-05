import { EntityState } from '@ngrx/entity';

export interface IVendorEntityState extends EntityState<IVendor> { }
export interface IVendor {
    id: number;
    name: string;
    icon: string;
    longitude: string;
    latitude: string;
}

export interface IVendorExpenseTypeEntityState extends EntityState<IVendorExpenseType> { }
export interface IVendorExpenseType {
    id: number;
    vendor: IVendor;
    vendor_id: number;
    expenseType: IExpenseType;
    expense_type_id: number;
}

export interface IExpenseTypeEntityState extends EntityState<IExpenseType> { }
export interface IExpenseType {
    id: number;
    name: string;
    icon_url: string;
}

export interface IExpenseEntityState extends EntityState<IExpense> { }
export interface IExpense {
    id: number;
    expense_total: number;
    vendor_id: number;
    vendor: IVendor;
    dated: string;
    expense_id: number;
    expense: IExpense;
    member_id: number;
    member: IMember;
    is_reoccurring: boolean;
    reoccurring_interval: number;
    reoccurring_day: number;
    tags: string;
    tagsArray: string[];
    icon?: string;
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

export interface IMemberEntityState extends EntityState<IMember> { }
export interface IMember {
    id: number;
    name: string;
    age: number;
    photo: string;
}

export interface IIncomeEntityState extends EntityState<IIncome> { }
export interface IIncome {
    amount: number;
    vendor_id: number;
    vendor: IVendor;
    member_id: number;
    member: IMember;
    income_interval: number;
    income_day: number;
    tags: string;
    tagsArray: string[];
    is_reoccurring: boolean;
    dated: string;
}

export interface IIgnoreTagsEntityState extends EntityState<IIgnoreTags> { }
export interface IIgnoreTags {
    id: number;
    user_id: number;
    tag: string;
}

export interface IExpenseGroupVendors {
    icon?: string;
    id?: number;
    name?: string;
    total?: number;
    purchasing?: any;
}

export interface IExpenseGroup {
    dated: Date;
    expenses: IExpense[];
    vendors: IExpenseGroupVendors[];
}

export interface IIcon {
    [key: string]: string
}
