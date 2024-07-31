import { createContext, useState } from "react";
import PropTypes from "prop-types";
import run from "../Config/config";

// Create the context
export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [input, setInput] = useState("");
  const [resultData, setResultData] = useState("");

  const onSent = async (prompt) => {
    try {
      const response = await run(prompt);
      setResultData(response);
    } catch (error) {
      console.error(error);
    }
  };

  // Providing context values
  const contextValue = {
    input,
    setInput,
    resultData,
    onSent,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};
ContextProvider.propTypes = {
  children: PropTypes.node.isRequired, // Validate that children is a React node
};

export default ContextProvider;
