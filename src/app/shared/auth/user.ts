/**
 * Created by aasaraf on 12/27/2016.
 */
export class User {
  constructor(
    public userId: string,
    public userName: string,
    public fullName: string,
    public password: string,
    public role: string,
    public active: boolean) { }
}
