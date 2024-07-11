import { createContext, useState } from "react";
import run from "../confi/Gemini";

export const Context = createContext();

const ContextProvider = (props) =>  {

    // below function is for a send button 
    const [input,setInput] = useState(" ");
    const [recentPrompt,setRecentPrompt] = useState(" ");
    const [prevPrompts,setPrevPrompts] = useState(" ");
    const [showResult, setShowResult] = useState("");
    const [loading,setLoading] = useState(" ");
    const [resultData,setResultData] = useState("");

    const delayPara = (index,nextWord) => {
        setTimeout(function (){
            setResultData(prev=>prev+nextWord);
        },75*index)
    }
    
    const onSent = async (prompt) =>{

        setResultData("")
        setLoading(true)
        setShowResult(true)
        if(prompt !==undefined){
            response = await run(prompt);
            setRecentPrompt(prompt)
        }
        else{
            setPrevPrompts(prev =>[...prev,input])
            setRecentPrompt(input)
            response = await run (input)
        }
        setRecentPrompt(input) 
        setPrevPrompts(prev=>[...prev,input])
        const response = await run(input)
        let responseArray = response.split("**");
        let newResponse;
        for(let i=0 ; i<responseArray.length; i++)
            {
                if(i===0|| i%2 !== 1){
                    newResponse +=responseArray[i];
                }
                else{
                    newResponse += responseArray[i]+"</b>"
                }
            }
            let newResponse2 = newResponse.split("*").join("</br>")
            let newResponseArray = newResponse2.split(" ");
            for(let i=0;i<newResponseArray.length;i++)
                {
                    const nextWord = newResponseArray[i];
                    delayPara(i,nextWord+" ")
                }
        setResultData(newResponse2)
        setLoading(false)
        setInput("")
    }
    
    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat

    }   

    return (
        <Context.Provider value={contextValue}>
            {props.children} 
        </Context.Provider>
    )
}

export default ContextProvider