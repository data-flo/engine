import naturalCompare from "natural-compare";

export default function sortComparator(property) {
  return (a, b) => {
    return naturalCompare(
      a?.[property]?.toString()?.toLowerCase(),
      b?.[property]?.toString()?.toLowerCase()
    );
  };
}
