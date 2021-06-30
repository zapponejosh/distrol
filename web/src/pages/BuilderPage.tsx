import * as React from "react";
import { Button, ButtonGroup, Divider, Input, Select } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { ActionCreators } from "redux-undo";
import { useHotkeys } from "react-hotkeys-hook";
import {
  addBlock,
  // deleteBlock,
  // moveBlock,
} from "../features/blocks/blocksSlice";
import TextBlock from "../components/Builder/TextBlock";
import Headline from "../components/Builder/Headline";
import ImageText from "../components/Builder/ImageText";

const BuilderPage = () => {
  const blocks = useAppSelector((state) => state.blocks.present);
  const [newBlock, setNewBlock] = React.useState({ type: "", content: "" });

  const future = useAppSelector((state) => state.blocks.future);
  const past = useAppSelector((state) => state.blocks.past);

  const dispatch = useAppDispatch();

  const handleClick = () => {
    if (!newBlock) return;
    dispatch(addBlock(newBlock));
    setNewBlock({ type: "", content: "" });
  };

  // Undo/redo hotkeys
  useHotkeys("command+z", () => handleHotkey("undo"));
  useHotkeys("command+shift+z", () => handleHotkey("redo"));

  const handleHotkey = (action: string): void => {
    switch (action) {
      case "undo":
        dispatch(ActionCreators.undo());

        break;
      case "redo":
        dispatch(ActionCreators.redo());

        break;
    }
  };

  return (
    <>
      <Select
        m="20px 0"
        maxW="400px"
        variant="filled"
        placeholder="Block type..."
        value={newBlock.type}
        onChange={(e) =>
          setNewBlock((pre) => ({ ...pre, type: e.target.value }))
        }
      >
        <option value="text">Text</option>
        <option value="image-caption">Image with caption</option>
        <option value="headline">Headline</option>
      </Select>
      <Input
        m="20px 0"
        type="text"
        value={newBlock.content}
        onChange={(e) =>
          setNewBlock((pre) => ({ ...pre, content: e.target.value }))
        }
      />
      <ButtonGroup m="20px 0">
        <Button onClick={handleClick}>+Add block</Button>
        <Button
          disabled={!past.length}
          onClick={() => dispatch(ActionCreators.undo())}
        >
          Undo
        </Button>
        <Button
          disabled={!future.length}
          onClick={() => dispatch(ActionCreators.redo())}
        >
          Redo
        </Button>
      </ButtonGroup>
      <Divider orientation="horizontal" m="20px 0" />
      {blocks.map((b, i) => {
        switch (b.type) {
          case "text":
            return <TextBlock key={i} content={b.content} position={i} />;
          case "headline":
            return <Headline key={i} content={b.content} position={i} />;
          case "image-caption":
            return <ImageText key={i} content={b.content} position={i} />;
          default:
            return null;
        }
      })}
      <Divider orientation="horizontal" m="20px 0" />
    </>
  );
};

export default BuilderPage;
