import React from 'react';

const CATEGORIES = ['Всі', 'Мясні', 'Вегетаріанські', 'Гострі', 'Сирні'];

type CategoriesProps = {
  categoryId: number;
  onClickCategory: (i: number) => void;
};

const Categories: React.FC<CategoriesProps> = React.memo(
  ({ categoryId, onClickCategory }) => {
    return (
      <div className="categories">
        <ul>
          {CATEGORIES.map((name, i) => (
            <li
              key={i}
              className={categoryId === i ? 'active' : ''}
              onClick={() => onClickCategory(i)}>
              {name}
            </li>
          ))}
        </ul>
      </div>
    );
  },
);

export default Categories;
