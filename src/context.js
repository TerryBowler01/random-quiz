import axios from 'axios'
import React, { useState, useContext } from 'react'

const table = {
  videoGames: 15,
  Film: 11,
  Comics: 29,
  Sports: 21,
}

const API_ENDPOINT = 'https://opentdb.com/api.php?'

//const url = ''
//const tempUrl = 'https://opentdb.com/api.php?amount=10&category=15&difficulty=easy&type=multiple'
const AppContext = React.createContext()

const AppProvider = ({ children }) => {


  const [waiting,setWaiting] = useState(true)
  const [loading, setLoading] = useState(false)
const [questions, setQuestions] = useState([])
const [index, setIndex] =useState(0)
const [correct, setCorrect] = useState(0)
const [error, setError] = useState(false)
const [isModalOpen, setIsModalOpen] = useState(false)
const [quiz, setQuiz] = useState({
  amount:10,
  category:'videoGames',
  difficulty:'easy',
})



const fetchQuestions = async (url) =>{
  setLoading(true)
  setWaiting(false)
  const response = await axios(url).catch((err)=>console.log(err))
  //console.log(response)
  if(response){
const data = response.data.results
if(data.length > 0 ){
  setQuestions(data)
  setLoading(false)
  setWaiting(false)
  setError(false)
}
else{
  setWaiting(true)
  setError(true)
}
//console.log(data)
  }
  else{
    setWaiting(true)
  }
}
const nextQuestion = ()=>{
   setIndex((oldIndex)=>{
    const index = oldIndex + 1
    if(index > questions.length -1){
      openModal()
     //Open Modal
return 0
     //End Open Modal
    }else{
     return index
    }
    }
 )
}

const checkAnswer = value =>{
  if(value){
setCorrect((oldState)=>oldState+1)
  }
  nextQuestion()
}

const openModal = ()=>{
  setIsModalOpen(true)
}
const closeModal = ()=>{
  setWaiting(true)
  setCorrect(0)
  setIsModalOpen(false)
  
}

const handleChange = (e)=>{
//console.log(e)
const name = e.target.name
const value = e.target.value
//console.log(name, value)
setQuiz({...quiz,[name]:value})

}
const handleSubmit = (e)=>{
e.preventDefault()
const {amount,category,difficulty} = quiz
//console.log(quiz)

//const tempUrl = 'https://opentdb.com/api.php?amount=10&category=15&difficulty=easy&type=multiple'

const url = `${API_ENDPOINT}amount=${amount}&difficulty=${difficulty}&category=${table[category]}&type=multiple`
//console.log(url)
fetchQuestions(url)
}
// useEffect(()=>{
//   fetchQuestions(tempUrl)
// },[])
  return <AppContext.Provider value={{waiting,loading,questions,index,correct,error,isModalOpen, nextQuestion, checkAnswer, closeModal, quiz, handleChange, handleSubmit}}>{children}</AppContext.Provider>
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
