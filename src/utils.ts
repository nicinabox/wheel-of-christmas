export const isSolved = (char: string, solvedChars: string[]): boolean => {
  return false
}

export const isRevealed = (char: string, solvedChars: string[]): boolean => {
  return false
}

export const getRevealedIndexes = (chars: string[], shouldReveal: (char: string) => boolean) => {
  return chars.reduce((acc: number[], c, i) => {
    if (shouldReveal(c)) {
      return acc.concat(i)
    }
    return acc
  }, [])
}
