import { useEffect, useState } from 'react';
import api from '../api/api';

export default function Servicos() {
  const [servicos, setServicos] = useState([]);
  const [form, setForm] = useState({ nome: '', descricao: '', preco: '', prazo: '', cliente: '' });
  const [editandoId, setEditandoId] = useState(null);

  const fetchServicos = async () => {
    try {
      const response = await api.get('/servicos');
      setServicos(response.data);
    } catch (error) {
      console.error('Erro ao buscar serviços:', error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editandoId) {
        await api.put(`/servicos/${editandoId}`, form);
      } else {
        await api.post('/servicos', form);
      }
      setForm({ nome: '', descricao: '', preco: '', prazo: '', cliente: '' });
      setEditandoId(null);
      fetchServicos();
    } catch (error) {
      console.error('Erro ao salvar serviço:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/servicos/${id}`);
      fetchServicos();
    } catch (error) {
      console.error('Erro ao excluir serviço:', error);
    }
  };

  const handleEdit = (servico) => {
    setForm(servico);
    setEditandoId(servico.id);
  };

  useEffect(() => {
    fetchServicos();
  }, []);

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Gestão de Serviços</h1>

      <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow grid grid-cols-2 gap-4">
        <input name="nome" value={form.nome} onChange={handleChange} placeholder="Nome do serviço" className="border rounded p-2" required />
        <input name="descricao" value={form.descricao} onChange={handleChange} placeholder="Descrição" className="border rounded p-2" required />
        <input name="preco" value={form.preco} onChange={handleChange} placeholder="Preço" className="border rounded p-2" required />
        <input name="prazo" value={form.prazo} onChange={handleChange} placeholder="Prazo" className="border rounded p-2" required />
        <input name="cliente" value={form.cliente} onChange={handleChange} placeholder="Cliente" className="border rounded p-2" required />
        <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded col-span-2">
          {editandoId ? 'Atualizar Serviço' : 'Cadastrar Serviço'}
        </button>
      </form>

      <div className="space-y-4">
        {servicos.map((s) => (
          <div key={s.id} className="bg-white shadow p-4 rounded-lg flex justify-between items-center">
            <div>
              <p className="font-semibold">{s.nome}</p>
              <p className="text-sm text-gray-600">{s.descricao} - R${s.preco} - {s.prazo} - Cliente: {s.cliente}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(s)} className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded">Editar</button>
              <button onClick={() => handleDelete(s.id)} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded">Excluir</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}