export const numberInputFormat = (value) => {
  let newValue = value.replace(/(?!\.)\D/g, "").replace(/(?:\..*)\./g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const arrString = newValue.split("");
  let arrLength = newValue.split("").length;

  if(!arrString.includes(".")) {
    return newValue;
  } else {
    let indexDot = arrString.findIndex(item => item === ".");
    let stringAfter = arrString.slice(indexDot + 1, arrLength).filter(item => item !== ",").join("");
    arrString.splice(indexDot + 1, arrLength - indexDot - 1);
    newValue = arrString.concat(stringAfter).join("");
    return newValue;
  }
}