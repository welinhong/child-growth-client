export const getMonthsAfterBirth = (birthday: string) => {
  // 출생 후 지난 일
  const todayInSec = new Date().getTime();
  const birthdayInSecs = new Date(birthday).getTime();

  const difference = todayInSec - birthdayInSecs;
  const day = 1000 * 3600 * 24;
  const diffInDays = Math.floor(difference / day);

  // 30으로 나누기
  return Math.floor(diffInDays / 30);
};
