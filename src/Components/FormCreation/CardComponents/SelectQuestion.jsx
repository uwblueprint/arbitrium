import React, { useState, useContext } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Close from "@material-ui/icons/Close";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Radio from "@material-ui/core/Radio";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormSettingsContext from "../FormSettingsContext";

import { reorder } from "../../../Utils/dragAndDropUtils";

const useStyles = makeStyles(() => ({
  closeRoot: {
    display: "inline-block",
    position: "absolute",
    left: "724px",
    bottom: "2px"
  },
  droppableSection: {
    display: "flex"
  },
  dragIndicator: {
    display: "inline-block",
    position: "absolute",
    bottom: "5px"
  },
  dragIndicatorVisible: {
    color: "#DADADA"
  },
  dragIndicatorHidden: {
    color: "#FFFFFF"
  },
  inputFocused: (props) => ({
    // focused styling has priority over hovered styling
    boxShadow: `0 1px 0 #${props.themeColour} !important`
  }),
  inputHovered: {
    boxShadow: "0 1px 0 #DADADA"
  },
  submissionOptions: {
    fontSize: "12px"
  }
}));

const Wrapper = styled.div`
  margin-top: 16px;
  margin-bottom: 33px;
  width: 816px;
`;

const OptionWrapper = styled.div`
  position: relative;
`;

const OptionNameInput = styled(InputBase)`
  && {
    width: 616px;
    display: inline-block;
    line-height: 21px;
    overflow-y: auto;
    max-height: 48px;
    position: absolute;
    bottom: 0px;
    fontsize: 8px;
  }
`;

const GreyRadio = withStyles({
  root: {
    color: "rgba(0, 0, 0, 0.38)",
    paddingBottom: "5px",
    paddingLeft: "24px"
  }
})((props) => <Radio color="default" disabled checked={false} {...props} />);

const GreyCheckbox = withStyles({
  root: {
    color: "rgba(0, 0, 0, 0.38)",
    paddingLeft: "24px",
    paddingBottom: "5px"
  }
})((props) => <Checkbox color="default" disabled checked={false} {...props} />);

