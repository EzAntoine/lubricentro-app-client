import { LoginFormProps } from "@/types/types";
import React from "react";

const DropdownMenu = ({ userData }: LoginFormProps) => {
  /** const [isOpen, setIsOpen] = useState(false);

 const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setIsOpen(isOpen);
  }, [isOpen]);
**/
  return (
    <div>
      <p className="bg-gray-300 text-black font-bold p-2 rounded flex items-center justify-center">
        {userData.username}
      </p>
    </div>
  );
};

export default DropdownMenu;
