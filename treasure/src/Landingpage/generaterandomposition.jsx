export const GRID_SIZE = 5;

// Function to get a random position on the grid
const getRandomPosition = (excludePosition) => {
  let newPosition;
  do {
    newPosition = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  } while (
    //these 3 lines of code excludes putting player's position on the same grid as coin's after each successful chase
    excludePosition &&
    newPosition.x === excludePosition.x &&
    newPosition.y === excludePosition.y
  );
  return newPosition;
};
export default getRandomPosition;