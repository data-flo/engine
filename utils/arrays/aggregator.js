import {
  max,
  mean,
  median,
  min,
  sum,
}  from "d3-array";
import uniqueElements  from "./unique-elements";



function mode(array, valueOf)
{
  if (array.length === 0) {
    return undefined;
  }
  const modeMap = {};
  let maxEl = valueOf ? valueOf(array[0]) : array[0];
  let maxCount = 1;
  for (let i = 0; i < array.length; i++)
  {
    const el = valueOf ? valueOf(array[i]) : array[i];
    if (modeMap[el] == null) {
      modeMap[el] = 1;
    }
    else {
      modeMap[el]++;
    }
    if (modeMap[el] > maxCount)
    {
      maxEl = el;
      maxCount = modeMap[el];
    }
  }
  return maxEl;
}

export default function aggregator(method, columnName) {
  switch (method) {

    case "max": {
      return (
        (rows) => max(
          rows,
          (x) => x[columnName],
        )
      );
    }

    case "mean": {
      return (
        (rows) => mean(
          rows,
          (x) => x[columnName],
        )
      );
    }

    case "median": {
      return (
        (rows) => median(
          rows,
          (x) => x[columnName],
        )
      );
    }

    case "min": {
      return (
        (rows) => min(
          rows,
          (x) => x[columnName],
        )
      );
    }

    case "mode": {
      return (
        (rows) => mode(
          rows,
          (x) => x[columnName],
        )
      );
    }

    case "sum": {
      return (
        (rows) => sum(
          rows,
          (x) => x[columnName],
        )
      );
    }

    case "unique-number": {
      return (
        (rows) => uniqueElements(
          rows,
          (x) => x[columnName],
        ).length
      );
    }

    case "unique-values": {
      return (
        (rows) => uniqueElements(
          rows,
          (x) => x[columnName],
        ).join(",")
      );
    }
  }

  throw new Error("Invalid aggregation method");
};
