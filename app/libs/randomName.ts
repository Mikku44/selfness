export function generateRandomUsername(): string {
  const adjectives = [
    "brave", "quick", "silly", "smart", "lazy", "kind", "cool", "happy", "bold", "fuzzy"
  ];

  const nouns = [
    "tiger", "panda", "lion", "koala", "fox", "eagle", "wolf", "whale", "shark", "otter"
  ];

  const randomAdj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  const randomNum = Math.floor(1000 + Math.random() * 9000);

  return `${randomAdj}${capitalize(randomNoun)}${randomNum}`;
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
