module.exports = {
  data: [
    {
      id: 1,
      title: 'sum',
      show: true,
      executeFunc: (value1, value2) => {
        return value1 + value2
      }
    },
    {
      id: 2,
      title: 'subtract',
      show: true,
      executeFunc: (value1, value2) => {
        return value1 - value2
      }
    },
    {
      id: 3,
      title: 'divided',
      show: true,
      executeFunc: (value1, value2) => {
        return value1 / value2
      },
      checkErrors: (value1, value2) => {
        if (value2 === 0) {
          alert('Second value can not be zero')
          throw new Error('Second value can not be zero')
        }
      }
    },
    {
      id: 4,
      title: 'multiply',
      show: true,
      executeFunc: (value1, value2) => {
        return value1 * value2
      },
      checkErrors: (value1, value2) => {
        if (value1 === 0 || value2 === 0) {
          alert('If you multiply something by 0 you get 0')
          console.warn('If you multiply something by 0 you get 0')
        }
      }
    }
  ]
}
