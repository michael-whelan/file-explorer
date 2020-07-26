import React, { useEffect, useState } from "react";
import Node from "./Node";
import { getFLatNodes } from "./example";

const listToTree = (list) => {
	const map = {},
		roots = [];
	let node;
	for (let i = 0; i < list.length; ++i) {
		map[list[i].id] = i;
		list[i].children = [];
	}

	for (let i = 0; i < list.length; ++i) {
		node = list[i];
		if (node.parentId !== 0) {
			list[map[node.parentId]].children.push(node);
			sortTree(list[map[node.parentId]].children);
		} else {
			roots.push(node);
		}
	}
	return roots;
};

const sortTree = (nodeList) => {
	nodeList.sort(function (a, b) {
		if (a.type === b.type) {
			if (a.name < b.name) {
				return -1;
			}
			if (a.name > b.name) {
				return 1;
			}
		} else {
			if (a.type === "folder") {
				return -1;
			}
			if (a.type === "file") {
				return 1;
			}
		}
		return 0;
	});
	return nodeList;
};

function flatten(arr) {
	return arr
		? arr.reduce(
				(result, item) => [
					...result,
					{
						name: item.name,
						type: item.type,
						parentId: item.parentId,
						id: item.id,
						children: null,
					},
					...flatten(item.children),
				],
				[]
		  )
		: [];
}
const startNodes = listToTree(getFLatNodes());

const Hierarchy = () => {
	const [state, setState] = useState({
		selectedNodeId: null,
		nodes: sortTree(startNodes),
	});

	const deleteLoop = (id, nodeList = state.nodes) => {
		let newNodes = nodeList.filter((node) => {
			if (node.children.length > 0) {
				node.children = deleteLoop(id, node.children);
			}
			if (node.id !== id) {
				return node;
			}
		});
		return newNodes;
	};

	const updateNodeAttrib = (
		id,
		keyChange,
		newVal,
		nodeList = state.nodes
	) => {
		nodeList.some((node) => {
			if (node.id === id) {
				node[keyChange] = newVal;
				nodeList = sortTree(nodeList);
				return true;
			}
			updateNodeAttrib(id, keyChange, newVal, node.children);
		});

		return nodeList;
	};

	const checkValidMove = (toId, moveId, flat) => {
		let node = flat.filter((elem) => elem.id === toId)[0];
		if (node.parentId === 0) {
			return true;
		} else if (node.parentId === moveId) {
			return false;
		}
		return checkValidMove(node.parentId, moveId, flat);
	};

	const moveNode = (id) => {
		if (state.selectedNodeId) {
			if (
				state.selectedNodeId !== id &&
				checkValidMove(id, state.selectedNodeId, flatten(state.nodes))
			) {
				const newNodes = updateNodeAttrib(
					state.selectedNodeId,
					"parentId",
					id
				);
				setState({
					nodes: sortTree(listToTree(flatten(newNodes))),
					selectedNodeId: null,
				});
			} else {
				setState({
					...state,
					selectedNodeId: null,
				});
			}

			return;
		}
		setState({
			...state,
			selectedNodeId: id,
		});
	};

	return (
		<div className="sidebar">
			{state.nodes.map((node, index) => (
				<Node
					key={index}
					info={node}
					deleteNode={(id) =>
						setState({ ...state, nodes: deleteLoop(id) })
					}
					renameNode={(id, name) =>
						setState({
							...state,
							nodes: sortTree(updateNodeAttrib(id, "name", name)),
						})
					}
					moveNode={(id) => moveNode(id)}
					selectedNodeId={state.selectedNodeId}
				></Node>
			))}
		</div>
	);
};

export default Hierarchy;
