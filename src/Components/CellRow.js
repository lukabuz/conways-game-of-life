import React from 'react';
import Cell from './Cell'

const CellRow = (props) => {
	return (
        props.row.map((cell) => {
            return(
                <Cell handleClick={props.handleClick} cell={cell}></Cell>
            );
        })		
	);
}

export default CellRow;