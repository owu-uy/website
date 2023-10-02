export const shuffleArray = (array) => {
  const newArray = [...array]; // Crea una copia del array original
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]]; // Intercambia los elementos
  }
  return newArray;
};
