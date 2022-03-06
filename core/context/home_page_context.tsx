import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import { getProfileName } from "@core/services/profile/get_profile";
import { ProfileType } from "core/types/profile_types";

class HomePage {
  userProfile: ProfileType
  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    this.userProfile = {
      name: '',
      email: ''
    }
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
      this.userProfile = resp.data?.userProfile
      console.log(this.userProfile)
    } catch (error) {
      console.log(error)
    }
  }
}
export const HomePageContext = createContext(new HomePage());
