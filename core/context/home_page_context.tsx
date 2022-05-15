import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import { getIngredientsList } from "@core/services/ingredients/get_ingredients";

class HomePage {
  recipes;
  snapshots;
  ingredients;
  nutrition;
  ingredient
  modalContext: any;

  loading
  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    this.loading = true
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
}
export const HomePageContext = createContext(new HomePage());
