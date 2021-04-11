const express = require('express');
const authController = require('../controllers/auth');
const mysql = require("mysql2");

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DATABASE_PORT
});

const router = express.Router();

router.get('/a', authController.isLoggedIn, (req, res) => {
  console.log(req.user2);
  if( req.user2 ) {
    res.render('a', {
      user: req.user2
    });
  } else {
    res.redirect('/login');
  }

});

router.get('/', (req, res) => {
  res.render('login');
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.get('/test', (req, res) => {
  res.render('test');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/index', authController.isLoggedIn, (req, res) => {
  console.log(req.user2);
  if( req.user2 ) {
    res.render('index', {
      user: req.user2
    });
  } else {
    res.redirect('/login');
  }
  
});

// ADMIN

router.get('/login_teacher', (req, res) => {
  res.render('login_teacher');
});

router.get('/index_admin', authController.isLoggedInAdmin, (req, res) => {
  console.log(req.teachers);
  if( req.teachers ) {
    db.query('SELECT * FROM teachers',function (err,results) {
      if (err) throw err;
      res.render('index_admin',{data: results});
      
    });
  } else {
    res.redirect('/login_teacher');
  }

});

router.get('/register_admin', authController.isLoggedInAdmin, (req, res) => {
  console.log(req.teachers);
  if( req.teachers ) {
    res.render('register_admin', {
      user: req.teachers
    });
  } else {
    res.redirect('/login_teacher');
  }

});

// GRAMMAR

router.get('/grammar', authController.isLoggedIn, (req, res) => {
  console.log(req.user2);
  if( req.user2 ) {
    res.render('grammar', {
      user: req.user2
    });
  } else {
    res.redirect('/login');
  }

});

// GRAMMAR A1

router.get('/grammar_a1', authController.isLoggedIn, (req, res) => {
  console.log(req.user);
  if( req.user ) {
    res.render('grammar_a1', {
      user: req.user
    });
  } else {
    res.redirect('/login');
  }

});

router.get('/possessive', authController.isLoggedIn, (req, res) => {
  console.log(req.user);
  if( req.user ) {
    res.render('possessive', {
      user: req.user
    });
  } else {
    res.redirect('/login');
  }

});

router.get('/singular_plural', authController.isLoggedIn, (req, res) => {
  console.log(req.user);
  if( req.user ) {
    res.render('singular_plural', {
      user: req.user
    });
  } else {
    res.redirect('/login');
  }

});

router.get('/this_that', authController.isLoggedIn, (req, res) => {
  console.log(req.user);
  if( req.user ) {
    res.render('this_that', {
      user: req.user
    });
  } else {
    res.redirect('/login');
  }

});

router.get('/to_be', authController.isLoggedIn, (req, res) => {
  console.log(req.user);
  if( req.user ) {
    res.render('to_be', {
      user: req.user
    });
  } else {
    res.redirect('/login');
  }

});

// GRAMMAR A2

router.get('/grammar_a2', authController.isLoggedIn, (req, res) => {
  console.log(req.user);
  if( req.user ) {
    res.render('grammar_a2', {
      user: req.user
    });
  } else {
    res.redirect('/login');
  }

});

router.get('/quantifiers', authController.isLoggedIn, (req, res) => {
  console.log(req.user);
  if( req.user ) {
    res.render('quantifiers', {
      user: req.user
    });
  } else {
    res.redirect('/login');
  }

});

router.get('/reported_speech', authController.isLoggedIn, (req, res) => {
  console.log(req.user);
  if( req.user ) {
    res.render('reported_speech', {
      user: req.user
    });
  } else {
    res.redirect('/login');
  }

});

router.get('/subject', authController.isLoggedIn, (req, res) => {
  console.log(req.user);
  if( req.user ) {
    res.render('subject', {
      user: req.user
    });
  } else {
    res.redirect('/login');
  }

});

router.get('/time_conectors', authController.isLoggedIn, (req, res) => {
  console.log(req.user);
  if( req.user ) {
    res.render('time_conectors', {
      user: req.user
    });
  } else {
    res.redirect('/login');
  }

});

// GRAMMAR B1

router.get('/grammar_b1', authController.isLoggedIn, (req, res) => {
  console.log(req.user);
  if( req.user ) {
    res.render('grammar_b1', {
      user: req.user
    });
  } else {
    res.redirect('/login');
  }

});

router.get('/have_something', authController.isLoggedIn, (req, res) => {
  console.log(req.user);
  if( req.user ) {
    res.render('have_something', {
      user: req.user
    });
  } else {
    res.redirect('/login');
  }

});

router.get('/indirect_question', authController.isLoggedIn, (req, res) => {
  console.log(req.user);
  if( req.user ) {
    res.render('indirect_question', {
      user: req.user
    });
  } else {
    res.redirect('/login');
  }

});

router.get('/modal_deduction', authController.isLoggedIn, (req, res) => {
  console.log(req.user);
  if( req.user ) {
    res.render('modal_deduction', {
      user: req.user
    });
  } else {
    res.redirect('/login');
  }

});

router.get('/question_tag', authController.isLoggedIn, (req, res) => {
  console.log(req.user);
  if( req.user ) {
    res.render('question_tag', {
      user: req.user
    });
  } else {
    res.redirect('/login');
  }

});

// GRAMMAR B2

router.get('/grammar_b2', authController.isLoggedIn, (req, res) => {
  console.log(req.user);
  if( req.user ) {
    res.render('grammar_b2', {
      user: req.user
    });
  } else {
    res.redirect('/login');
  }

});

router.get('/adjectives_noun', authController.isLoggedIn, (req, res) => {
  console.log(req.user);
  if( req.user ) {
    res.render('adjectives_noun', {
      user: req.user
    });
  } else {
    res.redirect('/login');
  }

});

router.get('/mixed_condi', authController.isLoggedIn, (req, res) => {
  console.log(req.user);
  if( req.user ) {
    res.render('mixed_condi', {
      user: req.user
    });
  } else {
    res.redirect('/login');
  }

});

router.get('/speculation', authController.isLoggedIn, (req, res) => {
  console.log(req.user);
  if( req.user ) {
    res.render('speculation', {
      user: req.user
    });
  } else {
    res.redirect('/login');
  }

});

router.get('/wishes_regrets', authController.isLoggedIn, (req, res) => {
  console.log(req.user);
  if( req.user ) {
    res.render('wishes_regrets', {
      user: req.user
    });
  } else {
    res.redirect('/login');
  }

});

// READING

router.get('/reading', authController.isLoggedIn, (req, res) => {
  console.log(req.user2);
  if( req.user2 ) {
    res.render('reading', {
      user: req.user2
    });
  } else {
    res.redirect('/login');
  }

});

// READING A1

router.get('/reading_a1', authController.isLoggedIn, (req, res) => {
  console.log(req.user);
  if( req.user ) {
    res.render('reading_a1', {
      user: req.user
    });
  } else {
    res.redirect('/login');
  }

});

router.get('/daily_routine', authController.isLoggedIn, (req, res) => {
  console.log(req.user);
  if( req.user ) {
    res.render('daily_routine', {
      user: req.user
    });
  } else {
    res.redirect('/login');
  }

});

// READING A2

router.get('/reading_a2', authController.isLoggedIn, (req, res) => {
  console.log(req.user);
  if( req.user ) {
    res.render('reading_a2', {
      user: req.user
    });
  } else {
    res.redirect('/login');
  }

});

router.get('/accommodation', authController.isLoggedIn, (req, res) => {
  console.log(req.user);
  if( req.user ) {
    res.render('accommodation', {
      user: req.user
    });
  } else {
    res.redirect('/login');
  }

});

// READING B1

router.get('/reading_b1', authController.isLoggedIn, (req, res) => {
  console.log(req.user);
  if( req.user ) {
    res.render('reading_b1', {
      user: req.user
    });
  } else {
    res.redirect('/login');
  }

});

router.get('/job_app', authController.isLoggedIn, (req, res) => {
  console.log(req.user);
  if( req.user ) {
    res.render('job_app', {
      user: req.user
    });
  } else {
    res.redirect('/login');
  }

});

// READING B2

router.get('/reading_b2', authController.isLoggedIn, (req, res) => {
  console.log(req.user);
  if( req.user ) {
    res.render('reading_b2', {
      user: req.user
    });
  } else {
    res.redirect('/login');
  }

});

router.get('/contries', authController.isLoggedIn, (req, res) => {
  console.log(req.user);
  if( req.user ) {
    res.render('contries', {
      user: req.user
    });
  } else {
    res.redirect('/login');
  }

});

// LISTENING

router.get('/listening', authController.isLoggedIn, (req, res) => {
  console.log(req.user);
  if( req.user ) {
    res.render('listening', {
      user: req.user
    });
  } else {
    res.redirect('/login');
  }

});

// LISTENING A1

router.get('/listening_a1', authController.isLoggedIn, (req, res) => {
  console.log(req.user);
  if( req.user ) {
    res.render('listening_a1', {
      user: req.user
    });
  } else {
    res.redirect('/login');
  }

});

router.get('/describing', authController.isLoggedIn, (req, res) => {
  console.log(req.user);
  if( req.user ) {
    res.render('describing', {
      user: req.user
    });
  } else {
    res.redirect('/login');
  }

});

// LISTENING A2

router.get('/listening_a2', authController.isLoggedIn, (req, res) => {
  console.log(req.user);
  if( req.user ) {
    res.render('listening_a2', {
      user: req.user
    });
  } else {
    res.redirect('/login');
  }

});

router.get('/london', authController.isLoggedIn, (req, res) => {
  console.log(req.user);
  if( req.user ) {
    res.render('london', {
      user: req.user
    });
  } else {
    res.redirect('/login');
  }

});

// LISTENING B1

router.get('/listening_b1', authController.isLoggedIn, (req, res) => {
  console.log(req.user);
  if( req.user ) {
    res.render('listening_b1', {
      user: req.user
    });
  } else {
    res.redirect('/login');
  }

});

router.get('/situations', authController.isLoggedIn, (req, res) => {
  console.log(req.user);
  if( req.user ) {
    res.render('situations', {
      user: req.user
    });
  } else {
    res.redirect('/login');
  }

});

// LISTENING B2

router.get('/listening_b2', authController.isLoggedIn, (req, res) => {
  console.log(req.user);
  if( req.user ) {
    res.render('listening_b2', {
      user: req.user
    });
  } else {
    res.redirect('/login');
  }

});

router.get('/kind_student', authController.isLoggedIn, (req, res) => {
  console.log(req.user);
  if( req.user ) {
    res.render('kind_student', {
      user: req.user
    });
  } else {
    res.redirect('/login');
  }

});

// SPEAKING

router.get('/speaking', authController.isLoggedIn, (req, res) => {
  console.log(req.user);
  if( req.user ) {
    res.render('speaking', {
      user: req.user
    });
  } else {
    res.redirect('/login');
  }

});

// WRITING

router.get('/writing', authController.isLoggedIn, (req, res) => {
  console.log(req.user);
  if( req.user ) {
    res.render('writing', {
      user: req.user
    });
  } else {
    res.redirect('/login');
  }

});

module.exports = router;