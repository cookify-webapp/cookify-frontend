import { createContext } from "react";
import { makeAutoObservable } from "mobx";

class HomePage {
  recipes;
  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    this.recipes = [
      {
        id: '1',
        title: "สเต็กริบอายซอสพริกไทยดำ 1",
        description:
          "สเต็กริบอายสูตรเฉพาะของไรเดน โชกุน อร่อยที่สุดในเมืองอินาซุมะ อร่อยจนคุโจว ซาระลองชิมแล้วถึงกับต้องขอเพิ่มอีก 10 จาน ใครว่าโชกุนทำอาหารไม่เป็นกันนะ",
        src: "/images/core/rib-eye_steak.jpg",
        created_by: "ไรเดน โชกุน",
        created_at: "2022-04-12T08:00:00.000Z",
        tags: ["อาหารทั่วไป","อาหารประเภทย่าง", "มีส่วนประกอบของเนื้อ"],
        rating: 5.0,
        rating_count: 120
      },
      {
        id: '2',
        title: "สเต็กริบอายซอสพริกไทยดำ 2",
        description:
          "สเต็กริบอายสูตรเฉพาะของไรเดน โชกุน อร่อยที่สุดในเมืองอินาซุมะ อร่อยจนคุโจว ซาระลองชิมแล้วถึงกับต้องขอเพิ่มอีก 10 จาน ใครว่าโชกุนทำอาหารไม่เป็นกันนะ",
        src: "/images/core/rib-eye_steak.jpg",
        created_by: "ไรเดน โชกุน",
        created_at: "2022-04-12T08:00:00.000Z",
        tags: ["อาหารทั่วไป","อาหารประเภทย่าง", "มีส่วนประกอบของเนื้อ"],
        rating: 4.7,
        rating_count: 80
      },
      {
        id: '3',
        title: "สเต็กริบอายซอสพริกไทยดำ 3",
        description:
          "สเต็กริบอายสูตรเฉพาะของไรเดน โชกุน อร่อยที่สุดในเมืองอินาซุมะ อร่อยจนคุโจว ซาระลองชิมแล้วถึงกับต้องขอเพิ่มอีก 10 จาน ใครว่าโชกุนทำอาหารไม่เป็นกันนะ",
        src: "/images/core/rib-eye_steak.jpg",
        created_by: "ไรเดน โชกุน",
        created_at: "2022-04-12T08:00:00.000Z",
        tags: ["อาหารทั่วไป","อาหารประเภทย่าง", "มีส่วนประกอบของเนื้อ"],
        rating: 0.6,
        rating_count: 10
      },
      {
        id: '4',
        title: "สเต็กริบอายซอสพริกไทยดำ 4",
        description:
          "สเต็กริบอายสูตรเฉพาะของไรเดน โชกุน อร่อยที่สุดในเมืองอินาซุมะ อร่อยจนคุโจว ซาระลองชิมแล้วถึงกับต้องขอเพิ่มอีก 10 จาน ใครว่าโชกุนทำอาหารไม่เป็นกันนะ",
        src: "/images/core/rib-eye_steak.jpg",
        created_by: "ไรเดน โชกุน",
        created_at: "2022-04-12T08:00:00.000Z",
        tags: ["อาหารทั่วไป","อาหารประเภทย่าง", "มีส่วนประกอบของเนื้อ"],
        rating: 0.2,
        rating_count: 40
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
}
export const HomePageContext = createContext(new HomePage());
