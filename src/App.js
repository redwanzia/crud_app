import React, { useState, useEffect } from 'react';
import List from './List';
import Alert from './Alert';

const getLocalStorage = () => {
	let list = localStorage.getItem('list');
	if (list) {
		return JSON.parse(list);
	} else {
		return [];
	}
};

function App() {
	const [ inputItem, setInputItem ] = useState('');
	const [ list, setList ] = useState(getLocalStorage());
	const [ isEditing, setIsEditing ] = useState(false);
	const [ editID, setEditID ] = useState(null);
	const [ alert, setAlert ] = useState({ show: false, type: '', msg: '' });

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!inputItem) {
			showAlert(true, 'danger', 'Please enter value');
		} else if (inputItem && isEditing) {
			setList(
				list.map((item) => {
					if (item.id === editID) {
						return { ...item, title: inputItem };
					}
					return item;
				})
			);
			setInputItem('');
			setEditID(null);
			setIsEditing(false);
			showAlert(true, 'success', 'value changed');
		} else {
			showAlert(true, 'success', 'item added to the list');
			const newListItem = { id: new Date().getTime().toString(), title: inputItem };
			setList([ ...list, newListItem ]);
			setInputItem('');
		}
	};

	const showAlert = (show = false, type = '', msg = '') => {
		setAlert({ show, type, msg });
	};
	const clearList = () => {
		showAlert(true, 'danger', 'empty list');
		setList([]);
	};

	const removeItem = (id) => {
		showAlert(true, 'danger', 'item remove');
		setList(list.filter((item) => item.id !== id));
	};

	const editItem = (id) => {
		const specificItems = list.find((item) => item.id === id);
		setIsEditing(true);
		setEditID(id);
		setInputItem(specificItems.title);
	};

	useEffect(
		() => {
			localStorage.setItem('list', JSON.stringify(list));
		},
		[ list ]
	);

	return (
		<section className='section-center'>
			<form className='grocery-form' onSubmit={handleSubmit}>
				{alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
				<h3>CRUD list</h3>
				<div className='form-control'>
					<input
						className='grocery'
						type='text'
						placeholder='e.g. eggs'
						value={inputItem}
						onChange={(e) => setInputItem(e.target.value)}
					/>
					<button type='submit' className='submit-btn'>
						{isEditing ? 'edit' : 'submit'}
					</button>
				</div>
			</form>
			{list.length > 0 && (
				<div className='grocery-container'>
					<List lists={list} removeItem={removeItem} editItem={editItem} />
					<button className='clear-btn' onClick={clearList}>
						clear item
					</button>
				</div>
			)}
		</section>
	);
}

export default App;
