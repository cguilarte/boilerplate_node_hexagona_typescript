/* eslint-disable no-useless-catch */
import { passworBcrypt } from '../../utils';

class userService {
  public repository;

  constructor({ userRepository }: any) {
    this.repository = userRepository;
  }

  async addUser(userData: any) {
    try {
      const { name, email, password } = userData;

      // Verificamos que el usuario no exista
      const verifyUser = await this.repository.getUserAccountVerify(email);
      if (verifyUser) {
        return {
          error: true,
          response: {
            status: false,
            message: 'El usuario ya se encuentra registrado.',
          },
        };
      }

      const docUser = {
        name,
        email,
        password: await passworBcrypt(password),
      };

      const queryResult = await this.repository.addUserAccount(docUser);

      return {
        error: false,
        response: queryResult,
      };
    } catch (error) {
      throw error;
    }
  }
}

export default userService;
