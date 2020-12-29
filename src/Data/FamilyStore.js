import { uuidv4 } from "uuid/v4";
import { observable } from "mobx-react-lite";

export class FamilyStore {
  constructor() {
    this.id = uuidv4();
  }
  @observable members = [];
  @action addMember = member => {
    this.members.push(member);
  };
}
