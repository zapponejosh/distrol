import * as React from "react";
import { Button, ButtonGroup, Divider, Input, Select } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { ActionCreators } from "redux-undo";
import {
  addBlock,
  deleteBlock,
  moveBlock,
} from "../features/blocks/blocksSlice";
import TextBlock from "../components/Builder/TextBlock";
import Headline from "../components/Builder/Headline";
import ImageText from "../components/Builder/ImageText";

const BuilderPage = () => {
  const blocks = useAppSelector((state) => state.blocks.present);
  const [newBlock, setNewBlock] = React.useState("");

  const future = useAppSelector((state) => state.blocks.future);
  const past = useAppSelector((state) => state.blocks.past);

  const dispatch = useAppDispatch();

  const handleClick = () => {
    if (!newBlock) return;
    dispatch(addBlock(newBlock));
    setNewBlock("");
  };

  const handleDelete = (e: React.MouseEvent) => {
    const id = e.currentTarget.id;

    dispatch(deleteBlock(Number(id)));
  };

  const handleMove = (index: number, direction: string) => {
    switch (direction) {
      case "up":
        console.log(direction);
        dispatch(moveBlock({ direction: -1, index }));
        break;
      case "down":
        dispatch(moveBlock({ direction: 1, index }));
        console.log(direction);
        break;
    }
  };

  return (
    <>
      <h1>List of blocks</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>TYPE</th>
          </tr>
        </thead>
        <tbody>
          {blocks.map((b, i) => (
            <tr key={b.id}>
              <td>{b.id}</td>
              <td>{b.type}</td>
              <td>
                <Button
                  id={b.id.toString()}
                  variant="solid"
                  colorScheme="red"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </td>
              <td>
                <Button
                  disabled={!!(i === 0)}
                  onClick={(e) => handleMove(i, "up")}
                >
                  Up
                </Button>
                <Button
                  disabled={!!(i === blocks.length - 1)}
                  onClick={(e) => handleMove(i, "down")}
                >
                  Down
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Select
        m="20px 0"
        maxW="400px"
        variant="filled"
        placeholder="Block type..."
        value={newBlock}
        onChange={(e) => setNewBlock(e.target.value)}
      >
        <option value="text">Text</option>
        <option value="image-caption">Image with caption</option>
        <option value="headline">Headline</option>
      </Select>
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
            return <TextBlock key={i} />;
          case "headline":
            return <Headline key={i} />;
          case "image-caption":
            return <ImageText key={i} />;
          default:
            return null;
        }
      })}
      <Divider orientation="horizontal" m="20px 0" />
    </>
  );
};

export default BuilderPage;
