import { Category } from "@/hooks/useCategory";

const CategoryBox: React.FC<Category> = ({ name }) => {
  return (
    <div
      className="
                flex 
                border-2
                rounded-xl
                px-3
                py-2
                items-center 
                justify-center 
                gap-1
                text-white
                cursor-pointer
                border-white
                hover:text-white
                transition
               "
    >
      {name && (
        <span className="font-semibold text-xs  whitespace-nowrap">{name}</span>
      )}
    </div>
  );
};

export default CategoryBox;
