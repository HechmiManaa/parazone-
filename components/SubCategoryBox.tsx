import Image from "next/image";
import { Category } from "@/hooks/useCategory";

export const SubCategoryBox: React.FC<Category> = ({ name }) => {
  return (
    <div
      className="
        
        flex
        flex-wrap
        border-2
        rounded-xl
        p-4
        items-center 
        justify-center 
        gap-2
        blue
        cursor-pointer
        border-white
        hover:text-black
        transition
        hover:scale-105
        transform
        shadow-lg
        bg-gray-200
       
      "
    >
      {name && (
        <span className="font-semibold text-sm lg:text-base  whitespace-nowrap">
          {name}
        </span>
      )}
    </div>
  );
};

export default SubCategoryBox;
