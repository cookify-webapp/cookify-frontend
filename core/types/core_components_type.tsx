import { FormikErrors } from "formik";

export type primaryButtonType = {
  title: string;
  onClick: Function;
  disabled?: boolean;
  loading?: boolean
};

export type secondaryButtonType = {
  title: string;
  onClick: Function;
};

export type secondaryMiniButtonType = {
  icon: string;
  onClick: Function;
};

export type tertiaryButtonType = {
  title: string;
  textColor: string;
  borderColor: string;
  hoverBgColor: string;
  textHoverColor: string;
  icon?: string;
  onClick: Function;
};

export type tertiaryMiniButtonType = {
  icon: string;
  onClick: Function;
  iconColor: string;
  borderColor: string;
  hoverBgColor: string;
  iconHoverColor: string;
};

export type sidebarType = {
  role: "" | "user" | "admin";
  notiCount: number;
};

export type userAccountType = {
  src: string;
  userName: string;
  role: "user" | "admin" | '';
};

export type searchBoxType = {
  isBorder?: boolean;
  onChange: Function;
  placeholder: string;
  value: string;
  isButton?: boolean;
  buttonOnClick?: Function;
  isShowClearValue?: boolean;
  height: string;
};

export type recipePropType = {
  id: string
  name: string
  method: string
  image: string
  author: string
  averageRating: number
  isBorder?: boolean
};

export type snapshotPropType = {
  _id: string
  caption: string
  image: string
  author: {
    _id: string
    username: string
    image: string
  }
  recipe: {
    _id: string
    name: string
  }
  createdAt: string
}

export type ingredientPropType = {
  ingredient: {
    _id: string;
    name: string;
    type: {
      _id: string;
      name: string;
    };
    image: string;
    unit?: {
      _id: string
      name: string
      queryKey: string
    }
  } | null;
  isBorder?: boolean;
  hasCheckbox?: boolean;
  onChange?: Function;
  isChecked?: boolean;
  hasArrow?: boolean
};

export type nutrientType = {
  label: string;
  quantity: number;
  unit: string;
};

export type nutritionType = {
  calories: number;
  totalWeight: number;
  totalNutrients: {
    ENERC_KCAL: nutrientType;
    FAT: nutrientType;
    FASAT: nutrientType;
    FAMS: nutrientType;
    FAPU: nutrientType;
    CHOCDF: nutrientType;
    FIBTG: nutrientType;
    SUGAR: nutrientType;
    PROCNT: nutrientType;
    CHOLE: nutrientType;
    NA: nutrientType;
    CA: nutrientType;
    MG: nutrientType;
    K: nutrientType;
    FE: nutrientType;
    ZN: nutrientType;
    P: nutrientType;
    VITC: nutrientType;
    THIA: nutrientType;
    RIBF: nutrientType;
    NIA: nutrientType;
    VITB6A: nutrientType;
    FOLDFE: nutrientType;
    FOLFD: nutrientType;
    FOLAC: nutrientType;
    VITB12: nutrientType;
    VITD: nutrientType;
    TOCPHA: nutrientType;
    VITK1: nutrientType;
    WATER: nutrientType;
  };
  totalDaily: {
    ENERC_KCAL: nutrientType;
    FAT: nutrientType;
    FASAT: nutrientType;
    CHOCDF: nutrientType;
    FIBTG: nutrientType;
    SUGAR: nutrientType;
    PROCNT: nutrientType;
    CHOLE: nutrientType;
    NA: nutrientType;
    CA: nutrientType;
    MG: nutrientType;
    K: nutrientType;
    FE: nutrientType;
    ZN: nutrientType;
    P: nutrientType;
    VITC: nutrientType;
    THIA: nutrientType;
    RIBF: nutrientType;
    NIA: nutrientType;
    VITB6A: nutrientType;
    FOLDFE: nutrientType;
    VITB12: nutrientType;
    VITD: nutrientType;
    TOCPHA: nutrientType;
    VITK1: nutrientType;
  };
  totalNutrientsKCal: {
    ENERC_KCAL: nutrientType;
    PROCNT_KCAL: nutrientType;
    FAT_KCAL: nutrientType;
    CHOCDF_KCAL: nutrientType;
  };
};

export type nutritionLabelType = {
  type: 'recipe' | 'ingredient'
  unit?: {
    _id: string
    name: string
    queryKey: string
  }
  nutrition: nutritionType
  serve?: number
}

export type textBoxType = {
  label?: string;
  value: string;
  error?: string | string[] | FormikErrors<any> | FormikErrors<any>[];
  placeholder?: string;
  disabled?: boolean;
  type: "text" | "number" | "password";
  onChange: (e) => void;
  non_negative?: boolean;
};

export type radioInputType = {
  label: string;
  checked: boolean;
  onClick: () => void;
};

export type selectInputType = {
  title?: string | string[];
  value: string | string[];
  error?: string | string[] | FormikErrors<any> | FormikErrors<any>[];
  placeholder?: string;
  disabled?: boolean;
  options: { name: string; value: string }[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isBorder?: boolean;
};

export type breadcrumbType = {
  routes: {
    title: string;
    onRoute: string;
  }[];
};
