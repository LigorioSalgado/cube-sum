var should = require('should'); 
var assert = require('assert');
var request = require('supertest');  



describe('Routing', function() {
  var url = 'http://localhost:3000';
  
  describe('Create', function() {
    it('No debe crear una matriz', function(done) {
    var  req  = '{"size" :101 , "querys" :5 }';
    var obj = JSON.parse(req);
    request(url)
	.post('/matrix/new')
	.send(obj)
  .expect('Content-Type', /json/)
  .expect(200)
   
	.end(function(err, res) {
          if (err) {
            throw err;
          }
          
          res.body.should.have.property('status', 3);
          done();
        });
    });
    it('Debe creara correctamente la matriz', function(done){
	var  req  = '{"size" :4 , "querys" :5 }';
    var obj = JSON.parse(req);
	request(url)
		.post('/matrix/new')
		.send(obj)
		.expect('Content-Type', /json/)
		.expect(200) 
		.end(function(err,res) {
			if (err) {
				throw err;
			}
			
			res.body.should.have.property('status',1);
			done();
		});
	});
  });


   describe('Update', function() {
    it('No debe modificar una celda', function(done) {
    var  req  = '{"x":6,"y":6,"z":6,"w":5 }';
    var obj = JSON.parse(req);
    request(url)
  .post('/matrix/update')
  .send(obj)
  .expect('Content-Type', /json/)
  .expect(200)
    
  .end(function(err, res) {
          if (err) {
            throw err;
          }
          
          res.body.should.have.property('status', 0);
          res.body.should.have.property('message');
          done();
        });
    });
    it('Debe Modificar correctamente la matriz', function(done){
  var req  = '{"x":2,"y":2,"z":2,"w":5 }';
    var obj = JSON.parse(req);
  request(url)
    .post('/matrix/update')
    .send(obj)
    .expect('Content-Type', /json/)
    .expect(200) 
    .end(function(err,res) {
      if (err) {
        throw err;
      }
      
      res.body.should.have.property('status',1);
      done();
    });
  });
  });

   describe('Summation', function() {
    it('No debe sumar la matriz', function(done) {
    var  req  = '{"x1":6,"y1":6,"z1":6,"x2":5,"y2":5,"z2":5}';
    var obj = JSON.parse(req);
    request(url)
  .post('/matrix/sum')
  .send(obj)
  .expect('Content-Type', /json/)
  .expect(200)
    
  .end(function(err, res) {
          if (err) {
            throw err;
          }
          
          res.body.should.have.property('status', 0);
          res.body.should.have.property('error');
          done();
        });
    });
    it('Debe Modificar correctamente la matriz', function(done){
    var  req  = '{"x1":1,"y1":1,"z1":1,"x2":3,"y2":3,"z2":3}';
    var obj = JSON.parse(req);
  request(url)
    .post('/matrix/sum')
    .send(obj)
    .expect('Content-Type', /json/)
    .expect(200) 
    .end(function(err,res) {
      if (err) {
        throw err;
      }
      
      res.body.should.have.property('status',1);
      res.body.should.have.property('sum');
      done();
    });
  });
  });




});