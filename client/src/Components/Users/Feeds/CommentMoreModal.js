import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
  } from '@chakra-ui/react'
  import {AiOutlineMore} from 'react-icons/ai'
  import axios from 'axios'
  import EditCommentModal from './EditCommentModal'

function CommentMoreModal({commentId, postId ,displayComment,comment , editCommentHandle}) {
  console.log(displayComment);
    const { isOpen, onOpen, onClose } = useDisclosure()

    const deleteComment = async (commentId) => {
     const confirmed =   window.confirm("Are you sure You want to delete it ?")
        if(confirmed){
            const response = await axios.delete(`/api/posts/deletecomment?postId=${postId}&commentId=${commentId}`)
            if (response.data.deletedComment) {
              displayComment(true)
            }
        
        }
      }

  const editComment=async (commnetId) => {
   
  }
    
  return (
    <>
    <AiOutlineMore sizae={24} onClick={onOpen}>Open Modal</AiOutlineMore>

    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
      
        <ModalCloseButton />
        <ModalBody>
         <div className='flex  justify-center font-bold text-red-500  mt-4 cursor-pointer' onClick={() => deleteComment(commentId)}>
            Delete Comment
            </div>
         <hr className='mt-1 '></hr>
         <div className='flex mt-3 justify-center font-bold  mb-4 cursor-pointer' >
           <EditCommentModal commentId={commentId} comment={comment} displayComment={displayComment} editCommentHandle={editCommentHandle}/>
        </div>
       
        
        </ModalBody>

      </ModalContent>
    </Modal>
  </>
  )
}

export default CommentMoreModal
