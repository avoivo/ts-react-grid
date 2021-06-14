import React from "react";
import * as Icon from "react-icons/fi";

export enum SortDirection {
  Asceding = "asc",
  Desceding = "desc"
}

export interface TableColumnDefinition {
  text: string;
  name: string;
  sortable?: boolean;
  filterable?: boolean;
};

export interface TableSortDefinition {
  columnName: string;
  direction?: SortDirection;
}

export interface TableProps {
  columns: TableColumnDefinition[];
  sortDef?: TableSortDefinition;
  data: any[];
  onSort?: (sortDef: TableSortDefinition) => void;
};

export const Table = (props: TableProps): JSX.Element => {

  const getSortImage = (direction: SortDirection | undefined) => {
    if (direction === SortDirection.Asceding) {
      return <Icon.FiChevronDown></Icon.FiChevronDown>;
    } else if (direction === SortDirection.Desceding) {
      return <Icon.FiChevronUp></Icon.FiChevronUp>;
    } else {
      return <Icon.FiMinus></Icon.FiMinus>;
    }

  }

  const onSort = (sortedColumn: TableColumnDefinition) => {

    if (props.onSort) {

      const sortDef = (props.sortDef && props.sortDef.columnName === sortedColumn.name)
        ? props.sortDef : { columnName: sortedColumn.name };

      if (sortDef.direction === SortDirection.Asceding) {
        sortDef.direction = SortDirection.Desceding
      } else if (sortDef.direction === SortDirection.Desceding) {
        sortDef.direction = undefined;
      } else {
        sortDef.direction = SortDirection.Asceding;
      }

      props.onSort(
        sortDef
      );
    }
  }

  const getHeader = (columnConfig: TableColumnDefinition, key: React.Key) => {
    if (!columnConfig) {
      return <th key={key}></th>;
    }


    if (columnConfig.sortable) {

      return <th key={key}>
        <div className="d-flex align-items-stretch" onClick={e => onSort(columnConfig)}>
          <div className="flex-fill">
            {columnConfig.text}
          </div>
          <div className="align-self-center">
            {
              props.sortDef && props.sortDef.columnName === columnConfig.name
                ? getSortImage(props.sortDef.direction)
                : getSortImage(undefined)
            }
          </div>

        </div>
      </th>;
    }

    return <th key={key}>{columnConfig.text}</th>;
  };

  return (
    <div className="table-responsive">
      <table className="table table-striped table-sm">
        <thead>
          <tr>
            {props?.columns?.map(getHeader)}
          </tr>
        </thead>
        <tbody>
          {props?.data?.map((r, i) => (
            <tr key={i}>
              {props?.columns?.map((c, j) => {
                return <td key={j}>{r[c.name]}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


