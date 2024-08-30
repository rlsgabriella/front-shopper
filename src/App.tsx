import React, { useState, useEffect } from 'react'
import './App.css'
import Webcam from "react-webcam";
import axios from 'axios';

function App() {
  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);
  const [leitura, setLeitura] = useState('')

  const capture = React.useCallback(() => {
    const imageSrc = (webcamRef?.current as any).getScreenshot();
    setImgSrc(imageSrc);

    const base64 = (imageSrc as any).split('data:image/jpeg;base64,')[1];
    // console.log('base64', base64)

    const asdf = async () => {
      const body = {
        image: base64,
        "customer_code": new Date().toString(),
        "measure_datetime": "datetime",
        "measure_type": "WATER"
      }
      const resultado = await axios.post('http://localhost:3000/upload', body)
      console.log('resultado.data.resposta', resultado.data.resposta)
      setLeitura(resultado.data.resposta)
    }
    asdf()
  }, [webcamRef, setImgSrc]);

  return (
    <>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />
      <button onClick={capture}>Capture photo</button>
      {leitura && <p>{leitura}</p>}
      {/* {imgSrc && (
        <img
          src={imgSrc}
        />
      )}
      {imgSrc && <p>{(imgSrc as any).split('data:image/jpeg;base64,')[1]}</p>} */}
    </>
  );
}

export default App



