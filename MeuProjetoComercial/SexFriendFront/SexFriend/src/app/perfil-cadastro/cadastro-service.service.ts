import { tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Perfil } from '../Models/perfil.model';
import { Injectable, Inject } from '@angular/core';
import * as moment from 'moment'

@Injectable({
  providedIn: 'root'
})
export class CadastroServiceService {

  url = 'https://localhost:7167/api/perfil'

  constructor(
    private http: HttpClient
  ) { }

  cpfBlur(cpf: string) {
    return this.http.get(`${this.url}/cpf/${cpf}`)
  }

  save(p: Perfil) {
    return this.http.post(`${this.url}`, p)
  }

  getStatesFromBrazil(): string[] {
    let list: string[] =
      ['AC',
        'AL',
        'AP',
        'AM',
        'BA',
        'CE',
        'DF',
        'ES',
        'GO',
        'MA',
        'MT',
        'MS',
        'MG',
        'PA',
        'PB',
        'PR',
        'PE',
        'PI',
        'RJ',
        'RN',
        'RS',
        'RO',
        'RR',
        'SC',
        'SP',
        'SE',
        'TO'];

    return list
  }

  getRangerDate(): string[] {
    let rangerYears: string[] = []
    let dataAtual = moment()
    let dataAtualCalc = moment()

    let dateLater18Years = dataAtual.subtract(18, 'years')
    let dateLater18YearsStart = dataAtualCalc.subtract(18, 'years')

    let dateMinYears = dateLater18Years.subtract(90, 'years')

    for (var i = 0; dateMinYears < dateLater18YearsStart; i++) {
      rangerYears.push(dateMinYears.add(1, 'year').format("yyyy"))
    }

    return rangerYears
  }
}
