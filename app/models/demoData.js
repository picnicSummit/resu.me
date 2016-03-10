// seed data for database (dev. environment only)

module.exports = [
  {
    'name' : 'Company A',
    'status': {
      'applied' : true,
      'phone': true,
      'onsite': true,
      'offer': true,
      'accepted': false  
    },
    'dates': {
      'onsite': 'Fri Nov 24 2000 14:15:00 GMT-0800 (Pacific Standard Time)',
      'phone': 'Fri Nov 21 2015 14:15:00 GMT-0800 (Pacific Standard Time)'
    }
  },

  {
    'name' : 'Company B',
    'status': {
      'applied' : true,
      'phone': true,
      'onsite': false,
      'offer': false,
      'accepted': false  
    }
  },

  {
    'name' : 'Company C',
    'status': {
      'applied' : true,
      'phone': false,
      'onsite': false,
      'offer': false,
      'accepted': false  
    }
  },

  {
    'name' : 'Company D',
    'status': {
      'applied' : true,
      'phone': true,
      'onsite': true,
      'offer': false,
      'accepted': false  
    }
  }
];