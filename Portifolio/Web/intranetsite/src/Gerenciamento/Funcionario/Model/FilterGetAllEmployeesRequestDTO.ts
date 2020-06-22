export class FilterGetAllEmployeesRequestDTO {
    EmailUsuario: string;
    Cpnj: string;
    RazaoSocial: string;
    NomeFantasia: string;
    Ativo: number;
    Cpf: string;
    DataCadastro: Date;
    DataBloqueio: Date;
    Admin: number;
    EmailFuncionario: string;
    NomeFuncionario: string;
    FuncionarioAtivo: string;
    constructor(EmailUsuario: string,
        Cpnj: string,
        RazaoSocial: string,
        NomeFantasia: string,
        Ativo: number,
        Cpf: string,
        DataCadastro: Date,
        DataBloqueio: Date,
        Admin: number,
        EmailFuncionario: string,
        NomeFuncionario: string,
        FuncionarioAtivo: string) {

        this.EmailUsuario = EmailUsuario;
        this.Cpnj = Cpnj;
        this.RazaoSocial = RazaoSocial;
        this.NomeFantasia = NomeFantasia;
        this.Ativo = Ativo;
        this.Cpf = Cpf;
        this.DataCadastro = DataCadastro;
        this.DataBloqueio = DataBloqueio;
        this.Admin = Admin;
        this.EmailFuncionario = EmailFuncionario;
        this.NomeFuncionario = NomeFuncionario;
        this.FuncionarioAtivo = FuncionarioAtivo;

    }
}