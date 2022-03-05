import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import { getProfileName } from "@core/services/profile/get_profile";
import { ProfileType } from "core/types/profile_types";

class HomePage {
  name: ProfileType
  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    makeAutoObservable(this);
  }

  //-------------------
  // ACTION
  //-------------------
  setValue(key: string, value: any) {
    this[key] = value;
  }

  prepareAvatar = async () => {
    try {
      const resp = await getProfileName()
      console.log(resp.data)
      this.name = resp.data?.userProfile.name
      console.log(this.name)
    } catch (error) {
      console.log(error)
    }
  }
}
export const HomePageContext = createContext(new HomePage());
