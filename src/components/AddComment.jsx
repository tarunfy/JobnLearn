import { useState, useContext } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Input,
  useToast,
} from "@chakra-ui/react";
import { ReviewContext } from "../contexts/ReviewContext";
import { PathContext } from "../contexts/PathContext";

const AddComment = ({ id, type }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [comment, setComment] = useState("");

  const toast = useToast();

  const { addComment } = useContext(
    type === "review" ? ReviewContext : PathContext
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addComment(id, comment);
    setComment("");
    onClose();
    toast({
      title: "Comment added",
      description: "Comment has been added.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <>
      <Button onClick={onOpen} color="green.500">
        Add comment
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay bg="none" backdropFilter="auto" backdropBlur="2px" />
        <ModalContent className="!bg-zinc-50">
          <form onSubmit={handleSubmit}>
            <ModalHeader className="font-Wotfard-Regular !text-gray-800">
              Add a comment
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <div className="space-y-3">
                <Input
                  type="text"
                  value={comment}
                  className="font-normal"
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>
            </ModalBody>

            <ModalFooter>
              <Button
                className="font-Wotfard-Regular"
                mr={3}
                onClick={() => {
                  onClose();
                  setComment("");
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!comment}
                colorScheme="red"
                className="font-normal text-zinc-50"
              >
                Add
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddComment;
