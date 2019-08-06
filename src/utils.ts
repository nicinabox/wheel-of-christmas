export const isSolved = (char: string, solvedChars: string[]): boolean => {
  return false
}

export const isRevealed = (char: string, solvedChars: string[]): boolean => {
  return false
}

export const getRevealedIndexes = (chars: string[], pattern: RegExp) => {
  return chars.reduce((acc: number[], c: string, i) => {
    if (pattern.test(c)) {
      return acc.concat(i)
    }
    return acc
  }, [])
}
