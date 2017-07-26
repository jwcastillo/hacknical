import mongoose from '../mongoose/index';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userName: String,
  userId: String,
  passwordHash: String,
  passwordSalt: String,
  lastLoginTime: {
    type: Date,
    default: Date.now
  },
  email: String,
  openShare: { type: Boolean, default: true },
  githubLogin: { type: String, default: '' },
  githubInfo: {
    id: { type: String, default: '' },
    login: { type: String, default: '' }
  },
  orgs: [{
    login: String,
    avatar_url: String,
    description: String
  }],
  pinnedRepos: { type: Array, default: [] },
  githubSections: {
    hotmap: { type: Boolean, default: true },
    info: { type: Boolean, default: true },
    repos: { type: Boolean, default: true },
    languages: { type: Boolean, default: true },
    commits: { type: Boolean, default: true },
    orgs: { type: Boolean, default: true },
    course: { type: Boolean, default: true },
    contributed: { type: Boolean, default: true },
  },
  initialed: { type: Boolean, default: false },
  notification: {
    weekly: { type: Boolean, default: true },
    update: { type: Boolean, default: true },
  },
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

export default mongoose.model('Users', UserSchema);
