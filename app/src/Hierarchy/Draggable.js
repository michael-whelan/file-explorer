import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";

const DragPreview = styled.div`
	color: black;
	background-color:white;
	position: absolute;
	margin-left: 10px;
	border-radius:10px;
	padding:3px;
	opacity:50%;
	${(props) =>
		css`
			left: ${props.xPos}px;
			top: ${props.yPos}px;
		`}
`;
const Draggable = ({ name }) => {
	let position = { x: 0, y: 0 };

	const [pos, setPos] = useState({ x: 0, y: 0 });

	useEffect(() => {
		document.addEventListener("mousemove", handleMouseMove);
	}, []);

	const handleMouseMove = (e) => {
		setPos({ x: e.clientX, y: e.clientY });
		e.stopPropagation();
		e.preventDefault();
	};

	return (
		<DragPreview xPos={pos.x} yPos={pos.y}>
			{name}
		</DragPreview>
	);
};

export default Draggable;
