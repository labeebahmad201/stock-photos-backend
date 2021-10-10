export default function(rule: any, size: number) {
  return rule.test(
    'maxLen',
    'Length of ${path} must be less than or equal to ' + size + ' characters',
    val => val.length <= size,
  );
}
