import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
const List = ({ lists }) => {
	return (
		<div className='grocery-list'>
			{lists.map((list) => {
				const { ud, title } = list;
				return (
					<article key className='grocery-item'>
						<p className='title'>{title}</p>
						<div className='btn-container'>
							<button type='button' className='edit-btn'>
								<FaEdit />
							</button>
							<button type='button' className='delete-btn'>
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
