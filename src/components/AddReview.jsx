import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

const CreateModal = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [repoLink, setRepoLink] = useState("");
  const [liveDemo, setLiveDemo] = useState("");

  const { currentUser } = useContext(AuthContext);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setName("");
    setDescription("");
    setLiveDemo("");
    setRepoLink("");
    onClose();
  };
  return (
    <>
      <Button
        disabled={!currentUser}
        size="sm"
        className="!rounded-sm !bg-green-500 hover:!bg-primary-600 text-zinc-50"
        onClick={onOpen}
      >
        <AddIcon className="mr-2" /> Add Review
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay bg="none" backdropFilter="auto" backdropBlur="2px" />
        <ModalContent className="!max-w-[550px] !bg-zinc-50">
          <form onSubmit={handleSubmit}>
            <ModalHeader className="font-Wotfard-Medium !text-gray-800 !text-[1.9rem]">
              Let's add a new Review
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody className="space-y-2">
              <div className="flex items-center space-x-4">
                <div className="w-full space-y-1 flex flex-col items-start">
                  <label
                    htmlFor="project-name"
                    className="font-Wotfard-Regular text-lg"
                  >
                    Name
                  </label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="font-Wotfard-Medium"
                    id="project-name"
                  />
                </div>

                <div className="w-full space-y-1 flex flex-col items-start">
                  <label
                    htmlFor="project-repo"
                    className="font-Wotfard-Regular text-lg"
                  >
                    Git Repository
                  </label>
                  <Input
                    value={repoLink}
                    onChange={(e) => setRepoLink(e.target.value)}
                    required
                    className="font-Wotfard-Medium"
                    id="project-repo"
                  />
                </div>
              </div>
              <div className="w-full space-y-1 flex flex-col items-start">
                <label
                  htmlFor="project-demo"
                  className="font-Wotfard-Regular text-lg"
                >
                  Live link
                </label>
                <Input
                  value={liveDemo}
                  onChange={(e) => setLiveDemo(e.target.value)}
                  required
                  className="font-Wotfard-Medium"
                  id="project-demo"
                />
              </div>
              <div className="w-full space-y-1 flex flex-col items-start">
                <label
                  htmlFor="project-desc"
                  className="font-Wotfard-Regular text-lg"
                >
                  Description
                </label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="font-Wotfard-Medium"
                  id="project-desc"
                />
              </div>
            </ModalBody>

            <ModalFooter>
              <Button
                mr={3}
                onClick={onClose}
                className="!text-gray-800 font-Wotfard-Regular"
              >
                Close
              </Button>
              <Button
                disabled={!name || !liveDemo || !description || !repoLink}
                type="submit"
                className="!bg-primary-600 font-Wotfard-Regular hover:!bg-primary-500 !text-zinc-50"
              >
                Create
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateModal;
