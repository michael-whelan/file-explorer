import React, { useState } from "react";
import styled, { css } from "styled-components";
import arrowClosed from "../icons/icon-arrow-right.png";
import arrowOpen from "../icons/icon-arrow-down.png";
import bin from "../icons/bin.png";
import fileIcon from "../icons/icon-file.png";
import folderIcon from "../icons/icon-folder.png";

const NodeElem = styled.div`
	display: block;
	color: white;
	margin: 8px;
	text-align: left;
	margin-left: 10px;
	${(props) =>
		props.selected &&
		css`
			color: cornflowerblue;
		`}
`;

const Arrow = styled.img`
	float: left;
	position: absolute;
`;
const Delete = styled.img`
	position: absolute;
	width: 20px;
`;

const TypeIcon = styled.img`
	position: absolute;
	margin-left: 2vw;
	width: 18px;
`;

const Title = styled.span`
	display: inline-block;
	margin-left: 4vw;
`;

const TitleEdit = styled.input`
	display: inline-block;
	margin-left: 4vw;
`;

const renderChildren = (
	children,
	deleteNode,
	renameNode,
	moveNode,
	selectedNodeId
) => {
	return children.map((node, index) => (
		<Node
			key={index}
			info={node}
			deleteNode={deleteNode}
			renameNode={renameNode}
			moveNode={moveNode}
			selectedNodeId={selectedNodeId}
		></Node>
	));
};

const Node = ({
	info: { name, type, parent, id, children },
	deleteNode,
	renameNode,
	moveNode,
	selectedNodeId,
}) => {
	const [open, setOpen] = useState(false);
	const [editMode, setEditMode] = useState(false);

	const rename = ({ target: { value } }) => {
		renameNode(id, value);
		setEditMode(false);
	};

	return (
		<NodeElem selected={selectedNodeId === id ? true : ""}>
			{children.length > 0 &&
				(open ? (
					<Arrow src={arrowOpen} onClick={() => setOpen(!open)} />
				) : (
					<Arrow src={arrowClosed} onClick={() => setOpen(!open)} />
				))}
			{type === "folder" ? (
				<TypeIcon
					onClick={() => moveNode(id)}
					src={folderIcon}
				/>
			) : (
				<TypeIcon onClick={() => moveNode(id)} src={fileIcon} />
			)}
			{editMode ? (
				<TitleEdit onBlur={rename} defaultValue={name}></TitleEdit>
			) : (
				<Title onClick={() => setEditMode(!editMode)}>{name}</Title>
			)}

			<Delete src={bin} onClick={() => deleteNode(id)} />
			{open &&
				children.length > 0 &&
				renderChildren(
					children,
					deleteNode,
					renameNode,
					moveNode,
					selectedNodeId
				)}
		</NodeElem>
	);
};

export default Node;
