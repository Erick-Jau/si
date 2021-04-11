const mysql = require("mysql2");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { promisify } = require('util');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DATABASE_PORT
});

// STUDENT

exports.login = async (req, res) => {
  try {
    const { school_id, password } = req.body;

    if( !school_id || !password ) {
      return res.status(400).render('login', {
        message: 'Please provide an email and password'
      })
    }

    db.query('SELECT * FROM users2 WHERE school_id = ?', [school_id], async (error, results) => {
      console.log(results);
      if( !results || !(await bcrypt.compare(password, results[0].password)) ) {
        res.status(401).render('login', {
          message: 'Email or Password is incorrect'
        })
      } else {
        const id = results[0].id;

        const token = jwt.sign({ id }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRES_IN
        });

        console.log("The token is: " + token);

        const cookieOptions = {
          expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
          ),
          httpOnly: true
        }

        res.cookie('jwt', token, cookieOptions );
        res.status(200).redirect("/index");
      }
 
    })

  } catch (error) {
    console.log(error);
  }
  }

exports.register = (req, res) => {
    console.log(req.body);

    const { school_id, first_name, last_name, group, opt, itep, password, password_confirm } = req.body;

    db.query('SELECT school_id FROM users2 WHERE school_id = ? ', [school_id], async (error, results) => {
        if (error) {
            console.log(error);
        }

        if (results.length > 0) {
            return res.render('test', {
                message: 'That ID is already in use.'
            })
        } else if (password !== password_confirm) {
            return res.render('test', {
                message: 'Password do not match.'
            });
        }

        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);

        db.query('INSERT INTO users2 SET ?', { school_id: school_id, first_name: first_name, last_name: last_name, school_group: group, opt: opt, itep: itep, password: hashedPassword }, (error, results) => {
            if (error) {
                console.log(error);
            } else {
                console.log(results);
                return res.render('test', {
                    messageSuccess: 'User registered'
                });
            }
        });
    });

}

  exports.isLoggedIn = async (req, res, next) => {
    // console.log(req.cookies);
    if( req.cookies.jwt) {
      try {
        //1) verify the token
        const decoded = await promisify(jwt.verify)(req.cookies.jwt,
        process.env.JWT_SECRET
        );
  
        console.log(decoded);
  
        //2) Check if the user still exists
        db.query('SELECT * FROM users2 WHERE id = ?', [decoded.id], (error, result) => {
          console.log(result);
  
          if(!result) {
            return next();
          }
  
          req.user2 = result[0];
          console.log("user is")
          console.log(req.user2);
          return next();
  
        });
      } catch (error) {
        console.log(error);
        return next();
      }
    } else {
      next();
    }
  }

  // ADMIN

  exports.registerAdmin = (req, res) => {
    console.log(req.body);

    const { school_id, first_name, last_name, group, password, password_confirm } = req.body;

    db.query('SELECT school_id FROM teachers WHERE school_id = ? ', [school_id], async (error, results) => {
        if (error) {
            console.log(error);
        }

        if (results.length > 0) {
            return res.render('register_admin', {
                message: 'That ID is already in use.'
            })
        } else if (password !== password_confirm) {
            return res.render('register_admin', {
                message: 'Password do not match.'
            });
        }

        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);

        db.query('INSERT INTO teachers SET ?', { school_id: school_id, first_name: first_name, last_name: last_name, group_assigned: group, password: hashedPassword }, (error, results) => {
            if (error) {
                console.log(error);
            } else {
                console.log(results);
                return res.render('register_admin', {
                    messageSuccess: 'User registered'
                });
            }
        });
    });

}

exports.loginAdmin = async (req, res) => {
  try {
    const { school_id, password } = req.body;

    if( !school_id || !password ) {
      return res.status(400).render('login_teacher', {
        message: 'Please provide an email and password'
      })
    }

    db.query('SELECT * FROM teachers WHERE school_id = ?', [school_id], async (error, results) => {
      console.log(results);
      if( !results || !(await bcrypt.compare(password, results[0].password)) ) {
        res.status(401).render('login_teacher', {
          message: 'Email or Password is incorrect'
        })
      } else {
        const id = results[0].id;

        const token = jwt.sign({ id }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRES_IN
        });

        console.log("The token is: " + token);

        const cookieOptions = {
          expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
          ),
          httpOnly: true
        }

        res.cookie('jwt', token, cookieOptions );
        res.status(200).redirect("/index_admin");
      }
 
    })

  } catch (error) {
    console.log(error);
  }
  }

exports.isLoggedInAdmin = async (req, res, next) => {
  // console.log(req.cookies);
  if( req.cookies.jwt) {
    try {
      //1) verify the token
      const decoded = await promisify(jwt.verify)(req.cookies.jwt,
      process.env.JWT_SECRET
      );

      console.log(decoded);

      //2) Check if the user still exists
      db.query('SELECT * FROM teachers WHERE id = ?', [decoded.id], (error, result) => {
        console.log(result);

        if(!result) {
          return next();
        }

        req.teachers = result[0];
        console.log("user is")
        console.log(req.teachers);
        return next();

      });
    } catch (error) {
      console.log(error);
      return next();
    }
  } else {
    next();
  }
}

// mainTest

exports.mainTest = (req, res) => {
  console.log(req.body);

  const { a1_1, a1_2, a1_3 } = req.body;

      db.query('INSERT INTO mainTest SET ?', { a1_1: a1_1, a1_2: a1_2, a1_3: a1_3 }, (error, results) => {
          if (error) {
              console.log(error);
          } else {
              console.log(results);
              return res.render('a', {
                  messageSuccess: 'User registered'
              });
          }
      });
  

}

// LOGOUT

  exports.logout = async (req, res) => {
    res.cookie('jwt', 'logout', {
      expires: new Date(Date.now() + 2*1000),
      httpOnly: true
    });
  
    res.status(200).redirect('/login');
  }