import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

export default function Auth() {
  const [mode, setMode] = useState('login'); // 'login' ou 'register'
  const [form, setForm] = useState({ nome: '', email: '', idade: '', cidade: '', senha: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({...form, [e.target.name]: e.target.value });
  };

  const clearMessages = () => {
    setError('');
    setSuccess('');
  };

  const handleRegister = async () => {
    clearMessages();
    try {
      const res = await api.get(`/usuarios?email=${form.email}`);
      if (res.data.length > 0) {
        setError('Email já cadastrado.');
        return;
      }
      await api.post('/usuarios', form);
      setSuccess('Usuário registrado com sucesso! Agora faça login.');
      setForm({ nome: '', email: '', idade: '', cidade: '', senha: '' });
      setMode('login');
    } catch (err) {
      setError('Erro ao registrar usuário.');
      console.error(err);
    }
  };

  const handleLogin = async () => {
    clearMessages();
    try {
      const res = await api.get(`/usuarios?email=${form.email}&senha=${form.senha}`);
      if (res.data.length === 1) {
        localStorage.setItem('loggedIn', 'true');
        navigate('/servicos');
      } else {
        setError('Email ou senha incorretos.');
      }
    } catch (err) {
      setError('Erro ao realizar login.');
      console.error(err);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (mode === 'login') {
      handleLogin();
    } else {
      if (!form.nome || !form.idade || !form.cidade) {
        setError('Preencha todos os campos do registro.');
        return;
      }
      handleRegister();
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          {mode === 'login' ? 'Login' : 'Registrar'}
        </h2>

        {error && <p className="text-red-600 text-sm mb-4 text-center">{error}</p>}
        {success && <p className="text-green-600 text-sm mb-4 text-center">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <>
              <input
                type="text"
                name="nome"
                placeholder="Nome"
                value={form.nome}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
              <input
                type="number"
                name="idade"
                placeholder="Idade"
                value={form.idade}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
              <input
                type="text"
                name="cidade"
                placeholder="Cidade"
                value={form.cidade}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
            </>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />

          <input
            type="password"
            name="senha"
            placeholder="Senha"
            value={form.senha}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            {mode === 'login' ? 'Entrar' : 'Registrar'}
          </button>
        </form>

        <div className="mt-4 text-center">
          {mode === 'login' ? (
            <p className="text-sm">
              Ainda não tem conta?{' '}
              <button onClick={() => { setMode('register'); clearMessages(); }} className="text-blue-600 hover:underline">
                Crie uma agora
              </button>
            </p>
          ) : (
            <p className="text-sm">
              Já tem uma conta?{' '}
              <button onClick={() => { setMode('login'); clearMessages(); }} className="text-blue-600 hover:underline">
                Faça login
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}