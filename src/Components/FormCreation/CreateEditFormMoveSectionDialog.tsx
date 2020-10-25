import React, { useState } from "react";
import styled from "styled-components";
import Dialog from "../Common/Dialogs/Dialog";
import DialogHeader from "../Common/Dialogs/DialogHeader";
import { reorder } from "../../Utils/dragAndDropUtils";
import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
  Droppable,
  DroppableProvided,
  DropResult
} from "react-beautiful-dnd";
import { FormSection } from "../../Types/FormTypes";
import { Button, IconButton } from "@material-ui/core";
import DragHandle from "@material-ui/icons/DragIndicator";
import KeyboardArrowUp from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";

const DragSection = styled.div`
  background: white;
  padding: 16px;
  align-items: center;
  display: flex;
  .drag-section-text {
    h4 {
      display: block;
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 4px;
    }
    h5 {
      margin-top: 0;
      color: #888888;
      font-size: 12px;
    }
  }
  .move-buttons-group {
    margin-left: auto;
  }
`;

const DroppableContainer = styled.div`
  position: relative;
  text-align: center;
  .draggable-container {
    width: 100%;
  }
`;

const StyledDragHandle = styled(DragHandle)`
  display: inline-block;
  color: #dadada;
  margin-right: 24px;
`;

const Footer = styled.div`
  text-align: right;
  height: 100%;
`;

const DialogButton = styled(Button)`
  && {
    text-transform: capitalize;
  }
`;

type Props = {
  initSections: FormSection[];
  onClose: () => void;
  onSubmit: (sections: FormSection[]) => void;
};

function CreateEditFormMoveSectionDialog({
  initSections,
  onClose,
  onSubmit
}: Props): React.ReactElement<typeof Dialog> {
  const [sections, setSections] = useState(initSections);

  function reorderSections(sourceIndex?: number, destinationIndex?: number) {
    if (
      sourceIndex == null ||
      destinationIndex == null ||
      sourceIndex === destinationIndex
    )
      return;
    const reorderedList = reorder(sections, sourceIndex, destinationIndex);
    setSections(reorderedList);
  }

  function onMoveUpClick(index: number) {
    reorderSections(index, Math.max(0, index - 1));
  }

  function onMoveDownClick(index: number) {
    reorderSections(index, Math.min(sections.length - 1, index + 1));
  }

  function onDragEnd(result: DropResult) {
    const sourceIndex = result?.source?.index;
    const destinationIndex = result?.destination?.index;
    reorderSections(sourceIndex, destinationIndex);
  }

  function _onSubmit() {
    onSubmit(sections);
    onClose();
  }

  return (
    <Dialog
      width="640px"
      maxHeight="70vh"
      paddingVertical={24}
      paddingHorizontal={24}
    >
      <DragDropContext onDragEnd={onDragEnd}>
        <DialogHeader
          showClose={false}
          onClose={onClose}
          title="Reorder sections"
        />
        <Droppable droppableId="move-sections-droppable">
          {(provided: DroppableProvided) => (
            <DroppableContainer
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {sections.map((section, index) => (
                <Draggable
                  key={section._id}
                  draggableId={section._id}
                  index={index}
                >
                  {(
                    dragProvided: DraggableProvided,
                    snapshot: DraggableStateSnapshot
                  ) => (
                    <div
                      className="draggable-container"
                      ref={dragProvided.innerRef}
                      {...dragProvided.draggableProps}
                      {...dragProvided.dragHandleProps}
                      style={{
                        ...dragProvided.draggableProps.style,
                        boxShadow: snapshot.isDragging
                          ? "0 3px 5px 3px #cccccc"
                          : "none"
                      }}
                    >
                      <DragSection>
                        <StyledDragHandle />
                        <div className="drag-section-text">
                          <h4>{section.name}</h4>
                          <h5>
                            Section {index + 1} of {sections.length}
                          </h5>
                        </div>
                        <div className="move-buttons-group">
                          <IconButton onClick={() => onMoveUpClick(index)}>
                            <KeyboardArrowUp />
                          </IconButton>
                          <IconButton onClick={() => onMoveDownClick(index)}>
                            <KeyboardArrowDown />
                          </IconButton>
                        </div>
                      </DragSection>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </DroppableContainer>
          )}
        </Droppable>
        <Footer>
          <DialogButton onClick={onClose}>Cancel</DialogButton>
          <DialogButton color="primary" onClick={_onSubmit}>
            Save
          </DialogButton>
        </Footer>
      </DragDropContext>
    </Dialog>
  );
}

export default CreateEditFormMoveSectionDialog;
