export default function fillSlides<T>(data: T[], groupSize: number): T[] {
  const remainder = data.length % groupSize;
  if (remainder === 0) return data;

  const need = groupSize - remainder;
  return [...data, ...data.slice(0, need)];
}
