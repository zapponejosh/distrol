import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BlockState {
  id: number;
  type: string;
  content: string;
}

const initialState: BlockState[] = [];

// Placeholder for block id generation before integrating the db/api
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
    addBlock(state, action: PayloadAction<{ type: string; content: string }>) {
      const newBlock: BlockState = {
        id: idCount(),
        type: action.payload.type,
        content: action.payload.content,
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
    editBlock(
      state,
      action: PayloadAction<{ content: string; index: number }>
    ) {
      const editingBlock = state[action.payload.index];
      const UpdatedBlock: BlockState = {
        type: editingBlock.type,
        id: editingBlock.id,
        content: action.payload.content,
      };
      const updatedState = [...state];
      updatedState[action.payload.index] = UpdatedBlock;
      return updatedState;
    },
    deleteBlock(state, action: PayloadAction<number>) {
      const updatedState = state.filter(
        (block) => !(block.id === action.payload)
      );
      return updatedState;
    },
  },
});

export const { addBlock, deleteBlock, moveBlock, editBlock } =
  BlocksSlice.actions;
export default BlocksSlice.reducer;
