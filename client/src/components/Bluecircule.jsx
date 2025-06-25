import React from 'react';

function Bluecircule({ top = "auto", left = "auto", right = "auto", bottom = "auto" }) {
  return (
    <div
      className="absolute -z-50 w-[15rem] aspect-square rounded-full bg-blue-500/30 blur-3xl"
      style={{ top, left, right, bottom }}
    />
  );
}

export default Bluecircule;
