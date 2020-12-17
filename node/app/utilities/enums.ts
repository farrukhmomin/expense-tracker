export interface iDeleteParameters {
    Condition: string;
    Value: string;
    Operand?: string;
}
export interface iWhereParameters {
    Column: string;
    Value: string;
    Operator?: string;
}
export interface iQueryParameters {
    Select: string[];
    Where?: Array<iWhereParameters>;
    TableName: any;
    GroupBy?: string;
    Having?: string;
    OrderBy?: string;
    InnerJoin?: string;
}
export enum Status { Failed = 0, Success = 1 }

export class PResult {
    public Status: Status;
    public Error: Array<any>;
    public Params: any;
    public RowCount!: number;
    public Rows!: Array<any>;
    public RowsAffected!: number;
    public InsertedId!: number;
    public ChangedRows!: number;

    constructor(status: Status, error: Array<any>, param?: any) {
        this.Status = status;
        this.Params = param;
        this.Error = error;
    }
}
