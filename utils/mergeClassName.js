export function mergeClassName(...classes) {
  return classes.filter(Boolean).join(" ");
}
