import { createContext } from "react";
import { makeAutoObservable } from "mobx";

class HomePage {
  recipes;
  snapshots;
  ingredients;
  nutrition;
  ingredient
  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    this.recipes = [
      {
        id: "1",
        title: "สเต็กริบอายซอสพริกไทยดำ 1",
        description:
          "สเต็กริบอายสูตรเฉพาะของไรเดน โชกุน อร่อยที่สุดในเมืองอินาซุมะ อร่อยจนคุโจว ซาระลองชิมแล้วถึงกับต้องขอเพิ่มอีก 10 จาน ใครว่าโชกุนทำอาหารไม่เป็นกันนะ",
        src: "/images/core/rib-eye_steak.jpg",
        created_by: "ไรเดน โชกุน",
        created_at: "2022-04-12T08:00:00.000Z",
        tags: ["อาหารทั่วไป", "อาหารประเภทย่าง", "มีส่วนประกอบของเนื้อ"],
        rating: 5.0,
        rating_count: 120,
      },
      {
        id: "2",
        title: "สเต็กริบอายซอสพริกไทยดำ 2",
        description:
          "สเต็กริบอายสูตรเฉพาะของไรเดน โชกุน อร่อยที่สุดในเมืองอินาซุมะ อร่อยจนคุโจว ซาระลองชิมแล้วถึงกับต้องขอเพิ่มอีก 10 จาน ใครว่าโชกุนทำอาหารไม่เป็นกันนะ",
        src: "/images/core/rib-eye_steak.jpg",
        created_by: "ไรเดน โชกุน",
        created_at: "2022-04-12T08:00:00.000Z",
        tags: ["อาหารทั่วไป", "อาหารประเภทย่าง", "มีส่วนประกอบของเนื้อ"],
        rating: 4.7,
        rating_count: 80,
      },
      {
        id: "3",
        title: "สเต็กริบอายซอสพริกไทยดำ 3",
        description:
          "สเต็กริบอายสูตรเฉพาะของไรเดน โชกุน อร่อยที่สุดในเมืองอินาซุมะ อร่อยจนคุโจว ซาระลองชิมแล้วถึงกับต้องขอเพิ่มอีก 10 จาน ใครว่าโชกุนทำอาหารไม่เป็นกันนะ",
        src: "/images/core/rib-eye_steak.jpg",
        created_by: "ไรเดน โชกุน",
        created_at: "2022-04-12T08:00:00.000Z",
        tags: ["อาหารทั่วไป", "อาหารประเภทย่าง", "มีส่วนประกอบของเนื้อ"],
        rating: 0.6,
        rating_count: 10,
      },
      {
        id: "4",
        title: "สเต็กริบอายซอสพริกไทยดำ 4",
        description:
          "สเต็กริบอายสูตรเฉพาะของไรเดน โชกุน อร่อยที่สุดในเมืองอินาซุมะ อร่อยจนคุโจว ซาระลองชิมแล้วถึงกับต้องขอเพิ่มอีก 10 จาน ใครว่าโชกุนทำอาหารไม่เป็นกันนะ",
        src: "/images/core/rib-eye_steak.jpg",
        created_by: "ไรเดน โชกุน",
        created_at: "2022-04-12T08:00:00.000Z",
        tags: ["อาหารทั่วไป", "อาหารประเภทย่าง", "มีส่วนประกอบของเนื้อ"],
        rating: 0.2,
        rating_count: 40,
      },
    ];
    this.snapshots = [
      {
        id: "1",
        detail:
          "อร่อยมากแบบมากที่สุด อร่อยจนอยากให้ท่านเทพบาร์บาทอสได้มาลองทานสิ่งนี้ดูบ้างจังเลยค่ะ เผื่อว่าท่านเทพจะหันมามองหนูบ้าง",
        src: "/images/core/mockSteak.png",
        created_by: "บาบาร่า อิคุโย๊",
        created_at: "2022-04-13T08:00:00.000Z",
        recipe: {
          id: "1",
          title: "สเต็กริบอายซอสพริกไทยดำ 1",
        },
      },
      {
        id: "2",
        detail:
          "อร่อยมากแบบมากที่สุด อร่อยจนอยากให้ท่านเทพบาร์บาทอสได้มาลองทานสิ่งนี้ดูบ้างจังเลยค่ะ เผื่อว่าท่านเทพจะหันมามองหนูบ้าง",
        src: "/images/core/mockSteak.png",
        created_by: "บาบาร่า อิคุโย๊",
        created_at: "2022-04-13T08:00:00.000Z",
        recipe: {
          id: "1",
          title: "สเต็กริบอายซอสพริกไทยดำ 1",
        },
      },
      {
        id: "3",
        detail:
          "อร่อยมากแบบมากที่สุด อร่อยจนอยากให้ท่านเทพบาร์บาทอสได้มาลองทานสิ่งนี้ดูบ้างจังเลยค่ะ เผื่อว่าท่านเทพจะหันมามองหนูบ้าง",
        src: "/images/core/mockSteak.png",
        created_by: "บาบาร่า อิคุโย๊",
        created_at: "2022-04-13T08:00:00.000Z",
        recipe: {
          id: "1",
          title: "สเต็กริบอายซอสพริกไทยดำ 1",
        },
      },
      {
        id: "4",
        detail:
          "อร่อยมากแบบมากที่สุด อร่อยจนอยากให้ท่านเทพบาร์บาทอสได้มาลองทานสิ่งนี้ดูบ้างจังเลยค่ะ เผื่อว่าท่านเทพจะหันมามองหนูบ้าง",
        src: "/images/core/mockSteak.png",
        created_by: "บาบาร่า อิคุโย๊",
        created_at: "2022-04-13T08:00:00.000Z",
        recipe: {
          id: "1",
          title: "สเต็กริบอายซอสพริกไทยดำ 1",
        },
      },
    ];
    this.ingredients = [
      {
        id: "1",
        name: "ผักกาดขาว",
        src: "/images/core/Item_Cabbage.png",
        type: "ผักและผลไม้",
      },
      {
        id: "2",
        name: "ผักกาดขาว",
        src: "/images/core/Item_Cabbage.png",
        type: "ผักและผลไม้",
      },
      {
        id: "3",
        name: "ผักกาดขาว",
        src: "/images/core/Item_Cabbage.png",
        type: "ผักและผลไม้",
      },
      {
        id: "4",
        name: "ผักกาดขาว",
        src: "/images/core/Item_Cabbage.png",
        type: "ผักและผลไม้",
      },
    ];
    this.nutrition = {
      uri: "http://www.edamam.com/ontologies/edamam.owl#recipe_55df5677ff09432a8340241aa804fd14",
      calories: 13,
      totalWeight: 100,
      dietLabels: ["LOW_SODIUM"],
      healthLabels: [
        "FAT_FREE",
        "LOW_FAT_ABS",
        "SUGAR_CONSCIOUS",
        "LOW_POTASSIUM",
        "KIDNEY_FRIENDLY",
        "KETO_FRIENDLY",
        "VEGAN",
        "VEGETARIAN",
        "PESCATARIAN",
        "PALEO",
        "SPECIFIC_CARBS",
        "MEDITERRANEAN",
        "DASH",
        "DAIRY_FREE",
        "GLUTEN_FREE",
        "WHEAT_FREE",
        "EGG_FREE",
        "MILK_FREE",
        "PEANUT_FREE",
        "TREE_NUT_FREE",
        "SOY_FREE",
        "FISH_FREE",
        "SHELLFISH_FREE",
        "PORK_FREE",
        "RED_MEAT_FREE",
        "CRUSTACEAN_FREE",
        "CELERY_FREE",
        "MUSTARD_FREE",
        "SESAME_FREE",
        "LUPINE_FREE",
        "MOLLUSK_FREE",
        "ALCOHOL_FREE",
        "NO_OIL_ADDED",
        "NO_SUGAR_ADDED",
        "SULPHITE_FREE",
        "FODMAP_FREE",
        "KOSHER",
      ],
      cautions: [],
      totalNutrients: {
        ENERC_KCAL: {
          label: "Energy",
          quantity: 13,
          unit: "kcal",
        },
        FAT: {
          label: "Total lipid (fat)",
          quantity: 0.22,
          unit: "g",
        },
        FASAT: {
          label: "Fatty acids, total saturated",
          quantity: 0.029,
          unit: "g",
        },
        FAMS: {
          label: "Fatty acids, total monounsaturated",
          quantity: 0.008,
          unit: "g",
        },
        FAPU: {
          label: "Fatty acids, total polyunsaturated",
          quantity: 0.117,
          unit: "g",
        },
        CHOCDF: {
          label: "Carbohydrate, by difference",
          quantity: 2.23,
          unit: "g",
        },
        FIBTG: {
          label: "Fiber, total dietary",
          quantity: 1.1,
          unit: "g",
        },
        SUGAR: {
          label: "Sugars, total",
          quantity: 0.94,
          unit: "g",
        },
        PROCNT: {
          label: "Protein",
          quantity: 1.35,
          unit: "g",
        },
        CHOLE: {
          label: "Cholesterol",
          quantity: 0,
          unit: "mg",
        },
        NA: {
          label: "Sodium, Na",
          quantity: 5,
          unit: "mg",
        },
        CA: {
          label: "Calcium, Ca",
          quantity: 35,
          unit: "mg",
        },
        MG: {
          label: "Magnesium, Mg",
          quantity: 13,
          unit: "mg",
        },
        K: {
          label: "Potassium, K",
          quantity: 238,
          unit: "mg",
        },
        FE: {
          label: "Iron, Fe",
          quantity: 1.24,
          unit: "mg",
        },
        ZN: {
          label: "Zinc, Zn",
          quantity: 0.2,
          unit: "mg",
        },
        P: {
          label: "Phosphorus, P",
          quantity: 33,
          unit: "mg",
        },
        VITA_RAE: {
          label: "Vitamin A, RAE",
          quantity: 166,
          unit: "µg",
        },
        VITC: {
          label: "Vitamin C, total ascorbic acid",
          quantity: 3.7,
          unit: "mg",
        },
        THIA: {
          label: "Thiamin",
          quantity: 0.057,
          unit: "mg",
        },
        RIBF: {
          label: "Riboflavin",
          quantity: 0.062,
          unit: "mg",
        },
        NIA: {
          label: "Niacin",
          quantity: 0.357,
          unit: "mg",
        },
        VITB6A: {
          label: "Vitamin B-6",
          quantity: 0.082,
          unit: "mg",
        },
        FOLDFE: {
          label: "Folate, DFE",
          quantity: 73,
          unit: "µg",
        },
        FOLFD: {
          label: "Folate, food",
          quantity: 73,
          unit: "µg",
        },
        FOLAC: {
          label: "Folic acid",
          quantity: 0,
          unit: "µg",
        },
        VITB12: {
          label: "Vitamin B-12",
          quantity: 0,
          unit: "µg",
        },
        VITD: {
          label: "Vitamin D (D2 + D3)",
          quantity: 0,
          unit: "µg",
        },
        TOCPHA: {
          label: "Vitamin E (alpha-tocopherol)",
          quantity: 0.18,
          unit: "mg",
        },
        VITK1: {
          label: "Vitamin K (phylloquinone)",
          quantity: 102.3,
          unit: "µg",
        },
        WATER: {
          label: "Water",
          quantity: 95.63,
          unit: "g",
        },
      },
      totalDaily: {
        ENERC_KCAL: {
          label: "Energy",
          quantity: 0.65,
          unit: "%",
        },
        FAT: {
          label: "Fat",
          quantity: 0.3384615384615385,
          unit: "%",
        },
        FASAT: {
          label: "Saturated",
          quantity: 0.14500000000000002,
          unit: "%",
        },
        CHOCDF: {
          label: "Carbs",
          quantity: 0.7433333333333333,
          unit: "%",
        },
        FIBTG: {
          label: "Fiber",
          quantity: 4.4,
          unit: "%",
        },
        PROCNT: {
          label: "Protein",
          quantity: 2.7,
          unit: "%",
        },
        CHOLE: {
          label: "Cholesterol",
          quantity: 0,
          unit: "%",
        },
        NA: {
          label: "Sodium",
          quantity: 0.20833333333333334,
          unit: "%",
        },
        CA: {
          label: "Calcium",
          quantity: 3.5,
          unit: "%",
        },
        MG: {
          label: "Magnesium",
          quantity: 3.0952380952380953,
          unit: "%",
        },
        K: {
          label: "Potassium",
          quantity: 5.0638297872340425,
          unit: "%",
        },
        FE: {
          label: "Iron",
          quantity: 6.888888888888889,
          unit: "%",
        },
        ZN: {
          label: "Zinc",
          quantity: 1.8181818181818181,
          unit: "%",
        },
        P: {
          label: "Phosphorus",
          quantity: 4.714285714285714,
          unit: "%",
        },
        VITA_RAE: {
          label: "Vitamin A",
          quantity: 18.444444444444443,
          unit: "%",
        },
        VITC: {
          label: "Vitamin C",
          quantity: 4.111111111111111,
          unit: "%",
        },
        THIA: {
          label: "Thiamin (B1)",
          quantity: 4.75,
          unit: "%",
        },
        RIBF: {
          label: "Riboflavin (B2)",
          quantity: 4.769230769230769,
          unit: "%",
        },
        NIA: {
          label: "Niacin (B3)",
          quantity: 2.2312499999999997,
          unit: "%",
        },
        VITB6A: {
          label: "Vitamin B6",
          quantity: 6.307692307692308,
          unit: "%",
        },
        FOLDFE: {
          label: "Folate equivalent (total)",
          quantity: 18.25,
          unit: "%",
        },
        VITB12: {
          label: "Vitamin B12",
          quantity: 0,
          unit: "%",
        },
        VITD: {
          label: "Vitamin D",
          quantity: 0,
          unit: "%",
        },
        TOCPHA: {
          label: "Vitamin E",
          quantity: 1.2,
          unit: "%",
        },
        VITK1: {
          label: "Vitamin K",
          quantity: 85.25,
          unit: "%",
        },
      },
      totalNutrientsKCal: {
        ENERC_KCAL: {
          label: "Energy",
          quantity: 13,
          unit: "kcal",
        },
        PROCNT_KCAL: {
          label: "Calories from protein",
          quantity: 4,
          unit: "kcal",
        },
        FAT_KCAL: {
          label: "Calories from fat",
          quantity: 2,
          unit: "kcal",
        },
        CHOCDF_KCAL: {
          label: "Calories from carbohydrates",
          quantity: 7,
          unit: "kcal",
        },
      },
    };
    this.ingredient = {
      id: "1",
      name: "ผักกาดขาว",
      src: "/images/core/Item_Cabbage.png",
      type: "ผักและผลไม้",
      unit: 'gram'
    }
    makeAutoObservable(this);
  }

  //-------------------
  // ACTION
  //-------------------
  setValue(key: string, value: any) {
    this[key] = value;
  }
}
export const HomePageContext = createContext(new HomePage());
