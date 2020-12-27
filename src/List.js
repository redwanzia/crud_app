import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
const List = ({ lists, removeItem, editItem }) => {
	return (
		<div className='grocery-list'>
			{lists.map((list) => {
				const { id, title } = list;
				return (
					<article key={id} className='grocery-item'>
						<p className='title'>{title}</p>
						<div className='btn-container'>
							<button type='button' className='edit-btn' onClick={() => editItem(id)}>
								<FaEdit />
							</button>
							<button type='button' className='delete-btn' onClick={() => removeItem(id)}>
								<FaTrash />
							</button>
						</div>
					</article>
				);
			})}
		</div>
	);
};

export default List;
