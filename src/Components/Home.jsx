import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faMicrophone,
  faBarcode,
  faClipboard,
  faClipboardCheck,
} from "@fortawesome/free-solid-svg-icons";
import "./Home.css";
import { useContext } from "react";
import { Context } from "../context/Context";
import useClipboard from "react-use-clipboard";
// import SpeechRecognition, {
//   useSpeechRecognition,
// } from "react-speech-recognition";

const Home = () => {
  const { input, setInput, resultData, onSent } = useContext(Context);
  const [isCopied, setCopied] = useClipboard(resultData);

  const handleClick = () => {
    onSent(input);
  };

  const handleClip = () => {
    {
      setCopied;
    }
  };

  return (
    <>
      <div className="container">
        <div className="title">
          <h1>
            GRAMMIFY..
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
              {/* {startListening ? ( */}
              <FontAwesomeIcon icon={faMicrophone} />
              {/* ) : (
                <FontAwesomeIcon
                  icon={faMicrophoneSlash}
                  onClick={SpeechRecognition.stopListening}
                />
              )} */}
              <a className="div" onClick={handleClick}>
                <FontAwesomeIcon icon={faPaperPlane} className="search-img" />
              </a>
            </div>
          </div>
        </div>
        {/* {transcript.length > 0 ? (
          <div className="speech-container">{transcript}</div>
        ) : null} */}
        <div className="output">
          <h5>The Corrected grammer is:</h5>
          <div className="content">
            <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
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
                  onClick={handleClip}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
