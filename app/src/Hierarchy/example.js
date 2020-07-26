export const getFLatNodes = () => {
	return [
		{
			name: "folder1",
			type: "folder",
			parentId: 0,
			id: 1,
			children: null,
		},
		{
			name: "folder2",
			type: "folder",
			parentId: 0,
			id: 2,
			children: null,
		},
		{
			name: "folder3",
			type: "folder",
			parentId: 2,
			id: 6,
			children: null,
		},
		{
			name: "file2.txt",
			type: "file",
			parentId: 2,
			id: 4,
			children: null,
		},
		{
			name: "file3.txt",
			type: "file",
			parentId: 2,
			id: 5,
			children: null,
		},
		{
			name: "file1.txt",
			type: "file",
			parentId: 1,
			id: 9,
			children: null,
		},
		{
			name: "file5.txt",
			type: "file",
			parentId: 6,
			id: 7,
			children: null,
		},
		{
			name: "file4.txt",
			type: "file",
			parentId: 6,
			id: 8,
			children: null,
		},
	];
};
