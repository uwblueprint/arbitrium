import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Close from "@material-ui/icons/Close";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Radio from "@material-ui/core/Radio";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";

import { reorder } from "../../Utils/dragAndDropUtils";

const useStyles = makeStyles({
  closeRoot: {
    display: "inline-block",
    position: "absolute",
    left: "776px",
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
  inputFocused: {
    borderBottom: "1px solid #2261AD"
  }
});

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
    width: 716px;
    display: inline-block;
    line-height: 21px;
    overflow-y: auto;
    max-height: 48px;
    position: absolute;
    bottom: 0px;
    left: 56px;
  }
  textarea {
    font-size: 14px;
    color: #888888;
  }
`;

const GreyRadio = withStyles({
  root: {
    color: "rgba(0, 0, 0, 0.38)",
    paddingLeft: "24px",
    paddingBottom: "5px"
  }
})((props) => <Radio color="default" disabled checked={false} {...props} />);

function CreateEditMultipleChoice() {
  const styles = useStyles();

  const [options, setOptions] = useState(["Option 1"]);
  const [hoveredOption, setHoveredOption] = useState(-1);

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
  };

  const onBeforeDragStart = () => {
    document.activeElement.blur();
  };

  return (
    <Wrapper>
      <DragDropContext
        onDragEnd={onDragEnd}
        onBeforeDragStart={onBeforeDragStart}
      >
        <Droppable droppableId="droppable">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {options.map((data, index) => (
                <Draggable draggableId={`${index}`} index={index} key={index}>
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
                        <GreyRadio />
                        <OptionNameInput
                          classes={{ focused: styles.inputFocused }}
                          autoFocus={true}
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
                        >
                          <Close />
                        </IconButton>
                      </OptionWrapper>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <OptionWrapper>
        <DragIndicatorIcon
          className={`${styles.dragIndicator} ${styles.dragIndicatorHidden}`}
        />
        <GreyRadio />
        <OptionNameInput
          placeholder="Add option"
          onFocus={onAddOption}
          value={""}
        />
      </OptionWrapper>
    </Wrapper>
  );
}

export default CreateEditMultipleChoice;
