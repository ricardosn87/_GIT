
using SexFriend.EventsInfra;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SexFriend.EventsModels.Cadastro
{
    public class CadastroEvent : IIntegrationEvent
    {
        public CadastroEvent(string cpf, string nome, DateTime dataNascimento, string email, string senha, string estado, string cidade, string bairro, byte[] foto, int idTipoSeguimentoSexual, string descricao)
        {
            Cpf = cpf;
            Nome = nome;
            DataNascimento = dataNascimento;
            Email = email;
            Senha = senha;
            Estado = estado;
            Cidade = cidade;
            Bairro = bairro;
            Foto = foto;
            Descricao = descricao;
            IdTipoSeguimentoSexual = idTipoSeguimentoSexual;
        }
        public CadastroEvent()
        {

        }

        public string Cpf { get; set; }

        public string Nome { get; set; }

        public DateTime DataNascimento { get; set; }

        public string Email { get; set; }

        public string Senha { get; set; }

        public string Estado { get; set; }

        public string Cidade { get; set; }

        public string Bairro { get; set; }

        public byte[]? Foto { get; set; }

        public string Descricao { get; set; }

        public int IdTipoSeguimentoSexual { get; set; }
    }
}
