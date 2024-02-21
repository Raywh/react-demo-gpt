import './ChatList.css';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';

export default function ChatList ({ listArr }) {

	const listItems = listArr.map(item => {
		return (
			<div className='list-item'>
				<div className='title-box'>
					<AccountCircleSharpIcon />
					<span className='title'>{item.title}</span>
				</div>

				<div className='description'>
					{item.description}
				</div>
			</div>
		)
	}
	);


	return <div className='list-box'>{listItems}</div>;
}
