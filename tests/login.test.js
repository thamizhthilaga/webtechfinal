const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const User = require('../src/models/User');

chai.use(chaiHttp);
const { expect } = chai;

describe('User Login API', () => {
  let originalFindOne;

  before(() => {
    // Backup original
    originalFindOne = User.findOne;
  });

  after(() => {
    // Restore original
    User.findOne = originalFindOne;
  });

  it('should login successfully with valid credentials', (done) => {
    const mockUser = {
      _id: '507f1f77bcf86cd799439011',
      email: 'test@example.com',
      role: 'student',
      fullName: 'Test User',
      comparePassword: async (password) => true,
      toJSON: function () {
        return { id: this._id, email: this.email, role: this.role, fullName: this.fullName };
      }
    };

    // Stub findOne to return mock user
    User.findOne = async () => mockUser;

    chai.request(app)
      .post('/auth/login')
      .type('form')
      .send({ email: 'test@example.com', password: 'password123' })
      .end((err, res) => {
        // chai-http follows redirects by default, so final status will be 200
        expect(res).to.have.status(200);
        // ensure a redirect to student dashboard occurred somewhere in the chain
        const redirects = res.redirects || [];
        const wentToStudent = redirects.some(r => r.includes('/student-dashboard'));
        expect(wentToStudent).to.equal(true);
        done();
      });
  });

  it('should return 401 for invalid credentials', (done) => {
    const mockUser = {
      email: 'test@example.com',
      comparePassword: async (password) => false
    };

    User.findOne = async () => mockUser;

    chai.request(app)
      .post('/auth/login')
      .type('form')
      .send({ email: 'test@example.com', password: 'wrongpassword' })
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
});
