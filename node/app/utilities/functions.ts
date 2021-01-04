interface a {
    column: any[];
    data: any[]
}

export function transformObjectToArray(obj: any[]) {
    const result: a[] = [{ column: [], data: [] }]
    if (obj.length > 0) {

        // keys
        Object.keys(obj[0]).map(key => result[0].column.push(key));

        // data
        obj.forEach((data, index) => {

            var dataObj: any = [];

            Object.keys(data).map(keys => {
                dataObj.push(data[keys]);
            });

            result[result.length - 1].data.push(dataObj);
        });
    }
    return result;
}