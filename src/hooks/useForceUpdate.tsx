import React, { useState } from 'react'

export const useForceUpdate = () => {
    const [val, setVal] = useState<boolean>(false);

    return () => setVal(prev => !prev);
};
