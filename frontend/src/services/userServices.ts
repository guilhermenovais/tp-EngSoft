import api from './api';

export async function loginUser(data: { email: string; password: string }) {
  const res = await api.post('/users/login', data);
  return res.data;
}

export async function registerUser(data: { nome: string; email: string; password: string }) {
    const formattedData = {
      username: data.nome,
      email: data.email,
      password: data.password,
    };
    const res = await api.post("/users/register", formattedData);
    return res.data;
  }