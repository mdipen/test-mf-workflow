import * as React from 'react';

export const useScrollHandler: any = () => {
    const [scroll, setScroll] = React.useState<boolean>(false);

    React.useEffect(() => {
        const onScroll = () => {
            const scrollCheck = window.scrollY > 54;
            setScroll(scrollCheck);
        };

        document.addEventListener('scroll', onScroll);
        return () => {
            document.removeEventListener('scroll', onScroll);
        };
    }, [scroll, setScroll]);

    return scroll;
};
