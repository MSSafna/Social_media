import React,{useState} from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    Checkbox,
    Textarea
  } from '@chakra-ui/react'
import axios from 'axios'
 

  function ReportModal({postId}) {
   const initialState= {problem:'' ,discription:""}
   const [values, setvalues] = useState(initialState)
     const { isOpen, onOpen, onClose } = useDisclosure()
    const submitHandle=(async(e)=>{
     e.preventDefault()
    const res =  await axios.post(`/api/user/report/${postId}`,values)
    console.log('reachedddddddddddddddddddddddddd');
    onClose()

  })
     return (
      <>

        {/* <Button >Open Modal</Button> */}
        <p onClick={onOpen}>Report</p>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Report</ModalHeader>
            <ModalCloseButton />

            <form onSubmit={submitHandle}>
            <ModalBody>
             
             <input type='radio'  value='I just dont like it' name='problem' onChange={(e)=> setvalues({...values,problem: e.target.value})}/>
              <label className='ml-2'>I just dont like it</label>
              <br />
              <input type='radio' value='its spam' name='problem' onChange={(e)=> setvalues({...values,problem: e.target.value})}/>
              <label className='ml-2'>It's spam</label>
              <br />
              <input type='radio'  value="False information" name='problem'  onChange={(e)=> setvalues({...values,problem: e.target.value})}/>
              <label className='ml-2'>False information</label>
              <br />
              <label >Discription</label>
              <br />
               <textarea className='w-full h-24 border border-solid'  onChange={(e)=> setvalues({...values,discription: e.target.value})}/>
             
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='green'   mr={3} type='submit' >
                Submit
              </Button>
            </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      </>
    )
     }

export default ReportModal;
