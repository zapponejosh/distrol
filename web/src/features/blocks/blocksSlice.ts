import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BlockState {
  id: number;
  type: string;
}

const initialState: BlockState[] = [];

// Placeholder before integrating the db/api
const idCount = (function () {
  var counter = 0;
  return function () {
    counter++;
    return counter;
  };
})();

function move(array: BlockState[], from: number, to: number, on = 1) {
  array.splice(to, 0, ...array.splice(from, on));
  return array;
}

const BlocksSlice = createSlice({
  name: "blocks",
  initialState,
  reducers: {
    addBlock(state, action: PayloadAction<string>) {
      const newBlock: BlockState = {
        id: idCount(),
        type: action.payload,
      };
      state.push(newBlock);
    },
    moveBlock(
      state,
      action: PayloadAction<{ direction: number; index: number }>
    ) {
      if (action.payload.direction < 0) {
        // move up
        const arr = move(state, action.payload.index, action.payload.index - 1);
        return arr;
      } else {
        // move down
        const arr = move(state, action.payload.index, action.payload.index + 1);
        return arr;
      }
    },
    deleteBlock(state, action: PayloadAction<number>) {
      const updatedState = state.filter(
        (block) => !(block.id === action.payload)
      );
      return updatedState;
    },
  },
});

export const { addBlock, deleteBlock, moveBlock } = BlocksSlice.actions;
export default BlocksSlice.reducer;
