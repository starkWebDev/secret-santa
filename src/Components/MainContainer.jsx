import React from "react";
import {
  Container,
  Paper,
  Typography,
  Button,
  TextField,
  Checkbox,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { MyContext } from "../MyContext";
import * as _ from "lodash";

export const MainContainer = () => {
  const context = React.useContext(MyContext);
  React.useEffect(() => {
    context.addPerson();
  }, []);
  return (
    <MyContext.Consumer>
      {context => (
        <Container
          style={{
            maxWidth: "500px",
            maxHeight: "600px",
            margin: "auto",
            marginTop: "150px",
          }}
        >
          <Paper style={{ width: "500px", height: "600px", padding: "16px" }}>
            {/* {!context.state.hasGenerated && (
              <FormControlLabel
                control={
                  <Switch
                    checked={context.state.familyMode}
                    onClick={context.toggleFamilyMode}
                    id="family-mode-switch"
                  />
                }
                label="Family Mode"
              />
            )} */}
            {context.state.familyMode && !context.state.hasGenerated
              ? _.uniq(context.state.people.map(_ => _.family)).map(family => (
                  <div
                    style={{
                      border: "1px gray solid",
                      margin: "4px",
                      padding: "8px",
                      borderRadius: "4px",
                    }}
                  >
                    <div style={rowStyles}>
                      <Typography>Family #{family}</Typography>
                      <Button onClick={() => context.addPerson()}>Add</Button>
                    </div>
                    {context.state.people
                      .filter(_ => _.family === family)
                      .map((person, idx) => (
                        <div key={`name${idx}`}>
                          <TextField
                            value={person.name}
                            id={person.id}
                            onChange={context.handleChange}
                          />
                        </div>
                      ))}
                  </div>
                ))
              : !context.state.hasGenerated &&
                context.state.people.map((person, idx) => (
                  <div key={`name${idx}`}>
                    <TextField
                      value={person.name}
                      id={person.id}
                      onChange={context.handleChange}
                    />
                  </div>
                ))}
            {/* {context.state.people.map((person, idx) => (
              <div key={`name${idx}`}>
                <TextField
                  value={person.name}
                  id={idx.toString()}
                  onChange={context.handleChange}
                />
              </div>
            ))} */}
            {/* {!context.state.hasGenerated && (
              <Button onClick={() => context.addPerson()}>Add Person</Button>
            )} */}
            {context.state.familyMode && !context.state.hasGenerated && (
              <Button onClick={() => context.addFamily()}>Add Family</Button>
            )}
            {!context.state.hasGenerated && (
              <Button onClick={() => context.generate()} color="primary">
                Generate
              </Button>
            )}
            {context.state.hasGenerated && (
              <>
                <Select
                  value={context.state.selectedIdx}
                  onChange={context.handleSelect}
                >
                  {context.state.people.map((person, idx) => (
                    <MenuItem value={idx}>{person.name}</MenuItem>
                  ))}
                </Select>
                <Button onClick={context.handleDisplay} color="secondary">
                  {context.state.display ? "Hide Name" : "Show Name"}
                </Button>
                {context.state.display && (
                  <Typography>
                    You have{" "}
                    {context.state.people[context.state.selectedIdx].assignedTo}
                    !
                  </Typography>
                )}
              </>
            )}
          </Paper>
        </Container>
      )}
    </MyContext.Consumer>
  );
};

const rowStyles = {
  display: "inline-flex",
  justifyContent: "space-between",
  width: "100%",
  // margin: "16px",
  alignItems: "center",
};
