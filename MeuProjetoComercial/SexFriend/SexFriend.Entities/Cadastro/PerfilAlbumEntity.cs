using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SexFriend.Entities.Cadastro
{
    public class PerfilAlbumEntity
    {
        public PerfilAlbumEntity(int idPerfilCpf, byte[]? foto)
        {
            IdPerfilCpf = idPerfilCpf;
            Foto = foto;
        }

        [Key]
        public int IdAlbum { get; set; }

        public int IdPerfilCpf { get; set; }

        public byte[]? Foto { get; set; }

    }
}
