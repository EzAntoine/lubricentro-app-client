import React from "react";

const DropdownMenu = () => {
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
        {localStorage.getItem("username")}
      </p>
    </div>
  );
};

export default DropdownMenu;
