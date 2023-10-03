import { use, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCalculator } from '@/redux/features/calculatorSlice';

import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Skeleton } from 'primereact/skeleton';
import { Divider } from 'primereact/divider';

const CalculatorContainer = () => {
	const { calculatorNodeData, calculatorEdgeData } = useSelector(selectCalculator);
	function nestNodesEdges(nodes, edges) {
		nodes.forEach((node) => {
			node.children = [];
			node.edges = [];
			const nodeEdges = edges.filter((edge) => edge.source === node.id);

			nodeEdges.forEach((edge) => {
				if (edge.target) {
					const childNode = nodes.find((node) => node.id === edge.target);
					if (childNode) {
						node.children.push(childNode);
					}
					node.edges.push(edge);
				}
			});
		});
		const rootNode = nodes.find((node) => node.start === true);

		return rootNode;
	}

	useEffect(() => {
		if (calculatorNodeData) {
			const nodes = JSON.parse(JSON.stringify(calculatorNodeData));
			const edges = JSON.parse(JSON.stringify(calculatorEdgeData));
			const rootNode = nestNodesEdges(nodes, edges);
			setCurrentCalc(rootNode);

			setQuestions([{ id: rootNode.id, question: rootNode.value, selected: null, options: rootNode.edges }]);
		}
	}, [calculatorNodeData]);

	const [currentCalc, setCurrentCalc] = useState(null);
	const [selectedResult, setSelectedResult] = useState(null);

	const [questions, setQuestions] = useState<any>([]);

	const questionsArray = [
		{ id: 0, value: null },
		{ id: 1, value: 'Which system?' },
		{ id: 2, value: 'Choose size' },
	];

	const resultLink = () => {
		return (
			<div className="flex w-content-max p-4 border-1 border-round border-blue-700 border-2 bg-white">
				<div className="border-1 border-blue-200 border-2 border-round">
					<img
						src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
						alt=""
						width={150}
					/>
				</div>
				<div className="align-self-center px-5">
					<p className="font-bold ">{selectedResult.value}</p>
					<p className=" text-gray-500 text-sm">Description</p>
					<button className="p-button">Buy</button>
				</div>
			</div>
		);
	};

	const questionFields = () => {
		return (
			<>				
			{(questions || []).map((el, key) => {
					return (
						<div
							className="field grid"
							key={key}>
							<label
								htmlFor={key}
								className="col-fixed font-bold	"
								style={{ width: '40%' }}>
								{questionsArray.find((qu) => qu.id == el.id)?.value ? questionsArray[el.id].value : el.question}
							</label>
							<div className="col">
								<Dropdown
									value={el.selected}
									onChange={(e) => onSelectOption(e.value, key)}
									options={el.options}
									optionLabel="value"
									optionValue="id"
									placeholder="Select"
									className="w-full"
								/>
							</div>
						</div>
					);
				})}
				<Divider />
			</>
		);
	};

	const skeleton = () => {
		return (
			<div className="flex flex-column h-full justify-content-between">
				<div>
					{Array.from({ length: 4 }).map((_, index) => {
						return (
							<Skeleton
								key={index}
								width="100%"
								height="3rem"
								className="mb-3"></Skeleton>
						);
					})}
				</div>
				<div>
					<Skeleton
						width="100%"
						height="15rem"></Skeleton>
				</div>
			</div>
		);
	};

	const selectNodeData = (layer, selected) => {
		let currentLayer = currentCalc;
		for (let i = 0; i < layer + 1; i++) {
			const edgeId = i === layer ? selected : questions[i].selected;
			const edge = currentLayer.edges.find((el) => el.id === edgeId);
			const childNode = currentLayer.children.find((child) => child.id === edge.target);
			currentLayer = childNode;
			if (i === layer) {
				break;
			}
		}
		return currentLayer;
	};

	const onSelectOption = (value, idx) => {
		setSelectedResult(null); // clear result link

		const updatedQuestions = [...questions]; // copy questions array
		updatedQuestions[idx].selected = value; // set selected value

		const nodeData = selectNodeData(idx, value); // get node data

		if (idx === 0) {
			// if first question
			let newQuestions = generateQuestions(nodeData);
			if (newQuestions) {
				setQuestions([...[updatedQuestions[0]], ...newQuestions]);
			} else {
				setQuestions([updatedQuestions[0]]);
				setSelectedResult(nodeData);
			}
		} else {
			if (idx < questions.length - 1) {
				// if not last question
				updatedQuestions[idx + 1].options = nodeData.edges; // set options
			} else {
				// set result
				setSelectedResult(nodeData);
			}
			setQuestions(updatedQuestions); // update questions
		}
	};

	const generateQuestions = (nodeData) => {
		let currentQuestions = [{ id: 2, selected: null, options: [] }];

		if (nodeData.edges.length === 0) {
			return null;
		} else if (nodeData.value !== questionsArray[2].value) {
			currentQuestions = [...[{ id: 1, selected: null, options: nodeData.edges }], ...currentQuestions];
		} else {
			currentQuestions[0].options = nodeData.edges;
		}

		return currentQuestions;
	};

	return (
		<div className="flex flex-column h-full justify-content-between">
			{!calculatorNodeData ? (
				skeleton()
			) : (
				<>
					<div>
					{questionFields()}

					</div>
					<div>
					{selectedResult ? resultLink() : null}

					</div>
				</>
			)}
		</div>
	);
};

export default CalculatorContainer;