function SelectQuestion({
  submission = false,
  isPublished = false,
  multiSelect,
  onChange,
  initialOptions,
  initialAnswers, //Submission
  minSelectValidation = 0,
  maxSelectValidation = 0
}) {
  const { themeColour } = useContext(FormSettingsContext);
  const styles = useStyles({ themeColour });

  // options is a string array
  const [options, setOptions] = useState(initialOptions || []);
  const [hoveredOption, setHoveredOption] = useState(-1);

  //Check if the initial option already exists as an asnwer, and set to true
  //initialoptions[value, _id]
  const selectedInit = {};
  initialOptions.forEach((m) => {
    return (selectedInit[m[0]] = initialAnswers?.find(
      (ansId) => ansId === m[1]
    ));
  });
  const [selected, setSelected] = useState(selectedInit);

  //----------------------------------------------------------------------------
  //Form Creation Related
  //----------------------------------------------------------------------------
  const onAddOption = (event) => {
    setOptions(options.concat(""));
    event.target.blur();
  };

  const onEditOption = (index, value) => {
    const newOptions = [
      ...options.slice(0, index),
      [value],
      ...options.slice(index + 1)
    ];
    setOptions(newOptions);
  };

  const onDeleteOption = (index) => {
    const newOptions = [
      ...options.slice(0, index),
      ...options.slice(index + 1)
    ];
    setOptions(newOptions);
    onChange(newOptions);
  };

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const reorderedOptions = reorder(
      options,
      result.source.index,
      result.destination.index
    );

    setOptions(reorderedOptions);
    onChange(reorderedOptions);
  };

  const onBeforeDragStart = () => {
    document.activeElement.blur();
  };

  //----------------------------------------------------------------------------
  //Submission Related
  //----------------------------------------------------------------------------

  const handleCheckBoxSelect = (event) => {
    setSelected({ ...selected, [event.target.name]: event.target.checked });
    onChange({ ...selected, [event.target.name]: event.target.checked });
  };

  const handleMultipleChoiceSelect = (event) => {
    setSelected({ ...selectedInit, [event.target.name]: event.target.checked });
    onChange({ ...selectedInit, [event.target.name]: event.target.checked });
  };

  // useEffect(() => {
  //   onChange(selected);
  // }, [selected, onChange]);

  const errorMin =
    Object.values(selected).filter((v) => v).length > minSelectValidation;
  const errorMax =
    Object.values(selected).filter((v) => v).length <= maxSelectValidation;

  const CustomColourCheckbox = withStyles({
    root: {
      color: `#${themeColour}`,
      "&$checked": {
        color: `#${themeColour}`
      },
      paddingLeft: "24px",
      paddingBottom: "5px"
    },
    checked: {}
  })((props) => <Checkbox color="default" disabled={!submission} {...props} />);

  const CustomColourRadio = withStyles({
    root: {
      color: `#${themeColour}`,
      "&$checked": {
        color: `#${themeColour}`
      },
      paddingLeft: "24px",
      paddingBottom: "5px"
    },
    checked: {}
  })((props) => <Radio color="default" disabled={!submission} {...props} />);

  const formErrorLabel =
    multiSelect &&
    minSelectValidation > 0 &&
    "Select at least " + minSelectValidation;

  return (
    <Wrapper>
      {submission ? (
        <div classes={{ body1: styles.submissionOptions }}>
          <FormControl required={!multiSelect} error={errorMin || errorMax}>
            <FormGroup>
              {selected
                ? Object.keys(selected).map((data, index) => (
                    <OptionWrapper key={index}>
                      {multiSelect ? (
                        <FormControlLabel
                          classes={{ label: styles.submissionOptions }}
                          control={
                            <CustomColourCheckbox
                              checked={selected[data]}
                              onChange={handleCheckBoxSelect}
                              size="small"
                              name={data}
                              inputProps={{
                                "aria-label": "checkbox with default color"
                              }}
                            ></CustomColourCheckbox>
                          }
                          label={data}
                        ></FormControlLabel>
                      ) : (
                        <FormControlLabel
                          control={
                            <CustomColourRadio
                              checked={selected[data]}
                              onChange={handleMultipleChoiceSelect}
                              size="large"
                              name={data}
                              inputProps={{
                                "aria-label": "checkbox with default color"
                              }}
                            ></CustomColourRadio>
                          }
                          label={data}
                        ></FormControlLabel>
                      )}
                    </OptionWrapper>
                  ))
                : null}
            </FormGroup>
            <FormHelperText>{formErrorLabel}</FormHelperText>
          </FormControl>
        </div>
      ) : (
        <DragDropContext
          onDragEnd={
            !isPublished
              ? onDragEnd
              : () => alert("You may not move options in a published form")
          }
          onBeforeDragStart={onBeforeDragStart}
        >
          <Droppable droppableId="droppable">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {options
                  ? options.map((data, index) => (
                      <Draggable
                        draggableId={`${index}`}
                        index={index}
                        key={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            onMouseEnter={() => setHoveredOption(index)}
                            onMouseLeave={() => setHoveredOption(-1)}
                            className={styles.droppableSection}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <OptionWrapper key={index}>
                              <DragIndicatorIcon
                                className={`${styles.dragIndicator}
                              ${
                                hoveredOption === index || snapshot.isDragging
                                  ? styles.dragIndicatorVisible
                                  : styles.dragIndicatorHidden
                              }`}
                              />
                              {multiSelect ? <GreyCheckbox /> : <GreyRadio />}
                              <OptionNameInput
                                className={
                                  hoveredOption === index || snapshot.isDragging
                                    ? styles.inputHovered
                                    : ""
                                }
                                classes={{ focused: styles.inputFocused }}
                                autoFocus={true}
                                onBlur={() => {
                                  onChange(options);
                                }}
                                placeholder="Option..."
                                value={data}
                                onChange={(event) =>
                                  onEditOption(index, event.target.value)
                                }
                              />
                              <IconButton
                                onClick={() => onDeleteOption(index)}
                                classes={{ root: styles.closeRoot }}
                                size="small"
                                disabled={isPublished}
                              >
                                <Close />
                              </IconButton>
                            </OptionWrapper>
                          </div>
                        )}
                      </Draggable>
                    ))
                  : null}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}

      {submission ? (
        <div></div>
      ) : (
        <OptionWrapper>
          <DragIndicatorIcon
            className={`${styles.dragIndicator} ${styles.dragIndicatorHidden}`}
          />
          {multiSelect ? <GreyCheckbox /> : <GreyRadio />}
          <OptionNameInput
            placeholder="Add option"
            onFocus={onAddOption}
            value={""}
          />
        </OptionWrapper>
      )}
    </Wrapper>
  );
}

export default SelectQuestion;
