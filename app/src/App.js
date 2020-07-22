import React, { useState } from "react";
import logo from "./logo.svg";
import Node from "./Node";
import "./App.css";

let startNodes = [
	{
		name: "folder1",
		type: "folder",
		parent: 0,
		id: 1,
	},
	{
		name: "folder2",
		type: "folder",
		parent: 0,
		id: 2,
		children: [
			{
				name: "file2.txt",
				type: "file",
				parent: 2,
				id: 4,
			},
			{
				name: "file3.txt",
				type: "file",
				parent: 2,
				id: 5,
			},
			{
				name: "folder3",
				type: "folder",
				parent: 2,
				id: 6,
				children: [
					{
						name: "file4.txt",
						type: "file",
						parent: 6,
						id: 7,
					},
					{
						name: "file5.txt",
						type: "file",
						parent: 6,
						id: 8,
					},
				],
			},
		],
	},
	{
		name: "file1.txt",
		type: "file",
		parent: 1,
		id: 0,
	},
];

function App() {
	const [nodes, setNodes] = useState(startNodes);

	const deleteLoop = (id, nodeList = nodes) => {
		let newNodes = nodeList.filter((node) => {
			if (node.children) {
				node.children = deleteLoop(id, node.children);
			}
			if (node.id !== id) {
				return node;
			}
		});

		return newNodes;
	};
	const deleteNode = (id) => {
		setNodes(deleteLoop(id));
	};

	return (
		<div className="App">
			<div className="sidebar">
				{nodes.map((node, index) => (
					<Node
						key={index}
						info={node}
						depth={1}
						deleteNode={(id) => deleteNode(id)}
					></Node>
				))}
			</div>
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.js</code> and save to reload.
				</p>
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
				</a>
			</header>
		</div>
	);
}

export default App;
