import React from 'react';

type CategoriesProps = {
  value: number;
  onClickCategory: any;
};

export const Categories: React.FC<CategoriesProps> = ({ value, onClickCategory }) => {
  const categories = ['Все', 'Новинки', 'Вегетарианская', 'Острая', 'Хит'];

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, i) => (
          <li key={i} onClick={() => onClickCategory(i)} className={value === i ? 'active' : ''}>
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
};
