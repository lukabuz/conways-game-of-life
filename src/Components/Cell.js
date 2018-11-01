import React from 'react';

const Cell = (props) => {
	return (
		<div onClick={ () => props.handleClick(props.cell)} className={props.cell.alive ? 'active' : null}></div>
	);
}

export default Cell;