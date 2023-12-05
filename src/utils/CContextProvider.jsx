import React, { useState, createContext } from "react";
import PropTypes from "prop-types";

export const CContext = createContext();

const CContextProvider = ({ children }) => {
    const [state, setState] = useState(null);

    const contextValue = {
        state,
        setState
    };

    return (
        <CContext.Provider value={contextValue}>{children}</CContext.Provider>
    );
};

CContextProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export default CContextProvider;
