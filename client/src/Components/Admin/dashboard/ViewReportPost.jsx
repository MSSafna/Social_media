import React from 'react'
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

function ViewReportPost({post}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <div>
      <Button onClick={onOpen}>View</Button>

<Modal isOpen={isOpen} onClose={onClose}>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>Reported Post</ModalHeader>
    <ModalCloseButton />
    <ModalBody>
     <img src={post} alt="" srcset=""  className='h-32'/>
    </ModalBody>
  </ModalContent>
</Modal>
    </div>
  )
}

export default ViewReportPost
