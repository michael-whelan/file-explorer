import React, { useState } from "react";
import styled from "styled-components";
import arrowClosed from "./icons/icon-arrow-right.png";
import arrowOpen from "./icons/icon-arrow-down.png";
import bin from "./icons/bin.png";

const NodeElem = styled.div`
	display: block;
	color: white;
	padding: 1px;
	text-align: left;
	margin-left: 20px;
`;

const Arrow = styled.img`
	float: left;
`;
const Delete = styled.img`
	position: relative;
	width: 20px;
	top: 3px;
`;

const Title = styled.span`
	display: inline-block;
`;

const renderChildren = (children, currentDepth, deleteNode) => {
	return children.map((node, index) => (
		<Node
			key={index}
			info={node}
			depth={currentDepth + 1}
			deleteNode={deleteNode}
		></Node>
	));
};

const Node = ({
	info: { name, type, parent, id, children },
	depth,
	deleteNode,
}) => {
	const [open, setOpen] = useState(false);

	return (
		<div>
			{children &&
				children.length > 0 &&
				(open ? (
					<Arrow src={arrowOpen} onClick={() => setOpen(!open)} />
				) : (
					<Arrow src={arrowClosed} onClick={() => setOpen(!open)} />
				))}
			<NodeElem>
				<Title>{name}</Title>
				<Delete src={bin} onClick={() => deleteNode(id)} />
				{open &&
					children &&
					renderChildren(children, depth, deleteNode)}
			</NodeElem>
		</div>
	);
};

export default Node;
