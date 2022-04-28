const UseSetObjectValue = (key, val, object) => {
  return {
    ...object,
    [key]: val
  }
}

export default UseSetObjectValue;