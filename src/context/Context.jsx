import { createContext, useState } from "react";
import PropTypes from "prop-types";
import run from "../Config/config";

// Create the context
export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [input, setInput] = useState("");
  const [resultData, setResultData] = useState("");
  //loading data
  const [isLoading, setLoading] = useState(false);

  const onSent = async (prompt) => {
    setLoading(true);
    try {
      const response = await run(prompt);
      setResultData(response);
    } catch (error) {
      console.error(error);
    }
    finally {
      setLoading(false);
    }
  };

  // Providing context values
  const contextValue = {
    input,
    setInput,
    resultData,
    onSent,
    isLoading,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};
ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContextProvider;
