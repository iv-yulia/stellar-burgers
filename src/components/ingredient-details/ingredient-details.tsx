import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import { getIngredientsSlice } from '../../services/slices/ingredientsSlice';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const { ingredients } = useSelector(getIngredientsSlice);
  const { id } = useParams<string>();
  const ingredient = ingredients.find((item) => item._id === id);

  if (!ingredient) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredient} />;
};
