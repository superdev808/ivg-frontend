import React, { DragEvent, useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import styles from './Editor.module.scss';
import { useSelector } from 'react-redux';
import { setSelectedNode, editorState } from '@/redux/features/editorSlice';
import { useDispatch } from 'react-redux';

import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Editor, EditorTextChangeEvent } from 'primereact/editor';
import { useDebounce } from 'primereact/hooks';
import { InputTextarea } from 'primereact/inputtextarea';

const EditSideBarComponent = () => {
	const dispatch = useDispatch();
	const { selectedNode } = useSelector(editorState);
	const [selectedTitle, debouncedTitle, setSelectedTitle] = useDebounce('', 400);
	const [text, setText] = useState('');

	const [rawHtml, setRawHtml] = useState('');
	const [showRaw, setShowRaw] = useState(false);

	const [currentView, setCurrentView] = useState('new');

	const onDragStart = (event: DragEvent<HTMLButtonElement>, dataType: string) => {
		let element = document.createElement('div');
		element.setAttribute('id', 'drag-ghost');

		element.innerHTML = `<div class=" border-round border-1 border-green-500 p-2  text-xs text-green-500 w-8rem flex justify-content-center bg-white">${dataType}</div>`;
		element.style.position = 'absolute';
		element.style.top = '0';
		element.style.zIndex = '-1';
		document.body.appendChild(element);

		event.dataTransfer.setDragImage(element, 0, 0);

		event.dataTransfer.setData('application/reactflow/type', 'custom');
		event.dataTransfer.setData('application/reactflow/dataType', dataType);
		event.dataTransfer.effectAllowed = 'move';
	};
	const onDragEnd = () => {
		const element = document.getElementById('drag-ghost');
		element?.remove();
	};

	useEffect(() => {
		if (selectedNode) {
			
			setCurrentView('edit');
			onNodeSelect();
		} else {
			setCurrentView('new');
		}
	}, [selectedNode]);

	useEffect(() => {
		if (selectedNode) {
			dispatch(setSelectedNode({ ...selectedNode, data: { ...selectedNode.data, label: debouncedTitle } }))
		}
	}, [debouncedTitle]);


	const onNodeSelect = () => {
		setShowRaw(false);

		setSelectedTitle(selectedNode.data.label);

	};



	const syncViews = () => {
		setShowRaw(!showRaw);
		if (!showRaw) {
			if (text) {
				setRawHtml(text);
			} else setRawHtml('');
		} else {
			setText(rawHtml);
		}
	};
	const renderHeader = () => {
		return (
			<>
				<select
					defaultValue=""
					className="ql-size">
					<option value="small"></option>
					<option value="large"></option>
					<option value="huge"></option>
				</select>

				<button className="ql-bold"></button>
				<button
					className="ql-script"
					value="sub"></button>
		
					<button className="ql-list" value="ordered" type="button"></button>
					<button className="ql-list" value="bullet" type="button"></button>
				<button
					className="ql-image"></button>
				<button
					className="ql-video"></button>
				<button onClick={syncViews}>
					<i className="pi pi-code showRawIcon"></i>
				</button>
			</>
		);
	};

	const header = renderHeader();
	
	const editView = () => {
		const fieldTypes = [
			{ name: 'Text', code: 'Text' },
			{ name: 'Link', code: 'Link' },
			{ name: 'Image', code: 'Image' },
			{ name: 'Video', code: 'Video' },
		];
		return (
			<>
				<div className="text-gray-700 mb-4">
					<label className="text-xl font-bold">Update Node</label>
				</div>
				<div className="flex flex-wrap justify-content-start">
				
					<div className="field w-full">
						<label>Label</label>
						<InputTextarea className={'w-full white-space-normal'} autoResize={true}  value={selectedTitle} onChange={(e) => setSelectedTitle(e.target.value)} rows={5} cols={30} />

						</div>
					<div className="field w-full">
						<label>Description</label>
						<div className={'w-full ' + (showRaw ? 'showRaw' : '')}>
							<Editor
								value={text}
								onTextChange={(e: EditorTextChangeEvent) => setText(e.htmlValue)}
								headerTemplate={header}
								style={{ height: '20rem' }}
							/>

							<textarea
								className={'raw-editor '}
								onChange={(e) => setRawHtml(e.target.value)}
								value={rawHtml}
							/>
						</div>
					</div>
				</div>
			</>
		);
	};

	const newView = () => {
		return (
			<>
				<div className="text-gray-700">
					<h4>Add New Node</h4>
				</div>
				<div className="flex flex-wrap justify-content-start">
					<Button
						className={styles['new-node-button']}
						outlined
						draggable
						onDragStart={(event: DragEvent<HTMLButtonElement>) => onDragStart(event, 'Text')}
						onDragEnd={onDragEnd}>
						<i className="pi pi-align-justify"></i>
						<span className="mt-2">Text</span>
					</Button>
					<Button
						className={styles['new-node-button']}
						outlined
						draggable
						onDragStart={(event: DragEvent<HTMLButtonElement>) => onDragStart(event, 'Link')}
						onDragEnd={onDragEnd}>
						<i className="pi pi-link"></i>
						<span className="mt-2">Link</span>
					</Button>
					<Button
						className={styles['new-node-button']}
						outlined
						draggable
						onDragStart={(event) => onDragStart(event, 'Image')}
						onDragEnd={onDragEnd}>
						<i className="pi pi-image"></i>
						<span className="mt-2">Image</span>
					</Button>
					<Button
						className={styles['new-node-button']}
						outlined
						draggable
						onDragStart={(event) => onDragStart(event, 'Video')}
						onDragEnd={onDragEnd}>
						<i className="pi pi-video"></i>
						<span className="mt-2">Video</span>
					</Button>
				</div>
			</>
		);
	};


	const workflowSelectionView = () => {

		return (
			<>
				<InputText className="w-full" placeholder="Search Guides" />
			</>

		)
	}
	return <aside className="mx-6">
		
		
		{/* {workflowSelectionView()} */}
		{currentView === 'new' ? newView() : editView()}

	
		
		
		</aside>;
};

export default EditSideBarComponent;
