import { useState, useEffect } from "react";

import { FilterDefinition, Grid } from "../components/grid";
import { SortDirection, TableColumnDefinition, TableSortDefinition } from "../components/table";

export const Orders = (): JSX.Element => {
    const columns: TableColumnDefinition[] = [
        { name: "OrderID", text: "OrderID", sortable: true },
        { name: "CustomerID", text: "CustomerId", sortable: true },
        { name: "ContactName", text: "ContactName", sortable: true },
        { name: "Freight", text: "Freight", filterable: true },
        { name: "ShipAddress", text: "ShipAddress", filterable: true },
        { name: "ShippedDate", text: "ShippedDate" },
        { name: "ShipCountry", text: "ShipCountry" },
        { name: "ShipCity", text: "ShipCity" },
        { name: "ShipName", text: "ShipName" }
    ];

    const [data, setData] = useState<any>({ Data: [] });
    const [sort, setSort] = useState<string>("");
    const [sortDef, setSortDef] = useState<TableSortDefinition>()
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(25);
    const [filter, setFilter] = useState<string>("");
    const [filterDef, setFilterDef] = useState<FilterDefinition>({});

    useEffect(() => {
        setData({
            "Data": [
                {
                    "OrderID": 10643,
                    "CustomerID": "ALFKI",
                    "ContactName": "Maria Anders",
                    "Freight": 29.46,
                    "ShipAddress": "Obere Str. 57",
                    "OrderDate": "1997-08-25T00:00:00",
                    "ShippedDate": "1997-09-02T00:00:00",
                    "ShipCountry": "Germany",
                    "ShipCity": "Berlin",
                    "ShipName": "Alfreds Futterkiste",
                    "EmployeeID": 6
                },
                {
                    "OrderID": 10692,
                    "CustomerID": "ALFKI",
                    "ContactName": "Maria Anders",
                    "Freight": 61.02,
                    "ShipAddress": "Obere Str. 57",
                    "OrderDate": "1997-10-03T00:00:00",
                    "ShippedDate": "1997-10-13T00:00:00",
                    "ShipCountry": "Germany",
                    "ShipCity": "Berlin",
                    "ShipName": "Alfred-s Futterkiste",
                    "EmployeeID": 4
                },
                {
                    "OrderID": 10702,
                    "CustomerID": "ALFKI",
                    "ContactName": "Maria Anders",
                    "Freight": 23.94,
                    "ShipAddress": "Obere Str. 57",
                    "OrderDate": "1997-10-13T00:00:00",
                    "ShippedDate": "1997-10-21T00:00:00",
                    "ShipCountry": "Germany",
                    "ShipCity": "Berlin",
                    "ShipName": "Alfred-s Futterkiste",
                    "EmployeeID": 4
                },
                {
                    "OrderID": 10835,
                    "CustomerID": "ALFKI",
                    "ContactName": "Maria Anders",
                    "Freight": 69.53,
                    "ShipAddress": "Obere Str. 57",
                    "OrderDate": "1998-01-15T00:00:00",
                    "ShippedDate": "1998-01-21T00:00:00",
                    "ShipCountry": "Germany",
                    "ShipCity": "Berlin",
                    "ShipName": "Alfred-s Futterkiste",
                    "EmployeeID": 1
                },
                {
                    "OrderID": 10952,
                    "CustomerID": "ALFKI",
                    "ContactName": "Maria Anders",
                    "Freight": 40.42,
                    "ShipAddress": "Obere Str. 57",
                    "OrderDate": "1998-03-16T00:00:00",
                    "ShippedDate": "1998-03-24T00:00:00",
                    "ShipCountry": "Germany",
                    "ShipCity": "Berlin",
                    "ShipName": "Alfred-s Futterkiste",
                    "EmployeeID": 1
                },
                {
                    "OrderID": 11011,
                    "CustomerID": "ALFKI",
                    "ContactName": "Maria Anders",
                    "Freight": 1.21,
                    "ShipAddress": "Obere Str. 57",
                    "OrderDate": "1998-04-09T00:00:00",
                    "ShippedDate": "1998-04-13T00:00:00",
                    "ShipCountry": "Germany",
                    "ShipCity": "Berlin",
                    "ShipName": "Alfred-s Futterkiste",
                    "EmployeeID": 3
                }
            ],
            "Total": 6,
            "AggregateResults": null,
            "Errors": null
        });
        let url = `https://demos.telerik.com/aspnet-core/grid/paging_orders?&pageSize=${pageSize}`;

        if (sort) {
            url += `&sort=${sort}`;
        }
        if (page) {
            url += `&page=${page}`;
        }

        if (filter) {
            url += `&filter=${filter}`;
        }

        console.log(url);
        // fetch(url, {
        //     method: "POST"//,
        //     // headers: { 'Accept': '*/*' }
        // })
        //     .then(resp => {
        //         resp.json()
        //     })
        //     .then(data => {
        //         console.log(data);
        //         // setData(data);
        //     })
        //     .catch(err => {
        //         console.error(err)
        //     });

        if (sort) {
            const splited = sort.split('-');
            setSortDef({
                columnName: splited[0],
                direction: splited[1] === "asc" ? SortDirection.Asceding : SortDirection.Desceding
            });
        }

        if (filter) {
            const splited = filter.split("~eq~");
            setFilterDef({
                column: splited[0],
                filter: splited[1]
            });
        }



    }, [sort, page, pageSize, filter]);

    const onSort = (sortColumDef: TableSortDefinition) => {
        if (sortColumDef.direction) {
            setSort(`${sortColumDef.columnName}-${sortColumDef.direction}`);
        }
        else {
            setSort("")
        }
    }

    return (
        <Grid
            columnsDef={columns}
            data={data.Data}
            totalItems={data.Total}
            onFilter={(column, value) => column && value ? setFilter(`${column}~eq~${value}`) : setFilter("")}
            filterDef={filterDef}
            onSort={onSort}
            sortDef={sortDef}
            pageSize={pageSize}
            onPageSizeChange={pageSize => setPageSize(pageSize)}
            selectedPage={page}
            onPageChange={page => setPage(page)}
        />
    )
};