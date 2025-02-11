import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faMicrophone,
  faBarcode,
  faClipboard,
  faClipboardCheck,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import "./Home.css";
import { useContext } from "react";
import { useState } from "react";
import { Context } from "../context/Context";
import useClipboard from "react-use-clipboard";

const Home = () => {
  //data transfer inputs
  const { input, setInput, resultData, onSent, isloading } =
    useContext(Context);
  //content clipboard inputs
  const [isCopied, setCopied] = useClipboard(resultData);
  //banner inputs
  const [banner, setBanner] = useState(false);
  //trigger for output
  const [output, setOutput] = useState(false);

  //handling banner operations
  const handleBanner = () => {
    //alert("Speech to text feature is not available yet. Please type in the text manually.");
    setBanner(!banner);
  };

  const handleClick = () => {
    onSent(input);
    setOutput(true);
  };

  // Function to compare and highlight differences
  const highlightDifferences = (original, modified) => {
    const originalWords = original.split(" ");
    const modifiedWords = modified.split(" ");

    return modifiedWords.map((word, index) => {
      if (word !== originalWords[index]) {
        return (
          <span
            key={index}
            style={
              {
                // textDecoration: "underline",
                // textDecorationColor: "#C4D9FF",
                // textDecorationThickness: "2px",
                // marginRight: "4px",
                // display: "inline-block",
                // transition: "all 0.3s ease-in-out",
              }
            }
            // className="highlight-word"
          >
            {word + " "}
          </span>
        );
      }
      return (
        <span key={index} style={{}}>
          {word + " "}
        </span>
      );
    });
  };

  return (
    <>
      {banner && (
        <div className="banner">
          <h3>
            Speech feature is not available yet😫. Please type in the text
            manually.{" "}
          </h3>
          <button onClick={handleBanner}>
            <FontAwesomeIcon
              icon={faXmark}
              className="x-mark"
              style={{ color: "#ffffff" }}
            />
          </button>
        </div>
      )}
      <div className="contanier-wrapper">
        <div className="container">
          <div className="title">
            <h1>
              <span className="background-span">GRAM</span>MIFFY..
              <FontAwesomeIcon icon={faBarcode} fade />
            </h1>
          </div>
          <div className="prompts">
            <div className="wrapper">
              <div className="inner-wrapper">
                <input
                  onChange={(e) => setInput(e.target.value)}
                  value={input}
                  type="text"
                  className="prompt"
                  placeholder="Enter your text here..."
                />
                <a className="mic-btn" onClick={handleBanner}>
                  <FontAwesomeIcon
                    className="mic-img"
                    icon={faMicrophone}
                    style={{ color: "#a6a6a6" }}
                  />
                </a>
                <a className="send-btn" onClick={handleClick}>
                  <FontAwesomeIcon icon={faPaperPlane} className="search-img" />
                </a>
              </div>
            </div>
          </div>
          {isloading ? (
            <div className="loader"></div>
          ) : (
            output && (
              <div className="output">
                <h5>The Corrected grammar is:</h5>
                <div className="content">
                  <p>{highlightDifferences(input, resultData)}</p>
                  <div className="clipboard" onClick={setCopied}>
                    {isCopied ? (
                      <FontAwesomeIcon
                        icon={faClipboardCheck}
                        className="clipboard-content"
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faClipboard}
                        className="clipboard-content"
                      />
                    )}
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
};
export default Home;
