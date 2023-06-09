import React from 'react'
import { useRef, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react'
import { addFeedback, getAllData } from '../Services/services';
import {CircleLoader, HashLoader} from 'react-spinners'
import JSZip from 'jszip'
import SubmitFile from './Forms/SubmitFile';
import SubmitText from './Forms/SubmitText';
import DropDown from './DropDown';
import DropDownAssignment from './DropDownAssignment';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { GPTAstate, WholeState } from '../Types/Types';
import { actionInputFile, actionInputText, actionInputImage, actionImage, actionFile, actionHighlight, actionList, actionLoading, actionAllStudents, actionAllAssignments, actionImgUrl, actionSuggestion } from '../Actions/actions';
import { createWorker } from 'tesseract.js';
import SubmitImage from './Forms/SubmitImage';
import CopyToClipboardButton from './CopyToClipboardButton';
import { input } from '@material-tailwind/react';
import { motion } from 'framer-motion';

function GPTA() {

  const dispatch = useDispatch()
  const GPTAstate = useSelector((state: WholeState) => state.GPTA)
  const myRef = useRef() as React.MutableRefObject<HTMLInputElement>;


  const {isAuthenticated, getAccessTokenSilently, user} = useAuth0()

  console.log(isAuthenticated, 'auth')
  useEffect(  ()=>{
    if (isAuthenticated) {
      getStudentsAndAssignments()
    }}, [isAuthenticated])

  //get AllDataForlists
  const getStudentsAndAssignments = async () => {
    const token: string = await getAccessTokenSilently()
    const data = await getAllData(token);
    dispatch(actionAllAssignments(data.titles))
    dispatch(actionAllStudents(data.students))
  }

  const checkGrammar = async (get?: string) => {
    const token = await getAccessTokenSilently()
    try {
      let postResult : { responseMistakes: string, responseList: string, responseExpand: string}
      if (!get) {
        dispatch(actionLoading(true))
      //calls to server to get ai response then post that response on the database using the post request from services
        postResult = await addFeedback(GPTAstate.type === 'input' ? GPTAstate.input: GPTAstate.type === 'file' ?  GPTAstate.file : GPTAstate.image, token, GPTAstate.select.titleId as number, GPTAstate.select.studentId as number)
      } else {
        postResult = {responseMistakes: get, responseList: get, responseExpand: get};
      }
      //then we can also display the result using the AIresponse
      // const Results = postResult.text.split('-+-')
      const firstAnswer = postResult.responseMistakes
      const secondAnswer = postResult.responseList
      const thirdAnswer = postResult.responseExpand
      dispatch(actionHighlight(formatAnswer(firstAnswer)))
      dispatch(actionList(formatText(secondAnswer)))
      // dispatch(actionList(formatText(secondAnswer.slice(0, secondAnswer.length-1))))

      dispatch(actionSuggestion(formatText(thirdAnswer)))
      dispatch(actionLoading(false))
    } catch (error) {
      console.log(error)
      dispatch(actionLoading(false))
    }
  }

  // changes the color of the mistakes to red
  function formatAnswer( text:string ) {
    // const newtext = text..replace(/"\s"/g, " ")
    // const newnewtext = text.replace(/\\+n+/g, "")
    const regex = /\*+(.*?)\*+/g;
    const result = text.replace(regex, "<span class='$1' style='color: red;'><u>$1</u></span>");
    return result
  }


const formatText = (text:any) => {
    const errorList = text.slice(1).split('\\n');
    return errorList
}

  //input by text

  const extractText = async (doc: File) => {
    const zip = await JSZip.loadAsync(doc)
    const xml = await zip.file("word/document.xml")?.async("text")
    if (!xml) return
    const matchedxml = xml.match(/<w:t(.*?)>(.*?)<\/w:t>/g)?.join('').replace(/<w:t(.*?)>|<\/w:t>/g, "")
    return matchedxml
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFile = event.target.files !== null ? event.target.files[0]: undefined
    if (!newFile) return
    const docText: any = await extractText(newFile)
    dispatch(actionFile(docText));
  }
// input by image

  const convertImageToText = async (image: File | null) => {
    if (!image) return;
    const worker = await createWorker();
    await worker.load();
    await worker.loadLanguage("eng");
    await worker.initialize("eng");
    const { data } = await worker.recognize(image);
    dispatch(actionImgUrl(URL.createObjectURL(image)))
    dispatch(actionImage(data.text))
  };

  return (
    //whole dashboard
    <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1 }} ref={myRef} className="flex justify-center items-center flex-col" data-testid="GPTAcontainer">
      {/* second header with dropdown menus */}
      <div className='justify-center md:justify-between flex shadow w-full md:py-0 py-4 px-5'>
        <p>{isAuthenticated ? <a className=' hidden md:flex border-red-700 border-2 text-black font-bold py-2 bg-opacity-90 px-4 rounded-md m-3 hover:bg-black hover:text-white ease-linear transition-all duration-150 cursor-pointer w-fit'>{`${user?.name}'s classroom`}</a> : <a>you are not logged in</a> }</p>
        <div className='flex items-center justify-center'>
        {GPTAstate.allAssignments ? <DropDownAssignment title={'assignments'} array={GPTAstate.allAssignments}  checkGrammar={checkGrammar} /> :  <p className="bg-red-700 text-white active:bg-black-600 font-bold uppercase text-sm px-4 py-2 ml-7 rounded shadow hover:shadow-lg outline-none focus:outline-none mb-1  ease-linear transition-all duration-150"
> loading assignments</p>}
        {GPTAstate.allStudents ? <DropDown name={'Students'} array={GPTAstate.allStudents} checkGrammar={checkGrammar} /> :  <p className="bg-red-700 text-white active:bg-black-600 font-bold uppercase text-sm px-4 py-2 ml-7 rounded shadow hover:shadow-lg outline-none focus:outline-none mb-1  ease-linear transition-all duration-150"
> loading students</p>}
        </div>
      </div>

      <section className="text-gray-800  body-font h-full w-full flex justify-center">
        {GPTAstate.select.studentId !== null && GPTAstate.select.titleId !== null ? <div className="container mx-auto px-5 py-17 p-5 flex flex-col lg:flex-row lg:items-start justify-center items-center">

       {/* //container of submission buttons */}

        <div className="lg:flex-grow md:w-1/2 lg:mr-1 lg:mt-10 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center relative ">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Upload your file here
            <br className="hidden lg:inline-block" data-testid='GPTA-Text'/>and have it marked in seconds
          </h1>
          <div className="flex flex-row justify-around gap-3 w-full mb-3">
            <button onClick={()=>dispatch(actionInputFile)} className="flex mb-1 md:m-2 text-white bg-[#cc2936] rounded py-1 px-3 md:py-2 md:px-5 focus:outline-none hover:bg-gray-600 md:rounded items-center text-lg">File</button>
            <button onClick={()=>dispatch(actionInputText)} className="flex mb-1 md:m-2 text-white bg-[#cc2936]  rounded py-1 px-3 md:py-2 md:px-5 focus:outline-none hover:bg-gray-600 md:rounded items-center text-lg">Text</button>
            <button onClick={()=>dispatch(actionInputImage)} className="flex mb-1 md:m-2 text-white bg-[#cc2936] rounded py-1 px-3 md:py-2 md:px-5 focus:outline-none hover:bg-gray-600 md:rounded items-center text-lg">Image</button>
            <button onClick={() => checkGrammar()} className="flex mb-1 md:m-2 text-white bg-[#020105] md:border-0 py-2 px-3  rounded md:py-2 md:px-5 focus:outline-none hover:bg-gray-600 md:rounded text-lg disabled:bg-gray-400 disabled:text-gray-700" disabled={(GPTAstate[GPTAstate.type as keyof GPTAstate] as string).length === 0 ? true : false }>Check grammar</button>
          </div >
              {GPTAstate.type === 'input' ? <SubmitText /> : GPTAstate.type==='file' ? <SubmitFile handleFileUpload = {handleFileUpload}/> : <SubmitImage handleImageUpload = {convertImageToText}/>}
        </div>

        {/* container of the teacher feebdack */}

          <div className="lg:max-w-xl sm:p-9 flex flex-col md:flex-shrink-0 sm:flex-shrink-0 w-full justify-center content-center">

        <CopyToClipboardButton/>

          {!GPTAstate.loading ?
            <div className='w-full'>

            {/* first feedback */}
            <div className='feedbackWrap border-red-700 border-2  rounded-lg p-4 shadow-lg'>
             <h1 className="font-bold">Step 1: Spot your areas of improvement in your essay</h1>
              <p className='' dangerouslySetInnerHTML={{ __html: GPTAstate.highlightResult }}></p>
              </div>
              <br />

              {/* //second feedback */}
             <div className='feedbackWrap rounded-lg p-4 border-red-700 border-2 shadow-lg margin-'>
             <h1 className='font-bold'>Step 2: A list with feedback for your corrections above</h1>
             <ul>
              {GPTAstate.listResult.map((element: any, index) => {
                element = element.replace(/\\/g, '');
                return <li key={index}>{element}</li>
              })}
              </ul>
                </div>

              {/* //third feedback */}
              <div className='feedbackWrap border-red-700 border-2 mt-6 rounded-lg p-4 shadow-lg'>
                <h1 className='font-bold'>Step 3: General suggestions to expand your learning</h1>
                <ul>
                  {GPTAstate.suggestionResult.map((element: any, index) => {
                  element = element.replace(/\\/g, '');
                  return <li key={index}>{element}</li>})}
                </ul>
              </div>
            </div>  :
            <HashLoader className="md:top-[25vh] md:left-[30vh] md:mx-0 mx-auto" color='red' size={80}/>
          }
        </div>
      </div> :
       <div className='flex justify-center  items-center h-full w-full'>
        <p className=" mt-20 bg-red-700 text-white active:bg-black-600 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mb-1  ease-linear transition-all text-center duration-150" data-testid='unSelected'
> Please select a student and an assignment</p>
       </div>
       }
      </section>
      </motion.div>
  )
}

export default GPTA

