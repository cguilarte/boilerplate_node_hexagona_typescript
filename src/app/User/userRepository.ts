class userRepository {
  public user;

  constructor({ userModel }: any) {
    this.user = userModel;
  }

  async getUserById(userId: string) {
    return this.user.findOne({
      _id: userId,
    });
  }

  async addUserAccount(userData: any) {
    return this.user(userData).save();
  }

  async getUserAccountVerify(email: string) {
    return this.user.findOne({
      email,
    });
  }
}

export default userRepository;
