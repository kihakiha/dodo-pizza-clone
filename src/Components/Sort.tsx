import React from 'react';
import { useDispatch } from 'react-redux';
import { SortType, onClickSortType } from '../redux/slices/filterSlice';

import { SortPropertyEnum } from '../redux/slices/filterSlice';

export const sortTypes: SortType[] = [
  { name: 'Популярности ⬆️', sortProperty: SortPropertyEnum.RATING_DESC },
  { name: 'Популярности ⬇️', sortProperty: SortPropertyEnum.RATING_ASC },
  { name: 'Цене ⬆️', sortProperty: SortPropertyEnum.PRICE_ASC },
  { name: 'Цене ⬇️', sortProperty: SortPropertyEnum.PRICE_DESC },
  { name: 'Алфавиту', sortProperty: SortPropertyEnum.TITLE },
];

type TSortProps = {
  value: SortType;
};

export const Sort: React.FC<TSortProps> = React.memo(({ value }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = React.useState(false);

  const sortRef = React.useRef<HTMLDivElement>(null);

  const onChooseSortType = (obj: SortType) => {
    dispatch(onClickSortType(obj));
    setIsOpen(!isOpen);
  };
  React.useEffect(() => {
    const isSortClicked = (e: MouseEvent) => {
      if (sortRef.current && !e.composedPath().includes(sortRef.current)) {
        setIsOpen(false);
      }
    };

    document.body.addEventListener('click', isSortClicked);

    return () => document.body.removeEventListener('click', isSortClicked);
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          className={isOpen ? 'sort__label-open' : ''}
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setIsOpen(!isOpen)}>{value.name}</span>
      </div>
      {isOpen && (
        <div className="sort__popup">
          <ul>
            {sortTypes.map((type, i) => (
              <li
                key={i}
                onClick={() => onChooseSortType(type)}
                className={value.sortProperty === type.sortProperty ? 'active' : ''}>
                {type.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});
