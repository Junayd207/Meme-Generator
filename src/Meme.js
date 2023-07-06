import React, {useState, useEffect} from "react"
import downloadjs from 'downloadjs'
import html2canvas from 'html2canvas'
import cat from "./images/cat-face.png"
import frog from "./images/frog-face.png"
import "./Meme.css"

export default function Meme() {
    const [memes, setMemes] = useState([])
    const [rand, setRand] = useState([0])
    const [topText, setTopText] = useState("")
    const [bottomText, setBottomText] = useState("")

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
                .then(data => setMemes(data.data.memes))
    },[])

    function getNewMeme(){
        const newNumber = Math.floor(Math.random() * memes.length)
        if(newNumber !== rand)
            setRand(newNumber)
        else
            getNewMeme()
    }

    const handleCaptureClick = async () => {
        const canvas = await html2canvas(document.querySelector(".meme-container"), {allowTaint: true, useCORS: true})
        const dataURL = canvas.toDataURL('image/png')
        downloadjs(dataURL, 'meme-generator.png', 'image/png')
    }

    return (
        <main>
            <header className="header-container">
                <img src={frog} alt="" className="header-frog"/>
                <h1 className="header-text">Meme Generator</h1>
                <img src={cat} alt="" className="header-cat"/>
            </header>
            <main className="hero">
                <div className="form">
                    <input 
                        type="text"
                        placeholder="Top text"
                        className="form-input"
                        name="topText"
                        onChange={(e) => setTopText(e.target.value)}
                        maxlength="50"
                    />
                    <input 
                        type="text"
                        placeholder="Bottom text"
                        className="form-input"
                        name="bottomText"
                        onChange={(e) => setBottomText(e.target.value)}
                        maxlength="50"
                    />
                    <button onClick={getNewMeme} className="form-button">Get a new meme image 🖼</button>
                </div>
                <div className="meme-container">
                    <h2 className="meme-text top">{topText}</h2>
                    {memes.length && <img src={memes[rand].url} className="meme-image"></img>}
                    <h2 className="meme-text bottom">{bottomText}</h2>
                </div>
                <button href="#" onClick={handleCaptureClick} className="download-button">
                    Download
                </button>
            </main>
        </main>
    )
}