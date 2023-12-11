import { useEffect, ReactChild, useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { AppContainer } from './BasePage.styles';
import { userActions } from '../../Domains/user';

type props = {
    children: ReactChild;
};

export function BasePage({ children }: props) {
    const dispatch = useAppDispatch();
    const [height, setHeight] = useState(window.innerHeight);

    function updateHeight() {
        setHeight(window.innerHeight);
    }

    useEffect(() => {
        const token = window.localStorage.getItem('@NOW_MENU/user/token');
        dispatch(userActions.setLogged(!!token));
    }, [dispatch]);

    useEffect(() => {
        window.addEventListener('resize', updateHeight);
        return function cleanUp() {
            window.removeEventListener('resize', updateHeight);
        };
    }, []);

    return <AppContainer heightProp={height}>{children}</AppContainer>;
}
