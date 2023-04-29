import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button
  } from '@chakra-ui/react'

function ViewReportModal({problems}) {
 const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <div>
      <Button onClick={onOpen}>View</Button>

<Modal isOpen={isOpen} onClose={onClose}>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>Reasons</ModalHeader>
    <ModalCloseButton />
    <ModalBody>
      {problems.map((data) => (

         <h1>{data}</h1>
      ))}
    </ModalBody>
  </ModalContent>
</Modal>
    </div>
  )
}

export default ViewReportModal
