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