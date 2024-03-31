import { useDispatch, useSelector } from 'react-redux';
import Button from './Button';
import style from './FilterButtons.module.css';
import { setFilter } from '../store/slices/filterSlice';

function FilterButtons() {
	const filter = useSelector((state) => state.filter);
	const dispatch = useDispatch();

	return (
		<div className={style.filterBtnContainer}>
			<p>Show:</p>
			<Button
				className={`${style.filterBtn} ${
					filter === 'ALL' ? style.filterBtnActive : ''
				}`}
				type="button"
				onClick={() => {
					console.log('ALL');
					dispatch(setFilter('ALL'));
				}}
			>
				All
			</Button>
			<Button
				className={`${style.filterBtn} ${
					filter === 'ACTIVE' ? style.filterBtnActive : ''
				}`}
				type="button"
				onClick={() => {
					console.log('ACTIVE');
					dispatch(setFilter('ACTIVE'));
				}}
			>
				Active
			</Button>
			<Button
				className={`${style.filterBtn} ${
					filter === 'COMPLETED' ? style.filterBtnActive : ''
				}`}
				type="button"
				onClick={() => {
					console.log('COMPLETED');
					dispatch(setFilter('COMPLETED'));
				}}
			>
				Completed
			</Button>
		</div>
	);
}

export default FilterButtons;
