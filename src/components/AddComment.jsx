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
} from "@chakra-ui/react";
import { DataContext } from "../contexts/DataContext";

const AddComment = ({ reviewId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [comment, setComment] = useState("");

  const { addComment } = useContext(DataContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    onClose();
    await addComment(reviewId, comment);
    setComment("");
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
