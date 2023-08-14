const secretConst = 78;

export default function pageSeed(page: number, seedAmount: number) {
  return (seedAmount * secretConst) + page;
}
