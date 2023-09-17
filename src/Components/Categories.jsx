import React from "react";

export default function Categories() {
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  const [activeCategory, setActiveCategory] = React.useState(0);

  const onClickCategory = (i) => {
    setActiveCategory(i);
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, i) => (
          <li
            key={i}
            onClick={() => onClickCategory(i)}
            className={activeCategory === i ? "active" : ""}
          >
            {categoryName}
          </li>
        ))}

      </ul>
    </div>
  );
}
