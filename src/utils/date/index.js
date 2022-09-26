export const getChatTime = date => {
  const hour = date.getHours();
  const minutes = date.getMinutes();

  return `${hour}:${minutes} ${hour >= 12 ? 'PM' : 'AM'}`;
};

export const setDateChat = oldDate => {
  const year = oldDate.getFullYear();
  const month = oldDate.getMonth() + 1;
  const date = oldDate.getDate();

  return `${year}-${month}-${date}`;
};

export const isInThePast = date => {
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  today.setDate(today.getDate());

  return date < today;
};

export const isInTheFuture = date => {
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  today.setDate(today.getDate() + 1);

  return date > today;
};