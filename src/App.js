import React, { useState, useEffect } from 'react';
import List from './List';
import Alert from './Alert';

function App() {
	const [ inputItem, setInputItem ] = useState('');
	const [ list, setList ] = useState([]);
	const [ isEditing, setIsEditing ] = useState(false);
	const [ editId, setEditId ] = useState(null);
	const [ alert, setAlert ] = useState({ show: false, msg: '', type: '' });

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!inputItem) {
			// handle alert
		} else if (inputItem && isEditing) {
			// handle edit
		} else {
			const newListItem = { id: new Date().getTime().toString(), title: inputItem };
			setList([ ...list, newListItem ]);
			setInputItem('');
		}
	};

	return (
		<section className='section-center' onClick={handleSubmit}>
			<form className='grocery-form'>
				{alert.show && <Alert />}
				<h3>CRUD list</h3>
				<div className='form-control'>
					<input className='' type='text' value={inputItem} onChange={(e) => setInputItem(e.target.value)} />
					<button type='submit' className='submit-btn'>
						{isEditing ? 'edit' : 'submit'}
					</button>
				</div>
			</form>
			{list.length > 0 && (
				<div className='grocery-container'>
					<List lists={list} />
					<button className='clear-btn'>clear item</button>
				</div>
			)}
		</section>
	);
}

export default App;
