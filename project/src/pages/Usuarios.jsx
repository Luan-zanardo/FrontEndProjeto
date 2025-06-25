import { useEffect, useState } from 'react';
import api from '../api/api';

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [form, setForm] = useState({ nome: '', email: '', idade: '', cidade: '', senha: '' });
  const [editandoId, setEditandoId] = useState(null);

  const fetchUsuarios = async () => {
    try {
      const response = await api.get('/usuarios');
      setUsuarios(response.data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editandoId) {
        await api.put(`/usuarios/${editandoId}`, form);
      } else {
        await api.post('/usuarios', form);
      }
      setForm({ nome: '', email: '', idade: '', cidade: '', senha: '' });
      setEditandoId(null);
      fetchUsuarios();
    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/usuarios/${id}`);
      fetchUsuarios();
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
    }
  };

  const handleEdit = (usuario) => {
    setForm(usuario);
    setEditandoId(usuario.id);
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Gestão de Usuários</h1>

      <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow grid grid-cols-2 gap-4">
        <input name="nome" value={form.nome} onChange={handleChange} placeholder="Nome" className="border rounded p-2" required />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="border rounded p-2" required />
        <input name="idade" value={form.idade} onChange={handleChange} placeholder="Idade" className="border rounded p-2" required />
        <input name="cidade" value={form.cidade} onChange={handleChange} placeholder="Cidade" className="border rounded p-2" required />
        <input name="senha" value={form.senha} onChange={handleChange} placeholder="Senha" className="border rounded p-2" required />
        <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded col-span-2">
          {editandoId ? 'Atualizar Usuário' : 'Cadastrar Usuário'}
        </button>
      </form>

      <div className="space-y-4">
        {usuarios.map((u) => (
          <div key={u.id} className="bg-white shadow p-4 rounded-lg flex justify-between items-center">
            <div>
              <p className="font-semibold">{u.nome}</p>
              <p className="text-sm text-gray-600">{u.email} - {u.idade} anos - {u.cidade}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(u)} className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded">Editar</button>
              <button onClick={() => handleDelete(u.id)} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded">Excluir</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}