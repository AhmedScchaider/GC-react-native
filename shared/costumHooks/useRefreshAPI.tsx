import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';

export default function useRefreshAPI(requestedDispatch: any) {
	const dispatch = useDispatch<AppDispatch>();
	const [isRefresh, setIsRefresh] = useState(false);

	useEffect(() => {
		dispatch(requestedDispatch()).then(() => {
			setIsRefresh(true);
		});
		return () => {
			setIsRefresh(false)
		};
	}, [])
	useEffect(() => {
		if (isRefresh == true) {
			setTimeout(() => {
				setIsRefresh(false);
				dispatch(requestedDispatch()).then(() => {
					setIsRefresh(true);
				});
			}, 20000);
		}

		return () => {
			setIsRefresh(false)
		};
	}, [isRefresh])
	return isRefresh;
}

