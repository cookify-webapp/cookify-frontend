import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import { getIngredientsList } from "@core/services/ingredients/get_ingredients";
import { getRecipesList } from "@core/services/recipes/get_recipes";

class HomePage {
  recipes;
  snapshots;
  ingredients;
  nutrition;
  ingredient
  modalContext: any;

  loading
  loadingRecipe: boolean;
  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    this.loading = true
    this.loadingRecipe = false
    this.recipes = [
      {
        _id: "62a4a48b1ac09ddd225d611a",
        name: "สเต็กริบอายซอสพริกไทยดํา",
        method: {
          _id: "626c3a279c65b3a236797b53",
          "name": "ปิ้งย่าง"
        },
        image: "5cc3afbdc1e1e588.jpg",
        author: {
          _id: "625ec5d9cb848302931ce63f",
          "username": "MrnDew"
        },
        createdAt: "2022-06-11T14:19:56.469Z",
        averageRating: 0,
        bookmarked: false
      },
      {
        _id: "62a4a48b1ac09ddd225d611a",
        name: "สเต็กริบอายซอสพริกไทยดํา",
        method: {
          _id: "626c3a279c65b3a236797b53",
          "name": "ปิ้งย่าง"
        },
        image: "5cc3afbdc1e1e588.jpg",
        author: {
          _id: "625ec5d9cb848302931ce63f",
          "username": "MrnDew"
        },
        createdAt: "2022-06-11T14:19:56.469Z",
        averageRating: 3,
        bookmarked: false
      },
      {
        _id: "62a4a48b1ac09ddd225d611a",
        name: "สเต็กริบอายซอสพริกไทยดํา",
        method: {
          _id: "626c3a279c65b3a236797b53",
          "name": "ปิ้งย่าง"
        },
        image: "5cc3afbdc1e1e588.jpg",
        author: {
          _id: "625ec5d9cb848302931ce63f",
          "username": "MrnDew"
        },
        createdAt: "2022-06-11T14:19:56.469Z",
        averageRating: 2.5,
        bookmarked: false
      },
      {
        _id: "62a4a48b1ac09ddd225d611a",
        name: "สเต็กริบอายซอสพริกไทยดํา",
        method: {
          _id: "626c3a279c65b3a236797b53",
          "name": "ปิ้งย่าง"
        },
        image: "5cc3afbdc1e1e588.jpg",
        author: {
          _id: "625ec5d9cb848302931ce63f",
          "username": "MrnDew"
        },
        createdAt: "2022-06-11T14:19:56.469Z",
        averageRating: 4.8,
        bookmarked: false
      },
      {
        _id: "62a4a48b1ac09ddd225d611a",
        name: "สเต็กริบอายซอสพริกไทยดํา",
        method: {
          _id: "626c3a279c65b3a236797b53",
          "name": "ปิ้งย่าง"
        },
        image: "5cc3afbdc1e1e588.jpg",
        author: {
          _id: "625ec5d9cb848302931ce63f",
          "username": "MrnDew"
        },
        createdAt: "2022-06-11T14:19:56.469Z",
        averageRating: 1.2,
        bookmarked: false
      },
      {
        _id: "62a4a48b1ac09ddd225d611a",
        name: "สเต็กริบอายซอสพริกไทยดํา",
        method: {
          _id: "626c3a279c65b3a236797b53",
          "name": "ปิ้งย่าง"
        },
        image: "5cc3afbdc1e1e588.jpg",
        author: {
          _id: "625ec5d9cb848302931ce63f",
          "username": "MrnDew"
        },
        createdAt: "2022-06-11T14:19:56.469Z",
        averageRating: 5,
        bookmarked: false
      }
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
      {
        id: "5",
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
        id: "6",
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

    makeAutoObservable(this);
  }

  //-------------------
  // ACTION
  //-------------------
  setValue(key: string, value: any) {
    this[key] = value;
  }

  prepareIngredient = async () => {
    try {
      const resp = await getIngredientsList({
        searchWord: "",
        typeId: "",
        page: 1,
        perPage: 4,
      })
      if (resp.status === 200) {
        this.ingredients = resp.data?.ingredients
      }
    } catch (error) {
      this.modalContext.openModal(
        "มีปัญหาในการดึงรายการวัตถุดิบ",
        error.message,
        () => this.modalContext.closeModal(),
        "ปิด",
        "ตกลง"
      );
    } finally {
      this.loading = false
    }
  }

  prepareRecipesList = async () => {
    try {
      this.loadingRecipe = true
      const resp = await getRecipesList({
        searchWord: '',
        methodId: '',
        ingredientId: "",
        page: 1,
        perPage: 6
      })
      if (resp.status === 200) {
        this.recipes = resp.data?.recipes
      } else if (resp.status === 204) {
        this.recipes = []
      }
    } catch (error) {
      this.modalContext.openModal(
        "มีปัญหาในการดึงรายการสูตรอาหาร",
        error.message,
        () => this.modalContext.closeModal(),
        "ปิด",
        "ตกลง"
      );
    } finally {
      this.loadingRecipe = false
    }
  }
}
export const HomePageContext = createContext(new HomePage());
