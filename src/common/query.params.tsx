import * as React from 'react';
import { useLocation } from 'react-router';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}
