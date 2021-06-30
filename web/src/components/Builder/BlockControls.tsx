import * as React from "react";
import { Button, ButtonGroup, Divider, Input, Select } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import {
  // editBlock,
  deleteBlock,
  moveBlock,
} from "../../features/blocks/blocksSlice";

const BlockControls = ({ position }: { position: number }) => {
  const block = useAppSelector((state) => state.blocks.present[position]);
  // const [newBlock, setNewBlock] = React.useState({ type: "", content: "" });

  const dispatch = useAppDispatch();

  const handleDelete = (e: React.MouseEvent) => {
    const id = block.id;

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
    <ButtonGroup>
      <Button
        id={block.id.toString()}
        variant="solid"
        colorScheme="red"
        onClick={handleDelete}
      >
        Delete
      </Button>

      <Button
        disabled={!!(position === 0)}
        onClick={(e) => handleMove(position, "up")}
      >
        Up
      </Button>
      <Button
        // disabled={!!(i === blocks.length - 1)} HOW do i do this now?
        onClick={(e) => handleMove(position, "down")}
      >
        Down
      </Button>
    </ButtonGroup>
  );
};

export default BlockControls;
