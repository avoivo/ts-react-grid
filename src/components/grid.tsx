import { useState, useEffect, useCallback } from "react";
import _ from "lodash";
import { Pagination } from "./pagination";
import { Table, TableColumnDefinition, TableSortDefinition } from "./table";


import styles from './grid.module.css';


export interface FilterDefinition {
    column?: string;
    filter?: string;
}

interface GridProps {
    columnsDef: TableColumnDefinition[];
    sortDef?: TableSortDefinition;
    data: any[];
    totalItems: number;
    onSort: (sortDef: TableSortDefinition) => void;
    onFilter: (column: string | undefined, value: string | undefined) => void;
    filterDef: FilterDefinition
    onPageSizeChange: (pageSize: number) => void;
    pageSize: number;
    onPageChange: (page: number) => void;
    selectedPage: number;
}

export const Grid = (props: GridProps): JSX.Element => {

    const [filterColumn, setFilterColumn] = useState<string>("");
    const [filterValue, setFilterValue] = useState<string>("");

    useEffect(() => {
        setFilterColumn(props.filterDef.column ?? "");
    }, [props.filterDef.column]);

    useEffect(() => {
        setFilterValue(props.filterDef.filter ?? "");
    }, [props.filterDef.filter]);


    // eslint-disable-next-line
    const debouncedFilterCallback = useCallback(_.debounce(props.onFilter, 500), []);

    useEffect(() => {
        debouncedFilterCallback(filterColumn, filterValue);
    }, [debouncedFilterCallback, filterColumn, filterValue]);

    const selectedPage = props.selectedPage ?? 1;

    const itemFrom = ((selectedPage - 1) * props.pageSize) + 1;


    let itemTo = selectedPage * props.pageSize;
    itemTo = itemTo > props.totalItems ? props.totalItems : itemTo;
    const pageCount = props.totalItems / props.pageSize + 1;

    return <>
        <div className="input-group">
            <select className="form-select" value={filterColumn} onChange={e => setFilterColumn(e.target.value)}>
                <option value=""></option>
                {props.columnsDef.filter(_ => _.filterable).map(_ => <option value={_.name} key={_.name}>{_.text}</option>)}
            </select>
            <input value={filterValue} type="text" className="form-control" onChange={e => setFilterValue(e.target.value)}></input>
        </div>

        <Table columns={props.columnsDef} sortDef={props.sortDef} data={props.data} onSort={props.onSort}></Table>
        <div className="d-flex flex-row justify-content-start align-items-baseline">

            <Pagination pageCount={pageCount} selectedPage={props.selectedPage} onClick={props.onPageChange}></Pagination>

            <select className={`form-select flex-shring-1 ${styles.totalPagesSelect}`} value={props.pageSize} onChange={e => props.onPageSizeChange(+e.target.value)}>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
            </select>
            <span>Items per page</span>
            <span className="flex-fill"></span>
            <span>{itemFrom}-{itemTo} of {props.totalItems}</span>

        </div>

    </>;
}