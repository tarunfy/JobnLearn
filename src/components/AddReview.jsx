import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ReviewContext } from "../contexts/ReviewContext";
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
  const [companyName, setCompanyName] = useState("");
  const [rating, setRating] = useState("");
  const [anonymous, setAnonymous] = useState("yes");
  const [title, setTitle] = useState("");
  const [employmentStatus, setEmploymentStatus] = useState("employed");
  const [headline, setHeadline] = useState("");
  const [pros, setPros] = useState("");
  const [cons, setCons] = useState("");

  const { addReview } = useContext(ReviewContext);

  const { currentUser } = useContext(AuthContext);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = async (e) => {
    //use current user name if anonymous is null or false
    e.preventDefault();
    await addReview({
      title,
      companyName,
      headline,
      rating,
      pros,
      cons,
      employmentStatus,
      name: anonymous == "yes" ? anonymous : currentUser.name,
    });
    setAnonymous("yes");
    setTitle("");
    setHeadline("");
    setEmploymentStatus("employed");
    setCompanyName("");
    setPros("");
    setCons("");
    setRating("");
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
                    htmlFor="company-name"
                    className="font-normal text-base"
                  >
                    Company name
                  </label>
                  <Input
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                    className="font-semibold text-sm"
                    id="company-name"
                  />
                </div>

                <div className="w-full space-y-1 flex flex-col items-start">
                  <label htmlFor="rating" className="font-normal text-base">
                    Rating
                  </label>
                  <Input
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    required
                    className="font-semibold text-sm"
                    id="rating"
                    type="number"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-full space-y-1 flex flex-col items-start">
                  <label htmlFor="title" className="font-normal text-base">
                    Title
                  </label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="font-semibold text-sm"
                    id="title"
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
              </div>
              <div className="w-full space-y-1 flex flex-col items-start">
                <label htmlFor="pros" className="font-normal text-base">
                  Pros
                </label>
                <Textarea
                  value={pros}
                  onChange={(e) => setPros(e.target.value)}
                  required
                  className="font-semibold text-sm"
                  id="pros"
                />
              </div>
              <div className="w-full space-y-1 flex flex-col items-start">
                <label htmlFor="cons" className="font-normal text-base">
                  Cons
                </label>
                <Textarea
                  value={cons}
                  onChange={(e) => setCons(e.target.value)}
                  required
                  className="font-semibold text-sm"
                  id="cons"
                />
              </div>

              <div className="w-full flex items-center justify-between">
                <div>
                  <h4 className="font-normal text-base">Employment status</h4>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="employed"
                        name="employment_status"
                        onChange={(e) => setEmploymentStatus(e.target.id)}
                        defaultChecked
                      />
                      <label
                        htmlFor="employed"
                        className="font-semibold text-sm"
                      >
                        Employed
                      </label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="unemployed"
                        name="employment_status"
                        onChange={(e) => setEmploymentStatus(e.target.id)}
                      />
                      <label
                        htmlFor="unemployed"
                        className="font-semibold text-sm"
                      >
                        Unemployed
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-normal text-base">Anonymous</h4>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="yes"
                        name="anonymous"
                        onChange={(e) => setAnonymous(e.target.id)}
                        defaultChecked
                      />
                      <label htmlFor="yes" className="font-semibold text-sm">
                        Yes
                      </label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="no"
                        name="anonymous"
                        onChange={(e) => setAnonymous(e.target.id)}
                      />
                      <label htmlFor="no" className="font-semibold text-sm">
                        No
                      </label>
                    </div>
                  </div>
                </div>
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
                disabled={
                  !companyName ||
                  !rating ||
                  !employmentStatus ||
                  !headline ||
                  !title ||
                  !pros ||
                  !cons ||
                  !anonymous
                }
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

export default CreateModal;
