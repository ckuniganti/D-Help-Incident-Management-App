import { v4 as uuidv4 } from 'uuid';

export const getUsers = (): any[] => {
  const usersData = localStorage.getItem('users');
  return usersData ? JSON.parse(usersData) : [];
};

export const saveUsers = (users: any) => {
  //const users = getUsers();
  //users.push(user);
  localStorage.setItem('users', JSON.stringify(users));
};

export const loginUser = async (email: string, password: string): Promise<string | null> => {
  const users = await getUsers();
  const user = users.find(
    (user: any) => user.email === email && user.password === password && user.expiry > Date.now()
  );

  if (user) {
    const token = uuidv4();
    user.token = token;
    saveUsers(users);
    return token;
  }

  return null;
};

export const registerUser = async (email:  string, password: string): Promise<boolean> => {
  const users = getUsers();
  const existingUser = users.find((user: any) => user.email === email);

  if(existingUser){
    return false;
  }

  const token = uuidv4();
  const newUser = { email, password, token, expiry: Date.now() + 5 * 60 * 1000 };
  users.push(newUser);
  saveUsers(users);
  return true;
};

export const saveTokenToCache = (token: string) => {
  sessionStorage.setItem('token', token);
};

export const getTokenFromCache = (): string | null => {
  return sessionStorage.getItem('token')
}


  