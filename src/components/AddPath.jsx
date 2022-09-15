import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { PathContext } from "../contexts/PathContext";
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
  useToast,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

const AddPath = () => {
  const [tags, setTags] = useState("");
  const [headline, setHeadline] = useState("");
  const [path, setPath] = useState("");

  const toast = useToast();

  const { addPath } = useContext(PathContext);

  const { currentUser } = useContext(AuthContext);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = async (e) => {
    //use current user name if anonymous is null or false
    e.preventDefault();
    await addPath({
      headline,
      tags: tags.trim().toLowerCase().replace(/ /g, "").split(","),
      path,
    });
    setHeadline("");
    setPath("");
    setTags("");
    onClose();
    toast({
      title: "Path added",
      description: "We've added your path.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };
  return (
    <>
      <Button
        disabled={!currentUser}
        size="md"
        className="!rounded-md !bg-green-500  hover:!bg-primary-600 text-zinc-50"
        onClick={onOpen}
      >
        <AddIcon className="mr-2" /> Add Path
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay bg="none" backdropFilter="auto" backdropBlur="2px" />
        <ModalContent className="!max-w-[550px] !bg-zinc-50">
          <form onSubmit={handleSubmit}>
            <ModalHeader className="font-Wotfard-Medium !text-gray-800 !text-[1.9rem]">
              Let's add a new Path
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody className="space-y-2">
              <div className="w-full space-y-1 flex flex-col items-start">
                <label htmlFor="tags" className="font-normal text-base">
                  Tags
                  <span className="text-sm block">(separated by commas)</span>
                </label>
                <Input
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  required
                  className="font-semibold text-sm"
                  id="tags"
                />
              </div>

              <div className="w-full space-y-1 flex flex-col items-start">
                <label htmlFor="headline" className="font-normal text-base">
                  Headline
                </label>
                <Input
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  required
                  className="font-semibold text-sm"
                  id="headline"
                />
              </div>

              <div className="w-full space-y-1 flex flex-col items-start">
                <label htmlFor="path" className="font-normal text-base">
                  Path
                </label>
                <Textarea
                  value={path}
                  onChange={(e) => setPath(e.target.value)}
                  required
                  className="font-semibold text-sm"
                  id="path"
                />
              </div>
            </ModalBody>

            <ModalFooter>
              <Button
                mr={3}
                onClick={onClose}
                className="!text-gray-800 font-normal"
              >
                Close
              </Button>
              <Button
                disabled={!headline || !path || !tags}
                type="submit"
                className="!bg-green-600 font-normal hover:!bg-green-500 !text-zinc-50"
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

export default AddPath;
