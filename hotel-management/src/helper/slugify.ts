
export function slugify(str: string) {
  return str
    .toLowerCase() 
    .trim() 
    .replace(/[^a-z0-9]+/g, '-') // thay tất cả ký tự không phải a-z0-9 bằng dấu '-'
    .replace(/^-+|-+$/g, ''); // bỏ '-' ở đầu và cuối
}
