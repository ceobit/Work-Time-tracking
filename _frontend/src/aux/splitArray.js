 export const splitArray = recordsArray => {
   const getDate = (date) => date.slice(0, 10);

   if (recordsArray.length === 0) {
     return recordsArray;
   }

   console.log('records array', recordsArray[0]);

  return Object.values(recordsArray.flat().reduce((acc, x) => {
    acc[getDate(x.created_at)] = [...(acc[getDate(x.created_at)] || []), x ];
    return acc;
  }, {}));
};



