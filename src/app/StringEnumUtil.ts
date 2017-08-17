
export function strEnum<T extends string>(enumArray: Array<T>): {[K in T]: K} {
  return enumArray.reduce((res, key) => {
    res[key] = key;
    return res;
  }, Object.create(null));
}


