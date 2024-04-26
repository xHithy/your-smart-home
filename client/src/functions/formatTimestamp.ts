export const formatTimestamp = (timestamp: string) => {
   const date = new Date(timestamp);

   const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
   };

   const formatter = new Intl.DateTimeFormat('default', options);

   return formatter.format(date);
};
