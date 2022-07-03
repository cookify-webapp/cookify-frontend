import { nutritionType } from "core/types/core_components_type";

export type ingredientDetailType = {
  _id: string;
  name: string;
  queryKey: string;
  unit: {
    _id: string;
    name: string;
    queryKey: string;
  };
  type: {
    _id: string;
    name: string;
  };
  image: string;
  shopUrl: string;
  nutritionalDetail: nutritionType;
};

export type sampleIngredientType = {
  _id: string;
  name: string;
  type: {
    _id: string;
    name: string;
  };
  image: string;
};
