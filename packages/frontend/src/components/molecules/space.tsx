"use client";

type SpaceProps = {
  width?: number;
  height?: number;
};

export default function Space({ width, height }: SpaceProps) {
  return (
    <div
      style={{
        width,
        height,
      }}
    />
  );
}
