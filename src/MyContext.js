import React from "react";
import produce from "immer";
import uuid from "uuid";
import * as _ from "lodash";
import mailgun from "mailgun-js";
import { Input } from "@material-ui/core";
// import { FamilyStore } from "Data/FamilyStore";
// import { useLocalStore } from "mobx-react-lite";

export const MyContext = React.createContext();
// export const familyContext = React.createContext();

// export const FamilyProvider = ({ children }) => {
//   // const store = useLocalStore(new FamilyStore());

//   return (
//     <familyContext.Provider value={store}>{children}</familyContext.Provider>
//   );
// };

class Person {
  id = "";
  name = "";
  family;
  constructor(famID) {
    this.family = famID;
    this.id = uuid.v4();
  }
}

export class MyProvider extends React.Component {
  state = {
    people: [],
    familyMode: true,
    currentFamID: 1,
    assignedTo: null,
    hasGenerated: false,
    selectedIdx: 0,
    display: false,
  };

  addPerson = famID => {
    this.setState(
      produce(draft => {
        draft.people.push(new Person(famID || draft.currentFamID));
      })
    );
  };
  addFamily = () => {
    this.setState(
      produce(draft => {
        draft.currentFamID++;
      })
    );
    // this.addPerson();
    this.addPerson();
  };
  handleChange = e => {
    const { id, value } = e.target;
    this.setState(
      produce(draft => {
        draft.people.find(_ => _.id === id).name = value;
      })
    );
  };
  toggleFamilyMode = () => {
    this.setState(
      produce(draft => {
        draft.familyMode = !this.state.familyMode;
      })
    );
  };
  generate = () => {
    const assignPool = [...this.state.people];
    const copyForState = [...this.state.people];
    // const checkInFam = (id, famID) => true;

    this.state.people.forEach((person, idx) => {
      const randomizer = () => Math.floor(Math.random() * assignPool.length);
      let assign = randomizer();
      const thisFam = this.state.people.filter(_ => _.family === person.family);
      // const toBeAssigned = copyForState.find()
      // const isInFam = checkInFam()
      if (
        (idx === copyForState.length - 1 &&
          person.id === assignPool[assign].id) ||
        person.family === _.uniq(assignPool.map(x => x.family)).toString()
      ) {
        this.generate();
      }

      while (!!thisFam.find(_ => _.id === assignPool[assign].id)) {
        assign = randomizer();
      }

      copyForState.find(_ => _.id === person.id).assignedTo =
        assignPool[assign].name;
      assignPool.splice(assign, 1);
    });
    this.setState({ people: copyForState });
    // alert(this.state.people.map(_ => `${_.name} - ${_.assignedTo}`).join("\n"));
    // const response = prompt("What is your name?");
    // alert(
    //   `Hi, ${response}, you have, ${this.state.people.find(
    //     _ => _.name.toLowerCase() === response.toLowerCase()
    //   ).assignedTo || "ERROR"}`
    // );
    this.setState({ hasGenerated: true });
  };
  handleSelect = e => {
    const { value } = e.target;
    this.setState({ selectedIdx: value, display: false });
  };
  handleDisplay = () => {
    const curr = this.state.display;
    this.setState({ display: !curr });
  };

  render() {
    return (
      <MyContext.Provider
        value={{
          state: this.state,
          addPerson: this.addPerson,
          handleChange: this.handleChange,
          toggleFamilyMode: this.toggleFamilyMode,
          addFamily: this.addFamily,
          generate: this.generate,
          handleSelect: this.handleSelect,
          handleDisplay: this.handleDisplay,
        }}
      >
        {this.props.children}
      </MyContext.Provider>
    );
  }
}
