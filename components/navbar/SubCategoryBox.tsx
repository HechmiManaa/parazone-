interface SubCategoryBoxProps {
  id?: number;
  img?: string | undefined;
  parent_id?: number | undefined;
  description?: string | undefined;
  name?: string | undefined;
}

const SubCategoriesBox: React.FC<SubCategoryBoxProps> = ({ img, name }) => {
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
                    
                    cursor-pointer
                 
                    hover:bg-gray-200
                    transition
                   "
    >
      {name && (
        <span className="font-semibold text-xs  whitespace-nowrap">{name}</span>
      )}
    </div>
  );
};

export default SubCategoriesBox;
