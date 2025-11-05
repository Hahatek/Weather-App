import { useState } from "react";
import Navbar from "../../components/layout/Navbar.jsx";
import QuotesBox from "../../components/quotes/quotesBox.jsx"
import QuotesBtnNew from "../../components/quotes/newquotebtn.jsx"
import QuotesBtnSave from "../../components/quotes/savequotebtn.jsx"


function QuotesPage() {

  const [currentQuote, setCurrentQuote] = useState(null);
  
  function handleClick(){
    fetch('https://dummyjson.com/quotes/random')
    .then(res => res.json())
    .then(setCurrentQuote);
  }
      
  function handleDownload(){
    if(!currentQuote) return;
    const content = `
    "Quote: "${currentQuote.quote}"
    "Author: " ${currentQuote.author}`;
    const blob = new Blob([JSON.stringify(content,)],{
    type: "application/json",
  })
        
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Quote.txt`;
    a.click(); 
    URL.revokeObjectURL(url);
  }  

  return (
    <>
      <Navbar />
      <QuotesBox currentQuote={currentQuote}/>
      <QuotesBtnNew handleClick={handleClick}/>
      <QuotesBtnSave  handleDownload={handleDownload} isDisabled={!currentQuote}/>
    </>
  );
}

export default QuotesPage;
