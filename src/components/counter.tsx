import React, { useState } from "react";

import { useAppSelector, useAppDispatch } from "../hooks";
import { decrement, increment } from "../slices/counterSlice";
import { Button } from "./ui/button";

export function Counter() {
  // The `state` arg is correctly typed as `RootState` already
  const count = useAppSelector((state: any) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div>
      <div className="flex items-center justify-center gap-4">
        <Button variant={'outline'} onClick={() => dispatch(increment())}>Increment</Button>
        <span className="text-lg font-bold">{count}</span>
        <Button onClick={() => dispatch(decrement())}>Decrement</Button>
      </div>
    </div>
  );
}
