import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure
} from '@chakra-ui/react'


function ModalComponent({name}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <div>
       <span className="cursor-pointer w-24 " onClick={onOpen}>{name}</span>

<Modal isOpen={isOpen} onClose={onClose}>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>Search</ModalHeader>
    <ModalCloseButton />
    <ModalBody>
     
    </ModalBody>

    <ModalFooter>
      <Button colorScheme='blue' mr={3} onClick={onClose}>
        Close
      </Button>
      <Button variant='ghost'>Secondary Action</Button>
    </ModalFooter>
  </ModalContent>
</Modal>
    </div>
  )
}

export default ModalComponent
