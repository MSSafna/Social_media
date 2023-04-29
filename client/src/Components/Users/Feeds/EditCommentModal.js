import React,{useState, useContext} from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button
} from '@chakra-ui/react'
import InputEmoji from 'react-input-emoji';
import axios from 'axios';
import MyContext from './Posts'


function EditCommentModal({ commentId, comment, editCommentHandle}) {
 
    const[state, setState] = useState('')
    const { isOpen, onOpen, onClose } = useDisclosure()

    const handleEditForm= async (event) => {
        event.preventDefault()
     try{
       const response=  await axios.put(`api/posts/editcomment?commentId=${commentId}`,{comment:state})
        editCommentHandle()
     }catch(err){
        console.log(err);
     }
    }
    return (
        <div>
            <p className='font-bold  mb-4 cursor-pointer' onClick={onOpen}>Edit Comment</p>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <form onSubmit={handleEditForm}>
                    <ModalContent>
                        <ModalHeader>Edit comment</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <InputEmoji
                                type="Type comment"
                                id="search"
                                className="focus:outline-none inline-block w-96 p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder={comment}
                                value='comment'
                                onChange={(e) =>{
                           
                                setState(e)}}
                                required
                            />

                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme='green' mr={3} onClick={onClose} type='submit'>
                                Submit
                            </Button>

                        </ModalFooter>
                    </ModalContent>
                </form>
            </Modal>
        </div>
    )
}

export default EditCommentModal
