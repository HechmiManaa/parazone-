import Image from "next/image";

interface CategoryBoxProps {
  id?: number;
  icon?: string | undefined;
  parent_id?: number | undefined;
  description?: string | undefined;
  name?: string | undefined;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({ icon, name }) => {
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
      {name && icon && (
        <Image
          alt={name}
          src={`https://admin.parazone.tn/assets/${icon}`}
          width={500}
          height={600}
          className="w-4 lg:w-5"
        />
      )}
      {name && (
        <span className="font-semibold text-xs  whitespace-nowrap">{name}</span>
      )}
    </div>
  );
};

export default CategoryBox;
