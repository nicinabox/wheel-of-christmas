import React, { useRef, useEffect } from 'react'
import { isEqual } from 'lodash'

const useDeepEqualMemoize = (value?: React.DependencyList) => {
  const ref = useRef(value)

  if (!isEqual(value, ref.current)) {
    ref.current = value
  }

  return ref.current
}

export function useDeepEqualEffect(callback: React.EffectCallback, dependencies?: React.DependencyList) {
  useEffect(callback, useDeepEqualMemoize(dependencies))
}
