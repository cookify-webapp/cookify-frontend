import { FormikErrors, FormikTouched } from "formik"
import { ChangeEvent } from "react"
import { string } from "yup"

export type primaryButtonType = {
  title: string
  onClick: Function
  disabled?: boolean
}

export type secondaryButtonType = {
  title: string
  onClick: Function
}

export type secondaryMiniButtonType = {
  icon: string
  onClick: Function
}

export type tertiaryButtonType = {
  title: string
  textColor: string
  borderColor: string
  hoverBgColor: string
  textHoverColor: string
  icon?: string
  onClick: Function
}

export type tertiaryMiniButtonType = {
  icon: string
  onClick: Function
  iconColor: string
  borderColor: string
  hoverBgColor: string
  iconHoverColor: string
}

export type sidebarType = {
  role: "" | "user" | "admin"
  notiCount: number
}

export type userAccountType = {
  src: string
  userName: string
  role: "user" | "admin"
}

export type searchBoxType = {
  isBorder?: boolean
  onChange: Function
  placeholder: string
  value: string
  isButton?: boolean
  buttonOnClick?: Function
  isShowClearValue?: boolean
}

export type recipePropType = {
  recipe: {
    id: string
    src: string
    rating: number
    rating_count: number
    title: string
    description: string
    created_by: string
    created_at: string
    tags: []
  } | null
  role: "" | "user" | "admin"
  isBookmark: boolean
  onClick: Function
}

export type ingredientPropType = {
  ingredient: {
    id: string
    name: string
    src: string
    type: string
  } | null
  isBorder?: boolean
  hasCheckbox?: boolean
  onChange?: Function
  isChecked?: boolean
}

export type nutrientType = {
  label: string
  quantity: number
  unit: string
}

export type nutritionLabelType = {
  nutrition: {
    uri: string
    calories: number
    totalWeight: number
    dietLabels: string[]
    healthLabels: string[]
    cautions: string[]
    totalNutrients: {
      ENERC_KCAL: nutrientType
      FAT: nutrientType
      FASAT: nutrientType
      FAMS: nutrientType
      FAPU: nutrientType
      CHOCDF: nutrientType
      FIBTG: nutrientType
      SUGAR: nutrientType
      PROCNT: nutrientType
      CHOLE: nutrientType
      NA: nutrientType
      CA: nutrientType
      MG: nutrientType
      K: nutrientType
      FE: nutrientType
      ZN: nutrientType
      P: nutrientType
      VITA_RAE: nutrientType
      VITC: nutrientType
      THIA: nutrientType
      RIBF: nutrientType
      NIA: nutrientType
      VITB6A: nutrientType
      FOLDFE: nutrientType
      FOLFD: nutrientType
      FOLAC: nutrientType
      VITB12: nutrientType
      VITD: nutrientType
      TOCPHA: nutrientType
      VITK1: nutrientType
      WATER: nutrientType
    }
    totalDaily: {
      ENERC_KCAL: nutrientType
      FAT: nutrientType
      FASAT: nutrientType
      FAMS: nutrientType
      FAPU: nutrientType
      CHOCDF: nutrientType
      FIBTG: nutrientType
      SUGAR: nutrientType
      PROCNT: nutrientType
      CHOLE: nutrientType
      NA: nutrientType
      CA: nutrientType
      MG: nutrientType
      K: nutrientType
      FE: nutrientType
      ZN: nutrientType
      P: nutrientType
      VITA_RAE: nutrientType
      VITC: nutrientType
      THIA: nutrientType
      RIBF: nutrientType
      NIA: nutrientType
      VITB6A: nutrientType
      FOLDFE: nutrientType
      FOLFD: nutrientType
      FOLAC: nutrientType
      VITB12: nutrientType
      VITD: nutrientType
      TOCPHA: nutrientType
      VITK1: nutrientType
      WATER: nutrientType
    }
    totalNutrientsKCal: {
      ENERC_KCAL: nutrientType
      PROCNT_KCAL: nutrientType
      FAT_KCAL: nutrientType
      CHOCDF_KCAL: nutrientType
    }
  }
  type: "recipe" | 'ingredient'
  ingredient?: {
    id: string
    name: string
    src: string
    type: string
    unit: 'gram' | 'milliliter' | 'tablespoon' | 'teaspoon' | 'cup' | 'piece' | 'whole' | 'sheet'
  }
}

export type textBoxType = {
  label: string
  value: string
  error?: string | string[] | FormikErrors<any> | FormikErrors<any>[]
  placeholder?: string
  disabled?: boolean
  type: "text" | "number" | "password"
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  touched?: FormikTouched<boolean> | FormikTouched<any> | FormikTouched<any>[]
  non_negative?: boolean
}