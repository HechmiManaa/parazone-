import Image from "next/image";

interface CategoryBoxProps {
  id?: number;
  icon?: string | undefined;
  parent_id?: number | undefined;
  description?: string | undefined;
  name: string;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({ icon, name }) => {
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
      {icon ? (
        <Image
          alt={name}
          src={`https://admin.parazone.tn/assets/${icon}`}
          width={40}
          height={40}
          className="w-8 lg:w-12 h-auto"
        />
      ) : (
        <div className="w-8 lg:w-12 h-8 lg:h-12 bg-gray-300 rounded-full"></div>
      )}
      {name && (
        <span className="font-semibold text-sm lg:text-base  whitespace-nowrap">
          {name}
        </span>
      )}
    </div>
  );
};

export default CategoryBox;
