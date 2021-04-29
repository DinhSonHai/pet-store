/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useState, useRef, useEffect, useCallback } from 'react';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import { debounce } from 'lodash';
import { useHistory } from 'react-router-dom';
import { MicroPhone } from '../../assets/icons';
import microPhoneIcon from '../../assets/svg/microphone.svg';
import './styles.scss';
const VoiceSearch = () => {
  const history = useHistory();
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [isListening, setIsListening] = useState(false);
  const microphoneRef = useRef(null);
  useEffect(() => {
    if (transcript) {
      debouncedSave(transcript);
    }
  }, [transcript]);
  const debouncedSave = useCallback(
    debounce((value) => {
      handleStop();
      resetTranscript();
      history.push(`/products/search?q=${value}`);
    }, 800),
    []
  );
  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return (
      <div className='mircophone-container'>
        Browser is not Support Speech Recognition.
      </div>
    );
  }
  const handleListen = () => {
    setIsListening(true);
    SpeechRecognition.startListening({
      continuous: true,
      language: 'vi-VN',
    });
  };
  const handleStop = () => {
    setIsListening(false);
    SpeechRecognition.stopListening();
  };

  return (
    <Fragment>
      <div onClick={handleListen} className='voice-search'>
        <MicroPhone />
      </div>
      {isListening && (
        <div className='microphone-wrapper'>
          <div className='mircophone-container'>
            <div
              className='microphone-icon-container listening'
              ref={microphoneRef}
              onClick={handleStop}
            >
              <img
                src={microPhoneIcon}
                className='microphone-icon'
                alt='mcmcm'
              />
            </div>
            <div className='microphone-status'>Đang nghe.........</div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default VoiceSearch;
