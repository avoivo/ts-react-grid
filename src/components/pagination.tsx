import React from 'react';

import styles from './pagination.module.css';

interface PaginationProps {
    selectedPage: number;
    pageCount: number;
    onClick?: (page: number) => void
};

export const Pagination = (props: PaginationProps): JSX.Element => {
    const items = []

    for (let i = 1; i <= props.pageCount; i++) {
        items.push(<li className="page-item" key={i}>
            <button
                className="page-link"
                onClick={() => props.onClick && props.onClick(i)}
            >{i}</button>
        </li>)
    }

    return (
        <nav>
            <ul className={`pagination ${styles.pagination}`}>
                {items}
            </ul>
        </nav>
    )
}